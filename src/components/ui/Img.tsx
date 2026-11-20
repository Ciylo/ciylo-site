import Image, { type ImageProps } from "next/image";
import { dims } from "@/lib/images";

/**
 * next/image with the intrinsic size looked up from the image manifest.
 * Opaque photos paint their dominant colour first, so layouts never flash empty.
 */
export function Img({ src, alt, style, ...rest }: Omit<ImageProps, "src" | "width" | "height"> & { src: string }) {
  const { width, height, color: c } = dims(src);
  // Only cropped photos: a contained image would show the colour as a frame around it
  const color = typeof rest.className === "string" && rest.className.includes("object-cover") ? c : undefined;
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={color ? { backgroundColor: color, ...style } : style}
      {...rest}
    />
  );
}
