import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "dark" | "ghost-dark" | "outline" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-teal-500 text-ink-900 hover:bg-teal-400 font-bold",
  dark: "bg-ink-900 text-white hover:bg-ink-750 font-semibold",
  "ghost-dark": "bg-ink-750 text-white hover:bg-ink-700 font-semibold",
  outline: "bg-white text-ink-900 border border-ink-200 hover:border-ink-900 font-semibold",
  light: "bg-white text-ink-900 hover:bg-teal-50 font-semibold",
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: "md" | "lg";
  dot?: boolean;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "lg",
  dot,
  arrow,
  magnetic = true,
  className,
  children,
  ...rest
}: Props) {
  const el = (
    <Link
      {...rest}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 rounded-full transition-colors duration-300",
        size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-[15px]",
        styles[variant],
        className,
      )}
    >
      {dot && <span className="size-2 animate-pulse-dot rounded-full bg-teal-500" aria-hidden />}
      <span>{children}</span>
      {arrow && (
        <span aria-hidden className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:translate-x-full">→</span>
          <span className="absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0">
            →
          </span>
        </span>
      )}
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

/** Text link with an animated underline and arrow. */
export function TextLink({
  className,
  children,
  ...rest
}: Omit<ComponentProps<typeof Link>, "className"> & { className?: string; children: ReactNode }) {
  return (
    <Link
      {...rest}
      className={cn("group inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-800", className)}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1.5px]">
        {children}
      </span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
