"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { Navbar } from "./navbar";
import { StarField } from "./star-field";
import { ProjectFan } from "./project-fan";
import { LogoMarquee } from "./logo-marquee";
import { services } from "./content";

const ease = [0.22, 1, 0.36, 1] as const;

const headline = [
  { words: ["We", "design.", "We", "build."], accent: false, offset: 0 },
  { words: ["You", "grow."], accent: true, offset: 4 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} className="relative isolate overflow-hidden bg-black pt-5 text-white">
        <Backdrop />
        <Navbar />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pt-16 text-center md:pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-sm text-brand-sky backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-sky/70" />
              <span className="relative size-2 rounded-full bg-brand-sky" />
            </span>
            12 ans • 45+ projets livrés
          </motion.div>

          <h1 className="mt-7 font-serif text-[clamp(3.1rem,9vw,7rem)] leading-[0.95] tracking-[-0.02em]">
            {headline.map((line, li) => (
              <span key={li} className="block">
                {line.words.map((word, wi) => {
                  const i = line.offset + wi;
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: "0.35em", filter: "blur(12px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.8, delay: 0.25 + i * 0.08, ease }}
                      className={`inline-block pb-[0.08em] pr-[0.06em] bg-clip-text text-transparent ${
                        line.accent
                          ? "italic bg-linear-to-br from-[#ecf4ff] via-[#9ec2ff] to-brand"
                          : "bg-linear-to-b from-white via-white/85 to-white/45"
                      }`}
                    >
                      {word}
                      {"\u00a0"}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-[#b9babd] md:text-lg"
          >
            Design, Développement et IA : TechFlow est un start-up studio. Nous livrons en{" "}
            <span className="text-white">cinq semaines</span> les produits web que d&apos;autres mettent des{" "}
            <span className="text-white">mois</span> à livrer.
          </motion.p>

          <ServiceTicker />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="group relative isolate overflow-hidden rounded-full p-px shadow-[0_0_40px_-8px_rgba(71,102,255,0.7)]"
            >
              <span className="absolute inset-[-100%] -z-10 bg-[conic-gradient(from_0deg,rgba(71,102,255,0.9)_0deg,transparent_60deg,transparent_300deg,rgba(71,102,255,0.9)_360deg)] animate-shine" />
              <span className="flex h-13 items-center gap-3 rounded-full bg-white pl-6 pr-1.5 text-[15px] font-medium text-black">
                Démarrer un projet
                <span className="flex size-10 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45">
                  →
                </span>
              </span>
            </a>
            <a
              href="#contact"
              className="flex h-13 items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] pl-1.5 pr-6 text-[15px] text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              <span className="relative">
                <Image src="/images/avatar.svg" alt="" width={40} height={40} className="size-10 rounded-full" />
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-black bg-emerald-400" />
              </span>
              Parler à un humain
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="mt-4 text-xs tracking-wide text-white/40"
          >
            Gratuit · Sans engagement · 30 minutes
          </motion.p>
        </motion.div>

        <div className="relative z-10 mt-16 md:mt-20">
          <Horizon />
          <FloatingProof />
          <ProjectFan progress={scrollYProgress} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-[#0b0b0d] to-transparent" />
        </div>

        <LogoMarquee />
      </section>
    </MotionConfig>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(54,71,245,0.22),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(60deg,rgba(9,20,71,0.9),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[72px_72px] [mask-image:radial-gradient(60%_50%_at_50%_35%,black,transparent)]" />
      <StarField />
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;)]" />
    </div>
  );
}

function Horizon() {
  return (
    <motion.div
      aria-hidden
      style={{ x: "-50%" }}
      initial={{ opacity: 0, scaleX: 0.6 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1.4, delay: 0.6, ease }}
      className="pointer-events-none absolute left-1/2 top-24 h-[900px] w-[190%] rounded-[100%] border-t border-white/25 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(71,102,255,0.35),rgba(21,37,112,0.25)_45%,#000_75%)] shadow-[0_-20px_80px_-10px_rgba(71,102,255,0.55)] md:w-[140%]"
    />
  );
}

function ServiceTicker() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % services.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.95 }}
      className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm"
    >
      {services.map((service, i) => (
        <li key={service} className="relative">
          <a
            href="#services"
            className={`relative z-10 block rounded-full px-3.5 py-1.5 transition-colors duration-500 ${
              i === active ? "text-white" : "text-white/45 hover:text-white/80"
            }`}
          >
            {service}
          </a>
          <AnimatePresence>
            {i === active && (
              <motion.span
                layoutId="service-pill"
                className="absolute inset-0 rounded-full border border-brand/50 bg-brand/15"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </AnimatePresence>
        </li>
      ))}
    </motion.ul>
  );
}

function FloatingProof() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{ opacity: { delay: 1.6 }, x: { delay: 1.6 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute left-[6%] top-16 z-20 hidden rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-left backdrop-blur-xl lg:block"
      >
        <p className="font-serif text-3xl leading-none text-white">35+</p>
        <p className="mt-1 text-xs text-white/55">clients accompagnés</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.75 }, x: { delay: 1.75 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute right-[6%] -top-2 z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-left backdrop-blur-xl lg:flex"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-brand/20 text-brand-sky">✦</span>
        <span>
          <span className="block text-sm text-white">De l&apos;idée au produit</span>
          <span className="block text-xs text-white/55">en 5 semaines</span>
        </span>
      </motion.div>
    </>
  );
}
