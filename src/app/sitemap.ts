import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { work } from "@/data/work";
import { industryPages } from "@/data/industries";
import { solutions } from "@/data/solutions";

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
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...work.map((c) => ({ url: `${site.url}/work/${c.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...industryPages.map((i) => ({ url: `${site.url}/industries/${i.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...solutions.map((s) => ({ url: `${site.url}/solutions/${s.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
