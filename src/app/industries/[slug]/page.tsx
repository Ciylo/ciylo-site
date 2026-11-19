import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industryPages, getIndustry } from "@/data/industries";
import { getWork } from "@/data/work";
import { solutions } from "@/data/solutions";
import { PageHero } from "@/components/PageHero";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { FlowDiagram } from "@/components/diagram/FlowDiagram";
import { diagrams } from "@/data/diagrams";
import { Button } from "@/components/ui/Button";
import { ServiceCards } from "@/components/ServiceChips";
import { WorkCard } from "@/components/work/WorkCard";
import { contactHref } from "@/lib/contact";

export function generateStaticParams() {
  return industryPages.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return {
    title: `${i.name} technology`,
    description: i.intro,
    alternates: { canonical: `/industries/${i.slug}` },
  };
}

export default async function IndustryPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();

  const cases = i.work.map(getWork).filter((c) => c !== undefined);
  const sols = solutions.filter((s) => s.industries.includes(i.slug));
  const cta = contactHref({ inquiry: "new-project", industry: i.slug });
  const diagram = i.diagram ? diagrams[i.diagram] : undefined;

  return (
    <>
      <PageHero kicker={`Industries · ${i.name}`} title={i.hero} lead={i.intro}>
        <Reveal delay={0.45} className="flex flex-wrap gap-3 pt-2">
          <Button href={cta} arrow>
            Talk to our {i.name.split(" ")[0].toLowerCase()} team
          </Button>
          <Button href="/industries" variant="ghost-dark">
            All industries
          </Button>
        </Reveal>
      </PageHero>

      <section className="bg-white py-20">
        <div
          className={
            diagram
              ? "wrap flex flex-col gap-12"
              : "wrap grid items-center gap-12 lg:grid-cols-2"
          }
        >
          <div className="flex flex-col gap-5">
            <p className="kicker text-teal-700">
              What we build for {i.name.toLowerCase()}
            </p>
            <SplitHeading
              text="Where we help most"
              className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]"
            />
            <RevealGroup
              role="list"
              className={
                diagram ? "grid gap-x-10 sm:grid-cols-2" : "flex flex-col"
              }
            >
              {i.focus.map((f, n) => (
                <RevealItem
                  key={f}
                  role="listitem"
                  className="flex items-center gap-4 border-t border-ink-150 py-4 last:border-b sm:[&:nth-last-child(2):nth-child(odd)]:border-b"
                >
                  <span className="font-mono text-xs text-teal-700">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold tracking-[-0.01em]">
                    {f}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          {diagram ? (
            <Reveal>
              <FlowDiagram diagram={diagram} />
            </Reveal>
          ) : (
            <Reveal className="overflow-hidden rounded-[28px] bg-ink-850">
              <Img
                src={i.image}
                alt=""
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-ink-50 py-20">
        <div className="wrap flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SplitHeading
              text="Relevant services"
              className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]"
            />
            <Link
              href="/services"
              className="text-sm font-semibold text-teal-700 hover:underline"
            >
              All services →
            </Link>
          </div>
          <ServiceCards
            ids={i.services}
            context={{ industry: i.slug, inquiry: "new-project" }}
          />
        </div>
      </section>

      {sols.length > 0 && (
        <section className="bg-ink-900 py-20 text-white">
          <div className="wrap flex flex-col gap-8">
            <SplitHeading
              text="Ready-to-deploy solutions"
              className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]"
            />
            <RevealGroup className="grid gap-4 md:grid-cols-3">
              {sols.map((s) => (
                <RevealItem key={s.slug}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-[22px] border border-ink-700 bg-ink-850 p-6 transition-colors hover:border-teal-500"
                  >
                    <p className="kicker text-teal-500">Solution</p>
                    <strong className="text-xl">{s.name}</strong>
                    <p className="text-sm leading-relaxed text-ink-200">
                      {s.short}
                    </p>
                    <span className="mt-auto pt-2 text-sm font-semibold text-teal-400 transition-transform group-hover:translate-x-1">
                      Explore →
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <section className="bg-white py-20">
        <div className="wrap flex flex-col gap-8">
          <SplitHeading
            text="Related case studies"
            className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]"
          />
          {cases.length > 0 ? (
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <RevealItem key={c.slug} className="h-full">
                  <WorkCard c={c} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="rounded-[22px] bg-ink-50 p-8 text-ink-600">
              Case studies for {i.name.toLowerCase()} are on their way.{" "}
              <Link
                href={cta}
                className="font-semibold text-teal-700 hover:underline"
              >
                Ask us for a walkthrough of our work in this sector →
              </Link>
            </p>
          )}
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-teal-500 p-8 text-ink-900 sm:p-10">
            <div className="flex flex-col gap-2">
              <p className="text-[clamp(24px,3vw,30px)] font-extrabold tracking-[-0.02em]">
                Building for {i.name.toLowerCase()}?
              </p>
              <p className="text-base text-ink-900/80">
                Tell us about it. We reply within one working day.
              </p>
            </div>
            <Button href={cta} variant="dark" arrow>
              Start the conversation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
