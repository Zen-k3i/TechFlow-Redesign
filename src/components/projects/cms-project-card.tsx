"use client";

import Link from "next/link";
import type { PROJECTS_INDEX_QUERY_RESULT } from "@/sanity.types";
import { href } from "@/i18n/routes";
import { SanityImage } from "../cms/sanity-image";
import { useLocale } from "../site/locale";

export type CmsProject = PROJECTS_INDEX_QUERY_RESULT[number];

/** Project card for case studies stored in the CMS. */
export function CmsProjectCard({ project, tone = "light" }: { project: CmsProject; tone?: "light" | "dark" }) {
  const { lang, t } = useLocale();
  const light = tone === "light";

  return (
    <Link href={href(lang, "projects", project.slug ?? "")} className="group block">
      <div className={`relative aspect-[4/5] overflow-hidden rounded-3xl ${light ? "bg-ink/5" : "bg-white/5"}`}>
        <SanityImage
          image={project.coverImage}
          alt={`${t.hero.caseAlt} ${project.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        {project.services && project.services.length > 0 && (
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5 transition-opacity duration-300 group-hover:opacity-0">
            {project.services.map((s) => (
              <span key={s} className="rounded-full bg-white/90 px-2.5 py-1 text-xs text-ink backdrop-blur">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-xl font-medium">{project.title}</h3>
          {project.sector && <p className="mt-0.5 text-sm opacity-55">{project.sector}</p>}
        </div>
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,color] group-hover:-rotate-45 ${
            light ? "border-ink/15 group-hover:bg-brand-deep group-hover:text-white" : "border-white/20 group-hover:bg-white group-hover:text-night"
          }`}
        >
          →
        </span>
      </div>
    </Link>
  );
}
