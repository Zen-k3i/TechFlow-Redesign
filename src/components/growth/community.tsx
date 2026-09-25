"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ease } from "../site/content";
import { RevealHeading } from "../site/reveal";
import type { GrowthCaseStudy } from "./data";
import { PhoneFrame } from "./phone";

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function Community({ study }: { study: GrowthCaseStudy }) {
  const { community, handle, accent } = study;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [step, setStep] = useState(0);
  const total = community.thread.length * 2;

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % (total + 2)), step === total + 1 ? 2500 : 1600);
    return () => clearTimeout(id);
  }, [step, inView, total]);

  const scheduled = new Set(community.calendar.map((c) => c.day.slice(0, 3)));

  return (
    <section id="communaute" className="relative rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow text-brand-deep">Community management</p>
          <RevealHeading
            text="Chaque commentaire *reçoit une réponse.*"
            accentClassName="italic text-brand-deep"
            className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl"
          />
          <p className="mt-6 max-w-lg text-ink/60">
            Une publicité attire l&apos;attention, la page la convertit. On publie {community.perWeek} contenus par
            semaine pour nourrir la confiance, et on répond à chaque commentaire et message : un prospect qui obtient
            une réponse rapide ne part pas chez le concurrent.
          </p>

          <div className="mt-12 rounded-[1.75rem] border border-ink/10 bg-white p-5 md:p-7">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-ink/45">Calendrier éditorial type</p>
              <p className="eyebrow text-brand-deep">{community.perWeek} posts / semaine</p>
            </div>
            <div className="mt-5 grid grid-cols-7 gap-1.5">
              {days.map((d) => (
                <div
                  key={d}
                  className={`rounded-xl py-3 text-center text-sm ${scheduled.has(d) ? "bg-brand-deep text-white" : "bg-ink/[0.04] text-ink/40"}`}
                >
                  {d}
                </div>
              ))}
            </div>
            <ul className="mt-5 space-y-2">
              {community.calendar.map((c, i) => (
                <motion.li
                  key={c.day}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease }}
                  className="flex items-center justify-between gap-4 rounded-xl bg-ink/[0.03] px-4 py-3"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-20 text-sm font-medium">{c.day}</span>
                    <span className="text-sm text-ink/70">{c.title}</span>
                  </span>
                  <span className="eyebrow shrink-0 rounded-full border border-ink/15 px-2.5 py-1 text-ink/55">{c.format}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={ref} className="mx-auto w-[min(80vw,340px)]">
          <PhoneFrame>
            <div className="absolute inset-0 flex flex-col bg-white text-ink [font-size:3.6cqw]">
              <div className="h-[30%] shrink-0" style={{ background: `linear-gradient(160deg, ${accent}, #0b0a08 80%)` }}>
                <div className="flex h-full items-end p-[6%] text-white">
                  <span className="font-serif text-[1.6em] leading-tight">Sunset from the 60th floor 🌇</span>
                </div>
              </div>
              <div className="flex items-center justify-center border-b border-ink/10 py-[3%] text-[1em] font-semibold">Comments</div>
              <div className="relative flex-1 overflow-hidden px-[5%] py-[4%]">
                <ul className="space-y-[1em]">
                  {community.thread.map((c, i) => {
                    const showComment = step > i * 2;
                    const showReply = step > i * 2 + 1;
                    const typing = step === i * 2 + 1;
                    return (
                      <li key={c.author}>
                        <AnimatePresence>
                          {showComment && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-[0.6em]">
                              <span className="flex size-[2.2em] shrink-0 items-center justify-center rounded-full bg-ink/10 text-[0.85em] font-semibold uppercase">
                                {c.author[0]}
                              </span>
                              <span>
                                <span className="font-semibold">{c.author}</span> <span>{c.text}</span>
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                          {typing && (
                            <motion.p key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-[2.8em] mt-[0.5em] text-[0.85em] text-ink/45">
                              {handle} est en train d&apos;écrire…
                            </motion.p>
                          )}
                          {showReply && (
                            <motion.div key="reply" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="ml-[2.8em] mt-[0.5em] flex gap-[0.6em]">
                              <span className="flex size-[1.9em] shrink-0 items-center justify-center rounded-full font-serif text-[0.85em] text-white" style={{ background: accent }}>
                                G
                              </span>
                              <span>
                                <span className="font-semibold">{handle}</span>{" "}
                                <span className="rounded bg-ink/5 px-[0.3em] text-[0.75em] text-ink/50">Auteur</span> <span>{c.reply}</span>
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex items-center gap-[0.6em] border-t border-ink/10 px-[5%] py-[4%] text-ink/40">
                <span className="size-[2em] rounded-full bg-ink/10" />
                Ajouter un commentaire…
              </div>
            </div>
          </PhoneFrame>
          <p className="mt-4 text-center text-xs text-ink/40">Exemple d&apos;échanges modérés par notre équipe</p>
        </div>
      </div>
    </section>
  );
}
