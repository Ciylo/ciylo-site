"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Words (punctuation ignored) rendered in the accent colour */
  accent?: string[];
  accentClassName?: string;
  delay?: number;
  /** Animate on mount (hero) instead of on scroll */
  immediate?: boolean;
};

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 };

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Headline whose words slide up out of a mask, one after another.
 * The heading itself is observed (the clipped words never intersect).
 */
export function SplitHeading({
  text,
  as = "h2",
  className,
  accent = [],
  accentClassName = "text-teal-500",
  delay = 0,
  immediate,
}: Props) {
  const Tag = tags[as];
  const words = text.split(" ");
  return (
    <Tag
      aria-label={text}
      className={cn("text-balance", className)}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } })}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((w, i) => {
        const clean = w.replace(/[.,!?:]/g, "");
        return (
          <span key={i} aria-hidden className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              variants={word}
              className={cn("inline-block will-change-transform", accent.includes(clean) && accentClassName)}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
}
