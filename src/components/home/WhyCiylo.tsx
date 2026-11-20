import { Img } from "@/components/ui/Img";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { proofPoints } from "@/data/site";
import { ClientsMap } from "./ClientsMap";
import { cn } from "@/lib/cn";

const reasons = [
  { title: "Hardware and software in one room", desc: "PCB, firmware, cloud and app Ciylotrons agree the interfaces before anyone writes code." },
  { title: "Healthcare-grade by default", desc: "Secure, compliance-minded systems shaped by years of building clinical and pharmacy platforms." },
  { title: "Edge-first AI", desc: "Models run on the device where it matters: faster, offline-capable and private." },
  { title: "A transparent process", desc: "Six clear stages and progress you can check any time. No surprises." },
  { title: "Clean, maintainable code", desc: "Documented firmware and software your team can extend and certify later." },
  { title: "Here after launch", desc: "Maintenance, field updates and the next version of your product." },
];

export function WhyCiylo() {
  return (
    <section id="why" className="bg-ink-900 py-24 text-white">
      <div className="wrap flex flex-col gap-20">
        <div className="grid gap-14 lg:grid-cols-[5fr_7fr]">
          <div className="flex flex-col gap-6">
            <p className="kicker text-teal-500">Why Ciylo</p>
            <SplitHeading
              text="Partners invested in your product, not just vendors."
              className="text-[clamp(32px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.035em]"
            />
            <Reveal className="group relative overflow-hidden rounded-[24px]">
              <Img
                src="/images/life/skardu-desert.webp"
                alt="The Ciylo team on the 2026 annual tour in the cold desert of Skardu"
                sizes="(min-width: 1024px) 460px, 100vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
              <p className="absolute right-4 bottom-4 left-4 flex items-center justify-between text-sm">
                <span className="font-semibold">The CiyloCore · Skardu 2026</span>
                <span className="font-semibold tabular-nums text-xs text-teal-400">2,228 m</span>
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col gap-8">
            {/* Proof points */}
            <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {proofPoints.map((p) => {
                const placeholder = "placeholder" in p && p.placeholder;
                return (
                  <RevealItem
                    key={p.label}
                    className={cn(
                      "flex flex-col gap-1.5 rounded-[18px] p-4",
                      placeholder ? "border border-dashed border-ink-600" : "bg-ink-800",
                    )}
                  >
                    <span className={cn("text-2xl font-extrabold tracking-[-0.02em]", placeholder ? "text-ink-500" : "text-teal-500")}>
                      {p.value}
                    </span>
                    <span className={cn("text-[13px] leading-snug", placeholder ? "text-ink-400" : "text-ink-200")}>{p.label}</span>
                  </RevealItem>
                );
              })}
            </RevealGroup>
            <RevealGroup role="list" className="flex flex-col">
              {reasons.map((r, i) => (
                <RevealItem
                  key={r.title}
                  role="listitem"
                  className="group grid grid-cols-[48px_1fr] gap-4 border-t border-ink-700 py-6 last:border-b"
                >
                  <span className="font-semibold tabular-nums text-[13px] text-teal-500 transition-transform duration-300 group-hover:translate-x-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <strong className="text-xl tracking-[-0.01em] transition-colors group-hover:text-teal-400">{r.title}</strong>
                    <p className="text-[15px] leading-relaxed text-ink-200">{r.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Where our clients are */}
        <div className="grid items-center gap-10 lg:grid-cols-[4fr_8fr]">
          <div className="flex flex-col gap-4">
            <p className="kicker text-teal-500">Where our clients are</p>
            <SplitHeading
              text="Built in Lahore. Trusted in 8 countries."
              accent={["8"]}
              className="text-[clamp(28px,3.4vw,40px)] leading-[1.1] font-extrabold tracking-[-0.03em]"
            />
            <p className="text-[15px] leading-relaxed text-ink-200">
              From startups in the US and UK to enterprises in the Gulf, Ciylotrons work across time zones with clients in
              Europe, Africa and the Middle East.
            </p>
          </div>
          <Reveal>
            <ClientsMap />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
