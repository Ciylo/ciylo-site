"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { industryPages } from "@/data/industries";
import { cn } from "@/lib/cn";
import type { ContactDefaults } from "@/lib/contact";
import { countryOptions } from "@/lib/countries";
import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/min";

export const inquiryTypes = [
  { id: "new-project", label: "New project" },
  { id: "advisory", label: "Advisory (PMF, Due Diligence, Rescue)" },
  { id: "careers", label: "Careers" },
  { id: "partnership", label: "Partnership" },
  { id: "other", label: "Other" },
] as const;

type Defaults = ContactDefaults;

function FormInner({ defaults }: { defaults: Defaults }) {
  const advisoryIds = services.filter((s) => s.group === "Advisory").map((s) => s.id);
  const initialInquiry =
    defaults.inquiry ?? (defaults.service && advisoryIds.includes(defaults.service) ? "advisory" : "new-project");
  const [inquiry, setInquiry] = useState<string>(initialInquiry);
  const [service, setService] = useState<string>(defaults.service ?? defaults.solution ?? "");
  const [sent, setSent] = useState(false);
  const [country, setCountry] = useState<CountryCode>("PK");
  const [phoneError, setPhoneError] = useState("");
  const countries = countryOptions();
  const selected = [...countries.priority, ...countries.rest].find((x) => x.code === country)!;
  const industry = industryPages.find((i) => i.slug === defaults.industry);

  const serviceName =
    services.find((s) => s.id === service)?.name ?? solutions.find((s) => s.slug === service)?.name ?? "";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const parsed = parsePhoneNumberFromString(String(f.get("phone") ?? ""), country);
    if (!parsed || !parsed.isValid()) {
      setPhoneError(`That doesn’t look like a valid ${selected.name} number.`);
      e.currentTarget.querySelector<HTMLInputElement>("#phone")?.focus();
      return;
    }
    setPhoneError("");
    const name = String(f.get("name") ?? "").trim();
    const inquiryLabel = inquiryTypes.find((i) => i.id === inquiry)?.label ?? inquiry;
    const subject = `[${inquiryLabel}] ${serviceName ? `${serviceName} · ` : ""}${name || "Website enquiry"}`;
    const body = [
      `Inquiry type: ${inquiryLabel}`,
      serviceName ? `Service / solution: ${serviceName}` : null,
      industry ? `Industry: ${industry.name}` : null,
      `Name: ${name}`,
      `Email: ${f.get("email")}`,
      `Phone: ${parsed.formatInternational()} (${selected.name})`,
      f.get("company") ? `Company: ${f.get("company")}` : null,
      "",
      String(f.get("message") ?? ""),
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const input =
    "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-3 text-[15px] font-normal text-ink-900 outline-none transition-[border-color,box-shadow] placeholder:text-ink-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/15";

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Contact Ciylo"
      className="relative flex flex-col gap-5 rounded-[28px] bg-white p-6 shadow-teal sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Inquiry type *
          <select name="inquiry" required value={inquiry} onChange={(e) => setInquiry(e.target.value)} className={input}>
            {inquiryTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Service or solution
          <select name="service" value={service} onChange={(e) => setService(e.target.value)} className={input}>
            <option value="">Not sure / several</option>
            <optgroup label="Solutions">
              {solutions.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </optgroup>
            {(["Hardware", "Software", "Consulting", "Advisory"] as const).map((g) => (
              <optgroup key={g} label={g === "Consulting" ? "Strategy & Engagement" : g}>
                {services
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      {industry && (
        <p className="rounded-xl bg-teal-50 px-4 py-2.5 text-sm text-teal-800">
          Industry: <strong>{industry.name}</strong>
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Name *
          <input name="name" required autoComplete="name" className={input} placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Work email *
          <input name="email" type="email" required autoComplete="email" className={input} placeholder="you@company.com" />
        </label>
        <div className="flex flex-col gap-1.5 text-sm font-semibold">
          <label htmlFor="phone">Phone *</label>
          <div className="flex gap-2">
            {/* Compact flag + dial code display; the real <select> sits invisibly on top */}
            <div className="relative flex w-[112px] shrink-0 items-center gap-1.5 overflow-hidden rounded-xl border border-ink-200 bg-white px-3 text-[15px] font-normal focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-500/15">
              <span aria-hidden className="text-lg leading-none">{selected.flag}</span>
              <span aria-hidden className="tabular-nums">{selected.dial}</span>
              <span aria-hidden className="ml-auto text-xs text-ink-400">▾</span>
              <select
                name="country"
                aria-label="Country calling code"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value as CountryCode);
                  setPhoneError("");
                }}
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
              >
                <optgroup label="Suggested">
                  {countries.priority.map((o) => (
                    <option key={o.code} value={o.code}>
                      {o.flag} {o.name} ({o.dial})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="All countries">
                  {countries.rest.map((o) => (
                    <option key={o.code} value={o.code}>
                      {o.flag} {o.name} ({o.dial})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel-national"
              inputMode="tel"
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "phone-error" : undefined}
              onChange={() => phoneError && setPhoneError("")}
              className={cn(input, phoneError && "border-red-500 focus:border-red-500 focus:ring-red-500/15")}
              placeholder={country === "PK" ? "301 6475925" : "Phone number"}
            />
          </div>
          {phoneError && (
            <p id="phone-error" role="alert" className="text-[13px] font-medium text-red-600">
              {phoneError}
            </p>
          )}
        </div>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Company
          <input name="company" autoComplete="organization" className={input} placeholder="Optional" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        {inquiry === "careers" ? "Tell us about you *" : "About your product *"}
        <textarea
          name="message"
          required
          rows={4}
          className={cn(input, "resize-y")}
          placeholder={
            inquiry === "careers" ? "Your role, experience and a link to your CV or portfolio" : "What are you building, and where are you stuck?"
          }
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-2.5 rounded-full bg-teal-500 px-7 py-4 font-bold text-ink-900 transition-colors hover:bg-teal-400"
        >
          Send message
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
        <AnimatePresence>
          {sent && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="text-sm text-teal-800"
            >
              Your email app should open with the message ready. Prefer to write directly?{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline">
                {site.email}
              </a>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function FormFromParams() {
  const p = useSearchParams();
  const defaults: Defaults = {
    inquiry: p.get("inquiry") ?? undefined,
    service: p.get("service") ?? undefined,
    solution: p.get("solution") ?? undefined,
    industry: p.get("industry") ?? undefined,
  };
  // Re-mount when the query changes so pre-selections apply
  return <FormInner key={p.toString()} defaults={defaults} />;
}

/**
 * Contact form. Pre-fills from ?inquiry=&service=&solution=&industry=.
 * Opens the visitor's email client with a pre-filled message (no backend yet;
 * see PROVIDE.md for switching to Resend).
 */
export function ContactForm({ defaults = {} }: { defaults?: Defaults }) {
  return (
    <Suspense fallback={<FormInner defaults={defaults} />}>
      <FormFromParams />
    </Suspense>
  );
}
