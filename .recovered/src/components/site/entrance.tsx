"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useProgress } from "@react-three/drei";
import { useLenis } from "lenis/react";

const DURATION = 1800;

export function Entrance() {
  const [open, setOpen] = useState(true);
  const [shown, setShown] = useState(0);
  const { progress, active } = useProgress();
  const real = useRef(100);
  const lenis = useLenis();

  useEffect(() => {
    real.current = active ? progress : 100;
  }, [active, progress]);

  useEffect(() => {
    const returning = sessionStorage.getItem("tf-entered");
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      if (returning) return setOpen(false);
      const timed = Math.min(100, ((now - start) / DURATION) * 100);
      setShown((prev) => Math.max(prev, Math.min(timed, real.current)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const ready = shown >= 100;

  const enter = () => {
    sessionStorage.setItem("tf-entered", "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="grain fixed inset-0 z-[70] flex flex-col justify-between bg-gallery p-6 text-ivory md:p-10"
        >
          <div className="label flex justify-between text-ivory/50">
            <span>TechFlow — Galerie numérique</span>
            <span className="hidden sm:inline">Ouvert 24/7 · Entrée libre</span>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <p className="label text-brass">Exposition permanente</p>
            <p className="mt-5 font-serif text-5xl leading-none md:text-7xl">
              Une galerie qui n&apos;existe <em className="text-brand-sky">que dans votre navigateur.</em>
            </p>
            <p className="mx-auto mt-6 max-w-lg text-ivory/60">
              45+ produits web exposés. Chacun a fait grandir une vraie entreprise.
            </p>
            <div className="mt-10 h-14">
              <AnimatePresence>
                {ready && (
                  <motion.button
                    type="button"
                    onClick={enter}
                    autoFocus
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="label rounded-full border border-brass/70 px-8 py-4 text-brass transition-colors hover:bg-brass hover:text-gallery"
                  >
                    Entrer dans la galerie
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 bg-white/10">
              <div className="h-px bg-ivory transition-[width] duration-200" style={{ width: `${shown}%` }} />
            </div>
            <span className="font-serif text-7xl leading-none tabular-nums md:text-9xl">{Math.round(shown)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
