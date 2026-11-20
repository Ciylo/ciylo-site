# Ciylo website

The new marketing site for **Ciylo**, the Lahore engineering studio that ships hardware, firmware, AI and software as one team. It will replace the current site at theciylo.com; for now it is deployed on a Vercel domain for testing.

- **Stack:** Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · Lenis smooth scroll
- **Rendering:** every page is statically prerendered (case studies, industries and solutions via `generateStaticParams`)
- **Things the owner still needs to supply:** see [`PROVIDE.md`](./PROVIDE.md)

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (also type-checks)
npm run start        # serve the production build
npm run lint
```

Node 20+ is required (developed on Node 24).

### Helper scripts

| Script | What it does | When to run |
|---|---|---|
| `npm run images:manifest` | Reads every raster in `public/images` and writes intrinsic sizes to `src/data/image-manifest.json`, so `next/image` renders without layout shift | After adding or replacing any image |
| `npm run map` | Regenerates the dotted world map (`public/images/world-dots.svg`) and pin positions (`src/data/map-pins.json`) from `clientCountries` in `src/data/site.ts` | After changing client countries |
| `npm run globe` | Regenerates the land dots for the 3D client globe (`public/data/globe.json`, loaded lazily) | Rarely (only if the dot density should change) |
| `npm run countries` | Bakes English country names for the phone picker into `src/data/country-names.json`, so server and browsers render identical text | After upgrading `libphonenumber-js` |

---

## Project structure

```
src/
  app/                        Routes (App Router)
    page.tsx                  Home
    services/                 Services hub (MVP pipeline, advisory strip, accordion, engagement table)
    work/ + work/[slug]/      Case-study list (filterable) and detail pages
    solutions/ + [slug]/      Packaged solutions (problem → included → timeline → CTA)
    industries/ + [slug]/     Industry index and per-industry pages
    about/                    About, plus /about/divisions, /about/leadership, /about/teams
    careers/                  Careers with department-filtered role cards
    contact/                  Contact form, offices, studio, socials
    privacy/, terms/          Legal drafts (need legal review)
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/
    layout/                   Header (mega-menus, mobile drawer), Footer, smooth scroll, motion config
    home/                     Home sections (Hero, Statement, ServicesBento, Lab, Process, SelectedWork,
                              WhyCiylo + ClientsMap, CiylotronsTeaser, Industries, ContactSection, JoinUsBand)
    services/, work/, about/, careers/
    ui/                       Primitives: Button, Reveal, SplitHeading, Magnetic, Marquee, CountUp, Spotlight, Img, Logo
    ContactForm.tsx           Contact form (prefill via URL, opens email for now)
  data/                       ALL CONTENT LIVES HERE (see below)
  lib/                        cn(), image sizes, contact links, hydration-safe reduced-motion hook
public/
  brand/                      Vector logos exported from the brand Figma (+ favicon source)
  clients/                    Client logos (vector)
  images/                     Optimised WebP: work/<slug>/, team/, leadership/, life/, office/, lab/
  video/                      Drop hero.mp4 here (see PROVIDE.md)
scripts/                      image-manifest.mjs, world-map.mjs
```

---

## Editing content

Almost all copy lives in typed data files in `src/data/`. Change the data and every page that uses it updates.

| File | Contents |
|---|---|
| `site.ts` | Company facts (email, phone, address, team size, stats), socials, client logos, **client countries**, **offices**, proof points, About and Careers menu links |
| `services.ts` | 23 services in 4 groups (Hardware & Edge, Software & AI, Strategy & Engagement, Advisory), the MVP pipeline and the engagement-model table. Each service lists related case-study slugs in `work: []` (empty = "case studies coming soon") and can be `featured` on the home page |
| `work.ts` | The 10 case studies: copy, features, highlights, screens, cover, accent colour and the service ids they map to |
| `industries.ts` | 12 industries with hero copy, focus areas, relevant service ids and case-study slugs; each becomes `/industries/<slug>` |
| `solutions.ts` | 3 packaged solutions (Remote Site Monitoring, Wearable Health Monitoring, Kiosk Platform) |
| `team.ts` | The CiyloCore leadership, the Ciylotrons (name, role, discipline, honours) and "what makes a Ciylotron" traits |
| `culture.ts` | Life-at-Ciylo moments, studio and lab photos, recognitions, departments and open roles |

### Common tasks

- **Add a case study:** export its images to `public/images/work/<slug>/` as `cover.webp`, `01.webp`, `02.webp` and so on. Add an entry to `work.ts`, add the slug to the `work` array of each relevant service in `services.ts` (and industry in `industries.ts`), then run `npm run images:manifest`.
- **Add a Ciylotron:** save a background-removed portrait as `public/images/team/<slug>.webp` (about 720px wide, 1:1.3), add them to `ciylotrons` in `team.ts`, then run `npm run images:manifest`.
- **Add or close a job:** edit `openRoles` in `culture.ts`.
- **Add an office:** replace the placeholder entry in `offices` in `site.ts`.
- **Hero video:** drop `public/video/hero.mp4`. It is detected at build time and plays muted on loop behind the hero; the lab photo is the poster and fallback.

### Terminology

- **CiyloCore**: the Ciylo team as a whole and its leadership.
- **Ciylotron**: an individual team member. Portray them as multi-skilled people who own a domain, lead and present, not only as engineers.

---

## Design system

Defined as Tailwind v4 theme tokens in `src/app/globals.css`. The brand teal `#00C9A7` comes from the Figma variable `green-cyan` and the logo.

**Teal ramp (brand)**

| Token | Hex | Use |
|---|---|---|
| `teal-50` | `#E6FAF6` | Mint backgrounds (contact, chips) |
| `teal-100` | `#C9EFE7` | Rails, subtle tints |
| `teal-200`–`400` | `#96E5D5` `#57D9BF` `#1FCFAF` | Hovers, accents on dark |
| **`teal-500`** | **`#00C9A7`** | Brand: primary buttons, accents, on-dark text |
| `teal-600` | `#00A78B` | Pressed states |
| `teal-700` | `#007D69` | Links and kickers on white (WCAG AA) |
| `teal-800` | `#005A4B` | Link hover, text on mint |
| `teal-900` | `#003D33` | Deep accents |

**Ink neutrals** (violet-tinted near-blacks from the mockup): `ink-900 #111013` (text, dark sections) · `ink-850 #16151A` · `ink-800 #1E1D23` · `ink-700 #2E2D35` (dark borders) · `ink-500 #55545E` (muted text) · `ink-300 #A9A9B3` · `ink-200 #C9C9D1` · `ink-150 #E2E2E8` (borders) · `ink-75 #F2F2F5` · `ink-50 #F7F7F9`.

**Secondary accents** (from Figma, use sparingly): `cyan-500 #00ABBC`, `lime-400 #A5F31E`, `graphite #434343` (the logo mark grey).

**Type:** Mona Sans (GitHub's variable grotesk, 200–900) for everything, chosen as a less common, engineered alternative to Inter in the spirit of SF Pro / NVIDIA Sans (both of which are licence-restricted). IBM Plex Mono only for small numeric labels. Kickers (`.kicker`) are tracked uppercase sans, not monospace. Display headings are 800 weight with tight tracking (−0.03 to −0.045em).

**Shape:** pills for buttons and chips; 22px cards; 28px panels; flat colour blocks, with shadows only on floating UI.

**Logos:** `public/brand/` holds true vector exports from the brand Figma: `ciylo-logo.svg` (light backgrounds), `ciylo-logo-dark.svg` (dark), `ciylo-logo-mono-white.svg`, and `ciylo-mark*.svg`.

### Diagrams

Interactive architecture diagrams replace stand-in photos wherever no relevant photo exists: the three solution pages, five industry pages (energy, oil & gas, manufacturing, agriculture, restaurants) and the homepage "CiyloCore" stack. Data lives in `src/data/diagrams.ts` (nodes on a grid with separate desktop `d` and phone `m` positions, plus edges). `components/diagram/FlowDiagram.tsx` renders them with hover/focus/tap highlighting, flowing data packets, an auto-tour and a details panel; `DiagramThumb.tsx` renders static SVG miniatures for index cards. Industries opt in with `diagram: "<id>"` in `industries.ts`.

### Motion

- Lenis smooth scrolling, word-by-word heading reveals, scroll-linked statement highlight, count-ups, a crossfading photo hero with Ken Burns motion, magnetic buttons, cursor spotlights, parallax galleries, a scroll-driven process rail, layout-animated filters, marquees, and arcs on the client globe.
- 3D: tilt-and-glare cards (`ui/Tilt.tsx`, mouse/pen only), a draggable canvas globe of client countries (`home/Globe.tsx`), hero scroll parallax, gradient-shimmer accents, button light sweeps, an animated MVP pipeline, a scroll progress bar, and a view-transition morph from a work card's cover into its case-study hero.
- Reveals and split headings are CSS transitions driven by one shared IntersectionObserver (`lib/useInViewOnce.ts`); the hero entrance is pure CSS so the LCP text paints before JavaScript.
- Loading: route skeletons (`app/loading.tsx`, `app/work/[slug]/loading.tsx`), a globe skeleton, and dominant-colour placeholders for photos (stored in the image manifest).
- Every animation respects `prefers-reduced-motion`: `MotionConfig reducedMotion="user"` globally, plus `useReducedMotionSafe()` for scroll-linked effects, which hydrates identically on server and client.

### Accessibility

Skip link; every menu, filter and accordion uses buttons with `aria-expanded`, `aria-selected` or `aria-pressed`; Escape closes menus; there are visible focus rings; and the hero background has a dark overlay for at least 4.5:1 contrast.

---

## Contact form

`src/components/ContactForm.tsx` has an inquiry type, service or solution, chips, and a required phone number with country code. It prefills from the URL; every "Get this service" button links to `/contact?inquiry=…&service=…#form` (see `contactHref` in `src/lib/contact.ts`).

**Current behaviour:** on submit it opens the visitor's email app with a pre-filled message to `noraiz@ciylo.com`. To switch to real delivery with Resend, see `PROVIDE.md`.

---

## Deploying to Vercel

1. In Vercel, **Add New → Project → Import** this GitHub repo (`kaifsakes/ciylo-website`). The framework is detected as Next.js; no build settings are needed.
2. Environment variables (Project → Settings → Environment Variables):

   | Name | Value | Why |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | e.g. `https://ciylo-website.vercel.app` while testing, then `https://theciylo.com` | Canonical URLs, sitemap, OG images |
   | `NEXT_PUBLIC_ALLOW_INDEXING` | `false` while testing | Makes `robots.txt` disallow crawling so the test domain isn't indexed. Remove it at launch |

3. Every push to `main` deploys to production, and other branches get preview URLs.
4. **At launch:** add `theciylo.com` under Project → Domains, set `NEXT_PUBLIC_SITE_URL=https://theciylo.com`, remove `NEXT_PUBLIC_ALLOW_INDEXING`, and redeploy.

---

## Sources used to build the site

- **Design skeleton:** `Ciylo Website Mockup.html` (layout, tokens, copy for services and process).
- **Content:** the previous site (`ciylo-tech` repo, theciylo.com), with placeholder and template copy removed.
- **Brand, case studies, team and culture:** the "Branding Ciylo" Figma file. Logos were exported as vectors, and images were converted to WebP with EXIF orientation applied.
- **Additions:** the owner's competitor-review brief (new services, Advisory, Solutions, Industries pages, proof points, client countries, offices, form upgrades).

## Maintenance notes

- Performance (Nov 2026, calibrated Lighthouse): desktop ~94, mobile ~60 (CLS 0, LCP = FCP). Avoid wrapping the whole app in a `<ViewTransition>`: it routes streamed Suspense reveals through `startViewTransition` and cost seconds of main-thread time.
- Bump `copyrightYear` in `src/data/site.ts` each January (it is static so pages stay prerendered).
- This Next.js version has breaking changes from older docs; check `node_modules/next/dist/docs/` before upgrading patterns (see `AGENTS.md`).
