"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { rooms, type RoomId } from "./content";
import { useActiveRoom } from "./use-active-room";

export function Navbar() {
  const active = useActiveRoom();
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const room = rooms.find((r) => r.id === active) ?? rooms[0];

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const go = (id: RoomId) => {
    setOpen(false);
    requestAnimationFrame(() => lenis?.scrollTo(`#${id}`, { duration: 1.6 }));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border border-white/10 bg-gallery/70 pl-5 pr-1.5 text-ivory backdrop-blur-xl">
          <button type="button" onClick={() => go("galerie")} aria-label="TechFlow — retour à l'entrée">
            <Image src="/images/techflow-logo.svg" alt="TechFlow" width={179} height={36} preload className="h-6 w-auto" />
          </button>

          <div className="label hidden items-center gap-3 text-ivory/60 md:flex" aria-live="polite">
            <span className="size-1.5 rounded-full bg-brand" />
            <AnimatePresence mode="wait">
              <motion.span
                key={room.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                Salle {room.numeral} — {room.label}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => go("billetterie")}
              className="hidden h-11 items-center rounded-full bg-ivory px-5 text-sm font-medium text-gallery transition-colors hover:bg-white sm:flex"
            >
              Réserver une visite
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className="label flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-ivory transition-colors hover:bg-white/10"
            >
              <span className="grid grid-cols-2 gap-0.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="size-1 bg-ivory" />
                ))}
              </span>
              Plan
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && <MuseumMap active={active} onClose={() => setOpen(false)} onGo={go} />}
      </AnimatePresence>
    </>
  );
}

const planLayout: Record<RoomId, string> = {
  galerie: "col-span-6 row-span-1",
  manifeste: "col-span-2 row-span-1",
  salles: "col-span-4 row-span-2",
  collection: "col-span-2 row-span-2",
  parcours: "col-span-3 row-span-1",
  "livre-dor": "col-span-3 row-span-1",
  billetterie: "col-span-6 row-span-1",
};

function MuseumMap({
  active,
  onClose,
  onGo,
}: {
  active: RoomId;
  onClose: () => void;
  onGo: (id: RoomId) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal
      aria-label="Plan de la galerie"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      data-lenis-prevent
      className="grain fixed inset-0 z-[60] overflow-y-auto bg-gallery text-ivory"
    >
      <div className="mx-auto grid min-h-full max-w-7xl gap-12 px-6 pb-12 pt-24 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <button
          type="button"
          onClick={onClose}
          className="label absolute right-6 top-7 rounded-full border border-white/15 px-4 py-2.5 hover:bg-white/10"
        >
          Fermer ✕
        </button>

        <div>
          <p className="label text-brass">Plan de la galerie</p>
          <ul className="mt-8 space-y-1">
            {rooms.map((room, i) => (
              <motion.li
                key={room.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => onGo(room.id)}
                  className="group flex w-full items-baseline gap-5 border-b border-white/10 py-3 text-left"
                >
                  <span className="label w-10 text-ivory/40">{room.numeral}</span>
                  <span
                    className={`font-serif text-4xl transition-colors md:text-5xl ${
                      room.id === active ? "italic text-brand-sky" : "text-ivory group-hover:text-white"
                    }`}
                  >
                    {room.label}
                  </span>
                  <span className="ml-auto text-ivory/30 transition-transform group-hover:translate-x-1">→</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 lg:block"
        >
          <div className="grid aspect-[5/4] grid-cols-6 grid-rows-5 gap-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => onGo(room.id)}
                className={`relative flex flex-col justify-between rounded-md border p-3 text-left transition-colors ${planLayout[room.id]} ${
                  room.id === active
                    ? "border-brand bg-brand/15 text-white"
                    : "border-white/15 text-ivory/60 hover:border-white/40 hover:text-ivory"
                }`}
              >
                <span className="label">{room.numeral}</span>
                <span className="text-sm">{room.label}</span>
                {room.id === active && (
                  <span className="label absolute right-3 top-3 flex items-center gap-1.5 text-brand-sky">
                    <span className="size-1.5 animate-ping rounded-full bg-brand-sky" /> Vous êtes ici
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="label mt-4 flex justify-between text-ivory/40">
            <span>TechFlow — Galerie numérique</span>
            <span>Ouvert 24/7 · Entrée libre</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
