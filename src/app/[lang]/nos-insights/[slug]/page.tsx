import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/insights/article-page";
import { PageShell } from "@/components/page/shell";
import { hasLocale } from "@/i18n/config";
import { client } from "@/sanity/client";
import { getInsight, isSlug, redirectToTranslation } from "@/sanity/fetch";
import { href } from "@/i18n/routes";
import { translationLinks } from "@/sanity/metadata";
import { buildMetadata } from "@/sanity/seo";
import { urlFor } from "@/sanity/image";
import { articleJsonLd, JsonLd } from "@/components/seo/json-ld";
import { INSIGHT_SLUGS_QUERY } from "@/sanity/queries";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const slugs = await client.withConfig({ useCdn: false }).fetch(INSIGHT_SLUGS_QUERY, { lang: params.lang });
  return slugs.flatMap((slug) => (slug ? [{ slug }] : []));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/nos-insights/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) return {};
  const article = await getInsight(lang, slug);
  if (!article) return {};
  return buildMetadata({
    lang,
    path: href(lang, "insights", slug),
    languages: translationLinks("insights", lang, slug, article.translations),
    seo: article.seo,
    title: article.title ?? "",
    description: article.excerpt,
    image: article.coverImage,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article._updatedAt,
  });
}

export default async function Article({ params }: PageProps<"/[lang]/nos-insights/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) notFound();
  const article = await getInsight(lang, slug);
  if (!article) {
    await redirectToTranslation("insight", lang, slug);
    notFound();
  }

  return (
    <PageShell lang={lang} current="insights" alternates={translationLinks("insights", lang, slug, article.translations)} breadcrumb={{ name: article.title ?? slug, slug }}>
      <JsonLd data={articleJsonLd(article, lang, slug, article.coverImage?.asset ? urlFor(article.coverImage).width(1200).url() : undefined)} />
      <ArticlePage article={article} />
    </PageShell>
  );
}
