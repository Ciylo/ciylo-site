import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-ink-900 pt-32 pb-20 text-white">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_40%,#000_30%,transparent_75%)]" />
      <div className="wrap flex flex-col items-center gap-6 text-center">
        <p className="kicker text-teal-500">Error 404 · Signal lost</p>
        <h1 className="text-[clamp(80px,18vw,200px)] leading-none font-extrabold tracking-[-0.06em] text-ink-800">
          4<span className="text-teal-500">0</span>4
        </h1>
        <p className="max-w-[460px] text-lg text-ink-200">
          This trace went flat. The page you&apos;re looking for has moved or never existed.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/" arrow>
            Back home
          </Button>
          <Button href="/work" variant="ghost-dark">
            See our work
          </Button>
        </div>
      </div>
    </section>
  );
}
