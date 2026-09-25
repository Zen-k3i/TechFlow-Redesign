"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { caseStudyUrl, clients, links, projectImage, projects } from "./content";

export function Collection() {
  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) counts.set(p.sector, (counts.get(p.sector) ?? 0) + 1);
    return [...counts.entries()];
  }, []);
  const [filter, setFilter] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 28 });
  const sy = useSpring(y, { stiffness: 250, damping: 28 });

  const visible = projects.filter((p) => !filter || p.sector === filter);

  return (
    <section id="collection" className="grain relative bg-ivory px-6 py-28 text-gallery md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="label text-gallery/50">Salle III — La Collection</p>
            <h2 className="mt-4 font-serif text-5xl leading-none md:text-8xl">
              Le travail parle <em className="text-brand-deep">avant nous.</em>
            </h2>
          </div>
          <p className="max-w-sm text-gallery/60">
            Chaque projet avait un objectif chiffré. Ouvrez un cas pour voir lequel, et ce qu&apos;il est devenu.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          <FilterChip active={filter === null} onClick={() => setFilter(null)} label="Toute la collection" count={projects.length} />
          {sectors.map(([sector, count]) => (
            <FilterChip key={sector} active={filter === sector} onClick={() => setFilter(sector)} label={sector} count={count} />
          ))}
        </div>

        <ul
          className="mt-10 border-t border-gallery/15"
          onPointerMove={(e) => {
            x.set(e.clientX);
            y.set(e.clientY);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          <AnimatePresence initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={caseStudyUrl(project.slug)}
                  target="_blank"
                  rel="noreferrer"
                  onPointerEnter={() => setHovered(project.slug)}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-gallery/15 py-5 md:grid-cols-[4rem_1.4fr_1fr_1.2fr_2rem] md:py-7"
                >
                  <span className="label text-gallery/40">{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-3xl leading-none transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-brand-deep md:text-5xl">
                    {project.name}
                  </span>
                  <span className="hidden text-gallery/60 md:block">{project.sector}</span>
                  <span className="label hidden text-gallery/40 md:block">{project.disciplines.join(" · ")}</span>
                  <span className="text-gallery/40 transition-transform group-hover:-rotate-45 group-hover:text-brand-deep">→</span>
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-8 flex justify-end">
          <a href={links.projects} target="_blank" rel="noreferrer" className="label text-gallery/60 hover:text-brand-deep">
            Voir les 21 projets de la collection ↗
          </a>
        </div>

        <div className="mt-24">
          <p className="label text-center text-gallery/40">Ils ont exposé chez nous</p>
          <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <ul className="flex w-max animate-marquee items-center gap-16">
              {[...clients, ...clients].map((client, i) => (
                <li key={i} aria-hidden={i >= clients.length} className="shrink-0">
                  <Image
                    src={client.src}
                    alt={i < clients.length ? client.name : ""}
                    width={client.width}
                    height={client.height}
                    className="h-7 w-auto max-w-[140px] object-contain opacity-45 brightness-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 border-[8px] border-[#e9e2d4] bg-[#e9e2d4] shadow-2xl"
            >
              <div className="relative h-72 w-56">
                <Image src={projectImage(hovered)} alt="" fill sizes="224px" className="object-cover object-top" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function FilterChip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active ? "border-gallery bg-gallery text-ivory" : "border-gallery/20 text-gallery/70 hover:border-gallery/50"
      }`}
    >
      {label} <span className="label ml-1 opacity-60">{count}</span>
    </button>
  );
}
