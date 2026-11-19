"use client";

import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const HEADER_OFFSET = -96;
let lenis: Lenis | null = null;

/**
 * On every navigation, put the scroll position where the URL says:
 * the #hash target if there is one, otherwise the top. Lenis keeps its own
 * scroll target, so without this it would glide back to the previous page's
 * position after a cross-page link like /contact#form.
 */
function RouteScroll() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (lenis) {
        lenis.resize();
        if (el) lenis.scrollTo(el, { offset: HEADER_OFFSET, immediate: true, force: true });
        else lenis.scrollTo(0, { immediate: true, force: true });
      } else if (el) {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET });
      } else {
        window.scrollTo({ top: 0 });
      }
    };
    // Run after paint, and again once late content (images, fonts) has settled.
    const raf = requestAnimationFrame(() => requestAnimationFrame(go));
    const timers = window.location.hash ? [setTimeout(go, 350), setTimeout(go, 900)] : [];
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [pathname, search]);

  return null;
}

/** Lenis inertial scrolling. Disabled for users who prefer reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.1, anchors: { offset: HEADER_OFFSET }, autoRaf: true });
    lenis = l;
    return () => {
      l.destroy();
      lenis = null;
    };
  }, []);

  return (
    <Suspense fallback={null}>
      <RouteScroll />
    </Suspense>
  );
}
