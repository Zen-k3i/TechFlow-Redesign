"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { SanityImageSource } from "@sanity/image-url";
import { href } from "@/i18n/routes";
import { urlFor } from "@/sanity/image";
import { SanityImage } from "../cms/sanity-image";
import { safeHref } from "../cms/portable-body";
import { Aurora, ClientLogo } from "../case-study/cms-case-study-page";
import { ButtonLink } from "../page/ui";
import { CmsProjectCard } from "../projects/cms-project-card";
import { GlowButton, HumanButton } from "../page/project-cta";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { Magnetic } from "../site/magnetic";
import { projectTheme, themeFromHex } from "../site/project-highlight";
import { FadeIn, RevealHeading } from "../site/reveal";
import { useStill } from "../site/use-still";
import { ABTestComparison } from "./ab-test-comparison";
import { BehindTheScenes } from "./behind-the-scenes";
import { GrowthBrief } from "./brief";
import { AdsShowcase } from "./ads-showcase";
import { Community } from "./community";
import { growthCopy } from "./copy";
import { Creative } from "./creative";
import { FunnelSteps } from "./funnel-steps";
import { LeadFlow } from "./lead-flow";
import { MetricCounter } from "./metric-counter";
import { PhoneMockup } from "./phone-mockup";
import { posterUrl } from "./media";
import { SocialAd } from "./social-ad";
import { asPlatform, isReal, SECTION_IDS, type Brand, type GrowthStudy } from "./types";

/**
 * Growth marketing case study, built from a Sanity `growthCaseStudy`. It shares the website case
 * study's frame (breadcrumb, client logo, tags, "10 seconds" brief, related cards) so both templates
 * feel like one site, and swaps the story for the marketing funnel: hero → brief → challenge →
 * approach (funnel) → creative → behind the scenes → ads → A/B → leads → community → results →
 * deliverables & CTA → related case studies. Sections without content are left out.
 */
export function GrowthCaseStudyPage({ study }: { study: GrowthStudy }) {
  const theme = themeFromHex(study.accentColor) ?? projectTheme(study.slug ?? "");
  const ads = study.ads ?? [];
  const brand: Brand = {
    name: study.title ?? "",
    handle: study.handle ?? (study.title ?? "").toLowerCase().replace(/[^a-z0-9]+/g, ""),
    logo: study.logo?.asset?.url ? urlFor(study.logo as SanityImageSource).width(120).height(120).fit("crop").url() : null,
    accent: theme.accent,
  };
  const { funnel, creative, adsSection, abTest, leads, community } = study;

  return (
    <div style={{ "--accent": theme.accent, "--glow": theme.glow } as React.CSSProperties} className="bg-night">
      <Hero study={study} brand={brand} />
      <GrowthBrief study={study} />
      <Challenge study={study} />
      {funnel?.stages && funnel.stages.length > 0 && <FunnelSteps heading={funnel.heading} intro={funnel.intro} stages={funnel.stages} />}
      {ads.some((a) => a.hook) && (creative?.heading || creative?.intro) && <Creative ads={ads} heading={creative.heading} intro={creative.intro} />}
      {study.gallery?.images && study.gallery.images.length > 0 && (
        <BehindTheScenes heading={study.gallery.heading} intro={study.gallery.intro} images={study.gallery.images} />
      )}
      {ads.length > 0 && <AdsShowcase ads={ads} brand={brand} heading={adsSection?.heading ?? null} intro={adsSection?.intro ?? null} />}
      {abTest?.variants && abTest.variants.length > 0 && (
        <ABTestComparison heading={abTest.heading} intro={abTest.intro} illustrative={abTest.illustrative} variants={abTest.variants} weeks={abTest.weeks ?? []} />
      )}
      {leads && (leads.flow?.length || leads.sampleLeads?.length) ? (
        <LeadFlow
          heading={leads.heading}
          intro={leads.intro}
          flow={leads.flow ?? []}
          criteria={leads.criteria ?? []}
          leads={leads.sampleLeads ?? []}
          tiers={leads.tiers}
          note={leads.note}
        />
      ) : null}
      {community && (community.heading || community.thread?.length) ? (
        <Community
          heading={community.heading}
          intro={community.intro}
          perWeek={community.perWeek}
          calendar={community.calendar ?? []}
          posts={community.posts?.length ? community.posts : ads.flatMap((a) => posterUrl(a, 300) ?? [])}
          thread={community.thread ?? []}
          brand={brand}
        />
      ) : null}
      <Results study={study} />
      <Offer study={study} />
      <Related study={study} />
    </div>
  );
}

function Hero({ study, brand }: { study: GrowthStudy; brand: Brand }) {
  const { lang, t } = useLocale();
  const c = growthCopy[lang];
  const still = useStill();
  const ads = study.ads ?? [];
  const hero = study.hero;
  const website = safeHref(study.websiteUrl);
  const [current, setCurrent] = useState(0);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [8, -8]), { stiffness: 80, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 18 });
  const count = ads.length;

  useEffect(() => {
    if (still || count < 2) return;
    const id = setInterval(() => setCurrent((i) => (i + 1) % count), 7000);
    return () => clearInterval(id);
  }, [count, still]);

  const side = count > 2 ? [(current + count - 1) % count, (current + 1) % count] : [];
  const reveal = (delay: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } });
  const tags = [...(study.sectors ?? []).map((label) => ({ label, sector: true })), ...(study.services ?? []).map((label) => ({ label, sector: false }))];

  return (
    <section
      id="top"
      onPointerMove={(e) => {
        if (still || e.pointerType !== "mouse") return;
        px.set(e.clientX / window.innerWidth - 0.5);
        py.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="grain relative flex min-h-svh flex-col overflow-hidden bg-night px-5 pb-16 pt-32 text-white md:px-10 md:pb-20"
    >
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

        <div className="grid flex-1 items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-10">
          <div>
            <motion.div {...reveal(0.1)} className="flex flex-wrap items-center gap-4">
              <ClientLogo image={study.logo} name={study.title ?? ""} fill={study.logoFill} />
              {hero?.tagline && (
                <span className="inline-flex items-center gap-2 rounded-full border border-(--accent)/40 bg-(--accent)/10 px-3.5 py-1.5 text-sm text-(--accent)">
                  <span aria-hidden className="size-1.5 rounded-full bg-(--accent)" />
                  {hero.tagline}
                </span>
              )}
            </motion.div>

            <RevealHeading as="h1" text={study.title ?? ""} className="mt-8 font-serif text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.9] tracking-[-0.03em]" />
            {hero?.headline && (
              <motion.p {...reveal(0.35)} className="mt-5 max-w-xl font-serif text-3xl italic leading-tight text-(--accent) md:text-4xl">
                {hero.headline}
              </motion.p>
            )}
            {(study.summary || hero?.intro) && (
              <motion.p {...reveal(0.45)} className="mt-6 max-w-xl text-lg text-white/70">
                {hero?.intro ?? study.summary}
              </motion.p>
            )}

            {tags.length > 0 && (
              <motion.ul {...reveal(0.5)} className="mt-6 flex flex-wrap gap-2 text-sm">
                {tags.map((tag) => (
                  <li
                    key={`${tag.sector}-${tag.label}`}
                    className={`rounded-full border px-3 py-1 ${tag.sector ? "border-(--accent)/50 text-(--accent)" : "border-white/15 bg-white/[0.04] text-white/80"}`}
                  >
                    {tag.label}
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.div {...reveal(0.6)} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <GlowButton href={href(lang, "contact")}>{hero?.ctaLabel ?? c.quote}</GlowButton>
              </Magnetic>
              {ads.length > 0 && (
                <ButtonLink href={`#${SECTION_IDS.ads}`} variant="outline">
                  {c.seeAds}
                </ButtonLink>
              )}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className="px-2 text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
                  {c.visit} ↗
                </a>
              )}
            </motion.div>
            {hero?.status && (
              <p className="mt-6 flex items-center gap-2.5 text-sm text-white/60">
                <span className="relative flex size-2.5">
                  {!still && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />}
                  <span className="relative size-2.5 rounded-full bg-emerald-400" />
                </span>
                {hero.status}
              </p>
            )}
          </div>

          {ads.length > 0 && (
            <div className="relative mx-auto h-[480px] w-full max-w-[520px] [perspective:1400px] md:h-[600px]">
              {/* The client's key visual, darkened, as the set the phones stand in. */}
              {study.heroImage?.asset && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.4, ease }}
                  className="absolute inset-x-[4%] bottom-[6%] top-[8%] overflow-hidden rounded-[2rem] ring-1 ring-white/10"
                >
                  <SanityImage image={study.heroImage} alt={study.heroImage.alt ?? ""} fill priority width={1200} sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                  <span aria-hidden className="absolute inset-0 bg-linear-to-t from-night via-night/60 to-night/30" />
                </motion.div>
              )}
              <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full">
                {side.map((adIndex, i) => (
                  <motion.div
                    key={`side-${i}`}
                    initial={{ opacity: 0, x: "-50%", rotate: 0 }}
                    animate={{ opacity: 1, x: i === 0 ? "-110%" : "10%", rotate: i === 0 ? -9 : 9, y: 40 }}
                    transition={{ duration: 1.1, delay: 0.5, ease }}
                    className="absolute left-1/2 top-0 w-[190px] md:w-[225px]"
                    aria-hidden
                  >
                    <PhoneMockup>
                      <SocialAd ad={ads[adIndex]} brand={brand} platform={i === 0 ? "tiktok" : "facebook"} playing={false} compact />
                      <span className="absolute inset-0 z-20 bg-night/45" />
                    </PhoneMockup>
                  </motion.div>
                ))}
                <motion.a
                  href={`#${SECTION_IDS.ads}`}
                  data-cursor={c.watch}
                  aria-label={c.seeAds}
                  initial={{ opacity: 0, y: 80, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  transition={{ duration: 1.1, delay: 0.3, ease }}
                  className="absolute left-1/2 top-0 z-10 block w-[225px] md:w-[265px]"
                >
                  <motion.div animate={still ? undefined : { y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                    <PhoneMockup className="shadow-[0_60px_120px_-30px_color-mix(in_oklab,var(--accent)_55%,transparent)]">
                      <SocialAd key={current} ad={ads[current]} brand={brand} platform={asPlatform(ads[current].platform)} playing={!still} />
                    </PhoneMockup>
                  </motion.div>
                </motion.a>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Challenge({ study }: { study: GrowthStudy }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const ch = study.challenge;
  const client = study.client;
  if (!ch?.heading && !ch?.text) return null;
  const facts = client?.facts?.filter((f) => f.value) ?? [];

  return (
    <section className="bg-night px-5 pb-28 text-white md:px-10 md:pb-36">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-white/10 pt-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          {ch.heading && <RevealHeading text={ch.heading} accentClassName="italic text-(--accent)" className="font-serif text-5xl leading-[0.95] md:text-7xl" />}
          {ch.text && (
            <FadeIn>
              <p className="mt-6 max-w-2xl text-lg text-white/65">{ch.text}</p>
            </FadeIn>
          )}
          {ch.points && ch.points.length > 0 && (
            <ul className="mt-10 grid gap-3 md:grid-cols-3">
              {ch.points.map((p, i) => (
                <motion.li
                  key={p._key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <span className="eyebrow text-(--accent)">0{i + 1}</span>
                  <span className="mt-2 block font-medium leading-snug">{p.title}</span>
                  {p.text && <span className="mt-2 block text-sm text-white/55">{p.text}</span>}
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {(client?.meta?.length || facts.length > 0) && (
          <FadeIn className="self-end rounded-3xl border border-white/10 bg-night-soft p-6 md:p-8">
            {client?.meta && client.meta.length > 0 && (
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-white/10 pb-6">
                {client.meta.map((m) => (
                  <div key={m._key}>
                    <dt className="eyebrow text-white/40">{m.label}</dt>
                    <dd className="mt-1 text-sm">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {facts.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-6">
                {facts.map((f) => (
                  <div key={f._key} className="flex flex-col-reverse">
                    <dt className="mt-1 text-sm text-white/50">{f.label}</dt>
                    <dd className="font-serif text-4xl leading-none">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {client?.sourceUrl && (
              <a href={client.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-xs text-white/40 hover:text-white/70">
                {c.sourceLink} : {client.sourceLabel ?? new URL(client.sourceUrl).hostname} ↗
              </a>
            )}
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/** Real figures only: values containing "TBD" are hidden. Until there are some, the tracked KPIs are listed instead. */
function Results({ study }: { study: GrowthStudy }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const r = study.results;
  const metrics = r?.metrics?.filter((m) => isReal(m.value) && isReal(m.label)) ?? [];
  const quote = r?.testimonial && isReal(r.testimonial.quote) ? r.testimonial : null;
  const tracked = r?.tracked?.filter(Boolean) ?? [];
  if (metrics.length === 0 && !quote && tracked.length === 0) return null;

  return (
    <section id={SECTION_IDS.results} className="grain relative overflow-hidden bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_100%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl">
        <RevealHeading text={r?.heading ?? c.results} accentClassName="italic text-(--accent)" className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl" />
        {metrics.length > 0 ? (
          <dl className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((m) => (
              <MetricCounter key={m._key} value={m.value!} label={m.label} className="border-t border-white/15 pt-6" />
            ))}
          </dl>
        ) : (
          tracked.length > 0 && (
            <FadeIn className="mt-10">
              <p className="max-w-xl text-white/60">{c.inProgress}</p>
              <p className="eyebrow mt-8 text-white/45">{c.tracked}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tracked.map((t) => (
                  <li key={t} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
                    {t}
                  </li>
                ))}
              </ul>
            </FadeIn>
          )
        )}
        {quote && (
          <FadeIn className="mt-16">
            <figure className="rounded-[2rem] bg-(--accent) p-8 text-night md:p-14">
              <blockquote className="font-serif text-3xl leading-tight md:text-5xl">&ldquo;{quote.quote}&rdquo;</blockquote>
              {(quote.name || quote.role) && (
                <figcaption className="mt-8 flex items-center gap-4">
                  {quote.photo?.asset && (
                    <span className="relative size-12 overflow-hidden rounded-full">
                      <SanityImage image={quote.photo} alt="" fill width={144} sizes="48px" className="object-cover" />
                    </span>
                  )}
                  <span>
                    <span className="block font-medium">{quote.name}</span>
                    <span className="block text-sm text-night/60">{quote.role}</span>
                  </span>
                </figcaption>
              )}
            </figure>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/** What's included, then the call to action (the footer's generic one is turned off on this page). */
function Offer({ study }: { study: GrowthStudy }) {
  const { lang, t } = useLocale();
  const c = growthCopy[lang];
  const cta = study.cta;
  if (!cta?.heading) return null;
  const items = cta.deliverables?.filter(Boolean) ?? [];

  return (
    <section className="relative overflow-hidden bg-night px-5 pb-10 pt-28 text-white md:px-10 md:pt-36">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#16130d] via-night-soft to-navy-deep p-8 md:rounded-[3.5rem] md:p-16">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-(--accent)/25 blur-3xl" />
        <div className="relative grid gap-14 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
          <div>
            {cta.eyebrow && <p className="eyebrow text-(--accent)">{cta.eyebrow}</p>}
            <RevealHeading text={cta.heading} accentClassName="italic text-(--accent)" className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl" />
            {cta.text && <p className="mt-6 max-w-lg text-white/65">{cta.text}</p>}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <GlowButton href={href(lang, "contact")}>{study.hero?.ctaLabel ?? c.quote}</GlowButton>
              </Magnetic>
              <Magnetic>
                <HumanButton />
              </Magnetic>
            </div>
            <p className="mt-6 text-sm text-white/55">{t.common.reassurance}</p>
          </div>
          {items.length > 0 && (
            <div>
              <p className="eyebrow mb-4 text-white/45">{c.included}</p>
              <ul className="space-y-3">
                {items.map((o, i) => (
                  <motion.li
                    key={o}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease }}
                    className="flex items-start gap-3 border-b border-white/10 pb-3"
                  >
                    <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-(--accent) text-[11px] text-night">
                      ✓
                    </span>
                    <span className="text-white/85">{o}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Other case studies (websites and campaigns), the chosen "next" one first: the same cards as everywhere on the site. */
function Related({ study }: { study: GrowthStudy }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const seen = new Set<string>();
  const items = (study.related ?? []).filter((p) => p && !seen.has(p._id) && seen.add(p._id)).slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="grain relative overflow-hidden bg-night px-5 pb-28 pt-20 text-white md:px-10 md:pb-36">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-5xl md:text-6xl">{c.related}</h2>
          <Link href={href(lang, "projects")} className="text-white/60 underline-offset-4 hover:text-white hover:underline">
            ← {c.back}
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <motion.li
              key={p._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
            >
              <CmsProjectCard project={p} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
