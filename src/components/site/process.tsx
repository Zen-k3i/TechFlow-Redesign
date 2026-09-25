"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import type { Dictionary } from "@/i18n/fr";
import { ease } from "./content";
import { useLocale } from "./locale";
import { RevealHeading } from "./reveal";

export function Process() {
  const { t } = useLocale();
  const steps = t.process.steps;
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const fill = useTransform(scrollYProgress, (p) => Math.min(1, Math.max(0, p)));
  const [current, setCurrent] = useState(0);

  return (
    <section id="methode" className="relative overflow-hidden bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_0%_50%,rgba(54,71,245,0.18),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-brand-sky">{t.process.eyebrow}</p>
          <RevealHeading
            text={t.process.heading}
            className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl"
          />
          <p className="mt-6 max-w-md text-white/55">
            {t.process.intro}
          </p>
          <div className="mt-12 hidden items-end gap-4 lg:flex">
            <span className="eyebrow pb-3 text-white/40">{t.process.week}</span>
            <div className="relative h-36 w-28 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease }}
                  className="absolute inset-0 font-serif text-[9rem] leading-none text-brand-sky"
                >
                  {current + 1}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="pb-3 font-serif text-4xl text-white/30">/ 5</span>
          </div>
        </div>

        <ol ref={listRef} className="relative space-y-4 pl-8 md:pl-12">
          <span aria-hidden className="absolute bottom-0 left-2 top-0 w-px bg-white/10 md:left-4" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-2 top-0 w-px origin-top bg-linear-to-b from-brand-sky to-brand-deep md:left-4"
          />
          {steps.map((step, i) => (
            <Step key={step.week} step={step} index={i} onEnter={setCurrent} active={current === i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
  active,
  onEnter,
}: {
  step: Dictionary["process"]["steps"][number];
  index: number;
  active: boolean;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li ref={ref} className="relative">
      <span
        aria-hidden
        className={`absolute -left-[1.85rem] top-9 size-3 rounded-full border-2 transition-colors duration-500 md:-left-[2.35rem] ${
          active ? "border-brand-sky bg-brand-sky shadow-[0_0_20px_rgba(71,145,255,0.8)]" : "border-white/25 bg-night"
        }`}
      />
      <div
        className={`rounded-3xl border p-7 transition-[background-color,border-color,opacity] duration-500 md:p-9 ${
          active ? "border-white/15 bg-white/[0.05] opacity-100" : "border-transparent opacity-45"
        }`}
      >
        <p className="eyebrow text-brand-sky">{step.week}</p>
        <h3 className="mt-3 font-serif text-3xl md:text-4xl">{step.title}</h3>
        <p className="mt-3 max-w-lg text-white/60">{step.text}</p>
      </div>
    </li>
  );
}
