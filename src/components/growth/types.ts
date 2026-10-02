import type { GROWTH_CASE_STUDY_QUERY_RESULT } from "@/sanity.types";

export type GrowthStudy = NonNullable<GROWTH_CASE_STUDY_QUERY_RESULT>;
export type Ad = NonNullable<GrowthStudy["ads"]>[number];
export type Platform = "instagram" | "facebook" | "tiktok";

export const PLATFORMS: Platform[] = ["instagram", "facebook", "tiktok"];

export const asPlatform = (value: string | null | undefined): Platform =>
  PLATFORMS.includes(value as Platform) ? (value as Platform) : "instagram";

/** Placeholders ("[TBD]") are kept in Sanity until real figures exist, and never shown on the site. */
export const isReal = (value: string | null | undefined): value is string => Boolean(value?.trim()) && !/TBD/i.test(value ?? "");

/** Section ids the hero links to. */
export const SECTION_IDS = { ads: "publicites" } as const;

/** Who sees the ad: the brand's name and avatar on the overlays. */
export type Brand = { name: string; handle: string; logo: string | null; accent: string };
