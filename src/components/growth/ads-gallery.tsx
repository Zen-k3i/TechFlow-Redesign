"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ease } from "../site/content";
import { RevealHeading } from "../site/reveal";
import type { AdVideo, GrowthCaseStudy, Platform } from "./data";
import { AdScreen, PhoneFrame } from "./phone";

const platforms: { id: Platform; label: string }[] = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "tiktok", label: "TikTok" },
];

export function PlatformSwitch({
  value,
  onChange,
  layoutId,
}: {
  value: Platform;
  onChange: (p: Platform) => void;
  layoutId: string;
}) {
  return (
    <div role="radiogroup" aria-label="Plateforme" className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
      {platforms.map((p) => (
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={value === p.id}
          onClick={() => onChange(p.id)}
          className={`relative rounded-full px-4 py-2 text-sm transition-colors ${value === p.id ? "text-night" : "text-white/65 hover:text-white"}`}
        >
          {value === p.id && (
            <motion.span layoutId={layoutId} className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
          )}
          <span className="relative">{p.label}</span>
        </button>
      ))}
    </div>
  );
}

export function AdsGallery({ study }: { study: GrowthCaseStudy }) {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [preview, setPreview] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="publicites" className="relative overflow-hidden bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-(--accent)">Les créations</p>
            <RevealHeading
              text="Cinq vidéos, *cinq angles* d'achat."
              accentClassName="italic text-(--accent)"
              className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl"
            />
            <p className="mt-5 max-w-lg text-white/60">
              Chaque publicité répond à une raison d&apos;acheter différente. Cliquez sur un écran pour la regarder telle
              qu&apos;elle apparaît dans le fil de vos futurs clients, et lire le script qui la structure.
            </p>
          </div>
          <PlatformSwitch value={platform} onChange={setPlatform} layoutId="platform-grid" />
        </div>

        <ul className="-mx-5 mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {study.ads.map((ad, i) => (
            <motion.li
              key={ad.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease }}
              className={`w-[62vw] shrink-0 snap-center sm:w-[40vw] md:w-auto ${i % 2 === 1 ? "md:translate-y-12" : ""}`}
            >
              <button
                type="button"
                data-cursor="Regarder"
                aria-label={`Regarder la vidéo ${i + 1} : ${ad.angle}`}
                onClick={() => setOpen(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setPreview(i)}
                onPointerLeave={() => setPreview(null)}
                className="group block w-full text-left"
              >
                <motion.div whileHover={{ y: -10, rotate: i % 2 ? 1.5 : -1.5 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                  <PhoneFrame>
                    <AdScreen ad={ad} index={i} platform={platform} handle={study.handle} accent={study.accent} playing={preview === i} compact />
                    <span className="absolute inset-0 z-20 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                      <span className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="white">
                          <path d="M7 4.5v15l12-7.5z" />
                        </svg>
                      </span>
                    </span>
                  </PhoneFrame>
                </motion.div>
                <div className="mt-5 flex items-baseline justify-between gap-3 px-1">
                  <span>
                    <span className="eyebrow text-white/40">Vidéo 0{i + 1}</span>
                    <span className="mt-1 block font-medium">{ad.angle}</span>
                  </span>
                  <span className="eyebrow text-white/40">{ad.duration}</span>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AdLightbox study={study} index={open} platform={platform} onPlatform={setPlatform} onChange={setOpen} />
    </section>
  );
}

function AdLightbox({
  study,
  index,
  platform,
  onPlatform,
  onChange,
}: {
  study: GrowthCaseStudy;
  index: number | null;
  platform: Platform;
  onPlatform: (p: Platform) => void;
  onChange: (i: number | null) => void;
}) {
  const lenis = useLenis();
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const count = study.ads.length;
  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      setPaused(false);
      onChange((index + dir + count) % count);
    },
    [index, count, onChange],
  );

  useEffect(() => {
    if (index === null) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [index, lenis, go, onChange]);

  const ad: AdVideo | null = index === null ? null : study.ads[index];

  return (
    <AnimatePresence>
      {ad && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Vidéo ${index + 1} : ${ad.angle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-black/85 backdrop-blur-xl"
          onClick={() => onChange(null)}
        >
          <div className="mx-auto flex min-h-full max-w-6xl flex-col items-center justify-center gap-10 px-5 py-20 lg:flex-row lg:gap-20" onClick={(e) => e.stopPropagation()}>
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease }}
              className="relative w-[min(78vw,340px)] lg:w-[min(38vh,360px)] xl:w-[min(42vh,380px)]"
            >
              <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Lecture" : "Pause"} className="block w-full">
                <PhoneFrame>
                  <AdScreen ad={ad} index={index} platform={platform} handle={study.handle} accent={study.accent} playing={!paused} muted={muted} />
                  <AnimatePresence>
                    {paused && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
                        <span className="flex size-16 items-center justify-center rounded-full bg-white/25 backdrop-blur-md">
                          <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="white">
                            <path d="M7 4.5v15l12-7.5z" />
                          </svg>
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </PhoneFrame>
              </button>
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                className="absolute -right-3 top-16 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-night text-lg"
                aria-label={muted ? "Activer le son" : "Couper le son"}
              >
                {muted ? "🔇" : "🔊"}
              </button>
            </motion.div>

            <div className="w-full max-w-md text-white">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-(--accent)">
                  Vidéo 0{index + 1} / 0{count} · {ad.duration}
                </p>
                <button type="button" onClick={() => onChange(null)} className="flex size-11 items-center justify-center rounded-full border border-white/20 text-xl hover:bg-white/10" aria-label="Fermer">
                  ×
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={ad.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease }}>
                  <h3 className="mt-4 font-serif text-5xl leading-none">{ad.angle}</h3>
                  <p className="mt-4 text-lg text-white/70">&ldquo;{ad.hook}&rdquo;</p>
                  <p className="eyebrow mt-8 text-white/40">Structure du script</p>
                  <ol className="mt-4 space-y-3">
                    {ad.script.map((s) => (
                      <li key={s.beat} className="grid grid-cols-[4.5rem_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <span>
                          <span className="block text-sm font-medium text-(--accent)">{s.beat}</span>
                          <span className="eyebrow text-white/40">{s.time}</span>
                        </span>
                        <span className="text-sm leading-relaxed text-white/75">{s.line}</span>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </AnimatePresence>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <PlatformSwitch value={platform} onChange={onPlatform} layoutId="platform-lightbox" />
                <div className="flex gap-2">
                  <button type="button" onClick={() => go(-1)} className="flex size-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10" aria-label="Vidéo précédente">
                    ←
                  </button>
                  <button type="button" onClick={() => go(1)} className="flex size-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10" aria-label="Vidéo suivante">
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
