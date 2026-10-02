"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m as motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { SOUND_EVENT } from "../page/ui";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { useStill } from "../site/use-still";
import { growthCopy } from "./copy";
import { PhoneMockup } from "./phone-mockup";
import { SocialAd } from "./social-ad";
import { asPlatform, PLATFORMS, SECTION_IDS, type Ad, type Brand, type Platform } from "./types";
import { useFocusTrap } from "./use-focus-trap";

/** "auto" shows each ad on the platform it runs on. */
type PlatformChoice = Platform | "auto";
const pick = (choice: PlatformChoice, ad: Ad) => (choice === "auto" ? asPlatform(ad.platform) : choice);

export function PlatformSwitch({ value, onChange, layoutId }: { value: PlatformChoice; onChange: (p: PlatformChoice) => void; layoutId: string }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const options: { id: PlatformChoice; label: string }[] = [{ id: "auto", label: c.asPublished }, ...PLATFORMS.map((id) => ({ id, label: c.platforms[id] }))];
  return (
    <div role="radiogroup" aria-label={c.platform} className="inline-flex max-w-full shrink-0 self-start overflow-x-auto rounded-full border border-white/15 bg-white/5 p-1 [scrollbar-width:none]">
      {options.map((p) => (
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={value === p.id}
          onClick={() => onChange(p.id)}
          className={`relative shrink-0 rounded-full px-3.5 py-2 text-sm transition-colors ${value === p.id ? "text-night" : "text-white/65 hover:text-white"}`}
        >
          {value === p.id && <motion.span layoutId={layoutId} className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
          <span className="relative">{p.label}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * The ads in phones, as they appear in the feed. Desktop: a staggered row, an ad plays muted while
 * hovered. Touch screens: a snap carousel where the centred ad plays muted. Click opens the modal
 * with sound. Nothing autoplays with reduced motion.
 */
export function AdsShowcase({ ads, brand, heading, intro }: { ads: Ad[]; brand: Brand; heading: string | null; intro: string | null }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const still = useStill();
  const [platform, setPlatform] = useState<PlatformChoice>("auto");
  const [hovered, setHovered] = useState<number | null>(null);
  const [centred, setCentred] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const list = useRef<HTMLUListElement>(null);

  // Touch screens: the card in the middle of the carousel plays.
  useEffect(() => {
    const root = list.current;
    if (!root || !window.matchMedia("(hover: none)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCentred(Number((e.target as HTMLElement).dataset.index));
      },
      { root, threshold: 0.8 },
    );
    root.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ads.length]);

  const scrollBy = (dir: number) => {
    const root = list.current;
    const card = root?.querySelector<HTMLElement>("[data-index]");
    if (root && card) root.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };

  const playing = still || open !== null ? null : (hovered ?? centred);

  return (
    <section id={SECTION_IDS.ads} className="relative overflow-hidden bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            {heading && <RevealHeading text={heading} accentClassName="italic text-(--accent)" className="max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl" />}
            {intro && (
              <FadeIn>
                <p className="mt-5 max-w-lg text-white/60">{intro}</p>
              </FadeIn>
            )}
          </div>
          <PlatformSwitch value={platform} onChange={setPlatform} layoutId="platform-grid" />
        </div>

        <ul
          ref={list}
          aria-label={heading?.replaceAll("*", "") ?? undefined}
          className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[19vw] pb-6 [scrollbar-width:none] sm:px-[30vw] md:mx-auto md:grid md:max-w-4xl md:snap-none md:gap-8 md:overflow-visible md:px-0"
          style={{ gridTemplateColumns: `repeat(${ads.length}, minmax(0, 1fr))` }}
        >
          {ads.map((ad, i) => (
            <motion.li
              key={ad._key}
              data-index={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease }}
              className="w-[62vw] shrink-0 snap-center sm:w-[40vw] md:w-auto"
            >
              <button
                type="button"
                aria-label={c.watchVideo(i + 1, ad.angle ?? "")}
                aria-haspopup="dialog"
                onClick={() => setOpen(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="group block w-full rounded-[2.6rem] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent)"
              >
                <TiltPhone still={still}>
                  <SocialAd ad={ad} brand={brand} platform={pick(platform, ad)} playing={playing === i} compact />
                  <span className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${playing === i ? "opacity-0" : "opacity-100"}`}>
                    <span className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                      <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="white" aria-hidden>
                        <path d="M7 4.5v15l12-7.5z" />
                      </svg>
                    </span>
                  </span>
                </TiltPhone>
                <div className="mt-5 px-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="eyebrow text-white/55">
                      {c.video} 0{i + 1}
                    </span>
                    {ad.duration && <span className="eyebrow text-white/55">{ad.duration}</span>}
                  </div>
                  <span className="mt-1 block text-xl font-medium">{ad.angle}</span>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>

        <div className="mt-4 flex justify-center gap-2 md:hidden">
          <button type="button" onClick={() => scrollBy(-1)} aria-label={c.previous} className="flex size-11 items-center justify-center rounded-full border border-white/20">
            ←
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label={c.next} className="flex size-11 items-center justify-center rounded-full border border-white/20">
            →
          </button>
        </div>
      </div>

      <AdModal ads={ads} brand={brand} index={open} platform={platform} onPlatform={setPlatform} onChange={setOpen} />
    </section>
  );
}

/** Full-screen player: sound on, play/pause, mute, seek, script; keyboard and screen-reader friendly. */
function AdModal({
  ads,
  brand,
  index,
  platform,
  onPlatform,
  onChange,
}: {
  ads: Ad[];
  brand: Brand;
  index: number | null;
  platform: PlatformChoice;
  onPlatform: (p: PlatformChoice) => void;
  onChange: (i: number | null) => void;
}) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const lenis = useLenis();
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0 });
  const count = ads.length;
  const isOpen = index !== null;
  useFocusTrap(box, isOpen);

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      setPaused(false);
      onChange((index + dir + count) % count);
    },
    [index, count, onChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight" && !(e.target instanceof HTMLInputElement)) go(1);
      if (e.key === "ArrowLeft" && !(e.target instanceof HTMLInputElement)) go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [isOpen, lenis, go, onChange]);

  // One video with sound at a time across the site (testimonials go back to their silent loop).
  const attach = useCallback((el: HTMLVideoElement | null) => {
    video.current = el;
    if (!el) return;
    el.currentTime = 0;
    window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: el }));
    el.ontimeupdate = () => setTime({ current: el.currentTime, duration: el.duration || 0 });
    el.onended = () => setPaused(true);
  }, []);

  const ad = index === null ? null : ads[index];

  return (
    <AnimatePresence>
      {ad && index !== null && (
        <motion.div
          ref={box}
          role="dialog"
          aria-modal="true"
          aria-label={`${c.video} ${index + 1} : ${ad.angle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-black/90 backdrop-blur-xl"
          onClick={() => onChange(null)}
        >
          <div className="mx-auto flex min-h-full max-w-6xl flex-col items-center justify-center gap-10 px-5 py-16 lg:flex-row lg:gap-20" onClick={(e) => e.stopPropagation()}>
            <motion.div
              key={ad._key}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease }}
              className="w-[min(72vw,340px)] lg:w-[min(34vh,360px)]"
            >
              <PhoneMockup>
                <SocialAd ad={ad} brand={brand} platform={pick(platform, ad)} playing={!paused} muted={muted} mediaRef={ad.video ? attach : undefined} />
              </PhoneMockup>
              {ad.video && (
                <div className="mt-4 flex items-center gap-3">
                  <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? c.play : c.pause} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-night">
                    {paused ? (
                      <svg viewBox="0 0 24 24" className="ml-0.5 size-5" fill="currentColor" aria-hidden>
                        <path d="M7 4.5v15l12-7.5z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                        <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={time.duration || 1}
                    step={0.1}
                    value={time.current}
                    onChange={(e) => {
                      if (video.current) video.current.currentTime = Number(e.target.value);
                    }}
                    aria-label={c.seek}
                    className="min-w-0 flex-1 accent-(--accent)"
                  />
                  <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? c.unmute : c.mute} aria-pressed={muted} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20">
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                      <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
                      {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />}
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>

            <div className="w-full max-w-md text-white">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-(--accent)">
                  {c.video} 0{index + 1} / 0{count}
                  {ad.duration ? ` · ${ad.duration}` : ""}
                </p>
                <button type="button" onClick={() => onChange(null)} className="flex size-11 items-center justify-center rounded-full border border-white/20 text-xl hover:bg-white/10" aria-label={c.close}>
                  ×
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={ad._key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3, ease }}>
                  <h3 className="mt-4 font-serif text-5xl leading-none">{ad.angle}</h3>
                  {ad.hook && <p className="mt-4 text-lg text-white/70">&ldquo;{ad.hook}&rdquo;</p>}
                  {ad.note && (
                    <p className="mt-5 rounded-2xl border border-(--accent)/30 bg-(--accent)/10 p-4 text-sm text-white/80">
                      <span className="eyebrow mb-1 block text-(--accent)">{c.tested}</span>
                      {ad.note}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <PlatformSwitch value={platform} onChange={onPlatform} layoutId="platform-modal" />
                <div className="flex gap-2">
                  <button type="button" onClick={() => go(-1)} className="flex size-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10" aria-label={c.previous}>
                    ←
                  </button>
                  <button type="button" onClick={() => go(1)} className="flex size-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10" aria-label={c.next}>
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const tiltSpring = { stiffness: 180, damping: 18 };

/**
 * The project cards' hover, on a phone: it tilts toward the cursor, a soft light follows the
 * pointer across the screen and the accent glows behind it. Flat with reduced motion.
 */
function TiltPhone({ still, children }: { still: boolean; children: React.ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), tiltSpring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), tiltSpring);
  const glareX = useTransform(mx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(my, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 55%)`;

  return (
    <div className="relative [perspective:1100px]">
      <span aria-hidden className="absolute inset-x-[10%] bottom-[5%] top-[30%] rounded-full bg-(--glow) opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
      <motion.div
        style={{ rotateX, rotateY }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || still) return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="relative transition-shadow duration-700"
      >
        <PhoneMockup className="transition-shadow duration-700 group-hover:shadow-[0_50px_80px_-30px_rgba(0,0,0,0.85)]">
          {children}
          {!still && <motion.span aria-hidden className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: glare }} />}
        </PhoneMockup>
      </motion.div>
    </div>
  );
}
