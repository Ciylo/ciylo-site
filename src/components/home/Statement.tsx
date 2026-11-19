"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { site } from "@/data/site";

type Token = { text: string } | { stat: number };

// "In 7+ years we've shipped 300+ products for 80+ clients across 20+ industries."
const tokens: Token[] = [
  { text: "In" },
  { stat: 0 },
  { text: "years" },
  { text: "we've" },
  { text: "shipped" },
  { stat: 1 },
  { text: "products" },
  { text: "for" },
  { stat: 2 },
  { text: "clients" },
  { text: "across" },
  { stat: 3 },
  { text: "industries." },
];

function Word({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

/** Scroll-linked statement: words light up as you scroll, numbers count up. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const n = tokens.length;

  return (
    <section className="bg-white pt-24 pb-10 sm:pt-28">
      <div className="wrap">
        <p
          ref={ref}
          className="max-w-[1040px] text-[clamp(28px,4.2vw,48px)] leading-[1.22] font-bold tracking-[-0.03em] text-ink-900"
        >
          {tokens.map((t, i) => {
            const range: [number, number] = [i / n, (i + 1) / n];
            const content =
              "stat" in t ? (
                <CountUp
                  to={site.stats[t.stat].value}
                  suffix={site.stats[t.stat].suffix}
                  className="text-teal-700 tabular-nums"
                />
              ) : (
                t.text
              );
            return (
              <span key={i}>
                {reduce ? <span>{content}</span> : <Word progress={scrollYProgress} range={range}>{content}</Word>}
                {i < n - 1 ? " " : null}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
