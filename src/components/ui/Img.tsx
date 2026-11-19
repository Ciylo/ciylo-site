import Image, { type ImageProps } from "next/image";
import { dims } from "@/lib/images";

/** next/image with the intrinsic size looked up from the image manifest. */
export function Img({ src, alt, ...rest }: Omit<ImageProps, "src" | "width" | "height"> & { src: string }) {
  const { width, height } = dims(src);
  return <Image src={src} alt={alt} width={width} height={height} {...rest} />;
}
