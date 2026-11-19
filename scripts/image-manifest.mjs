// Generates src/data/image-manifest.json with intrinsic sizes for every
// raster in public/images, so next/image can render without layout shift.
// Run after adding or replacing images:  npm run images:manifest
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = "public";
const out = {};
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(webp|png|jpe?g|avif)$/i.test(f)) out["/" + relative(root, p).split(sep).join("/")] = p;
  }
};
walk(join(root, "images"));
const manifest = {};
for (const [url, p] of Object.entries(out).sort()) {
  const m = await sharp(p).metadata();
  manifest[url] = [m.width, m.height];
}
writeFileSync("src/data/image-manifest.json", JSON.stringify(manifest, null, 0).replace(/\],/g, "],\n") + "\n");
console.log(`image-manifest: ${Object.keys(manifest).length} images`);
