import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions, getSolution } from "@/data/solutions";
import { getIndustry } from "@/data/industries";
import { PageHero } from "@/components/PageHero";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FlowDiagram } from "@/components/diagram/FlowDiagram";
import { diagrams } from "@/data/diagrams";
import { Button } from "@/components/ui/Button";
import { ServiceCards } from "@/components/ServiceChips";
import { contactHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.short,
    alternates: { canonical: `/solutions/${s.slug}` },
  };
}

const layerStyle: Record<string, string> = {
  Hardware: "bg-ink-900 text-white",
  Firmware: "bg-ink-850 text-white",
  App: "bg-teal-500 text-ink-900",
  Cloud: "bg-teal-50 text-ink-900",
};

export default async function SolutionPage({
  params,
}: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const cta = contactHref({ inquiry: "new-project", solution: s.slug });

  return (
    <>
      <PageHero kicker={`Solutions · ${s.name}`} title={s.hero} lead={s.short}>
        <Reveal delay={0.45} className="flex flex-wrap gap-3 pt-2">
          <Button href={cta} arrow>
            Get this solution
          </Button>
          <Button href="#included" variant="ghost-dark">
            What&apos;s included ↓
          </Button>
        </Reveal>
      </PageHero>

      {/* Problem */}
      <section className="bg-white py-20">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <p className="kicker text-teal-700">The problem</p>
            <Reveal>
              <p className="text-[clamp(20px,2.2vw,26px)] leading-[1.45] font-medium tracking-[-0.01em]">
                {s.problem}
              </p>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-2 lg:pt-9">
            {s.pains.map((p) => (
              <RevealItem
                key={p}
                className="flex items-center gap-3 rounded-2xl bg-ink-50 px-4 py-3.5 text-[15px] font-medium"
              >
                <span
                  className="grid size-6 shrink-0 place-items-center rounded-full bg-ink-900 text-xs text-teal-400"
                  aria-hidden
                >
                  !
                </span>
                {p}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* How it works: interactive architecture */}
      {diagrams[s.slug] && (
        <section className="bg-white pb-20">
          <Reveal className="wrap">
            <FlowDiagram diagram={diagrams[s.slug]} />
          </Reveal>
        </section>
      )}

      {/* Included */}
      <section id="included" className="scroll-mt-24 bg-ink-50 py-20">
        <div className="wrap flex flex-col gap-10">
          <div className="flex max-w-[680px] flex-col gap-3">
            <p className="kicker text-teal-700">What&apos;s included</p>
            <SplitHeading
              text="Four layers, one accountable team."
              className="text-[clamp(28px,3.6vw,42px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
          </div>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.included.map((l, i) => (
              <RevealItem
                key={l.layer}
                className={cn(
                  "flex flex-col gap-4 rounded-[22px] p-6",
                  layerStyle[l.layer],
                )}
              >
                <span className="flex items-center justify-between font-semibold text-xs opacity-80">
                  {String(i + 1).padStart(2, "0")} · {l.layer.toUpperCase()}
                </span>
                <strong className="text-xl tracking-[-0.01em]">
                  {l.title}
                </strong>
                <ul className="flex flex-col gap-2 text-sm leading-normal opacity-90">
                  {l.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span aria-hidden>·</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="wrap flex flex-col gap-10">
          <div className="flex max-w-[680px] flex-col gap-3">
            <p className="kicker text-teal-700">Deployment timeline</p>
            <SplitHeading
              text="From first conversation to a fleet in the field."
              className="text-[clamp(28px,3.6vw,42px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
          </div>
          <RevealGroup className="relative grid gap-4 lg:grid-cols-4">
            <div
              aria-hidden
              className="absolute top-[22px] right-0 left-0 hidden h-0.5 bg-teal-100 lg:block"
            />
            {s.phases.map((p, i) => (
              <RevealItem
                key={p.title}
                className="relative flex flex-col gap-3"
              >
                <span
                  className={cn(
                    "relative z-10 grid size-11 place-items-center rounded-full font-mono text-[13px]",
                    i === s.phases.length - 1
                      ? "bg-teal-500 text-ink-900"
                      : "bg-ink-900 text-teal-500",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <strong className="text-lg">{p.title}</strong>
                <p className="text-sm leading-normal text-ink-500">{p.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-ink-50 py-20">
        <div className="wrap flex flex-col gap-8">
          <SplitHeading
            text="Services behind it"
            className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]"
          />
          <ServiceCards
            ids={s.services}
            context={{ inquiry: "new-project", solution: s.slug }}
          />
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="kicker text-ink-500">Used in</span>
            {s.industries.map((id) => {
              const ind = getIndustry(id);
              return ind ? (
                <Link
                  key={id}
                  href={`/industries/${id}`}
                  className="rounded-full border border-ink-150 bg-white px-3 py-1.5 text-sm hover:border-teal-500"
                >
                  {ind.name}
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-ink-900 p-8 text-white sm:p-10">
            <div className="flex flex-col gap-2">
              <p className="text-[clamp(24px,3vw,30px)] font-extrabold tracking-[-0.02em]">
                Ready to deploy {s.name.toLowerCase()}?
              </p>
              <p className="text-base text-ink-200">
                Tell us about your sites, users and timeline. We reply within
                one working day.
              </p>
            </div>
            <Button href={cta} arrow>
              Get this solution
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
