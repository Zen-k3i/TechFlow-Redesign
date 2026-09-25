"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ease } from "./content";
import { useLocale } from "./locale";
import { RevealHeading } from "./reveal";

export function Faq() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-brand-sky">{t.faq.eyebrow}</p>
          <RevealHeading
            text={t.faq.heading}
            className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl"
          />
        </div>
        <ul className="border-t border-white/10">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg md:text-xl"
                >
                  <span className={`transition-colors ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full border text-xl transition-colors ${
                      isOpen ? "border-brand bg-brand text-white" : "border-white/20 text-brand-sky"
                    }`}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-12 text-white/60">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
