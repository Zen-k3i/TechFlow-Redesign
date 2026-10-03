"use client";

import { useMemo } from "react";
import { m as motion } from "motion/react";
import type { SanityImageSource } from "@sanity/image-url";
import { href } from "@/i18n/routes";
import { urlFor } from "@/sanity/image";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { ServiceCards } from "../page/service-cards";
import { ClientMarquee, SectionHeader } from "../page/ui";
import { CaseStudyGrid } from "./case-study-grid";
import type { CmsProject } from "./cms-project-card";
import { archive, projectsContent } from "./data";
import { CASES_ANCHOR, ProjectsHero, type WallProject } from "./projects-hero";

export function ProjectsPage({ cmsProjects, sectorList }: { cmsProjects: CmsProject[]; sectorList: string[] }) {
  const { lang, t } = useLocale();
  const c = projectsContent[lang];
  const wall = useMemo<WallProject[]>(
    () =>
      // The wall shows website screens only, not growth case studies' hover images.
      cmsProjects.filter((p) => p._type !== "growthCaseStudy" && p.previews.length > 0).map((p) => ({
        key: p._id,
        href: href(lang, "projects", p.slug ?? ""),
        name: p.title ?? "",
        sector: p.sector ?? undefined,
        screens: p.previews.flatMap((img) =>
          img?.asset?.url
            ? [{ src: urlFor(img as SanityImageSource).width(1000).url() }]
            : [],
        ),
      })),
    [cmsProjects, lang],
  );

  return (
    <>
      <ProjectsHero projects={wall} />

      <section className="bg-night px-5 pb-24 pt-8 text-white md:px-10">
        <ClientMarquee label={t.trust.eyebrow} />
      </section>

      <section id={CASES_ANCHOR} className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={c.grid.eyebrow} title={c.grid.heading} intro={c.grid.intro} tone="light" />

          <CaseStudyGrid cmsProjects={cmsProjects} sectorList={sectorList} />

          <div className="mt-32">
            <SectionHeader eyebrow={c.archive.eyebrow} title={c.archive.heading} intro={c.archive.intro} tone="light" />
            <div className="mt-12 border-t border-ink/15">
              <div className="eyebrow hidden grid-cols-[1.2fr_1fr_1.4fr] gap-6 py-4 text-ink/60 md:grid">
                <span>{c.archive.columns.client}</span>
                <span>{c.archive.columns.sector}</span>
                <span>{c.archive.columns.scope}</span>
              </div>
              <ul>
                {archive.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5% 0px" }}
                    transition={{ duration: 0.5, delay: (i % 4) * 0.04, ease }}
                    className="group grid gap-2 border-t border-ink/10 py-5 transition-colors hover:bg-white md:grid-cols-[1.2fr_1fr_1.4fr] md:gap-6 md:px-3"
                  >
                    <span className="flex items-center gap-3 font-serif text-2xl md:text-3xl">
                      <span className="eyebrow w-6 text-ink/60">{String(i + 1).padStart(2, "0")}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-2">{item.name}</span>
                    </span>
                    <span className="self-center text-ink/60">{t.work.sectors[item.sector] ?? item.sector}</span>
                    <span className="flex flex-wrap items-center gap-1.5">
                      {item.disciplines.map((d) => (
                        <span key={d} className="rounded-full border border-ink/15 px-2.5 py-0.5 text-xs text-ink/65">
                          {t.work.disciplines[d] ?? d}
                        </span>
                      ))}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ServiceCards eyebrow={c.services.eyebrow} heading={c.services.heading} />
    </>
  );
}
