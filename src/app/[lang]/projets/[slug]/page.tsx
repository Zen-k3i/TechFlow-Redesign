import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CaseStudyPage } from "@/components/case-study/case-study-page";
import { caseStudies, getCaseStudy } from "@/components/case-study/data";
import { GrowthCaseStudyPage } from "@/components/growth/case-study-page";
import { getGrowthCaseStudy, growthCaseStudies } from "@/components/growth/data";
import { caseStudyUrl, projects } from "@/components/site/content";
import { Providers } from "@/components/site/providers";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...growthCaseStudies, ...caseStudies].map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const growth = getGrowthCaseStudy(slug);
  if (growth) {
    return {
      title: `${growth.client} | Étude de cas growth marketing · TechFlow Agency`,
      description: growth.intro,
    };
  }
  const study = getCaseStudy(slug);
  const project = projects.find((p) => p.slug === slug);
  if (!study || !project) return {};
  return { title: `${project.name} | Étude de cas · TechFlow Agency`, description: study.summary };
}

export default async function CaseStudy({ params }: PageProps<"/[lang]/projets/[slug]">) {
  const { lang, slug } = await params;
  if (lang !== "fr") redirect(caseStudyUrl(slug));
  const growth = getGrowthCaseStudy(slug);
  const study = getCaseStudy(slug);
  const project = projects.find((p) => p.slug === slug);

  if (growth) {
    return (
      <Providers>
        <GrowthCaseStudyPage study={growth} />
      </Providers>
    );
  }
  if (!study || !project) notFound();

  return (
    <Providers>
      <CaseStudyPage project={project} study={study} />
    </Providers>
  );
}
