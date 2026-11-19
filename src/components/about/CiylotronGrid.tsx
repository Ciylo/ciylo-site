"use client";

import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { useState } from "react";
import { ciylotrons, disciplines, type Discipline } from "@/data/team";
import { CiylotronCard } from "./CiylotronCard";
import { cn } from "@/lib/cn";

export function CiylotronGrid() {
  const [filter, setFilter] = useState<"All" | Discipline>("All");
  const list = ciylotrons.filter((p) => filter === "All" || p.discipline === filter);

  return (
    <div className="flex flex-col gap-8">
      <LayoutGroup id="disc">
        <div role="tablist" aria-label="Filter Ciylotrons" className="flex flex-wrap gap-1 self-start rounded-full bg-ink-75 p-1">
          {(["All", ...disciplines] as const).map((d) => {
            const count = d === "All" ? ciylotrons.length : ciylotrons.filter((p) => p.discipline === d).length;
            return (
              <button
                key={d}
                role="tab"
                aria-selected={filter === d}
                onClick={() => setFilter(d)}
                className={cn(
                  "relative rounded-full px-4 py-2.5 text-sm transition-colors",
                  filter === d ? "font-semibold text-white" : "font-medium text-ink-600 hover:text-ink-900",
                )}
              >
                {filter === d && (
                  <motion.span layoutId="disc-pill" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">
                  {d} <span className="font-mono text-[11px] opacity-60">{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>
      <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 8) * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <CiylotronCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
