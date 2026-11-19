import { work } from "@/data/work";
import { WorkCard } from "@/components/work/WorkCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { TextLink } from "@/components/ui/Button";

export function SelectedWork() {
  const featured = work.filter((c) => c.featured);
  const [lead, ...side] = featured;
  const more = work.filter((c) => !c.featured).slice(0, 3);

  return (
    <section id="work" className="bg-white py-24">
      <div className="wrap flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <p className="kicker text-teal-700">Selected work</p>
            <SplitHeading
              text="Products in the hands of real users."
              className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
          </div>
          <TextLink href="/work">All {work.length} case studies</TextLink>
        </div>

        <div className="grid gap-5 lg:grid-cols-[7fr_5fr]">
          <Reveal className="h-full">
            <WorkCard c={lead} size="lg" />
          </Reveal>
          <div className="grid gap-5">
            {side.map((c, i) => (
              <Reveal key={c.slug} delay={0.1 * (i + 1)} className="h-full">
                <WorkCard c={c} />
              </Reveal>
            ))}
          </div>
        </div>

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <WorkCard c={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
