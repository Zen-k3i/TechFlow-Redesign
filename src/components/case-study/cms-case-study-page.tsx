"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { PROJECT_DETAIL_QUERY_RESULT } from "@/sanity.types";
import { PortableBody, safeHref } from "../cms/portable-body";
import { SanityImage, type CmsImage } from "../cms/sanity-image";
import { CmsProjectCard } from "../projects/cms-project-card";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn } from "../site/reveal";

export type CmsCaseStudy = NonNullable<PROJECT_DETAIL_QUERY_RESULT>;

const copy: Record<Locale, Record<string, string>> = {
  fr: {
    back: "Tous les projets",
    prefix: "Case Study :",
    sector: "Secteur :",
    visit: "Voir le site",
    services: "Services",
    tools: "Outil(s)",
    team: "Équipe",
    ctaTitle: "Envie des mêmes résultats pour votre site ?",
    ctaText: "Réservez un appel de 30 minutes pour voir ce que nous pouvons vous apporter.",
    ctaLink: "Parler à un humain",
    related: "Nos réalisations",
  },
  en: {
    back: "All projects",
    prefix: "Case Study:",
    sector: "Sector:",
    visit: "Visit the site",
    services: "Services",
    tools: "Tool(s)",
    team: "Team",
    ctaTitle: "Want the same results for your site?",
    ctaText: "Book a 30-minute call to see what we can do for you.",
    ctaLink: "Talk to a human",
    related: "Our work",
  },
};

/** Case study stored in the CMS, laid out like techflow-agency.com/projets/kretz-club. */
export function CmsCaseStudyPage({ study }: { study: CmsCaseStudy }) {
  const { lang } = useLocale();
  const c = copy[lang];

  return (
    <div className="bg-white text-[#1b1b1b]">
      {/* The navbar is transparent until scrolled; the live site sits it on a black band. */}
      <div aria-hidden className="h-24 bg-night md:h-[6.2rem]" />

      <header className="mx-auto max-w-6xl px-5 pt-6 md:px-12">
        <Link href={href(lang, "projects")} className="inline-flex items-center gap-2 text-sm text-black/70 transition-colors hover:text-black">
          <span aria-hidden>‹</span> {c.back}
        </Link>
        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[clamp(2.6rem,5.5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-black"
          >
            <span className="text-black/35">{c.prefix} </span>
            {study.title}
          </motion.h1>
          {study.summary && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="text-xl leading-7 text-[#060808]"
            >
              {study.summary}
            </motion.p>
          )}
        </div>
      </header>

      <Gallery study={study} />

      <section className="bg-linear-to-b from-white to-[#fff4de] pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-4 md:grid-cols-[16rem_1fr] md:gap-12 md:px-12">
          <Sidebar study={study} />

          <article lang={lang} className="min-w-0 max-w-[42rem] pt-4">
            <PortableBody value={study.body} variant="case" />

            {study.testimonial?.quote && (
              <figure className="mt-14 rounded border border-[#d0d1d3] bg-white p-6 md:p-8">
                <blockquote className="font-serif text-2xl leading-snug text-black">“{study.testimonial.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <Avatar image={study.testimonial.photo} name={study.testimonial.name ?? ""} />
                  <span>
                    <span className="block font-medium">{study.testimonial.name}</span>
                    <span className="block text-sm text-[#454750]">{study.testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            )}

            {study.showcase && study.showcase.length > 0 && (
              <div className="mt-14 grid gap-4">
                {study.showcase.map((img) => (
                  <SanityImage key={img._key} image={img} sizes="(min-width: 768px) 42rem, 100vw" className="h-auto w-full" />
                ))}
              </div>
            )}

            <div className="mt-14 rounded border-2 border-dashed border-[#2531ae] bg-[#ddeaff] p-5 md:p-6">
              <h2 className="font-serif text-[2.25rem] font-light leading-tight tracking-[-0.03em] text-[#2a37d8]">{c.ctaTitle}</h2>
              <p className="mt-4 text-[#454750]">{c.ctaText}</p>
              <BookingLink label={c.ctaLink} className="mt-6" />
            </div>
          </article>
        </div>
      </section>

      {study.related.length > 0 && (
        <section className="bg-linear-to-b from-[#f5f0e6] to-white px-5 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-serif text-5xl leading-none tracking-[-0.02em] text-black md:text-6xl">{c.related}</h2>
            <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-3">
              {study.related.map((p, i) => (
                <FadeIn key={p._id} delay={i * 0.08}>
                  <li>
                    <CmsProjectCard project={p} />
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

/**
 * 3×3 image grid that starts zoomed on its centre image and pulls back as you scroll,
 * like the live case study header. Falls back to a single cover image.
 */
function Gallery({ study }: { study: CmsCaseStudy }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // At 3.2× the centre cell (plus its gaps) spans the container, as on the live page.
  const scale = useTransform(scrollYProgress, [0, 0.8], still ? [1, 1] : [3.2, 1]);
  const images = study.gallery ?? [];

  if (images.length < 9) {
    const cover = images[0] ?? study.coverImage;
    return (
      <div className="mx-auto mt-10 max-w-6xl px-5 md:px-12">
        <div className="relative aspect-[16/9] overflow-hidden bg-black">
          <SanityImage image={cover} alt={study.title ?? ""} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Phones and small tablets: the centre column, stacked. */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-4 px-5 md:hidden">
        {[1, 4, 7].map((i) => (
          <div key={images[i]._key} className="relative aspect-[1.42] overflow-hidden bg-black">
            <SanityImage image={images[i]} alt={images[i].alt ?? study.title ?? ""} fill priority={i === 4} sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div ref={ref} className="relative mt-10 hidden h-[300vh] md:block">
        <div className="sticky top-[5.5rem] flex h-[calc(100vh-5.5rem)] items-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-12">
            <motion.div style={{ scale }} className="grid origin-center grid-cols-3 gap-4 will-change-transform">
              {images.map((img, i) => (
                <div key={img._key} className="relative aspect-[1.42] overflow-hidden bg-black">
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
    </>
  );
}

function Sidebar({ study }: { study: CmsCaseStudy }) {
  const { lang } = useLocale();
  const c = copy[lang];
  const card = "rounded border border-[#d0d1d3] bg-white/60 p-5";

  return (
    <aside className="flex flex-col gap-2 md:sticky md:top-24 md:self-start md:pb-8">
      <div className={card}>
        {study.logo?.asset && (
          <div className="mb-3 size-[50px]">
            <SanityImage image={study.logo} alt={study.title ?? ""} width={200} sizes="50px" className="size-full object-contain" />
          </div>
        )}
        {study.sector && (
          <p className="mb-3 text-[#1b1b1b]">
            {c.sector} {study.sector}
          </p>
        )}
        {study.metrics && study.metrics.length > 0 && (
          <dl className="grid gap-2 py-1">
            {study.metrics.map((m) => (
              <div key={m._key} className="flex gap-2">
                <dt className="shrink-0 text-xl leading-7 text-[#1b1b1b]">{m.value}</dt>
                <dd className="text-[#454750]">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}
        {safeHref(study.websiteUrl) && (
          <a
            href={safeHref(study.websiteUrl)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-10 items-center gap-3 rounded-full border border-[#245dff] bg-[#151515] pl-6 pr-2 text-white transition-colors hover:bg-black"
          >
            {c.visit}
            <span aria-hidden className="flex size-8 items-center justify-center">
              ↗
            </span>
          </a>
        )}
      </div>

      {((study.services?.length ?? 0) > 0 || (study.tools?.length ?? 0) > 0) && (
        <div className={`${card} flex flex-col gap-4`}>
          {study.services && study.services.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-bold text-black">{c.services}</p>
              <ul className="flex flex-col items-start gap-2">
                {study.services.map((s) => (
                  <li key={s} className="rounded-full border border-[#d9d9d9] bg-[#f2f2f2] px-4 py-2 text-sm font-medium text-[#454750]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {study.tools && study.tools.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-bold text-black">{c.tools}</p>
              <ul className="flex flex-col items-start gap-2">
                {study.tools.map((tool) => (
                  <li key={tool._id}>
                    <Link
                      href={href(lang, "tools", tool.slug ?? "")}
                      className="flex items-center gap-1.5 rounded-full border border-[#d9d9d9] bg-[#f2f2f2] px-3.5 py-2 font-medium text-[#1b1b1b] transition-colors hover:border-[#245dff]"
                    >
                      <SanityImage image={tool.logo} alt="" width={120} sizes="18px" className="h-[18px] w-auto max-w-16 object-contain" />
                      {tool.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {study.team && study.team.length > 0 && (
        <div className={card}>
          <p className="sr-only">{c.team}</p>
          <ul className="flex flex-col gap-4">
            {study.team.map((member) => (
              <li key={member._id} className="flex items-center gap-3">
                <Avatar image={member.photo} name={member.name ?? ""} />
                <span>
                  <span className="block font-medium leading-tight text-black">{member.name}</span>
                  <span className="block text-sm text-[#454750]">{member.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

function Avatar({ image, name }: { image: CmsImage | undefined; name: string }) {
  if (!image?.asset) {
    return <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#2a37d8] font-serif text-lg text-white">{name[0]}</span>;
  }
  return (
    <span className="relative size-12 shrink-0 overflow-hidden rounded-full">
      <SanityImage image={image} alt="" fill width={200} sizes="48px" className="object-cover" />
    </span>
  );
}

function BookingLink({ label, className = "" }: { label: string; className?: string }) {
  const { links } = useLocale();
  return (
    <a
      href={links.booking}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex h-11 items-center gap-3 rounded-full bg-[#2a37d8] pl-6 pr-2 text-white transition-colors hover:bg-[#2531ae] ${className}`}
    >
      {label}
      <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-white/15">
        ↗
      </span>
    </a>
  );
}
