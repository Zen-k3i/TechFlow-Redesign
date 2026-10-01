import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CmsCaseStudyPage } from "@/components/case-study/cms-case-study-page";
import { GrowthCaseStudyPage } from "@/components/growth/case-study-page";
import { getGrowthCaseStudy, growthCaseStudies } from "@/components/growth/data";
import { PageShell } from "@/components/page/shell";
import { caseStudyUrl } from "@/components/site/content";
import { Providers } from "@/components/site/providers";
import { hasLocale } from "@/i18n/config";
import { client } from "@/sanity/client";
import { getProject, isSlug, redirectToTranslation } from "@/sanity/fetch";
import { cmsAlternates, translationLinks } from "@/sanity/metadata";
import { PROJECT_SLUGS_QUERY } from "@/sanity/queries";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const slugs = await client.withConfig({ useCdn: false }).fetch(PROJECT_SLUGS_QUERY, { lang: params.lang });
  // Growth case studies are still coded locally (French only).
  return [...slugs.flatMap((slug) => (slug ? [{ slug }] : [])), ...growthCaseStudies.map((c) => ({ slug: c.slug }))];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projets/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) return {};
  const growth = getGrowthCaseStudy(slug);
  if (growth) {
    return { title: `${growth.client} | Étude de cas growth marketing · TechFlow Agency`, description: growth.intro };
  }
  const study = await getProject(lang, slug);
  if (!study) return {};
  return {
    title: study.seo?.title ?? `${study.title} | Case Study · TechFlow Agency`,
    description: study.seo?.description ?? study.summary ?? undefined,
    alternates: cmsAlternates("projects", lang, slug, study.translations),
  };
}

export default async function CaseStudy({ params }: PageProps<"/[lang]/projets/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) notFound();

  const growth = getGrowthCaseStudy(slug);
  if (growth) {
    if (lang !== "fr") redirect(caseStudyUrl(slug));
    return (
      <Providers>
        <GrowthCaseStudyPage study={growth} />
      </Providers>
    );
  }

  const study = await getProject(lang, slug);
  if (!study) {
    await redirectToTranslation("project", lang, slug);
    notFound();
  }

  return (
    <PageShell lang={lang} current="projects" alternates={translationLinks("projects", lang, slug, study.translations)} footerCta={false}>
      <CmsCaseStudyPage study={study} />
    </PageShell>
  );
}
