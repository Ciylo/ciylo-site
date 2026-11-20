"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Words (punctuation ignored) rendered in the accent colour */
  accent?: string[];
  accentClassName?: string;
  delay?: number;
  /** Animate on load with pure CSS (hero / LCP headings) instead of on scroll */
  immediate?: boolean;
};

/**
 * Headline whose words slide up out of a mask, one after another.
 * CSS-driven: `immediate` headings animate without waiting for JS; others start
 * when the heading enters the viewport (the clipped words never intersect).
 */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className,
  accent = [],
  accentClassName = "text-teal-500",
  delay = 0,
  immediate,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const shown = useInViewOnce(ref, 0.4);
  const words = text.split(" ");
  return (
    <Tag
      ref={ref}
      aria-label={text}
      data-shown={(!immediate && shown) || undefined}
      className={cn("text-balance", immediate && "split-now", className)}
      style={{ "--sp-delay": `${delay}s` } as CSSProperties}
    >
      {words.map((w, i) => {
        const clean = w.replace(/[.,!?:]/g, "");
        return (
          <Fragment key={i}>
          <span aria-hidden className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span className={cn("split-word", accent.includes(clean) && accentClassName)} style={{ "--i": i } as CSSProperties}>
              {w}
            </span>
          </span>
          {/* Space outside the masked span so text extractors keep words apart */}
          {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
