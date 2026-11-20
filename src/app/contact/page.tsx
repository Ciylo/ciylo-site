import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/home/ContactSection";
import { Studio } from "@/components/about/Studio";
import { Offices } from "@/components/Offices";
import { SocialStrip } from "@/components/about/SocialStrip";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us: Start Your Hardware or Software Project",
  description: `Start a hardware, IoT, AI or software project with Ciylo. Email ${site.email}, call ${site.phone} or visit our studio in Aitchison Society, Lahore. We reply within one working day.`,
  alternates: { canonical: "/contact" },
};

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.city} ${site.address.postalCode}, ${site.address.country}`,
)}`;

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([["Contact", "/contact"]])} />
      <PageHero
        kicker="Contact · Let's build"
        title="Let's build your idea."
        accent={["idea."]}
        lead={`A board, a band, an app or all three. Tell us what you're building and a Ciylotron will reply within ${site.replyTime}.`}
        aside={
          <div className="flex min-w-[280px] flex-col gap-3 rounded-[22px] border border-ink-700 bg-ink-850 p-6">
            <p className="kicker text-teal-500">Reach us directly</p>
            <a href={`mailto:${site.email}`} className="text-lg font-semibold hover:text-teal-400">
              {site.email}
            </a>
            <a href={site.phoneHref} className="text-ink-200 hover:text-white">
              {site.phone}
            </a>
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-300 hover:text-teal-400">
              {site.address.street}, {site.address.city} {site.address.postalCode} ↗
            </a>
          </div>
        }
      />
      <ContactSection id="form" heading="Tell us what you're building." />
      <section className="bg-white py-24">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="kicker text-teal-700">Offices</p>
          </div>
          <Offices />
          <div className="flex flex-col gap-3 pt-6">
            <p className="kicker text-teal-700">Visit the studio</p>
            <SplitHeading
              text="Come and see the lab."
              className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
            />
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="text-base text-teal-700 hover:underline">
              {site.address.street}, {site.address.city} {site.address.postalCode}, {site.address.country} · Open in Maps ↗
            </a>
          </div>
          <Studio />
        </div>
      </section>
      <section className="bg-ink-50 py-20">
        <div className="wrap flex flex-col gap-8">
          <SplitHeading text="Or say hi on social." className="text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.03em]" />
          <SocialStrip />
        </div>
      </section>
    </>
  );
}
