import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ServiceAccordion } from "@/components/services/ServiceAccordion";
import { AdvisoryStrip } from "@/components/services/AdvisoryStrip";
import { CountUp } from "@/components/ui/CountUp";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { engagementModels, mvpPipeline, services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Embedded firmware, PCB design, IoT, edge AI, AI engineering, web, mobile, SaaS, e-commerce, ERP/CRM, cloud and end-to-end product development with an MVP pipeline.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services · Silicon to screen"
        title="Pick one layer, or hand us the whole stack."
        accent={["whole", "stack."]}
        lead="Every Ciylo team works from the same roadmap, so your hardware, firmware, AI and apps launch together."
        aside={
          <div className="grid min-w-[300px] grid-cols-2 gap-2.5">
            {site.stats.map((s) => (
              <div key={s.label} className="rounded-[18px] border border-ink-700 bg-ink-800 p-[18px]">
                <CountUp to={s.value} suffix={s.suffix} className="block text-[28px] font-extrabold text-teal-500" />
                <span className="text-[13px] text-ink-200">{s.label}</span>
              </div>
            ))}
          </div>
        }
      />

      {/* MVP pipeline: complete ownership band */}
      <section className="relative overflow-hidden bg-teal-500 py-20 text-ink-900">
        <div aria-hidden className="grid-bg-light absolute inset-0 opacity-60" />
        <div className="wrap relative flex flex-col gap-10">
          <div className="grid gap-6 lg:grid-cols-[6fr_5fr] lg:items-end">
            <div className="flex flex-col gap-3">
              <p className="kicker text-ink-900/70">Product development & MVP pipeline</p>
              <SplitHeading
                text="Complete ownership, from UI/UX to cloud to the circuit board."
                accentClassName=""
                className="text-[clamp(30px,4vw,46px)] leading-[1.06] font-extrabold tracking-[-0.03em]"
              />
            </div>
            <Reveal>
              <p className="text-base leading-relaxed text-ink-900/80">
                Bring us an idea and we take it all the way: research, UI/UX, software and cloud, firmware and hardware,
                delivered as one package by one accountable team. Our MVP pipeline gets a working product in front of users
                fast, then keeps scaling it.
              </p>
            </Reveal>
          </div>
          <div className="relative">
          {/* Pipeline track with a travelling pulse (lg+) */}
          <div aria-hidden className="pointer-events-none absolute top-[30px] right-[8%] left-[8%] z-10 hidden h-0.5 overflow-hidden rounded-full bg-ink-900/25 lg:block">
            <span className="pipeline-pulse absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
          <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {mvpPipeline.map((p, i) => (
              <RevealItem
                key={p.step}
                className="group relative flex flex-col gap-3 rounded-[20px] bg-ink-900 p-5 text-white transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgb(0_61_51/0.7)]"
              >
                <span className="flex items-center justify-between font-semibold text-xs text-teal-400">
                  <span className="relative z-20 grid size-7 place-items-center rounded-full bg-teal-500 font-mono text-[11px] text-ink-900 ring-4 ring-ink-900 transition-transform duration-300 group-hover:scale-110">
                    {p.step}
                  </span>
                  {i < mvpPipeline.length - 1 && <span className="hidden text-ink-500 lg:inline">→</span>}
                </span>
                <strong className="text-lg">{p.title}</strong>
                <span className="text-[13px] leading-normal text-ink-300">{p.desc}</span>
              </RevealItem>
            ))}
          </RevealGroup>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="dark" arrow>
              Start your MVP
            </Button>
            <a href="#product-development" className="text-sm font-semibold underline-offset-4 hover:underline">
              What&apos;s included ↓
            </a>
          </div>
        </div>
      </section>

      {/* Advisory strip */}
      <section className="bg-ink-50 py-20">
        <div className="wrap flex flex-col gap-10">
          <div className="grid gap-6 lg:grid-cols-[6fr_5fr] lg:items-end">
            <div className="flex flex-col gap-3">
              <p className="kicker text-teal-700">Advisory</p>
              <SplitHeading
                text="Clear answers before big decisions."
                className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
              />
            </div>
            <p className="text-base leading-relaxed text-ink-600">
              For founders testing a market, operators rescuing a product and investors weighing a deal: engineering-led
              advice across software, firmware and hardware.
            </p>
          </div>
          <AdvisoryStrip />
        </div>
      </section>

      <section className="bg-white pt-20 pb-24">
        <div className="wrap flex flex-col gap-4">
          <div className="flex max-w-[680px] flex-col gap-3 pb-4">
            <p className="kicker text-teal-700">All services</p>
            <SplitHeading
              text={`${services.length} disciplines, one roadmap.`}
              className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
            <p className="text-base leading-relaxed text-ink-500">
              Open any service to see what&apos;s included and the case studies where we&apos;ve done it.
            </p>
          </div>
          <ServiceAccordion />
        </div>
      </section>

      <section className="bg-ink-50 py-24">
        <div className="wrap flex flex-col gap-8">
          <div className="flex max-w-[640px] flex-col gap-3">
            <SplitHeading
              text="Three ways to work with us"
              className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
            <p className="text-base text-ink-500">
              Start small and move up as the product grows. The same Ciylotrons stay with you.
            </p>
          </div>
          <Reveal>
            <div className="overflow-x-auto rounded-[22px] border border-ink-150 bg-white" data-lenis-prevent>
              <table className="w-full min-w-[720px] border-collapse text-[15px]">
                <thead>
                  <tr>
                    <th className="w-[18%] p-6" />
                    {engagementModels.columns.map((c, i) => (
                      <th
                        key={c}
                        scope="col"
                        className={cn(
                          "px-6 py-[22px] text-left text-lg font-bold",
                          i === engagementModels.highlight && "bg-ink-900 text-white",
                        )}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-ink-100">
                    <th scope="row" className="px-6 py-[14px] text-left text-[13px] font-semibold text-ink-500">
                      Start here
                    </th>
                    {engagementModels.entry.map((e, i) => (
                      <td key={e.href} className={cn("px-6 py-[14px]", i === engagementModels.highlight && "bg-ink-850")}>
                        <Link href={e.href} className={cn("text-sm font-semibold hover:underline", i === engagementModels.highlight ? "text-teal-400" : "text-teal-700")}>
                          {e.label} →
                        </Link>
                      </td>
                    ))}
                  </tr>
                  {engagementModels.rows.map((r) => (
                    <tr key={r.label} className="border-t border-ink-100">
                      <th scope="row" className="px-6 py-[18px] text-left text-[13px] font-semibold text-ink-500">
                        {r.label}
                      </th>
                      {r.cells.map((cell, i) => (
                        <td
                          key={i}
                          className={cn("px-6 py-[18px] align-top", i === engagementModels.highlight && "bg-ink-850 text-white")}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="wrap">
          <Reveal>
            <div className="relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[28px] bg-ink-900 p-8 text-white sm:p-10">
              <div aria-hidden className="absolute -bottom-24 -left-10 size-72 rounded-full bg-teal-500/25 blur-3xl" />
              <div className="relative flex flex-col gap-2">
                <p className="text-[clamp(24px,3vw,30px)] font-extrabold tracking-[-0.02em]">Not sure which layer you need?</p>
                <p className="text-base text-ink-200">Book a short call and we&apos;ll map your idea from sensor to screen.</p>
              </div>
              <Button href="/contact" arrow className="relative">
                Book a call
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
