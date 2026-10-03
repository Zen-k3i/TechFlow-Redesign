"use client";

import { useState } from "react";
import type { FAQ_QUERY_RESULT } from "@/sanity.types";
import { AnimatePresence, m as motion } from "motion/react";
import { ease } from "./content";
import { useLocale } from "./locale";
import { RevealHeading } from "./reveal";

/** A page's FAQ as edited in Sanity (FAQ folder in the Studio). */
export type FaqContent = FAQ_QUERY_RESULT;

export function Faq({ faq }: { faq: FaqContent }) {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);
  const items = (faq?.items ?? []).flatMap((item) => (item.q && item.a ? [{ ...item, q: item.q, a: item.a }] : []));
  if (!faq?.heading || items.length === 0) return null;

  return (
    <section id="faq" className="bg-night px-5 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-brand-sky">{t.faq.eyebrow}</p>
          <RevealHeading
            text={faq.heading}
            className="mt-4 font-serif text-[2.75rem] leading-[0.95] md:text-[3.5rem]"
          />
          {faq.intro && <p className="mt-6 max-w-sm text-white/55">{faq.intro}</p>}
        </div>
        <ul className="border-t border-white/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item._key} className="border-b border-white/10">
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
