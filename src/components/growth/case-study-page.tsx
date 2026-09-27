"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ease, links } from "../site/content";
import { Footer } from "../site/footer";
import { Magnetic } from "../site/magnetic";
import { Navbar } from "../site/navbar";
import { FadeIn, RevealHeading } from "../site/reveal";
import { AdsGallery } from "./ads-gallery";
import type { GrowthCaseStudy } from "./data";
import { Funnel } from "./funnel";
import { AdScreen, PhoneFrame } from "./phone";

export function GrowthCaseStudyPage({ study }: { study: GrowthCaseStudy }) {
  return (
    <div style={{ "--accent": study.accent } as React.CSSProperties}>
      <Navbar current="projects" />
      <main>
        <Hero study={study} />
        <Brief study={study} />
        <Funnel study={study} />
        <AdsGallery study={study} />
        <Offer />
      </main>
      <Footer />
    </div>
  );
}

function Hero({ study }: { study: GrowthCaseStudy }) {
  const [current, setCurrent] = useState(0);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [-6, 6]), { stiffness: 80, damping: 18 });
  const count = study.ads.length;

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  const side = [(current + count - 1) % count, (current + 1) % count];

  return (
    <section
      id="top"
      onPointerMove={(e) => {
        px.set(e.clientX / window.innerWidth - 0.5);
        py.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="grain relative overflow-hidden bg-night px-5 pb-20 pt-32 text-white md:px-10 md:pt-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_40%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_0%_100%,rgba(54,71,245,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <Link href="/projets" className="eyebrow inline-flex items-center gap-2 text-white/50 hover:text-white">
              ← Tous les projets
            </Link>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="eyebrow mt-8 text-(--accent)">
            {study.tagline}
          </motion.p>
          <RevealHeading as="h1" text={study.client} className="mt-4 font-serif text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.02em]" />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mt-5 max-w-xl font-serif text-3xl italic leading-tight text-white/85 md:text-4xl"
          >
            {study.title}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }} className="mt-6 max-w-xl text-white/60 md:text-lg">
            {study.intro}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a href="#tunnel" className="group flex h-13 items-center gap-3 rounded-full bg-white pl-6 pr-1.5 text-[15px] font-medium text-night">
                Voir le tunnel de vente
                <span className="flex size-10 items-center justify-center rounded-full bg-(--accent) text-night transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>
            <span className="flex items-center gap-2.5 px-2 text-sm text-white/65">
              <span className="relative flex size-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative size-2.5 rounded-full bg-emerald-400" />
              </span>
              {study.status} sur Facebook, Instagram et TikTok
            </span>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[520px] w-full max-w-[520px] [perspective:1400px] md:h-[620px]">
          <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
            {side.map((adIndex, i) => (
              <motion.div
                key={`side-${i}`}
                initial={{ opacity: 0, x: 0, rotate: 0 }}
                animate={{ opacity: 1, x: i === 0 ? -130 : 130, rotate: i === 0 ? -9 : 9, y: 40 }}
                transition={{ duration: 1.1, delay: 0.5, ease }}
                className="absolute left-1/2 top-0 w-[200px] -translate-x-1/2 opacity-80 md:w-[230px]"
                style={{ z: -80 }}
              >
                <PhoneFrame>
                  <AdScreen ad={study.ads[adIndex]} index={adIndex} platform={i === 0 ? "tiktok" : "facebook"} handle={study.handle} accent={study.accent} playing={false} compact />
                  <span className="absolute inset-0 z-20 bg-night/40" />
                </PhoneFrame>
              </motion.div>
            ))}
            <motion.a
              href="#publicites"
              data-cursor="Regarder"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease }}
              className="absolute left-1/2 top-0 block w-[230px] -translate-x-1/2 md:w-[270px]"
              style={{ z: 60 }}
            >
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <PhoneFrame className="shadow-[0_60px_120px_-30px_color-mix(in_oklab,var(--accent)_55%,transparent)]">
                  <AdScreen key={current} ad={study.ads[current]} index={current} platform="instagram" handle={study.handle} accent={study.accent} playing />
                </PhoneFrame>
              </motion.div>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 1.2 }, x: { delay: 1.2 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute bottom-16 left-0 z-10 rounded-2xl border border-white/10 bg-night/80 px-4 py-3 backdrop-blur-xl md:-left-6"
          >
            <p className="eyebrow text-white/45">Nouveau lead</p>
            <p className="mt-1 flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-emerald-400" /> Score 90 · Chaud → commercial
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.35 }, x: { delay: 1.35 }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute right-0 top-24 z-10 rounded-2xl border border-white/10 bg-night/80 px-4 py-3 backdrop-blur-xl md:-right-4"
          >
            <p className="eyebrow text-white/45">Vidéo 0{current + 1} / 0{count}</p>
            <p className="mt-1 text-sm">{study.ads[current].angle}</p>
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-7xl">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
          {study.deliverables.map((d) => (
            <div key={d.label} className="bg-night p-6 md:p-8">
              <dd className="font-serif text-5xl leading-none text-(--accent) md:text-6xl">{d.value}</dd>
              <dt className="mt-2 text-sm text-white/55">{d.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Brief({ study }: { study: GrowthCaseStudy }) {
  return (
    <section className="bg-night px-5 pb-28 text-white md:px-10 md:pb-36">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-white/10 pt-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow text-(--accent)">Le défi</p>
          <RevealHeading text={study.challenge.title} className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl" />
          <FadeIn>
            <p className="mt-6 max-w-2xl text-lg text-white/65">{study.challenge.text}</p>
          </FadeIn>
          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {study.challenge.points.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <li className="flex h-full gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="eyebrow mt-0.5 text-(--accent)">0{i + 1}</span>
                  <span className="text-sm font-medium leading-snug">{p.title}</span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>

        <FadeIn className="self-end rounded-3xl border border-white/10 bg-night-soft p-6 md:p-8">
          <p className="eyebrow text-white/40">
            {study.meta[1].value} · {study.meta[0].value}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-6">
            {study.facts.map((f) => (
              <div key={f.label}>
                <dd className="font-serif text-4xl leading-none">{f.value}</dd>
                <dt className="mt-1 text-sm text-white/50">{f.label}</dt>
              </div>
            ))}
          </dl>
          <a href={study.factsSource.href} target="_blank" rel="noreferrer" className="mt-6 inline-block text-xs text-white/35 hover:text-white/70">
            Source : {study.factsSource.label} ↗
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

const tracked = ["Coût par lead", "Taux de qualification", "Coût par rendez-vous", "Délai de réponse"];

const offer = [
  "Stratégie créative, scripts et copywriting",
  "Tournage, montage et post-production",
  "5 vidéos d'environ une minute, pensées pour les publicités sociales",
  "Diffusion et A/B tests en continu sur plusieurs versions",
  "Suivi des performances et réallocation du budget",
  "Lead scoring et transmission aux équipes commerciales",
  "Community management : 3 publications par semaine et réponses",
];

function Offer() {
  return (
    <section className="relative overflow-hidden bg-night px-5 pb-10 pt-28 text-white md:px-10 md:pt-36">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#16130d] via-night-soft to-navy-deep p-8 md:rounded-[3.5rem] md:p-16">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-(--accent)/25 blur-3xl" />
        <div className="relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow text-(--accent)">Growth marketing · Tunnel de vente</p>
            <RevealHeading
              text="Vos publicités, *pilotées de A à Z.*"
              accentClassName="italic text-(--accent)"
              className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl"
            />
            <p className="mt-6 max-w-lg text-white/65">
              Vous vous concentrez sur vos ventes. Nous écrivons, tournons, diffusons, testons et qualifions, puis nous
              vous envoyons des prospects prêts à parler à vos commerciaux.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <a
                  href={links.booking}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-14 items-center gap-3 rounded-full bg-white pl-7 pr-2 font-medium text-night transition-colors hover:bg-(--accent)"
                >
                  Lancer ma campagne
                  <span className="flex size-10 items-center justify-center rounded-full bg-night text-white transition-transform group-hover:-rotate-45">→</span>
                </a>
              </Magnetic>
              <Link href="/projets" className="flex h-14 items-center justify-center rounded-full border border-white/20 px-7 transition-colors hover:border-white">
                Voir d&apos;autres projets
              </Link>
            </div>
          </div>
          <ul className="space-y-3">
            {offer.map((o, i) => (
              <motion.li
                key={o}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease }}
                className="flex items-start gap-3 border-b border-white/10 pb-3"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-(--accent) text-[11px] text-night">✓</span>
                <span className="text-white/85">{o}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="relative mt-14 flex flex-wrap items-center gap-2 border-t border-white/10 pt-8">
          <span className="eyebrow mr-2 text-white/45">Mesuré chaque semaine</span>
          {tracked.map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
