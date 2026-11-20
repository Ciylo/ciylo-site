"use client";

import Link from "next/link";
import { motion, LayoutGroup } from "motion/react";
import { useEffect, useState } from "react";
import { services, serviceGroups, type ServiceGroup } from "@/data/services";
import { getWork } from "@/data/work";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";
import { contactHref } from "@/lib/contact";

const filters: ("All" | ServiceGroup)[] = ["All", "Hardware", "Software", "Consulting", "Advisory"];
const filterLabel = (f: (typeof filters)[number]) => (f === "Consulting" ? "Strategy" : f);

export function ServiceAccordion() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<string[]>(["product-development"]);

  // Open (and scroll to) the service named in the URL hash, e.g. /services#ecommerce
  useEffect(() => {
    const sync = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const group = serviceGroups.find((g) => g.id.toLowerCase() === id);
      if (group) {
        setFilter("All");
        return;
      }
      if (services.some((s) => s.id === id)) {
        setFilter("All");
        setOpen((o) => (o.includes(id) ? o : [...o, id]));
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const visible = services.filter((s) => filter === "All" || s.group === filter);
  const allOpen = visible.every((s) => open.includes(s.id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LayoutGroup id="svc-filter">
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
                  <motion.span layoutId="svc-acc-pill" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">{filterLabel(f)}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? [] : visible.map((s) => s.id))}
          className="rounded-full border border-ink-200 bg-white px-[18px] py-2.5 text-sm font-medium hover:border-ink-900"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {serviceGroups
        .filter((g) => filter === "All" || g.id === filter)
        .map((g) => (
          <div key={g.id} id={g.id.toLowerCase()} className="flex scroll-mt-28 flex-col gap-2.5">
            <div className="flex items-baseline justify-between gap-3 px-1 pt-4">
              <h2 className="text-lg font-bold tracking-[-0.01em]">{g.label}</h2>
              <p className="text-sm text-ink-500">{g.blurb}</p>
            </div>
            {services
              .filter((s) => s.group === g.id)
              .map((s) => {
                const n = services.indexOf(s) + 1;
                const isOpen = open.includes(s.id);
                const related = s.work.map(getWork).filter((c) => c !== undefined);
                const hero = s.id === "product-development";
                return (
                  <motion.div
                    layout="position"
                    key={s.id}
                    id={s.id}
                    className={cn(
                      "scroll-mt-28 overflow-hidden rounded-[22px] border bg-white transition-colors",
                      isOpen ? "border-ink-900/15 shadow-[0_20px_50px_-30px_rgb(17_16_19/0.3)]" : "border-ink-150 hover:border-ink-200",
                      hero && "border-teal-500/40",
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${s.id}-panel`}
                      onClick={() => setOpen((o) => (isOpen ? o.filter((x) => x !== s.id) : [...o, s.id]))}
                      className="flex w-full flex-wrap items-center gap-x-5 gap-y-3 px-5 py-5 text-left sm:px-[26px] sm:py-[22px]"
                    >
                      <span className="w-7 font-semibold tabular-nums text-[13px] text-ink-500">{String(n).padStart(2, "0")}</span>
                      <span className="flex-[1_1_240px] text-[clamp(18px,2vw,22px)] font-bold tracking-[-0.02em]">{s.name}</span>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 font-semibold text-xs",
                          s.group === "Hardware" ? "bg-ink-900 text-teal-500" : hero ? "bg-teal-500 text-ink-900" : s.group === "Advisory" ? "bg-ink-75 text-ink-900" : "bg-teal-50 text-teal-800",
                        )}
                      >
                        {hero ? "End-to-end" : filterLabel(s.group)}
                      </span>
                      <span className="hidden text-sm text-ink-500 sm:inline">{s.items.length} services</span>
                      {related.length > 0 && (
                        <span className="hidden text-sm text-teal-700 md:inline">{related.length} case studies</span>
                      )}
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-9 place-items-center rounded-full text-xl transition-all duration-300",
                          isOpen ? "rotate-45 bg-ink-900 text-white" : "bg-ink-75",
                        )}
                      >
                        +
                      </span>
                    </button>
                    {/* Always in the HTML (crawlers, find-in-page); collapsed panels are inert */}
                        <motion.div
                          id={`${s.id}-panel`}
                          initial={false}
                          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                          inert={!isOpen}
                        >
                          <div className="flex flex-col gap-6 px-5 pb-7 sm:pr-[26px] sm:pl-[74px]">
                            <p className="max-w-[760px] text-[15px] leading-relaxed text-ink-600">{s.intro}</p>
                            <ul className="grid gap-x-7 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                              {s.items.map((it, i) => (
                                <motion.li
                                  key={it.title}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.05 * i + 0.1 }}
                                  className="flex gap-3"
                                >
                                  <span className="mt-[7px] size-2 shrink-0 rounded-full bg-teal-500" />
                                  <span className="flex flex-col gap-0.5">
                                    <strong className="text-[15px]">{it.title}</strong>
                                    <span className="text-sm leading-normal text-ink-500">{it.desc}</span>
                                  </span>
                                </motion.li>
                              ))}
                            </ul>

                            {s.extra && (
                              <div className="flex flex-col gap-4 rounded-[18px] bg-ink-50 p-5">
                                <p className="kicker text-teal-700">{s.extra.title}</p>
                                <ul className="grid gap-x-7 gap-y-4 sm:grid-cols-2">
                                  {s.extra.items.map((it) => (
                                    <li key={it.title} className="flex gap-3">
                                      <span className="mt-[7px] size-2 shrink-0 rounded-full bg-ink-900" />
                                      <span className="flex flex-col gap-0.5">
                                        <strong className="text-[15px]">{it.title}</strong>
                                        <span className="text-sm leading-normal text-ink-500">{it.desc}</span>
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex flex-col gap-3 border-t border-ink-100 pt-5">
                              <p className="kicker text-ink-500">Related case studies</p>
                              {related.length > 0 ? (
                                <div className="flex gap-3 overflow-x-auto pb-1" data-lenis-prevent>
                                  {related.map((c) => (
                                    <Link
                                      key={c.slug}
                                      href={`/work/${c.slug}`}
                                      className="group flex w-[230px] shrink-0 items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50 p-2 pr-3 transition-colors hover:border-teal-500/50 hover:bg-teal-50"
                                    >
                                      <span className={cn("relative size-14 shrink-0 overflow-hidden rounded-xl", c.stage === "dark" ? "bg-ink-850" : "bg-white")}>
                                        <Img src={c.cover} alt="" sizes="56px" className={cn("h-full w-full", c.coverFit === "cover" ? "object-cover object-top" : "object-contain")} />
                                      </span>
                                      <span className="flex min-w-0 flex-col">
                                        <span className="truncate text-sm font-bold">{c.name}</span>
                                        <span className="truncate text-xs text-ink-500">{c.industry}</span>
                                      </span>
                                      <span className="ml-auto text-teal-700 transition-transform group-hover:translate-x-0.5" aria-hidden>
                                        →
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-ink-500">
                                  Case studies coming soon. Ask us for a walkthrough of our work in this area.
                                </p>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                              <Link
                                href={contactHref({ inquiry: s.group === "Advisory" ? "advisory" : "new-project", service: s.id })}
                                className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-bold text-ink-900 transition-colors hover:bg-teal-400"
                              >
                                Get this service
                              </Link>
                              <Link href={contactHref({ service: s.id })} className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                                Talk to the {s.team} team →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                  </motion.div>
                );
              })}
          </div>
        ))}
    </div>
  );
}
