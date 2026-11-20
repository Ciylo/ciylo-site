import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { WorkCard } from "@/components/work/WorkCard";
import { ContactSection } from "@/components/home/ContactSection";
import { work } from "@/data/work";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case Studies: AI, Health, Hardware & SaaS Products",
  description:
    "Case studies from Ciylo: AI voice agents, online pharmacy, telehealth, hospice documentation, edtech, proptech, field service and more.",
  alternates: { canonical: "/work" },
};

function StaticGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {work.map((c) => (
        <WorkCard key={c.slug} c={c} />
      ))}
    </div>
  );
}

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Work", "/work"]])} />
      <PageHero
        kicker={`Case studies · ${work.length} projects`}
        title="Products in the hands of real users."
        accent={["real", "users."]}
        lead="A selection of platforms, apps and AI systems Ciylotrons have designed, built and shipped for clients across healthcare, fintech, education and beyond."
      />
      <section className="bg-white py-20">
        <div className="wrap">
          <Suspense fallback={<StaticGrid />}>
            <WorkGrid />
          </Suspense>
        </div>
      </section>
      <ContactSection heading="Have a product like these in mind?" />
    </>
  );
}
