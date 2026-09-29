import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";

type Translation = { language: string | null; slug: string | null };

/** URL of each locale's version of a CMS document; locales without a translation are left out. */
export function translationLinks(key: RouteKey, lang: Locale, slug: string, translations: Translation[] | null) {
  const links: Partial<Record<Locale, string>> = {};
  for (const t of translations ?? []) {
    if (t.language && t.slug && hasLocale(t.language)) links[t.language] = href(t.language, key, t.slug);
  }
  links[lang] = href(lang, key, slug);
  return links;
}

/** Canonical and hreflang links for a CMS document, using its linked translations. */
export function cmsAlternates(key: RouteKey, lang: Locale, slug: string, translations: Translation[] | null): Metadata["alternates"] {
  const languages: Record<string, string> = { ...translationLinks(key, lang, slug, translations) };
  if (languages.fr) languages["x-default"] = languages.fr;
  return { canonical: href(lang, key, slug), languages };
}
