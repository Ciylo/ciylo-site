export type ContactDefaults = { inquiry?: string; service?: string; solution?: string; industry?: string };

/** Link that opens the contact form with fields pre-selected. */
export function contactHref(d: ContactDefaults) {
  const p = new URLSearchParams();
  Object.entries(d).forEach(([k, v]) => v && p.set(k, v));
  const qs = p.toString();
  return `/contact${qs ? `?${qs}` : ""}#form`;
}
