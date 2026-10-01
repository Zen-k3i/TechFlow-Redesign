"use client";

import type { SanityImageSource } from "@sanity/image-url";
import type { PROJECTS_INDEX_QUERY_RESULT } from "@/sanity.types";
import { href } from "@/i18n/routes";
import { sanityLoader, urlFor } from "@/sanity/image";
import { useLocale } from "../site/locale";
import { ProjectCardView } from "../site/project-card";

export type CmsProject = PROJECTS_INDEX_QUERY_RESULT[number];

const hostname = (url: string | null) => {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
};

/** Project card for case studies stored in the CMS; hovering stacks the case study's hero screens. */
export function CmsProjectCard({ project }: { project: CmsProject }) {
  const { lang } = useLocale();
  const cover = project.coverImage?.asset?.url ? project.coverImage : null;

  return (
    <ProjectCardView
      href={href(lang, "projects", project.slug ?? "")}
      slug={project.slug ?? ""}
      accent={project.accentColor}
      name={project.title ?? ""}
      sector={project.sectors?.join(" · ") || undefined}
      tags={project.services ?? []}
      cover={
        cover
          ? {
              src: urlFor(cover as SanityImageSource)
                .width(1200)
                .url(),
              blurDataURL: cover.asset?.metadata?.lqip ?? undefined,
            }
          : undefined
      }
      previews={project.previews.map((p) =>
        urlFor(p as SanityImageSource)
          .width(1200)
          .url(),
      )}
      domain={hostname(project.websiteUrl)}
      loader={sanityLoader}
      cursor={false}
      glow={false}
    />
  );
}
