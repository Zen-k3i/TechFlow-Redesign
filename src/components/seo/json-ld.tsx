import type { Locale } from "@/i18n/config";
import { absoluteUrl, href, siteUrl, type RouteKey } from "@/i18n/routes";
import type { SiteSettings } from "@/sanity/seo";

type Thing = Record<string, unknown>;

/** Structured data for search engines; `<` is escaped so content can't close the script tag. */
export function JsonLd({ data }: { data: Thing }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const ORGANIZATION_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;

/** Organization, its offices (ProfessionalService) and the WebSite, from Site settings. Home page only. */
export function organizationJsonLd(settings: SiteSettings | null, lang: Locale): Thing {
  const org = settings?.organization;
  const name = org?.name || "TechFlow Agency";
  const offices = (org?.locations ?? []).map((office, i) => ({
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#office-${i + 1}`,
    name: office.name || name,
    parentOrganization: { "@id": ORGANIZATION_ID },
    url: absoluteUrl(href(lang, "home")),
    image: org?.logo ?? undefined,
    telephone: office.phone ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.street ?? undefined,
      postalCode: office.postalCode ?? undefined,
      addressLocality: office.city ?? undefined,
      addressCountry: office.country ?? undefined,
    },
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name,
        legalName: org?.legalName ?? undefined,
        url: `${siteUrl}/`,
        logo: org?.logo ?? undefined,
        description: org?.description ?? undefined,
        email: org?.email ?? undefined,
        knowsLanguage: ["fr", "en", "km"],
        sameAs: org?.sameAs?.length ? org.sameAs : undefined,
        location: offices.map((o) => ({ "@id": o["@id"] })),
      },
      ...offices,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${siteUrl}/`,
        name: settings?.siteName || name,
        inLanguage: ["fr", "en"],
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

/** Breadcrumb section names, per locale. */
const SECTION: Record<Exclude<RouteKey, "home">, Record<Locale, string>> = {
  services: { fr: "Services", en: "Services" },
  design: { fr: "Design", en: "Design" },
  development: { fr: "Développement", en: "Development" },
  aiAgents: { fr: "Agents IA", en: "AI agents" },
  salesFunnel: { fr: "Tunnel de vente", en: "Sales funnel" },
  projects: { fr: "Projets", en: "Projects" },
  tools: { fr: "Outils", en: "Tools" },
  team: { fr: "Notre équipe", en: "Our team" },
  insights: { fr: "Insights", en: "Insights" },
  contact: { fr: "Contact", en: "Contact" },
  legal: { fr: "Mentions légales", en: "Legal notices" },
  terms: { fr: "Conditions générales", en: "Terms of service" },
  cookies: { fr: "Politique de cookies", en: "Cookie policy" },
};

/** Home › section › (page), e.g. Accueil › Projets › Leapmotor. */
export function breadcrumbJsonLd(lang: Locale, section: Exclude<RouteKey, "home">, page?: { name: string; slug: string }): Thing {
  const items = [
    { name: lang === "fr" ? "Accueil" : "Home", url: absoluteUrl(href(lang, "home")) },
    { name: SECTION[section][lang], url: absoluteUrl(href(lang, section)) },
    ...(page ? [{ name: page.name, url: absoluteUrl(href(lang, section, page.slug)) }] : []),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}

/** A website case study. */
export function caseStudyJsonLd(
  study: { title: string | null; summary: string | null; _updatedAt: string; sectors: string[] | null; services: string[] | null },
  lang: Locale,
  slug: string,
  image?: string,
): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title ?? undefined,
    description: study.summary ?? undefined,
    url: absoluteUrl(href(lang, "projects", slug)),
    image,
    inLanguage: lang,
    dateModified: study._updatedAt,
    genre: lang === "fr" ? "Étude de cas" : "Case study",
    keywords: [...(study.sectors ?? []), ...(study.services ?? [])].join(", ") || undefined,
    about: study.title ? { "@type": "Organization", name: study.title } : undefined,
    creator: { "@id": ORGANIZATION_ID, "@type": "Organization", name: "TechFlow Agency", url: siteUrl },
  };
}

/** An insights article; the author is the team member, else the agency. */
export function articleJsonLd(
  article: { title: string | null; excerpt: string | null; publishedAt: string | null; _updatedAt: string; author: { name: string | null; linkedin: string | null } | null },
  lang: Locale,
  slug: string,
  image?: string,
): Thing {
  const agency = { "@type": "Organization", "@id": ORGANIZATION_ID, name: "TechFlow Agency", url: siteUrl };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title ?? undefined,
    description: article.excerpt ?? undefined,
    image,
    inLanguage: lang,
    datePublished: article.publishedAt ?? undefined,
    dateModified: article._updatedAt,
    mainEntityOfPage: absoluteUrl(href(lang, "insights", slug)),
    author: article.author?.name
      ? { "@type": "Person", name: article.author.name, url: article.author.linkedin ?? undefined }
      : agency,
    publisher: agency,
  };
}
