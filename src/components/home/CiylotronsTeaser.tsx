import { ciylotrons } from "@/data/team";
import { CiylotronCard } from "@/components/about/CiylotronCard";
import { Marquee } from "@/components/ui/Marquee";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CiylotronsTeaser() {
  const half = Math.ceil(ciylotrons.length / 2);
  const rowA = ciylotrons.slice(0, half);
  const rowB = ciylotrons.slice(half);

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="wrap grid items-end gap-8 lg:grid-cols-[7fr_5fr]">
        <div className="flex flex-col gap-3">
          <p className="kicker text-teal-700">The CiyloCore</p>
          <SplitHeading
            text="Meet the Ciylotrons: engineers who don't stay in their lane."
            accent={["Ciylotrons"]}
            accentClassName="text-teal-700"
            className="max-w-[720px] text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
          />
        </div>
        <Reveal className="flex flex-col gap-5">
          <p className="text-base leading-relaxed text-ink-600">
            A Ciylotron knows their domain inside out, but they also design, pitch, lead and present. They have represented
            Ciylo and Pakistan on international stages, and they get the creative freedom to shape how we build.
          </p>
          <div>
            <Button href="/about#ciylotrons" variant="dark" arrow size="md">
              Meet the whole team
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <Marquee duration={60}>
          {rowA.map((p) => (
            <CiylotronCard key={p.slug} p={p} compact className="mx-2 w-[200px] sm:w-[220px]" />
          ))}
        </Marquee>
        <Marquee duration={60} reverse>
          {rowB.map((p) => (
            <CiylotronCard key={p.slug} p={p} compact className="mx-2 w-[200px] sm:w-[220px]" />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
