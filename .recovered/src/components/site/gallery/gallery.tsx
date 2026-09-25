"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { caseStudyUrl, exhibits } from "../content";
import { exhibitStops } from "./layout";

const GalleryScene = dynamic(() => import("./scene").then((m) => m.GalleryScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gallery" />,
});

const ease = [0.22, 1, 0.36, 1] as const;

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const [active, setActive] = useState<number | "final" | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p > 0.93) return setActive("final");
    const nearest = exhibitStops.findIndex((stop) => Math.abs(p - stop) < 0.07);
    setActive(nearest === -1 ? null : nearest);
  });

  const introOpacity = useTransform(scrollYProgress, (p) => Math.max(0, 1 - p / 0.07));
  const introY = useTransform(scrollYProgress, (p) => Math.min(1, p / 0.07) * -40);
  const railScale = useTransform(scrollYProgress, (p) => p);

  const goToCollection = () => lenis?.scrollTo("#collection", { duration: 2 });
  const goToTickets = () => lenis?.scrollTo("#billetterie", { duration: 2.4 });

  return (
    <section id="galerie" ref={ref} className="relative h-[700svh] bg-gallery" aria-label="La Galerie TechFlow">
      <div className="sticky top-0 h-svh overflow-hidden">
        <GalleryScene
          progress={progress}
          onExhibitClick={(i) => window.open(caseStudyUrl(exhibits[i].slug), "_blank", "noopener")}
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_55%,rgba(11,10,9,0.85))]" />

        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-gallery via-gallery/70 via-35% to-transparent to-65%"
        />

        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 pb-14 md:px-12 md:pb-16"
        >
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="label text-brass">
            Salle 00 — Exposition permanente
          </motion.p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.02em] text-ivory">
            {["We design.", "We build."].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: "0.3em", filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease }}
                className="mr-[0.25em] inline-block"
              >
                {w}
              </motion.span>
            ))}
            <motion.em
              initial={{ opacity: 0, y: "0.3em", filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="inline-block text-brand-sky"
            >
              You grow.
            </motion.em>
          </h1>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ease }}
              className="max-w-md text-ivory/70 md:text-lg"
            >
              Design, Développement et IA. Une galerie de produits web qui n&apos;existe que dans votre navigateur, et
              qui fait grandir de vraies entreprises.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="label flex items-center gap-3 text-ivory/60"
            >
              <span className="relative flex h-9 w-5 justify-center rounded-full border border-ivory/40">
                <motion.span
                  animate={{ y: [4, 16, 4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute top-0 h-1.5 w-px bg-ivory"
                />
              </span>
              Faites défiler pour visiter
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {typeof active === "number" && (
            <motion.aside
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease }}
              className={`absolute bottom-8 w-[min(22rem,calc(100%-3rem))] rounded-sm bg-ivory p-5 text-gallery shadow-2xl md:bottom-12 ${
                active % 2 === 0 ? "right-6 md:right-12" : "left-6 md:left-12"
              }`}
            >
              <div className="label flex justify-between text-gallery/50">
                <span>Œuvre n° {String(active + 1).padStart(2, "0")}</span>
                <span>{exhibits[active].sector}</span>
              </div>
              <h2 className="mt-3 font-serif text-4xl leading-none">{exhibits[active].name}</h2>
              <p className="mt-3 text-sm text-gallery/60">{exhibits[active].disciplines.join(" · ")}</p>
              <a
                href={caseStudyUrl(exhibits[active].slug)}
                target="_blank"
                rel="noreferrer"
                className="label mt-5 flex w-full items-center justify-between border-t border-gallery/15 pt-4 text-brand-deep"
              >
                Voir l&apos;étude de cas <span>↗</span>
              </a>
            </motion.aside>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {active === "final" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <p className="label text-brass">Œuvre n° 46 — Emplacement réservé</p>
              <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] text-ivory md:text-7xl">
                La prochaine œuvre de la collection, <em className="text-brand-sky">c&apos;est votre projet.</em>
              </h2>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={goToTickets}
                  className="h-12 rounded-full bg-ivory px-7 font-medium text-gallery transition-colors hover:bg-white"
                >
                  Réserver une visite
                </button>
                <button
                  type="button"
                  onClick={goToCollection}
                  className="h-12 rounded-full border border-ivory/30 px-7 text-ivory transition-colors hover:bg-white/10"
                >
                  Voir la collection
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute right-4 top-1/2 hidden h-48 -translate-y-1/2 flex-col items-center gap-3 md:flex">
          <span className="label text-ivory/40">00</span>
          <div className="relative w-px flex-1 bg-white/15">
            <motion.div style={{ scaleY: railScale }} className="absolute inset-0 origin-top bg-ivory" />
          </div>
          <span className="label text-ivory/40">46</span>
        </div>
      </div>
    </section>
  );
}
