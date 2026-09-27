"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { href } from "@/i18n/routes";
import { ease, projects } from "../site/content";
import { useLocale } from "../site/locale";
import { ProjectCard } from "../site/project-card";
import { FadeIn } from "../site/reveal";
import { FilterChip } from "../site/work";
import { ServiceCards } from "../page/service-cards";
import { ClientMarquee, HumanActions, PageHero, SectionHeader } from "../page/ui";
import { archive, projectsContent } from "./data";

export function ProjectsPage() {
  const { lang, t } = useLocale();
  const c = projectsContent[lang];
  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) counts.set(p.sector, (counts.get(p.sector) ?? 0) + 1);
    return [...counts.entries()];
  }, []);
  const [filter, setFilter] = useState<string | null>(null);
  const visible = projects.filter((p) => !filter || p.sector === filter);

  return (
    <>
      <PageHero
        crumbs={[{ label: t.nav.pages.projects, href: href(lang, "projects") }]}
        badge={c.badge}
        title={c.title}
        intro={c.intro}
        actions={<HumanActions />}
      />

      <section className="bg-night px-5 pb-24 text-white md:px-10">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
          {c.stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06} className="bg-night p-6 md:p-8">
              <dd className="font-serif text-5xl leading-none md:text-6xl">{s.value}</dd>
              <dt className="mt-3 text-sm text-white/55">{s.label}</dt>
            </FadeIn>
          ))}
        </dl>
        <div className="mt-20">
          <ClientMarquee label={t.trust.eyebrow} />
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={c.grid.eyebrow} title={c.grid.heading} intro={c.grid.intro} tone="light" />

          <LayoutGroup>
            <div role="group" aria-label={t.work.filterLabel} className="mt-12 flex flex-wrap gap-2">
              <FilterChip active={filter === null} onClick={() => setFilter(null)} label={t.work.all} count={projects.length} />
              {sectors.map(([sector, count]) => (
                <FilterChip
                  key={sector}
                  active={filter === sector}
                  onClick={() => setFilter(sector)}
                  label={t.work.sectors[sector] ?? sector}
                  count={count}
                />
              ))}
            </div>

            <motion.ul layout className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((project) => (
                  <motion.li
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <ProjectCard project={project} />
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
