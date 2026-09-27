import type { Metadata } from "next";
import { localePath, type Locale } from "./config";

export const siteUrl = "https://www.techflow-agency.com";

/** Public slug of every page, per locale. Folders under `app/[lang]` use the French slug. */
export const routes = {
  home: { fr: "/", en: "/" },
  services: { fr: "/services", en: "/services" },
  design: { fr: "/design", en: "/design" },
  development: { fr: "/developpement", en: "/development" },
  aiAgents: { fr: "/agents-ia", en: "/ai-agents" },
  salesFunnel: { fr: "/tunnel-de-vente", en: "/sales-funnel" },
  projects: { fr: "/projets", en: "/projects" },
  team: { fr: "/notre-equipe", en: "/our-team" },
  insights: { fr: "/nos-insights", en: "/our-insights" },
  contact: { fr: "/contact", en: "/contact" },
  legal: { fr: "/mentions-legales", en: "/legal-notices" },
  terms: { fr: "/conditions-generales", en: "/terms-of-service" },
} satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export const serviceKeys = ["design", "development", "aiAgents", "salesFunnel"] as const satisfies RouteKey[];
export type ServiceKey = (typeof serviceKeys)[number];

export const isServiceKey = (key: RouteKey | undefined): key is ServiceKey =>
  (serviceKeys as readonly string[]).includes(key ?? "");

export const href = (lang: Locale, key: RouteKey, child?: string) =>
  localePath(lang, `${routes[key][lang]}${child ? `${routes[key][lang] === "/" ? "" : "/"}${child}` : ""}`);

/** English first segment → French folder segment, for slugs that differ between locales. */
export const englishAliases = Object.fromEntries(
  Object.values(routes)
    .filter((r) => r.en !== r.fr)
    .map((r) => [r.en.slice(1), r.fr.slice(1)]),
);

export function pageMetadata(
  lang: Locale,
  key: RouteKey,
  meta: { title: string; description: string },
  child?: string,
): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: href(lang, key, child),
      languages: { fr: href("fr", key, child), en: href("en", key, child), "x-default": href("fr", key, child) },
    },
  };
}
