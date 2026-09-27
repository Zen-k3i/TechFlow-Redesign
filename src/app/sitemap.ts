import type { MetadataRoute } from "next";
import { caseStudies } from "@/components/case-study/data";
import { growthCaseStudies } from "@/components/growth/data";
import { articles } from "@/components/insights/data";
import { href, routes, siteUrl, type RouteKey } from "@/i18n/routes";

const url = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(routes) as RouteKey[]).map((key) => ({
    url: url(href("fr", key)),
    changeFrequency: "monthly" as const,
    priority: key === "home" ? 1 : key === "legal" || key === "terms" ? 0.3 : 0.8,
    alternates: { languages: { fr: url(href("fr", key)), en: url(href("en", key)) } },
  }));

  const studies = [...growthCaseStudies, ...caseStudies].map((c) => ({
    url: url(href("fr", "projects", c.slug)),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const posts = articles.map((a) => ({
    url: url(href("fr", "insights", a.slug)),
    lastModified: a.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...studies, ...posts];
}
