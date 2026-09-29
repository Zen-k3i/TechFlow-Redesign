"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { GrowthCover } from "../case-study/growth-cover";
import { caseStudyUrl, projectImage, type Project } from "./content";
import { useLocale } from "./locale";
import { projectDomain, projectPreviews } from "./previews";
import { projectTheme } from "./project-highlight";

const MotionLink = motion.create(Link);
const SLIDE_MS = 1600;
const spring = { stiffness: 180, damping: 18 };

// Position of each screen in the fanned stack, from front (0) to back.
const STACK = [
  "translate3d(0,0,80px) rotateZ(0deg) scale(1)",
  "translate3d(8%,-36%,45px) rotateZ(3deg) scale(0.9)",
  "translate3d(-8%,-70%,15px) rotateZ(-3deg) scale(0.8)",
];

export function ProjectCard({
  project,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  cursor = true,
  glow = true,
}: {
  project: Project;
  sizes?: string;
  /** Show the "View case" cursor bubble on hover. */
  cursor?: boolean;
  /** Show the colored glow and pointer glare gradients on hover. */
  glow?: boolean;
}) {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), spring);
  const glareX = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(my, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 55%)`;

  const growth = project.kind === "growth";
  const theme = projectTheme(project.slug);
  const previews = projectPreviews(project.slug);
  const domain = projectDomain(project.slug);
  const stacked = !growth && previews.length > 0;
  const [hovered, setHovered] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (!hovered || previews.length < 2) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % previews.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [hovered, previews.length]);

  return (
    <div className="[perspective:1100px]">
      <MotionLink
        href={caseStudyUrl(project.slug)}
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
              <GrowthCover videos={t.work.growthCover.videos} title={t.work.growthCover.title} />
            ) : (
              <>
                <Image
                  src={projectImage(project.slug)}
                  alt={`${t.hero.caseAlt} ${project.name}`}
                  fill
                  sizes={sizes}
                  className={`object-cover object-top transition-[transform,opacity,filter,object-position] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${
                    stacked ? "group-hover:opacity-25 group-hover:blur-[6px]" : "group-hover:object-bottom group-hover:duration-[5s]"
                  }`}
                />
                {glow && (
                  <span
                    aria-hidden
                    className="absolute -right-1/4 -top-1/4 size-3/4 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
                    style={{ background: theme.glow }}
                  />
                )}
                {stacked && (
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
                  />
                )}
              </>
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
                        <Image src={src} alt="" fill sizes="(min-width: 1024px) 28vw, 85vw" className="object-cover object-top" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-1.5 transition-opacity duration-300 group-hover:opacity-0">
            {project.disciplines.map((d) => (
              <span key={d} className="rounded-full bg-white/90 px-2.5 py-1 text-xs text-ink backdrop-blur">
                {t.work.disciplines[d] ?? d}
              </span>
            ))}
          </div>

          {!growth && (
            <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 opacity-0 transition-[opacity,transform] delay-150 duration-500 [transform:translate3d(0,12px,90px)] group-hover:opacity-100 group-hover:[transform:translate3d(0,0,90px)]">
              <span className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-ink shadow-lg">
                <span className="size-1.5 rounded-full" style={{ background: theme.accent }} />
                {t.hero.caseCursor}
              </span>
              {stacked && (
                <span aria-hidden className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur">
                  <span className="flex gap-1">
                    {previews.map((src, i) => (
                      <span key={src} className="h-1 w-3 overflow-hidden rounded-full bg-white/25">
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
                  {String(slide + 1).padStart(2, "0")}/{String(previews.length).padStart(2, "0")}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 px-1">
          <div>
            <h3 className="text-xl font-medium">{project.name}</h3>
            <p className="mt-0.5 text-sm opacity-55">{t.work.sectors[project.sector] ?? project.sector}</p>
          </div>
          <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-current/15 transition-[transform,background-color,color,border-color] group-hover:-rotate-45 group-hover:border-brand-deep group-hover:bg-brand-deep group-hover:text-white">
            →
          </span>
        </div>
      </MotionLink>
    </div>
  );
}
