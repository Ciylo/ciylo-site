import type { Metadata, Viewport } from "next";
import { Mona_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { siteGraph } from "@/lib/schema";

const sans = Mona_Sans({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});
const mono = IBM_Plex_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const indexingAllowed = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

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
  // Pre-launch: NEXT_PUBLIC_ALLOW_INDEXING=false adds noindex to every page (robots.txt alone doesn't stop indexing)
  robots: indexingAllowed ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#111013",
  colorScheme: "light",
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
          <ScrollProgress />
          <Header />
          <main id="main" tabIndex={-1} className="bg-white outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
