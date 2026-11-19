"use client";

/* eslint-disable @next/next/no-img-element */
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { clients } from "@/data/site";

/**
 * Home hero. Drop footage at public/video/hero.mp4 (muted, looping lab/bench work)
 * and it plays behind the hero automatically; until then the poster image shows.
 */
export function Hero({ video }: { video?: string }) {
  const reduce = useReducedMotionSafe();
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useTransform(
    [sx, sy],
    ([x, y]) => `radial-gradient(640px circle at ${x}% ${y}%, rgb(0 201 167 / 0.16), transparent 60%)`,
  );

  return (
    <section
      className="relative isolate overflow-hidden bg-ink-900 pt-40 pb-14 text-white sm:pt-44"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      {/* Background footage / poster, heavily darkened for 4.5:1+ text contrast */}
      <div aria-hidden className="absolute inset-0 -z-30">
        {video && !reduce ? (
          <video
            className="h-full w-full object-cover"
            src={video}
            poster="/images/lab/bench-wide.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img src="/images/lab/bench-wide.webp" alt="" className="h-full w-full object-cover object-[50%_30%]" />
        )}
        <div className="absolute inset-0 bg-ink-900/[0.88]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900" />
      </div>
      <div aria-hidden className="grid-bg absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_50%_20%,#000_30%,transparent_75%)]" />
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ background: glow }} />
      {/* scan line */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 animate-scan bg-gradient-to-b from-transparent via-teal-500/[0.07] to-transparent" />

      <div className="wrap">
        <div className="mx-auto flex max-w-[940px] flex-col items-center gap-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-ink-600 bg-ink-850/70 py-1.5 pr-3.5 pl-1.5 text-[13px] text-ink-200 backdrop-blur"
          >
            <span className="rounded-full bg-teal-500 px-2.5 py-0.5 text-xs font-bold text-ink-900">7+ yrs</span>
            Silicon to screen, under one roof in Lahore
          </motion.div>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            text="One team for the device, the data and the app."
            accent={["device", "data", "app"]}
            className="text-[clamp(40px,7vw,72px)] leading-[1.02] font-extrabold tracking-[-0.035em]"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="max-w-[640px] text-lg leading-relaxed text-pretty text-ink-200"
          >
            Ciylo turns ambitious ideas into products people can hold and use: circuit boards, firmware, AI models and the
            software on top, shipped together with no hand-offs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button href="/contact" arrow>
              Start a project
            </Button>
            <Button href="#services" variant="ghost-dark">
              See what we build ↓
            </Button>
          </motion.div>

          <motion.a
            href="#services"
            aria-label="Scroll to services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="group mt-2 flex flex-col items-center gap-2 text-[11px] text-ink-300 hover:text-teal-400"
          >
            <span className="kicker">Scroll</span>
            <span className="relative flex h-9 w-5 justify-center rounded-full border border-ink-500 group-hover:border-teal-400">
              <motion.span
                className="mt-1.5 block h-2 w-0.5 rounded-full bg-teal-500"
                animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.a>
        </div>

        {/* Clients */}
        <div className="mt-16 flex flex-col items-center gap-5">
          <p className="text-[13px] font-medium text-ink-300">Teams that trust us</p>
          <Marquee duration={36} className="w-full">
            {clients.map((c) => (
              <div key={c.name} className="flex items-center gap-2.5 px-8 sm:px-11" title={c.name}>
                <img
                  src={c.logo}
                  alt={c.name}
                  width={c.w}
                  height={c.h}
                  loading="lazy"
                  className="logo-mono-dark h-7 w-auto sm:h-8"
                />
                {"withName" in c && c.withName && (
                  <span className="logo-mono-dark text-lg font-semibold text-ink-900">{c.name}</span>
                )}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
