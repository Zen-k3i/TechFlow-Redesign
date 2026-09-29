"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { PROJECT_DETAIL_QUERY_RESULT } from "@/sanity.types";
import { headingsOf, PortableBody, safeHref } from "../cms/portable-body";
import { SanityImage, type CmsImage } from "../cms/sanity-image";
import { Toc } from "../page/blocks";
import { HumanActions } from "../page/ui";
import { CmsProjectCard } from "../projects/cms-project-card";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";

export type CmsCaseStudy = NonNullable<PROJECT_DETAIL_QUERY_RESULT>;

const copy: Record<Locale, Record<string, string>> = {
  fr: {
    eyebrow: "Étude de cas",
    minutes: "min de lecture",
    visit: "Voir le site",
    results: "Résultats",
    facts: "Fiche projet",
    client: "Client",
    sector: "Secteur",
    services: "Services",
    tools: "Outils",
    team: "L'équipe TechFlow",
    toc: "Sommaire",
    visuals: "Le projet en images",
    ctaTitle: "Envie des mêmes résultats *pour votre site ?*",
    ctaText: "Réservez un appel de 30 minutes pour voir ce que nous pouvons vous apporter.",
    related: "D'autres projets",
    back: "Tous les projets",
  },
  en: {
    eyebrow: "Case study",
    minutes: "min read",
    visit: "Visit the site",
    results: "Results",
    facts: "Project facts",
    client: "Client",
    sector: "Sector",
    services: "Services",
    tools: "Tools",
    team: "The TechFlow team",
    toc: "Contents",
    visuals: "The project in pictures",
    ctaTitle: "Want the same results *for your site?*",
    ctaText: "Book a 30-minute call to see what we can do for you.",
    related: "More projects",
    back: "All projects",
  },
};

/**
 * Case study stored in the CMS, read like an insight article: a dark hero, the header
 * mosaic, key results, then the story on paper with a sticky project sheet beside it.
 */
export function CmsCaseStudyPage({ study }: { study: CmsCaseStudy }) {
  const { lang } = useLocale();
  const c = copy[lang];
  const headings = headingsOf(study.body);
  const showcase = study.showcase ?? [];

  return (
    <>
      <Hero study={study} />
      <Gallery study={study} />
      <Results study={study} />

      <section className="bg-night px-5 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-paper px-6 py-16 text-ink md:rounded-[3.5rem] md:px-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr] xl:gap-20">
            {/* The facts scroll away; the contents then stay pinned for the rest of the story. */}
            <aside className="flex flex-col">
              <ProjectFacts study={study} />
              {headings.length > 0 && (
                <div className="mt-10 hidden flex-1 lg:block">
                  <Toc label={c.toc} items={headings} />
                </div>
              )}
            </aside>

            <article lang={lang} className="min-w-0 max-w-3xl">
              <PortableBody value={study.body} />

              {study.testimonial?.quote && (
                <FadeIn>
                  <figure className="relative mt-20 overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-8 md:p-12">
                    <span aria-hidden className="absolute -top-6 right-6 font-serif text-[10rem] leading-none text-brand/10 md:right-10">
                      &rdquo;
                    </span>
                    <blockquote className="relative font-serif text-2xl leading-snug md:text-[2rem]">&ldquo;{study.testimonial.quote}&rdquo;</blockquote>
                    <figcaption className="relative mt-8 flex items-center gap-4">
                      <Avatar image={study.testimonial.photo} name={study.testimonial.name ?? ""} />
                      <span>
                        <span className="block font-medium">{study.testimonial.name}</span>
                        <span className="block text-sm text-ink/55">{study.testimonial.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </FadeIn>
              )}

              {showcase.length > 0 && (
                <div className="mt-20">
                  <p className="eyebrow text-brand-deep">{c.visuals}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {showcase.map((img, i) => (
                      <FadeIn key={img._key} delay={(i % 2) * 0.06} className={i === 0 || showcase.length === 1 ? "sm:col-span-2" : ""}>
                        <SanityImage
                          image={img}
                          sizes={i === 0 ? "(min-width: 768px) 768px, 100vw" : "(min-width: 768px) 380px, 100vw"}
                          className="h-auto w-full rounded-2xl border border-ink/10 bg-white"
                        />
                      </FadeIn>
                    ))}
                  </div>
                </div>
              )}

              <FadeIn className="mt-20 overflow-hidden rounded-[2rem] bg-night p-8 text-white md:p-12">
                <RevealHeading text={c.ctaTitle} accentClassName="italic text-brand-sky" className="font-serif text-4xl leading-[1.02] md:text-5xl" />
                <p className="mt-4 max-w-lg text-white/60">{c.ctaText}</p>
                <div className="mt-8">
                  <HumanActions />
                </div>
              </FadeIn>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-night px-5 py-28 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-5xl md:text-6xl">{c.related}</h2>
            <Link href={href(lang, "projects")} className="text-white/60 underline-offset-4 hover:text-white hover:underline">
              ← {c.back}
            </Link>
          </div>
          {study.related.length > 0 && (
            <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {study.related.map((p, i) => (
                <FadeIn key={p._id} delay={i * 0.08}>
                  <li>
                    <CmsProjectCard project={p} />
                  </li>
                </FadeIn>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function Hero({ study }: { study: CmsCaseStudy }) {
  const { lang, t } = useLocale();
  const c = copy[lang];
  const website = safeHref(study.websiteUrl);
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section className="grain relative overflow-hidden bg-night px-5 pb-16 pt-32 text-white md:px-10 md:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_85%_10%,rgba(71,102,255,0.28),transparent_70%)]" />
      <div className="relative mx-auto max-w-5xl">
        <motion.nav aria-label="Breadcrumb" {...reveal(0)} className="eyebrow flex flex-wrap items-center gap-2 text-white/40">
          <Link href={href(lang, "home")} className="hover:text-white">
            {t.common.breadcrumbHome}
          </Link>
          <span aria-hidden>/</span>
          <Link href={href(lang, "projects")} className="hover:text-white">
            {t.nav.pages.projects}
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page" className="text-white/70">
            {study.title}
          </span>
        </motion.nav>

        <motion.div {...reveal(0.05)} className="mt-10 flex items-center gap-3">
          {study.logo?.asset && (
            <span className="flex size-11 items-center justify-center rounded-xl bg-white p-2">
              <SanityImage image={study.logo} alt={study.title ?? ""} width={160} sizes="44px" className="size-full object-contain" />
            </span>
          )}
          <span className="eyebrow text-brand-sky">
            {c.eyebrow}
            {study.sector && <span className="text-white/40"> · {study.sector}</span>}
          </span>
        </motion.div>

        <RevealHeading as="h1" text={study.title ?? ""} className="mt-6 font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em]" />

        {study.summary && (
          <motion.p {...reveal(0.2)} className="mt-6 max-w-3xl text-lg text-white/65 md:text-xl">
            {study.summary}
          </motion.p>
        )}

        <motion.div {...reveal(0.3)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/55">
          {study.services?.map((s) => (
            <span key={s} className="rounded-full bg-brand-sky/15 px-3 py-1 text-brand-sky">
              {s}
            </span>
          ))}
          {study.minutes > 0 && (
            <span>
              {Math.max(1, study.minutes)} {c.minutes}
            </span>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 py-1 pl-4 pr-1 text-white transition-colors hover:border-brand hover:bg-brand"
            >
              {c.visit}
              <span aria-hidden className="flex size-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:-rotate-45">
                →
              </span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * 3×3 mosaic of the project's screens that starts zoomed on its centre image and pulls back
 * as you scroll. Falls back to a single cover image.
 */
function Gallery({ study }: { study: CmsCaseStudy }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // At 3.2× the centre cell (plus its gaps) spans the container.
  const scale = useTransform(scrollYProgress, [0, 0.8], still ? [1, 1] : [3.2, 1]);
  const images = (study.gallery ?? []).filter((img) => img !== null);

  if (images.length < 9) {
    const cover = images[0] ?? study.coverImage;
    return (
      <div className="bg-night px-5 pb-20 md:px-10">
        <div className="relative mx-auto aspect-[16/9] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-black">
          <SanityImage image={cover} alt={study.title ?? ""} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-night">
      {/* Phones and small tablets: the centre column, stacked. */}
      <div className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 md:hidden">
        {[1, 4, 7].map((i) => (
          <div key={images[i]._key ?? i} className="relative aspect-[1.42] overflow-hidden rounded-2xl bg-black">
            <SanityImage image={images[i]} alt={images[i].alt ?? study.title ?? ""} fill priority={i === 4} sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div ref={ref} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-[5.5rem] flex h-[calc(100vh-5.5rem)] items-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-12">
            <motion.div style={{ scale }} className="grid origin-center grid-cols-3 gap-4 will-change-transform">
              {images.map((img, i) => (
                <div key={img._key ?? i} className="relative aspect-[1.42] overflow-hidden rounded-xl bg-black">
                  <SanityImage
                    image={img}
                    alt={img.alt ?? study.title ?? ""}
                    fill
                    priority={i === 4}
                    sizes={i === 4 ? "(min-width: 1152px) 1152px, 100vw" : "(min-width: 1152px) 360px, 33vw"}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Columns per number of key figures, so no cell is ever left empty. */
const GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

/** Key figures, big and first, before the story explains them. */
function Results({ study }: { study: CmsCaseStudy }) {
  const { lang } = useLocale();
  const metrics = study.metrics ?? [];
  if (metrics.length === 0) return null;

  return (
    <section className="bg-night px-5 pb-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-brand-sky">{copy[lang].results}</p>
        <dl className={`mt-6 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 ${GRID[Math.min(metrics.length, 4)]}`}>
          {metrics.map((m, i) => (
            <FadeIn key={m._key} delay={i * 0.06} className="flex flex-col-reverse bg-night p-6 md:p-8">
              <dt className="mt-3 text-sm text-white/55">{m.label}</dt>
              <dd className="font-serif text-4xl leading-none md:text-6xl">{m.value}</dd>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Everything about the engagement at a glance: who, what, with which tools and people. */
function ProjectFacts({ study }: { study: CmsCaseStudy }) {
  const { lang } = useLocale();
  const c = copy[lang];
  const website = safeHref(study.websiteUrl);
  const row = "border-t border-ink/10 py-4 first:border-t-0 first:pt-0";
  const label = "eyebrow text-ink/40";

  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6">
      <p className="eyebrow text-brand-deep">{c.facts}</p>
      <dl className="mt-5">
        <div className={row}>
          <dt className={label}>{c.client}</dt>
          <dd className="mt-2 flex items-center gap-3 font-medium">
            {study.logo?.asset && (
              <span className="size-8 shrink-0">
                <SanityImage image={study.logo} alt="" width={120} sizes="32px" className="size-full object-contain" />
              </span>
            )}
            {study.title}
          </dd>
        </div>

        {study.sector && (
          <div className={row}>
            <dt className={label}>{c.sector}</dt>
            <dd className="mt-2">{study.sector}</dd>
          </div>
        )}

        {study.services && study.services.length > 0 && (
          <div className={row}>
            <dt className={label}>{c.services}</dt>
            <dd className="mt-3 flex flex-wrap gap-1.5">
              {study.services.map((s) => (
                <span key={s} className="rounded-full bg-brand-deep/10 px-3 py-1 text-sm text-brand-deep">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        )}

        {study.tools && study.tools.length > 0 && (
          <div className={row}>
            <dt className={label}>{c.tools}</dt>
            <dd className="mt-3 flex flex-wrap gap-1.5">
              {study.tools.map((tool) => (
                <Link
                  key={tool._id}
                  href={href(lang, "tools", tool.slug ?? "")}
                  className="flex items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand"
                >
                  <SanityImage image={tool.logo} alt="" width={80} sizes="16px" className="h-4 w-auto max-w-12 object-contain" />
                  {tool.title}
                </Link>
              ))}
            </dd>
          </div>
        )}

        {study.team && study.team.length > 0 && (
          <div className={row}>
            <dt className={label}>{c.team}</dt>
            <dd className="mt-3 space-y-3">
              {study.team.map((member) => (
                <div key={member._id} className="flex items-center gap-3">
                  <Avatar image={member.photo} name={member.name ?? ""} size="sm" />
                  <span className="leading-tight">
                    <span className="block text-sm font-medium">{member.name}</span>
                    <span className="block text-xs text-ink/50">{member.role}</span>
                  </span>
                </div>
              ))}
            </dd>
          </div>
        )}
      </dl>

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="group mt-2 flex h-12 items-center justify-between rounded-full bg-ink pl-5 pr-1.5 text-sm font-medium text-paper transition-colors hover:bg-brand"
        >
          {c.visit}
          <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:-rotate-45">
            →
          </span>
        </a>
      )}
    </div>
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
