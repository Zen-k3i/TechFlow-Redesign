import type { MetadataRoute } from "next";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import { absoluteUrl, href, routes, type RouteKey } from "@/i18n/routes";
import { sanityFetch } from "@/sanity/client";
import { translationLinks } from "@/sanity/metadata";
import { REDIRECTS_QUERY, SITEMAP_PAGES_QUERY, SITEMAP_QUERY } from "@/sanity/queries";

const cmsRoute: Record<"project" | "growthCaseStudy" | "tool" | "insight", RouteKey> = { project: "projects", growthCaseStudy: "projects", tool: "tools", insight: "insights" };

/** hreflang alternates, with x-default on the French version. */
function alternates(links: Partial<Record<Locale, string>>) {
  const languages: Record<string, string> = {};
  for (const [lang, path] of Object.entries(links)) if (path) languages[lang] = absoluteUrl(path);
  if (languages.fr) languages["x-default"] = languages.fr;
  return { languages };
}

/**
 * Every indexable page in both languages, from the routes and Sanity. Pages hidden from Google
 * in the Studio, pages with a canonical elsewhere and redirect sources are left out.
 * Regenerated at most once a minute, like the pages (`sanityFetch` revalidate).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [docs, pageSeo, redirects] = await Promise.all([sanityFetch(SITEMAP_QUERY), sanityFetch(SITEMAP_PAGES_QUERY), sanityFetch(REDIRECTS_QUERY)]);
  const redirected = new Set(redirects.map((r) => r.source));
  const seoOf = (key: RouteKey, lang: Locale) => pageSeo.find((p) => p.page === key && p.language === lang);

  const pages = (Object.keys(routes) as RouteKey[]).flatMap((key) =>
    locales.flatMap((lang) =>
      seoOf(key, lang)?.hidden || redirected.has(href(lang, key))
        ? []
        : [
            {
              url: absoluteUrl(href(lang, key)),
              lastModified: seoOf(key, lang)?._updatedAt,
              changeFrequency: "monthly" as const,
              priority: key === "home" ? 1 : key === "legal" || key === "terms" || key === "privacy" ? 0.3 : 0.8,
              alternates: alternates({ fr: href("fr", key), en: href("en", key) }),
            },
          ],
    ),
  );

  const cms = docs.flatMap((doc) => {
    if (!doc.slug || !doc.language || !hasLocale(doc.language)) return [];
    const key = cmsRoute[doc._type];
    const path = href(doc.language, key, doc.slug);
    if (redirected.has(path)) return [];
    return [
      {
        url: absoluteUrl(path),
        lastModified: doc._updatedAt,
        changeFrequency: "yearly" as const,
        priority: doc._type === "tool" ? 0.5 : 0.6,
        alternates: alternates(translationLinks(key, doc.language, doc.slug, doc.translations)),
      },
    ];
  });

  return [...pages, ...cms];
}
