"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global motion settings. `reducedMotion="user"` makes every transform/layout
 * animation jump straight to its end state for visitors who prefer reduced
 * motion, while keeping server and client markup identical (no hydration drift).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
