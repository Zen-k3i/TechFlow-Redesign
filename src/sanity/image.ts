import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { ImageLoader } from "next/image";
import { dataset, projectId } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format");

/**
 * next/image loader that lets the Sanity CDN resize each srcset width, instead of
 * Next downloading the image and re-encoding it on our server.
 */
export const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
};
