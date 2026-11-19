import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { ciylotrons } from "@/data/team";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Our Divisions",
  description: "Ciylo Software Studio and Ciylo Hardware Lab: two divisions, one roadmap.",
  alternates: { canonical: "/about/divisions" },
};

const divisions = [
  {
    id: "software-studio",
    name: "Ciylo Software Studio",
    kicker: "Division 01",
    tagline: "Apps, platforms and the AI inside them.",
    desc: "The studio designs and builds web, mobile and SaaS products, AI systems, commerce platforms and business software, plus the cloud they run on. It's the team behind Callcom, Fireside Pharmacy, AI Medik and more.",
    groups: ["Software"] as const,
    disciplines: ["Software", "AI", "Design"],
    images: ["/images/office/shakeel-desk.webp", "/images/office/beanbag.webp"],
    dark: false,
  },
  {
    id: "hardware-lab",
    name: "Ciylo Hardware Lab",
    kicker: "Division 02",
    tagline: "Boards, firmware, machines and on-device intelligence.",
    desc: "The lab designs schematics and PCBs, writes embedded firmware, builds enclosures, kiosks and robotics, and brings connected devices from the ESD bench to production, with certification readiness along the way.",
    groups: ["Hardware"] as const,
    disciplines: ["Hardware"],
    images: ["/images/lab/bench-2.webp", "/images/lab/pcb-probe.webp"],
    dark: true,
  },
];

export default function DivisionsPage() {
  return (
    <>
      <PageHero
        kicker="About · Our divisions"
        title="Two divisions. One roadmap."
        accent={["One", "roadmap."]}
        lead="Ciylo runs as a Software Studio and a Hardware Lab under one roof. They share a process, a backlog and a lunch table, so your device, data and app launch together."
      />
      {divisions.map((d, i) => {
        const svc = services.filter((s) => (d.groups as readonly string[]).includes(s.group));
        const people = ciylotrons.filter((p) => d.disciplines.includes(p.discipline));
        return (
          <section key={d.id} id={d.id} className={cn("scroll-mt-24 py-24", d.dark ? "bg-ink-900 text-white" : "bg-white")}>
            <div className={cn("wrap grid items-center gap-12 lg:grid-cols-2", i % 2 === 1 && "lg:[&>*:first-child]:order-2")}>
              <div className="grid grid-cols-2 gap-4">
                {d.images.map((src, k) => (
                  <Reveal key={src} delay={k * 0.1} className={cn("overflow-hidden rounded-[24px]", k === 1 && "mt-12")}>
                    <Img src={src} alt="" sizes="(min-width: 1024px) 280px, 50vw" className="aspect-[3/4] w-full object-cover" />
                  </Reveal>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <p className={cn("kicker", d.dark ? "text-teal-500" : "text-teal-700")}>{d.kicker}</p>
                <SplitHeading text={d.name} className="text-[clamp(32px,4.4vw,52px)] leading-[1.04] font-extrabold tracking-[-0.035em]" />
                <p className={cn("text-xl font-semibold", d.dark ? "text-teal-400" : "text-teal-700")}>{d.tagline}</p>
                <Reveal>
                  <p className={cn("text-base leading-relaxed", d.dark ? "text-ink-200" : "text-ink-600")}>{d.desc}</p>
                </Reveal>
                <div className="flex flex-wrap gap-2">
                  {svc.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services#${s.id}`}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-[13px] transition-colors",
                        d.dark ? "border-ink-600 text-ink-200 hover:border-teal-500 hover:text-teal-400" : "border-ink-150 hover:border-teal-500",
                      )}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button href="/about/teams" variant={d.dark ? "primary" : "dark"} size="md" arrow>
                    Meet the team
                  </Button>
                  <span className={cn("text-sm", d.dark ? "text-ink-300" : "text-ink-500")}>
                    {people.length}+ Ciylotrons featured
                  </span>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <section className="bg-teal-50 py-20">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[640px] text-[clamp(22px,2.6vw,30px)] leading-snug font-extrabold tracking-[-0.02em]">
            Need both? That&apos;s the point. Our Product &amp; MVP pipeline runs both divisions as one team.
          </p>
          <Button href="/services#product-development" variant="dark" arrow>
            See the pipeline
          </Button>
        </div>
      </section>
    </>
  );
}
