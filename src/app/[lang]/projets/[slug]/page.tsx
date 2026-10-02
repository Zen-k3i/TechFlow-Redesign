import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsCaseStudyPage } from "@/components/case-study/cms-case-study-page";
import { GrowthCaseStudyPage } from "@/components/growth/case-study-page";
import { posterUrl } from "@/components/growth/media";
import type { GrowthStudy } from "@/components/growth/types";
import { PageShell } from "@/components/page/shell";
import { hasLocale, type Locale } from "@/i18n/config";
import { href, siteUrl } from "@/i18n/routes";
import { client } from "@/sanity/client";
import { getGrowthCaseStudy, getProject, isSlug, redirectToTranslation } from "@/sanity/fetch";
import { translationLinks } from "@/sanity/metadata";
import { buildMetadata } from "@/sanity/seo";
import { urlFor } from "@/sanity/image";
import { caseStudyJsonLd, JsonLd, ORGANIZATION_ID } from "@/components/seo/json-ld";
import { GROWTH_SLUGS_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const cdnless = client.withConfig({ useCdn: false });
  const [projects, growth] = await Promise.all([
    cdnless.fetch(PROJECT_SLUGS_QUERY, { lang: params.lang }),
    cdnless.fetch(GROWTH_SLUGS_QUERY, { lang: params.lang }),
  ]);
  return [...projects, ...growth].flatMap((slug) => (slug ? [{ slug }] : []));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projets/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) return {};

  // Share image fallbacks: website projects use their card image; growth case studies their key visual, else the first ad's poster.
  const growth = await getGrowthCaseStudy(lang, slug);
  const doc = growth ?? (await getProject(lang, slug));
  if (!doc) return {};
  const caseStudy = growth
    ? lang === "fr" ? `${doc.title} : étude de cas growth marketing` : `${doc.title}: growth marketing case study`
    : lang === "fr" ? `${doc.title} : étude de cas` : `${doc.title} case study`;
  return buildMetadata({
    lang,
    path: href(lang, "projects", slug),
    languages: translationLinks("projects", lang, slug, doc.translations),
    seo: doc.seo,
    title: caseStudy,
    description: doc.summary,
    image: growth ? (growth.heroImage?.asset ? growth.heroImage : growth.ads?.find((a) => a.poster?.asset?.url)?.poster) : "coverImage" in doc ? doc.coverImage : undefined,
    type: "article",
    modifiedTime: doc._updatedAt,
  });
}

/** "0:58" → "PT0M58S" for VideoObject.duration. */
const isoDuration = (d: string | null) => {
  const m = d?.match(/^(\d+):(\d{2})$/);
  return m ? `PT${Number(m[1])}M${Number(m[2])}S` : undefined;
};

/** CreativeWork with the ads as VideoObjects, for search engines. */
function growthJsonLd(study: GrowthStudy, lang: Locale, slug: string) {
  const url = `${siteUrl}${href(lang, "projects", slug)}`;
  const videos = (study.ads ?? []).flatMap((ad) =>
    ad.video
      ? [
          {
            "@type": "VideoObject",
            name: `${study.title} · ${ad.angle}`,
            description: ad.caption ?? ad.hook ?? ad.angle,
            contentUrl: ad.video,
            thumbnailUrl: posterUrl(ad, 720) ?? undefined,
            uploadDate: study._updatedAt,
            duration: isoDuration(ad.duration),
          },
        ]
      : [],
  );
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${study.title}${study.hero?.headline ? ` · ${study.hero.headline}` : ""}`,
    description: study.summary ?? undefined,
    url,
    inLanguage: lang,
    dateModified: study._updatedAt,
    genre: "Growth marketing case study",
    keywords: [...(study.sectors ?? []), ...(study.services ?? [])].join(", ") || undefined,
    about: { "@type": "Organization", name: study.title },
    creator: { "@id": ORGANIZATION_ID, "@type": "Organization", name: "TechFlow Agency", url: siteUrl },
    ...(videos.length ? { video: videos } : {}),
  };
}

export default async function CaseStudy({ params }: PageProps<"/[lang]/projets/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) notFound();

  const growth = await getGrowthCaseStudy(lang, slug);
  if (growth) {
    return (
      // Ends like every case study: related projects, then the footer's "Un projet en tête ?" call to action.
      <PageShell lang={lang} current="projects" alternates={translationLinks("projects", lang, slug, growth.translations)} breadcrumb={{ name: growth.title ?? slug, slug }}>
        <JsonLd data={growthJsonLd(growth, lang, slug)} />
        <GrowthCaseStudyPage study={growth} />
      </PageShell>
    );
  }

  const study = await getProject(lang, slug);
  if (!study) {
    await redirectToTranslation("project", lang, slug);
    await redirectToTranslation("growthCaseStudy", lang, slug);
    notFound();
  }

  return (
    <PageShell lang={lang} current="projects" alternates={translationLinks("projects", lang, slug, study.translations)} breadcrumb={{ name: study.title ?? slug, slug }}>
      <JsonLd data={caseStudyJsonLd(study, lang, slug, study.coverImage?.asset ? urlFor(study.coverImage).width(1200).url() : undefined)} />
      <CmsCaseStudyPage study={study} />
    </PageShell>
  );
}
