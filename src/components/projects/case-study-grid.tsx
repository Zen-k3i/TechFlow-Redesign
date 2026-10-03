"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, m as motion } from "motion/react";
import { filterOptions } from "../page/filters";
import { FilterChip } from "../page/filter-chip";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { CmsProjectCard, type CmsProject } from "./cms-project-card";

/**
 * Sector filters + case-study cards (websites and growth, all from Sanity, Studio order). Shared by
 * the /projets "Études de cas" grid and the home page "Selected work", so both always match.
 * `limit` caps the cards under "All" (home page); a sector filter always shows every match, and
 * every count is over all projects.
 */
export function CaseStudyGrid({
  cmsProjects,
  sectorList,
  limit,
  hideUnderAll,
}: {
  cmsProjects: CmsProject[];
  sectorList: string[];
  limit?: number;
  /** Projects counted and filterable, but left out of the "All" selection (the home page's 12). */
  hideUnderAll?: (project: CmsProject) => boolean;
}) {
  const { t } = useLocale();
  const items = useMemo(() => cmsProjects.filter((p) => p.slug), [cmsProjects]);
  // Filter buttons: the Sectors list from Sanity, as used by these projects.
  const sectors = useMemo(() => filterOptions(sectorList, items.map((p) => p.sectors ?? [])), [sectorList, items]);
  const [filter, setFilter] = useState<string | null>(null);
  const visible = filter ? items.filter((p) => p.sectors?.includes(filter)) : items.filter((p) => !hideUnderAll?.(p)).slice(0, limit);

  return (
    <LayoutGroup>
      <div role="group" aria-label={t.work.filterLabel} className="mt-12 flex flex-wrap gap-2">
        <FilterChip active={filter === null} onClick={() => setFilter(null)} label={t.work.all} count={items.length} />
        {sectors.map(([sector, count]) => (
          <FilterChip key={sector} active={filter === sector} onClick={() => setFilter(sector)} label={sector} count={count} />
        ))}
      </div>

      <motion.ul layout className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <motion.li
              key={project._id}
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
                <CmsProjectCard project={project} />
              </motion.div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}
