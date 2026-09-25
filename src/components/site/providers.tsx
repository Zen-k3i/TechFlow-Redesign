"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { defaultLocale, type Locale } from "@/i18n/config";
import { Cursor } from "./cursor";
import { LocaleProvider } from "./locale";

export function Providers({ lang = defaultLocale, children }: { lang?: Locale; children: React.ReactNode }) {
  return (
    <LocaleProvider lang={lang}>
      <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 } }}>
        <MotionConfig reducedMotion="user">
          {children}
          <Cursor />
        </MotionConfig>
      </ReactLenis>
    </LocaleProvider>
  );
}
