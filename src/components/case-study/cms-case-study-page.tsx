"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { PROJECT_DETAIL_QUERY_RESULT } from "@/sanity.types";
import { headingsOf, PortableBody, safeHref, type BodyValue } from "../cms/portable-body";
import { SanityImage, type CmsImage } from "../cms/sanity-image";
import { useActiveHeading } from "../page/blocks";
import { ButtonLink, HumanActions } from "../page/ui";
import { CmsProjectCard } from "../projects/cms-project-card";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { Magnetic } from "../site/magnetic";
import { projectTheme } from "../site/project-highlight";
import { CountUp, FadeIn, RevealHeading } from "../site/reveal";

export type CmsCaseStudy = NonNullable<PROJECT_DETAIL_QUERY_RESULT>;

const BRIEF_ANCHOR = "en-bref";
const STORY_ANCHOR = "histoire";

const RESERVED = [BRIEF_ANCHOR, STORY_ANCHOR];

/** The brief is worth a section only with more than the reading time in it. */
const hasBrief = (study: CmsCaseStudy) =>
  Boolean(study.metrics?.some((m) => m.value) || study.sector || study.services?.length || study.tools?.length || study.team?.length);

const copy: Record<Locale, Record<string, string>> = {
  fr: {
    eyebrow: "Étude de cas",
    visit: "Voir le site",
    read: "Découvrir le projet",
    brief: "Le projet en bref",
    briefTitle: "L'essentiel en *10 secondes*",
    results: "Résultats",
    sector: "Secteur",
    services: "Ce que nous avons fait",
    tools: "Outils",
    team: "L'équipe TechFlow",
    reading: "Lecture",
    minutes: "min",
    story: "L'histoire",
    chapter: "Chapitre",
    visuals: "Le projet en images",
    said: "Le mot du client",
    ctaTitle: "Envie des mêmes résultats *pour votre site ?*",
    ctaText: "Réservez un appel de 30 minutes pour voir ce que nous pouvons vous apporter.",
    related: "D'autres projets",
    back: "Tous les projets",
  },
  en: {
    eyebrow: "Case study",
    visit: "Visit the site",
    read: "Explore the project",
    brief: "At a glance",
    briefTitle: "The essentials in *10 seconds*",
    results: "Results",
    sector: "Sector",
    services: "What we did",
    tools: "Tools",
    team: "The TechFlow team",
    reading: "Reading",
    minutes: "min",
    story: "The story",
    chapter: "Chapter",
    visuals: "The project in pictures",
    said: "In their words",
    ctaTitle: "Want the same results *for your site?*",
    ctaText: "Book a 30-minute call to see what we can do for you.",
    related: "More projects",
    back: "All projects",
  },
};

type Chapter = { id: string; title: string; blocks: BodyValue[number][] };

/** The body split at each h2: what comes before the first one is the intro, each h2 opens a chapter. */
function chaptersOf(body: BodyValue | null | undefined) {
  const ids = new Map(headingsOf(body).map((h) => [h.key, h]));
  const intro: BodyValue[number][] = [];
  const chapters: Chapter[] = [];
  for (const block of body ?? []) {
    const heading = ids.get(block._key);
    // A chapter titled "Histoire" or "En bref" must not take the page's own anchors.
    const id = heading && (RESERVED.includes(heading.id) ? `chapitre-${heading.id}` : heading.id);
    if (heading && id) chapters.push({ id, title: heading.title, blocks: [] });
    else (chapters.at(-1)?.blocks ?? intro).push(block);
  }
  return { intro, chapters };
}

/** The mosaic's centre screen leads, the other screens follow. */
function screensOf(study: CmsCaseStudy) {
  const images = (study.gallery ?? []).filter((img) => img?.asset);
  const main = images.length === 9 ? images[4] : (images[0] ?? study.coverImage);
  const sides = images.filter((img) => img !== main);
  return main?.asset ? [main, ...sides] : sides;
}

const domainOf = (url: string | undefined) => url?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/**
 * Case study template, built so a client gets the point before reading a line: an animated
 * hero with the site's screens, the project in 10 seconds (results and facts), then the story
 * in numbered chapters with the visuals between them, the client's words and a closing call.
 * Everything comes from the Sanity project; blocks without content are left out.
 */
export function CmsCaseStudyPage({ study }: { study: CmsCaseStudy }) {
  const { lang } = useLocale();
  const c = copy[lang];
  const theme = projectTheme(study.slug ?? "");
  const { intro, chapters } = useMemo(() => chaptersOf(study.body), [study.body]);
  const storyRef = useRef<HTMLElement>(null);

  // Visuals sit two by two between chapters; the rest close the story.
  const showcase = (study.showcase ?? []).filter((img) => img?.asset);
  const breaks = chapters.slice(0, -1).map((_, i) => showcase.slice(i * 2, i * 2 + 2));
  const rest = showcase.slice(breaks.flat().length);

  return (
    <div style={{ "--accent": theme.accent, "--glow": theme.glow } as CSSProperties}>
      <Hero study={study} />
      <Brief study={study} />

      <section id={STORY_ANCHOR} ref={storyRef} className="scroll-mt-20 bg-paper px-5 py-24 text-ink md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand-deep">{c.story}</p>
          {intro.length > 0 && (
            <FadeIn className="mt-6 max-w-4xl [&_p]:font-serif [&_p]:text-[clamp(1.6rem,2.6vw,2.4rem)] [&_p]:leading-[1.2] [&_p]:text-ink [&_p:first-child]:mt-0">
              <PortableBody value={intro} />
            </FadeIn>
          )}

          <div className="mt-20 space-y-24 md:mt-28 md:space-y-36">
            {chapters.map((chapter, i) => (
              <div key={chapter.id}>
                <ChapterBlock chapter={chapter} index={i} label={c.chapter} lang={lang} />
                {breaks[i]?.length > 0 && <VisualBreak images={breaks[i]} title={study.title ?? ""} />}
              </div>
            ))}
          </div>

          {rest.length > 0 && (
            <div className="mt-24 border-t border-ink/10 pt-16 md:mt-36">
              <p className="eyebrow text-brand-deep">{c.visuals}</p>
              {/* Masonry, so mockups, phone screens and portraits all show whole. */}
              <div className="mt-8 gap-4 sm:columns-2 lg:columns-3">
                {rest.map((img, i) => (
                  <FadeIn key={`${img._key}-${i}`} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid">
                    <SanityImage
                      image={img}
                      alt={img.alt ?? study.title ?? ""}
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full rounded-2xl border border-ink/10 bg-white"
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Quote study={study} />
      <Closing study={study} />
      {chapters.length > 1 && <ChapterNav chapters={chapters} target={storyRef} />}
    </div>
  );
}

// ------------------------------------------------------------------ hero

/**
 * Pitch on the left, and on the right a deck of the site's screens that deals itself in,
 * follows the cursor and brings a new screen to the front every few seconds.
 */
function Hero({ study }: { study: CmsCaseStudy }) {
  const { lang, t } = useLocale();
  const c = copy[lang];
  const still = useReducedMotion() ?? false;
  const website = safeHref(study.websiteUrl);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section className="grain relative flex min-h-svh flex-col overflow-hidden bg-night px-5 pb-16 pt-32 text-white md:px-10 md:pb-20">
      <Aurora still={still} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_60%_at_60%_40%,black,transparent)]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12">
        <motion.nav aria-label="Breadcrumb" {...reveal(0)} className="eyebrow flex flex-wrap items-center gap-2 text-white/45">
          <Link href={href(lang, "home")} className="hover:text-white">
            {t.common.breadcrumbHome}
          </Link>
          <span aria-hidden>/</span>
          <Link href={href(lang, "projects")} className="hover:text-white">
            {t.nav.pages.projects}
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page" className="text-white/75">
            {study.title}
          </span>
        </motion.nav>

        <div className="grid flex-1 items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
          <div>
            <motion.div {...reveal(0.1)} className="flex items-center gap-4">
              <ClientLogo image={study.logo} name={study.title ?? ""} fill={study.logoFill} />
              <span className="flex flex-col gap-1.5">
                <span className="eyebrow flex items-center gap-2 text-[var(--accent)]">
                  <span className="relative flex size-2">
                    {!still && <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />}
                    <span className="relative size-2 rounded-full bg-[var(--accent)]" />
                  </span>
                  {c.eyebrow}
                </span>
                {study.sector && <span className="eyebrow text-white/50">{study.sector}</span>}
              </span>
            </motion.div>

            <RevealHeading
              as="h1"
              text={study.title ?? ""}
              className="mt-8 font-serif text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.9] tracking-[-0.03em]"
            />

            {study.summary && (
              <motion.p {...reveal(0.4)} className="mt-8 max-w-xl text-lg text-white/70 md:text-xl">
                {study.summary}
              </motion.p>
            )}

            {study.services && study.services.length > 0 && (
              <motion.ul {...reveal(0.5)} className="mt-6 flex flex-wrap gap-2 text-sm">
                {study.services.map((s) => (
                  <li key={s} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-white/80">
                    {s}
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.div {...reveal(0.6)} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <ButtonLink href={`#${hasBrief(study) ? BRIEF_ANCHOR : STORY_ANCHOR}`}>{c.read}</ButtonLink>
              </Magnetic>
              {website && (
                <ButtonLink href={website} external variant="outline">
                  {c.visit}
                </ButtonLink>
              )}
            </motion.div>
          </div>

          <ScreenDeck screens={screensOf(study).slice(0, 5)} domain={domainOf(website)} title={study.title ?? ""} still={still} />
        </div>
      </div>
    </section>
  );
}

/** Two blurred pools of the project's colour drifting slowly behind the hero. */
function Aurora({ still }: { still: boolean }) {
  const drift = (x: string[], y: string[], duration: number) =>
    still ? {} : { animate: { x, y }, transition: { duration, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const } };
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        {...drift(["0%", "-12%", "6%"], ["0%", "10%", "-6%"], 14)}
        className="absolute -right-[10%] -top-[20%] size-[70vmax] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_30%,transparent),transparent)] blur-2xl"
      />
      <motion.div
        {...drift(["0%", "14%", "-4%"], ["0%", "-8%", "6%"], 18)}
        className="absolute -bottom-[30%] -left-[15%] size-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgba(21,37,112,0.7),transparent)] blur-2xl"
      />
    </div>
  );
}

/** Where each card of the deck sits, front card first. */
const SLOTS = [
  { x: "0%", y: "0%", rotate: 0, scale: 1, opacity: 1 },
  { x: "22%", y: "-14%", rotate: 5, scale: 0.84, opacity: 0.85 },
  { x: "-22%", y: "-12%", rotate: -6, scale: 0.8, opacity: 0.75 },
  { x: "36%", y: "-26%", rotate: 9, scale: 0.68, opacity: 0.45 },
  { x: "-36%", y: "-24%", rotate: -10, scale: 0.66, opacity: 0.4 },
];

function ScreenDeck({ screens, domain, title, still }: { screens: CmsImage[]; domain?: string; title: string; still: boolean }) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const n = screens.length;

  useEffect(() => {
    if (still || paused || n < 2) return;
    const id = setInterval(() => setStep((s) => s + 1), 3800);
    return () => clearInterval(id);
  }, [still, paused, n]);

  if (n === 0) return null;

  return (
    <div
      aria-hidden
      onPointerMove={(e) => {
        if (still || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        mx.set(0);
        my.set(0);
      }}
      className="relative aspect-[5/4] w-full [perspective:1400px] sm:aspect-[16/11]"
    >
      <motion.div style={{ rotateX, rotateY }} className="absolute inset-0">
        {/* Glow under the front card. */}
        <div className="absolute inset-x-[15%] bottom-[8%] h-1/3 rounded-full bg-[var(--glow)] blur-3xl" />
        {screens.map((img, i) => {
          const slot = (((i - step) % n) + n) % n;
          const pose = SLOTS[slot] ?? SLOTS[SLOTS.length - 1];
          const front = slot === 0;
          return (
            <motion.div
              key={i}
              initial={still ? false : { opacity: 0, y: "60%", rotate: 0, scale: 0.9 }}
              animate={pose}
              transition={
                step === 0
                  ? { duration: 1.1, delay: 0.5 + (n - slot) * 0.12, ease }
                  : { type: "spring", stiffness: 90, damping: 18 }
              }
              style={{ zIndex: 10 - slot }}
              className="absolute bottom-[9%] left-[8%] w-[84%] overflow-hidden rounded-xl bg-night-soft shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
            >
              <div className="flex h-6 items-center gap-1.5 border-b border-white/10 bg-white/[0.06] px-3 md:h-7">
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
                {domain && front && (
                  <span className="mx-auto truncate rounded-full bg-white/10 px-3 text-[10px] leading-4 text-white/60 md:text-[11px]">{domain}</span>
                )}
              </div>
              <div className="relative aspect-[16/10]">
                <SanityImage
                  image={img}
                  alt={img?.alt ?? title}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover object-top"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {n > 1 && (
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5">
          {screens.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${(((step % n) + n) % n) === i ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-white/25"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Client logo, large: logos with their own background fill their tile edge to edge,
 * transparent ones sit on a white card sized to the logo.
 */
function ClientLogo({ image, name, fill }: { image: CmsImage | undefined; name: string; fill: boolean }) {
  if (!image?.asset) return null;
  const dims = image.asset.metadata?.dimensions;
  const ratio = dims?.width && dims?.height ? dims.width / dims.height : 3;
  const shadow = "shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10";

  if (fill) {
    return (
      <span style={{ aspectRatio: Math.min(ratio, 4) }} className={`relative h-14 shrink-0 overflow-hidden rounded-2xl md:h-16 ${shadow}`}>
        <SanityImage image={image} alt={name} fill width={480} sizes="260px" className="object-cover" />
      </span>
    );
  }
  return (
    <span
      className={`flex h-14 shrink-0 items-center justify-center rounded-2xl bg-white px-5 md:h-16 md:px-6 ${ratio < 1.4 ? "aspect-square px-2.5 md:px-2.5" : ""} ${shadow}`}
    >
      <SanityImage image={image} alt={name} width={480} sizes="200px" className="h-7 w-auto max-w-[10rem] object-contain md:h-8 md:max-w-[12rem]" />
    </span>
  );
}

// ------------------------------------------------------------------ brief

/** Columns per number of key figures, so no cell is ever left empty. */
const GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** The results first, then who, what and with which tools: scannable without reading the story. */
function Brief({ study }: { study: CmsCaseStudy }) {
  const { lang } = useLocale();
  const c = copy[lang];
  const metrics = (study.metrics ?? []).filter((m) => m.value);
  const services = study.services ?? [];
  const tools = study.tools ?? [];
  const team = study.team ?? [];
  if (!hasBrief(study)) return null;
  const cell = "border-t border-white/15 pt-5";
  const label = "eyebrow text-white/45";

  return (
    <section id={BRIEF_ANCHOR} className="scroll-mt-20 bg-night px-5 pb-24 pt-8 text-white md:px-10 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-[var(--accent)]">{c.brief}</p>
            <RevealHeading text={c.briefTitle} accentClassName="italic text-[var(--accent)]" className="mt-4 font-serif text-5xl leading-none md:text-6xl" />
          </div>
        </div>

        {metrics.length > 0 && (
          <dl className={`mt-14 grid gap-4 ${GRID[Math.min(metrics.length, 4)]}`}>
            {metrics.map((m, i) => (
              <FadeIn
                key={m._key}
                delay={i * 0.1}
                className="flex h-full flex-col-reverse justify-end rounded-3xl bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] p-8 ring-1 ring-[color-mix(in_oklab,var(--accent)_30%,transparent)]"
              >
                <dt className="mt-4 max-w-xs text-lg leading-snug text-white/70">{m.label}</dt>
                <dd className="font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.85] tracking-[-0.03em] text-[var(--accent)]">
                  <CountUp value={m.value ?? ""} />
                </dd>
              </FadeIn>
            ))}
          </dl>
        )}

        <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {study.sector && (
            <FadeIn className={cell}>
              <dt className={label}>{c.sector}</dt>
              <dd className="mt-3 font-serif text-3xl">{study.sector}</dd>
            </FadeIn>
          )}

          {services.length > 0 && (
            <FadeIn delay={0.05} className={cell}>
              <dt className={label}>{c.services}</dt>
              <dd>
                <ul className="mt-3 space-y-1.5">
                  {services.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-lg">
                      <span aria-hidden className="size-1.5 rounded-full bg-[var(--accent)]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </FadeIn>
          )}

          {tools.length > 0 && (
            <FadeIn delay={0.1} className={cell}>
              <dt className={label}>{c.tools}</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Link
                    key={tool._id}
                    href={href(lang, "tools", tool.slug ?? "")}
                    className="flex items-center gap-2 rounded-full border border-white/15 py-1 pl-1 pr-3.5 text-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {/* CMS tool logos are coloured, so they sit on white. */}
                    <span className="flex size-7 items-center justify-center rounded-full bg-white">
                      <SanityImage image={tool.logo} alt="" width={80} sizes="16px" className="size-4 object-contain" />
                    </span>
                    {tool.title}
                  </Link>
                ))}
              </dd>
            </FadeIn>
          )}

          <FadeIn delay={0.15} className={cell}>
            <dt className={label}>{c.reading}</dt>
            <dd className="mt-3 font-serif text-3xl">
              {Math.max(1, study.minutes)} {c.minutes}
            </dd>
          </FadeIn>

          {team.length > 0 && (
            <FadeIn delay={0.2} className={`${cell} sm:col-span-2`}>
              <dt className={label}>{c.team}</dt>
              <dd className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                {team.map((member) => (
                  <div key={member._id} className="flex items-center gap-3">
                    <Avatar image={member.photo} name={member.name ?? ""} size="sm" />
                    <span className="leading-tight">
                      <span className="block text-sm font-medium">{member.name}</span>
                      <span className="block text-xs text-white/50">{member.role}</span>
                    </span>
                  </div>
                ))}
              </dd>
            </FadeIn>
          )}
        </dl>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------ story

/** One chapter of the story: a big number and title that stay pinned while its text scrolls. */
function ChapterBlock({ chapter, index, label, lang }: { chapter: Chapter; index: number; label: string; lang: Locale }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <section id={chapter.id} aria-labelledby={`${chapter.id}-title`} className="grid scroll-mt-28 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <FadeIn>
          <p className="eyebrow flex items-center gap-3 text-ink/45">
            <span aria-hidden className="h-px w-8 bg-[var(--accent)]" />
            {label} {number}
          </p>
          <div className="mt-4 flex items-start gap-5">
            <span aria-hidden className="font-serif text-[clamp(4rem,8vw,7rem)] leading-[0.8] text-ink/10">
              {number}
            </span>
            <h2 id={`${chapter.id}-title`} className="pt-1 font-serif text-4xl leading-[1.02] md:text-5xl">
              {chapter.title}
            </h2>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={0.1}>
        <article lang={lang} className="max-w-2xl [&>*:first-child]:mt-0">
          <PortableBody value={chapter.blocks} />
        </article>
      </FadeIn>
    </section>
  );
}

/** One or two visuals between chapters, shown whole whatever their ratio. */
function VisualBreak({ images, title }: { images: NonNullable<CmsCaseStudy["showcase"]>; title: string }) {
  return (
    <div className={`mt-20 grid items-center gap-4 md:mt-28 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {images.map((img, i) => {
        const dims = img.asset?.metadata?.dimensions;
        const ratio = dims?.width && dims?.height ? dims.width / dims.height : 16 / 10;
        return (
          // Tall visuals are capped at 80vh by narrowing them, so they keep a size before they load.
          <FadeIn key={`${img._key}-${i}`} delay={i * 0.1}>
            <div style={{ maxWidth: `calc(80vh * ${ratio.toFixed(3)})` }} className="mx-auto">
              <SanityImage
                image={img}
                alt={img.alt ?? title}
                sizes={images.length > 1 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1280px) 1280px, 100vw"}
                className="h-auto w-full rounded-3xl border border-ink/10"
              />
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

/** Floating pill that shows where the reader is in the story and jumps between chapters. */
function ChapterNav({ chapters, target }: { chapters: Chapter[]; target: React.RefObject<HTMLElement | null> }) {
  const [ids] = useState(() => chapters.map((ch) => ch.id));
  const active = useActiveHeading(ids);
  const inView = useInView(target, { margin: "-40% 0px -40% 0px" });
  const { scrollYProgress } = useScroll({ target, offset: ["start center", "end center"] });
  const activeIndex = Math.max(0, ids.indexOf(active));

  return (
    <AnimatePresence>
      {inView && (
        <motion.nav
          aria-label="Chapters"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:bottom-6"
        >
          <div className="relative overflow-hidden rounded-full bg-night/90 p-1.5 text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-md">
            <ol className="flex items-center gap-1">
              {chapters.map((ch, i) => {
                const on = i === activeIndex;
                return (
                  <li key={ch.id} className={on ? "" : "max-sm:hidden"}>
                    <a
                      href={`#${ch.id}`}
                      aria-current={on ? "step" : undefined}
                      className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm transition-colors ${on ? "bg-white text-night" : "text-white/60 hover:text-white"}`}
                    >
                      <span className={`font-mono text-xs ${on ? "text-night/50" : "text-white/35"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="max-w-[16ch] truncate">{ch.title}</span>
                    </a>
                  </li>
                );
              })}
              <li aria-hidden className="px-2 font-mono text-xs text-white/40 sm:hidden">
                / {String(chapters.length).padStart(2, "0")}
              </li>
            </ol>
            <motion.span aria-hidden style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[var(--accent)]" />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

// ------------------------------------------------------------------ quote & closing

/** Imported French quotes start with the author's name and role; keep only what they said. */
function cleanQuote(quote: string, name?: string | null, role?: string | null) {
  let q = quote.trim();
  for (const prefix of [name, role]) if (prefix && q.startsWith(prefix)) q = q.slice(prefix.length).trim();
  return q.replace(/^["“«]\s*|\s*["”»]$/g, "");
}

/** The client's words on a card in the project's colour, each word rising in as it scrolls into view. */
function Quote({ study }: { study: CmsCaseStudy }) {
  const { lang } = useLocale();
  const c = copy[lang];
  const t = study.testimonial;
  if (!t?.quote) return null;
  const words = cleanQuote(t.quote, t.name, t.role).split(/\s+/);

  return (
    <section className="bg-paper px-5 pb-24 text-ink md:px-10 md:pb-32">
      <figure className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[var(--accent)] px-6 py-14 text-night md:px-16 md:py-20">
        <span aria-hidden className="pointer-events-none absolute -right-4 -top-16 font-serif text-[20rem] leading-none text-night/10 md:text-[28rem]">
          &rdquo;
        </span>
        <p className="eyebrow relative text-night/60">{c.said}</p>
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ staggerChildren: 0.02 }}
          className="relative mt-8 max-w-5xl font-serif text-[clamp(1.9rem,3.4vw,3.25rem)] leading-[1.1] tracking-[-0.01em]"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span variants={{ hidden: { y: "110%" }, visible: { y: 0 } }} transition={{ duration: 0.7, ease }} className="inline-block">
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </motion.blockquote>
        <FadeIn delay={0.3}>
          <figcaption className="relative mt-10 flex items-center gap-4">
            <Avatar image={t.photo} name={t.name ?? ""} />
            <span>
              <span className="block font-medium">{t.name}</span>
              <span className="block text-sm text-night/60">{t.role}</span>
            </span>
          </figcaption>
        </FadeIn>
      </figure>
    </section>
  );
}

/** Dark close: the invitation full width, then the next projects to read. */
function Closing({ study }: { study: CmsCaseStudy }) {
  const { lang } = useLocale();
  const c = copy[lang];

  return (
    <section className="grain relative overflow-hidden bg-night px-5 pb-28 pt-28 text-white md:px-10 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(45%_60%_at_50%_0%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <RevealHeading
            text={c.ctaTitle}
            accentClassName="italic text-[var(--accent)]"
            className="max-w-5xl font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em]"
          />
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-white/60">{c.ctaText}</p>
            <div className="mt-10 flex justify-center">
              <HumanActions />
            </div>
          </FadeIn>
        </div>

        {study.related.length > 0 && (
          <div className="mt-28 border-t border-white/10 pt-16 md:mt-40">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-serif text-5xl md:text-6xl">{c.related}</h2>
              <Link href={href(lang, "projects")} className="text-white/60 underline-offset-4 hover:text-white hover:underline">
                ← {c.back}
              </Link>
            </div>
            <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {study.related.map((p, i) => (
                <FadeIn key={p._id} delay={i * 0.08}>
                  <li>
                    <CmsProjectCard project={p} />
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function Avatar({ image, name, size = "md" }: { image: CmsImage | undefined; name: string; size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-9" : "size-12";
  if (!image?.asset) {
    return <span className={`flex ${box} shrink-0 items-center justify-center rounded-full bg-brand-deep font-serif text-white`}>{name[0]}</span>;
  }
  return (
    <span className={`relative ${box} shrink-0 overflow-hidden rounded-full bg-ink/5`}>
      <SanityImage image={image} alt="" fill width={144} sizes="48px" className="object-cover object-top" />
    </span>
  );
}
