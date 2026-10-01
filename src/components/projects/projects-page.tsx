"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { SanityImageSource } from "@sanity/image-url";
import { href } from "@/i18n/routes";
import { urlFor } from "@/sanity/image";
import { ease, projects } from "../site/content";
import { useLocale } from "../site/locale";
import { ProjectCard } from "../site/project-card";
import { FilterChip } from "../site/work";
import { ServiceCards } from "../page/service-cards";
import { ClientMarquee, SectionHeader } from "../page/ui";
import { CmsProjectCard, type CmsProject } from "./cms-project-card";
import { filterOptions } from "../page/filters";
import { archive, projectsContent } from "./data";
import { CASES_ANCHOR, ProjectsHero, type WallProject } from "./projects-hero";

/** Growth case studies are still coded locally; everything else comes from the CMS. */
const growthProjects = projects.filter((p) => p.kind === "growth");

type Entry = { key: string; sectors: string[] } & ({ cms: CmsProject } | { local: (typeof growthProjects)[number] });

export function ProjectsPage({ cmsProjects, sectorList }: { cmsProjects: CmsProject[]; sectorList: string[] }) {
  const { lang, t } = useLocale();
  const c = projectsContent[lang];
  const entries = useMemo<Entry[]>(
    () => [
      ...cmsProjects.map((p) => ({ key: p._id, sectors: p.sectors ?? [], cms: p })),
      ...(lang === "fr" ? growthProjects.map((p) => ({ key: p.slug, sectors: [t.work.sectors[p.sector] ?? p.sector], local: p })) : []),
    ],
    [cmsProjects, lang, t],
  );
  // Filter buttons: the Sector list from Sanity, as used by these projects.
  const sectors = useMemo(() => filterOptions(sectorList, entries.map((e) => e.sectors)), [sectorList, entries]);
  const wall = useMemo<WallProject[]>(
    () =>
      cmsProjects.map((p) => ({
        key: p._id,
        href: href(lang, "projects", p.slug ?? ""),
        name: p.title ?? "",
        sector: p.sector ?? undefined,
        screens: p.previews.flatMap((img) =>
          img?.asset?.url
            ? [{ src: urlFor(img as SanityImageSource).width(1000).url(), blur: img.asset.metadata?.lqip ?? undefined }]
            : [],
        ),
      })),
    [cmsProjects, lang],
  );
  const [filter, setFilter] = useState<string | null>(null);
  const visible = entries.filter((e) => !filter || e.sectors.includes(filter));

  return (
    <>
      <ProjectsHero projects={wall} />

      <section className="bg-night px-5 pb-24 pt-8 text-white md:px-10">
        <ClientMarquee label={t.trust.eyebrow} />
      </section>

      <section id={CASES_ANCHOR} className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={c.grid.eyebrow} title={c.grid.heading} intro={c.grid.intro} tone="light" />

          <LayoutGroup>
            <div role="group" aria-label={t.work.filterLabel} className="mt-12 flex flex-wrap gap-2">
              <FilterChip active={filter === null} onClick={() => setFilter(null)} label={t.work.all} count={entries.length} />
              {sectors.map(([sector, count]) => (
                <FilterChip
                  key={sector}
                  active={filter === sector}
                  onClick={() => setFilter(sector)}
                  label={sector}
                  count={count}
                />
              ))}
            </div>

            <motion.ul layout className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((entry, i) => (
                  <motion.li
                    key={entry.key}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {/* Cards rise in row by row the first time they scroll into view. */}
                    <motion.div
                      initial={{ opacity: 0, y: 70, rotateX: 8 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true, margin: "-8% 0px" }}
                      transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease }}
                      style={{ transformPerspective: 1200 }}
                    >
                      {"cms" in entry ? (
                        <CmsProjectCard project={entry.cms} />
                      ) : (
                        <ProjectCard project={entry.local} cursor={false} glow={false} />
                      )}
                    </motion.div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>

          <div className="mt-32">
            <SectionHeader eyebrow={c.archive.eyebrow} title={c.archive.heading} intro={c.archive.intro} tone="light" />
            <div className="mt-12 border-t border-ink/15">
              <div className="eyebrow hidden grid-cols-[1.2fr_1fr_1.4fr] gap-6 py-4 text-ink/40 md:grid">
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
                      <span className="eyebrow w-6 text-ink/30">{String(i + 1).padStart(2, "0")}</span>
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
