/** Accepts "example.com" or "https://example.com/" and returns "https://example.com". */
function normaliseUrl(raw: string | undefined, fallback: string) {
  const v = raw?.trim();
  if (!v) return fallback;
  const withProtocol = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return fallback;
  }
}

export const site = {
  name: "Ciylo",
  legalName: "CIYLO (SMC-Private) Limited",
  url: normaliseUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://theciylo.com"),
  tagline: "Hardware, firmware, AI and software, built by one team.",
  description:
    "Ciylo is a Lahore-based engineering studio that designs circuit boards, firmware, AI models and the web and mobile software on top, shipped together by one team.",
  email: "noraiz@ciylo.com",
  phone: "+92 301 6475925",
  phoneHref: "tel:+923016475925",
  address: {
    street: "9-A, Aitchison Society",
    city: "Lahore",
    postalCode: "53700",
    country: "Pakistan",
  },
  replyTime: "one working day",
  teamSize: 35,
  timezone: "Asia/Karachi",
  /** Static so pages stay fully prerendered (Cache Components). Bump yearly. */
  copyrightYear: 2026,
  stats: [
    { value: 7, suffix: "+", label: "Years building" },
    { value: 300, suffix: "+", label: "Products shipped" },
    { value: 80, suffix: "+", label: "Happy clients" },
    { value: 20, suffix: "+", label: "Industries" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ciylo" },
    { label: "Instagram", href: "https://www.instagram.com/the_ciylo/" },
  ],
} as const;

export const clients = [
  { name: "Tuqqi", logo: "/clients/tuqqi.svg", w: 97, h: 36 },
  { name: "FleetNurse", logo: "/clients/fleet-nurse.svg", w: 114, h: 40 },
  { name: "Pocket Dentist", logo: "/clients/pocket-dentist.svg", w: 90, h: 48 },
  { name: "Stella Dental", logo: "/clients/stella-dental.svg", w: 40, h: 56, withName: true },
  { name: "neurogazer", logo: "/clients/neurogazer.svg", w: 124, h: 20 },
  { name: "skroote", logo: "/clients/skroote.svg", w: 108, h: 32 },
  { name: "Investment Evolution", logo: "/clients/investment-evolution.svg", w: 128, h: 36 },
] as const;

/** Countries where Ciylo has clients (not offices). lat/lng = capital, for the map. */
export const clientCountries = [
  { name: "USA", code: "US", lat: 38.9, lng: -77.04 },
  { name: "UK", code: "GB", lat: 51.51, lng: -0.13 },
  { name: "Germany", code: "DE", lat: 52.52, lng: 13.4 },
  { name: "France", code: "FR", lat: 48.86, lng: 2.35 },
  { name: "Malta", code: "MT", lat: 35.9, lng: 14.51 },
  { name: "Nigeria", code: "NG", lat: 9.08, lng: 7.4 },
  { name: "KSA", code: "SA", lat: 24.71, lng: 46.68 },
  { name: "UAE", code: "AE", lat: 24.45, lng: 54.38 },
] as const;

/** Offices. Lahore only for now; add more entries here as they open. */
export const offices = [
  {
    city: "Lahore",
    country: "Pakistan",
    address: "9-A, Aitchison Society, Lahore 53700",
    phone: "+92 301 6475925",
    phoneHref: "tel:+923016475925",
    timezone: "Asia/Karachi",
    hq: true,
  },
] as const;

/** Proof points shown in Why Ciylo. */
export const proofPoints = [
  { value: "HW + SW", label: "Hardware + software under one roof" },
  { value: "35", label: "Person team of Ciylotrons" },
  { value: "8", label: "Countries with Ciylo clients" },
  { value: "2", label: "US partner companies for technical support" },
] as const;

export type NavLink = { label: string; href: string; description?: string };

export const nav = {
  about: [
    { label: "Our Story", href: "/about#story", description: "Seven years of turning ideas into products" },
    { label: "Our Divisions", href: "/about/divisions", description: "Ciylo Software Studio and Ciylo Hardware Lab" },
    { label: "Leadership", href: "/about/leadership", description: "The CiyloCore steering every build" },
    { label: "Teams", href: "/about/teams", description: "Meet the Ciylotrons by discipline" },
    { label: "How We Build", href: "/#process", description: "Six stages, discovery to support" },
    { label: "The Studio", href: "/about#studio", description: "Our Lahore office and lab" },
  ],
  careers: [
    { label: "Life at Ciylo", href: "/careers#life", description: "Creative freedom, real ownership" },
    { label: "Growth", href: "/careers#growth", description: "Learning, mentoring and recognition" },
    { label: "Open Roles", href: "/careers#roles", description: "Hardware, software and growth" },
    { label: "Book a Visit", href: "/contact", description: "Come and see the lab" },
  ],
} satisfies Record<string, NavLink[]>;
