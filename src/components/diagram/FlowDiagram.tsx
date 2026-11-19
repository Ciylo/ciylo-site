"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { layerColor, type Diagram, type DiagramNode } from "@/data/diagrams";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/cn";
import { DiagramIcon } from "./icons";

type Mode = "d" | "m";
const ROW_H: Record<Mode, (cols: number) => number> = {
  d: (cols) => (cols <= 4 ? 44 : cols >= 6 ? 56 : 50),
  m: () => 52,
};

function geometry(dg: Diagram, mode: Mode) {
  const cols = mode === "d" ? dg.cols : 2;
  const rows = mode === "d" ? dg.rows : dg.mrows;
  const H = ROW_H[mode](cols);
  const pos = new Map<string, { x: number; y: number }>();
  for (const n of dg.nodes) {
    const [c, r] = mode === "d" ? n.d : n.m;
    pos.set(n.id, { x: (c + 0.5) * 100, y: (r + 0.5) * H });
  }
  const edges = dg.edges.map(([a, b]) => {
    const s = pos.get(a)!;
    const t = pos.get(b)!;
    const dx = t.x - s.x;
    const dy = t.y - s.y;
    const d =
      Math.abs(dx) >= Math.abs(dy)
        ? `M${s.x} ${s.y} C${s.x + dx / 2} ${s.y} ${t.x - dx / 2} ${t.y} ${t.x} ${t.y}`
        : `M${s.x} ${s.y} C${s.x} ${s.y + dy / 2} ${t.x} ${t.y - dy / 2} ${t.x} ${t.y}`;
    return { a, b, d, len: Math.hypot(dx, dy) };
  });
  return { cols, rows, H, W: cols * 100, pos, edges };
}

function Canvas({
  dg,
  mode,
  active,
  onPick,
  animate,
  className,
}: {
  dg: Diagram;
  mode: Mode;
  active: string;
  onPick: (id: string, how: "hover" | "click") => void;
  animate: boolean;
  className?: string;
}) {
  const g = useMemo(() => geometry(dg, mode), [dg, mode]);
  const linked = useMemo(() => {
    const s = new Set([active]);
    dg.edges.forEach(([a, b]) => {
      if (a === active) s.add(b);
      if (b === active) s.add(a);
    });
    return s;
  }, [dg, active]);
  const sw = mode === "d" ? 0.55 : 0.75;

  return (
    <div className={cn("relative w-full", className)} style={{ aspectRatio: `${g.W} / ${g.rows * g.H}` }}>
      <svg viewBox={`0 0 ${g.W} ${g.rows * g.H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <radialGradient id={`pk-${dg.id}-${mode}`}>
            <stop offset="0%" stopColor="#e6faf6" />
            <stop offset="45%" stopColor="#00c9a7" />
            <stop offset="100%" stopColor="#00c9a7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {g.edges.map((e, i) => {
          const on = e.a === active || e.b === active;
          return (
            <g key={`${e.a}-${e.b}`}>
              <path d={e.d} fill="none" stroke={on ? "#00c9a7" : "#3a3942"} strokeWidth={on ? sw * 1.6 : sw} strokeLinecap="round" style={{ transition: "stroke .35s, stroke-width .35s" }} />
              {on && <path d={e.d} fill="none" stroke="#00c9a7" strokeWidth={sw * 5} strokeOpacity={0.12} strokeLinecap="round" />}
              {animate && (
                <circle r={on ? 2.6 : 1.8} fill={`url(#pk-${dg.id}-${mode})`} opacity={on ? 1 : 0.55}>
                  <animateMotion dur={`${Math.max(1.6, e.len / 55)}s`} begin={`${(i * 0.37) % 2}s`} repeatCount="indefinite" path={e.d} />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
      {dg.nodes.map((n) => {
        const p = g.pos.get(n.id)!;
        const isActive = n.id === active;
        const dim = !linked.has(n.id);
        return (
          <button
            key={n.id}
            type="button"
            aria-pressed={isActive}
            aria-label={`${n.label}: ${n.sub}`}
            onMouseEnter={() => onPick(n.id, "hover")}
            onFocus={() => onPick(n.id, "hover")}
            onClick={() => onPick(n.id, "click")}
            className={cn(
              "group/node absolute flex [&>span]:transition-opacity [&>span]:duration-300 -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-2xl border px-2.5 py-2 text-left transition-[opacity,transform,background-color,border-color,box-shadow] duration-300 sm:gap-3 sm:px-3 sm:py-2.5",
              isActive
                ? "z-10 scale-[1.04] border-teal-500 bg-[#0d2622] shadow-[0_0_0_4px_rgb(0_201_167/0.12),0_18px_40px_rgb(0_0_0/0.45)]"
                : "border-ink-700 bg-ink-850 hover:border-ink-500",
              dim && "border-ink-750 [&>span]:opacity-40",
            )}
            style={{ left: `${(p.x / g.W) * 100}%`, top: `${(p.y / (g.rows * g.H)) * 100}%`, width: `${(86 / g.cols) * (mode === "m" ? 1.04 : 1)}%` }}
          >
            <span
              className="grid size-8 shrink-0 place-items-center rounded-xl sm:size-9"
              style={{ background: `${layerColor[n.layer]}1f`, color: layerColor[n.layer] }}
            >
              <DiagramIcon name={n.icon} className="size-[17px] sm:size-[19px]" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[12.5px] leading-tight font-semibold text-white sm:text-[13.5px]">{n.label}</span>
              <span className="mt-0.5 hidden text-[11px] leading-tight text-ink-300 sm:block">{n.sub}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Interactive architecture diagram. Hover, focus or tap a node to light up its
 * connections; packets flow along every link. Auto-tours the nodes while in
 * view until the visitor interacts. Static (no packets / tour) for reduced motion.
 */
export function FlowDiagram({ diagram, className }: { diagram: Diagram; className?: string }) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(diagram.nodes[0].id);
  const [touched, setTouched] = useState(false);
  const idx = diagram.nodes.findIndex((n) => n.id === active);
  const node: DiagramNode = diagram.nodes[idx];

  useEffect(() => {
    if (touched || reduced || !inView) return;
    const t = setInterval(() => {
      setActive((cur) => {
        const i = diagram.nodes.findIndex((n) => n.id === cur);
        return diagram.nodes[(i + 1) % diagram.nodes.length].id;
      });
    }, 2600);
    return () => clearInterval(t);
  }, [touched, reduced, inView, diagram.nodes]);

  const pick = (id: string) => {
    setTouched(true);
    setActive(id);
  };
  const step = (d: number) => pick(diagram.nodes[(idx + d + diagram.nodes.length) % diagram.nodes.length].id);
  const animate = !reduced && inView;

  return (
    <div ref={ref} className={cn("relative isolate overflow-hidden rounded-[28px] bg-ink-900 text-white", className)}>
      <div aria-hidden className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_40%,#000_35%,transparent_80%)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-80 w-[70%] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="flex flex-col gap-2 px-5 pt-6 sm:px-8 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="kicker text-teal-400">Interactive diagram</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1" aria-hidden>
            {[...new Set(diagram.nodes.map((n) => n.layer))].map((l) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] font-medium text-ink-300">
                <span className="size-2 rounded-full" style={{ background: layerColor[l] }} />
                {l}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[clamp(20px,2.4vw,28px)] leading-tight font-bold tracking-[-0.02em]">{diagram.title}</p>
        <p className="max-w-[640px] text-[15px] text-ink-300">{diagram.caption}</p>
      </div>

      <div className="px-3 pt-4 pb-2 sm:px-6 lg:px-8 lg:pt-8 lg:pb-6">
        <Canvas dg={diagram} mode="d" active={active} onPick={pick} animate={animate} className="hidden lg:block" />
        <Canvas dg={diagram} mode="m" active={active} onPick={pick} animate={animate} className="lg:hidden" />
      </div>

      <div className="border-t border-ink-700/80 bg-ink-850/70 px-5 py-5 backdrop-blur sm:px-8">
        <div aria-live="polite" className="grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-8"
            >
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: layerColor[node.layer] }}>
                  <span className="size-1.5 rounded-full" style={{ background: layerColor[node.layer] }} />
                  {node.layer}
                </span>
                <strong className="text-xl tracking-[-0.01em]">{node.label}</strong>
                <span className="text-sm text-ink-300">{node.sub}</span>
              </div>
              <ul className="flex flex-col gap-1.5 text-[14.5px] text-ink-200">
                {node.detail.map((d) => (
                  <li key={d} className="flex gap-2.5">
                    <span aria-hidden className="mt-[9px] size-1 shrink-0 rounded-full bg-teal-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-2 md:flex-col md:items-end">
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => step(-1)} aria-label="Previous component" className="grid size-9 place-items-center rounded-full border border-ink-600 text-ink-200 transition-colors hover:border-teal-500 hover:text-teal-400">
                ←
              </button>
              <span className="min-w-12 text-center font-mono text-xs text-ink-300 tabular-nums">
                {String(idx + 1).padStart(2, "0")} / {String(diagram.nodes.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => step(1)} aria-label="Next component" className="grid size-9 place-items-center rounded-full border border-ink-600 text-ink-200 transition-colors hover:border-teal-500 hover:text-teal-400">
                →
              </button>
            </div>
            {node.href && (
              <Link href={node.href} className="ml-auto text-sm font-semibold text-teal-400 hover:underline md:ml-0">
                {node.hrefLabel ?? "Learn more"} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
