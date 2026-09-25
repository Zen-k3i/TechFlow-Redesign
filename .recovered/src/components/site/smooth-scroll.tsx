"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 0.9 }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
