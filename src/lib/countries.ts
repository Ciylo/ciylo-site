import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";

export type CountryOption = { code: CountryCode; name: string; dial: string; flag: string };

/** Pakistan first, then Ciylo's client countries; everyone else follows alphabetically. */
const PRIORITY: CountryCode[] = ["PK", "US", "GB", "DE", "FR", "MT", "NG", "SA", "AE"];

const flag = (code: string) =>
  String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

let cache: { priority: CountryOption[]; rest: CountryOption[] } | null = null;

/**
 * Every country and territory with a calling code (about 245), from Google's
 * libphonenumber metadata. Names come from the platform's Intl data.
 */
export function countryOptions() {
  if (cache) return cache;
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  const all: CountryOption[] = getCountries().map((code) => ({
    code,
    name: names.of(code) ?? code,
    dial: `+${getCountryCallingCode(code)}`,
    flag: flag(code),
  }));
  const byCode = new Map(all.map((c) => [c.code, c]));
  const priority = PRIORITY.map((c) => byCode.get(c)).filter((c): c is CountryOption => !!c);
  const rest = all.filter((c) => !PRIORITY.includes(c.code)).sort((a, b) => a.name.localeCompare(b.name, "en"));
  cache = { priority, rest };
  return cache;
}
