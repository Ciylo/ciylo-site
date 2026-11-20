import Link from "next/link";
import { industryPages } from "@/data/industries";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";

export function Industries() {
  return (
    <section id="industries" className="bg-white pb-24">
      <div className="wrap grid gap-12 lg:grid-cols-[5fr_7fr]">
        <div className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
          <p className="kicker text-teal-700">Industries we power</p>
          <SplitHeading
            text="Deep domain knowledge, wherever you operate."
            className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
          />
          <p className="text-base leading-relaxed text-ink-500">
            From healthcare to manufacturing, agriculture to telecom, we bring technical depth and industry knowledge to every
            build.
          </p>
          <TextLink href="/industries">All industries</TextLink>
        </div>
        <RevealGroup role="list" stagger={0.04} className="border-b border-ink-150">
          {industryPages.map((r) => (
            <RevealItem key={r.slug} role="listitem">
              <Link
                href={`/industries/${r.slug}`}
                className="group relative flex flex-wrap items-center justify-between gap-x-6 gap-y-1 overflow-hidden border-t border-ink-150 py-5"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-teal-50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                <span className="relative flex items-baseline gap-3 text-[clamp(19px,2vw,23px)] font-bold tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-3">
                  {r.name}
                  {r.work.length > 0 && <sup className="font-semibold tabular-nums text-xs font-normal text-teal-700">{r.work.length}</sup>}
                </span>
                <span className="relative flex items-center gap-3 text-sm text-ink-500 transition-transform duration-500 group-hover:-translate-x-3">
                  {r.detail}
                  <span className="text-teal-700" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
