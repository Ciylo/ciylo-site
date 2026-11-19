import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LeaderCard } from "@/components/about/LeaderCard";
import { Traits } from "@/components/about/Traits";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { leadership } from "@/data/team";

export const metadata: Metadata = {
  title: "Leadership",
  description: "The leadership of the CiyloCore: Noraiz Azam (CEO) and Tosin Omolewu (CPO).",
  alternates: { canonical: "/about/leadership" },
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        kicker="About · Leadership"
        title="Leading the CiyloCore."
        accent={["CiyloCore."]}
        lead="Deep engineering and healthcare execution, paired with enterprise product strategy, so every solution is secure, compliant and built for real-world scale."
      />
      <section className="bg-ink-50 py-20">
        <div className="wrap grid gap-5 lg:grid-cols-2">
          {leadership.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.1}>
              <LeaderCard l={l} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[680px] flex-col gap-3">
              <p className="kicker text-teal-700">How we lead</p>
              <SplitHeading
                text="Leaders from every seat."
                className="text-[clamp(28px,3.6vw,42px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
              />
              <p className="text-base leading-relaxed text-ink-500">
                Leadership at Ciylo isn&apos;t a title. These are the qualities we look for, and grow, in every Ciylotron.
              </p>
            </div>
            <Button href="/about/teams" variant="outline" size="md" arrow>
              Meet the teams
            </Button>
          </div>
          <Traits />
        </div>
      </section>
    </>
  );
}
