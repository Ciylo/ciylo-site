import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { work } from "@/data/work";
import { industryPages } from "@/data/industries";
import { solutions } from "@/data/solutions";

/** Bump when site content changes meaningfully (used as <lastmod>). */
const lastModified = new Date("2026-11-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/services",
    "/work",
    "/solutions",
    "/industries",
    "/about",
    "/about/divisions",
    "/about/leadership",
    "/about/teams",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified })),
    ...work.map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified })),
    ...industryPages.map((i) => ({ url: `${site.url}/industries/${i.slug}`, lastModified })),
    ...solutions.map((s) => ({ url: `${site.url}/solutions/${s.slug}`, lastModified })),
  ];
}
