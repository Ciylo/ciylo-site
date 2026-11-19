"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Giant footer wordmark that rises and lights up as the footer scrolls in. */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, 0]);
  const fill = useTransform(scrollYProgress, [0.3, 1], ["0%", "100%"]);

  return (
    <div ref={ref} aria-hidden className="relative -mx-4 select-none overflow-hidden text-center">
      <motion.p
        style={{ y }}
        className="relative text-[clamp(88px,22vw,280px)] leading-[0.8] font-extrabold tracking-[-0.05em] whitespace-nowrap text-ink-800"
      >
        CIYLO
        <motion.span
          className="absolute inset-0 bg-gradient-to-t from-teal-500/40 via-teal-500/10 to-transparent bg-clip-text text-transparent"
          style={{ clipPath: useTransform(fill, (f) => `inset(${100 - parseFloat(f)}% 0 0 0)`) }}
        >
          CIYLO
        </motion.span>
      </motion.p>
    </div>
  );
}
