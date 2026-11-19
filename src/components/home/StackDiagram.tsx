import { diagrams } from "@/data/diagrams";
import { FlowDiagram } from "@/components/diagram/FlowDiagram";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Homepage: the CiyloCore stack as an explorable diagram. */
export function StackDiagram() {
  return (
    <section className="bg-white py-24">
      <div className="wrap flex flex-col gap-10">
        <div className="flex flex-col gap-3 md:max-w-[720px]">
          <p className="kicker text-teal-700">The CiyloCore</p>
          <SplitHeading
            text="Every layer of your product, under one roof."
            className="text-[clamp(30px,4vw,48px)] leading-[1.06] font-extrabold tracking-[-0.035em]"
          />
          <p className="text-[17px] leading-relaxed text-ink-500">
            Most products need three or four vendors. Ciylotrons design, build and connect every layer themselves, so nothing gets
            lost between hand-offs.
          </p>
        </div>
        <Reveal>
          <FlowDiagram diagram={diagrams.ciylocore} />
        </Reveal>
      </div>
    </section>
  );
}
