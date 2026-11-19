"use client";

import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { work, industries } from "@/data/work";
import { services } from "@/data/services";
import { WorkCard } from "./WorkCard";
import { cn } from "@/lib/cn";

const serviceFilters = services.filter((s) => work.some((c) => c.services.includes(s.id)));

export function WorkGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const industry = params.get("industry") ?? "All";
  const service = params.get("service") ?? "All";

  const set = (key: "industry" | "service", value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "All") next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const list = work.filter(
    (c) => (industry === "All" || c.industry === industry) && (service === "All" || c.services.includes(service)),
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <LayoutGroup id="industry">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
            {["All", ...industries].map((i) => (
              <button
                key={i}
                onClick={() => set("industry", i)}
                aria-pressed={industry === i}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm transition-colors",
                  industry === i ? "border-ink-900 text-white" : "border-ink-150 bg-white text-ink-700 hover:border-ink-900",
                )}
              >
                {industry === i && (
                  <motion.span layoutId="ind-pill" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">{i === "All" ? "All industries" : i}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="svc" className="text-sm text-ink-500">
            Service
          </label>
          <select
            id="svc"
            value={service}
            onChange={(e) => set("service", e.target.value)}
            className="rounded-full border border-ink-150 bg-white px-4 py-2 text-sm"
          >
            <option value="All">All services</option>
            {serviceFilters.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <span className="text-sm text-ink-500" aria-live="polite">
            {list.length} {list.length === 1 ? "project" : "projects"}
          </span>
        </div>
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.div
              key={c.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <WorkCard c={c} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <p className="rounded-2xl bg-ink-50 p-8 text-center text-ink-500">
          No published case studies match yet.{" "}
          <button className="font-semibold text-teal-700 underline" onClick={() => router.replace(pathname, { scroll: false })}>
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}
