"use client";

import { useEffect, useState } from "react";
import { offices } from "@/data/site";
import { useHydrated } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/cn";

function LocalTime({ tz }: { tz: string }) {
  const hydrated = useHydrated();
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);
  if (!hydrated) return <span className="tabular-nums">--:--</span>;
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(now);
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: tz }).format(now));
  // Studio hours: 12:00 to 24:00 PKT
  const open = hour >= 12;
  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      {time}
      <span className={cn("size-1.5 rounded-full", open ? "bg-teal-500" : "bg-ink-400")} aria-hidden />
      <span className="text-xs text-ink-500">{open ? "in office hours" : "out of hours"}</span>
    </span>
  );
}

/** Office cards with live local time. Placeholder slots render dashed. */
export function Offices() {
  return (
    <div className={cn("grid gap-4", offices.length > 1 ? "sm:grid-cols-2" : "max-w-[560px]")}>
      {offices.map((o) => {
        const placeholder = "placeholder" in o && o.placeholder;
        return (
          <article
            key={o.city}
            className={cn(
              "flex flex-col gap-3 rounded-[22px] p-6",
              placeholder ? "border-2 border-dashed border-ink-200 bg-transparent text-ink-400" : "border border-ink-150 bg-white",
            )}
          >
            <div className="flex items-center justify-between">
              <p className="kicker text-teal-700">{o.hq ? "Headquarters" : "Office"}</p>
              {!placeholder && o.timezone && (
                <span className="text-sm font-semibold text-ink-900">
                  <LocalTime tz={o.timezone} />
                </span>
              )}
            </div>
            <h3 className={cn("text-2xl font-extrabold tracking-[-0.02em]", !placeholder && "text-ink-900")}>
              {o.city}
              <span className="font-semibold text-ink-400">, {o.country}</span>
            </h3>
            <p className="text-[15px]">{o.address}</p>
            {placeholder ? (
              <p className="text-sm">{o.phone}</p>
            ) : (
              <a href={o.phoneHref} className="text-[15px] font-semibold text-teal-700 hover:underline">
                {o.phone}
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
}
