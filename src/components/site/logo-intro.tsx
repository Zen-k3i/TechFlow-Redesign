"use client";

import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";

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
    // `?logo-intro` in the URL replays it (to show it again once it has been seen).
    const forced = new URLSearchParams(location.search).has("logo-intro");
    decision = forced || (home && !reduced && !seen());
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
 * time (and with reduced motion) it is the plain logo. It starts once the navbar has slid in (0.6 s).
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
      <span className="block animate-logo-slide" style={{ transformOrigin: `${ICON}% 50%` }}>
        {logo(`inset(0 0 0 ${ICON}%)`)}
      </span>
      {/* Icon: falls, lands with a squash, hops twice and settles (CSS keyframes in globals.css). */}
      <span className="absolute inset-0 block animate-logo-hop" style={{ transformOrigin: `${ICON / 2}% 100%` }}>
        {logo(`inset(0 ${100 - ICON}% 0 0)`)}
      </span>
    </span>
  );
}
