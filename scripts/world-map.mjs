// Generates the dotted world map used in "Clients in".
//   public/images/world-dots.svg  (static, cached by the CDN)
//   src/data/map-pins.json        (pin positions as % of the map, for animated overlays)
// Run after changing clientCountries in src/data/site.ts:  npm run map
import DottedMapModule from "dotted-map";
import { writeFileSync, readFileSync } from "node:fs";

const DottedMap = DottedMapModule.default ?? DottedMapModule;

// Keep in sync with clientCountries in src/data/site.ts (capital coordinates)
const src = readFileSync("src/data/site.ts", "utf8");
const block = src.slice(src.indexOf("export const clientCountries"), src.indexOf("] as const;", src.indexOf("export const clientCountries")));
const countries = [...block.matchAll(/name: "([^"]+)", code: "([A-Z]+)", lat: (-?[\d.]+), lng: (-?[\d.]+)/g)].map((m) => ({
  name: m[1],
  code: m[2],
  lat: +m[3],
  lng: +m[4],
}));

const map = new DottedMap({ height: 64, grid: "diagonal" });
const svg = map.getSVG({ radius: 0.24, color: "#c9c9d1", shape: "circle", backgroundColor: "transparent" });
// Compact: one <g> with shared fill/radius, circles carry only cx/cy
const dots = [...svg.matchAll(/cx="([\d.]+)" cy="([\d.]+)"/g)].map((m) => `<circle cx="${m[1]}" cy="${m[2]}" r=".24"/>`).join("");
const vbox = svg.match(/viewBox="[^"]+"/)[0];
writeFileSync("public/images/world-dots.svg", `<svg xmlns="http://www.w3.org/2000/svg" ${vbox}><g fill="#c9c9d1">${dots}</g></svg>`);

const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
const [w, h] = [+vb[1], +vb[2]];
const pins = countries.map((c) => {
  const p = map.getPin({ lat: c.lat, lng: c.lng });
  return { ...c, x: +((p.x / w) * 100).toFixed(2), y: +((p.y / h) * 100).toFixed(2) };
});
writeFileSync("src/data/map-pins.json", JSON.stringify({ width: w, height: h, pins, lahore: (() => {
  const p = map.getPin({ lat: 31.52, lng: 74.36 });
  return { x: +((p.x / w) * 100).toFixed(2), y: +((p.y / h) * 100).toFixed(2) };
})() }, null, 2) + "\n");
console.log(`world-map: ${w}x${h}, ${pins.length} pins, file written`);
