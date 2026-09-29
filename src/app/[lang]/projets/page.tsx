import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page/shell";
import { projectsContent } from "@/components/projects/data";
import { ProjectsPage } from "@/components/projects/projects-page";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/routes";
import { sanityFetch } from "@/sanity/client";
import { PROJECTS_INDEX_QUERY } from "@/sanity/queries";

export async function generateMetadata({ params }: PageProps<"/[lang]/projets">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "projects", projectsContent[lang].meta);
}

export default async function Projects({ params }: PageProps<"/[lang]/projets">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const cmsProjects = await sanityFetch(PROJECTS_INDEX_QUERY, { lang });

  return (
    <PageShell lang={lang} current="projects">
      <ProjectsPage cmsProjects={cmsProjects} />
    </PageShell>
  );
}
