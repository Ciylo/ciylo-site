import type { ReactNode } from "react";

/** Simple long-form layout for legal pages. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="bg-ink-900 pt-40 pb-16 text-white">
        <div className="wrap flex flex-col gap-3">
          <p className="kicker text-teal-500">Legal</p>
          <h1 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-0.035em]">{title}</h1>
          <p className="text-sm text-ink-300">Last updated: {updated}</p>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="wrap">
          <article className="flex max-w-[760px] flex-col gap-5 text-[15px] leading-relaxed text-ink-700 [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink-900 [&_a]:font-semibold [&_a]:text-teal-700 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}
