import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { CountUp } from "@/components/ui/CountUp";
import { Button } from "@/components/ui/Button";
import { LeaderCard } from "@/components/about/LeaderCard";
import { CiylotronGrid } from "@/components/about/CiylotronGrid";
import { Traits } from "@/components/about/Traits";
import { Moments } from "@/components/about/Moments";
import { Studio } from "@/components/about/Studio";
import { SocialStrip } from "@/components/about/SocialStrip";
import { CiylotronCard } from "@/components/about/CiylotronCard";
import { leadership, ciylotrons } from "@/data/team";
import { recognitions } from "@/data/culture";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About · The CiyloCore",
  description:
    "Meet the CiyloCore: the Ciylotrons behind Ciylo's hardware, firmware, AI and software, a multi-skilled team in Lahore with creative freedom at its heart.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const honoured = ciylotrons.filter((p) => p.honours?.length);

  return (
    <>
      <PageHero
        kicker="About Ciylo · The CiyloCore"
        title="We are the CiyloCore."
        accent={["CiyloCore."]}
        lead="A Lahore-born team of Ciylotrons, engineers, designers and builders who each own a domain and keep crossing into others. Together we ship the device, the data and the app."
      />

      {/* Story */}
      <section id="story" className="scroll-mt-24 bg-white py-24">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="kicker text-teal-700">Our story</p>
            <SplitHeading
              text="Seven years of turning ambitious ideas into products."
              className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
            <Reveal className="flex flex-col gap-4 text-base leading-relaxed text-ink-600">
              <p>
                Ciylo started with a simple belief: the best products come from teams that understand the whole system.
                Over seven years we have shipped more than 300 products for over 80 clients across 20+ industries, from
                AI voice agents and telehealth to online pharmacy, proptech and field service.
              </p>
              <p>
                Hardware has always been part of that story. Our engineers design boards, write firmware and connect devices
                to the cloud, while our software Ciylotrons build the apps and AI that people actually touch. One roadmap,
                one team, no hand-offs.
              </p>
              <p>
                Our mission is to empower businesses with technology that drives real growth. Our vision is to be the partner
                that turns ideas into products people love, and to build long-term relationships, not just projects.
              </p>
            </Reveal>
            <RevealGroup className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {site.stats.map((s) => (
                <RevealItem key={s.label} className="rounded-[18px] bg-ink-50 p-4">
                  <CountUp to={s.value} suffix={s.suffix} className="block text-[30px] font-extrabold tracking-[-0.02em] text-teal-700" />
                  <span className="text-[13px] text-ink-500">{s.label}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[28px]">
              <Img
                src="/images/life/skardu-meadow.webp"
                alt="The full Ciylo team in an alpine meadow in Skardu"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden max-w-[260px] rounded-[20px] bg-ink-900 p-5 text-white shadow-pop sm:block">
              <p className="kicker text-teal-400">Annual Tour 2026</p>
              <p className="mt-2 text-[15px] leading-snug font-semibold">Higher mountains. Stronger bonds. Six days in Skardu, together.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="scroll-mt-24 bg-ink-50 py-24">
        <div className="wrap flex flex-col gap-10">
          <div className="flex max-w-[680px] flex-col gap-3">
            <p className="kicker text-teal-700">Leading the CiyloCore</p>
            <SplitHeading
              text="Fortune 10 discipline, startup speed."
              className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
            <p className="text-base leading-relaxed text-ink-500">
              Our leadership pairs deep engineering and healthcare execution with enterprise product strategy, so every
              solution is secure, compliant and built for real-world scale.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {leadership.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.1}>
                <LeaderCard l={l} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What makes a Ciylotron */}
      <section className="relative isolate overflow-hidden bg-ink-900 py-24 text-white">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10 opacity-70" />
        <div className="wrap flex flex-col gap-10">
          <div className="grid gap-6 lg:grid-cols-[7fr_5fr] lg:items-end">
            <div className="flex flex-col gap-3">
              <p className="kicker text-teal-500">What makes a Ciylotron</p>
              <SplitHeading
                text="Not just an engineer. A builder, a leader, a difference-maker."
                accent={["difference-maker."]}
                className="text-[clamp(30px,4vw,46px)] leading-[1.06] font-extrabold tracking-[-0.03em]"
              />
            </div>
            <Reveal>
              <p className="text-base leading-relaxed text-ink-200">
                Ciylotrons come from different domains and bring more than one talent to the table. We give them creative
                freedom, real ownership and a team that has their back, and they repay it by building things that matter.
              </p>
            </Reveal>
          </div>
          <Traits dark />
        </div>
      </section>

      {/* Ciylotrons */}
      <section id="ciylotrons" className="scroll-mt-24 bg-white py-24">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[680px] flex-col gap-3">
              <p className="kicker text-teal-700">The team</p>
              <SplitHeading
                text="Meet the Ciylotrons."
                accent={["Ciylotrons."]}
                accentClassName="text-teal-700"
                className="text-[clamp(34px,4.6vw,54px)] leading-[1.04] font-extrabold tracking-[-0.035em]"
              />
              <p className="text-base leading-relaxed text-ink-500">
                Hardware, software, AI, design and growth: meet {ciylotrons.length} of our {site.teamSize} Ciylotrons. A ★ marks a Performer or Employee of the Month.
              </p>
            </div>
            <Button href="/careers" variant="outline" size="md" arrow>
              Become a Ciylotron
            </Button>
          </div>
          <CiylotronGrid />
        </div>
      </section>

      {/* Recognition */}
      <section className="overflow-hidden bg-teal-50 py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[5fr_7fr]">
          <div className="flex flex-col gap-6">
            <p className="kicker text-teal-800">Recognition & rituals</p>
            <SplitHeading
              text="Great work gets seen here."
              className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
            <RevealGroup className="flex flex-col gap-4">
              {recognitions.map((r) => (
                <RevealItem key={r.title} className="rounded-[20px] bg-white p-5">
                  <strong className="text-lg">{r.title}</strong>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{r.desc}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <div className="flex flex-col gap-4">
            <p className="kicker text-ink-500">Performers & Employees of the Month</p>
            <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {honoured.map((p) => (
                <RevealItem key={p.slug}>
                  <div className="flex flex-col gap-2">
                    <CiylotronCard p={p} compact />
                    <p className="px-1 font-semibold text-[11px] leading-snug text-teal-800">{p.honours!.join(" · ")}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Life */}
      <section id="life" className="scroll-mt-24 overflow-hidden bg-ink-900 py-24 text-white">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[680px] flex-col gap-3">
              <p className="kicker text-teal-500">Life at Ciylo</p>
              <SplitHeading
                text="Beyond work. Beyond ordinary."
                className="text-[clamp(30px,4vw,46px)] leading-[1.06] font-extrabold tracking-[-0.03em]"
              />
              <p className="text-base leading-relaxed text-ink-200">
                Fun days, cricket rivalries, birthday cakes and an annual tour to the mountains. We work hard, and we make
                sure the memories are worth it.
              </p>
            </div>
          </div>
          <Moments />
        </div>
      </section>

      {/* Studio */}
      <section id="studio" className="scroll-mt-24 bg-white py-24">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[680px] flex-col gap-3">
              <p className="kicker text-teal-700">The studio</p>
              <SplitHeading
                text="New studio. New ideas."
                className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
              />
              <p className="text-base leading-relaxed text-ink-500">
                Our Lahore studio puts the electronics bench, the dev floor and the meeting pods under one roof, so a firmware
                question gets answered in a walk, not a ticket. {site.address.street}, {site.address.city}.
              </p>
            </div>
            <Button href="/contact" variant="dark" size="md" arrow>
              Book a visit
            </Button>
          </div>
          <Studio />
        </div>
      </section>

      {/* Socials */}
      <section className="bg-ink-50 py-20">
        <div className="wrap flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="kicker text-teal-700">Follow the CiyloCore</p>
            <SplitHeading
              text="See what we're up to."
              className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]"
            />
          </div>
          <SocialStrip />
        </div>
      </section>
    </>
  );
}
