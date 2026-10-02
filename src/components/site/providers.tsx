"use client";

import { ReactLenis } from "lenis/react";
import { LazyMotion, MotionConfig } from "motion/react";
import { defaultLocale, type Locale } from "@/i18n/config";
import { Cursor } from "./cursor";
import { LocaleProvider } from "./locale";

/** Every `motion.*` element is Motion's light `m` component; its features arrive in a separate chunk. */
const loadMotionFeatures = () => import("./motion-features").then((mod) => mod.default);

export function Providers({ lang = defaultLocale, children }: { lang?: Locale; children: React.ReactNode }) {
  return (
    <LocaleProvider lang={lang}>
      <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 } }}>
        <LazyMotion features={loadMotionFeatures} strict>
          <MotionConfig reducedMotion="user">
            {children}
            <Cursor />
          </MotionConfig>
        </LazyMotion>
      </ReactLenis>
    </LocaleProvider>
  );
}
