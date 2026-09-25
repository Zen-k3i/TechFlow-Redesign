"use client";

import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as ImagePlane, Sparkles } from "@react-three/drei";
import type { MotionValue } from "motion/react";
import { webProjects as projects } from "./content";

export type DragState = { active: boolean; lastX: number; velocity: number; moved: number };

type SceneProps = {
  progress: MotionValue<number>;
  drag: React.RefObject<DragState>;
  still: boolean;
  running: boolean;
  hovered: number | null;
  onHover: React.Dispatch<React.SetStateAction<number | null>>;
  onFront: (i: number) => void;
  onOpen: (i: number) => void;
  onReady: () => void;
};

const COUNT = projects.length;
const RADIUS = 5.4;
const CARD: [number, number] = [1.55, 2.0];

type ImageMesh = THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial & { zoom: number; grayscale: number }>;

export default function HeroScene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={props.running ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 12], fov: 35 }}
    >
      <fog attach="fog" args={["#07080d", 8.5, 16]} />
      <Suspense fallback={null}>
        <Ring {...props} />
        <Ready onReady={props.onReady} />
      </Suspense>
      <Sparkles count={70} scale={[16, 7, 10]} size={2.2} speed={0.25} opacity={0.6} color="#4791ff" />
    </Canvas>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

function Ring({ progress, drag, still, hovered, onHover, onFront, onOpen }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const inertia = useRef(0);
  const front = useRef(-1);
  const size = useThree((s) => s.size);
  const compact = size.width < 768;

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = progress.get();
    const d = drag.current;

    inertia.current = d.active ? d.velocity : inertia.current * Math.pow(0.04, dt);
    spin.current += (still ? 0 : dt * 0.1) + inertia.current * dt * 60;
    const rotation = spin.current + p * Math.PI * 0.9;
    g.rotation.y = rotation;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.26 - p * 0.18, 4, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, (compact ? -1.1 : -1.35) + p * 1.2, 4, dt);

    const camera = state.camera;
    const baseZ = compact ? 17 : 12.5;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, state.pointer.x * 0.9, 3, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, state.pointer.y * 0.5, 3, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, baseZ - p * 5.5, 5, dt);
    camera.lookAt(0, 0, 0);

    const i = (((Math.round((-rotation / (Math.PI * 2)) * COUNT)) % COUNT) + COUNT) % COUNT;
    if (i !== front.current) {
      front.current = i;
      onFront(i);
    }
  });

  return (
    <group ref={group}>
      {projects.map((project, i) => (
        <Card
          key={project.slug}
          index={i}
          url={`/images/gallery/${project.slug}.jpg`}
          active={hovered === i}
          dimmed={hovered !== null && hovered !== i}
          onHover={onHover}
          onOpen={() => {
            if (drag.current.moved < 6) onOpen(i);
          }}
        />
      ))}
    </group>
  );
}

function Card({
  index,
  url,
  active,
  dimmed,
  onHover,
  onOpen,
}: {
  index: number;
  url: string;
  active: boolean;
  dimmed: boolean;
  onHover: SceneProps["onHover"];
  onOpen: () => void;
}) {
  const wrap = useRef<THREE.Group>(null);
  const mesh = useRef<ImageMesh>(null);
  const angle = (index / COUNT) * Math.PI * 2;

  useFrame((_, dt) => {
    const w = wrap.current;
    const m = mesh.current;
    if (!w || !m) return;
    const s = THREE.MathUtils.damp(w.scale.x, active ? 1.14 : 1, 8, dt);
    w.scale.setScalar(s);
    w.position.y = THREE.MathUtils.damp(w.position.y, active ? 0.25 : 0, 8, dt);
    m.material.zoom = THREE.MathUtils.damp(m.material.zoom, active ? 1.08 : 1, 6, dt);
    m.material.grayscale = THREE.MathUtils.damp(m.material.grayscale, dimmed ? 0.85 : 0, 6, dt);
  });

  return (
    <group position={[Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS]} rotation={[0, angle, 0]}>
      <group ref={wrap}>
        <ImagePlane
          ref={mesh}
          url={url}
          scale={CARD}
          radius={0.08}
          side={THREE.DoubleSide}
          toneMapped={false}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(index);
          }}
          onPointerOut={() => onHover((h) => (h === index ? null : h))}
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        />
      </group>
    </group>
  );
}
