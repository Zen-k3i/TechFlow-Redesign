"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { projects } from "./content";

const layout = [
  { x: -2, rotate: -14, y: 90, z: 1 },
  { x: -1, rotate: -7, y: 28, z: 2 },
  { x: 0, rotate: 0, y: 0, z: 3 },
  { x: 1, rotate: 7, y: 28, z: 2 },
  { x: 2, rotate: 14, y: 90, z: 1 },
];

export function ProjectFan({ progress }: { progress: MotionValue<number> }) {
  const spread = useTransform(progress, [0, 1], [1, 1.35]);
  const lift = useTransform(progress, [0, 1], [0, -80]);

  return (
    <motion.div style={{ y: lift }} className="relative mx-auto h-[300px] w-full max-w-5xl sm:h-[380px] md:h-[440px]">
      {projects.map((project, i) => (
        <FanCard key={project.name} index={i} spread={spread} project={project} />
      ))}
    </motion.div>
  );
}

function FanCard({
  index,
  spread,
  project,
}: {
  index: number;
  spread: MotionValue<number>;
  project: (typeof projects)[number];
}) {
  const slot = layout[index];
  const x = useTransform(spread, (s) => `calc(-50% + ${slot.x * s} * var(--fan-gap))`);
  const isCenter = slot.x === 0;

  return (
    <motion.div
      style={{ x, zIndex: slot.z }}
      className={`absolute left-1/2 top-0 [--fan-gap:120px] sm:[--fan-gap:170px] md:[--fan-gap:215px] ${
        Math.abs(slot.x) === 2 ? "hidden sm:block" : ""
      }`}
    >
      <motion.a
        href="#projets"
        initial={{ opacity: 0, y: 160, rotate: 0 }}
        animate={{
          opacity: 1,
          y: slot.y,
          rotate: slot.rotate,
          transition: { type: "spring", stiffness: 120, damping: 18, delay: 0.9 + Math.abs(slot.x) * 0.12 },
        }}
        whileHover={{ y: slot.y - 18, rotate: slot.rotate * 0.4, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`group relative block overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ${
          isCenter ? "w-[190px] sm:w-[250px] md:w-[290px]" : "w-[160px] sm:w-[210px] md:w-[240px]"
        }`}
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={project.src}
            alt={`Étude de cas ${project.name}`}
            fill
            loading="eager"
            sizes="(min-width: 768px) 290px, 190px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/90 via-black/50 to-transparent p-4 pt-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-brand-sky">{project.sector}</p>
            <p className="text-sm font-medium text-white">{project.name}</p>
          </div>
          <span className="text-xs text-white/70">Voir →</span>
        </div>
      </motion.a>
    </motion.div>
  );
}
