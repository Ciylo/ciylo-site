import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CiylotronGrid } from "@/components/about/CiylotronGrid";
import { Moments } from "@/components/about/Moments";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ciylotrons, disciplines } from "@/data/team";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Teams · The Ciylotrons",
  description: `Meet the Ciylotrons: a ${site.teamSize}-person team across hardware, software, AI, design and growth.`,
  alternates: { canonical: "/about/teams" },
};

const blurbs: Record<string, string> = {
  Hardware: "PCB design, embedded firmware and the lab bench.",
  Software: "Web, mobile, SaaS and the systems behind them.",
  AI: "LLMs, agents, vision and predictive models.",
  Design: "Product, UI/UX and brand that people remember.",
  Growth: "Delivery, business development and search.",
};

export default function TeamsPage() {
  return (
    <>
      <PageHero
        kicker={`About · ${site.teamSize} Ciylotrons`}
        title="Meet the teams."
        accent={["teams."]}
        lead="Five disciplines, one CiyloCore. Every Ciylotron owns a domain and has the creative freedom to lead beyond it."
      />
      <section className="bg-white pt-16">
        <RevealGroup className="wrap grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {disciplines.map((d) => (
            <RevealItem key={d} className="rounded-[20px] bg-ink-50 p-5">
              <p className="kicker text-teal-700">{d}</p>
              <p className="mt-2 text-3xl font-extrabold tracking-[-0.02em]">{ciylotrons.filter((p) => p.discipline === d).length}</p>
              <p className="mt-1 text-[13px] leading-snug text-ink-500">{blurbs[d]}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <section className="bg-white py-16">
        <div className="wrap flex flex-col gap-6">
          <p className="text-sm text-ink-500">
            Showing {ciylotrons.length} of {site.teamSize} Ciylotrons. A ★ marks a Performer or Employee of the Month.
          </p>
          <CiylotronGrid />
        </div>
      </section>
      <section className="overflow-hidden bg-ink-900 py-24 text-white">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SplitHeading text="Off the clock" className="text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-[-0.03em]" />
            <Button href="/careers" arrow size="md">
              Join the team
            </Button>
          </div>
          <Moments limit={6} />
        </div>
      </section>
    </>
  );
}
