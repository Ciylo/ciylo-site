import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Img } from "@/components/ui/Img";
import { DiagramThumb } from "@/components/diagram/DiagramThumb";
import { diagrams } from "@/data/diagrams";
import { Tilt } from "@/components/ui/Tilt";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContactSection } from "@/components/home/ContactSection";
import { industryPages } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Who we build for: healthcare, pharmaceutical, energy, oil & gas, manufacturing, agriculture, retail, restaurants, telecom, education, proptech and field service.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        kicker="Industries · Who we build for"
        title="Deep domain knowledge, wherever you operate."
        accent={["domain", "knowledge,"]}
        lead="Services are what we do. Industries are who we do it for. Pick your sector to see the services, solutions and case studies that matter most."
      />
      <section className="bg-white py-20">
        <RevealGroup className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industryPages.map((i) => (
            <RevealItem key={i.slug} className="h-full">
              <Tilt className="h-full rounded-3xl" max={5}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-ink-75 transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgb(17_16_19/0.4)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-850">
                    {i.diagram ? (
                      <div className="absolute inset-0 px-6 pt-5 pb-14">
                        <div
                          aria-hidden
                          className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_40%,#000_30%,transparent_80%)]"
                        />
                        <DiagramThumb
                          diagram={diagrams[i.diagram]}
                          className="relative transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                        />
                      </div>
                    ) : (
                      <Img
                        src={i.image}
                        alt=""
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover opacity-80 transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
                    <span className="absolute bottom-4 left-5 text-2xl font-extrabold tracking-[-0.02em] text-white">
                      {i.name}
                    </span>
                    {i.work.length > 0 && (
                      <span className="absolute top-4 right-4 rounded-full bg-teal-500 px-2.5 py-1 font-semibold text-[11px] text-ink-900">
                        {i.work.length} case{" "}
                        {i.work.length === 1 ? "study" : "studies"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <p className="text-[15px] leading-relaxed text-ink-600">
                      {i.hero}
                    </p>
                    <p className="mt-auto pt-2 font-semibold text-xs text-ink-500">
                      {i.detail}
                    </p>
                  </div>
                </Link>
              </Tilt>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <ContactSection heading="Working in a sector we haven't listed?" />
    </>
  );
}
