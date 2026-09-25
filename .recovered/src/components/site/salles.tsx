"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { links, projectImage, services } from "./content";

export function Salles() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, (p) => -p * distance);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - el.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="salles"
      ref={ref}
      className="relative bg-navy-deep text-ivory lg:h-[420svh]"
      style={{ backgroundImage: "linear-gradient(60deg, #091447, #0b0a09 60%)" }}
    >
      <div className="overflow-hidden py-24 lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:pb-0 lg:pt-20">
        <div className="mb-10 flex items-end justify-between px-6 md:px-12">
          <div>
            <p className="label text-brass">Salle II — Les Salles</p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl leading-none md:text-7xl">
              Par où commence <em className="text-brand-sky">votre croissance ?</em>
            </h2>
          </div>
          <div className="hidden w-48 lg:block">
            <p className="label mb-3 text-ivory/50">Quatre salles, une visite</p>
            <div className="h-px bg-white/15">
              <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-ivory" />
            </div>
          </div>
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="flex flex-col gap-6 px-6 md:px-12 lg:flex-row lg:gap-8 lg:overflow-visible"
        >
          {services.map((service) => (
            <article
              key={service.title}
              className="group grid shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur md:grid-cols-[1.1fr_1fr] lg:h-[56svh] lg:w-[72vw] xl:w-[64vw]"
            >
              <div className="flex flex-col justify-between gap-10 p-8 md:p-10">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-7xl leading-none text-ivory/20 md:text-8xl">{service.numeral}</span>
                    <span className="label text-ivory/40">Salle {service.numeral}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-5xl leading-none md:text-6xl">{service.title}</h3>
                  <p className="mt-5 max-w-md text-ivory/70 md:text-lg">{service.pitch}</p>
                </div>
                <div>
                  <p className="label text-brass">Pièces exposées</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.pieces.map((piece) => (
                      <li key={piece} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-ivory/80">
                        {piece}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={links.services[service.title]}
                    target="_blank"
                    rel="noreferrer"
                    className="label mt-8 inline-flex items-center gap-3 text-ivory transition-colors hover:text-brand-sky"
                  >
                    Entrer dans la salle <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
              <div className="relative min-h-72 overflow-hidden bg-gallery p-6 md:p-8">
                <div className="relative h-full overflow-hidden rounded-sm border-[10px] border-[#e9e2d4] shadow-2xl">
                  <Image
                    src={projectImage(service.image)}
                    alt={`Exemple ${service.title}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    className="object-cover object-top transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
