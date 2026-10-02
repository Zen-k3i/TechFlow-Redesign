import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { CmsCaseStudyPage } from "@/components/case-study/cms-case-study-page";
import { GrowthCaseStudyPage } from "@/components/growth/case-study-page";
import { posterUrl } from "@/components/growth/media";
import type { GrowthStudy } from "@/components/growth/types";
import { PageShell } from "@/components/page/shell";
import { hasLocale, type Locale } from "@/i18n/config";
import { href, siteUrl } from "@/i18n/routes";
import { client } from "@/sanity/client";
import { getGrowthCaseStudy, getProject, isSlug, redirectToTranslation } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import { cmsAlternates, translationLinks } from "@/sanity/metadata";
import { GROWTH_SLUGS_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/queries";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const cdnless = client.withConfig({ useCdn: false });
  const [projects, growth] = await Promise.all([
    cdnless.fetch(PROJECT_SLUGS_QUERY, { lang: params.lang }),
    cdnless.fetch(GROWTH_SLUGS_QUERY, { lang: params.lang }),
  ]);
  return [...projects, ...growth].flatMap((slug) => (slug ? [{ slug }] : []));
}

const plain = (text: string | null | undefined) => text?.replaceAll("*", "") ?? undefined;

/** Social share image: the SEO image, else the key visual, else the first ad's poster. */
function growthShareImage(study: GrowthStudy) {
  const image = [study.seo?.image, study.heroImage, study.ads?.find((a) => a.poster?.asset?.url)?.poster].find((img) => img?.asset?.url);
  return image ? urlFor(image as SanityImageSource).width(1200).height(630).fit("crop").url() : undefined;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projets/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) return {};

  const growth = await getGrowthCaseStudy(lang, slug);
  if (growth) {
    const title = growth.seo?.title ?? `${growth.title} | ${lang === "fr" ? "Étude de cas growth marketing" : "Growth marketing case study"} · TechFlow Agency`;
    const description = growth.seo?.description ?? growth.summary ?? plain(growth.hero?.intro);
    const image = growthShareImage(growth);
    return {
      title,
      description,
      alternates: cmsAlternates("projects", lang, slug, growth.translations),
      openGraph: { title, description, type: "article", url: href(lang, "projects", slug), images: image ? [{ url: image, width: 1200, height: 630 }] : undefined },
    };
  }

  const study = await getProject(lang, slug);
  if (!study) return {};
  return {
    title: study.seo?.title ?? `${study.title} | Case Study · TechFlow Agency`,
    description: study.seo?.description ?? study.summary ?? undefined,
    alternates: cmsAlternates("projects", lang, slug, study.translations),
  };
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
    description: plain(study.hero?.intro),
    url,
    inLanguage: lang,
    dateModified: study._updatedAt,
    genre: "Growth marketing case study",
    keywords: [...(study.sectors ?? []), ...(study.services ?? [])].join(", ") || undefined,
    about: { "@type": "Organization", name: study.title },
    creator: { "@type": "Organization", name: "TechFlow Agency", url: siteUrl },
    ...(videos.length ? { video: videos } : {}),
  };
}

export default async function CaseStudy({ params }: PageProps<"/[lang]/projets/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) notFound();

  const growth = await getGrowthCaseStudy(lang, slug);
  if (growth) {
    return (
      // The page ends on its own call to action, so the footer's generic one is turned off.
      <PageShell lang={lang} current="projects" footerCta={false} alternates={translationLinks("projects", lang, slug, growth.translations)}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(growthJsonLd(growth, lang, slug)).replace(/</g, "\\u003c") }} />
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
    <PageShell lang={lang} current="projects" alternates={translationLinks("projects", lang, slug, study.translations)}>
      <CmsCaseStudyPage study={study} />
    </PageShell>
  );
}
