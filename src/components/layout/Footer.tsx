import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";
import { serviceGroups } from "@/data/services";
import { industryPages } from "@/data/industries";
import { BackToTop } from "./BackToTop";
import { SocialIcon } from "./SocialIcon";
import { FooterWordmark } from "./FooterWordmark";

const columns = [
  {
    title: "Services",
    links: [
      ...serviceGroups.map((g) => ({ label: g.label, href: `/services#${g.id.toLowerCase()}` })),
      { label: "Product & MVP", href: "/services#product-development" },
    ],
  },
  {
    title: "Industries",
    links: [
      ...industryPages.slice(0, 6).map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
      { label: "All industries", href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Divisions", href: "/about/divisions" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Teams", href: "/about/teams" },
      { label: "Solutions", href: "/solutions" },
      { label: "How We Build", href: "/#process" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Case Studies", href: "/work" },
      { label: "Careers", href: "/careers" },
      { label: "Life at Ciylo", href: "/careers#life" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 px-0 pt-20 pb-7 text-white">
      <div className="wrap flex flex-col gap-14">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-[400px] flex-[1_1_320px] flex-col gap-4">
            <Logo variant="dark" className="h-9 self-start" />
            <p className="text-[22px] leading-[1.4] font-semibold">{site.tagline}</p>
            <a href={`mailto:${site.email}`} className="text-base text-teal-500 hover:text-teal-300">
              {site.email}
            </a>
            <a href={site.phoneHref} className="text-[15px] text-ink-200 hover:text-white">
              {site.phone}
            </a>
            <p className="text-sm text-ink-300">
              {site.address.street}, {site.address.city} {site.address.postalCode}, {site.address.country}
            </p>
          </div>
          <div className="grid flex-[2_1_520px] grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-7 text-sm">
            {columns.map((c) => (
              <div key={c.title} className="flex flex-col gap-3">
                <p className="kicker text-teal-500">{c.title}</p>
                {c.links.map((l) => (
                  <Link key={l.label} href={l.href} className="text-ink-200 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <FooterWordmark />

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-700 pt-5 text-[13px] text-ink-300">
          <p>
            © {site.copyrightYear} {site.legalName}. Made in Lahore by the CiyloCore. ·{" "}
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </p>
          <div className="flex flex-wrap items-center gap-3">
          <ul className="flex flex-wrap gap-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-3.5 py-1.5 text-white transition-colors hover:border-teal-500 hover:text-teal-400"
                >
                  <SocialIcon name={s.label} className="size-3.5" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
