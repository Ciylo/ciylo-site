"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * One shared IntersectionObserver per threshold for the whole page.
 * Cheaper than an observer (or animation controller) per element.
 */
const observers = new Map<number, { io: IntersectionObserver; cbs: Map<Element, () => void> }>();

function observe(el: Element, amount: number, cb: () => void) {
  let entry = observers.get(amount);
  if (!entry) {
    const cbs = new Map<Element, () => void>();
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (!r.isIntersecting) continue;
          cbs.get(r.target)?.();
          cbs.delete(r.target);
          io.unobserve(r.target);
        }
      },
      { threshold: amount },
    );
    entry = { io, cbs };
    observers.set(amount, entry);
  }
  entry.cbs.set(el, cb);
  entry.io.observe(el);
  return () => {
    entry!.cbs.delete(el);
    entry!.io.unobserve(el);
  };
}

/** True once the element has been `amount` visible; never flips back. */
export function useInViewOnce(ref: RefObject<Element | null>, amount = 0.2) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    return observe(el, amount, () => setShown(true));
  }, [ref, amount, shown]);
  return shown;
}
