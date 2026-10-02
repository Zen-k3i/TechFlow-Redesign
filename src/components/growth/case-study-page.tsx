"use client";

import Link from "next/link";
import { m as motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { SanityImageSource } from "@sanity/image-url";
import { href } from "@/i18n/routes";
import { urlFor } from "@/sanity/image";
import { SanityImage } from "../cms/sanity-image";
import { safeHref } from "../cms/portable-body";
import { Aurora, ClientLogo, Story } from "../case-study/cms-case-study-page";
import { ButtonLink } from "../page/ui";
import { CmsProjectCard } from "../projects/cms-project-card";
import { GlowButton } from "../page/project-cta";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { Magnetic } from "../site/magnetic";
import { projectTheme, themeFromHex } from "../site/project-highlight";
import { RevealHeading } from "../site/reveal";
import { useStill } from "../site/use-still";
import { AdsShowcase } from "./ads-showcase";
import { GrowthBrief } from "./brief";
import { growthCopy } from "./copy";
import { PhoneMockup } from "./phone-mockup";
import { SocialAd } from "./social-ad";
import { asPlatform, SECTION_IDS, type Brand, type Ad, type GrowthStudy } from "./types";

/** The ads section shows the first three ads (Sanity order), large enough to read the feed UI. */
const SHOWCASE_PHONES = 3;

/**
 * Growth marketing case study, built from a Sanity `growthCaseStudy`. Same frame and order as a
 * website case study so both read alike (hero → brief → story → related, then the footer's
 * call to action), with its own twists: the ads as a fan of phones in the hero, a single row of
 * figures, the story as numbered steps on a rail, and the ads section. Sections without
 * content are left out.
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

  return (
    <div style={{ "--accent": theme.accent, "--glow": theme.glow } as React.CSSProperties} className="bg-night">
      <Hero study={study} brand={brand} />
      <GrowthBrief study={study} />
      <Story body={study.body} variant="steps" />
      {ads.length > 0 && <AdsShowcase ads={ads.slice(0, SHOWCASE_PHONES)} brand={brand} heading={study.adsSection?.heading ?? null} intro={study.adsSection?.intro ?? null} />}
      <Related study={study} />
    </div>
  );
}

/** Where the three hero phones sit in their square stage: the middle one in front, the others tilted behind it. */
const HERO_PHONES = [
  { left: "3%", top: "12%", rotate: -8, z: 0, width: "36%" },
  { left: "28.5%", top: "1%", rotate: 0, z: 10, width: "43%" },
  { left: "61%", top: "12%", rotate: 8, z: 0, width: "36%" },
];

/**
 * Same frame as a website case study's hero (breadcrumb, pitch on the left, grid and aurora,
 * full viewport) so both templates read as one site; where websites show a deck of screens, a
 * campaign shows its ads as a fan of phones, the front one playing muted.
 */
function Hero({ study, brand }: { study: GrowthStudy; brand: Brand }) {
  const { lang, t } = useLocale();
  const c = growthCopy[lang];
  const still = useStill();
  const ads = (study.ads ?? []).slice(0, 3);
  const hero = study.hero;
  const website = safeHref(study.websiteUrl);
  // `fade: false` only slides: for the summary, the page's largest text, visible from the server HTML (LCP).
  const reveal = (delay: number, fade = true) => ({
    initial: fade ? { opacity: 0, y: 20 } : { y: 20 },
    animate: fade ? { opacity: 1, y: 0 } : { y: 0 },
    transition: { duration: 0.9, delay, ease },
  });
  const serviceTag = hero?.tags ?? [];
  // Sectors already in the service tag pill aren't repeated in the tags below.
  const tags = [...(study.sectors ?? []).filter((s) => !serviceTag.includes(s)).map((label) => ({ label, sector: true })), ...(study.services ?? []).map((label) => ({ label, sector: false }))];
  // The first ad (Sanity order) is the front phone that plays, the next two go behind it.
  const slots = [1, 0, 2].slice(0, ads.length);

  return (
    <section id="top" className="grain relative flex min-h-svh flex-col overflow-hidden bg-night px-5 pb-16 pt-32 text-white md:px-10 md:pb-20">
      {study.heroImage?.asset && (
        <div aria-hidden className="absolute inset-0">
          <SanityImage image={study.heroImage} alt="" fill priority width={2000} sizes="100vw" className="object-cover opacity-20" />
          <span className="absolute inset-0 bg-linear-to-b from-night/40 via-night/80 to-night" />
        </div>
      )}
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
              {serviceTag.length > 0 && <span className="rounded-full border border-(--accent)/40 bg-(--accent)/10 px-3.5 py-1.5 text-sm text-(--accent)">{serviceTag.join(" · ")}</span>}
            </motion.div>

            <RevealHeading as="h1" text={study.title ?? ""} className="mt-8 font-serif text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.9] tracking-[-0.03em]" />
            {hero?.headline && (
              <motion.p {...reveal(0.35)} className="mt-4 font-serif text-3xl italic leading-tight text-(--accent) md:text-4xl">
                {hero.headline}
              </motion.p>
            )}
            {study.summary && (
              <motion.p {...reveal(0.45, false)} className="mt-6 max-w-xl text-lg text-white/70 md:text-xl">
                {study.summary}
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
            </motion.div>
            {(hero?.status || website) && (
              <motion.p {...reveal(0.7)} className="mt-5 flex items-center gap-2 text-sm text-white/50">
                {hero?.status && <span aria-hidden className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.2)]" />}
                {hero?.status}
                {hero?.status && website && <span className="text-white/25">·</span>}
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-white hover:underline">
                    {c.visit} ↗
                  </a>
                )}
              </motion.p>
            )}
          </div>

          {ads.length > 0 && <PhoneFan ads={ads} slots={slots} brand={brand} still={still} label={c.seeAds} />}
        </div>
      </div>
    </section>
  );
}

/** The hero's three ads as phones dealt into a fan; the front one plays muted, the stage leans with the cursor. */
function PhoneFan({ ads, slots, brand, still, label }: { ads: Ad[]; slots: number[]; brand: Brand; still: boolean; label: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (still || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <a
      href={`#${SECTION_IDS.ads}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="relative mx-auto block aspect-square w-full max-w-[34rem] [perspective:1400px]"
    >
      {/* Named by text, not aria-label: the phones' visible ad copy is decorative (aria-hidden). */}
      <span className="sr-only">{label}</span>
      <span aria-hidden className="absolute inset-[18%] rounded-full bg-(--glow) blur-3xl" />
      <motion.div style={{ rotateX, rotateY }} className="absolute inset-0">
        {ads.map((ad, i) => {
          const pose = HERO_PHONES[slots[i]];
          const front = slots[i] === 1;
          return (
            <motion.div
              key={`${ad._key}-${i}`}
              aria-hidden
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: pose.rotate }}
              transition={{ duration: 1.1, delay: 0.4 + (front ? 0 : 0.18), ease }}
              style={{ left: pose.left, top: pose.top, width: pose.width, zIndex: pose.z }}
              className="absolute origin-bottom"
            >
              <PhoneMockup className={front ? "shadow-[0_60px_120px_-30px_color-mix(in_oklab,var(--accent)_55%,transparent)]" : ""}>
                <SocialAd ad={ad} brand={brand} platform={asPlatform(ad.platform)} playing={front && !still} compact={!front} />
                {!front && <span className="absolute inset-0 z-20 bg-night/45" />}
              </PhoneMockup>
            </motion.div>
          );
        })}
      </motion.div>
    </a>
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
