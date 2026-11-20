import manifest from "@/data/image-manifest.json";

const sizes = manifest as unknown as Record<string, [number, number, string?]>;

/** Intrinsic width/height (and placeholder colour) for a file in /public/images (see scripts/image-manifest.mjs). */
export function dims(src: string): { width: number; height: number; color?: string } {
  const d = sizes[src];
  if (!d) {
    if (process.env.NODE_ENV !== "production") console.warn(`[images] missing from manifest: ${src}`);
    return { width: 1600, height: 1200 };
  }
  return { width: d[0], height: d[1], color: d[2] };
}
