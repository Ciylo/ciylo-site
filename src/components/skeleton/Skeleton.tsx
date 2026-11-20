import { cn } from "@/lib/cn";

/** Shimmering placeholder block. `tone` matches the surface it sits on. */
export function Skeleton({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return <div aria-hidden className={cn("skeleton rounded-xl", tone === "dark" ? "skeleton-dark" : "skeleton-light", className)} />;
}

/** Page-level skeleton: dark page hero followed by a card grid. Mirrors PageHero + card pages. */
export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div role="status" aria-live="polite" aria-label="Loading page">
      <section className="relative isolate overflow-hidden bg-ink-900 pt-40 pb-20 sm:pt-44">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_30%_0%,#000_30%,transparent_75%)]" />
        <div aria-hidden className="absolute -top-40 left-1/4 -z-10 size-[520px] rounded-full bg-teal-500/15 blur-[120px]" />
        <div className="wrap flex max-w-[1188px] flex-col gap-5">
          <Skeleton tone="dark" className="h-3.5 w-40" />
          <Skeleton tone="dark" className="h-[clamp(38px,6vw,64px)] w-full max-w-[720px]" />
          <Skeleton tone="dark" className="h-[clamp(38px,6vw,64px)] w-3/4 max-w-[520px]" />
          <div className="flex max-w-[620px] flex-col gap-2.5 pt-2">
            <Skeleton tone="dark" className="h-4 w-full" />
            <Skeleton tone="dark" className="h-4 w-5/6" />
          </div>
          <div className="flex gap-3 pt-2">
            <Skeleton tone="dark" className="h-14 w-44 rounded-full" />
            <Skeleton tone="dark" className="h-14 w-36 rounded-full" />
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }, (_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-ink-50">
              <Skeleton className="aspect-[16/10] rounded-none" />
              <div className="flex flex-col gap-3 p-6">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/** Case-study skeleton: hero, big cover, two-column body. */
export function CaseSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading case study">
      <section className="bg-ink-900 pt-40 pb-16 sm:pt-44">
        <div className="wrap flex flex-col gap-5">
          <Skeleton tone="dark" className="h-3.5 w-48" />
          <Skeleton tone="dark" className="h-14 w-full max-w-[640px]" />
          <Skeleton tone="dark" className="h-4 w-full max-w-[560px]" />
          <Skeleton tone="dark" className="mt-6 aspect-[16/8] w-full rounded-[28px]" />
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 7 }, (_, i) => (
              <Skeleton key={i} className={i % 3 === 2 ? "h-4 w-3/4" : "h-4 w-full"} />
            ))}
          </div>
        </div>
      </section>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
