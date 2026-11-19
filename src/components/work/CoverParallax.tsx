"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Img } from "@/components/ui/Img";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/data/work";

/** Large case-study cover that scales and drifts as you scroll past it. */
export function CoverParallax({ c }: { c: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.92, 1, 1.04]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 30]);
  const dark = c.stage === "dark";

  return (
    <div ref={ref} className="wrap -mt-10 sm:-mt-14">
      <motion.div
        style={{ scale }}
        className={cn(
          "relative isolate aspect-[16/10] overflow-hidden rounded-[28px] shadow-[0_50px_100px_-40px_rgb(17_16_19/0.45)] sm:aspect-[16/9]",
          dark ? "bg-ink-850" : "bg-ink-75",
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(60% 60% at 50% 55%, ${c.accent}${dark ? "55" : "33"}, transparent 70%)` }}
        />
        <motion.div style={{ y }} className="absolute inset-0">
          <Img
            src={c.cover}
            alt={`${c.name} product overview`}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1188px) 1140px, 100vw"
            className={cn("h-full w-full", c.coverFit === "cover" ? "object-cover object-top" : "object-contain p-6 sm:p-10")}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
