"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { LazyMotion, MotionConfig } from "motion/react";
import { defaultLocale, type Locale } from "@/i18n/config";
import { Consent } from "./consent";
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
            <ScrollToTopOnNavigate />
            {children}
            <Cursor />
            <Consent />
          </MotionConfig>
        </LazyMotion>
      </ReactLenis>
    </LocaleProvider>
  );
}

/**
 * Every new page starts at the top. Next scrolls the window on navigation, but Lenis kept its own
 * scroll target from the previous page and slid back to it, so some links opened halfway down.
 * Links to an anchor (#section) and back/forward are left alone.
 */
/** Set by back/forward: those keep the position the browser restores. */
const scrollNav = { pop: false };
if (typeof window !== "undefined") window.addEventListener("popstate", () => (scrollNav.pop = true));

function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const pending = useRef(false);

  useEffect(() => {
    const toTop = !scrollNav.pop && !window.location.hash;
    scrollNav.pop = false;
    if (!toTop) return;
    window.scrollTo(0, 0);
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true });
    else pending.current = true;
  }, [pathname]);

  // The Lenis instance arrives after the first render: reset its scroll target too.
  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && pending.current) {
      lenis.scrollTo(0, { immediate: true, force: true });
      pending.current = false;
    }
  }, [lenis]);
  return null;
}
