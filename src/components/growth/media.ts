import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/image";
import type { Ad } from "./types";

/** 9:16 poster URL for a CMS ad, or null. Plain module so server code (metadata, JSON-LD) can use it too. */
export const posterUrl = (ad: Ad, width = 720) =>
  ad.poster?.asset?.url ? urlFor(ad.poster as SanityImageSource).width(width).height(Math.round((width * 16) / 9)).fit("crop").url() : null;
