import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work, getWork } from "@/data/work";
import { getService } from "@/data/services";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { CoverParallax } from "@/components/work/CoverParallax";
import { WorkCard } from "@/components/work/WorkCard";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return work.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getWork(slug);
  if (!c) return {};
  return {
    title: `${c.name}: ${c.tagline}`,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { images: [{ url: c.cover }] },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getWork(slug);
  if (!c) notFound();

  const idx = work.indexOf(c);
  const next = work[(idx + 1) % work.length];
  const related = work.filter((w) => w.slug !== c.slug && w.services.some((s) => c.services.includes(s))).slice(0, 3);
  const phoneScreens = c.slug === "i-hospice";

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink-900 pt-40 pb-28 text-white sm:pt-44 sm:pb-32">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_0%,#000_30%,transparent_75%)]" />
        <div
          aria-hidden
          className="absolute -top-32 right-0 -z-10 size-[560px] rounded-full blur-[140px]"
          style={{ background: `${c.accent}40` }}
        />
        <div className="wrap flex flex-col gap-6">
          <Reveal>
            <Link href="/work" className="kicker inline-flex items-center gap-2 text-ink-300 hover:text-teal-400">
              ← All work
            </Link>
          </Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="flex max-w-[780px] flex-col gap-4">
              <Reveal delay={0.05}>
                <p className="kicker text-teal-500">
                  {c.industry} · {c.platforms.join(" · ")}
                </p>
              </Reveal>
              <SplitHeading
                as="h1"
                immediate
                text={c.name}
                className="text-[clamp(44px,8vw,96px)] leading-[0.95] font-extrabold tracking-[-0.045em]"
              />
              <Reveal delay={0.25}>
                <p className="text-[clamp(20px,2.4vw,28px)] leading-snug font-semibold text-ink-200">{c.tagline}</p>
              </Reveal>
            </div>
            <Reveal delay={0.35} className="flex flex-wrap gap-2">
              {c.services.map((id) => {
                const s = getService(id);
                return s ? (
                  <Link
                    key={id}
                    href={`/services#${id}`}
                    className="rounded-full border border-ink-600 px-3.5 py-1.5 text-[13px] text-ink-200 transition-colors hover:border-teal-500 hover:text-teal-400"
                  >
                    {s.name}
                  </Link>
                ) : null;
              })}
            </Reveal>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-white pb-6">
        <CoverParallax c={c} />
      </div>

      {/* Overview */}
      <section className="bg-white py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[4fr_8fr]">
          <Reveal className="flex flex-col gap-3">
            <p className="kicker text-teal-700">Overview</p>
            {c.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.logo} alt={`${c.name} logo`} className="h-10 w-auto self-start" />
            )}
          </Reveal>
          <div className="flex flex-col gap-10">
            <Reveal>
              <p className="text-[clamp(20px,2.2vw,26px)] leading-[1.45] font-medium tracking-[-0.01em] text-pretty">{c.intro}</p>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              <Reveal className="flex flex-col gap-3 border-t border-ink-150 pt-5">
                <p className="kicker text-ink-500">The challenge</p>
                <p className="text-[15px] leading-relaxed text-ink-600">{c.challenge}</p>
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col gap-3 border-t border-ink-150 pt-5">
                <p className="kicker text-ink-500">What we built</p>
                <p className="text-[15px] leading-relaxed text-ink-600">{c.approach}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {c.highlights && (
        <section className="bg-ink-900 py-16 text-white">
          <RevealGroup className="wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.highlights.map((h) => (
              <RevealItem key={h.label} className="flex flex-col gap-1 border-l border-ink-700 pl-5">
                <span className="text-[clamp(36px,4vw,52px)] font-extrabold tracking-[-0.03em] text-teal-500">{h.value}</span>
                <span className="text-sm text-ink-300">{h.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Features */}
      <section className="bg-ink-50 py-20">
        <div className="wrap flex flex-col gap-10">
          <SplitHeading
            text="Core features"
            className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]"
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.features.map((f, i) => (
              <RevealItem
                key={f.title}
                className="group flex flex-col gap-3 rounded-[22px] border border-ink-100 bg-white p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(17_16_19/0.35)]"
              >
                <span className="font-mono text-xs" style={{ color: c.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <strong className="text-lg tracking-[-0.01em]">{f.title}</strong>
                <span className="text-[15px] leading-relaxed text-ink-600">{f.desc}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Screens */}
      <section className="bg-white py-20">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SplitHeading
              text="Inside the product"
              className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]"
            />
            <p className="text-sm text-ink-500">{c.screens.length} screens</p>
          </div>
          <div className={cn("grid gap-5", phoneScreens ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "sm:grid-cols-2")}>
            {c.screens.map((s, i) => {
              const wide = !phoneScreens && i % 5 === 0;
              return (
                <Reveal key={s.src + i} delay={(i % 2) * 0.08} className={cn(wide && "sm:col-span-2")}>
                  <figure className="group flex flex-col gap-3">
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-[22px]",
                        phoneScreens ? "aspect-[375/812] bg-ink-75" : wide ? "aspect-[16/9]" : "aspect-[4/3]",
                        !phoneScreens && (c.stage === "dark" && c.coverFit === "contain" ? "bg-ink-850" : "bg-ink-75"),
                      )}
                    >
                      <Img
                        src={s.src}
                        alt={`${c.name}: ${s.title}`}
                        sizes={phoneScreens ? "240px" : wide ? "(min-width: 1188px) 1140px, 100vw" : "(min-width: 640px) 560px, 100vw"}
                        className={cn(
                          "absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]",
                          phoneScreens ? "object-cover object-top" : c.coverFit === "cover" ? "object-cover object-top" : "object-contain",
                        )}
                      />
                    </div>
                    <figcaption className="flex flex-col gap-1 px-1">
                      <strong className="text-[15px]">{s.title}</strong>
                      {s.desc && <span className="text-sm leading-normal text-ink-500">{s.desc}</span>}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related + next */}
      {related.length > 0 && (
        <section className="bg-ink-50 py-20">
          <div className="wrap flex flex-col gap-8">
            <SplitHeading
              text="Related work"
              className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]"
            />
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RevealItem key={r.slug} className="h-full">
                  <WorkCard c={r} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <section className="bg-white">
        <Link
          href={`/work/${next.slug}`}
          className="group wrap flex flex-wrap items-center justify-between gap-6 border-t border-ink-150 py-14"
        >
          <span className="flex flex-col gap-2">
            <span className="kicker text-ink-500">Next case study</span>
            <span className="text-[clamp(32px,5vw,64px)] leading-none font-extrabold tracking-[-0.04em] transition-colors group-hover:text-teal-700">
              {next.name}
            </span>
          </span>
          <span className="grid size-16 place-items-center rounded-full bg-ink-900 text-2xl text-teal-500 transition-transform duration-500 group-hover:translate-x-2 group-hover:-rotate-45">
            →
          </span>
        </Link>
      </section>

      <section className="bg-white pb-20">
        <div className="wrap">
          <div className="relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[28px] bg-teal-500 p-8 text-ink-900 sm:p-10">
            <div className="flex flex-col gap-2">
              <p className="text-[clamp(24px,3vw,30px)] font-extrabold tracking-[-0.02em]">Building something like {c.name}?</p>
              <p className="text-base text-ink-900/80">Tell us about it. We reply within one working day.</p>
            </div>
            <Button href="/contact" variant="dark" arrow>
              Start a project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
