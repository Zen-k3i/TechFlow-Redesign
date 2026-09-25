"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import type { MotionValue } from "motion/react";
import { exhibits, galleryTexture } from "../content";
import { CAMERA_END_Z, CAMERA_START_Z, FINAL_Z, exhibitPosition } from "./layout";

const IMAGE_W = 1.6;
const IMAGE_H = 2;
const BG = "#0b0a09";

export function GalleryScene({
  progress,
  onExhibitClick,
}: {
  progress: MotionValue<number>;
  onExhibitClick: (index: number) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.2, CAMERA_START_Z], fov: 48, near: 0.1, far: 60 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      fallback={<div className="absolute inset-0 bg-gallery" />}
    >
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 6, 24]} />
      <ambientLight intensity={0.35} />
      <CameraRig progress={progress} />
      <Corridor />
      <Dust />
      <Suspense fallback={null}>
        {exhibits.map((exhibit, i) => (
          <Exhibit key={exhibit.slug} index={i} onClick={() => onExhibitClick(i)} />
        ))}
      </Suspense>
      <FinalFrame />
    </Canvas>
  );
}

function CameraRig({ progress }: { progress: MotionValue<number> }) {
  const look = useRef(new THREE.Vector3(0, 0.2, 0));
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const p = progress.get();
    const z = CAMERA_START_Z + (CAMERA_END_Z - CAMERA_START_Z) * p;
    const aspect = state.size.width / state.size.height;
    const sway = aspect < 1 ? 0.9 : 0.4;

    let offsetX = 0;
    let lookX = 0;
    exhibits.forEach((_, i) => {
      const pos = exhibitPosition(i);
      const weight = Math.exp(-((z - (pos.z + 3.6)) ** 2) / 5);
      offsetX += weight * pos.x * sway;
      lookX += weight * pos.x;
    });

    const cam = state.camera;
    const damp = 1 - Math.exp(-delta * 4);
    cam.position.x += (offsetX + state.pointer.x * 0.25 - cam.position.x) * damp;
    cam.position.y += (0.2 + state.pointer.y * 0.12 - cam.position.y) * damp;
    cam.position.z += (z - cam.position.z) * damp;

    target.set(lookX, 0.25, z - 6);
    look.current.lerp(target, damp);
    cam.lookAt(look.current);
  });

  return null;
}

function Corridor() {
  const length = Math.abs(FINAL_Z) + CAMERA_START_Z + 10;
  const centerZ = (FINAL_Z + CAMERA_START_Z) / 2;
  const pilasters = useMemo(() => Array.from({ length: 9 }, (_, i) => 8 - i * 4.5), []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, centerZ]}>
        <planeGeometry args={[12, length]} />
        <MeshReflectorMaterial
          resolution={1024}
          blur={[300, 80]}
          mixBlur={1}
          mixStrength={30}
          roughness={1}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0f0d0b"
          metalness={0.5}
          mirror={0.6}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.4, centerZ]}>
        <planeGeometry args={[12, length]} />
        <meshStandardMaterial color="#0d0c0a" roughness={1} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 5, 1.5, centerZ]} rotation={[0, -side * (Math.PI / 2), 0]}>
            <planeGeometry args={[length, 6]} />
            <meshStandardMaterial color="#12100e" roughness={0.95} />
          </mesh>
          <mesh position={[side * 3.6, 3.1, centerZ]}>
            <boxGeometry args={[0.02, 0.02, length]} />
            <meshBasicMaterial color="#4766ff" toneMapped={false} />
          </mesh>
          {pilasters.map((z) => (
            <mesh key={z} position={[side * 4.95, 0.8, z]}>
              <boxGeometry args={[0.06, 4.6, 0.02]} />
              <meshBasicMaterial color="#efe9dd" transparent opacity={0.06} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function radialTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "#fff");
  g.addColorStop(1, "#000");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const texturePaths = exhibits.map((e) => galleryTexture(e.slug));

function useCoverTextures() {
  return useTexture(texturePaths, (textures) => {
    const planeAspect = IMAGE_W / IMAGE_H;
    for (const texture of Array.isArray(textures) ? textures : [textures]) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      const image = texture.image as { width: number; height: number };
      const imageAspect = image.width / image.height;
      if (imageAspect < planeAspect) {
        texture.repeat.set(1, imageAspect / planeAspect);
        texture.offset.set(0, 1 - texture.repeat.y);
      } else {
        texture.repeat.set(planeAspect / imageAspect, 1);
        texture.offset.set((1 - texture.repeat.x) / 2, 0);
      }
    }
  });
}

function Exhibit({ index, onClick }: { index: number; onClick: () => void }) {
  const textures = useCoverTextures();
  const [glow] = useState(radialTexture);
  const pos = exhibitPosition(index);
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!group.current) return;
    const s = THREE.MathUtils.lerp(group.current.scale.x, hovered ? 1.04 : 1, 1 - Math.exp(-delta * 8));
    group.current.scale.setScalar(s);
  });

  return (
    <group position={[pos.x, 0.25, pos.z]} rotation={[0, pos.rotY, 0]}>
      <mesh position={[0, 0.2, -0.12]}>
        <planeGeometry args={[3.6, 4.4]} />
        <meshBasicMaterial color="#ffe2b8" alphaMap={glow} transparent opacity={0.16} depthWrite={false} />
      </mesh>
      <mesh position={[0, -1.74, 1.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 2.6]} />
        <meshBasicMaterial
          color="#ffe9c4"
          alphaMap={glow}
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 1.58, 0.2]}>
        <boxGeometry args={[0.8, 0.04, 0.1]} />
        <meshBasicMaterial color="#fff1d6" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 1.6, 1.1]} intensity={3} distance={4} color="#ffe2b8" />

      <group ref={group}>
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[IMAGE_W + 0.5, IMAGE_H + 0.5, 0.06]} />
          <meshStandardMaterial color="#1d1813" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh>
          <planeGeometry args={[IMAGE_W + 0.34, IMAGE_H + 0.34]} />
          <meshBasicMaterial color="#e9e2d4" toneMapped={false} />
        </mesh>
        <mesh
          position={[0, 0, 0.005]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "";
          }}
          onClick={onClick}
        >
          <planeGeometry args={[IMAGE_W, IMAGE_H]} />
          <meshBasicMaterial map={textures[index]} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function FinalFrame() {
  const glow = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (glow.current) glow.current.opacity = 0.55 + Math.sin(clock.elapsedTime * 1.6) * 0.15;
  });

  return (
    <group position={[0, 0.35, FINAL_Z]}>
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3.1, 3.7, 0.06]} />
        <meshStandardMaterial color="#1d1813" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh>
        <planeGeometry args={[2.8, 3.4]} />
        <meshBasicMaterial ref={glow} color="#4766ff" transparent opacity={0.6} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.4, 3]} />
        <meshBasicMaterial color="#0b0a09" />
      </mesh>
      <pointLight position={[0, 0, 1.5]} intensity={6} distance={8} color="#4766ff" />
    </group>
  );
}

function Dust() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const array = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      array[i * 3] = (rand() - 0.5) * 8;
      array[i * 3 + 1] = rand() * 4 - 1.4;
      array[i * 3 + 2] = CAMERA_START_Z - rand() * (CAMERA_START_Z - FINAL_Z + 2);
    }
    return array;
  }, []);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.004;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.01} color="#efe9dd" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}
