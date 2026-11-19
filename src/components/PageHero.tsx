import type { ReactNode } from "react";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Dark page hero used by inner pages. */
export function PageHero({
  kicker,
  title,
  accent,
  lead,
  aside,
  children,
}: {
  kicker: string;
  title: string;
  accent?: string[];
  lead?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 pt-40 pb-20 text-white sm:pt-44">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_30%_0%,#000_30%,transparent_75%)]" />
      <div aria-hidden className="absolute -top-40 left-1/4 -z-10 size-[520px] rounded-full bg-teal-500/15 blur-[120px]" />
      <div className="wrap flex flex-wrap items-end justify-between gap-10">
        <div className="flex max-w-[760px] flex-col gap-5">
          <Reveal>
            <p className="kicker text-teal-500">{kicker}</p>
          </Reveal>
          <SplitHeading
            as="h1"
            immediate
            text={title}
            accent={accent}
            className="text-[clamp(38px,6vw,64px)] leading-[1.03] font-extrabold tracking-[-0.035em]"
          />
          {lead && (
            <Reveal delay={0.3}>
              <p className="max-w-[620px] text-[17px] leading-relaxed text-pretty text-ink-200">{lead}</p>
            </Reveal>
          )}
          {children}
        </div>
        {aside && <Reveal delay={0.4}>{aside}</Reveal>}
      </div>
    </section>
  );
}
