import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Mono uppercase eyebrow label with a short rule. */
export function Kicker({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p className={cn("kicker inline-flex items-center gap-2", dark ? "text-teal-500" : "text-teal-700", className)}>
      <span className={cn("h-px w-6", dark ? "bg-teal-500" : "bg-teal-700")} aria-hidden />
      {children}
    </p>
  );
}
