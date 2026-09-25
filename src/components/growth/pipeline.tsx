"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ease } from "../site/content";
import { RevealHeading } from "../site/reveal";

const steps = [
  {
    title: "Stratégie créative",
    short: "Stratégie",
    text: "Qui achète, pourquoi, et qu'est-ce qui le fait hésiter ? On définit les audiences, les angles d'achat et l'offre de conversion avant d'écrire une ligne.",
    tasks: ["Personas acheteurs et investisseurs", "Angles et promesses par audience", "Offre de conversion (visite, grille de prix)"],
    output: "Plateforme créative",
  },
  {
    title: "Scripts & copywriting",
    short: "Copywriting",
    text: "Chaque vidéo a un rôle précis dans le parcours. On écrit les scripts seconde par seconde, les accroches et les textes d'annonce en plusieurs versions.",
    tasks: ["5 scripts structurés hook → preuve → action", "Accroches déclinées pour l'A/B testing", "Textes d'annonces et CTA"],
    output: "5 scripts validés",
  },
  {
    title: "Tournage & post-production",
    short: "Production",
    text: "Repérage, tournage, montage, étalonnage, sous-titres et motion design. Tout est pensé pour le mobile et les trois premières secondes.",
    tasks: ["Tournage sur site et en galerie de vente", "Montage, étalonnage, sound design", "Sous-titres et déclinaisons 9:16"],
    output: "5 vidéos d'environ 1 min",
  },
  {
    title: "Diffusion & A/B testing",
    short: "Pilotage",
    text: "Les campagnes tournent en continu. On teste les versions entre elles, on surveille les performances chaque jour et on déplace le budget vers ce qui convertit.",
    tasks: ["Tests d'accroches, textes et audiences", "Suivi quotidien des performances", "Réallocation du budget en continu"],
    output: "Campagnes optimisées en continu",
  },
  {
    title: "Lead scoring",
    short: "Qualification",
    text: "Chaque prospect reçoit un score selon son budget, son délai et son engagement. Les commerciaux appellent d'abord les plus chauds, et leurs retours affinent le ciblage.",
    tasks: ["Grille de scoring sur mesure", "Transmission aux commerciaux en temps réel", "Boucle de retour vers le ciblage"],
    output: "Leads qualifiés pour l'équipe commerciale",
  },
  {
    title: "Community management",
    short: "Communauté",
    text: "Trois publications par semaine pour garder la marque vivante entre deux publicités, et une réponse à chaque commentaire et message.",
    tasks: ["3 contenus organiques par semaine", "Réponses aux commentaires et messages", "Remontée des questions fréquentes"],
    output: "Une audience engagée et rassurée",
  },
];

const DURATION = 6;

export function Pipeline() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const step = steps[active];

  useEffect(() => {
    if (!auto || !inView) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % steps.length), DURATION * 1000);
    return () => clearTimeout(id);
  }, [active, auto, inView]);

  return (
    <section id="methode" ref={ref} className="relative rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-brand-deep">Notre approche</p>
        <RevealHeading
          text="Un seul partenaire, *du script à la vente.*"
          accentClassName="italic text-brand-deep"
          className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl"
        />
        <p className="mt-5 max-w-xl text-ink/60">
          Pas d&apos;agence créative d&apos;un côté et de media buyer de l&apos;autre. La même équipe écrit, tourne,
          diffuse, mesure et qualifie. Rien ne se perd entre deux prestataires.
        </p>

        <ol className="mt-14 grid grid-cols-3 gap-2 md:grid-cols-6">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                aria-pressed={active === i}
                className="group w-full text-left"
              >
                <span className="relative block h-1 overflow-hidden rounded-full bg-ink/10">
                  {i < active && <span className="absolute inset-0 bg-brand-deep" />}
                  {i === active && (
                    <motion.span
                      key={`${active}-${auto}`}
                      initial={{ scaleX: auto && inView ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: auto && inView ? DURATION : 0, ease: "linear" }}
                      className="absolute inset-0 origin-left bg-brand-deep"
                    />
                  )}
                </span>
                <span className={`eyebrow mt-3 block transition-colors ${active === i ? "text-brand-deep" : "text-ink/40"}`}>0{i + 1}</span>
                <span className={`mt-1 block text-sm font-medium transition-colors md:text-base ${active === i ? "text-ink" : "text-ink/45 group-hover:text-ink/75"}`}>
                  {s.short}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-10 overflow-hidden rounded-[2rem] bg-night text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease }}
              className="grid gap-10 p-8 md:grid-cols-[auto_1fr_1fr] md:gap-14 md:p-14"
            >
              <span className="font-serif text-8xl leading-none text-(--accent) md:text-[9rem]">0{active + 1}</span>
              <div>
                <h3 className="font-serif text-4xl leading-none md:text-5xl">{step.title}</h3>
                <p className="mt-5 text-white/65">{step.text}</p>
              </div>
              <div>
                <ul className="space-y-3">
                  {step.tasks.map((t, i) => (
                    <motion.li
                      key={t}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-(--accent) text-[11px] text-night">✓</span>
                      <span className="text-white/85">{t}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm">
                  <span className="eyebrow text-white/45">Livrable</span> {step.output}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
