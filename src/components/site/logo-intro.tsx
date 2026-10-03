"use client";

import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";
import { m as motion } from "motion/react";

const KEY = "techflow-logo-intro";
/** Decided once per page load, so later re-renders (the navbar changes on scroll) don't cut the animation. */
let decision: boolean | null = null;
const noop = () => () => {};
/** Share of the logo's width taken by the icon (the dots), the rest is the wordmark. */
const ICON = 22;

function shouldPlay() {
  if (decision === null) {
    const home = location.pathname === "/" || location.pathname === "/en";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    decision = home && !reduced && !seen();
  }
  return decision;
}

function seen() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return true;
  }
}

/**
 * The header logo. On the very first visit to the home page, it plays a short Pixar-style entrance:
 * the icon drops in and hops with squash and stretch, then pushes the wordmark into place. Every other
 * time (and with reduced motion) it is the plain logo.
 */
export function NavLogo() {
  // False on the server and during hydration, so the server HTML is always the plain logo.
  const play = useSyncExternalStore(noop, shouldPlay, () => false);

  useEffect(() => {
    if (!play) return;
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  }, [play]);

  const logo = (clip: string) => (
    <Image
      src="/images/techflow-logo.svg"
      alt=""
      width={179}
      height={36}
      preload
      className="h-7 w-auto"
      style={{ clipPath: clip }}
    />
  );

  if (!play) {
    return <Image src="/images/techflow-logo.svg" alt="TechFlow" width={179} height={36} preload className="h-7 w-auto" />;
  }

  return (
    <span className="relative block" role="img" aria-label="TechFlow">
      {/* Wordmark: waits for the icon, then slides in from behind it with a small overshoot. */}
      <motion.span
        className="block"
        initial={{ x: -26, opacity: 0, scaleX: 0.9 }}
        animate={{ x: [-26, 4, -1, 0], opacity: [0, 1, 1, 1], scaleX: [0.9, 1.04, 0.99, 1] }}
        transition={{ duration: 0.7, delay: 1.05, times: [0, 0.55, 0.8, 1], ease: "easeOut" }}
        style={{ transformOrigin: `${ICON}% 50%` }}
      >
        {logo(`inset(0 0 0 ${ICON}%)`)}
      </motion.span>
      {/* Icon: falls, lands with a squash, hops twice and settles. */}
      <motion.span
        className="absolute inset-0 block"
        initial={{ y: -70, scaleX: 0.8, scaleY: 1.25, rotate: -12 }}
        animate={{
          y: [-70, 0, -18, 0, -6, 0],
          scaleX: [0.8, 1.3, 0.88, 1.15, 0.96, 1],
          scaleY: [1.25, 0.7, 1.15, 0.86, 1.04, 1],
          rotate: [-12, 0, 6, 0, -2, 0],
        }}
        transition={{ duration: 1.25, times: [0, 0.32, 0.52, 0.7, 0.85, 1], ease: "easeInOut" }}
        style={{ transformOrigin: `${ICON / 2}% 100%` }}
      >
        {logo(`inset(0 ${100 - ICON}% 0 0)`)}
      </motion.span>
    </span>
  );
}
