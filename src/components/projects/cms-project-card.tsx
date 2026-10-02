"use client";

import type { SanityImageSource } from "@sanity/image-url";
import type { PROJECTS_INDEX_QUERY_RESULT } from "@/sanity.types";
import { href } from "@/i18n/routes";
import { sanityLoader, urlFor } from "@/sanity/image";
import { useLocale } from "../site/locale";
import { ProjectCardView } from "../site/project-card";

type IndexItem = PROJECTS_INDEX_QUERY_RESULT[number];
/** A website project or a growth case study, as listed on cards (`_type` is absent in older list queries). */
export type CmsProject = Omit<IndexItem, "_type" | "previews"> & {
  _type?: IndexItem["_type"];
  previews: Extract<IndexItem, { _type: "project" }>["previews"];
  phones?: Extract<IndexItem, { _type: "growthCaseStudy" }>["phones"];
};

const hostname = (url: string | null) => {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
};

/**
 * Card for a case study stored in the CMS. Website projects stack their hero screens on hover;
 * growth case studies fan their "Card hover" images out as posters (else their ads as phones), and
 * without a card image they get the designed growth cover.
 */
export function CmsProjectCard({ project }: { project: CmsProject }) {
  const { lang } = useLocale();
  const cover = project.coverImage?.asset?.url ? project.coverImage : null;
  const growth = project._type === "growthCaseStudy";

  return (
    <ProjectCardView
      href={href(lang, "projects", project.slug ?? "")}
      slug={project.slug ?? ""}
      accent={project.accentColor}
      name={project.title ?? ""}
      sector={project.sectors?.join(" · ") || undefined}
      // Growth case studies carry one tag, their first sector ("Growth Marketing"); websites list their services.
      tags={growth ? (project.sector ? [project.sector] : []) : (project.services ?? [])}
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
      growth={growth && !cover}
      posters={growth}
      phones={project.phones ?? []}
      loader={sanityLoader}
      cursor={false}
      glow={false}
    />
  );
}
