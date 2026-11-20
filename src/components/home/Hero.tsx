"use client";

/* eslint-disable @next/next/no-img-element */
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type CSSProperties } from "react";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { clients } from "@/data/site";
import { HeroMosaic } from "./HeroMosaic";

/**
 * Home hero. Drop footage at public/video/hero.mp4 (muted, looping lab/bench work)
 * and it plays behind the hero automatically; until then a mosaic of Ciylotrons at work shows.
 */
export function Hero({ video }: { video?: string }) {
  const reduce = useReducedMotionSafe();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(640px circle at ${x}% ${y}%, rgb(0 201 167 / 0.16), transparent 60%)`,
  );

  return (
    <section
      ref={section}
      className="relative isolate overflow-hidden bg-ink-900 pt-40 pb-14 text-white sm:pt-44"
      onPointerMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      {/* Background footage / poster, heavily darkened for 4.5:1+ text contrast */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-30"
        style={reduce ? undefined : { scale: bgScale }}
      >
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
          <HeroMosaic />
        )}
        <div className="absolute inset-0 bg-ink-900/[0.78]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgb(17_16_19/0.6),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900" />
      </motion.div>
      <div
        aria-hidden
        className="grid-bg absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_50%_20%,#000_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: glow }}
      />
      {/* scan line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 animate-scan bg-gradient-to-b from-transparent via-teal-500/[0.07] to-transparent"
      />

      <div className="wrap">
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="mx-auto flex max-w-[940px] flex-col items-center gap-6 text-center"
        >
          <div
            className="hero-in inline-flex items-center gap-2.5 rounded-full border border-ink-600 bg-ink-850/70 py-1.5 pr-3.5 pl-1.5 text-[13px] text-ink-200 backdrop-blur"
          >
            <span className="rounded-full bg-teal-500 px-2.5 py-0.5 text-xs font-bold text-ink-900">
              7+ yrs
            </span>
            <span>
            <span className="inline-flex items-center gap-1.5 align-middle">
              <span className="s2s-from font-semibold">Silicon</span>
              <span className="sr-only">to</span>
              {/* Arrow travels silicon → screen; each word glows as it leaves / lands */}
              <span aria-hidden className="s2s-track relative inline-block h-3 w-9">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink-500/60" />
                <span className="s2s-arrow absolute top-1/2 left-0 flex -translate-y-1/2 items-center">
                  <span className="h-0.5 w-3.5 rounded-full bg-gradient-to-r from-transparent to-teal-400" />
                  <svg viewBox="0 0 8 10" className="-ml-px h-2.5 w-2 text-teal-400" fill="currentColor">
                    <path d="M0 0l8 5-8 5 2-5z" />
                  </svg>
                </span>
              </span>
              <span className="s2s-to font-semibold">screen</span>
            </span>
            <span className="align-middle">, under one roof in Lahore</span>
            </span>
          </div>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            text="One team for the device, the data and the app."
            accent={["device", "data", "app"]}
            accentClassName="text-shimmer"
            className="text-[clamp(40px,7vw,72px)] leading-[1.02] font-extrabold tracking-[-0.035em]"
          />

          <p
            style={{ "--hd": "0.45s" } as CSSProperties}
            className="hero-in max-w-[640px] text-lg leading-relaxed text-pretty text-ink-200"
          >
            Ciylo turns ambitious ideas into products people can hold and use:
            circuit boards, firmware, AI models and the software on top, shipped
            together with no hand-offs.
          </p>

          <div
            style={{ "--hd": "0.6s" } as CSSProperties}
            className="hero-in flex flex-wrap justify-center gap-3"
          >
            <Button href="/contact" arrow flood>
              Start a project
            </Button>
            <Button href="#services" variant="ghost-dark" flood>
              See what we build ↓
            </Button>
          </div>

        </motion.div>

        {/* Clients */}
        <div className="mt-16 flex flex-col items-center gap-5">
          <p className="text-[13px] font-medium text-ink-300">
            Teams that trust us
          </p>
          <Marquee duration={36} className="w-full">
            {clients.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2.5 px-8 sm:px-11"
                title={c.name}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  width={c.w}
                  height={c.h}
                  loading="lazy"
                  className="logo-mono-dark h-7 w-auto sm:h-8"
                />
                {"withName" in c && c.withName && (
                  <span className="logo-mono-dark text-lg font-semibold text-ink-900">
                    {c.name}
                  </span>
                )}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
