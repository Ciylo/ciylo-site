"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Img } from "@/components/ui/Img";
import { moments, type Moment } from "@/data/culture";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/cn";

function Tile({ m }: { m: Moment }) {
  return (
    <figure className="group relative overflow-hidden rounded-[22px] bg-ink-800">
      <Img
        src={m.src}
        alt={m.caption}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className={cn(
          "w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105",
          m.tall ? "aspect-[3/4]" : "aspect-[4/3]",
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <figcaption className="absolute inset-x-4 bottom-4 flex flex-col gap-1 text-white">
        <span className="kicker text-teal-400">{m.tag}</span>
        <span className="text-lg leading-snug font-bold tracking-[-0.01em]">{m.caption}</span>
      </figcaption>
    </figure>
  );
}

/** Three-column masonry of culture moments; columns drift at different speeds. */
export function Moments({ limit }: { limit?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -60]);
  const b = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 50]);
  const c = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -40]);
  const items = limit ? moments.slice(0, limit) : moments;
  const cols = [0, 1, 2].map((k) => items.filter((_, i) => i % 3 === k));

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cols.map((col, k) => (
        <motion.div
          key={k}
          style={{ y: [a, b, c][k] }}
          className={cn("flex flex-col gap-4", k === 2 && "sm:hidden lg:flex")}
        >
          {col.map((m) => (
            <Tile key={m.src} m={m} />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
