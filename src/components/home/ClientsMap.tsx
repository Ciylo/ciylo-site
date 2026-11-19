"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "motion/react";
import pins from "@/data/map-pins.json";
import { clientCountries } from "@/data/site";
import { cn } from "@/lib/cn";

const H = (pins.height / pins.width) * 100; // overlay viewBox height for a 100-wide box

/** "Clients in" world map: dotted landmass, teal pins and arcs from Lahore. */
export function ClientsMap({ dark = true }: { dark?: boolean }) {
  const origin = { x: pins.lahore.x, y: (pins.lahore.y / 100) * H };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full" style={{ aspectRatio: `${pins.width} / ${pins.height}` }}>
        <img
          src="/images/world-dots.svg"
          alt=""
          aria-hidden
          loading="lazy"
          className={cn("absolute inset-0 h-full w-full", dark ? "opacity-25" : "opacity-80")}
        />
        <svg viewBox={`0 0 100 ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {pins.pins.map((p, i) => {
            const t = { x: p.x, y: (p.y / 100) * H };
            const mx = (origin.x + t.x) / 2;
            const my = Math.min(origin.y, t.y) - Math.abs(origin.x - t.x) * 0.22;
            return (
              <motion.path
                key={p.code}
                d={`M${origin.x} ${origin.y} Q${mx} ${my} ${t.x} ${t.y}`}
                fill="none"
                stroke="#00c9a7"
                strokeWidth={0.18}
                strokeLinecap="round"
                strokeDasharray="0.6 0.6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}
        </svg>
        {/* Lahore origin */}
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${pins.lahore.x}%`, top: `${pins.lahore.y}%` }}
        >
          <span className="relative block size-3 rounded-full bg-white ring-4 ring-teal-500/40" />
          <span className={cn("absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px]", dark ? "text-white" : "text-ink-900")}>
            Lahore HQ
          </span>
        </span>
        {pins.pins.map((p, i) => (
          <motion.span
            key={p.code}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + i * 0.12, type: "spring", stiffness: 300, damping: 18 }}
            title={p.name}
          >
            <span className="relative block size-2.5 animate-pulse-dot rounded-full bg-teal-500" />
          </motion.span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("kicker mr-1", dark ? "text-ink-300" : "text-ink-500")}>Clients in</span>
        {clientCountries.map((c) => (
          <span
            key={c.code}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[13px] font-medium",
              dark ? "border-ink-600 bg-ink-850 text-white" : "border-ink-150 bg-white text-ink-900",
            )}
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-teal-500 align-middle" />
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}
