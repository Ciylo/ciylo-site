import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/** Short careers band shown above the footer on Home. */
export function JoinUsBand() {
  return (
    <section className="bg-white py-16">
      <div className="wrap">
        <Reveal>
          <div className="group relative isolate grid overflow-hidden rounded-[28px] bg-ink-900 text-white md:grid-cols-[7fr_5fr]">
            <div className="flex flex-col gap-4 p-8 sm:p-10">
              <p className="kicker text-teal-500">Join us</p>
              <p className="text-[clamp(26px,3.2vw,38px)] leading-[1.1] font-extrabold tracking-[-0.03em]">
                Become one of {site.teamSize} Ciylotrons building what&apos;s next.
              </p>
              <p className="max-w-[520px] text-[15px] leading-relaxed text-ink-200">
                Hardware, firmware, software, AI, design and delivery. Bring your craft and your curiosity; we&apos;ll bring
                the bench, the team and the creative freedom.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/careers#roles" arrow size="md">
                  See open roles
                </Button>
                <Button href="/careers#life" variant="ghost-dark" size="md">
                  Life at Ciylo
                </Button>
              </div>
            </div>
            <div className="relative min-h-[240px] overflow-hidden">
              <Img
                src="/images/life/funday-pool.webp"
                alt="Ciylotrons at a Fun Day farmhouse"
                sizes="(min-width: 768px) 460px, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/30 to-transparent md:via-ink-900/10" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
