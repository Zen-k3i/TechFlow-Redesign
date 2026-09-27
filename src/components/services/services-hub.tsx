"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { href, serviceKeys } from "@/i18n/routes";
import { useLocale } from "../site/locale";
import { Process } from "../site/process";
import { FadeIn, RevealHeading } from "../site/reveal";
import { Faq } from "../site/faq";
import { Testimonials } from "../site/testimonials";
import { Chip, HumanActions, SectionHeader } from "../page/ui";
import { projectImage } from "../site/content";
import { projectPreviews } from "../site/previews";
import { EditorialHero, HoverPreview, pad, WordMarquee } from "./editorial";
import { servicesHub, tools } from "./hub-data";

export function ServicesHub() {
  const { lang, t } = useLocale();
  const c = servicesHub[lang];
  const services = serviceKeys.map((key, i) => ({ key, url: c.urls[i], ...t.services.items[i] }));

  return (
    <>
      <section id="top" className="grain relative overflow-hidden bg-night px-5 pb-10 pt-32 text-white md:px-10 md:pt-40">
        <EditorialHero
          crumbs={[{ label: t.nav.pages.services, href: href(lang, "services") }]}
          kicker={c.badge}
          counter={`(${pad(services.length)})`}
          title={c.title}
          intro={c.intro}
          actions={<HumanActions />}
        />
      </section>

      <section className="bg-night px-5 pb-28 pt-16 text-white md:px-10 md:pb-36">
        <HoverPreview images={services.map((s) => projectPreviews(s.image)[0] ?? projectImage(s.image))} className="mx-auto max-w-7xl">
          {(bind) => (
            <ol className="border-t border-white/15">
              {services.map((s, i) => (
                <li key={s.key} {...bind(i)} className="border-b border-white/15">
                  <Link
                    href={href(lang, s.key)}
                    data-cursor={c.discover}
                    className="group relative grid gap-5 overflow-hidden py-10 md:grid-cols-[5rem_1fr_auto] md:items-center md:gap-8 md:py-14"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-white/[0.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    />
                    <span className="relative font-mono text-xs text-white/40">({pad(i + 1)})</span>
                    <span className="relative">
                      <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                        <span className="font-serif text-6xl leading-[0.9] tracking-[-0.02em] transition-[transform,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:italic group-hover:text-brand-sky md:text-8xl">
                          {s.title}
                        </span>
                        <span className={`eyebrow rounded-full px-2.5 py-1 ${i < 2 ? "bg-brand text-white" : "border border-white/15 text-white/55"}`}>
                          {i < 2 ? c.core : c.extend}
                        </span>
                      </span>
                      <span className="mt-4 block max-w-xl text-white/55 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                        {s.tagline}
                      </span>
                      <span className="mt-5 flex flex-wrap gap-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                        {s.deliverables.map((d) => (
                          <span key={d} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                            {d}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="relative flex size-14 items-center justify-center rounded-full border border-white/20 text-xl transition-[transform,background-color,border-color] duration-500 group-hover:-rotate-45 group-hover:border-brand group-hover:bg-brand md:size-20">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </HoverPreview>
      </section>

      <section className="bg-night pb-28 text-white">
        <WordMarquee words={services.flatMap((s) => s.deliverables)} />
      </section>

      <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={c.pipeline.eyebrow} title={c.pipeline.heading} intro={c.pipeline.intro} />
          <ol className="relative mt-16 grid gap-4 md:grid-cols-5">
            <div aria-hidden className="absolute inset-x-0 top-10 hidden h-px bg-linear-to-r from-transparent via-brand-sky/60 to-transparent md:block" />
            <motion.span
              aria-hidden
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-[37px] hidden size-1.5 rounded-full bg-brand-sky shadow-[0_0_14px_4px_rgba(71,145,255,0.6)] md:block"
            />
            {c.pipeline.steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.08}>
                <li className="relative h-full rounded-3xl border border-white/10 bg-night-soft p-6">
                  <span className="relative flex size-9 items-center justify-center rounded-xl bg-white p-2">
                    <Image src={`/images/tools/${step.tool}.svg`} alt="" width={24} height={24} className="size-full object-contain" />
                  </span>
                  <p className="eyebrow mt-6 text-white/40">0{i + 1}</p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight">{step.title}</h3>
                  <p className="mt-3 text-sm text-white/55">{step.text}</p>
                </li>
              </FadeIn>
            ))}
          </ol>

          <div className="mt-32 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow text-brand-sky">{c.stack.eyebrow}</p>
              <RevealHeading text={c.stack.heading} className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl" />
              <p className="mt-6 max-w-md text-white/55">{c.stack.intro}</p>
            </div>
            <div>
              <ul className="grid grid-cols-4 gap-3">
                {tools.map((tool, i) => (
                  <FadeIn key={tool.name} delay={i * 0.04}>
                    <li className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] transition-colors hover:border-brand/50 hover:bg-white/[0.06]">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-white p-2.5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                        <Image src={tool.src} alt="" width={32} height={32} className="size-full object-contain" />
                      </span>
                      <span className="text-xs text-white/60">{tool.name}</span>
                    </li>
                  </FadeIn>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.stack.more.map((m) => (
                  <li key={m}>
                    <Chip>{m}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <Testimonials />
      <Faq />
    </>
  );
}
