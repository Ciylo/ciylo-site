"use client";

/** Scrolls smoothly back to the top (Lenis picks up native smooth scroll). */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group inline-flex items-center gap-2 rounded-full bg-teal-500 px-4 py-1.5 font-semibold text-ink-900 transition-colors hover:bg-teal-400"
    >
      Back to top
      <span aria-hidden className="transition-transform group-hover:-translate-y-0.5">
        ↑
      </span>
    </button>
  );
}
