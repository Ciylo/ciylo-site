"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

/** Card with a soft radial highlight that follows the cursor. */
export function Spotlight({
  children,
  className,
  color = "rgb(0 201 167 / 0.18)",
  style,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn("group/spot relative isolate overflow-hidden", className)}
      style={{ ...style, ["--spot" as string]: color }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--spot), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
