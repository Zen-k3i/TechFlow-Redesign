"use client";

import Image from "next/image";
import { useStill } from "./use-still";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { GlowButton, HumanButton } from "../page/project-cta";
import { caseStudyUrl, ease, featured, projectImage } from "./content";
import { BuildWord, DesignWord, GrowWord } from "./hero-words";
import { Accented, useLocale } from "./locale";
import { Magnetic } from "./magnetic";

const CYCLE = 3600;

const acts = [
  { id: "design", lead: "We", verb: "design.", Word: DesignWord },
  { id: "build", lead: "We", verb: "build.", Word: BuildWord },
  { id: "grow", lead: "You", verb: "grow.", Word: GrowWord },
] as const;

export function Hero({ stacked = false }: { stacked?: boolean }) {
  const { t } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const still = useStill();
  const [active, setActive] = useState(-1);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    if (still || paused) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % acts.length),
      active === -1 ? 1400 : CYCLE,
    );
    return () => clearTimeout(id);
  }, [active, paused, still]);

  const act = (i: number) => (
    <Act
      key={acts[i].id}
      index={i}
      on={active === i}
      dim={active !== -1 && active !== i}
      onEnter={() => {
        if (still) return;
        setPaused(true);
        setActive(i);
      }}
      onLeave={() => setPaused(false)}
    />
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden bg-night pt-28 text-white md:pt-32"
    >
      <Backdrop />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 text-center"
      >
        <motion.a
          href="#projets"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-sm text-brand-sky backdrop-blur transition-colors hover:border-brand-sky/60"
        >
          {t.hero.badge}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </motion.a>

        <h1 className="mt-10 font-serif text-[15vw] leading-[1.02] tracking-[-0.02em] sm:text-[clamp(2.9rem,8.5vw,7rem)]">
          <span className="sr-only">We design. We build. You grow.</span>
          {stacked ? (
            <span
              aria-hidden
              data-stacked
              className="flex flex-col items-center"
            >
              {act(0)}
              {act(1)}
              {act(2)}
            </span>
          ) : (
            <span aria-hidden className="block">
              <span className="flex flex-col items-center sm:flex-row sm:justify-center sm:gap-x-[0.24em]">
                {act(0)}
                {act(1)}
              </span>
              <span className="flex justify-center">{act(2)}</span>
            </span>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease }}
          className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/65 md:text-lg"
        >
          <Accented text={t.hero.subtitle} className="text-white" />
        </motion.p>

        <ServiceTicker />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <GlowButton href="#brief">{t.hero.start}</GlowButton>
          </Magnetic>
          <Magnetic>
            <HumanButton>{t.hero.human}</HumanButton>
          </Magnetic>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-4 text-xs tracking-wide text-white/40"
        >
          {t.hero.reassurance}
        </motion.p>
      </motion.div>

      <div className="relative z-10 mt-16 md:mt-20">
        <Horizon />
        <FloatingProof />
        {stacked ? (
          <div className="h-[220px] sm:h-[260px] md:h-[300px]" />
        ) : (
          <ProjectFan progress={scrollYProgress} />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-night to-transparent" />
      </div>
    </section>
  );
}

function Act({
  index,
  on,
  dim,
  onEnter,
  onLeave,
}: {
  index: number;
  on: boolean;
  dim: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { lead, verb, Word } = acts[index];
  const accent = index === 2;

  return (
    <motion.span
      initial={{ opacity: 0, y: "0.35em", filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.25 + index * 0.16, ease }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="inline-block pb-[0.06em]"
    >
      <span
        className={`flex items-baseline gap-[0.22em] whitespace-nowrap transition-opacity duration-700 ${dim ? "opacity-35" : ""}`}
      >
        <span
          className={`bg-clip-text pr-[0.04em] text-transparent ${
            accent
              ? "bg-linear-to-br from-[#ecf4ff] via-[#9ec2ff] to-brand italic"
              : "bg-linear-to-b from-white via-white/90 to-white/60"
          }`}
        >
          {lead}
        </span>
        <span className={accent ? "italic" : ""}>
          <Word text={verb} on={on} />
        </span>
      </span>
    </motion.span>
  );
}

function ServiceTicker() {
  const services = useLocale().t.services.items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % services.length),
      2200,
    );
    return () => clearInterval(id);
  }, [paused, services.length]);

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.95 }}
      onPointerLeave={() => setPaused(false)}
      className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-sm"
    >
      {services.map((service, i) => (
        <li key={service.id} className="relative">
          <a
            href="#services"
            onPointerEnter={() => {
              setPaused(true);
              setActive(i);
            }}
            className={`relative z-10 block rounded-full px-3.5 py-1.5 transition-colors duration-500 ${
              i === active ? "text-white" : "text-white/45 hover:text-white/80"
            }`}
          >
            {service.title}
          </a>
          {i === active && (
            <motion.span
              layoutId="service-pill"
              className="absolute inset-0 rounded-full border border-brand/50 bg-brand/15"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </li>
      ))}
    </motion.ul>
  );
}

const fan = [
  { x: -2, rotate: -14, y: 90, z: 1 },
  { x: -1, rotate: -7, y: 28, z: 2 },
  { x: 0, rotate: 0, y: 0, z: 3 },
  { x: 1, rotate: 7, y: 28, z: 2 },
  { x: 2, rotate: 14, y: 90, z: 1 },
];

function ProjectFan({ progress }: { progress: MotionValue<number> }) {
  const spread = useTransform(progress, [0, 1], [1, 1.35]);
  const lift = useTransform(progress, [0, 1], [0, -80]);

  return (
    <motion.div
      style={{ y: lift }}
      className="relative mx-auto h-[300px] w-full max-w-5xl sm:h-[380px] md:h-[440px]"
    >
      {featured.map((project, i) => (
        <FanCard
          key={project.slug}
          project={project}
          slot={fan[i]}
          spread={spread}
        />
      ))}
    </motion.div>
  );
}

function FanCard({
  project,
  slot,
  spread,
}: {
  project: (typeof featured)[number];
  slot: (typeof fan)[number];
  spread: MotionValue<number>;
}) {
  const x = useTransform(
    spread,
    (s) => `calc(-50% + ${slot.x * s} * var(--fan-gap))`,
  );
  const { t } = useLocale();
  const center = slot.x === 0;

  return (
    <motion.div
      style={{ x, zIndex: slot.z }}
      className={`absolute left-1/2 top-0 [--fan-gap:120px] sm:[--fan-gap:170px] md:[--fan-gap:215px] ${
        Math.abs(slot.x) === 2 ? "hidden sm:block" : ""
      }`}
    >
      <motion.a
        href={caseStudyUrl(project.slug)}
        initial={{ opacity: 0, y: 160, rotate: 0 }}
        animate={{
          opacity: 1,
          y: slot.y,
          rotate: slot.rotate,
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 18,
            delay: 0.9 + Math.abs(slot.x) * 0.12,
          },
        }}
        whileHover={{ y: slot.y - 18, rotate: slot.rotate * 0.4, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`group relative block overflow-hidden rounded-2xl border border-white/15 bg-night-soft shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ${
          center
            ? "w-[190px] sm:w-[250px] md:w-[290px]"
            : "w-[160px] sm:w-[210px] md:w-[240px]"
        }`}
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={projectImage(project.slug)}
            alt={`${t.hero.caseAlt} ${project.name}`}
            fill
            loading="eager"
            sizes="(min-width: 768px) 290px, 190px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/90 via-black/50 to-transparent p-4 pt-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="text-left">
            <p className="eyebrow text-brand-sky">{t.work.sectors[project.sector] ?? project.sector}</p>
            <p className="text-sm font-medium text-white">{project.name}</p>
          </div>
          <span className="text-xs text-white/70">{t.hero.view}</span>
        </div>
      </motion.a>
    </motion.div>
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
      className="pointer-events-none absolute left-1/2 top-24 h-[900px] w-[190%] rounded-[100%] border-t border-white/25 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(71,102,255,0.35),rgba(21,37,112,0.25)_45%,var(--color-night)_75%)] shadow-[0_-20px_80px_-10px_rgba(71,102,255,0.55)] md:w-[140%]"
    />
  );
}

function FloatingProof() {
  const { t } = useLocale();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 1.6 },
          x: { delay: 1.6 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute left-[6%] top-16 z-20 hidden rounded-2xl border border-white/10 bg-night/60 px-4 py-3 text-left backdrop-blur-xl lg:block"
      >
        <p className="font-serif text-3xl leading-none text-white">{t.hero.clients.value}</p>
        <p className="mt-1 text-xs text-white/55">{t.hero.clients.label}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.75 },
          x: { delay: 1.75 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -top-2 right-[6%] z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-night/60 px-4 py-3 text-left backdrop-blur-xl lg:flex"
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-brand/20 text-brand-sky">
          ✦
        </span>
        <span>
          <span className="block text-sm text-white">{t.hero.speed.title}</span>
          <span className="block text-xs text-white/55">{t.hero.speed.sub}</span>
        </span>
      </motion.div>
    </>
  );
}

function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const random = seeded(42);
const stars = Array.from({ length: 70 }, () => ({
  left: random() * 100,
  top: random() * 70,
  size: random() > 0.85 ? 2.5 : 1.5,
  base: 0.15 + random() * 0.35,
  duration: 2.5 + random() * 4,
  delay: random() * 4,
}));

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(54,71,245,0.22),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(60deg,rgba(9,20,71,0.9),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[72px_72px] [mask-image:radial-gradient(60%_50%_at_50%_35%,black,transparent)]" />
      {stars.map((star, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: star.base }}
          animate={{ opacity: [star.base, 1, star.base] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;)]" />
    </div>
  );
}
