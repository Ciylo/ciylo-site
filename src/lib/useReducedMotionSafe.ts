"use client";

import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** `false` during SSR and hydration, `true` once running on the client. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/**
 * Like motion's useReducedMotion, but always `false` on the server and during
 * hydration, so markup hydrates identically. Updates right after.
 */
export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  return hydrated && !!reduce;
}
