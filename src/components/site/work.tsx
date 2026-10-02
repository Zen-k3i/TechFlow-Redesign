"use client";

import Link from "next/link";
import { CaseStudyGrid } from "../projects/case-study-grid";
import type { CmsProject } from "../projects/cms-project-card";
import { useLocale } from "./locale";
import { FadeIn, RevealHeading } from "./reveal";

/** Cards shown under "All" on the home page; a sector filter shows every match, as on the old site. */
const HOME_LIMIT = 12;

/**
 * Selected work: the same filters and cards as the /projets case-study grid (`CaseStudyGrid`),
 * limited to the first `HOME_LIMIT` under "All", then a link to every project with the live count.
 */
export function Work({ sectorList, cmsProjects }: { sectorList: string[]; cmsProjects: CmsProject[] }) {
  const { t, links } = useLocale();
  // Website projects and growth case studies published in Sanity.
  const total = cmsProjects.filter((p) => p.slug).length;

  return (
    <section id="projets" className="relative rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow text-brand-deep">{t.work.eyebrow}</p>
            <RevealHeading
              text={t.work.heading}
              accentClassName="italic text-brand-deep"
              className="mt-4 font-serif text-5xl leading-[0.95] md:text-8xl"
            />
          </div>
          <FadeIn>
            <p className="max-w-sm text-ink/60">
              {t.work.intro}
            </p>
          </FadeIn>
        </div>

        <CaseStudyGrid cmsProjects={cmsProjects} sectorList={sectorList} limit={HOME_LIMIT} />

        <div className="mt-14 flex justify-center">
          <Link
            href={links.projects}
            className="group flex h-14 items-center gap-3 rounded-full bg-ink pl-7 pr-2 font-medium text-paper transition-colors hover:bg-brand"
          >
            {t.work.seeAll(total)}
            <span className="flex size-10 items-center justify-center rounded-full bg-paper text-ink transition-transform group-hover:-rotate-45">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
