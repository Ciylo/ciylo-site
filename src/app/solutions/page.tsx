import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { DiagramThumb } from "@/components/diagram/DiagramThumb";
import { diagrams } from "@/data/diagrams";
import { Tilt } from "@/components/ui/Tilt";
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
              <Tilt className="h-full rounded-3xl" max={5}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-ink-900 text-white shadow-[0_30px_60px_-40px_rgb(17_16_19/0.6)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgb(0_90_75/0.55)]"
                >
                  <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border-b border-ink-700/70 px-5 pt-10 pb-4">
                    <div
                      aria-hidden
                      className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_50%,#000_30%,transparent_80%)]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-10 top-1/2 h-24 -translate-y-1/2 rounded-full bg-teal-500/10 blur-2xl transition-opacity duration-700 group-hover:opacity-100 opacity-40"
                    />
                    <DiagramThumb
                      diagram={diagrams[s.slug]}
                      className="relative transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-teal-500 px-3 py-1 font-semibold text-[11px] text-ink-900">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-7">
                    <strong className="text-2xl tracking-[-0.02em]">
                      {s.name}
                    </strong>
                    <p className="text-[15px] leading-relaxed text-ink-200">
                      {s.short}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                      {["Hardware", "Firmware", "App", "Cloud"].map((l) => (
                        <span
                          key={l}
                          className="rounded-full border border-ink-600 px-2.5 py-1 font-semibold text-[11px] text-ink-200"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Tilt>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <ContactSection heading="Need a solution we haven't packaged yet?" />
    </>
  );
}
