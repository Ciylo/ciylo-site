import manifest from "@/data/image-manifest.json";

const sizes = manifest as unknown as Record<string, [number, number]>;

/** Intrinsic width/height for a file in /public/images (see scripts/image-manifest.mjs). */
export function dims(src: string): { width: number; height: number } {
  const d = sizes[src];
  if (!d) {
    if (process.env.NODE_ENV !== "production") console.warn(`[images] missing from manifest: ${src}`);
    return { width: 1600, height: 1200 };
  }
  return { width: d[0], height: d[1] };
}
