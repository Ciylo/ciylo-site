import type { Metadata, Viewport } from "next";
import { Mona_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { site } from "@/data/site";

const sans = Mona_Sans({ variable: "--font-sans-face", subsets: ["latin"], display: "swap", axes: ["wdth"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono-face", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ciylo: One team for the device, the data and the app",
    template: "%s · Ciylo",
  },
  description: site.description,
  applicationName: "Ciylo",
  keywords: [
    "embedded systems",
    "firmware development",
    "PCB design",
    "IoT",
    "edge AI",
    "AI engineering",
    "web development",
    "mobile apps",
    "SaaS",
    "MVP development",
    "software company Lahore",
    "Pakistan",
  ],
  openGraph: {
    type: "website",
    siteName: "Ciylo",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#111013",
  colorScheme: "light",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/ciylo-logo.svg`,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: "PK",
  },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-ink-900">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-teal-500 px-4 py-2 font-semibold text-ink-900 focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="bg-white outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
