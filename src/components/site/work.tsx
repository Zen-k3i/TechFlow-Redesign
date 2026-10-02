"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { filterOptions } from "../page/filters";
import { CmsProjectCard, type CmsProject } from "../projects/cms-project-card";
import { useLocale } from "./locale";
import { FadeIn, RevealHeading } from "./reveal";

/** Cards shown under "All"; a sector filter shows every match, as on the old site. */
const HOME_LIMIT = 12;

/**
 * Selected work: every case study from Sanity (websites and growth), in the Studio order, the same
 * cards as /projets. "All" shows the first `HOME_LIMIT`; the sector filters (buttons from the
 * Sanity Sectors list, counted over every project) show all matching projects.
 */
export function Work({ sectorList, cmsProjects }: { sectorList: string[]; cmsProjects: CmsProject[] }) {
  const { t, links } = useLocale();
  const items = useMemo(() => cmsProjects.filter((p) => p.slug), [cmsProjects]);
  const sectors = useMemo(() => filterOptions(sectorList, items.map((p) => p.sectors ?? [])), [sectorList, items]);
  const [filter, setFilter] = useState<string | null>(null);
  const visible = filter ? items.filter((p) => p.sectors?.includes(filter)) : items.slice(0, HOME_LIMIT);

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

        <LayoutGroup>
          <div role="group" aria-label={t.work.filterLabel} className="mt-12 flex flex-wrap gap-2">
            <FilterChip active={filter === null} onClick={() => setFilter(null)} label={t.work.all} count={items.length} />
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

          <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <motion.li
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CmsProjectCard project={project} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        <div className="mt-14 flex justify-center">
          <Link
            href={links.projects}
            className="group flex h-14 items-center gap-3 rounded-full bg-ink pl-7 pr-2 font-medium text-paper transition-colors hover:bg-brand"
          >
            {t.work.seeAll}
            <span className="flex size-10 items-center justify-center rounded-full bg-paper text-ink transition-transform group-hover:-rotate-45">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
        active ? "border-ink text-paper" : "border-ink/15 text-ink/70 hover:border-ink/40"
      }`}
    >
      {active && (
        <motion.span
          layoutId="filter-active"
          className="absolute inset-0 -z-0 rounded-full bg-ink"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative">
        {label} <span className="eyebrow ml-1 opacity-60">{count}</span>
      </span>
    </button>
  );
}
