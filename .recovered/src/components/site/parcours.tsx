"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { steps } from "./content";

export function Parcours() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="parcours"
      className="relative bg-gallery-soft px-6 py-28 text-ivory md:px-12"
      style={{ backgroundImage: "linear-gradient(135deg, rgba(21,37,112,0.35), transparent 60%)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="label text-brass">Salle IV — Le Parcours de visite</p>
          <h2 className="mt-4 font-serif text-5xl leading-none md:text-7xl">
            De l&apos;idée au produit en <em className="text-brand-sky">cinq semaines.</em>
          </h2>
          <p className="mt-6 max-w-md text-ivory/60 md:text-lg">
            Chaque phase produit un livrable tangible : une stack définie, une stratégie UX validée, un design system
            complet et une application prête à passer à l&apos;échelle.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span className="font-serif text-8xl leading-none text-ivory/15">5</span>
            <span className="label text-ivory/50">
              semaines
              <br />
              structurées
            </span>
          </div>
        </div>

        <ol ref={ref} className="relative space-y-6 pl-10 md:pl-14">
          <div className="absolute bottom-2 left-3 top-2 w-px bg-white/10 md:left-5">
            <motion.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-brand" />
          </div>
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-9"
            >
              <span className="absolute -left-[2.05rem] top-9 size-3 rounded-full border-2 border-brand bg-gallery md:-left-[2.55rem]" />
              <div className="label flex justify-between text-ivory/40">
                <span>Étape {i + 1}</span>
                <span className="text-brand-sky">{step.week}</span>
              </div>
              <h3 className="mt-4 font-serif text-3xl md:text-4xl">{step.title}</h3>
              <p className="mt-3 text-ivory/65">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
