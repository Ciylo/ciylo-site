# What we need from you

A running list of assets, facts and decisions the site still needs. Tick items off as they come in. Placeholders on the live site are written in `[brackets]` so they're easy to find.

_Last updated: 19 Nov 2026_

## 🔴 High priority (visible on the site now)

- [ ] **Hero video**: a 10–20 s muted loop of real lab and bench work (soldering, probing boards, devices running). 1920×1080, H.264 MP4, under 8 MB. Save it as `public/video/hero.mp4` and it plays automatically.
- [ ] **Noraiz's headshot**: a professional photo, at least 1200 px tall. The current image is a casual outdoor shot (`public/images/leadership/noraiz.webp`).
- [ ] **Confirm the open roles** on /careers are still open: Embedded Systems Engineer (1–3 yrs), Hardware Engineer / PCB Designer (2–3 yrs), SEO Expert (2–4 yrs). Add any new ones.
- [ ] **Legal review of /privacy and /terms**: these are drafts. Fill in `[Date of legal review]` and `[jurisdiction to be confirmed]`.
- [ ] **More socials** (optional): LinkedIn and Instagram are live. Send Facebook, X, GitHub, Clutch, Behance or YouTube links if you open those accounts.

## 🟠 Content

- [ ] **Hardware / embedded case studies**: there are currently none, so all hardware services show "Case studies coming soon". Even 2–3 (wearable, IoT/remote monitoring, kiosk, PCB) would help a lot. For each: client (or anonymised), problem, what we built, outcome, metrics and 4–8 photos or renders.
- [ ] **Metrics for existing case studies**: real numbers such as active users, uptime or time saved. Only I-Hospice has stats today, and nothing is invented.
- [ ] **Real testimonials**: the home page shows 3 PLACEHOLDER quotes (Ola, ChipMango; Chiddi, SplitMart; Jovan, MedSynq) with silhouette avatars. Send the approved quote, full name, role and a headshot for each, and confirm the spelling of MedSynq. Edit src/data/testimonials.ts.
- [ ] **The rest of the team**: the site features 21 of 35 Ciylotrons. Send names, roles and portraits for the other 14.
- [ ] **Achievements and representation**: competitions, conferences, awards and talks where Ciylotrons represented Ciylo or Pakistan. The copy mentions this, and specifics would make it much stronger.
- [ ] **Solution timelines**: typical durations for each phase of the three solutions (Survey → Pilot → Rollout → Operate, and so on). They are shown without durations for now.
- [ ] **Engagement table**: typical lengths for Prototype / PoC, Dedicated team and Full project delivery, if you want them shown.
- [ ] **Certifications and partnerships**: any you actually hold (ISO, cloud partner tiers and so on). Nothing is claimed today.

## 🟡 Images (higher resolution wanted)

These portraits are under 450 px and look soft on large screens:
- [x] Muhammad Kaif: full-resolution portrait received and processed (Nov 2026)
- [ ] Hamza Tanveer (400 px original), Danish, Abuzar, Zaid Tahir, Mohsin Khan, Raheel Niaz, Huzaifa, Taimoor Hassan

Also useful:
- [ ] More **lab and project photos**: PCBs, prototypes, devices in the field, kiosks, robots.
- [ ] **Team photos** in the new studio, a group shot and candid work moments.
- [ ] **GIFs or short clips** of products in use, for case studies.
- [ ] Exported **I-Hospice composites** (the "Hospice-group-1..5" frames in Figma) to use as a better cover.
- [ ] Client logos for any new clients (SVG preferred).

## 🔵 Technical / accounts

- [ ] **Resend** (so the contact form sends email instead of opening the visitor's mail app):
  1. Create a free account at resend.com and verify the `ciylo.com` sending domain.
  2. Create an API key and add `RESEND_API_KEY` in Vercel → Project → Settings → Environment Variables.
  3. Tell us. We'll add a server action and keep mailto as the fallback.
- [ ] **Domain switch**: when ready to replace theciylo.com, give access to the domain's DNS (or the current Vercel project) so we can move it.
- [ ] **Analytics**: say whether you want Vercel Web Analytics, GA4 or neither. The privacy page needs updating if analytics are added.
- [ ] **Email to show publicly**: confirm whether a general inbox (for example hello@ciylo.com) should replace noraiz@ciylo.com on the site.

## ✅ Received / done

- Branding Figma (logo, colours, posters, case-study decks)
- Website mockup HTML
- Office photos
- Partnerships: 2 US partner companies (technical support)
- Client permission for all 10 case studies and all client logos (incl. ChipMango)
- Confirmed facts: 7+ years, 300+ products, 80+ clients, 20+ industries, 35-person team, clients in USA, UK, Germany, France, Malta, Nigeria, KSA and UAE
- Contact: noraiz@ciylo.com, +92 301 6475925, 9-A Aitchison Society, Lahore 53700
