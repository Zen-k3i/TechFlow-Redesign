"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { faq, links } from "./content";

const barcode = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 4, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2];

export function Billetterie() {
  return (
    <section
      id="billetterie"
      className="relative overflow-hidden px-6 py-28 text-ivory md:px-12"
      style={{ backgroundImage: "linear-gradient(0deg, #0d0d0d, #152570 75%)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="label text-brass">Salle VI — Billetterie</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-5xl leading-none md:text-8xl">
            On commence <em className="text-brand-sky">quand ?</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-ivory/70 md:text-lg">
            Trente minutes avec l&apos;équipe qui construira votre projet, pas avec un commercial. Vous repartez avec un
            périmètre, un délai et un ordre de grandeur.
          </p>
        </div>

        <Ticket />

        <InfoDesk />
      </div>
    </section>
  );
}

function Ticket() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });

  return (
    <div className="mt-16 [perspective:1400px]">
      <motion.div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        initial={{ opacity: 0, y: 60, rotateX: 20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY }}
        className="mx-auto grid max-w-4xl overflow-hidden rounded-[1.75rem] bg-ivory text-gallery shadow-[0_40px_120px_-30px_rgba(71,102,255,0.6)] md:grid-cols-[1fr_auto]"
      >
        <div className="relative p-8 md:p-10">
          <div className="label flex justify-between text-gallery/50">
            <span>TechFlow — Galerie numérique</span>
            <span>Billet d&apos;entrée</span>
          </div>
          <p className="mt-6 font-serif text-5xl leading-none md:text-6xl">
            Visite privée <em className="text-brand-deep">de votre projet</em>
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-dashed border-gallery/25 pt-6 md:grid-cols-4">
            {[
              ["Durée", "30 minutes"],
              ["Tarif", "Gratuit"],
              ["Engagement", "Aucun"],
              ["Guide", "L'équipe projet"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label text-gallery/45">{k}</dt>
                <dd className="mt-1.5 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={links.booking}
              target="_blank"
              rel="noreferrer"
              className="flex h-13 items-center justify-center gap-3 rounded-full bg-gallery px-7 font-medium text-ivory transition-colors hover:bg-brand-deep"
            >
              Réserver ma visite <span aria-hidden>↗</span>
            </a>
            <a
              href={links.contact}
              target="_blank"
              rel="noreferrer"
              className="flex h-13 items-center justify-center rounded-full border border-gallery/20 px-7 transition-colors hover:border-gallery"
            >
              Demander un devis
            </a>
          </div>
        </div>

        <div className="relative flex flex-row items-center justify-between gap-6 border-t-2 border-dashed border-gallery/25 bg-sand p-8 md:w-60 md:flex-col md:border-l-2 md:border-t-0">
          <span className="absolute -top-4 left-[-1rem] hidden size-8 rounded-full bg-[#0f1a52] md:-left-4 md:-top-4 md:block" />
          <span className="absolute -bottom-4 left-[-1rem] hidden size-8 rounded-full bg-[#0e1122] md:-left-4 md:block" />
          <div className="md:text-center">
            <p className="label text-gallery/45">Œuvre n°</p>
            <p className="font-serif text-6xl leading-none">046</p>
          </div>
          <div className="flex h-16 items-stretch gap-[2px] md:h-24" aria-hidden>
            {barcode.map((w, i) => (
              <span key={i} className="bg-gallery" style={{ width: w }} />
            ))}
          </div>
          <p className="label hidden text-center text-gallery/45 md:block">Démarrage sous 2 semaines</p>
        </div>
      </motion.div>
    </div>
  );
}

function InfoDesk() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-28 grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="label text-brass">Accueil — Informations pratiques</p>
        <h3 className="mt-4 font-serif text-4xl leading-none md:text-5xl">Les questions qu&apos;on nous pose à l&apos;entrée.</h3>
      </div>
      <ul className="border-t border-white/15">
        {faq.map((item, i) => (
          <li key={item.q} className="border-b border-white/15">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg md:text-xl"
            >
              {item.q}
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-2xl text-brand-sky">
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden pr-10 text-ivory/65"
                >
                  <span className="block pb-6">{item.a}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
}
