"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, m as motion } from "motion/react";
import { ease, projectImage } from "./content";
import { useLocale } from "./locale";
import { FadeIn, RevealHeading } from "./reveal";

export function Services() {
  const { t } = useLocale();
  const services = t.services.items;
  const [active, setActive] = useState(0);
  const service = services[active];

  return (
    <section id="services" className="relative bg-night px-5 pb-20 pt-16 text-white md:px-10 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow text-brand-sky">{t.services.eyebrow}</p>
            <RevealHeading
              text={t.services.heading}
              className="mt-4 max-w-3xl font-serif text-[2.75rem] leading-[0.95] md:text-[4.125rem]"
            />
          </div>
          <FadeIn>
            <p className="max-w-sm text-white/55">
              {t.services.intro}
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <ul className="border-t border-white/10">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id} className="border-b border-white/10">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                      aria-expanded={isActive}
                      className="group flex w-full items-center gap-5 py-5 text-left md:py-6"
                    >
                      <span className={`eyebrow transition-colors ${isActive ? "text-brand-sky" : "text-white/55"}`}>
                        0{i + 1}
                      </span>
                      <span
                        className={`font-serif text-3xl leading-none transition-[color,transform] duration-500 md:text-[2.75rem] ${
                          isActive ? "translate-x-2 text-white" : "text-white/55 group-hover:text-white/70"
                        }`}
                      >
                        {s.title}
                      </span>
                      <motion.span
                        animate={{ rotate: isActive ? -45 : 0, opacity: isActive ? 1 : 0.35 }}
                        className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20"
                      >
                        →
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-10 md:pl-12">
                          <p className="max-w-md text-white/65">{s.pitch}</p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {s.deliverables.map((d) => (
                              <li key={d} className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/80">
                                {d}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={s.href}
                            className="mt-6 inline-flex items-center gap-2 text-sm text-brand-sky hover:text-white"
                          >
                            {t.services.discover} {s.title} →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <div className="relative hidden lg:block">
            <div className="sticky top-28 aspect-[6/5] overflow-hidden rounded-[2rem] border border-white/10 bg-night-soft">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={service.id}
                  initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
                  animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={projectImage(service.image)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 0px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-night via-night/30 to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={service.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease }}
                    className="max-w-sm font-serif text-3xl leading-tight"
                  >
                    {service.tagline}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
