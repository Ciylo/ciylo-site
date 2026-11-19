import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Img } from "@/components/ui/Img";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContactSection } from "@/components/home/ContactSection";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Packaged, ready-to-deploy offerings from Ciylo: remote site monitoring, wearable health monitoring and a self-service kiosk platform.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        kicker="Solutions · Ready to deploy"
        title="Proven building blocks, shipped as one package."
        accent={["one", "package."]}
        lead="Each solution bundles the hardware, firmware, app and cloud we've engineered before, so you start from a working base and tailor it to your operation."
      />
      <section className="bg-white py-20">
        <RevealGroup className="wrap grid gap-5 lg:grid-cols-3">
          {solutions.map((s, idx) => (
            <RevealItem key={s.slug} className="h-full">
              <Link
                href={`/solutions/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-ink-900 text-white transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Img src={s.image} alt="" sizes="(min-width: 1024px) 380px, 100vw" className="h-full w-full object-cover opacity-70 transition-transform duration-[1.2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-teal-500 px-3 py-1 font-mono text-[11px] text-ink-900">
                    0{idx + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <strong className="text-2xl tracking-[-0.02em]">{s.name}</strong>
                  <p className="text-[15px] leading-relaxed text-ink-200">{s.short}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {["Hardware", "Firmware", "App", "Cloud"].map((l) => (
                      <span key={l} className="rounded-full border border-ink-600 px-2.5 py-1 font-mono text-[11px] text-ink-200">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <ContactSection heading="Need a solution we haven't packaged yet?" />
    </>
  );
}
