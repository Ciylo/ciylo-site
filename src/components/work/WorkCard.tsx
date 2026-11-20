import Link from "next/link";
import { ViewTransition } from "react";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";
import { Tilt } from "@/components/ui/Tilt";
import type { CaseStudy } from "@/data/work";

/** Case-study card. `size="lg"` for featured placements. */
export function WorkCard({
  c,
  size = "md",
  className,
}: {
  c: CaseStudy;
  size?: "md" | "lg";
  className?: string;
}) {
  const dark = c.stage === "dark";
  return (
    <Tilt
      className={cn("h-full rounded-3xl", className)}
      max={size === "lg" ? 3.5 : 6}
    >
      <Link
        href={`/work/${c.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-ink-75 transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgb(17_16_19/0.4)]"
      >
        <div
          className={cn(
            "relative isolate overflow-hidden",
            size === "lg"
              ? "aspect-[16/11] lg:aspect-auto lg:min-h-[420px] lg:flex-1"
              : "aspect-[4/3]",
            dark ? "bg-ink-850" : "bg-ink-100",
          )}
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `radial-gradient(70% 60% at 50% 60%, ${c.accent}${dark ? "40" : "26"}, transparent 70%)`,
            }}
          />
          <ViewTransition name={`cover-${c.slug}`} share="morph" default="none">
          <Img
            src={c.cover}
            alt={`${c.name}: ${c.tagline}`}
            sizes={
              size === "lg"
                ? "(min-width: 1024px) 680px, 100vw"
                : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            }
            className={cn(
              "absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]",
              c.coverFit === "cover"
                ? "object-cover object-top"
                : "object-contain p-4",
            )}
          />
          </ViewTransition>
          <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-semibold text-[11px] text-ink-900 backdrop-blur">
            {c.industry}
          </span>
          <span
            aria-hidden
            className="absolute right-4 bottom-4 grid size-10 translate-y-3 place-items-center rounded-full bg-teal-500 text-ink-900 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            ↗
          </span>
        </div>
        <div
          className={cn(
            "flex flex-col gap-2.5",
            size === "lg" ? "p-7 lg:p-8" : "flex-1 p-6",
          )}
        >
          <p className="kicker text-teal-700">{c.platforms.join(" · ")}</p>
          <h3
            className={cn(
              "font-extrabold tracking-[-0.02em]",
              size === "lg" ? "text-[26px]" : "text-[21px]",
            )}
          >
            {c.name}
            <span className="font-semibold text-ink-500">: {c.tagline}</span>
          </h3>
          <p className="text-[15px] leading-relaxed text-ink-600">
            {c.summary}
          </p>
        </div>
      </Link>
    </Tilt>
  );
}
