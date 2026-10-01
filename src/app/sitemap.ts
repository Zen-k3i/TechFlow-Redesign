import type { MetadataRoute } from "next";
import { growthCaseStudies } from "@/components/growth/data";
import { hasLocale } from "@/i18n/config";
import { href, routes, siteUrl, type RouteKey } from "@/i18n/routes";
import { sanityFetch } from "@/sanity/client";
import { SITEMAP_QUERY } from "@/sanity/queries";

const url = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

const cmsRoute: Record<"project" | "tool" | "insight", RouteKey> = { project: "projects", tool: "tools", insight: "insights" };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = (Object.keys(routes) as RouteKey[]).map((key) => ({
    url: url(href("fr", key)),
    changeFrequency: "monthly" as const,
    priority: key === "home" ? 1 : key === "legal" || key === "terms" || key === "cookies" ? 0.3 : 0.8,
    alternates: { languages: { fr: url(href("fr", key)), en: url(href("en", key)) } },
  }));

  const growth = growthCaseStudies.map((c) => ({
    url: url(href("fr", "projects", c.slug)),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const cms = (await sanityFetch(SITEMAP_QUERY)).flatMap((doc) =>
    doc.slug && doc.language && hasLocale(doc.language)
      ? [
          {
            url: url(href(doc.language, cmsRoute[doc._type], doc.slug)),
            lastModified: doc._updatedAt,
            changeFrequency: "yearly" as const,
            priority: doc._type === "tool" ? 0.5 : 0.6,
          },
        ]
      : [],
  );

  return [...pages, ...growth, ...cms];
}
