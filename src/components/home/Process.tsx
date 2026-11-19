"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { title: "Discovery", desc: "Goals, users, constraints and a costed plan." },
  { title: "Design", desc: "UI/UX, architecture and hardware specs." },
  { title: "Development", desc: "Boards, firmware, models and apps in parallel." },
  { title: "QA & Testing", desc: "Bench, field and user acceptance testing." },
  { title: "Launch", desc: "Go-live, store release, production hand-off." },
  { title: "Support", desc: "Maintenance, OTA updates, the next version." },
];

function Step({ i, progress, title, desc }: { i: number; progress: MotionValue<number>; title: string; desc: string }) {
  const at = i / (steps.length - 1);
  const active = useTransform(progress, [Math.max(0, at - 0.12), at], [0, 1]);
  const bg = useTransform(active, [0, 1], ["#ffffff", "#111013"]);
  const border = useTransform(active, [0, 1], ["#c9c9d1", "#111013"]);
  const scale = useTransform(active, [0, 0.6, 1], [1, 1.15, 1]);
  const textOpacity = useTransform(active, [0, 1], [0.45, 1]);
  const last = i === steps.length - 1;

  return (
    <li className="relative flex gap-5 lg:flex-col lg:gap-4">
      <motion.span
        style={{ backgroundColor: last ? undefined : bg, borderColor: border, scale }}
        className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-2 font-mono text-[13px] ${
          last ? "bg-teal-500 text-ink-900" : "text-teal-500"
        }`}
      >
        {String(i + 1).padStart(2, "0")}
      </motion.span>
      <motion.div style={{ opacity: textOpacity }} className="flex flex-col gap-1.5 pb-8 lg:pb-0">
        <strong className="text-[17px]">{title}</strong>
        <span className="text-sm leading-normal text-ink-500">{desc}</span>
      </motion.div>
    </li>
  );
}

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const p = reduce ? scrollYProgress : progress;
  const fill = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative bg-ink-50 py-24">
      <div className="wrap flex flex-col gap-12">
        <div className="flex max-w-[660px] flex-col gap-3">
          <p className="kicker text-teal-700">How a build moves</p>
          <SplitHeading
            text="Six stages. One team. Zero hand-offs."
            className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
          />
          <p className="text-base leading-relaxed text-ink-500">
            Hardware and software Ciylotrons move through the same six stages together, so nothing waits on a hand-off.
            You can check progress at any point.
          </p>
        </div>

        <div className="relative">
          {/* rail: vertical on mobile, horizontal on desktop */}
          <div aria-hidden className="absolute top-0 bottom-0 left-[21px] w-0.5 bg-teal-100 lg:top-[21px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto" />
          <motion.div
            aria-hidden
            style={{ height: fill }}
            className="absolute top-0 left-[21px] w-0.5 bg-teal-500 lg:hidden"
          />
          <motion.div
            aria-hidden
            style={{ width: fill }}
            className="absolute top-[21px] left-0 hidden h-0.5 bg-teal-500 lg:block"
          />
          <ol ref={ref} className="relative grid gap-0 lg:grid-cols-6 lg:gap-6">
            {steps.map((s, i) => (
              <Step key={s.title} i={i} progress={p} title={s.title} desc={s.desc} />
            ))}
          </ol>
        </div>

        <Reveal>
          <div className="grid-bg relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[28px] bg-ink-900 p-8 text-white sm:p-10">
            <div aria-hidden className="absolute -top-24 -right-16 size-72 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="relative flex max-w-[620px] flex-col gap-2">
              <p className="text-[clamp(22px,2.6vw,28px)] font-extrabold tracking-[-0.02em]">Sensor to cloud, in a single contract.</p>
              <p className="text-[15px] text-ink-200">
                Prototype to production with the same Ciylotrons, one roadmap and one point of contact.
              </p>
            </div>
            <Button href="/contact" arrow className="relative">
              Get a quote
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
