"use client";

import Image from "next/image";
import Link from "next/link";
import { href, serviceKeys, type ServiceKey } from "@/i18n/routes";
import { ComparisonTable, ClientMarquee, HumanActions, SectionHeader } from "../page/ui";
import { projects, serviceIllustration } from "../site/content";
import { Faq } from "../site/faq";
import { useLocale } from "../site/locale";
import { ProjectCard } from "../site/project-card";
import { projectPreviews } from "../site/previews";
import { ServiceShowcase } from "./showcase";
import { HeroStage } from "./hero-stage";
import { FadeIn, RevealHeading } from "../site/reveal";
import { serviceContent, type ServiceContent } from "./data";
import { EditorialHero, HoverPreview, NextLink, pad, StackedSteps, WordMarquee } from "./editorial";

const copy = {
  fr: { next: "Service suivant", project: "Projet", book: "Réserver un appel" },
  en: { next: "Next service", project: "Project", book: "Book a call" },
};

export function ServicePage({ service }: { service: ServiceKey }) {
  const { lang, t } = useLocale();
  const c = serviceContent[lang][service];
  const index = serviceKeys.indexOf(service);
  const item = t.services.items.find((s) => s.href === href(lang, service));
  const title = item?.title ?? c.badge;
  const nextKey = serviceKeys[(index + 1) % serviceKeys.length];
  const next = t.services.items.find((s) => s.href === href(lang, nextKey));

  const work = c.work.projects.map((slug) => projects.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const webSlugs = [...new Set([c.hero.project, ...work.filter((p) => !p.kind).map((p) => p.slug)])];
  const previews = webSlugs.flatMap((slug) => projectPreviews(slug));

  return (
    <>
      <section id="top" className="grain relative overflow-hidden bg-night px-5 pt-32 text-white md:px-10 md:pt-40">
        <EditorialHero
          crumbs={[
            { label: t.nav.pages.services, href: href(lang, "services") },
            { label: title, href: href(lang, service) },
          ]}
          kicker={c.badge}
          counter={`(${pad(index + 1)}/${pad(serviceKeys.length)})`}
          title={c.title}
          intro={c.intro}
          actions={<HumanActions />}
        />
        <HeroStage service={service} content={c} />
      </section>

      <section className="bg-night pb-10 pt-24 text-white">
        <WordMarquee words={c.offer.items.map((i) => i.title)} />
        <div className="mt-20">
          <ClientMarquee label={t.trust.eyebrow} />
        </div>
      </section>

      <ServiceShowcase service={service} card={c.hero.card} />
      <Audience content={c} />
      <Offer content={c} previews={previews} />
      <Quote quote={c.quote} />
      {c.statement && <Statement statement={c.statement} />}
      {c.highlight && <Highlight highlight={c.highlight} />}
      {c.cases && <Cases cases={c.cases} />}

      <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={c.process.eyebrow} title={c.process.heading} intro={c.process.intro} />
          <div className="mt-16">
            <StackedSteps steps={c.process.steps} label={t.common.deliverable} />
          </div>
        </div>
      </section>

      <ComparisonAndWork content={c} work={work} />
      <Faq eyebrow="FAQ" heading={c.faq.heading} intro={c.faq.intro} items={c.faq.items} />
      {next && <NextLink label={copy[lang].next} title={next.title} to={next.href} image={serviceIllustration(serviceKeys.indexOf(nextKey))} />}
    </>
  );
}

function Audience({ content }: { content: ServiceContent }) {
  const { lang, links } = useLocale();
  const a = content.audience;
  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {content.stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06} className="border-t border-ink/15 pt-6">
              <dd className="font-serif text-6xl leading-none tracking-[-0.02em] md:text-7xl">{s.value}</dd>
              <dt className="mt-4 max-w-[16rem] text-sm text-ink/55">{s.label}</dt>
            </FadeIn>
          ))}
        </dl>

        <div className="mt-32 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-brand-deep">{a.eyebrow}</p>
            <RevealHeading text={a.heading} accentClassName="italic text-brand-deep" className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl" />
          </div>
          <ol className="border-b border-ink/15">
            {a.items.map((item, i) => (
              <FadeIn key={item.title}>
                <li className="group grid grid-cols-[3rem_1fr] gap-2 border-t border-ink/15 py-9 md:grid-cols-[4rem_1fr]">
                  <span className="pt-2 font-mono text-xs text-ink/40">({pad(i + 1)})</span>
                  <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                    <h3 className="font-serif text-3xl leading-tight transition-colors group-hover:text-brand-deep md:text-4xl">{item.title}</h3>
                    <p className="mt-3 max-w-lg text-ink/60">{item.text}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
            <li className="border-t border-ink/15">
              <a href={links.booking} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-9">
                <span className="font-serif text-3xl italic text-brand-deep md:text-4xl">{a.cta}</span>
                <span className="flex items-center gap-3 text-sm font-medium">
                  <span className="hidden sm:inline">{copy[lang].book}</span>
                  <span className="flex size-12 items-center justify-center rounded-full bg-ink text-paper transition-[transform,background-color] duration-300 group-hover:-rotate-45 group-hover:bg-brand">
                    →
                  </span>
                </span>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function Offer({ content, previews }: { content: ServiceContent; previews: string[] }) {
  const o = content.offer;
  const images = o.items.map((_, i) => previews[i % previews.length]);
  return (
    <section className="bg-night px-5 py-28 text-white md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={o.eyebrow} title={o.heading} intro={o.intro} />
        <HoverPreview images={images} className="mt-16">
          {(bind) => (
            <ol className="border-t border-white/10">
              {o.items.map((item, i) => (
                <li key={item.title} {...bind(i)} className="group border-b border-white/10">
                  <div className="grid gap-4 py-8 md:grid-cols-[5rem_1fr_auto] md:items-start md:gap-8 md:py-10">
                    <span className="pt-3 font-mono text-xs text-white/35">({pad(i + 1)})</span>
                    <div>
                      <h3 className="font-serif text-4xl leading-none transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:text-brand-sky md:text-6xl">
                        {item.title}
                      </h3>
                      <div className="grid transition-[grid-template-rows] duration-500 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="max-w-xl pt-4 text-white/60 md:translate-x-4">{item.text}</p>
                        </div>
                      </div>
                    </div>
                    <ul className="flex flex-wrap gap-2 md:max-w-[16rem] md:justify-end md:pt-3">
                      {item.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60 transition-colors group-hover:border-white/40 group-hover:text-white">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </HoverPreview>
      </div>
    </section>
  );
}

function Quote({ quote }: { quote: ServiceContent["quote"] }) {
  return (
    <section className="bg-night px-5 pb-28 text-white md:px-10 md:pb-40">
      <FadeIn className="mx-auto max-w-5xl">
        <figure>
          <span aria-hidden className="block font-serif text-[8rem] leading-[0.6] text-brand-sky">
            &ldquo;
          </span>
          <blockquote className="mt-4 font-serif text-4xl leading-[1.08] tracking-[-0.01em] md:text-6xl">{quote.quote}</blockquote>
          <figcaption className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
            {quote.photo ? (
              <Image src={quote.photo} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
            ) : (
              <span className="flex size-12 items-center justify-center rounded-full bg-brand font-serif text-xl">{quote.name[0]}</span>
            )}
            <span>
              <span className="block font-medium">{quote.name}</span>
              <span className="block text-sm text-white/50">{quote.role}</span>
            </span>
          </figcaption>
        </figure>
      </FadeIn>
    </section>
  );
}

function Statement({ statement }: { statement: NonNullable<ServiceContent["statement"]> }) {
  return (
    <section className="rounded-[2.5rem] bg-brand-deep px-5 py-28 text-white md:rounded-[4rem] md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow text-white/60">{statement.eyebrow}</p>
        <RevealHeading text={statement.heading} accentClassName="italic text-white/60" className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.02em] md:text-8xl" />
        <FadeIn>
          <p className="mt-10 max-w-2xl text-lg text-white/75">{statement.text}</p>
        </FadeIn>
      </div>
    </section>
  );
}

function Highlight({ highlight }: { highlight: NonNullable<ServiceContent["highlight"]> }) {
  return (
    <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={highlight.eyebrow} title={highlight.heading} intro={highlight.intro} />
        <ul className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {highlight.items.map((item, i) => (
            <FadeIn key={item.title} delay={(i % 3) * 0.06}>
              <li className="group border-t border-white/15 pt-6">
                <span className="font-mono text-xs text-brand-sky">({pad(i + 1)})</span>
                <h3 className="mt-5 font-serif text-3xl leading-tight">{item.title}</h3>
                <p className="mt-3 text-white/55">{item.text}</p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Cases({ cases }: { cases: NonNullable<ServiceContent["cases"]> }) {
  return (
    <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={cases.eyebrow} title={cases.heading} />
        <ol className="mt-16 border-t border-white/10">
          {cases.items.map((item) => (
            <FadeIn key={item.title}>
              <li className="grid gap-8 border-b border-white/10 py-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <span className="eyebrow text-brand-sky">{item.sector}</span>
                  <h3 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-white/55">{item.text}</p>
                </div>
                <dl className="flex gap-10">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <dd className="font-serif text-6xl leading-none text-brand-sky">{m.value}</dd>
                      <dt className="mt-2 max-w-[10rem] text-sm text-white/50">{m.label}</dt>
                    </div>
                  ))}
                </dl>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ComparisonAndWork({ content, work }: { content: ServiceContent; work: typeof projects }) {
  const { t, lang } = useLocale();
  const c = t.common.comparison;

  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader eyebrow={content.work.eyebrow} title={content.work.heading} tone="light" />
          <Link href={href(lang, "projects")} className="group flex shrink-0 items-center gap-3 text-sm font-medium">
            {t.common.allProjects}
            <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition-transform group-hover:-rotate-45">→</span>
          </Link>
        </div>
        <p className="mt-4 max-w-xl text-ink/60">{content.work.intro}</p>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.08}>
              <li>
                <ProjectCard project={p} />
              </li>
            </FadeIn>
          ))}
        </ul>

        <div className="mt-36">
          <SectionHeader eyebrow={c.eyebrow} title={c.heading} intro={content.comparison.intro} tone="light" />
          <FadeIn className="mt-14">
            <ComparisonTable rows={content.comparison.rows} columns={content.comparison.columns} />
            <p className="mt-5 flex items-center gap-2 text-sm text-ink/55">
              <span className="size-1.5 rounded-full bg-brand-deep" /> {c.note}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
