"use client";

import { motion } from "motion/react";

export type WaveKind = "ecg" | "square" | "sine" | "growth";

const W = 240; // one period block width
const H = 50;

function period(kind: WaveKind): string {
  switch (kind) {
    case "ecg":
      return "L40 25 L60 25 L68 18 L76 25 L92 25 L100 4 L108 46 L116 25 L140 25 L152 20 L166 25 L240 25";
    case "square":
      return "L30 25 L30 8 L90 8 L90 42 L150 42 L150 8 L210 8 L210 25 L240 25";
    case "sine": {
      let d = "";
      for (let x = 0; x <= W; x += 6) d += `L${x} ${(25 - Math.sin((x / W) * Math.PI * 4) * 16).toFixed(1)} `;
      return d;
    }
    case "growth":
      return "L30 40 L55 34 L80 37 L110 26 L135 29 L165 18 L190 21 L215 10 L240 25";
  }
}

/** Continuously scrolling oscilloscope trace. Currently unused (hero signal console removed on request); kept for reuse. */
export function Waveform({ kind, delay = 0 }: { kind: WaveKind; delay?: number }) {
  const p = period(kind);
  // Two periods side by side so the loop is seamless
  const shift = (d: string, dx: number) => d.replace(/L(-?[\d.]+) (-?[\d.]+)/g, (_, x, y) => `L${(+x + dx).toFixed(1)} ${y}`);
  const d = `M0 25 ${p} ${shift(p, W)} ${shift(p, W * 2)}`;

  return (
    <div className="relative h-[50px] w-full overflow-hidden">
      {/* scope grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
          backgroundSize: "20px 12.5px",
        }}
      />
      <motion.svg
        viewBox={`0 0 ${W * 3} ${H}`}
        preserveAspectRatio="none"
        className="absolute top-0 left-0 h-full"
        style={{ width: "300%" }}
        animate={{ x: ["0%", `-${100 / 3}%`] }}
        transition={{ duration: kind === "growth" ? 9 : 5, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <filter id={`glow-${kind}`} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={d}
          fill="none"
          stroke="#00c9a7"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter={`url(#glow-${kind})`}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
      {/* fade edges + live cursor */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink-850),transparent_18%,transparent_82%,var(--color-ink-850))]" />
    </div>
  );
}
