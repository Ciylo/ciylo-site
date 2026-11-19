"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `to` when scrolled into view. */
export function CountUp({
  to,
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotionSafe();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <span aria-hidden>
        {reduce ? to : value}
        {suffix}
      </span>
    </span>
  );
}
