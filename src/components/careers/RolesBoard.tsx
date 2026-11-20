"use client";

import Link from "next/link";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { useState } from "react";
import { departments, openRoles, type Department } from "@/data/culture";
import { contactHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

/** Open roles as cards with a department filter. */
export function RolesBoard() {
  const [dept, setDept] = useState<"All" | Department>("All");
  const list = openRoles.filter((r) => dept === "All" || r.team === dept);

  return (
    <div className="flex flex-col gap-6">
      <LayoutGroup id="dept">
        <div role="tablist" aria-label="Filter roles by department" className="flex flex-wrap gap-1 self-start rounded-full bg-ink-75 p-1">
          {(["All", ...departments] as const).map((d) => {
            const n = d === "All" ? openRoles.length : openRoles.filter((r) => r.team === d).length;
            return (
              <button
                key={d}
                role="tab"
                aria-selected={dept === d}
                onClick={() => setDept(d)}
                className={cn(
                  "relative rounded-full px-4 py-2.5 text-sm transition-colors",
                  dept === d ? "font-semibold text-white" : "font-medium text-ink-600 hover:text-ink-900",
                )}
              >
                {dept === d && (
                  <motion.span layoutId="dept-pill" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">
                  {d} <span className="font-semibold tabular-nums text-[11px] opacity-60">{n}</span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((r) => (
            <motion.article
              key={r.title}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col gap-4 rounded-[22px] border border-ink-150 bg-white p-6 transition-[border-color,box-shadow] hover:border-teal-500 hover:shadow-[0_24px_50px_-30px_rgb(0_90_75/0.45)]"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-ink-900 px-2.5 py-1 font-semibold text-[11px] text-teal-400">{r.team}</span>
                <span className="rounded-full bg-ink-75 px-2.5 py-1 font-semibold text-[11px] text-ink-600">{r.experience}</span>
              </div>
              <h3 className="text-[22px] leading-tight font-bold tracking-[-0.02em] transition-colors group-hover:text-teal-700">{r.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink-600">{r.desc}</p>
              <Link
                href={contactHref({ inquiry: "careers" })}
                className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-teal-500 px-5 py-2.5 text-sm font-bold text-ink-900 transition-transform hover:translate-x-1"
              >
                Apply <span aria-hidden>→</span>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <p className="rounded-[22px] bg-ink-50 p-8 text-ink-600">
          No open {dept.toLowerCase()} roles right now.{" "}
          <Link href={contactHref({ inquiry: "careers" })} className="font-semibold text-teal-700 hover:underline">
            Send an open application →
          </Link>
        </p>
      )}
    </div>
  );
}
