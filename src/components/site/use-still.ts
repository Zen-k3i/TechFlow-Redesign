"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/**
 * True when the visitor asked for reduced motion. Use this instead of Motion's `useReducedMotion`:
 * that one reads the setting during the first browser render, while the server always assumes
 * "no preference", so with Reduce motion on the server HTML and the hydrated styles differ
 * (hydration attribute mismatch). This returns false on the server and during hydration, then
 * the real setting, and follows changes.
 */
export function useStill() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
