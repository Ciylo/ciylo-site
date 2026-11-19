"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * 3D hover tilt with a moving glare, the way Apple TV / Vision-style cards feel.
 * Mouse and pen only (touch scrolls normally). Writes CSS variables from a rAF,
 * so React never re-renders on pointer move. Children marked with the
 * `tilt-pop` class float forward in Z. Disabled for prefers-reduced-motion in CSS.
 */
export function Tilt({
  children,
  className,
  max = 7,
  glare = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees */
  max?: number;
  glare?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const set = (rx: number, ry: number, gx: number, gy: number, on: boolean) => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
      el.style.setProperty("--gx", `${gx}%`);
      el.style.setProperty("--gy", `${gy}%`);
      el.dataset.tilting = on ? "true" : "false";
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        set(
          (0.5 - py) * max * 2,
          (px - 0.5) * max * 2,
          px * 100,
          py * 100,
          true,
        );
      }}
      onPointerLeave={() => set(0, 0, 50, 50, false)}
      className={cn("tilt group/tilt relative", className)}
      style={style}
    >
      {children}
      {glare && <span aria-hidden className="tilt-glare" />}
    </div>
  );
}
