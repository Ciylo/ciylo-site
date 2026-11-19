"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** How long a dropdown stays open after the cursor leaves it (forgives accidental slips). */
const CLOSE_DELAY = 400;
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { nav, type NavLink } from "@/data/site";
import { serviceGroups, services, type Service } from "@/data/services";
import { solutions } from "@/data/solutions";
import { industryPages } from "@/data/industries";

type MenuId = "services" | "solutions" | "industries" | "about" | "careers" | null;
type SmallMenuId = "solutions" | "about" | "careers";

type Promo = { kicker: string; title: string; cta: string; href: string; image: string };

const promos: Record<SmallMenuId, Promo> = {
  solutions: { kicker: "READY TO DEPLOY", title: "Hardware, firmware, app and cloud in one package.", cta: "All solutions", href: "/solutions", image: "/images/lab/bench-2.webp" },
  about: { kicker: "THE CIYLOCORE", title: "One team for the device, the data and the app.", cta: "Our story", href: "/about", image: "/images/life/skardu-desert.webp" },
  careers: { kicker: "WE ARE HIRING", title: "Open roles across hardware, software and growth.", cta: "See roles", href: "/careers#roles", image: "/images/life/funday-pool.webp" },
};

/** Background photo for each service in the Services menu preview panel. */
const serviceImages: Record<string, string> = {
  embedded: "/images/lab/embedded-desk.webp",
  wearables: "/images/lab/bench-3.webp",
  hardware: "/images/lab/bench-2.webp",
  "edge-ai": "/images/lab/pcb-probe.webp",
  iot: "/images/lab/bench-wide.webp",
  mechanical: "/images/lab/soldering.webp",
  robotics: "/images/office/hassan-desk.webp",
  kiosks: "/images/office/glass-room.webp",
  manufacturing: "/images/lab/bench-1.webp",
  certification: "/images/office/kaif-desk.webp",
  ai: "/images/work/mirra/cover.webp",
  software: "/images/work/fireside-pharmacy/cover.webp",
  ecommerce: "/images/work/splitmart/cover.webp",
  "erp-crm": "/images/work/i-health/cover.webp",
  cloud: "/images/office/hassan-desk.webp",
  data: "/images/work/tarea/01.webp",
  cybersecurity: "/images/office/kaif-desk.webp",
  "product-development": "/images/office/studio.webp",
  consulting: "/images/office/meeting.webp",
  "product-market-fit": "/images/office/meeting.webp",
  "product-rescue": "/images/office/shakeel-desk.webp",
  "due-diligence": "/images/office/ideas-wall.webp",
  feasibility: "/images/office/glass-room.webp",
};
const serviceImage = (id: string) => serviceImages[id] ?? "/images/office/studio.webp";

/** Photo + dark teal tint used behind every dropdown's right-hand panel. */
function PanelBackdrop({ src, active = true }: { src: string; active?: boolean }) {
  return (
    <div aria-hidden className={cn("absolute inset-0", active ? "opacity-100" : "opacity-0")}>
      <Image src={src} alt="" fill sizes="340px" quality={60} loading="eager" className="object-cover" />
      <div className="absolute inset-0 bg-ink-900/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-teal-900/40" />
    </div>
  );
}

const smallMenus: Record<SmallMenuId, NavLink[]> = {
  solutions: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}`, description: s.short })),
  about: nav.about,
  careers: nav.careers,
};

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuId>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const { scrollY } = useScroll();

  // Close menus on navigation (state adjustment during render, no effect needed)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (open || mobile) return;
    setHidden(y > 240 && y > prev);
  });

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Hover intent: leaving the header/dropdown schedules a close; coming back cancels it.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  };
  useEffect(() => cancelClose, []);

  const toggle = (id: MenuId) => {
    cancelClose();
    setOpen((cur) => (cur === id ? null : id));
  };
  const btn = (id: Exclude<MenuId, null>, label: string) => (
    <MenuButton id={id} label={label} open={open} onOpen={setOpen} onToggle={toggle} />
  );

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-3.5"
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <header
        className={cn(
          "mx-auto flex min-h-16 max-w-[1188px] items-center justify-between gap-4 rounded-full border bg-white/90 py-2 pr-2 pl-5 backdrop-blur-xl transition-shadow duration-300 sm:pl-6",
          scrolled ? "border-ink-150 shadow-header" : "border-ink-100 shadow-[0_2px_12px_rgb(17_16_19/0.06)]",
        )}
      >
        <Link href="/" aria-label="Ciylo home" onMouseEnter={() => setOpen(null)} className="shrink-0">
          <Logo className="h-7 sm:h-[30px]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 text-[15px] font-medium lg:flex">
          {btn("services", "Services")}
          <TopLink href="/work" label="Work" active={pathname.startsWith("/work")} onEnter={() => setOpen(null)} />
          {btn("solutions", "Solutions")}
          {btn("industries", "Industries")}
          {btn("about", "About")}
          {btn("careers", "Careers")}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            onMouseEnter={() => setOpen(null)}
            className="group relative isolate hidden items-center gap-2.5 overflow-hidden rounded-full bg-ink-900 px-5 py-3 text-[15px] font-semibold text-white transition-colors delay-75 duration-300 hover:text-ink-900 focus-visible:text-ink-900 sm:inline-flex"
          >
            {/* The teal dot grows to flood the button on hover */}
            <span className="relative size-2" aria-hidden>
              <span className="absolute inset-0 -z-10 rounded-full bg-teal-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[32] group-focus-visible:scale-[32]" />
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-teal-500 transition-colors duration-300 group-hover:bg-ink-900 group-focus-visible:bg-ink-900" />
            </span>
            Let&apos;s talk
          </Link>
          <button
            type="button"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}
            className="relative grid size-12 place-items-center rounded-full bg-ink-75 lg:hidden"
          >
            <span className={cn("absolute h-0.5 w-5 rounded bg-ink-900 transition-transform duration-300", mobile ? "rotate-45" : "-translate-y-1")} />
            <span className={cn("absolute h-0.5 w-5 rounded bg-ink-900 transition-transform duration-300", mobile ? "-rotate-45" : "translate-y-1")} />
          </button>
        </div>
      </header>

      {/* Desktop dropdowns */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute inset-x-0 top-full hidden px-6 pt-2 lg:block"
          >
            {open === "services" ? (
              <ServicesMenu />
            ) : open === "industries" ? (
              <IndustriesMenu />
            ) : (
              <SmallMenu links={smallMenus[open]} promo={promos[open]} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{mobile && <MobileMenu pathname={pathname} />}</AnimatePresence>
    </motion.div>
  );
}

function TopLink({ href, label, active, onEnter }: { href: string; label: string; active: boolean; onEnter: () => void }) {
  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      className={cn("rounded-full px-3.5 py-2.5 transition-colors hover:bg-ink-75 xl:px-4", active && "text-teal-700")}
    >
      {label}
    </Link>
  );
}

function MenuButton({
  id,
  label,
  open,
  onOpen,
  onToggle,
}: {
  id: Exclude<MenuId, null>;
  label: string;
  open: MenuId;
  onOpen: (id: MenuId) => void;
  onToggle: (id: MenuId) => void;
}) {
  const isOpen = open === id;
  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      onMouseEnter={() => onOpen(id)}
      onClick={() => onToggle(id)}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3.5 py-2.5 transition-colors xl:px-4",
        isOpen ? "bg-teal-50" : "hover:bg-ink-75",
      )}
    >
      {label}
      <span aria-hidden className={cn("text-lg leading-none text-teal-700 transition-transform duration-300", isOpen && "rotate-45")}>
        +
      </span>
    </button>
  );
}

/** Grouped services with a hover/focus preview panel on the right. */
function ServicesMenu() {
  const [group, setGroup] = useState(0);
  const g = serviceGroups[group];
  const list = services.filter((s) => s.group === g.id);
  const [hover, setHover] = useState<Service>(list[0]);
  const preview = list.includes(hover) ? hover : list[0];

  return (
    <div className="mx-auto max-w-[1188px] overflow-hidden rounded-3xl border border-ink-150 bg-white shadow-pop">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-100 px-5 py-4">
        <div role="tablist" aria-label="Service groups" className="flex gap-1 rounded-full bg-ink-75 p-1">
          {serviceGroups.map((sg, i) => (
            <button
              key={sg.id}
              role="tab"
              aria-selected={i === group}
              onMouseEnter={() => setGroup(i)}
              onFocus={() => setGroup(i)}
              onClick={() => setGroup(i)}
              className={cn(
                "rounded-full px-4 py-2 text-sm",
                i === group ? "bg-ink-900 font-semibold text-white" : "font-medium text-ink-600 hover:text-ink-900",
              )}
            >
              {sg.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-ink-500">{g.blurb}</p>
      </div>

      <div className="grid grid-cols-[1fr_320px]">
        <ul className="grid content-start gap-1 p-3 sm:grid-cols-2">
            {list.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services#${s.id}`}
                  onMouseEnter={() => setHover(s)}
                  onFocus={() => setHover(s)}
                  className={cn(
                    "group flex items-center justify-between gap-3 rounded-2xl px-4 py-3",
                    preview.id === s.id ? "bg-teal-50" : "hover:bg-ink-50",
                  )}
                >
                  <span className="flex flex-col">
                    <span className="text-[15px] font-semibold text-ink-900">{s.name}</span>
                    <span className="font-semibold text-[11px] text-ink-500">{s.tags.slice(0, 3).join(" · ")}</span>
                  </span>
                  <span className={cn("text-teal-700", preview.id === s.id ? "opacity-100" : "opacity-0")} aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
        </ul>

        <div className="relative isolate flex flex-col gap-4 overflow-hidden bg-ink-900 p-6 text-white">
          {/* All of this tab's photos are mounted at once and toggled, so hovering swaps instantly */}
          <div className="absolute inset-0 -z-10">
            {Array.from(new Set(list.map((s) => serviceImage(s.id)))).map((src) => (
              <PanelBackdrop key={src} src={src} active={src === serviceImage(preview.id)} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-3">
              <p className="kicker text-teal-500">{g.label}</p>
              <p className="text-xl leading-snug font-bold">{preview.name}</p>
              <p className="text-sm leading-relaxed text-ink-200">{preview.short}</p>
              {preview.work.length > 0 && (
                <p className="font-semibold text-xs text-teal-400">
                  {preview.work.length} case {preview.work.length === 1 ? "study" : "studies"}
                </p>
              )}
              <Link
                href={`/services#${preview.id}`}
                className="mt-auto self-start rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-ink-900 hover:bg-teal-400"
              >
                View {preview.name.split(" ")[0]} →
              </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-teal-50 px-5 py-4 text-sm">
        <span className="text-ink-700">
          Building something new?{" "}
          <Link href="/services#product-development" className="font-semibold text-teal-800 hover:underline">
            See our product &amp; MVP pipeline
          </Link>
        </span>
        <Link href="/services" className="font-semibold text-ink-900 hover:text-teal-800">
          All services →
        </Link>
      </div>
    </div>
  );
}

function IndustriesMenu() {
  return (
    <div className="mx-auto max-w-[1188px] overflow-hidden rounded-3xl border border-ink-150 bg-white shadow-pop">
      <ul className="grid grid-cols-3 gap-1 p-3 xl:grid-cols-4">
        {industryPages.map((i) => (
          <li key={i.slug}>
            <Link href={`/industries/${i.slug}`} className="group flex flex-col gap-0.5 rounded-2xl px-4 py-3 transition-colors hover:bg-ink-50">
              <span className="flex items-center justify-between text-[15px] font-semibold">
                {i.name}
                <span className="text-teal-700 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                  →
                </span>
              </span>
              <span className="text-[13px] text-ink-500">{i.detail}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between bg-teal-50 px-5 py-4 text-sm">
        <span className="text-ink-700">Don&apos;t see your sector? We adapt fast.</span>
        <Link href="/industries" className="font-semibold text-ink-900 hover:text-teal-800">
          All industries →
        </Link>
      </div>
    </div>
  );
}

function SmallMenu({ links, promo }: { links: NavLink[]; promo: Promo }) {
  return (
    <div className="mx-auto flex w-[660px] max-w-full flex-wrap gap-2.5 rounded-[22px] border border-ink-150 bg-white p-2.5 shadow-pop">
      <ul className="flex flex-[1_1_300px] flex-col">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="flex flex-col gap-0.5 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-ink-50">
              <span className="text-[15px] font-semibold text-ink-900">{l.label}</span>
              <span className="text-[13px] text-ink-500">{l.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative isolate flex min-h-[220px] flex-[0_1_220px] flex-col justify-between overflow-hidden rounded-2xl bg-ink-900 p-5">
        <div className="absolute inset-0 -z-10">
          <PanelBackdrop src={promo.image} />
        </div>
        <p className="kicker text-teal-400">{promo.kicker}</p>
        <p className="text-[19px] leading-snug font-bold text-white">{promo.title}</p>
        <Link href={promo.href} className="self-start rounded-full bg-teal-500 px-3.5 py-2 text-[13px] font-semibold text-ink-900 hover:bg-teal-400">
          {promo.cta}
        </Link>
      </div>
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [section, setSection] = useState<string | null>(null);
  const groups: { id: string; label: string; links: { href: string; label: string }[] }[] = [
    { id: "services", label: "Services", links: [{ href: "/services", label: "All services" }, ...services.map((s) => ({ href: `/services#${s.id}`, label: s.name }))] },
    { id: "solutions", label: "Solutions", links: [{ href: "/solutions", label: "All solutions" }, ...solutions.map((s) => ({ href: `/solutions/${s.slug}`, label: s.name }))] },
    { id: "industries", label: "Industries", links: [{ href: "/industries", label: "All industries" }, ...industryPages.map((i) => ({ href: `/industries/${i.slug}`, label: i.name }))] },
    { id: "about", label: "About", links: [{ href: "/about", label: "About Ciylo" }, ...nav.about] },
  ];
  const items = [
    { href: "/work", label: "Work" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-3 top-full mt-2 max-h-[calc(100dvh-96px)] overflow-y-auto rounded-3xl border border-ink-150 bg-white p-3 shadow-pop lg:hidden"
      data-lenis-prevent
    >
      {groups.map((g) => {
        const isOpen = section === g.id;
        return (
          <div key={g.id}>
            <button
              type="button"
              onClick={() => setSection(isOpen ? null : g.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-2xl font-bold tracking-tight"
            >
              {g.label} <span className={cn("text-teal-700 transition-transform", isOpen && "rotate-45")}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="grid gap-0.5 px-2 pb-3">
                    {g.links.map((l) => (
                      <Link key={l.href} href={l.href} className="rounded-xl px-3 py-2 text-[15px] text-ink-700 hover:bg-ink-50">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className={cn("block rounded-2xl px-4 py-3.5 text-2xl font-bold tracking-tight hover:bg-ink-50", pathname === it.href && "text-teal-700")}
        >
          {it.label}
        </Link>
      ))}
      <Link href="/contact" className="mt-2 flex items-center justify-center gap-2.5 rounded-full bg-teal-500 px-6 py-4 font-bold text-ink-900">
        Start a project →
      </Link>
    </motion.div>
  );
}
