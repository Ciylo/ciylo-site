/**
 * Schema.org JSON-LD builders. Render with <JsonLd data={...} /> from a server
 * component. Only facts that are on the site: no ratings, partners or metrics.
 */
import { site } from "@/data/site";
import { leadership, type Leader } from "@/data/team";
import type { CaseStudy } from "@/data/work";
import type { Service } from "@/data/services";
import type { Solution } from "@/data/solutions";

export const orgId = `${site.url}/#organization`;
const abs = (p: string) => (p.startsWith("http") ? p : `${site.url}${p}`);

/** Sitewide graph: the company (Organization + ProfessionalService) and the website. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: { "@type": "ImageObject", url: abs("/brand/ciylo-logo.png"), width: 1200, height: 413 },
        image: abs("/opengraph-image"),
        description: site.description,
        email: site.email,
        telephone: site.phoneHref.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: "Punjab",
          postalCode: site.address.postalCode,
          addressCountry: "PK",
        },
        areaServed: "Worldwide",
        knowsAbout: [
          "Embedded systems",
          "Firmware development",
          "PCB design",
          "IoT",
          "Edge AI",
          "AI engineering",
          "Web development",
          "Mobile app development",
          "SaaS",
          "MVP development",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          telephone: site.phoneHref.replace("tel:", ""),
          availableLanguage: ["English", "Urdu"],
        },
        employee: leadership.map((l) => ({ "@id": personId(l) })),
        sameAs: site.socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
    ],
  };
}

/** BreadcrumbList from [label, path] pairs, Home first. */
export function breadcrumbs(items: [string, string][]) {
  const all: [string, string][] = [["Home", "/"], ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}

const personId = (l: Leader) => `${site.url}/about/leadership#${l.name.toLowerCase().replace(/[^a-z]+/g, "-")}`;

export function person(l: Leader) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(l),
    name: l.name,
    jobTitle: l.role,
    description: l.bio,
    image: abs(l.photo),
    worksFor: { "@id": orgId },
    ...(l.linkedin ? { sameAs: [l.linkedin] } : {}),
  };
}

export function serviceList(list: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ciylo services",
    itemListElement: list.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${site.url}/services#${s.id}`,
        name: s.name,
        description: s.short,
        url: `${site.url}/services#${s.id}`,
        serviceType: s.group === "Consulting" ? "Strategy & Engagement" : s.group,
        provider: { "@id": orgId },
        areaServed: "Worldwide",
      },
    })),
  };
}

export function solutionService(s: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/solutions/${s.slug}#service`,
    name: s.name,
    description: s.short,
    url: `${site.url}/solutions/${s.slug}`,
    provider: { "@id": orgId },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.name}: what's included`,
      itemListElement: s.included.map((l) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${l.layer}: ${l.title}`, description: l.items.join(". ") },
      })),
    },
  };
}

export function caseStudy(c: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${site.url}/work/${c.slug}#case-study`,
    name: `${c.name}: ${c.tagline}`,
    headline: `${c.name}: ${c.tagline}`,
    description: c.summary,
    url: `${site.url}/work/${c.slug}`,
    image: abs(c.cover),
    genre: "Case study",
    about: c.industry,
    keywords: c.platforms.join(", "),
    creator: { "@id": orgId },
    publisher: { "@id": orgId },
    inLanguage: "en",
  };
}
