"use client";

import { motion } from "motion/react";

// Seeded so server and client render identical positions.
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const random = seeded(42);
const stars = Array.from({ length: 70 }, () => ({
  left: random() * 100,
  top: random() * 70,
  size: random() > 0.85 ? 2.5 : 1.5,
  base: 0.15 + random() * 0.35,
  duration: 2.5 + random() * 4,
  delay: random() * 4,
}));

export function StarField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((star, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size }}
          initial={{ opacity: star.base }}
          animate={{ opacity: [star.base, 1, star.base] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
