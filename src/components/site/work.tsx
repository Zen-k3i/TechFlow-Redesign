"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { GrowthCover } from "../case-study/growth-cover";
import { caseStudyUrl, projectImage, projects, type Project } from "./content";
import { useLocale } from "./locale";
import { ProjectHighlight } from "./project-highlight";
import { FadeIn, RevealHeading } from "./reveal";

const MotionLink = motion.create(Link);

export function Work() {
  const { t, links } = useLocale();
  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) counts.set(p.sector, (counts.get(p.sector) ?? 0) + 1);
    return [...counts.entries()];
  }, []);
  const [filter, setFilter] = useState<string | null>(null);
  const visible = projects.filter((p) => !filter || p.sector === filter);

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

          <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        <div className="mt-14 flex justify-center">
          <a
            href={links.projects}
            target="_blank"
            rel="noreferrer"
            className="group flex h-14 items-center gap-3 rounded-full bg-ink pl-7 pr-2 font-medium text-paper transition-colors hover:bg-brand-deep"
          >
            {t.work.seeAll}
            <span className="flex size-10 items-center justify-center rounded-full bg-paper text-ink transition-transform group-hover:-rotate-45">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLocale();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 });

  return (
    <div className="[perspective:1200px]">
      <MotionLink
        href={caseStudyUrl(project.slug)}
        data-cursor={t.hero.caseCursor}
        style={{ rotateX, rotateY }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="group block"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink/5">
          {project.kind === "growth" ? (
            <GrowthCover videos={t.work.growthCover.videos} title={t.work.growthCover.title} />
          ) : (
            <Image
              src={projectImage(project.slug)}
              alt={`${t.hero.caseAlt} ${project.name}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition-[transform,object-position] duration-[1.6s] ease-out group-hover:scale-105 group-hover:object-bottom"
            />
          )}
          <ProjectHighlight slug={project.slug} mx={mx} my={my} />
          <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-1.5">
            {project.disciplines.map((d) => (
              <span
                key={d}
                className="translate-y-[-8px] rounded-full bg-white/90 px-2.5 py-1 text-xs text-ink opacity-0 backdrop-blur transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                {t.work.disciplines[d] ?? d}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4 px-1">
          <div>
            <h3 className="text-xl font-medium">{project.name}</h3>
            <p className="mt-0.5 text-sm text-ink/55">{t.work.sectors[project.sector] ?? project.sector}</p>
          </div>
          <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-[transform,background-color,color] group-hover:-rotate-45 group-hover:bg-brand-deep group-hover:text-white">
            →
          </span>
        </div>
      </MotionLink>
    </div>
  );
}

function FilterChip({
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
