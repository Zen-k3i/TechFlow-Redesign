import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * False on the server and during hydration, true once the page runs in the browser. Marquees use it
 * to add their second (looping) copy client-side only, so the server HTML carries each item once.
 */
export const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
