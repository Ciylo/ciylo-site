"use client";

import Link from "next/link";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { useState } from "react";
import { services, type ServiceGroup } from "@/data/services";
import { Spotlight } from "@/components/ui/Spotlight";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { cn } from "@/lib/cn";

const filters: ("All" | ServiceGroup)[] = ["All", "Hardware", "Software", "Consulting", "Advisory"];
const filterLabel = (f: (typeof filters)[number]) => (f === "Consulting" ? "Strategy" : f);

export function ServicesBento() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = services
    .filter((s) => (filter === "All" ? s.featured : s.group === filter))
    // The end-to-end offer closes the grid as a full-width banner
    .sort((a, b) => Number(a.id === "product-development") - Number(b.id === "product-development"));

  return (
    <section id="services" className="bg-white pt-16 pb-24">
      <div className="wrap flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-3">
            <p className="kicker text-teal-700">What we build</p>
            <SplitHeading
              text="Pick one layer, or hand us the whole stack."
              className="max-w-[640px] text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
          </div>
          <LayoutGroup id="bento-filter">
            <div role="tablist" aria-label="Filter services" className="flex flex-wrap gap-1 rounded-full bg-ink-75 p-1">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative rounded-full px-[18px] py-2.5 text-sm transition-colors",
                    filter === f ? "font-semibold text-white" : "font-medium text-ink-600 hover:text-ink-900",
                  )}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="bento-pill"
                      className="absolute inset-0 rounded-full bg-ink-900"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{filterLabel(f)}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((s) => {
              const n = services.indexOf(s) + 1;
              const dark = s.group === "Hardware";
              const hero = s.id === "product-development";
              return (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(hero && "sm:col-span-2 lg:col-span-3")}
                >
                  <Spotlight
                    className={cn(
                      "h-full rounded-[22px] transition-transform duration-500 hover:-translate-y-1",
                      hero ? "bg-teal-500 text-ink-900" : dark ? "bg-ink-850 text-white" : "bg-ink-75 text-ink-900",
                    )}
                    color={hero ? "rgb(255 255 255 / 0.35)" : dark ? "rgb(0 201 167 / 0.22)" : "rgb(0 201 167 / 0.16)"}
                  >
                    <Link href={`/services#${s.id}`} className={cn("flex h-full min-h-[260px] flex-col gap-3.5 p-[26px]", hero && "sm:p-10")}>
                      <span className="flex items-center justify-between">
                        <span
                          className={cn(
                            "kicker",
                            hero ? "text-ink-900/70" : dark ? "text-teal-500" : "text-teal-700",
                          )}
                        >
                          {hero ? "End-to-end" : s.group} · {String(n).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "grid size-[34px] place-items-center rounded-full transition-transform duration-300 group-hover/spot:rotate-45",
                            hero ? "bg-ink-900 text-teal-500" : dark ? "bg-teal-500 text-ink-900" : "bg-ink-900 text-white",
                          )}
                          aria-hidden
                        >
                          ↗
                        </span>
                      </span>
                      <span className={cn("font-bold tracking-[-0.02em]", hero ? "text-[28px] leading-tight" : "text-[22px]")}>
                        {s.name}
                      </span>
                      <span
                        className={cn(
                          "text-sm leading-relaxed",
                          hero ? "max-w-[520px] text-ink-900/80" : dark ? "text-ink-200" : "text-ink-600",
                        )}
                      >
                        {s.short}
                      </span>
                      <span className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
                        <span
                          className={cn(
                            "font-mono text-xs",
                            hero ? "text-ink-900/70" : dark ? "text-ink-300" : "text-ink-500",
                          )}
                        >
                          {s.tags.join(" · ")}
                        </span>
                        {s.work.length > 0 && (
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                              hero ? "bg-ink-900 text-teal-400" : dark ? "bg-ink-700 text-teal-400" : "bg-white text-teal-800",
                            )}
                          >
                            {s.work.length} case {s.work.length === 1 ? "study" : "studies"}
                          </span>
                        )}
                      </span>
                    </Link>
                  </Spotlight>
                </motion.div>
              );
            })}
            {(() => {
              const n = list.filter((s) => s.id !== "product-development").length;
              const r = n % 3;
              const total = filter === "All" ? services.length : services.filter((s) => s.group === filter).length;
              return (
                <motion.div
                  key={"cta-" + filter}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className={cn(r === 0 ? "lg:col-span-3" : r === 1 ? "lg:col-span-2" : "lg:col-span-1", n % 2 === 0 ? "sm:col-span-2" : "")}
                >
                  <Link
                    href={"/services" + (filter === "All" ? "" : "#" + filter.toLowerCase())}
                    className="group grid-bg-light flex h-full min-h-[140px] flex-wrap items-center justify-between gap-4 rounded-[22px] border-2 border-dashed border-ink-150 p-[26px] transition-colors hover:border-teal-500 hover:bg-teal-50"
                  >
                    <span className="flex flex-col gap-1">
                      <span className="kicker text-teal-700">{filter === "All" ? "Full catalogue" : filterLabel(filter)}</span>
                      <span className="text-xl font-bold tracking-[-0.02em]">
                        {filter === "All" ? "See all " + total + " services" : "Explore " + total + " " + filterLabel(filter).toLowerCase() + " services"}
                      </span>
                    </span>
                    <span className="grid size-11 place-items-center rounded-full bg-ink-900 text-white transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
                  </Link>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
