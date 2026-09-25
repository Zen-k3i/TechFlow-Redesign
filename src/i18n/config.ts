export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** French lives at the root, other locales under their own prefix. */
export const localePath = (lang: Locale, path = "/") =>
  lang === defaultLocale ? path : `/${lang}${path === "/" ? "" : path}`;
