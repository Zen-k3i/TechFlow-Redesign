import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ArticlePage } from "@/components/insights/article-page";
import { articles, getArticle } from "@/components/insights/data";
import { PageShell } from "@/components/page/shell";
import { href } from "@/i18n/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/nos-insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const url = href("fr", "insights", slug);
  return {
    title: `${article.title.fr} | TechFlow Agency`,
    description: article.excerpt.fr,
    alternates: { canonical: url },
    openGraph: { type: "article", publishedTime: article.date, url },
  };
}

export default async function Article({ params }: PageProps<"/[lang]/nos-insights/[slug]">) {
  const { lang, slug } = await params;
  if (lang !== "fr") redirect(href("fr", "insights", slug));
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <PageShell lang="fr" current="insights">
      <ArticlePage article={article} />
    </PageShell>
  );
}
