"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { RevealHeading } from "../site/reveal";
import type { AdVideo } from "./data";

/** Budget share (%) and relative cost per lead for each variant, week by week. Illustrative only. */
const weeks = [
  { budget: [34, 33, 33], cpl: [1.0, 1.15, 1.6], note: "Lancement : budget réparti à parts égales entre les trois accroches." },
  { budget: [42, 38, 20], cpl: [0.92, 1.05, 1.7], note: "Premiers signaux : C coûte plus cher par lead, on réduit sa part." },
  { budget: [52, 40, 8], cpl: [0.85, 0.98, 1.8], note: "A et B convertissent, C passe en mode test minimal." },
  { budget: [58, 42, 0], cpl: [0.8, 0.9, 0], note: "C est coupée. Une nouvelle accroche entre en test la semaine suivante." },
];

export function AbTest({ ads }: { ads: AdVideo[] }) {
  const [week, setWeek] = useState(0);
  const variants = ads.slice(0, 3).map((ad, i) => ({ id: "ABC"[i], hook: `« ${ad.hook} »`, tone: ad.angle }));
  const w = weeks[week];
  const maxCpl = 1.8;

  return (
    <section id="ab-testing" className="relative bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow text-(--accent)">A/B testing & pilotage</p>
          <RevealHeading
            text="Le budget va *là où ça convertit.*"
            accentClassName="italic text-(--accent)"
            className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl"
          />
          <p className="mt-6 max-w-md text-white/60">
            Chaque vidéo tourne en plusieurs versions. On compare le coût par lead, la qualité des prospects et le taux
            de visionnage, puis on réalloue le budget chaque semaine. Faites glisser pour voir comment une campagne
            évolue.
          </p>
          <p className="mt-8 text-xs text-white/35">Simulation illustrative. Les chiffres réels de la campagne sont partagés en rendez-vous.</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-night-soft p-6 md:p-10">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-white/45">Semaine {week + 1} / 4</p>
            <p className="eyebrow text-white/45">Part du budget · Coût par lead</p>
          </div>

          <ul className="mt-8 space-y-6">
            {variants.map((v, i) => {
              const off = w.budget[i] === 0;
              const best = w.cpl[i] > 0 && w.cpl[i] === Math.min(...w.cpl.filter((c) => c > 0));
              return (
                <li key={v.id} className={`transition-opacity duration-500 ${off ? "opacity-35" : ""}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3">
                      <span className={`flex size-8 items-center justify-center rounded-full text-sm font-medium ${best ? "bg-(--accent) text-night" : "bg-white/10"}`}>{v.id}</span>
                      <span>
                        <span className="block text-sm">{v.hook}</span>
                        <span className="eyebrow text-white/40">{v.tone}</span>
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <motion.span key={`${week}-${i}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="block font-serif text-3xl leading-none">
                        {w.budget[i]}%
                      </motion.span>
                      <span className="eyebrow text-white/40">{off ? "coupée" : best ? "gagnante" : "en test"}</span>
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      animate={{ width: `${w.budget[i]}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      className={`h-full rounded-full ${best ? "bg-(--accent)" : "bg-white/50"}`}
                    />
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      animate={{ width: `${(w.cpl[i] / maxCpl) * 100}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      className="h-full rounded-full bg-brand-sky/70"
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <input
            type="range"
            min={0}
            max={weeks.length - 1}
            step={1}
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            aria-label="Semaine de campagne"
            className="mt-10 w-full accent-(--accent)"
          />
          <div className="eyebrow mt-2 flex justify-between text-white/35">
            {weeks.map((_, i) => (
              <button key={i} type="button" onClick={() => setWeek(i)} className={week === i ? "text-white" : "hover:text-white/70"}>
                S{i + 1}
              </button>
            ))}
          </div>
          <motion.p key={week} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-white/70">
            {w.note}
          </motion.p>
          <p className="mt-4 flex items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-5 rounded-full bg-white/50" /> Part du budget
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-5 rounded-full bg-brand-sky/70" /> Coût par lead relatif
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
