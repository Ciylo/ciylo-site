import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/Button";
import { Traits } from "@/components/about/Traits";
import { Moments } from "@/components/about/Moments";
import { RolesBoard } from "@/components/careers/RolesBoard";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Become a Ciylotron. Join Ciylo's Lahore studio to build hardware, firmware, AI and software with creative freedom and real ownership.",
  alternates: { canonical: "/careers" },
};

const growth = [
  { title: "Own something real", desc: "From your first month you ship to real users, and you own a piece of the product, not a ticket queue." },
  { title: "Learn across the stack", desc: "Sit next to PCB engineers, AI developers and designers. Ciylotrons pick up new domains by working alongside them." },
  { title: "Mentoring that sticks", desc: "Senior Ciylotrons and the CiyloCore leadership coach you through code reviews, client calls and your first lead role." },
  { title: "Recognition every month", desc: "Performer of the Month celebrates outstanding performance, exceptional teamwork and consistently exceeding expectations." },
  { title: "Represent on bigger stages", desc: "Present your work to international clients, at competitions and at events, for Ciylo and for Pakistan." },
  { title: "Time to recharge", desc: "Fun days, sports leagues and an annual tour, because the best ideas rarely show up at a desk." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        kicker="Careers · Become a Ciylotron"
        title="Do the best work of your life, with creative freedom."
        accent={["creative", "freedom."]}
        lead="We hire people who are great at their craft and curious about everything around it. Bring your domain, your ideas and your ambition. We'll bring the bench, the team and the trust."
      >
        <Reveal delay={0.45} className="flex flex-wrap gap-3 pt-2">
          <Button href="#roles" arrow>
            See open roles
          </Button>
          <Button href="/about#ciylotrons" variant="ghost-dark">
            Meet the team
          </Button>
        </Reveal>
      </PageHero>

      {/* Life */}
      <section id="life" className="scroll-mt-24 bg-white py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <Reveal className="overflow-hidden rounded-[24px]">
              <Img src="/images/office/beanbag.webp" alt="A Ciylotron working from a bean bag in the open studio" sizes="(min-width: 1024px) 280px, 50vw" className="aspect-[3/4] w-full object-cover" />
            </Reveal>
            <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-[24px]">
              <Img src="/images/office/ideas-wall.webp" alt="Ideas without limits wall in the Ciylo studio" sizes="(min-width: 1024px) 280px, 50vw" className="aspect-[3/4] w-full object-cover" />
            </Reveal>
          </div>
          <div className="flex flex-col gap-6">
            <p className="kicker text-teal-700">Life at Ciylo</p>
            <SplitHeading
              text="Ideas without limits."
              className="text-[clamp(30px,4vw,46px)] leading-[1.06] font-extrabold tracking-[-0.03em]"
            />
            <Reveal className="flex flex-col gap-4 text-base leading-relaxed text-ink-600">
              <p>
                Ciylo is a place where an embedded engineer can pitch a product idea, a designer can lead a client workshop
                and a developer can spend a Friday soldering. Titles describe what you&apos;re great at, not where you stop.
              </p>
              <p>
                Ciylotrons have worked across healthcare, fintech, education, AI and industrial systems, and many bring talents
                far beyond their job title. We give that range room to grow.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-24">
        <div className="wrap flex flex-col gap-10">
          <div className="flex max-w-[680px] flex-col gap-3">
            <p className="kicker text-teal-700">What we look for</p>
            <SplitHeading
              text="What makes a Ciylotron."
              className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
          </div>
          <Traits />
        </div>
      </section>

      {/* Growth */}
      <section id="growth" className="scroll-mt-24 relative isolate overflow-hidden bg-ink-900 py-24 text-white">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10 opacity-70" />
        <div className="wrap flex flex-col gap-10">
          <div className="flex max-w-[680px] flex-col gap-3">
            <p className="kicker text-teal-500">Growth</p>
            <SplitHeading
              text="Grow faster than your job description."
              className="text-[clamp(30px,4vw,46px)] leading-[1.06] font-extrabold tracking-[-0.03em]"
            />
          </div>
          <RevealGroup className="grid gap-px overflow-hidden rounded-[24px] border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
            {growth.map((g, i) => (
              <RevealItem key={g.title} className="flex flex-col gap-3 bg-ink-900 p-7 transition-colors hover:bg-ink-850">
                <span className="font-mono text-xs text-teal-500">{String(i + 1).padStart(2, "0")}</span>
                <strong className="text-xl tracking-[-0.01em]">{g.title}</strong>
                <p className="text-[15px] leading-relaxed text-ink-200">{g.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="scroll-mt-24 bg-white py-24">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[680px] flex-col gap-3">
              <p className="kicker text-teal-700">Open roles</p>
              <SplitHeading
                text="Find your seat at the bench."
                className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
              />
              <p className="text-base leading-relaxed text-ink-500">
                Don&apos;t see your role? We always want to hear from exceptional people. Send your CV and a note about what
                you&apos;d build here.
              </p>
            </div>
          </div>
          <RolesBoard />
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Open application")}`}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-[24px] bg-teal-50 p-7"
          >
            <span className="flex flex-col gap-1">
              <strong className="text-xl">Open application</strong>
              <span className="text-[15px] text-ink-600">Hardware, software, AI, design or growth: tell us what you&apos;re great at.</span>
            </span>
            <span className="font-semibold text-teal-800 transition-transform group-hover:translate-x-1">{site.email} →</span>
          </a>
        </div>
      </section>

      <section className="overflow-hidden bg-ink-900 py-24 text-white">
        <div className="wrap flex flex-col gap-10">
          <div className="flex max-w-[680px] flex-col gap-3">
            <p className="kicker text-teal-500">Moments that outlast the journey</p>
            <SplitHeading
              text="Work hard. Celebrate harder."
              className="text-[clamp(30px,4vw,46px)] leading-[1.06] font-extrabold tracking-[-0.03em]"
            />
          </div>
          <Moments limit={9} />
        </div>
      </section>
    </>
  );
}
