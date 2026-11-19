"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Lenis inertial scrolling. Disabled for users who prefer reduced motion. */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.1, anchors: { offset: -96 }, autoRaf: true });
    lenis.current = l;
    return () => {
      l.destroy();
      lenis.current = null;
    };
  }, []);

  // Start each new page at the top (hash links are handled by Lenis anchors).
  useEffect(() => {
    if (!window.location.hash) lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
