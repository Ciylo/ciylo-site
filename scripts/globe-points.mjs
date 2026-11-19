// Generates land dots for the 3D client globe (public/data/globe.json).
// dotted-map only exposes projected x/y for land dots, so we sweep a lat/lng grid,
// snap each sample to its nearest dot with getPin (which reports that dot's lat/lng)
// and keep the ones that are land. Packed as a flat [lat, lng, ...] array.
//   npm run globe
import DottedMapModule from "dotted-map";
import { writeFileSync } from "node:fs";

const DottedMap = DottedMapModule.default ?? DottedMapModule;
const map = new DottedMap({ height: 76, grid: "diagonal" });
const land = new Set(map.getPoints().map((p) => `${p.x},${p.y}`));
const seen = new Map();
for (let lat = -58; lat <= 80; lat += 0.6) {
  for (let lng = -180; lng < 180; lng += 0.6) {
    const p = map.getPin({ lat, lng });
    const k = `${p.x},${p.y}`;
    if (land.has(k) && !seen.has(k)) seen.set(k, [+p.lat.toFixed(1), +p.lng.toFixed(1)]);
  }
}
// Equirectangular grids over-sample high latitudes; thin by cos(lat) so density is even on the sphere
let i = 0;
const kept = [...seen.values()].filter(([la]) => (i++ * 0.6180339887) % 1 < Math.cos((la * Math.PI) / 180) + 0.08);
const flat = kept.flat();
writeFileSync("public/data/globe.json", JSON.stringify(flat));
console.log(`globe: ${kept.length} of ${land.size} land points`);
