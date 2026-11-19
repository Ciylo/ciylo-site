import countryNames from "@/data/country-names.json";
import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";

export type CountryOption = { code: CountryCode; name: string; dial: string; flag: string };

/** Pakistan first, then Ciylo's client countries; everyone else follows alphabetically. */
const PRIORITY: CountryCode[] = ["PK", "US", "GB", "DE", "FR", "MT", "NG", "SA", "AE"];

const flag = (code: string) =>
  String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

/** ICU-independent sort key (localeCompare differs between Node and browsers) */
const sortKey = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

let cache:{ priority: CountryOption[]; rest: CountryOption[] } | null = null;

/**
 * Every country and territory with a calling code (about 245), from Google's
 * libphonenumber metadata. Names are baked into src/data/country-names.json (npm run countries).
 */
export function countryOptions() {
  if (cache) return cache;
  const all: CountryOption[] = getCountries().map((code) => ({
    code,
    name: (countryNames as Record<string, string>)[code] ?? code,
    dial: `+${getCountryCallingCode(code)}`,
    flag: flag(code),
  }));
  const byCode = new Map(all.map((c) => [c.code, c]));
  const priority = PRIORITY.map((c) => byCode.get(c)).filter((c): c is CountryOption => !!c);
  const rest = all.filter((c) => !PRIORITY.includes(c.code)).sort((a, b) => (sortKey(a.name) < sortKey(b.name) ? -1 : 1));
  cache = { priority, rest };
  return cache;
}
