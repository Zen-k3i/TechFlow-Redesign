"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import type { ServiceKey } from "@/i18n/routes";
import { members } from "../team/data";
import { ease, projectImage, projects } from "../site/content";
import { useLocale } from "../site/locale";
import { projectDomain, projectPreviews } from "../site/previews";
import type { ServiceContent } from "./data";

const copy = {
  fr: {
    caption: "Interface illustrative, construite à partir de nos projets réels.",
    design: {
      page: "Homepage",
      share: "Partager",
      layers: "Calques",
      layerItems: ["Navbar", "Hero", "Services", "Projets", "Témoignages", "Footer"],
      type: "Typographie",
      comment: "Cette version est validée, on passe au dev ✅",
    },
    dev: { deploy: "Déployé en production", deployTime: "il y a 38 s", scores: ["Performance", "Accessibilité", "Bonnes pratiques", "SEO"] },
    ai: {
      trigger: ["Gmail", "Nouvel e-mail reçu"],
      email: ["Sophie Martin", "Demande de devis · refonte du site", "Bonjour, nous cherchons une agence pour refondre…"],
      agent: ["Agent IA", "Qualifie et rédige"],
      result: ["Lead chaud · score 92/100", "Réponse personnalisée rédigée en 4 s"],
      outputs: [
        ["HubSpot", "Deal créé · 18 k€"],
        ["Slack", "#ventes · @Maximilien"],
        ["Sheets", "Ligne ajoutée au reporting"],
      ],
      model: "Modèle",
      run: "Exécution",
    },
    funnel: {
      kpis: ["Impressions", "Taux de clic", "Leads", "Rendez-vous"],
      chart: "Rendez-vous par semaine",
      sponsored: "Sponsorisé",
      cta: "Réserver un appel",
      toasts: ["Nouveau rendez-vous · Claire D.", "Lead qualifié · Hugo L.", "Nouveau rendez-vous · Sara M.", "Formulaire envoyé · Paul R."],
    },
  },
  en: {
    caption: "Illustrative interface, built from our real projects.",
    design: {
      page: "Homepage",
      share: "Share",
      layers: "Layers",
      layerItems: ["Navbar", "Hero", "Services", "Projects", "Testimonials", "Footer"],
      type: "Typography",
      comment: "This version is approved, moving to dev ✅",
    },
    dev: { deploy: "Deployed to production", deployTime: "38 s ago", scores: ["Performance", "Accessibility", "Best practices", "SEO"] },
    ai: {
      trigger: ["Gmail", "New email received"],
      email: ["Sophie Martin", "Quote request · website redesign", "Hi, we're looking for an agency to redesign…"],
      agent: ["AI agent", "Qualifies and drafts"],
      result: ["Hot lead · score 92/100", "Personalised reply drafted in 4 s"],
      outputs: [
        ["HubSpot", "Deal created · €18k"],
        ["Slack", "#sales · @Maximilien"],
        ["Sheets", "Row added to report"],
      ],
      model: "Model",
      run: "Run",
    },
    funnel: {
      kpis: ["Impressions", "Click-through", "Leads", "Meetings"],
      chart: "Meetings per week",
      sponsored: "Sponsored",
      cta: "Book a call",
      toasts: ["New meeting · Claire D.", "Qualified lead · Hugo L.", "New meeting · Sara M.", "Form submitted · Paul R."],
    },
  },
};

const Pointer = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null);

export function HeroStage({ service, content }: { service: ServiceKey; content: ServiceContent }) {
  const { lang } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.4], ["3rem", "1.75rem"]);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 110, damping: 20 });
  const y = useSpring(py, { stiffness: 110, damping: 20 });

  return (
    <div ref={ref} className="relative mx-auto mt-16 max-w-[90rem] pb-6 md:mt-20">
      <div aria-hidden className="absolute inset-x-[10%] top-[10%] h-2/3 rounded-full bg-brand/25 blur-[120px]" />
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
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <Pointer.Provider value={{ x, y }}>
          {service === "design" && <DesignStage content={content} />}
          {service === "development" && <DevStage content={content} />}
          {service === "aiAgents" && <AgentStage />}
          {service === "salesFunnel" && <FunnelStage content={content} />}
        </Pointer.Provider>
      </motion.div>
      <p className="mt-4 text-center text-xs text-white/35">{copy[lang].caption}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- helpers */

function Layer({ depth = 1, delay = 0, className = "", children }: { depth?: number; delay?: number; className?: string; children: React.ReactNode }) {
  const p = useContext(Pointer)!;
  const x = useTransform(p.x, (v) => v * depth * -36);
  const y = useTransform(p.y, (v) => v * depth * -36);
  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay, ease }} className="h-full">
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

function Window({ title, dark = false, className = "", children }: { title?: string; dark?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={`overflow-hidden rounded-xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ${dark ? "bg-[#12141f] ring-white/10" : "bg-white ring-black/10"} ${className}`}>
      <div className={`flex items-center gap-1.5 border-b px-3 py-2 ${dark ? "border-white/5" : "border-black/5"}`}>
        <Dots />
        {title && <span className={`ml-2 truncate font-mono text-[10px] ${dark ? "text-white/40" : "text-black/40"}`}>{title}</span>}
      </div>
      {children}
    </div>
  );
}

function Avatar({ index, className = "size-7" }: { index: number; className?: string }) {
  const m = members[index];
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full ring-2 ring-[#11131c] ${className}`}>
      <Image src={m.photo} alt={m.name} fill sizes="40px" className="object-cover object-top" />
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

function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const { lang } = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fmt = (v: number) => v.toLocaleString(lang, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    const controls = animate(0, to, { duration: 1.8, delay: 0.6, ease, onUpdate: (v) => (node.textContent = fmt(v)) });
    return () => controls.stop();
  }, [to, decimals, suffix, lang]);
  return <span ref={ref}>0</span>;
}

/* ----------------------------------------------------------------- design */

function Cursor({ label, color, left, top, duration }: { label: string; color: string; left: string[]; top: string[]; duration: number }) {
  return (
    <motion.div
      aria-hidden
      className="absolute z-20 hidden sm:block"
      style={{ left: left[0], top: top[0] }}
      animate={{ left, top }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={color} className="drop-shadow">
        <path d="M3 2l7 19 2.5-7.5L20 11z" />
      </svg>
      <span className="ml-3 inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium text-night" style={{ background: color }}>
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
            {name} <span className="text-white/30">/</span> {c.page}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <span className="flex -space-x-2">
            {[3, 4, 1].map((i) => (
              <Avatar key={i} index={i} className="size-6" />
            ))}
          </span>
          <span className="rounded-md bg-brand px-2.5 py-1 text-white">{c.share}</span>
        </span>
      </div>

      <div className="absolute bottom-0 left-0 top-11 hidden w-[16%] border-r border-white/10 bg-[#11131c]/80 p-4 md:block">
        <p className="eyebrow text-white/40">{c.layers}</p>
        <ul className="mt-4 space-y-1 text-xs">
          {c.layerItems.map((l, i) => (
            <li key={l} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === 1 ? "bg-brand/30 text-white" : "text-white/45"}`}>
              <span className="size-2.5 rounded-[3px] border border-current" />
              {l}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 right-0 top-11 hidden w-[18%] border-l border-white/10 bg-[#11131c]/80 p-4 md:block">
        <p className="eyebrow text-white/40">{content.hero.card.title}</p>
        <ul className="mt-4 space-y-2.5">
          {content.hero.card.rows.map((r) => (
            <li key={r.label} className="flex items-center gap-2 text-xs">
              <span className="size-5 shrink-0 rounded border border-white/15" style={{ background: r.value }} />
              <span className="truncate text-white/70">{r.label}</span>
              <span className="ml-auto font-mono text-[10px] text-white/40">{r.value}</span>
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-8 text-white/40">{c.type}</p>
        <p className="mt-3 font-serif text-5xl leading-none text-white">Aa</p>
        <p className="mt-1.5 font-mono text-[10px] text-white/40">Serif · 96 / 90</p>
        <p className="mt-4 text-3xl font-medium leading-none text-white">Aa</p>
        <p className="mt-1.5 font-mono text-[10px] text-white/40">Satoshi · 18 / 28</p>
      </div>

      <Layer depth={0.5} delay={0.3} className="left-[6%] right-[6%] top-[16%] md:left-[22%] md:right-[24%] md:top-[15%]">
        <p className="mb-2 font-mono text-[10px] text-brand-sky">Desktop · 1440</p>
        <div className="relative">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
            <Image src={shots[0] ?? projectImage(slug)} alt={name} fill preload sizes="(min-width: 768px) 50vw, 90vw" className="object-cover object-top" />
          </div>
          <div aria-hidden className="pointer-events-none absolute -inset-1.5 border border-brand-sky">
            {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos) => (
              <span key={pos} className={`absolute size-2 border border-brand-sky bg-white ${pos}`} />
            ))}
          </div>
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-brand-sky px-1.5 py-0.5 font-mono text-[10px] text-night">1440 × 900</span>
        </div>
      </Layer>

      {shots[1] && (
        <Layer depth={1.2} delay={0.6} className="bottom-[7%] right-[8%] w-[26%] md:bottom-[8%] md:right-[20%] md:w-[10%]">
          <div className="rounded-[1.4rem] bg-[#1b1d27] p-1.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
            <div className="relative aspect-[9/18] overflow-hidden rounded-[1.1rem] bg-white">
              <Image src={shots[1]} alt="" fill sizes="10rem" className="object-cover object-left-top" />
            </div>
          </div>
        </Layer>
      )}

      <Layer depth={1.6} delay={0.9} className="bottom-[9%] left-[5%] max-w-[62%] md:bottom-[10%] md:left-[19%] md:max-w-[17rem]">
        <div className="flex gap-2.5 rounded-2xl rounded-bl-sm bg-white p-3 text-ink shadow-2xl">
          <Avatar index={1} className="size-8" />
          <div>
            <p className="text-[11px] font-medium">{members[1].name}</p>
            <p className="mt-0.5 text-xs leading-snug text-ink/70">{c.comment}</p>
          </div>
        </div>
      </Layer>

      <Cursor label={`${members[3].name.split(" ")[0]} · UX/UI`} color="#f9a8d4" left={["38%", "58%", "50%", "38%"]} top={["30%", "42%", "62%", "30%"]} duration={10} />
      <Cursor label={`${members[4].name.split(" ")[0]} · Dev`} color="#6ee7b7" left={["66%", "46%", "62%", "66%"]} top={["60%", "52%", "26%", "60%"]} duration={12} />
    </>
  );
}

/* ------------------------------------------------------------ development */

const code: [string, string][][] = [
  [["export default function ", "text-pink-400"], ["Hero", "text-sky-300"], ["() {", "text-white/60"]],
  [["  return (", "text-white/60"]],
  [["    <section ", "text-sky-300"], ["className", "text-emerald-300"], ['="hero"', "text-amber-200"], [">", "text-sky-300"]],
  [["      <h1>", "text-sky-300"], ["{title}", "text-white"], ["</h1>", "text-sky-300"]],
  [["      <Button ", "text-sky-300"], ["href", "text-emerald-300"], ['="/contact"', "text-amber-200"], [" />", "text-sky-300"]],
  [["    </section>", "text-sky-300"]],
  [["  );", "text-white/60"]],
  [["}", "text-white/60"]],
  [["", ""]],
  [["// SEO + GEO, LCP < 2.5 s", "text-white/30"]],
];

function Ring({ value, label, delay, className = "" }: { value: number; label: string; delay: number; className?: string }) {
  const C = 2 * Math.PI * 16;
  return (
    <div className={`flex-col items-center gap-1.5 ${className || "flex"}`}>
      <span className="relative size-12">
        <svg viewBox="0 0 40 40" className="size-12 -rotate-90">
          <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(52,211,153,0.15)" strokeWidth="3" />
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
        <span className="absolute inset-0 grid place-items-center font-mono text-xs text-emerald-300">{value}</span>
      </span>
      <span className="max-w-[4.5rem] text-center text-[10px] leading-tight text-ink/55">{label}</span>
    </div>
  );
}

function DevStage({ content }: { content: ServiceContent }) {
  const { lang } = useLocale();
  const c = copy[lang].dev;
  const slug = content.hero.project;
  const shots = projectPreviews(slug);
  const shot = shots[2] ?? shots[0] ?? projectImage(slug);

  return (
    <>
      <Layer depth={0.5} delay={0.2} className="bottom-[4%] left-[5%] z-10 w-[66%] sm:bottom-auto sm:top-[10%] sm:z-auto sm:w-[46%]">
        <Window title="app/hero.tsx" dark>
          <div className="flex text-[9px] leading-[1.7] sm:text-[11px] sm:leading-[1.9] md:text-xs">
            <div className="select-none border-r border-white/5 px-3 py-3 text-right font-mono text-white/20">
              {code.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="overflow-hidden px-4 py-3 font-mono">
              {code.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }} className="whitespace-pre">
                  {line.map(([text, cls], j) => (
                    <span key={j} className={cls}>
                      {text || "\u00a0"}
                    </span>
                  ))}
                  {i === code.length - 1 && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-brand-sky" />}
                </motion.div>
              ))}
            </div>
          </div>
        </Window>
      </Layer>

      <Layer depth={0.9} delay={0.45} className="left-[5%] right-[5%] top-[5%] sm:left-auto sm:right-[4%] sm:top-[14%] sm:w-[56%] md:top-[18%] md:w-[50%]">
        <Window title={`https://${content.hero.url}`}>
          <div className="relative aspect-[16/10]">
            <Image src={shot} alt="" fill preload sizes="(min-width: 768px) 50vw, 85vw" className="object-cover object-top" />
          </div>
        </Window>
      </Layer>

      <Layer depth={1.5} delay={0.8} className="bottom-[9%] right-[5%] z-20 sm:bottom-[7%] sm:left-[30%] sm:right-auto">
        <div className="rounded-2xl bg-white p-3 shadow-2xl sm:p-4">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-medium text-ink">
            <span className="size-2 rounded-full bg-emerald-400" /> Lighthouse
          </p>
          <div className="flex gap-3">
            {c.scores.map((s, i) => (
              <Ring key={s} label={s} value={[98, 100, 100, 100][i]} delay={1 + i * 0.15} className={i > 0 ? "hidden sm:flex" : ""} />
            ))}
          </div>
        </div>
      </Layer>

      <Layer depth={1.8} delay={1.6} className="right-[5%] top-[40%] hidden sm:block md:right-[8%] md:top-[74%]">
        <div className="flex items-center gap-3 rounded-full bg-emerald-400 py-2 pl-2 pr-4 text-night shadow-[0_20px_40px_-10px_rgba(52,211,153,0.6)]">
          <span className="grid size-7 place-items-center rounded-full bg-night text-xs text-emerald-300">✓</span>
          <span className="text-xs font-medium">
            {c.deploy} <span className="opacity-60">· {c.deployTime}</span>
          </span>
        </div>
      </Layer>
    </>
  );
}

/* -------------------------------------------------------------- AI agents */

function Node({ icon, bg, title, sub, className = "" }: { icon: string; bg: string; title: string; sub: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-[#141724]/95 p-3 pr-5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] ${className}`}>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl text-base text-white" style={{ background: bg }}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-white">{title}</span>
        <span className="block truncate text-[11px] text-white/45">{sub}</span>
      </span>
      <span className="ml-auto size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
    </div>
  );
}

const models = ["Claude", "GPT", "Mistral", "Llama"];
const outputStyle = [
  { icon: "◎", bg: "#ff7a59" },
  { icon: "#", bg: "#611f69" },
  { icon: "▦", bg: "#0f9d58" },
];

function AgentCard({ tick }: { tick: number }) {
  const { lang } = useLocale();
  const c = copy[lang].ai;
  return (
    <div className="relative rounded-3xl border border-brand/60 bg-linear-to-b from-brand/25 to-[#141724] p-5 shadow-[0_0_80px_-10px_rgba(71,102,255,0.6)]">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-brand text-lg text-white">✦</span>
        <span>
          <span className="block font-medium text-white">{c.agent[0]}</span>
          <span className="block text-xs text-white/50">{c.agent[1]}</span>
        </span>
      </div>
      <p className="eyebrow mt-5 text-white/40">{c.model}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {models.map((m, i) => (
          <span key={m} className={`rounded-full px-2.5 py-1 text-[11px] transition-colors duration-500 ${i === tick % models.length ? "bg-white text-night" : "bg-white/5 text-white/45"}`}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function AgentStage() {
  const { lang } = useLocale();
  const c = copy[lang].ai;
  const tick = useTicker(1800);
  const edges = ["M24 47 C31 47 31 47 37 47", "M63 47 C70 47 69 22 75 22", "M63 47 C70 47 70 50 75 50", "M63 47 C70 47 69 78 75 78"];

  return (
    <>
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 hidden size-full md:block">
        {edges.map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d={d} fill="none" stroke="#4791ff" strokeWidth="2" strokeDasharray="4 10" vectorEffect="non-scaling-stroke" className="animate-dash" />
          </g>
        ))}
      </svg>

      <div className="absolute inset-0 hidden md:block">
        <Layer depth={0.8} delay={0.2} className="left-[4%] top-[47%] w-[20%] -translate-y-1/2">
          <Node icon="✉" bg="#ea4335" title={c.trigger[0]} sub={c.trigger[1]} />
        </Layer>
        <Layer depth={0.8} delay={0.35} className="left-[4%] top-[57%] w-[20%]">
          <div className="rounded-2xl border border-white/10 bg-[#141724]/80 p-3.5 text-[11px] leading-snug">
            <p className="font-medium text-white/80">{c.email[0]}</p>
            <p className="mt-1 truncate text-white/60">{c.email[1]}</p>
            <p className="mt-1 line-clamp-2 text-white/35">{c.email[2]}</p>
          </div>
        </Layer>
        <Layer depth={0.5} delay={0.4} className="left-[37%] top-[47%] w-[26%] -translate-y-1/2">
          <AgentCard tick={tick} />
        </Layer>
        <Layer depth={0.7} delay={1.1} className="left-[37%] top-[68%] w-[26%]">
          <div className="flex items-start gap-2.5 rounded-2xl bg-white p-3.5 text-ink shadow-2xl">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-400 text-[11px] text-night">✓</span>
            <span className="min-w-0 text-[11px] leading-snug">
              <span className="block font-medium">{c.result[0]}</span>
              <span className="block text-ink/55">{c.result[1]}</span>
            </span>
          </div>
        </Layer>
        {c.outputs.map(([title, sub], i) => (
          <Layer key={title} depth={1 + i * 0.3} delay={0.6 + i * 0.12} className={`right-[4%] w-[21%] -translate-y-1/2 ${["top-[22%]", "top-[50%]", "top-[78%]"][i]}`}>
            <Node icon={outputStyle[i].icon} bg={outputStyle[i].bg} title={title} sub={sub} />
          </Layer>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-12 top-0 flex flex-col justify-center gap-2 px-5 md:hidden">
        <Node icon="✉" bg="#ea4335" title={c.trigger[0]} sub={c.email[1]} />
        <span className="mx-auto h-4 w-px bg-brand-sky/60" />
        <AgentCard tick={tick} />
        <span className="mx-auto h-4 w-px bg-brand-sky/60" />
        <div className="grid grid-cols-3 gap-2">
          {c.outputs.map(([title], i) => (
            <div key={title} className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-[#141724]/95 p-3">
              <span className="grid size-8 place-items-center rounded-xl text-sm text-white" style={{ background: outputStyle[i].bg }}>
                {outputStyle[i].icon}
              </span>
              <span className="text-xs font-medium text-white">{title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/10 bg-[#141724] px-3 py-1.5 font-mono text-[11px] text-white/60">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
        {c.run} #{1284 + tick} · {(1.8 + ((tick * 7) % 10) / 10).toFixed(1)} s · ✓
      </div>
    </>
  );
}

/* ----------------------------------------------------------- sales funnel */

const chart = "M0 105 C25 100 40 92 60 88 S95 70 120 72 S160 50 185 46 S230 30 255 22 S285 12 300 8";

function FunnelStage({ content }: { content: ServiceContent }) {
  const { lang } = useLocale();
  const c = copy[lang].funnel;
  const tick = useTicker(2600);
  const client = projects.find((p) => p.slug === content.hero.project)?.name ?? content.hero.url;
  const kpis = [
    { to: 184, suffix: " k", delta: "+32 %" },
    { to: 3.8, decimals: 1, suffix: " %", delta: "+0,9" },
    { to: 412, delta: "+48 %" },
    { to: 47, delta: "+291 %" },
  ];

  return (
    <>
      <Layer depth={0.4} delay={0.2} className="left-[5%] right-[5%] top-[5%] md:top-[7%]">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map((k, i) => (
            <div key={c.kpis[i]} className={`rounded-2xl border border-white/10 bg-[#141724]/95 p-4 ${i < 2 ? "hidden md:block" : ""}`}>
              <p className="text-[11px] text-white/45">{c.kpis[i]}</p>
              <p className="mt-2 flex items-baseline justify-between gap-2">
                <span className="font-serif text-3xl text-white md:text-4xl">
                  <CountUp to={k.to} decimals={k.decimals} suffix={k.suffix} />
                </span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">{k.delta}</span>
              </p>
            </div>
          ))}
        </div>
      </Layer>

      <Layer depth={0.7} delay={0.4} className="bottom-[5%] left-[5%] right-[5%] top-[30%] md:right-[30%] md:top-[34%]">
        <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#141724]/95 p-5">
          <p className="flex items-center justify-between text-xs text-white/55">
            {c.chart}
            <span className="font-mono text-[10px] text-white/30">S1 → S12</span>
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
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" vectorEffect="non-scaling-stroke" />
            ))}
            <path d={`${chart} L300 120 L0 120 Z`} fill="url(#funnel-area)" />
            <path d={chart} fill="none" stroke="#4791ff" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          </motion.svg>
        </div>
      </Layer>

      <Layer depth={1.4} delay={0.7} className="right-[5%] top-[34%] hidden w-[22%] md:block">
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
              <span className="block truncate text-[11px] font-medium">{client}</span>
              <span className="block text-[10px] text-ink/45">{c.sponsored}</span>
            </span>
          </div>
          <div className="relative aspect-[4/3]">
            <Image src={projectImage(content.hero.project)} alt="" fill sizes="20vw" className="object-cover object-top" />
          </div>
          <div className="flex items-center justify-between gap-2 p-3">
            <span className="truncate font-mono text-[10px] text-ink/45">{projectDomain(content.hero.project) ?? content.hero.url}</span>
            <span className="shrink-0 rounded-md bg-brand px-2.5 py-1.5 text-[11px] font-medium text-white">{c.cta}</span>
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
            <span className="grid size-6 place-items-center rounded-full bg-emerald-400 text-[11px] text-night">✓</span>
            {c.toasts[tick % c.toasts.length]}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
