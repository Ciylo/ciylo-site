// Bakes English country names into src/data/country-names.json so the server
// and every browser render identical text (Intl data differs between Node and
// browser ICU versions, which caused hydration mismatches).   npm run countries
import { getCountries } from "libphonenumber-js/min";
import { writeFileSync } from "node:fs";

const names = new Intl.DisplayNames(["en"], { type: "region" });
const fix = { FK: "Falkland Islands", MM: "Myanmar", CI: "Côte d’Ivoire", PS: "Palestine", HK: "Hong Kong", MO: "Macao" };
const out = Object.fromEntries(getCountries().map((c) => [c, fix[c] ?? (names.of(c) ?? c).replace(/ SAR China$/, "")]));
writeFileSync("src/data/country-names.json", JSON.stringify(out, null, 0) + "\n");
console.log(`countries: ${Object.keys(out).length}`);
