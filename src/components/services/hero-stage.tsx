"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, m as motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue,  } from "motion/react";
import type { ServiceKey } from "@/i18n/routes";
import { members } from "../team/data";
import { ease, projectImage, projects } from "../site/content";
import { useLocale } from "../site/locale";
import { projectDomain, projectPreviews } from "../site/previews";
import type { ServiceContent } from "./data";

const copy = {
  fr: {
    caption:
      "Interface illustrative, construite à partir de nos projets réels.",
    design: {
      page: "Homepage",
      share: "Partager",
      layers: "Calques",
      layerItems: [
        "Navbar",
        "Hero",
        "Services",
        "Projets",
        "Témoignages",
        "Footer",
      ],
      type: "Typographie",
      comment: "Cette version est validée, on passe au dev",
    },
    dev: {
      deploy: "Déployé en production",
      deployTime: "il y a 38 s",
      scores: ["Performance", "Accessibilité", "Bonnes pratiques", "SEO"],
    },
    ai: {
      workflow: "Qualification des leads",
      active: "Actif",
      trigger: ["Gmail Trigger", "Nouvel e-mail reçu"],
      agent: ["AI Agent", "Tools Agent"],
      ports: ["Chat Model", "Memory", "Tool"],
      memory: "Simple Memory",
      tool: ["HubSpot", "Crée le deal · 18 k€"],
      outputs: [
        ["Gmail", "Réponse envoyée"],
        ["Slack", "#ventes · @Maximilien"],
        ["Google Sheets", "Ligne ajoutée au reporting"],
      ],
      sticky: [
        "Sophie Martin",
        "Demande de devis · refonte du site",
        "Bonjour, nous cherchons une agence pour refondre…",
      ],
      item: "1 item",
      execute: "Exécuter le workflow",
      result: [
        "Lead chaud · score 92/100",
        "Réponse personnalisée rédigée en 4 s",
      ],
      run: "Exécution",
    },
    funnel: {
      kpis: ["Impressions", "Taux de clic", "Leads", "Rendez-vous"],
      chart: "Rendez-vous par semaine",
      sponsored: "Sponsorisé",
      cta: "Réserver un appel",
      toasts: [
        "Nouveau rendez-vous · Claire D.",
        "Lead qualifié · Hugo L.",
        "Nouveau rendez-vous · Sara M.",
        "Formulaire envoyé · Paul R.",
      ],
    },
  },
  en: {
    caption: "Illustrative interface, built from our real projects.",
    design: {
      page: "Homepage",
      share: "Share",
      layers: "Layers",
      layerItems: [
        "Navbar",
        "Hero",
        "Services",
        "Projects",
        "Testimonials",
        "Footer",
      ],
      type: "Typography",
      comment: "This version is approved, moving to development part.",
    },
    dev: {
      deploy: "Deployed to production",
      deployTime: "38 s ago",
      scores: ["Performance", "Accessibility", "Best practices", "SEO"],
    },
    ai: {
      workflow: "Lead qualification",
      active: "Active",
      trigger: ["Gmail Trigger", "New email received"],
      agent: ["AI Agent", "Tools Agent"],
      ports: ["Chat Model", "Memory", "Tool"],
      memory: "Simple Memory",
      tool: ["HubSpot", "Creates the deal · €18k"],
      outputs: [
        ["Gmail", "Reply sent"],
        ["Slack", "#sales · @Maximilien"],
        ["Google Sheets", "Row added to report"],
      ],
      sticky: [
        "Sophie Martin",
        "Quote request · website redesign",
        "Hi, we're looking for an agency to redesign…",
      ],
      item: "1 item",
      execute: "Execute workflow",
      result: ["Hot lead · score 92/100", "Personalised reply drafted in 4 s"],
      run: "Run",
    },
    funnel: {
      kpis: ["Impressions", "Click-through", "Leads", "Meetings"],
      chart: "Meetings per week",
      sponsored: "Sponsored",
      cta: "Book a call",
      toasts: [
        "New meeting · Claire D.",
        "Qualified lead · Hugo L.",
        "New meeting · Sara M.",
        "Form submitted · Paul R.",
      ],
    },
  },
};

const Pointer = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
} | null>(null);

export function HeroStage({
  service,
  content,
}: {
  service: ServiceKey;
  content: ServiceContent;
}) {
  const { lang } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.4], ["3rem", "1.75rem"]);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 110, damping: 20 });
  const y = useSpring(py, { stiffness: 110, damping: 20 });

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-16 max-w-[90rem] pb-6 md:mt-20"
    >
      <div
        aria-hidden
        className="absolute inset-x-[10%] top-[10%] h-2/3 rounded-full bg-brand/25 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={{ scale, borderRadius: radius }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        className="relative aspect-[4/5] origin-top overflow-hidden border border-white/10 bg-[#0b0d15] sm:aspect-[16/10] lg:aspect-[16/8]"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <Pointer.Provider value={{ x, y }}>
          {service === "design" && <DesignStage content={content} />}
          {service === "development" && <DevStage content={content} />}
          {service === "aiAgents" && <AgentStage />}
          {service === "salesFunnel" && <FunnelStage content={content} />}
        </Pointer.Provider>
      </motion.div>
      <p className="mt-4 text-center text-xs text-white/55">
        {copy[lang].caption}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- helpers */

function Layer({
  depth = 1,
  delay = 0,
  className = "",
  children,
}: {
  depth?: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const p = useContext(Pointer)!;
  const x = useTransform(p.x, (v) => v * depth * -36);
  const y = useTransform(p.y, (v) => v * depth * -36);
  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay, ease }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function Dots() {
  return (
    <>
      <span className="size-2 rounded-full bg-[#ff5f57]" />
      <span className="size-2 rounded-full bg-[#febc2e]" />
      <span className="size-2 rounded-full bg-[#28c840]" />
    </>
  );
}

function Window({
  title,
  dark = false,
  className = "",
  children,
}: {
  title?: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ${dark ? "bg-[#12141f] ring-white/10" : "bg-white ring-black/10"} ${className}`}
    >
      <div
        className={`flex items-center gap-1.5 border-b px-3 py-2 ${dark ? "border-white/5" : "border-black/5"}`}
      >
        <Dots />
        {title && (
          <span
            className={`ml-2 truncate font-mono text-[10px] ${dark ? "text-white/55" : "text-black/40"}`}
          >
            {title}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Avatar({
  index,
  className = "size-7",
}: {
  index: number;
  className?: string;
}) {
  const m = members[index];
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ring-2 ring-[#11131c] ${className}`}
    >
      <Image
        src={m.photo}
        alt={m.name}
        fill
        sizes="40px"
        className="object-cover object-top"
      />
    </span>
  );
}

function useTicker(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return tick;
}

function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const { lang } = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fmt = (v: number) =>
      v.toLocaleString(lang, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;
    const controls = animate(0, to, {
      duration: 1.8,
      delay: 0.6,
      ease,
      onUpdate: (v) => (node.textContent = fmt(v)),
    });
    return () => controls.stop();
  }, [to, decimals, suffix, lang]);
  return <span ref={ref}>0</span>;
}

/* ----------------------------------------------------------------- design */

function Cursor({
  label,
  color,
  left,
  top,
  duration,
}: {
  label: string;
  color: string;
  left: string[];
  top: string[];
  duration: number;
}) {
  return (
    <motion.div
      aria-hidden
      className="absolute z-20 hidden sm:block"
      style={{ left: left[0], top: top[0] }}
      animate={{ left, top }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={color}
        className="drop-shadow"
      >
        <path d="M3 2l7 19 2.5-7.5L20 11z" />
      </svg>
      <span
        className="ml-3 inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium text-night"
        style={{ background: color }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function DesignStage({ content }: { content: ServiceContent }) {
  const { lang } = useLocale();
  const c = copy[lang].design;
  const slug = content.hero.project;
  const shots = projectPreviews(slug);
  const name = projects.find((p) => p.slug === slug)?.name ?? slug;

  return (
    <>
      <div className="absolute inset-x-0 top-0 z-10 flex h-11 items-center justify-between border-b border-white/10 bg-[#11131c]/90 px-4 text-xs text-white/60 backdrop-blur">
        <span className="flex items-center gap-3">
          <span className="grid grid-cols-2 gap-0.5">
            <span className="size-1.5 rounded-sm bg-[#f24e1e]" />
            <span className="size-1.5 rounded-full bg-[#ff7262]" />
            <span className="size-1.5 rounded-sm bg-[#a259ff]" />
            <span className="size-1.5 rounded-full bg-[#1abcfe]" />
          </span>
          <span className="truncate">
            {name} <span className="text-white/55">/</span> {c.page}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <span className="flex -space-x-2">
            {[3, 4, 1].map((i) => (
              <Avatar key={i} index={i} className="size-6" />
            ))}
          </span>
          <span className="rounded-md bg-brand px-2.5 py-1 text-white">
            {c.share}
          </span>
        </span>
      </div>

      <div className="absolute bottom-0 left-0 top-11 hidden w-[16%] border-r border-white/10 bg-[#11131c]/80 p-4 md:block">
        <p className="eyebrow text-white/55">{c.layers}</p>
        <ul className="mt-4 space-y-1 text-xs">
          {c.layerItems.map((l, i) => (
            <li
              key={l}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === 1 ? "bg-brand/30 text-white" : "text-white/55"}`}
            >
              <span className="size-2.5 rounded-[3px] border border-current" />
              {l}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 right-0 top-11 hidden w-[18%] border-l border-white/10 bg-[#11131c]/80 p-4 md:block">
        <p className="eyebrow text-white/55">{content.hero.card.title}</p>
        <ul className="mt-4 space-y-2.5">
          {content.hero.card.rows.map((r) => (
            <li key={r.label} className="flex items-center gap-2 text-xs">
              <span
                className="size-5 shrink-0 rounded border border-white/15"
                style={{ background: r.value }}
              />
              <span className="truncate text-white/70">{r.label}</span>
              <span className="ml-auto font-mono text-[10px] text-white/55">
                {r.value}
              </span>
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-8 text-white/55">{c.type}</p>
        <p className="mt-3 font-serif text-5xl leading-none text-white">Aa</p>
        <p className="mt-1.5 font-mono text-[10px] text-white/55">
          Serif · 96 / 90
        </p>
        <p className="mt-4 text-3xl font-medium leading-none text-white">Aa</p>
        <p className="mt-1.5 font-mono text-[10px] text-white/55">
          Satoshi · 18 / 28
        </p>
      </div>

      <Layer
        depth={0.5}
        delay={0.3}
        className="left-[6%] right-[6%] top-[16%] md:left-[22%] md:right-[24%] md:top-[15%]"
      >
        <p className="mb-2 font-mono text-[10px] text-brand-sky">
          Desktop · 1440
        </p>
        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
            <Image
              src={shots[0] ?? projectImage(slug)}
              alt={name}
              fill
              // Not preloaded: on phones the intro text is the main content and this sits below it.
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 56vw, 88vw"
              className="object-cover object-top"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1.5 border border-brand-sky"
          >
            {[
              "-left-1 -top-1",
              "-right-1 -top-1",
              "-bottom-1 -left-1",
              "-bottom-1 -right-1",
            ].map((pos) => (
              <span
                key={pos}
                className={`absolute size-2 border border-brand-sky bg-white ${pos}`}
              />
            ))}
          </div>
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-brand-sky px-1.5 py-0.5 font-mono text-[10px] text-night">
            1440 × 900
          </span>
        </div>
      </Layer>

      <Layer
        depth={1.2}
        delay={0.6}
        className="bottom-[7%] right-[8%] w-[26%] md:bottom-[8%] md:right-[20%] md:w-[10%]"
      >
        <div className="rounded-[1.4rem] bg-[#1b1d27] p-1.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
          <div className="relative aspect-[9/18] overflow-hidden rounded-[1.1rem] bg-white">
            <Image
              src="/images/service/little-green-spark-mobile.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 10rem, 24vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </Layer>

      <Layer
        depth={1.6}
        delay={0.9}
        className="bottom-[9%] left-[5%] max-w-[62%] md:bottom-[10%] md:left-[19%] md:max-w-[17rem]"
      >
        <div className="flex gap-2.5 rounded-2xl rounded-bl-sm bg-white p-3 text-ink shadow-2xl">
          <Avatar index={1} className="size-8" />
          <div>
            <p className="text-[11px] font-medium">{members[1].name}</p>
            <p className="mt-0.5 text-xs leading-snug text-ink/70">
              {c.comment}
            </p>
          </div>
        </div>
      </Layer>

      <Cursor
        label={`${members[3].name.split(" ")[0]} · UX/UI`}
        color="#f9a8d4"
        left={["38%", "58%", "50%", "38%"]}
        top={["30%", "42%", "62%", "30%"]}
        duration={10}
      />
      <Cursor
        label={`${members[4].name.split(" ")[0]} · Dev`}
        color="#6ee7b7"
        left={["66%", "46%", "62%", "66%"]}
        top={["60%", "52%", "26%", "60%"]}
        duration={12}
      />
    </>
  );
}

/* ------------------------------------------------------------ development */

const code: [string, string][][] = [
  [
    ["export default function ", "text-pink-400"],
    ["Hero", "text-sky-300"],
    ["() {", "text-white/60"],
  ],
  [["  return (", "text-white/60"]],
  [
    ["    <section ", "text-sky-300"],
    ["className", "text-emerald-300"],
    ['="hero"', "text-amber-200"],
    [">", "text-sky-300"],
  ],
  [
    ["      <h1>", "text-sky-300"],
    ["{title}", "text-white"],
    ["</h1>", "text-sky-300"],
  ],
  [
    ["      <Button ", "text-sky-300"],
    ["href", "text-emerald-300"],
    ['="/contact"', "text-amber-200"],
    [" />", "text-sky-300"],
  ],
  [["    </section>", "text-sky-300"]],
  [["  );", "text-white/60"]],
  [["}", "text-white/60"]],
  [["", ""]],
  [["// SEO + GEO, LCP < 2.5 s", "text-white/55"]],
];

function Ring({
  value,
  label,
  delay,
  className = "",
}: {
  value: number;
  label: string;
  delay: number;
  className?: string;
}) {
  const C = 2 * Math.PI * 16;
  return (
    <div className={`flex-col items-center gap-1.5 ${className || "flex"}`}>
      <span className="relative size-12">
        <svg viewBox="0 0 40 40" className="size-12 -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="rgba(52,211,153,0.15)"
            strokeWidth="3"
          />
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - value / 100) }}
            transition={{ duration: 1.4, delay, ease }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-mono text-xs text-emerald-300">
          {value}
        </span>
      </span>
      <span className="max-w-[4.5rem] text-center text-[10px] leading-tight text-ink/60">
        {label}
      </span>
    </div>
  );
}

function DevStage({ content }: { content: ServiceContent }) {
  const { lang } = useLocale();
  const c = copy[lang].dev;
  // A real capture of the OPCO EP hero (the hero project), rather than a cropped preview.
  const shot = "/images/service/opco-hero_section.jpg";

  return (
    <>
      <Layer
        depth={0.5}
        delay={0.2}
        className="bottom-[4%] left-[5%] z-10 w-[66%] sm:bottom-auto sm:top-[10%] sm:z-auto sm:w-[46%]"
      >
        <Window title="app/hero.tsx" dark>
          <div className="flex text-[9px] leading-[1.7] sm:text-[11px] sm:leading-[1.9] md:text-xs">
            <div className="select-none border-r border-white/5 px-3 py-3 text-right font-mono text-white/55">
              {code.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="overflow-hidden px-4 py-3 font-mono">
              {code.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
                  className="whitespace-pre"
                >
                  {line.map(([text, cls], j) => (
                    <span key={j} className={cls}>
                      {text || "\u00a0"}
                    </span>
                  ))}
                  {i === code.length - 1 && (
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-brand-sky" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Window>
      </Layer>

      <Layer
        depth={0.9}
        delay={0.45}
        className="left-[5%] right-[5%] top-[5%] sm:left-auto sm:right-[4%] sm:top-[14%] sm:w-[56%] md:top-[18%] md:w-[50%]"
      >
        <Window title={`https://${content.hero.url}`}>
          <div className="relative aspect-[16/10]">
            <Image
              src={shot}
              alt=""
              fill
              // Not preloaded, like the design stage: the intro text is the main content on phones.
              sizes="(min-width: 768px) 50vw, 85vw"
              className="object-cover object-top"
            />
          </div>
        </Window>
      </Layer>

      <Layer
        depth={1.5}
        delay={0.8}
        className="bottom-[9%] right-[5%] z-20 sm:bottom-[7%] sm:left-[30%] sm:right-auto"
      >
        <div className="rounded-2xl bg-white p-3 shadow-2xl sm:p-4">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-medium text-ink">
            <span className="size-2 rounded-full bg-emerald-400" /> Lighthouse
          </p>
          <div className="flex gap-3">
            {c.scores.map((s, i) => (
              <Ring
                key={s}
                label={s}
                value={[95, 100, 100, 100][i]}
                delay={1 + i * 0.15}
                className={i > 0 ? "hidden sm:flex" : ""}
              />
            ))}
          </div>
        </div>
      </Layer>

      <Layer
        depth={1.8}
        delay={1.6}
        className="right-[5%] top-[40%] hidden sm:block md:right-[8%] md:top-[74%]"
      >
        <div className="flex items-center gap-3 rounded-full bg-emerald-400 py-2 pl-2 pr-4 text-night shadow-[0_20px_40px_-10px_rgba(52,211,153,0.6)]">
          <span className="grid size-7 place-items-center rounded-full bg-night text-xs text-emerald-300">
            ✓
          </span>
          <span className="text-xs font-medium">
            {c.deploy} <span className="opacity-60">· {c.deployTime}</span>
          </span>
        </div>
      </Layer>
    </>
  );
}

/* -------------------------------------------------------------- AI agents */

/** Real app logos (brand colours) for the n8n-style workflow. */
const LOGO = {
  gmail: "/images/tools/gmail.svg",
  slack: "/images/tools/slack.svg",
  sheets: "/images/tools/google-sheets.svg",
  hubspot: "/images/tools/hubspot-color.svg",
};
const MODELS = [
  { name: "Anthropic", logo: "/images/tools/anthropic.svg" },
  { name: "OpenAI", logo: "/images/tools/openai.svg" },
  { name: "Mistral", logo: "/images/tools/mistral.svg" },
  { name: "Meta Llama", logo: "/images/tools/meta.svg" },
];

/** Where each workflow step is in the run: waiting, running, or done (n8n's green check). */
type RunState = "idle" | "running" | "done";

function NodeBox({
  state,
  shape = "node",
  className = "",
  children,
}: {
  state: RunState;
  shape?: "node" | "trigger" | "sub";
  className?: string;
  children: React.ReactNode;
}) {
  const radius =
    shape === "trigger"
      ? "rounded-l-[42%] rounded-r-xl"
      : shape === "sub"
        ? "rounded-full"
        : "rounded-xl";
  const ring =
    state === "running"
      ? "border-[#ff6d5a] shadow-[0_0_0_4px_rgba(255,109,90,0.25)]"
      : state === "done"
        ? "border-emerald-400"
        : "border-[#d4d7de]";
  return (
    <div
      className={`relative grid place-items-center border-2 bg-white transition-[border-color,box-shadow] duration-300 ${radius} ${ring} ${className}`}
    >
      {children}
      {state === "done" && (
        <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-emerald-400 text-[9px] font-bold text-night">
          ✓
        </span>
      )}
      {state === "running" && (
        <span className="absolute -right-1.5 -top-1.5 size-4 animate-spin rounded-full border-2 border-[#ff6d5a] border-t-transparent bg-white" />
      )}
    </div>
  );
}

function Logo({
  src,
  className = "size-[46%]",
}: {
  src: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={40}
      height={40}
      className={`object-contain ${className}`}
    />
  );
}

function Robot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4v4M9 13h.01M15 13h.01M9.5 16h5M2 12v3M22 12v3" />
    </svg>
  );
}

/** Label under a node, as on the n8n canvas. */
function Caption({
  title,
  sub,
  narrow = false,
}: {
  title: string;
  sub?: string;
  narrow?: boolean;
}) {
  return (
    // Wider than its node, as on the n8n canvas; sub-nodes sit close together, so theirs stay narrower.
    <span
      className={`${narrow ? "-mx-[18%]" : "-mx-[60%]"} mt-1.5 block text-center leading-tight`}
    >
      <span className="block truncate text-[11px] font-medium text-white">
        {title}
      </span>
      {sub && (
        <span className="block truncate text-[10px] text-white/55">{sub}</span>
      )}
    </span>
  );
}

/**
 * An n8n workflow: Gmail Trigger → AI Agent (chat model, memory and a HubSpot tool hanging below
 * it) → reply, Slack and Google Sheets. The run plays on a loop: each node spins, then gets its
 * green check, and "1 item" appears on the connections it has passed. Real logos, brand colours.
 */
function AgentStage() {
  const { lang } = useLocale();
  const c = copy[lang].ai;
  const tick = useTicker(1300);
  const step = tick % 7; // 0 trigger · 1 agent · 2 outputs · 3–6 done
  const model = MODELS[Math.floor(tick / 7) % MODELS.length];
  const state = (at: number): RunState =>
    step < at ? "idle" : step === at ? "running" : "done";
  const passed = (at: number) => step > at;

  // Connections, in the 0–100 viewBox of the canvas (stretched to its size). Node sizes are a share
  // of the canvas width, which is twice its height on desktop, so these line up with the nodes.
  const main = [{ d: "M17.5 40 C25 40 25 40 32.5 40", after: 0 }];
  const outs = [16, 40, 64].map((y) => ({
    d: `M58.5 40 C67 40 66 ${y} 75.5 ${y}`,
    after: 1,
  }));
  const subs = [36.8, 45.5, 54.2].map((x, i) => ({
    d: `M${x} 50 C${x} 58 ${[38, 46, 54][i]} 60 ${[38, 46, 54][i]} 66`,
    after: 0,
  }));

  return (
    <>
      {/* Desktop: the canvas */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-3 rounded-lg border border-white/10 bg-[#1e2030] px-3 py-1.5 text-xs text-white/80">
          <Image
            src="/images/tools/n8n.svg"
            alt="n8n"
            width={36}
            height={14}
            className="h-3.5 w-auto"
          />
          <span className="h-3.5 w-px bg-white/15" />
          {c.workflow}
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-300">
            <span className="relative h-3.5 w-6 rounded-full bg-emerald-500">
              <span className="absolute right-0.5 top-0.5 size-2.5 rounded-full bg-white" />
            </span>
            {c.active}
          </span>
        </div>

        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          {[...main, ...outs].map(({ d, after }) => (
            <g key={d}>
              <path
                d={d}
                fill="none"
                stroke={passed(after) ? "#34d399" : "rgba(255,255,255,0.28)"}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                className="transition-colors duration-300"
              />
              {step === after + 1 && (
                <path
                  d={d}
                  fill="none"
                  stroke="#ff6d5a"
                  strokeWidth="2"
                  strokeDasharray="4 10"
                  vectorEffect="non-scaling-stroke"
                  className="animate-dash"
                />
              )}
            </g>
          ))}
          {subs.map(({ d }) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke={step === 1 ? "#ff6d5a" : "rgba(255,255,255,0.28)"}
              strokeWidth="1.5"
              strokeDasharray="5 4"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* "1 item" on connections already passed */}
        {passed(0) && (
          <span className="absolute left-[25%] top-[35%] -translate-x-1/2 text-[10px] text-emerald-300">
            {c.item}
          </span>
        )}
        {passed(2) &&
          [16, 40, 64].map((y) => (
            <span
              key={y}
              className="absolute left-[69%] -translate-x-1/2 text-[10px] text-emerald-300"
              style={{ top: `${y - 5.5}%` }}
            >
              {c.item}
            </span>
          ))}

        {/* Gmail Trigger */}
        <Layer depth={0.7} delay={0.2} className="left-[8.5%] top-[31%] w-[9%]">
          <div className="relative">
            <span
              aria-hidden
              className="absolute -left-4 top-1/2 -translate-y-1/2 text-sm text-[#ff6d5a]"
            >
              ⚡
            </span>
            <NodeBox
              state={state(0)}
              shape="trigger"
              className="aspect-square w-full"
            >
              <Logo src={LOGO.gmail} />
            </NodeBox>
            <Caption title={c.trigger[0]} sub={c.trigger[1]} />
          </div>
        </Layer>

        {/* AI Agent with its sub-node ports */}
        <Layer
          depth={0.5}
          delay={0.35}
          className="left-[32.5%] top-[30%] w-[26%]"
        >
          <NodeBox
            state={state(1)}
            className="aspect-[2.6/1] w-full !place-items-stretch"
          >
            <div className="flex items-center gap-3 px-4">
              <Robot className="size-8 shrink-0 text-[#7d7f8a]" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">
                  {c.agent[0]}
                </span>
                <span className="block truncate text-[11px] text-ink/60">
                  {c.agent[1]}
                </span>
              </span>
            </div>
            <div className="grid grid-cols-3 self-end pb-1.5 text-center text-[9px] text-ink/60">
              {c.ports.map((p) => (
                <span key={p}>
                  {p}
                  {p === c.ports[0] && (
                    <span className="text-[#ff6d5a]">*</span>
                  )}
                  <span className="mx-auto mt-0.5 block size-1.5 rotate-45 bg-[#a2a5b0]" />
                </span>
              ))}
            </div>
          </NodeBox>
        </Layer>

        {/* Sub-nodes: chat model (cycles through providers), memory, HubSpot tool */}
        {[
          {
            x: "left-[34.5%]",
            logo: model.logo,
            title: model.name,
            sub: c.ports[0],
          },
          {
            x: "left-[42.5%]",
            icon: true,
            title: c.memory.split(" ")[0],
            sub: c.ports[1],
          },
          {
            x: "left-[50.5%]",
            logo: LOGO.hubspot,
            title: c.tool[0],
            sub: c.ports[2],
          },
        ].map((n, i) => (
          <Layer
            key={i}
            depth={0.9}
            delay={0.5 + i * 0.1}
            className={`${n.x} top-[66%] w-[7%]`}
          >
            <NodeBox
              state={step === 1 ? "running" : step > 1 ? "done" : "idle"}
              shape="sub"
              className="aspect-square w-full"
            >
              <AnimatePresence mode="wait">
                {n.icon ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[46%] text-[#7d7f8a]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden
                  >
                    <ellipse cx="12" cy="6" rx="7" ry="3" />
                    <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
                  </svg>
                ) : (
                  <motion.span
                    key={n.logo}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    className="grid size-full place-items-center"
                  >
                    <Logo src={n.logo!} />
                  </motion.span>
                )}
              </AnimatePresence>
            </NodeBox>
            <Caption title={n.title} sub={n.sub} narrow />
          </Layer>
        ))}

        {/* Outputs */}
        {c.outputs.map(([title, sub], i) => (
          <Layer
            key={title}
            depth={1 + i * 0.25}
            delay={0.6 + i * 0.12}
            className={`left-[75.5%] w-[8%] ${["top-[8%]", "top-[32%]", "top-[56%]"][i]}`}
          >
            <NodeBox state={state(2)} className="aspect-square w-full">
              <Logo src={[LOGO.gmail, LOGO.slack, LOGO.sheets][i]} />
            </NodeBox>
            <Caption title={title} sub={sub} />
          </Layer>
        ))}

        {/* Sticky note with the incoming email */}
        <Layer
          depth={1.3}
          delay={0.8}
          className="bottom-[8%] left-[3%] w-[22%]"
        >
          <div className="-rotate-2 rounded-md bg-[#fff5c2] p-3 text-[11px] leading-snug text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
            <p className="font-semibold">✉ {c.sticky[0]}</p>
            <p className="mt-1 truncate text-ink/70">{c.sticky[1]}</p>
            <p className="mt-1 line-clamp-2 text-ink/60">{c.sticky[2]}</p>
          </div>
        </Layer>

        {/* Run result */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-[3%] top-[14%] z-10 flex max-w-[24%] items-start gap-2.5 rounded-xl bg-white p-3 text-ink shadow-2xl"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-400 text-[11px] text-night">
                ✓
              </span>
              <span className="min-w-0 text-[11px] leading-snug">
                <span className="block font-medium">{c.result[0]}</span>
                <span className="block text-ink/60">{c.result[1]}</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phones: the same flow, top to bottom */}
      <div className="absolute inset-x-0 bottom-14 top-0 flex flex-col items-center justify-center gap-2 px-5 md:hidden">
        <div className="w-20">
          <NodeBox
            state={state(0)}
            shape="trigger"
            className="aspect-square w-full"
          >
            <Logo src={LOGO.gmail} />
          </NodeBox>
          <Caption title={c.trigger[0]} />
        </div>
        <span
          className={`h-5 w-0.5 ${passed(0) ? "bg-emerald-400" : "bg-white/25"}`}
        />
        <NodeBox state={state(1)} className="w-full max-w-xs py-3">
          <div className="flex items-center gap-3">
            <Robot className="size-7 text-[#7d7f8a]" />
            <span className="text-sm font-semibold text-ink">{c.agent[0]}</span>
            <span className="flex size-7 items-center justify-center rounded-full border border-[#d4d7de]">
              <Logo src={model.logo} className="size-4" />
            </span>
          </div>
        </NodeBox>
        <span
          className={`h-5 w-0.5 ${passed(1) ? "bg-emerald-400" : "bg-white/25"}`}
        />
        <div className="grid w-full max-w-xs grid-cols-3 gap-3">
          {c.outputs.map(([title], i) => (
            <div key={title}>
              <NodeBox state={state(2)} className="aspect-square w-full">
                <Logo src={[LOGO.gmail, LOGO.slack, LOGO.sheets][i]} />
              </NodeBox>
              <Caption title={title} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-lg bg-[#ff6d5a] px-3 py-1.5 text-[11px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(255,109,90,0.8)]">
          <svg
            viewBox="0 0 24 24"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" />
          </svg>
          {c.execute}
        </span>
        <span className="hidden rounded-lg border border-white/10 bg-[#1e2030] px-2.5 py-1.5 font-mono text-[11px] text-white/60 sm:inline">
          {c.run} #{1284 + Math.floor(tick / 7)} · {step >= 3 ? "✓ 4.1 s" : "…"}
        </span>
      </div>
    </>
  );
}

/* ----------------------------------------------------------- sales funnel */

const chart =
  "M0 105 C25 100 40 92 60 88 S95 70 120 72 S160 50 185 46 S230 30 255 22 S285 12 300 8";

function FunnelStage({ content }: { content: ServiceContent }) {
  const { lang } = useLocale();
  const c = copy[lang].funnel;
  const tick = useTicker(2600);
  const client =
    projects.find((p) => p.slug === content.hero.project)?.name ??
    content.hero.url;
  const kpis = [
    { to: 184, suffix: " k", delta: "+32 %" },
    { to: 3.8, decimals: 1, suffix: " %", delta: "+0,9" },
    { to: 412, delta: "+48 %" },
    { to: 47, delta: "+291 %" },
  ];

  return (
    <>
      <Layer
        depth={0.4}
        delay={0.2}
        className="left-[5%] right-[5%] top-[5%] md:top-[7%]"
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map((k, i) => (
            <div
              key={c.kpis[i]}
              className={`rounded-2xl border border-white/10 bg-[#141724]/95 p-4 ${i < 2 ? "hidden md:block" : ""}`}
            >
              <p className="text-[11px] text-white/55">{c.kpis[i]}</p>
              <p className="mt-2 flex items-baseline justify-between gap-2">
                <span className="font-serif text-3xl text-white md:text-4xl">
                  <CountUp to={k.to} decimals={k.decimals} suffix={k.suffix} />
                </span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">
                  {k.delta}
                </span>
              </p>
            </div>
          ))}
        </div>
      </Layer>

      <Layer
        depth={0.7}
        delay={0.4}
        className="bottom-[5%] left-[5%] right-[5%] top-[30%] md:right-[30%] md:top-[34%]"
      >
        <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#141724]/95 p-5">
          <p className="flex items-center justify-between text-xs text-white/55">
            {c.chart}
            <span className="font-mono text-[10px] text-white/55">
              S1 → S12
            </span>
          </p>
          <motion.svg
            viewBox="0 0 300 120"
            preserveAspectRatio="none"
            className="mt-4 w-full flex-1"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.8, delay: 0.6, ease }}
          >
            <defs>
              <linearGradient id="funnel-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4791ff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#4791ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[30, 60, 90].map((y) => (
              <line
                key={y}
                x1="0"
                x2="300"
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path d={`${chart} L300 120 L0 120 Z`} fill="url(#funnel-area)" />
            <path
              d={chart}
              fill="none"
              stroke="#4791ff"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>
        </div>
      </Layer>

      <Layer
        depth={1.4}
        delay={0.7}
        className="right-[5%] top-[34%] hidden w-[22%] md:block"
      >
        <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-2 p-3">
            <span className="grid size-7 place-items-center rounded-full bg-brand text-[10px] font-medium text-white">
              {client
                .split(" ")
                .filter((w) => w.length > 3)
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-medium">
                {client}
              </span>
              <span className="block text-[10px] text-ink/60">
                {c.sponsored}
              </span>
            </span>
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src={projectImage(content.hero.project)}
              alt=""
              fill
              sizes="20vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex items-center justify-between gap-2 p-3">
            <span className="truncate font-mono text-[10px] text-ink/60">
              {projectDomain(content.hero.project) ?? content.hero.url}
            </span>
            <span className="shrink-0 rounded-md bg-brand px-2.5 py-1.5 text-[11px] font-medium text-white">
              {c.cta}
            </span>
          </div>
        </div>
      </Layer>

      <div className="absolute right-[8%] top-[44%] md:right-[33%] md:top-[45%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tick}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-xs text-ink shadow-2xl"
          >
            <span className="grid size-6 place-items-center rounded-full bg-emerald-400 text-[11px] text-night">
              ✓
            </span>
            {c.toasts[tick % c.toasts.length]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
