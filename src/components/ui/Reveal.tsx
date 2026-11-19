"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  /** Fraction of the element that must be visible before it animates */
  amount?: number;
};

/** Fade + rise into view. Respects prefers-reduced-motion. */
export function Reveal({ delay = 0, y = 28, amount = 0.2, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its direct <RevealItem> children. */
export function RevealGroup({
  stagger = 0.08,
  amount = 0.15,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { stagger?: number; amount?: number }) {
  return (
    <motion.div
      initial={"hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ y = 24, children, ...rest }: HTMLMotionProps<"div"> & { y?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
