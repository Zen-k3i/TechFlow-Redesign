import { permanentRedirect, redirect } from "next/navigation";
import { cache } from "react";
import { hasLocale, type Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";
import { sanityFetch } from "./client";
import { GROWTH_CASE_STUDY_QUERY, INSIGHT_DETAIL_QUERY, PROJECT_DETAIL_QUERY, SLUG_LOOKUP_QUERY, TOOL_DETAIL_QUERY } from "./queries";

/** CMS slugs are lowercase kebab-case; anything else 404s without a Sanity request. */
export const isSlug = (slug: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 96;

// Deduped per request, so generateMetadata and the page share one fetch.
export const getProject = cache((lang: Locale, slug: string) => sanityFetch(PROJECT_DETAIL_QUERY, { lang, slug }));
export const getGrowthCaseStudy = cache((lang: Locale, slug: string) => sanityFetch(GROWTH_CASE_STUDY_QUERY, { lang, slug }));
export const getTool = cache((lang: Locale, slug: string) => sanityFetch(TOOL_DETAIL_QUERY, { lang, slug }));
export const getInsight = cache((lang: Locale, slug: string) => sanityFetch(INSIGHT_DETAIL_QUERY, { lang, slug }));

const routeKey = { project: "projects", growthCaseStudy: "projects", tool: "tools", insight: "insights" } as const satisfies Record<string, RouteKey>;

/**
 * When a slug belongs to another locale (e.g. an old /en/projects/<french-slug> link),
 * redirects to this locale's translation, or to the original if there is none.
 * Returns normally when no document has that slug.
 */
export async function redirectToTranslation(type: keyof typeof routeKey, lang: Locale, slug: string) {
  const doc = await sanityFetch(SLUG_LOOKUP_QUERY, { type, slug });
  // Same locale means the detail query just missed it (e.g. CDN lag); redirecting would loop.
  if (!doc?.language || !hasLocale(doc.language) || doc.language === lang) return;
  const translated = doc.translations?.find((t) => t.language === lang)?.slug;
  if (translated) permanentRedirect(href(lang, routeKey[type], translated));
  // Temporary: this locale may get its own translation later.
  redirect(href(doc.language, routeKey[type], slug));
}
