import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * While the site is in testing on a *.vercel.app domain, set
 * NEXT_PUBLIC_ALLOW_INDEXING=false in Vercel to keep it out of search engines.
 */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
  return {
    rules: allow ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
