"use client";

import { useRef, type CSSProperties, type HTMLAttributes } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { cn } from "@/lib/cn";

type DivProps = HTMLAttributes<HTMLDivElement>;

/**
 * Fade + rise into view. CSS transitions driven by one shared observer
 * (see globals.css "Reveal"); reduced motion is handled in CSS.
 */
export function Reveal({
  delay = 0,
  y = 28,
  amount = 0.2,
  className,
  style,
  children,
  ...rest
}: DivProps & { delay?: number; y?: number; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInViewOnce(ref, amount);
  return (
    <div
      ref={ref}
      data-shown={shown || undefined}
      className={cn("reveal", className)}
      style={{ ...style, "--rv-delay": `${delay}s`, "--rv-y": `${y}px` } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Staggers its direct <RevealItem> children (CSS nth-child delays). */
export function RevealGroup({
  stagger = 0.08,
  amount = 0.15,
  className,
  style,
  children,
  ...rest
}: DivProps & { stagger?: number; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInViewOnce(ref, amount);
  return (
    <div
      ref={ref}
      data-shown={shown || undefined}
      className={cn("reveal-group", className)}
      style={{ ...style, "--rv-stagger": `${stagger}s` } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}

export function RevealItem({ y = 24, className, style, children, ...rest }: DivProps & { y?: number }) {
  return (
    <div className={cn("reveal-item", className)} style={{ ...style, "--rv-y": `${y}px` } as CSSProperties} {...rest}>
      {children}
    </div>
  );
}
