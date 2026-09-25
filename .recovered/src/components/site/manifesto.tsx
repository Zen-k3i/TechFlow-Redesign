"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const text =
  "Chez TechFlow, nous sommes convaincus qu'une expérience numérique de qualité ne devrait pas demander des mois de travail. Pas parce que nous allons vite : parce que nous avons supprimé les allers-retours.";

const emphasis = new Set(["mois", "vite", "supprimé", "allers-retours."]);

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = text.split(" ");

  return (
    <section id="manifeste" ref={ref} className="grain relative h-[260svh] bg-cream text-ink">
      <div className="sticky top-0 flex h-svh flex-col justify-center px-6 md:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="label flex items-center justify-between text-ink/50">
            <span>Salle I — Note du conservateur</span>
            <span className="hidden sm:inline">Texte mural, 2026</span>
          </div>
          <p className="mt-10 font-serif text-[clamp(2.1rem,5.2vw,4.8rem)] leading-[1.05] tracking-[-0.01em]">
            {words.map((word, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                <span className={emphasis.has(word) ? "italic text-brand-deep" : undefined}>{word}</span>
              </Word>
            ))}
          </p>
          <div className="mt-12 grid gap-8 border-t border-ink/15 pt-8 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <p className="max-w-md text-ink/70">
              Nous couvrons toute la chaîne : recherche, design system, développement, automatisation par l&apos;IA. Les
              technologies changent chaque trimestre, notre exigence sur ce qui part en production, elle, ne bouge pas.
            </p>
            <dl className="grid grid-cols-3 gap-6">
              {[
                ["12", "ans"],
                ["45+", "projets livrés"],
                ["35+", "clients"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-serif text-5xl leading-none">{n}</dt>
                  <dd className="label mt-2 text-ink/50">{l}</dd>
                </div>
              ))}
            </dl>
            <p className="label text-ink/50">— L&apos;équipe TechFlow</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = [range[0] * 0.75, range[1] * 0.75];
  const opacity = useTransform(progress, (p) => 0.12 + 0.88 * Math.min(1, Math.max(0, (p - start) / (end - start))));
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
