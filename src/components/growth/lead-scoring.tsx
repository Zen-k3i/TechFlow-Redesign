"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ease } from "../site/content";
import { RevealHeading } from "../site/reveal";
import type { AdVideo } from "./data";

const funnel = [
  { label: "Impressions", detail: "Les 5 vidéos dans les fils Facebook, Instagram et TikTok" },
  { label: "Vues engagées", detail: "Visionnage au-delà des 3 premières secondes" },
  { label: "Clics & messages", detail: "Formulaire instantané ou conversation WhatsApp" },
  { label: "Leads scorés", detail: "Chaque contact reçoit un score de 0 à 100" },
  { label: "Rendez-vous commerciaux", detail: "Les leads chauds, transmis en temps réel" },
];

const criteria = [
  { id: "budget", label: "Budget déclaré compatible", points: 30 },
  { id: "timing", label: "Achat prévu sous 6 mois", points: 25 },
  { id: "reply", label: "A répondu sur WhatsApp", points: 20 },
  { id: "watch", label: "Vidéo regardée à plus de 75 %", points: 15 },
  { id: "profile", label: "Profil investisseur ou résident ciblé", points: 10 },
];

const sampleLeads = [
  { name: "Lead · Investisseur", ad: 1, met: ["budget", "timing", "reply", "watch"] },
  { name: "Lead · Futur résident", ad: 2, met: ["watch", "profile", "reply"] },
  { name: "Lead · Curieux", ad: 0, met: ["watch"] },
];

function tier(score: number) {
  if (score >= 70) return { label: "Chaud", action: "Appel commercial sous 24 h", color: "#34d399" };
  if (score >= 40) return { label: "Tiède", action: "Séquence WhatsApp + retargeting", color: "#fbbf24" };
  return { label: "Froid", action: "Audience de retargeting", color: "#94a3b8" };
}

export function LeadScoring({ ads }: { ads: AdVideo[] }) {
  const leads = sampleLeads.map((l) => {
    const ad = ads[l.ad % ads.length];
    return { ...l, origin: `Vidéo 0${(l.ad % ads.length) + 1} · ${ad.angle}` };
  });
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [index, setIndex] = useState(0);
  const lead = leads[index];
  const score = criteria.filter((c) => lead.met.includes(c.id)).reduce((s, c) => s + c.points, 0);
  const t = tier(score);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % sampleLeads.length), 4500);
    return () => clearTimeout(id);
  }, [index, inView]);

  return (
    <section id="leads" className="relative bg-night px-5 pb-28 text-white md:px-10 md:pb-36">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-(--accent)">Génération & qualification</p>
        <RevealHeading
          text="Des leads, puis *les bons leads.*"
          accentClassName="italic text-(--accent)"
          className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <ol className="space-y-2">
            {funnel.map((f, i) => (
              <motion.li
                key={f.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                style={{ width: `${100 - i * 11}%` }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1"
                  style={{ background: `color-mix(in oklab, var(--accent) ${40 + i * 15}%, transparent)` }}
                />
                <span className="eyebrow text-white/40">0{i + 1}</span>
                <span className="mt-1 block font-medium">{f.label}</span>
                <span className="mt-0.5 block text-sm text-white/50">{f.detail}</span>
              </motion.li>
            ))}
            <li className="pt-4 text-sm text-white/45">
              ↺ Les retours des commerciaux sur chaque lead réentraînent le ciblage chaque semaine.
            </li>
          </ol>

          <div ref={ref} className="rounded-[2rem] border border-white/10 bg-night-soft p-6 md:p-10">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-white/45">Scoring en temps réel</p>
              <div className="flex gap-1.5">
                {leads.map((l, i) => (
                  <button
                    key={l.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={l.name}
                    className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-(--accent)" : "w-1.5 bg-white/25"}`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={lead.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease }}>
                <div className="mt-6 flex items-center justify-between gap-6">
                  <div>
                    <p className="text-xl font-medium">{lead.name}</p>
                    <p className="text-sm text-white/45">Source : {lead.origin}</p>
                  </div>
                  <Gauge score={score} color={t.color} />
                </div>

                <ul className="mt-8 space-y-2.5">
                  {criteria.map((c, i) => {
                    const ok = lead.met.includes(c.id);
                    return (
                      <motion.li
                        key={c.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.07 }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${ok ? "bg-white/[0.07]" : "text-white/35"}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`flex size-5 items-center justify-center rounded-full text-[11px] ${ok ? "bg-(--accent) text-night" : "border border-white/20"}`}>{ok ? "✓" : ""}</span>
                          {c.label}
                        </span>
                        <span className="font-mono text-xs">+{c.points}</span>
                      </motion.li>
                    );
                  })}
                </ul>

                <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl p-4" style={{ background: `color-mix(in oklab, ${t.color} 14%, transparent)` }}>
                  <span className="flex items-center gap-2 font-medium" style={{ color: t.color }}>
                    <span className="size-2 rounded-full" style={{ background: t.color }} /> {t.label}
                  </span>
                  <span className="text-sm text-white/80">→ {t.action}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="mt-5 text-xs text-white/35">Exemple de grille. Les critères et les pondérations sont définis avec votre équipe commerciale.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gauge({ score, color }: { score: number; color: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - score / 100) }}
          transition={{ duration: 1, ease }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-3xl leading-none">{score}</span>
        <span className="eyebrow text-white/40">/100</span>
      </span>
    </div>
  );
}
