"use client";

import Image, { type ImageLoader } from "next/image";
import { useStill } from "./use-still";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { href } from "@/i18n/routes";
import { GrowthCover } from "../case-study/growth-cover";
import { projectImage, type Project } from "./content";
import { useLocale } from "./locale";
import { projectDomain, projectPreviews } from "./previews";
import { projectTheme, themeFromHex } from "./project-highlight";

const MotionLink = motion.create(Link);
const SLIDE_MS = 1600;
const spring = { stiffness: 180, damping: 18 };

// Position of each screen in the fanned stack, from front (0) to back.
const STACK = [
  "translate3d(0,0,80px) rotateZ(0deg) scale(1)",
  "translate3d(8%,-36%,45px) rotateZ(3deg) scale(0.9)",
  "translate3d(-8%,-70%,15px) rotateZ(-3deg) scale(0.8)",
];

// Growth case studies fan their ads out as phones: front phone in the middle, the others behind.
const PHONE_STACK = [
  "translate3d(-50%,0,80px) rotateZ(0deg) scale(1)",
  "translate3d(-5%,6%,40px) rotateZ(9deg) scale(0.86)",
  "translate3d(-95%,6%,40px) rotateZ(-9deg) scale(0.86)",
];

// Growth case studies fan their hover images out as posters, like printed ads dealt on a table.
const POSTER_FAN = [
  "translate3d(0,0,80px) rotateZ(0deg) scale(1)",
  "translate3d(36%,5%,40px) rotateZ(9deg) scale(0.86)",
  "translate3d(-36%,5%,40px) rotateZ(-9deg) scale(0.86)",
];

export type CardPhone = { _key: string; angle: string | null; hook: string | null; poster: string | null };

type CardOptions = {
  sizes?: string;
  /** Show the "View case" cursor bubble on hover. */
  cursor?: boolean;
  /** Show the colored glow and pointer glare gradients on hover. */
  glow?: boolean;
};

/** Card for a locally coded project (homepage, service pages, growth case studies). */
export function ProjectCard({
  project,
  sector,
  accent,
  ...options
}: {
  project: Project;
  /** Overrides the local sector label. */ sector?: string;
  /** Sanity colour, overrides the coded theme. */ accent?: string | null;
} & CardOptions) {
  const { t, lang } = useLocale();
  return (
    <ProjectCardView
      {...options}
      href={href(lang, "projects", project.slug)}
      slug={project.slug}
      accent={accent}
      name={project.name}
      sector={sector ?? t.work.sectors[project.sector] ?? project.sector}
      tags={project.disciplines.map((d) => t.work.disciplines[d] ?? d)}
      cover={{ src: projectImage(project.slug) }}
      previews={projectPreviews(project.slug)}
      domain={projectDomain(project.slug)}
      growth={project.kind === "growth"}
      posters={project.kind === "growth"}
    />
  );
}

type CardImage = { src: string; blurDataURL?: string };

/**
 * Tilting case-study card: the cover image, plus a stack of browser screens that
 * cycles on hover when `previews` are given.
 */
export function ProjectCardView({
  href: to,
  slug,
  accent,
  name,
  sector,
  tags,
  cover,
  previews,
  domain,
  loader,
  growth = false,
  posters = false,
  phones = [],
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  cursor = true,
  glow = true,
}: {
  href: string;
  /** Picks the accent color when no `accent` is given (themes coded by slug). */
  slug: string;
  /** Hex accent from Sanity ("Template colour"); wins over the coded theme. */
  accent?: string | null;
  name: string;
  sector?: string;
  tags: string[];
  cover?: CardImage;
  previews: string[];
  domain?: string;
  /** Image loader for every image of the card, e.g. the Sanity CDN loader. */
  loader?: ImageLoader;
  /** Show the designed growth cover instead of an image. */
  growth?: boolean;
  /** Growth case studies: `previews` are marketing posters, fanned out on hover instead of browser screens. */
  posters?: boolean;
  /** Growth case studies: ads shown as phones on hover when there are no poster images. */
  phones?: CardPhone[];
} & CardOptions) {
  const { t } = useLocale();
  const reduce = useStill();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), spring);
  const glareX = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(my, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 55%)`;

  const theme = themeFromHex(accent) ?? projectTheme(slug);
  // Websites stack browser screens; growth case studies fan their posters, else their ad phones.
  const posterFan = posters && previews.length > 0;
  const stacked = !posters && previews.length > 0;
  const phoneStack = !posterFan && !stacked && phones.length > 0;
  // Every stack cycles the same way.
  const count = phoneStack ? phones.length : stacked || posterFan ? previews.length : 0;
  const [hovered, setHovered] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (!hovered || count < 2) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % count), SLIDE_MS);
    return () => clearInterval(id);
  }, [hovered, count]);

  return (
    <div className="[perspective:1100px]">
      <MotionLink
        href={to}
        data-cursor={cursor ? t.hero.caseCursor : undefined}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHovered(true);
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || reduce) return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
          setHovered(false);
          setSlide(0);
        }}
        className="group block"
      >
        <div className="relative aspect-[4/5] [transform-style:preserve-3d]" style={{ "--accent": theme.accent } as CSSProperties}>
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-[color-mix(in_oklab,var(--accent)_28%,#0c0e16)] shadow-[0_0_0_rgba(0,0,0,0)] transition-shadow duration-700 group-hover:shadow-[0_50px_80px_-30px_rgba(0,0,0,0.55)]">
            {growth ? (
              <div className={`absolute inset-0 transition-[opacity,filter] duration-700 ${stacked || phoneStack || posterFan ? "group-hover:opacity-30 group-hover:blur-[6px]" : ""}`}>
                <GrowthCover videos={t.work.growthCover.videos} title={t.work.growthCover.title} labels={tags.length === 0} />
              </div>
            ) : (
              cover && (
                <Image
                  src={cover.src}
                  loader={loader}
                  placeholder={cover.blurDataURL ? "blur" : "empty"}
                  blurDataURL={cover.blurDataURL}
                  alt={`${t.hero.caseAlt} ${name}`}
                  fill
                  sizes={sizes}
                  className={`object-cover object-top transition-[transform,opacity,filter,object-position] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${
                    stacked || phoneStack || posterFan ? "group-hover:opacity-25 group-hover:blur-[6px]" : "group-hover:object-bottom group-hover:duration-[5s]"
                  }`}
                />
              )
            )}
            {glow && (
              <span
                aria-hidden
                className="absolute -right-1/4 -top-1/4 size-3/4 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
                style={{ background: theme.glow }}
              />
            )}
            {(stacked || phoneStack || posterFan) && (
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
              />
            )}
            {glow && (
              <motion.span aria-hidden className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glare }} />
            )}
          </div>

          {stacked && (
            <div aria-hidden className="pointer-events-none absolute inset-x-[12%] top-[62%] [transform-style:preserve-3d]">
              {previews.map((src, i) => {
                const pos = (i - slide + previews.length) % previews.length;
                return (
                  <div
                    key={src}
                    className="absolute inset-x-0 top-0 transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: hovered ? STACK[pos] : "translate3d(0,35%,1px) rotateX(20deg) scale(0.8)",
                      opacity: hovered ? (pos === previews.length - 1 && pos > 1 ? 0.6 : 1) : 0,
                      filter: hovered && pos > 0 ? `brightness(${1 - pos * 0.18})` : "none",
                      zIndex: previews.length - pos,
                      transitionDelay: hovered ? "0ms" : `${pos * 40}ms`,
                    }}
                  >
                    <div className="-translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-[0_30px_50px_-15px_rgba(0,0,0,0.75)] ring-1 ring-black/10">
                      <div className="flex items-center gap-1 border-b border-black/5 px-2.5 py-1.5">
                        <span className="size-1.5 rounded-full bg-[#ff5f57]" />
                        <span className="size-1.5 rounded-full bg-[#febc2e]" />
                        <span className="size-1.5 rounded-full bg-[#28c840]" />
                        <span className="ml-2 flex h-3.5 flex-1 items-center truncate rounded-full bg-black/5 px-2 font-mono text-[8px] text-black/45">{domain}</span>
                      </div>
                      <div className="relative aspect-[16/10]">
                        <Image src={src} loader={loader} alt="" fill sizes="(min-width: 1024px) 28vw, 85vw" className="object-cover object-top" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {posterFan && (
            <div aria-hidden className="pointer-events-none absolute left-[21%] top-[19%] aspect-[4/5] w-[58%] [transform-style:preserve-3d]">
              {previews.map((src, i) => {
                const pos = (i - slide + previews.length) % previews.length;
                return (
                  <div
                    key={`${src}-${i}`}
                    className="absolute inset-0 transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: hovered ? POSTER_FAN[pos] ?? POSTER_FAN[POSTER_FAN.length - 1] : "translate3d(0,45%,1px) rotateX(25deg) scale(0.75)",
                      opacity: hovered ? 1 : 0,
                      filter: hovered && pos > 0 ? "brightness(0.65)" : "none",
                      zIndex: previews.length - pos,
                      transitionDelay: hovered ? `${pos * 70}ms` : "0ms",
                    }}
                  >
                    <div className="relative size-full overflow-hidden rounded-md bg-white p-[3%] shadow-[0_35px_60px_-20px_rgba(0,0,0,0.8)]">
                      <div className="relative size-full overflow-hidden rounded-[3px]">
                        <Image src={src} loader={loader} alt="" fill sizes="(min-width: 1024px) 20vw, 60vw" className="object-cover" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {phoneStack && (
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[8%] top-[14%] [transform-style:preserve-3d]">
              {phones.map((phone, i) => {
                const pos = (i - slide + phones.length) % phones.length;
                return (
                  <div
                    key={phone._key}
                    className="absolute left-1/2 top-0 h-full transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: hovered ? PHONE_STACK[pos] ?? PHONE_STACK[PHONE_STACK.length - 1] : "translate3d(-50%,40%,1px) rotateX(20deg) scale(0.8)",
                      opacity: hovered ? 1 : 0,
                      filter: hovered && pos > 0 ? "brightness(0.7)" : "none",
                      zIndex: phones.length - pos,
                      transitionDelay: hovered ? `${pos * 60}ms` : "0ms",
                    }}
                  >
                    <div className="relative aspect-[9/19.5] h-full overflow-hidden rounded-[1.3rem] border-[3px] border-[#1c1c1f] bg-[#0b0a08] shadow-[0_30px_50px_-15px_rgba(0,0,0,0.75)]">
                      {phone.poster ? (
                        // eslint-disable-next-line @next/next/no-img-element -- small CDN poster inside a decorative stack
                        <img src={`${phone.poster}?w=360&auto=format`} alt="" className="absolute inset-0 size-full object-cover" />
                      ) : (
                        <div
                          className="absolute inset-0 p-3 text-white"
                          style={{ background: `radial-gradient(120% 60% at 30% 0%, ${theme.accent}aa, transparent 65%), radial-gradient(90% 50% at 80% 100%, #2a3a9b, transparent 70%), linear-gradient(180deg, #2a2112, #07080d)` }}
                        >
                          <p className="mt-[38%] font-mono text-[8px] uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
                            {phone.angle}
                          </p>
                          <p className="mt-1 font-serif text-sm leading-tight">{phone.hook}</p>
                        </div>
                      )}
                      <span className="absolute left-1/2 top-1.5 h-2.5 w-1/3 -translate-x-1/2 rounded-full bg-black" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-1.5 transition-opacity duration-300 group-hover:opacity-0">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/90 px-2.5 py-1 text-xs text-ink backdrop-blur">
                {tag}
              </span>
            ))}
          </div>

          {count > 0 && (
            <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-end gap-3 opacity-0 transition-[opacity,transform] delay-150 duration-500 [transform:translate3d(0,12px,90px)] group-hover:opacity-100 group-hover:[transform:translate3d(0,0,90px)]">
              <span aria-hidden className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur">
                <span className="flex gap-1">
                  {Array.from({ length: count }, (_, i) => (
                    <span key={i} className="h-1 w-3 overflow-hidden rounded-full bg-white/25">
                      <span
                        className="block h-full origin-left rounded-full bg-white"
                        style={{
                          transform: `scaleX(${hovered && i < slide ? 1 : 0})`,
                          animation: hovered && i === slide ? `progress ${SLIDE_MS}ms linear forwards` : undefined,
                        }}
                      />
                    </span>
                  ))}
                </span>
                {String(slide + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 px-1">
          <div>
            <h3 className="text-xl font-medium">{name}</h3>
            {sector && <p className="mt-0.5 text-sm opacity-55">{sector}</p>}
          </div>
          <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-current/15 transition-[transform,background-color,color,border-color] group-hover:-rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
            →
          </span>
        </div>
      </MotionLink>
    </div>
  );
}
