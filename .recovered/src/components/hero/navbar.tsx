"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navLinks } from "./content";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-30 mx-auto w-full max-w-6xl px-4"
    >
      <nav className="flex h-16 items-center justify-between rounded-full border border-white/10 bg-black/60 pl-6 pr-2 backdrop-blur-xl md:h-[4.5rem]">
        <a href="#" aria-label="TechFlow Agency — accueil">
          <Image
            src="/images/techflow-logo.svg"
            alt="TechFlow"
            width={179}
            height={36}
            preload
            className="h-7 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-9 text-[15px] text-white/75 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden px-3 text-sm text-white/60 sm:inline">FR</span>
          <a
            href="#contact"
            className="hidden h-11 items-center rounded-full bg-white px-5 text-[15px] font-medium text-black transition-transform hover:scale-[1.03] sm:flex md:h-12"
          >
            Démarrer un projet
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 md:hidden"
          >
            <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-px w-5 bg-white" />
            <motion.span animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="h-px w-5 bg-white" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-4 top-20 flex flex-col gap-1 rounded-3xl border border-white/10 bg-black/90 p-3 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="mt-1 block rounded-2xl bg-white px-4 py-3 text-center font-medium text-black">
                Démarrer un projet
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
