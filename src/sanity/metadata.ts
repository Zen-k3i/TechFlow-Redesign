import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";

type Translation = { language: string | null; slug: string | null };

/** Canonical and hreflang links for a CMS document, using its linked translations. */
export function cmsAlternates(key: RouteKey, lang: Locale, slug: string, translations: Translation[] | null): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const t of translations ?? []) {
    if (t.language && t.slug && hasLocale(t.language)) languages[t.language] = href(t.language, key, t.slug);
  }
  languages[lang] = href(lang, key, slug);
  if (languages.fr) languages["x-default"] = languages.fr;
  return { canonical: href(lang, key, slug), languages };
}
