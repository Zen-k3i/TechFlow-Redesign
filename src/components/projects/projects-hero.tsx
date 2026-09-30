"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { href } from "@/i18n/routes";
import { sanityLoader } from "@/sanity/image";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { Magnetic } from "../site/magnetic";
import { CountUp, RevealHeading } from "../site/reveal";
import { ButtonLink } from "../page/ui";
import { projectsContent } from "./data";

export type WallProject = {
  key: string;
  href: string;
  name: string;
  sector?: string;
  /** Website screens of the case study, the hero screen first. */
  screens: { src: string; blur?: string }[];
};

export const CASES_ANCHOR = "etudes-de-cas";

const COLUMNS = 3;
const PER_COLUMN = 8;
// Seconds per loop; the middle column runs the other way.
const SPEEDS = [70, 58, 82];

/**
 * Projects page hero: the pitch on the left, and a tilted wall of the case studies'
 * real website screens scrolling behind it. Each screen opens its case study.
 */
export function ProjectsHero({ projects }: { projects: WallProject[] }) {
  const { lang, t, links } = useLocale();
  const c = projectsContent[lang];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Pointer tilts the wall a little; scrolling away lifts it and fades the copy.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltZ = useSpring(useTransform(mx, [-0.5, 0.5], [-15, -9]), { stiffness: 60, damping: 20 });
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [24, 16]), { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wallY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const wallScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const columns = buildColumns(projects);
  const trail = [
    { label: t.common.breadcrumbHome, href: href(lang, "home") },
    { label: t.nav.pages.projects, href: href(lang, "projects") },
  ];

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || reduce) return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="grain relative flex flex-col overflow-hidden bg-night px-5 pb-16 pt-32 text-white md:px-10 md:pb-28 md:pt-44 lg:min-h-[100svh] lg:justify-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_80%_30%,rgba(71,102,255,0.35),transparent_70%),radial-gradient(40%_40%_at_0%_100%,rgba(21,37,112,0.55),transparent_70%)]"
      />
      {/* Same grid as the other page heroes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_60%_at_30%_30%,black,transparent)]"
      />

      {columns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.15, ease }}
          className="relative -mx-5 mt-14 h-[26rem] sm:h-[32rem] md:-mx-10 lg:absolute lg:inset-y-0 lg:right-[-10%] lg:mx-0 lg:mt-0 lg:h-auto lg:w-[64%] overflow-hidden"
        >
          <p className="sr-only">{c.hero.wall}</p>
          <div className="absolute inset-0 isolate [perspective:1800px]">
            <motion.div
              style={reduce ? { rotateX: 20, rotateZ: -12 } : { rotateX: tiltX, rotateZ: tiltZ, y: wallY, scale: wallScale }}
              className="absolute inset-x-0 -top-[30%] -bottom-[30%] grid grid-cols-3 gap-4 md:gap-5"
            >
              {columns.map((column, i) => (
                <div key={i} className="marquee-row overflow-visible">
                  <ul
                    className="flex flex-col gap-4 motion-safe:animate-marquee-up md:gap-5"
                    style={{
                      animationDuration: `${SPEEDS[i % SPEEDS.length]}s`,
                      animationDirection: i % 2 ? "reverse" : "normal",
                    }}
                  >
                    {[...column, ...column].map((tile, j) => (
                      <li key={j}>
                        <WallTile tile={tile} copy={j >= column.length} label={c.hero.open} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Fade the wall into the page on every side. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,var(--color-night),transparent_20%,transparent_75%,var(--color-night))] lg:bg-[linear-gradient(to_right,var(--color-night)_4%,color-mix(in_oklab,var(--color-night)_60%,transparent)_22%,transparent_46%),linear-gradient(to_bottom,var(--color-night),transparent_20%,transparent_78%,var(--color-night))]"
          />
        </motion.div>
      )}

      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl order-first [&_a]:pointer-events-auto"
      >
        <div className="lg:max-w-[44%]">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow mb-8 flex flex-wrap items-center gap-2 text-white/40"
          >
            {trail.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i < trail.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/70">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/75"
          >
            {c.hero.eyebrow}
          </motion.p>

          <RevealHeading
            as="h1"
            text={c.title}
            className="mt-6 font-serif text-[clamp(3rem,5.4vw,5.6rem)] leading-[0.92] tracking-[-0.02em]"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-7 max-w-lg text-lg text-white/65 md:text-xl"
          >
            {c.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <ButtonLink href={`#${CASES_ANCHOR}`}>{c.hero.explore}</ButtonLink>
            </Magnetic>
            <ButtonLink href={links.booking} external variant="outline">
              {t.common.human}
            </ButtonLink>
          </motion.div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {c.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 + i * 0.08, ease }}
              >
                <dd className="font-serif text-4xl leading-none md:text-5xl">
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-2 text-sm text-white/50">{s.label}</dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}

type Tile = { project: WallProject; screen: WallProject["screens"][number] };

/** Every column shows every project, starting at a different one and on a different screen. */
function buildColumns(projects: WallProject[]): Tile[][] {
  const withScreens = projects.filter((p) => p.screens.length > 0);
  if (withScreens.length === 0) return [];
  const shift = Math.ceil(withScreens.length / COLUMNS);
  return Array.from({ length: COLUMNS }, (_, c) => {
    const rotated = [...withScreens.slice(c * shift), ...withScreens.slice(0, c * shift)];
    return rotated.slice(0, PER_COLUMN).map((project) => ({
      project,
      screen: project.screens[c % project.screens.length],
    }));
  });
}

function WallTile({ tile, copy, label }: { tile: Tile; copy: boolean; label: string }) {
  const { project, screen } = tile;
  return (
    <Link
      href={project.href}
      aria-hidden={copy || undefined}
      tabIndex={copy ? -1 : undefined}
      className="group/tile block overflow-hidden rounded-xl border border-white/10 bg-night-soft shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-brand-sky/60 focus-visible:border-brand-sky"
    >
      <span aria-hidden className="flex gap-1 border-b border-white/10 px-2.5 py-2">
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="size-1.5 rounded-full bg-white/20" />
        <span className="size-1.5 rounded-full bg-white/20" />
      </span>
      <span className="relative block aspect-[16/10]">
        <Image
          src={screen.src}
          alt=""
          fill
          loader={sanityLoader}
          placeholder={screen.blur ? "blur" : "empty"}
          blurDataURL={screen.blur}
          sizes="(min-width: 1024px) 22vw, 34vw"
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tile:scale-105"
        />
        <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-night/95 via-night/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 md:p-4">
          <span className="font-serif text-lg leading-tight md:text-2xl">{project.name}</span>
          <span className="mt-1 flex items-center justify-between gap-2 text-[11px] text-white/60 md:text-xs">
            <span className="truncate">{project.sector}</span>
            <span className="shrink-0 text-brand-sky">{label} →</span>
          </span>
        </span>
      </span>
      {!copy && <span className="sr-only">{project.name}</span>}
    </Link>
  );
}
