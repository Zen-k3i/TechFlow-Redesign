"use client";

import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityLoader, urlFor } from "@/sanity/image";

export type CmsImage = {
  alt?: string | null;
  asset?: { _id: string; url: string | null; metadata?: { lqip?: string | null; dimensions?: { width?: number | null; height?: number | null } | null } | null } | null;
} | null;

type Props = {
  image: CmsImage | undefined;
  alt?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Width requested from the Sanity CDN; next/image picks the rendered size from `sizes`. */
  width?: number;
} & ({ fill: true } | { fill?: false });

/** next/image for a Sanity image asset, filling its parent or at intrinsic size. */
export function SanityImage({ image, alt, sizes, className, priority, width = 1600, fill }: Props) {
  if (!image?.asset?.url) return null;
  const dims = image.asset.metadata?.dimensions;
  const lqip = image.asset.metadata?.lqip ?? undefined;
  const src = urlFor(image as SanityImageSource).width(width).url();
  const common = {
    src,
    loader: sanityLoader,
    alt: alt ?? image.alt ?? "",
    sizes,
    className,
    preload: priority,
    placeholder: lqip ? ("blur" as const) : ("empty" as const),
    blurDataURL: lqip,
  };
  if (fill) return <Image {...common} alt={common.alt} fill />;
  return <Image {...common} alt={common.alt} width={dims?.width ?? width} height={dims?.height ?? Math.round(width / 1.5)} />;
}
