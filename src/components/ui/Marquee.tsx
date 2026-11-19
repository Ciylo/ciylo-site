import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Infinite CSS marquee. Children are rendered twice; pauses on hover. */
export function Marquee({
  children,
  duration = 40,
  reverse,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x group relative flex overflow-hidden", className)}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
