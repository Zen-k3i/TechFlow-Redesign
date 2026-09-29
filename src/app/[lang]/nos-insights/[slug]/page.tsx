import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/insights/article-page";
import { PageShell } from "@/components/page/shell";
import { hasLocale } from "@/i18n/config";
import { client } from "@/sanity/client";
import { getInsight, isSlug, redirectToTranslation } from "@/sanity/fetch";
import { cmsAlternates } from "@/sanity/metadata";
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
  const alternates = cmsAlternates("insights", lang, slug, article.translations);
  return {
    title: article.seo?.title ?? `${article.title} | TechFlow Agency`,
    description: article.seo?.description ?? article.excerpt ?? undefined,
    alternates,
    openGraph: { type: "article", publishedTime: article.publishedAt ?? undefined, url: alternates?.canonical?.toString() },
  };
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
    <PageShell lang={lang} current="insights">
      <ArticlePage article={article} />
    </PageShell>
  );
}
