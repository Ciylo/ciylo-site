/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/cn";

/** Ciylo logo: true vector, exported from the brand Figma file. */
export function Logo({ variant = "light", className }: { variant?: "light" | "dark" | "white"; className?: string }) {
  const src =
    variant === "dark"
      ? "/brand/ciylo-logo-dark.svg"
      : variant === "white"
        ? "/brand/ciylo-logo-mono-white.svg"
        : "/brand/ciylo-logo.svg";
  return <img src={src} alt="Ciylo" width={694} height={239} className={cn("h-8 w-auto", className)} />;
}
