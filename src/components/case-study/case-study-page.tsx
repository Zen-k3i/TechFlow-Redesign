"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { ease, links, projectImage, projects, type Project } from "../site/content";
import { Footer } from "../site/footer";
import { Magnetic } from "../site/magnetic";
import { Navbar } from "../site/navbar";
import { ProjectHighlight } from "../site/project-highlight";
import { FadeIn, RevealHeading } from "../site/reveal";
import type { CaseStudy } from "./data";
import { GrowthCover } from "./growth-cover";

export function CaseStudyPage({ project, study }: { project: Project; study: CaseStudy }) {
  return (
    <>
      <Navbar base="/" />
      <main>
        <Hero project={project} study={study} />
        {study.testimonial && <Quote testimonial={study.testimonial} />}
        <Context study={study} />
        <Approach study={study} />
        <Results study={study} />
        <MoreProjects current={project.slug} />
      </main>
      <Footer />
    </>
  );
}

function Hero({ project, study }: { project: Project; study: CaseStudy }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const weeks = study.timeline.design + study.timeline.dev;

  const meta = [
    { label: "Secteur", value: project.sector },
    { label: "Services", value: study.services.join(", ") },
    { label: "Outils", value: study.tools.join(", ") },
    { label: "Durée", value: `${weeks} semaines` },
  ];

  return (
    <section ref={ref} id="top" className="grain relative overflow-hidden bg-night px-5 pb-20 pt-32 text-white md:px-10 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_80%_30%,rgba(71,102,255,0.28),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <Link href="/#projets" className="eyebrow inline-flex items-center gap-2 text-white/50 hover:text-white">
              ← Tous les projets
            </Link>
          </motion.div>
          <RevealHeading as="h1" text={project.name} className="mt-8 font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] tracking-[-0.02em]" />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-6 max-w-xl text-lg text-white/70 md:text-xl"
          >
            {study.summary}
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow text-white/40">{m.label}</dt>
                <dd className="mt-1.5 text-sm text-white/85">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative aspect-[5/6] overflow-hidden rounded-[2rem] bg-white/5"
        >
          <motion.div style={{ y }} className="absolute -inset-y-[6%] inset-x-0">
            <Image src={projectImage(project.slug)} alt={`Site ${project.name}`} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </div>

      <dl className="relative mx-auto mt-16 grid max-w-7xl gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
        {study.results.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 + i * 0.08, ease }}
            className="bg-night p-6 md:p-8"
          >
            <dd className="font-serif text-5xl leading-none text-brand-sky md:text-6xl">{m.value}</dd>
            <dt className="mt-2 text-sm text-white/55">{m.label}</dt>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}

function Quote({ testimonial }: { testimonial: NonNullable<CaseStudy["testimonial"]> }) {
  return (
    <section className="bg-night px-5 pb-10 md:px-10">
      <FadeIn className="mx-auto max-w-7xl rounded-[2.5rem] bg-paper px-6 py-16 text-ink md:rounded-[3.5rem] md:px-20 md:py-24">
        <figure className="mx-auto max-w-4xl">
          <span aria-hidden className="block font-serif text-8xl leading-[0.5] text-brand-deep">
            &ldquo;
          </span>
          <blockquote className="mt-6 font-serif text-3xl leading-[1.15] md:text-5xl">{testimonial.quote}</blockquote>
          <figcaption className="mt-10 flex items-center gap-4">
            {testimonial.photo ? (
              <Image src={testimonial.photo} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
            ) : (
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-deep font-serif text-xl text-white">
                {testimonial.name[0]}
              </span>
            )}
            <span>
              <span className="block font-medium">{testimonial.name}</span>
              <span className="block text-sm text-ink/55">{testimonial.role}</span>
            </span>
          </figcaption>
        </figure>
      </FadeIn>
    </section>
  );
}

function Context({ study }: { study: CaseStudy }) {
  const { design, dev } = study.timeline;
  const total = design + dev;
  const phases = [
    { label: "Branding & UX/UI", weeks: design, className: "bg-brand-sky" },
    { label: "Développement", weeks: dev, className: "bg-white/80" },
  ].filter((p) => p.weeks > 0);

  return (
    <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-brand-sky">Contexte et enjeux</p>
          <RevealHeading text="Le point de *départ.*" className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl" />
          <p className="mt-6 max-w-md text-white/55">{study.about}</p>
        </div>

        <div>
          <FadeIn>
            <p className="text-xl leading-relaxed text-white/85 md:text-2xl">{study.context}</p>
          </FadeIn>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {study.challenges.map((c, i) => (
              <FadeIn key={c} delay={i * 0.08}>
                <li className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-brand-sky/50">
                  <span className="eyebrow text-brand-sky">Enjeu 0{i + 1}</span>
                  <p className="mt-3 font-medium leading-snug">{c}</p>
                </li>
              </FadeIn>
            ))}
          </ul>

          <FadeIn className="mt-12 rounded-3xl border border-white/10 bg-night-soft p-6 md:p-8">
            <div className="flex items-baseline justify-between">
              <p className="eyebrow text-white/40">Calendrier</p>
              <p className="font-serif text-3xl">{total} semaines</p>
            </div>
            <div className="mt-6 flex h-3 gap-1 overflow-hidden rounded-full">
              {phases.map((p, i) => (
                <motion.span
                  key={p.label}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.3, ease }}
                  style={{ flexGrow: p.weeks }}
                  className={`origin-left rounded-full ${p.className}`}
                />
              ))}
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {phases.map((p) => (
                <li key={p.label} className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${p.className}`} /> {p.label} · {p.weeks} sem.
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Approach({ study }: { study: CaseStudy }) {
  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-brand-deep">Notre approche</p>
        <RevealHeading
          text="Comment nous *l'avons construit.*"
          accentClassName="italic text-brand-deep"
          className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl"
        />

        <ol className="mt-16 border-t border-ink/10">
          {study.approach.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease }}
              className="group grid gap-4 border-b border-ink/10 py-10 md:grid-cols-[6rem_1fr_1.3fr] md:gap-10"
            >
              <span className="font-serif text-5xl leading-none text-ink/20 transition-colors group-hover:text-brand-deep">0{i + 1}</span>
              <h3 className="font-serif text-3xl leading-tight md:text-4xl">{step.title}</h3>
              <div>
                <p className="text-ink/65">{step.text}</p>
                {step.points && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {step.points.map((p) => (
                      <li key={p} className="rounded-full border border-ink/15 px-3 py-1.5 text-sm text-ink/75">
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Results({ study }: { study: CaseStudy }) {
  return (
    <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-navy-deep via-night-soft to-night p-8 md:rounded-[3.5rem] md:p-16">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand/30 blur-3xl" />
        <div className="relative">
          <p className="eyebrow text-brand-sky">Résultats</p>
          <RevealHeading text="Ce que le projet *a changé.*" className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl" />
          <p className="mt-6 max-w-2xl text-lg text-white/65">{study.results.text}</p>

          <ul className="mt-14 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
            {study.results.metrics.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.08}>
                <li>
                  <p className="font-serif text-6xl leading-none md:text-7xl">{m.value}</p>
                  <p className="mt-3 text-sm text-white/55">{m.label}</p>
                </li>
              </FadeIn>
            ))}
          </ul>

          <div className="mt-14 flex flex-col gap-6 rounded-3xl bg-white/[0.06] p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="font-serif text-3xl leading-tight">Envie des mêmes résultats pour votre site ?</p>
              <p className="mt-1 text-white/55">Un appel de 30 minutes pour voir ce que nous pouvons vous apporter.</p>
            </div>
            <Magnetic>
              <a
                href={links.booking}
                target="_blank"
                rel="noreferrer"
                className="group flex h-14 shrink-0 items-center gap-3 rounded-full bg-white pl-7 pr-2 font-medium text-night transition-colors hover:bg-brand-sky hover:text-white"
              >
                Parler à un humain
                <span className="flex size-10 items-center justify-center rounded-full bg-night text-white transition-transform group-hover:-rotate-45">→</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

function MoreProjects({ current }: { current: string }) {
  const index = projects.findIndex((p) => p.slug === current);
  const next = [1, 2, 3].map((o) => projects[(index + o) % projects.length]);

  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <RevealHeading text="Nos *réalisations.*" accentClassName="italic text-brand-deep" className="font-serif text-5xl leading-[0.95] md:text-7xl" />
          <Link href="/#projets" className="hidden shrink-0 rounded-full border border-ink/15 px-5 py-2.5 text-sm hover:border-ink md:block">
            Tous les projets
          </Link>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-3">
          {next.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.08}>
              <li>
                <RelatedCard project={p} />
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RelatedCard({ project }: { project: Project }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  return (
    <Link
      href={`/projets/${project.slug}`}
      data-cursor="Voir le cas"
      className="group block"
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
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink/5">
        {project.kind === "growth" ? (
          <GrowthCover />
        ) : (
          <Image src={projectImage(project.slug)} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <ProjectHighlight slug={project.slug} mx={mx} my={my} />
      </div>
      <div className="mt-4 flex items-center justify-between px-1">
        <span>
          <span className="block text-lg font-medium">{project.name}</span>
          <span className="text-sm text-ink/55">{project.sector}</span>
        </span>
        <span className="flex size-9 items-center justify-center rounded-full border border-ink/15 transition-[transform,background-color,color] group-hover:-rotate-45 group-hover:bg-brand-deep group-hover:text-white">
          →
        </span>
      </div>
    </Link>
  );
}
