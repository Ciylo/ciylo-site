"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { cn } from "@/lib/cn";

/**
 * Full-bleed slideshow behind the home hero: Ciylotrons at work, the lab,
 * team trips and the studio. Each frame crossfades with a slow zoom.
 * Edit the list to change frames; order = play order.
 */
const frames = [
  { src: "/images/office/hassan-desk.webp", pos: "50% 35%" },
  { src: "/images/life/skardu-desert.webp", pos: "50% 55%" },
  { src: "/images/lab/bench-2.webp", pos: "50% 45%" },
  { src: "/images/office/studio.webp", pos: "50% 50%" },
  { src: "/images/lab/pcb-probe.webp", pos: "50% 45%" },
  { src: "/images/life/funday-pool.webp", pos: "50% 60%" },
  { src: "/images/office/shakeel-desk.webp", pos: "50% 40%" },
  { src: "/images/life/skardu-meadow.webp", pos: "50% 70%" },
  { src: "/images/lab/embedded-desk.webp", pos: "50% 45%" },
  { src: "/images/office/beanbag.webp", pos: "50% 45%" },
  { src: "/images/life/skardu-dinner.webp", pos: "50% 55%" },
  { src: "/images/office/kaif-desk.webp", pos: "50% 45%" },
];

const INTERVAL = 5000;

export function HeroMosaic() {
  const reduce = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  // Only mount frames once they're about to show, so the first paint stays light.
  const [loaded, setLoaded] = useState(2);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
      setLoaded((n) => Math.min(frames.length, n + 1));
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative h-full w-full">
      {frames.slice(0, loaded).map((f, i) => (
        <div
          key={f.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1600ms] ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={f.src}
            alt=""
            fill
            sizes="100vw"
            quality={60}
            loading={i < 2 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className={cn("object-cover", !reduce && (i % 2 === 0 ? "animate-kenburns" : "animate-kenburns-rev"))}
            style={{ objectPosition: f.pos }}
          />
        </div>
      ))}
    </div>
  );
}
