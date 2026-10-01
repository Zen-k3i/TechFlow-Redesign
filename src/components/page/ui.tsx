"use client";

import Image, { type ImageLoader } from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { href } from "@/i18n/routes";
import { clients, ease } from "../site/content";
import { useLocale } from "../site/locale";
import { Magnetic } from "../site/magnetic";
import { FadeIn, RevealHeading } from "../site/reveal";
import { useEffect, useRef, useState } from "react";
import MuxVideo from "@mux/mux-video-react";

type Tone = "dark" | "light";

export function ButtonLink({
  href: to,
  children,
  variant = "light",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "dark" | "outline" | "outline-dark";
  external?: boolean;
  className?: string;
}) {
  const styles = {
    light: "bg-white text-night hover:bg-brand hover:text-white",
    dark: "bg-ink text-paper hover:bg-brand",
    outline: "border border-white/20 text-white hover:border-brand hover:bg-brand",
    "outline-dark": "border border-ink/15 text-ink hover:border-brand hover:bg-brand hover:text-white",
  }[variant];
  const arrow = {
    light: "bg-night text-white",
    dark: "bg-paper text-ink",
    outline: "bg-white/10 text-white group-hover:bg-white group-hover:text-brand",
    "outline-dark": "bg-ink text-paper group-hover:bg-white group-hover:text-brand",
  }[variant];
  const content = (
    <>
      {children}
      <span
        className={`flex size-10 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 group-hover:-rotate-45 ${arrow}`}
      >
        →
      </span>
    </>
  );
  const cls = `group inline-flex h-14 shrink-0 items-center gap-3 rounded-full pl-7 pr-2 font-medium transition-colors ${styles} ${className}`;

  return external ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>
      {content}
    </a>
  ) : (
    <Link href={to} className={cls}>
      {content}
    </Link>
  );
}

/** "Talk to a human" (booking) and "Start a project" (contact form). */
export function HumanActions({ tone = "dark" }: { tone?: Tone }) {
  const { t, lang, links } = useLocale();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Magnetic>
        <ButtonLink
          href={links.booking}
          external
          variant={tone === "dark" ? "light" : "dark"}
        >
          {t.common.human}
        </ButtonLink>
      </Magnetic>
      <ButtonLink
        href={href(lang, "contact")}
        variant={tone === "dark" ? "outline" : "outline-dark"}
      >
        {t.common.start}
      </ButtonLink>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  badge,
  actions,
  aside,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  badge?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  crumbs?: { label: string; href: string }[];
}) {
  const { t, lang } = useLocale();
  const trail = crumbs
    ? [{ label: t.common.breadcrumbHome, href: href(lang, "home") }, ...crumbs]
    : null;

  return (
    <section
      id="top"
      className="grain relative overflow-hidden bg-night px-5 pb-20 pt-32 text-white md:px-10 md:pb-28 md:pt-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_85%_20%,rgba(71,102,255,0.3),transparent_70%),radial-gradient(40%_40%_at_0%_100%,rgba(21,37,112,0.5),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
      />

      <div
        className={`relative mx-auto grid max-w-7xl gap-14 ${aside ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""}`}
      >
        <div>
          {trail && (
            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="eyebrow mb-8 flex flex-wrap items-center gap-2 text-white/40"
            >
              {trail.map((c, i) => (
                <span key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i < trail.length - 1 ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/70">
                      {c.label}
                    </span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}
          {(badge || eyebrow) && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/75"
            >
              {badge ?? eyebrow}
            </motion.p>
          )}
          <RevealHeading
            as="h1"
            text={title}
            className={`mt-6 font-serif leading-[0.92] tracking-[-0.02em] ${aside ? "text-[clamp(3.2rem,7vw,6.5rem)]" : "max-w-5xl text-[clamp(3.5rem,9vw,8.5rem)]"}`}
          />
          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-7 max-w-xl text-lg text-white/65 md:text-xl"
            >
              {intro}
            </motion.p>
          )}
          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="mt-10"
            >
              {actions}
            </motion.div>
          )}
        </div>
        {aside && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
          >
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: Tone;
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div
      className={`grid gap-6 md:grid-cols-[1fr_auto] md:items-end ${className}`}
    >
      <div>
        {eyebrow && (
          <p
            className={`eyebrow ${light ? "text-brand-deep" : "text-brand-sky"}`}
          >
            {eyebrow}
          </p>
        )}
        <RevealHeading
          text={title}
          accentClassName={`italic ${light ? "text-brand-deep" : "text-brand-sky"}`}
          className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl"
        />
      </div>
      {intro && (
        <FadeIn>
          <p className={`max-w-sm ${light ? "text-ink/60" : "text-white/55"}`}>
            {intro}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

/** Website screenshot inside browser chrome. Tall screenshots scroll on hover. */
export function BrowserFrame({
  src,
  alt,
  url,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  preload = false,
  className = "aspect-[4/3]",
  tone = "dark",
  loader,
}: {
  src: string;
  alt: string;
  url: string;
  /** Custom next/image loader, e.g. for CMS images the Sanity CDN resizes itself. */
  loader?: ImageLoader;
  sizes?: string;
  preload?: boolean;
  className?: string;
  tone?: Tone;
}) {
  const light = tone === "light";
  return (
    <div
      className={`group overflow-hidden rounded-[1.4rem] border shadow-[0_40px_100px_-30px_rgba(7,8,13,0.85)] ${
        light ? "border-ink/10 bg-white" : "border-white/10 bg-night-soft"
      }`}
    >
      <div
        className={`flex items-center gap-3 border-b px-4 py-3 ${light ? "border-ink/10" : "border-white/10"}`}
      >
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span
          className={`mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-full px-4 py-1 font-mono text-[11px] ${
            light ? "bg-ink/5 text-ink/55" : "bg-white/5 text-white/50"
          }`}
        >
          <span aria-hidden>🔒</span> {url}
        </span>
        <span className="w-10" />
      </div>
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          loader={loader}
          className="object-cover object-top transition-[object-position] duration-[4s] ease-in-out group-hover:object-bottom"
        />
      </div>
    </div>
  );
}

export type Mark = "yes" | "no" | "partial";

export function ComparisonTable({
  rows,
  columns,
  tone = "light",
}: {
  rows: { label: string; values: [Mark, Mark, Mark] }[];
  columns?: [string, string, string];
  tone?: Tone;
}) {
  const { t } = useLocale();
  const c = t.common.comparison;
  const heads = columns ?? [c.techflow, c.agencies, c.freelancers];
  const light = tone === "light";
  const label = { yes: c.yes, no: c.no, partial: c.partial };

  return (
    <div
      className={`relative overflow-x-auto rounded-[2rem] border ${light ? "border-ink/10 bg-white" : "border-white/10 bg-night-soft"}`}
    >
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className={light ? "text-ink/50" : "text-white/50"}>
            <th scope="col" className="eyebrow p-5 font-normal md:p-6">
              {c.criterion}
            </th>
            {heads.map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`p-5 text-center text-sm font-medium md:p-6 ${
                  i === 0 ? "rounded-t-3xl bg-brand-deep text-white" : ""
                }`}
              >
                {i === 0 ? (
                  <Image
                    src="/images/techflow-logo.svg"
                    alt={h}
                    width={179}
                    height={36}
                    className="mx-auto h-5 w-auto"
                  />
                ) : (
                  h
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr
              key={row.label}
              className={`border-t ${light ? "border-ink/10" : "border-white/10"}`}
            >
              <th scope="row" className="p-5 font-medium md:p-6">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td
                  key={i}
                  className={`p-5 text-center md:p-6 ${i === 0 ? "bg-brand-deep text-white" : ""} ${
                    i === 0 && r === rows.length - 1 ? "rounded-b-3xl" : ""
                  }`}
                >
                  <MarkIcon mark={v} highlight={i === 0} light={light} />
                  <span className="sr-only">{label[v]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MarkIcon({
  mark,
  highlight,
  light,
}: {
  mark: Mark;
  highlight: boolean;
  light: boolean;
}) {
  if (mark === "yes")
    return (
      <span
        aria-hidden
        className={`inline-flex size-8 items-center justify-center rounded-full text-sm ${
          highlight
            ? "bg-white text-brand-deep"
            : light
              ? "bg-emerald-500/15 text-emerald-700"
              : "bg-emerald-400/15 text-emerald-300"
        }`}
      >
        ✓
      </span>
    );
  if (mark === "partial")
    return (
      <span
        aria-hidden
        className={`inline-flex size-8 items-center justify-center rounded-full text-sm ${light ? "bg-amber-500/15 text-amber-700" : "bg-amber-400/15 text-amber-300"}`}
      >
        ~
      </span>
    );
  return (
    <span
      aria-hidden
      className={`inline-flex size-8 items-center justify-center rounded-full text-sm ${light ? "bg-ink/5 text-ink/35" : "bg-white/5 text-white/30"}`}
    >
      ✕
    </span>
  );
}

/** Every logo gets the same visual area (in px² at desktop size), so wide wordmarks and compact marks weigh the same. */
const LOGO_AREA = 4400;
const LOGO_MAX_HEIGHT = 46;

/** `optical` nudges logos whose stroke weight makes them read bigger or smaller than their area. */
const logoSize = ({ width, height, optical = 1 }: { width: number; height: number; optical?: number }) => {
  const ratio = width / height;
  const h = Math.min(LOGO_MAX_HEIGHT, Math.sqrt(LOGO_AREA / ratio)) * optical;
  return { height: h, width: h * ratio };
};

export function ClientMarquee({
  label,
  tone = "dark",
}: {
  label?: string;
  tone?: Tone;
}) {
  const light = tone === "light";
  return (
    <div>
      {label && (
        <p
          className={`eyebrow text-center ${light ? "text-ink/40" : "text-white/40"}`}
        >
          {label}
        </p>
      )}
      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        {/* Logos scale down to 80% on phones. */}
        <ul className="flex w-max animate-marquee items-center gap-12 [--logo-scale:0.8] md:gap-16 md:[--logo-scale:1]">
          {[...clients, ...clients].map((client, i) => {
            const size = logoSize(client);
            return (
              <li key={i} aria-hidden={i >= clients.length} className="shrink-0">
                <Image
                  src={client.src}
                  alt={i < clients.length ? client.name : ""}
                  width={client.width}
                  height={client.height}
                  style={{
                    width: `calc(${size.width.toFixed(1)}px * var(--logo-scale))`,
                    height: `calc(${size.height.toFixed(1)}px * var(--logo-scale))`,
                  }}
                  className={`object-contain opacity-50 brightness-0 transition-opacity hover:opacity-100 ${light ? "" : "invert"}`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function QuoteCard({
  quote,
  name,
  role,
  photo,
}: {
  quote: string;
  name: string;
  role: string;
  photo?: string;
}) {
  return (
    <section className="bg-night px-5 py-10 md:px-10">
      <FadeIn className="mx-auto max-w-7xl rounded-[2.5rem] bg-paper px-6 py-16 text-ink md:rounded-[3.5rem] md:px-20 md:py-24">
        <figure className="mx-auto max-w-4xl">
          <span
            aria-hidden
            className="block font-serif text-8xl leading-[0.5] text-brand-deep"
          >
            &ldquo;
          </span>
          <blockquote className="mt-6 font-serif text-3xl leading-[1.15] md:text-5xl">
            {quote}
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-4">
            {photo ? (
              <Image
                src={photo}
                alt=""
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-deep font-serif text-xl text-white">
                {name[0]}
              </span>
            )}
            <span>
              <span className="block font-medium">{name}</span>
              <span className="block text-sm text-ink/55">{role}</span>
            </span>
          </figcaption>
        </figure>
      </FadeIn>
    </section>
  );
}

export function NextSteps({
  second,
}: {
  second?: { title: string; text: string };
}) {
  const { t } = useLocale();
  const n = t.common.nextSteps;
  const steps = n.steps.map((s, i) => (i === 1 && second ? second : s));

  return (
    <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={n.eyebrow} title={n.heading} intro={n.intro} />
        <ol className="relative mt-16 grid gap-4 md:grid-cols-5">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-linear-to-r from-brand-sky via-white/15 to-transparent md:block"
          />
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <li className="relative h-full">
                <span
                  className={`relative flex size-12 items-center justify-center rounded-full border font-serif text-xl ${i === 0 ? "border-brand bg-brand text-white" : "border-white/15 bg-night text-white/70"}`}
                >
                  {i + 1}
                </span>
                <p className="eyebrow mt-6 text-white/40">
                  {t.common.step} {i + 1}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {s.text}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:p-8">
          <p className="text-white/60">{t.common.reassurance}</p>
          <HumanActions />
        </div>
      </div>
    </section>
  );
}

export function Chip({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-sm ${tone === "light" ? "border-ink/15 text-ink/75" : "border-white/15 text-white/80"}`}
    >
      {children}
    </span>
  );
}

export type MuxVideoItem = {
  kind: "video";
  playbackId: string;
  name?: string;
  aspectRatio?: string;
  role?: string;
};

/** Fired when a testimonial starts playing with sound, so the others go back to their silent loop. */
const SOUND_EVENT = "techflow:video-sound";

/**
 * Video testimonial. Plays as a silent loop while on screen (the source only loads near the
 * viewport; carousels render each card several times) and never autoplays with reduced motion.
 * The blue button restarts the same video from the beginning with sound; while it talks, a click on
 * the video pauses it and the button comes back. Only one testimonial plays with sound at a time.
 * `decorative` copies (a carousel's duplicate) are hidden from keyboard and screen readers.
 */
export function MuxCard({
  item,
  className = "",
  decorative = false,
}: {
  item: MuxVideoItem;
  className?: string;
  decorative?: boolean;
}) {
  const { t } = useLocale();
  const [near, setNear] = useState(false);
  const [sound, setSound] = useState(false);
  const [paused, setPaused] = useState(false);
  const still = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load the loop once the card comes near the viewport, then play it only while it's visible.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        const video = videoRef.current;
        if (!near || !video || (still && !sound)) return;
        if (entry.isIntersecting) {
          if (!sound) video.play().catch(() => {});
        } else video.pause();
      },
      { rootMargin: "200px" },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [still, sound, near]);

  // Back to the silent loop when another testimonial starts talking.
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent<HTMLVideoElement>).detail !== videoRef.current) silence();
    };
    window.addEventListener(SOUND_EVENT, onOther);
    return () => window.removeEventListener(SOUND_EVENT, onOther);
  });

  function silence() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.loop = true;
    setSound(false);
    setPaused(false);
    if (!still) video.play().catch(() => {});
    else video.pause();
  }

  function playWithSound() {
    const video = videoRef.current;
    if (!video) return;
    if (!near) setNear(true);
    video.currentTime = 0;
    video.muted = false;
    video.loop = false;
    setSound(true);
    setPaused(false);
    window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: video }));
    // The source is set on the next render if the card was never near the viewport.
    requestAnimationFrame(() => video.play().catch(() => setPaused(true)));
  }

  const showButton = !sound || paused;

  return (
    <div
      ref={cardRef}
      data-playing={sound && !paused ? "" : undefined}
      className={`relative h-full w-auto shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-night-soft transition-colors hover:border-brand/50 ${className}`}
      style={{
        aspectRatio: item.aspectRatio || "9 / 16",
        contain: "paint layout",
      }}
    >
      {/* Mux only serves these videos as HLS streams (no MP4), which Chrome can't play in a plain
          <video>; MuxVideo is a <video> with HLS support, sized to the card, without Mux Data tracking. */}
      <MuxVideo
        ref={(el) => {
          videoRef.current = el ?? null;
          // Native muted autoplay (MuxVideo's own \`autoplay\` prop leaks onto the DOM as an invalid attribute).
          if (el && !sound) el.autoplay = !still;
        }}
        playbackId={near ? item.playbackId : undefined}
        poster={`https://image.mux.com/${item.playbackId}/thumbnail.webp?time=1`}
        muted
        loop
        playsInline
        // The stream is only attached near the viewport (playbackId above), so load it right away then.
        preload="auto"
        capRenditionToPlayerSize
        disableTracking
        disableCookies
        aria-hidden={!sound}
        onClick={() => {
          const video = videoRef.current;
          if (!sound || !video) return;
          if (video.paused) video.play().catch(() => {});
          else video.pause();
        }}
        onPause={() => sound && setPaused(true)}
        onPlay={() => setPaused(false)}
        onEnded={silence}
        className={`h-full w-full object-cover ${sound ? "cursor-pointer" : ""}`}
      />

      {/* Darkens the silent loop so the button and caption stand out; lifts while it talks. */}
      <div className={`pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-300 ${sound && !paused ? "opacity-0" : ""}`} />

      {showButton && (
        <button
          type="button"
          aria-label={`${t.common.playVideo}${item.name ? `: ${item.name}` : ""}`}
          tabIndex={decorative ? -1 : undefined}
          onClick={playWithSound}
          className="absolute left-1/2 top-1/2 z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#4766ff] shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" className="ml-0.5" aria-hidden>
            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
          </svg>
        </button>
      )}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-sm font-medium text-white">{item.name}</h3>
        <p className="text-sm text-white/55">{item.role}</p>
      </div>
    </div>
  );
}
