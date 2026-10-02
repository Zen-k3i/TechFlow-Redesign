import type { Metadata } from "next";
import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import type { PAGE_SEO_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { defaultLocale, type Locale } from "@/i18n/config";
import { absoluteUrl, href, type RouteKey } from "@/i18n/routes";
import { sanityFetch } from "./client";
import { urlFor } from "./image";
import { PAGE_SEO_QUERY, SITE_SETTINGS_QUERY } from "./queries";

export type Seo = NonNullable<PAGE_SEO_QUERY_RESULT>["seo"];
export type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;

// Deduped per request, like the page fetches.
export const getSiteSettings = cache(() => sanityFetch(SITE_SETTINGS_QUERY));
const getPageSeo = cache((page: RouteKey, lang: Locale) => sanityFetch(PAGE_SEO_QUERY, { page, lang }));

const SITE_NAME = "TechFlow";
const TITLE_TEMPLATE = "%s | TechFlow";
/** Used when no page image, no Studio default and no SEO image exist. */
const FALLBACK_IMAGE = "/images/og-default.jpg";

/** Google shows about 60 characters of a title. */
const TITLE_MAX = 60;

/**
 * Adds the site template ("%s | TechFlow") unless the title already names the site, or the
 * suffix would push it past what Google shows (the page's own words matter more).
 */
export function withTemplate(title: string, settings: SiteSettings | null) {
  const siteName = settings?.siteName || SITE_NAME;
  const template = settings?.titleTemplate || TITLE_TEMPLATE;
  if (!template.includes("%s") || title.toLowerCase().includes(siteName.toLowerCase())) return title;
  const full = template.replace("%s", title);
  return full.length > TITLE_MAX ? title : full;
}


const shareImage = (image: SanityImageSource) => urlFor(image).width(1200).height(630).fit("crop").url();
const hasAsset = (image: unknown): image is SanityImageSource =>
  Boolean(image && typeof image === "object" && "asset" in image && (image as { asset?: { url?: string } }).asset?.url);

type MetadataInput = {
  lang: Locale;
  /** The page's own path (default canonical). */
  path: string;
  /** Path of each language version, for hreflang. */
  languages: Partial<Record<Locale, string>>;
  /** The document's SEO tab, if any. */
  seo?: Seo | null;
  /** Fallbacks taken from the page content. */
  title: string;
  description?: string | null;
  image?: unknown;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
};

/**
 * Metadata of every page. Each value comes from the SEO tab when filled, else from the page
 * content, else from Site settings: no page ships without a title, description or share image.
 */
export async function buildMetadata(input: MetadataInput): Promise<Metadata> {
  const settings = await getSiteSettings();
  const { lang, seo } = input;

  const title = withTemplate(seo?.title || input.title, settings);
  const description =
    seo?.description || input.description || (lang === "en" ? settings?.defaultDescriptionEn : settings?.defaultDescriptionFr) || undefined;
  const customSocial = seo?.ogSameAsMeta === false;
  const ogTitle = (customSocial && seo?.ogTitle) || title;
  const ogDescription = (customSocial && seo?.ogDescription) || description;

  const imageSource = [seo?.image, input.image, settings?.defaultOgImage].find(hasAsset);
  const image = imageSource ? shareImage(imageSource) : FALLBACK_IMAGE;

  const canonical = seo?.canonicalUrl || absoluteUrl(input.path);
  const languages: Record<string, string> = {};
  for (const [locale, path] of Object.entries(input.languages)) if (path) languages[locale] = absoluteUrl(path);
  if (languages[defaultLocale]) languages["x-default"] = languages[defaultLocale];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical, languages },
    robots: seo?.noIndex || seo?.noFollow ? { index: !seo?.noIndex, follow: !seo?.noFollow } : undefined,
    openGraph: {
      type: input.type ?? "website",
      url: canonical,
      siteName: settings?.siteName || SITE_NAME,
      locale: lang === "en" ? "en_US" : "fr_FR",
      alternateLocale: Object.keys(input.languages).filter((l) => l !== lang).map((l) => (l === "en" ? "en_US" : "fr_FR")),
      title: ogTitle,
      description: ogDescription,
      images: [{ url: image, width: 1200, height: 630, alt: ogTitle }],
      ...(input.type === "article" ? { publishedTime: input.publishedTime ?? undefined, modifiedTime: input.modifiedTime ?? undefined } : {}),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [image] },
  };
}

/**
 * Metadata of a coded page (home, services, listings, legal): its "Page SEO" document in the
 * Studio, else the copy in code.
 */
export async function staticPageMetadata(lang: Locale, key: RouteKey, meta: { title: string; description: string }) {
  const page = await getPageSeo(key, lang);
  return buildMetadata({
    lang,
    path: href(lang, key),
    languages: { fr: href("fr", key), en: href("en", key) },
    seo: page?.seo,
    title: meta.title,
    description: meta.description,
  });
}
