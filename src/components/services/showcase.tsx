"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValueEvent, useScroll } from "motion/react";
import type { ServiceKey } from "@/i18n/routes";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { RevealHeading } from "../site/reveal";
import type { ServiceContent } from "./data";
import { pad } from "./editorial";

type Card = ServiceContent["hero"]["card"];

export function ServiceShowcase({ service, card }: { service: ServiceKey; card: Card }) {
  if (service === "design") return <DesignShowcase />;
  if (service === "development") return <BeforeAfter card={card} />;
  if (service === "aiAgents") return <AgentLive />;
  return <FunnelLive card={card} />;
}

/* ------------------------------------------------------------------ Design */

const designCopy = {
  fr: {
    eyebrow: "Du brief au pixel",
    heading: "Voyez un design *prendre forme.*",
    project: "Little Green Spark",
    stages: [
      { label: "Arborescence", text: "Chaque page et chaque section, validées avant le moindre visuel.", src: "/images/showcase/little-green-spark-sitemap.webp", contain: true },
      { label: "Wireframes", text: "La structure desktop et mobile, sans couleur ni distraction.", src: "/images/showcase/little-green-spark-wireframe.webp", contain: true },
      { label: "Maquettes Figma", text: "L'identité appliquée écran par écran, avec son design system.", src: "/images/showcase/little-green-spark-design.webp", contain: false },
      { label: "Site en ligne", text: "Intégré au pixel près dans Webflow, prêt à convertir.", src: "/images/previews/little-green-spark-1.webp", contain: false },
    ],
  },
  en: {
    eyebrow: "From brief to pixel",
    heading: "Watch a design *take shape.*",
    project: "Little Green Spark",
    stages: [
      { label: "Sitemap", text: "Every page and section, approved before a single visual.", src: "/images/showcase/little-green-spark-sitemap.webp", contain: true },
      { label: "Wireframes", text: "Desktop and mobile structure, with no color or distraction.", src: "/images/showcase/little-green-spark-wireframe.webp", contain: true },
      { label: "Figma design", text: "The identity applied screen by screen, with its design system.", src: "/images/showcase/little-green-spark-design.webp", contain: false },
      { label: "Live website", text: "Built pixel-perfect in Webflow, ready to convert.", src: "/images/previews/little-green-spark-1.webp", contain: false },
    ],
  },
};

function DesignShowcase() {
  const { lang } = useLocale();
  const c = designCopy[lang];
  const n = c.stages.length;
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / n) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative rounded-[2.5rem] bg-paper text-ink md:rounded-[4rem]" style={{ height: `${n * 75 + 25}vh` }}>
      <div className="sticky top-0 flex min-h-svh items-center px-5 py-24 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow text-brand-deep">{c.eyebrow}</p>
            <RevealHeading text={c.heading} accentClassName="italic text-brand-deep" className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl" />
            <ol className="mt-10 space-y-1">
              {c.stages.map((s, i) => (
                <li key={s.label}>
                  <button type="button" onClick={() => goTo(i)} className="group flex w-full items-baseline gap-4 py-2 text-left">
                    <span className={`font-mono text-xs transition-colors ${i === active ? "text-brand-deep" : "text-ink/60"}`}>{pad(i + 1)}</span>
                    <span className={`font-serif text-3xl leading-tight transition-colors duration-500 md:text-4xl ${i === active ? "text-ink" : "text-ink/55 group-hover:text-ink/75"}`}>
                      {s.label}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-6 h-px w-full bg-ink/10">
              <motion.div className="h-px origin-left bg-brand-deep" style={{ scaleX: scrollYProgress }} />
            </div>
            <motion.p key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="mt-6 max-w-sm text-ink/60">
              {c.stages[active].text}
            </motion.p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_50px_100px_-40px_rgba(16,18,28,0.45)] ring-1 ring-ink/10">
              <div className="flex items-center gap-1.5 border-b border-ink/10 px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="mx-auto font-mono text-[11px] text-ink/60">
                  {c.project} · {c.stages[active].label}
                </span>
                <span className="w-10" />
              </div>
              <div className="relative aspect-[16/10] bg-[#ececea]">
                {c.stages.map((s, i) => (
                  <Image
                    key={s.src}
                    src={s.src}
                    alt={`${c.project} · ${s.label}`}
                    fill
                    sizes={s.contain ? "(min-width: 1024px) 30vw, 50vw" : "(min-width: 1024px) 50vw, 88vw"}
                    className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${s.contain ? "object-contain p-6" : "object-cover object-top"} ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="absolute -right-3 -top-3 flex size-20 items-center justify-center rounded-full bg-brand-deep font-serif text-3xl text-white shadow-xl md:-right-6 md:-top-6 md:size-24 md:text-4xl">
              {pad(active + 1)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Development */

const devCopy = {
  fr: {
    eyebrow: "Avant / Après",
    heading: "Glissez pour voir la *différence.*",
    intro: "Trois refontes livrées par l'équipe : même entreprise, nouveau site, rapide et administrable.",
    before: "Avant",
    after: "Après",
    drag: "Déplacer le curseur pour comparer",
  },
  en: {
    eyebrow: "Before / After",
    heading: "Slide to see the *difference.*",
    intro: "Three redesigns shipped by the team: same company, new website, fast and easy to manage.",
    before: "Before",
    after: "After",
    drag: "Move the slider to compare",
  },
};

const redesigns = [
  { name: "Exelmans", slug: "exelmans" },
  { name: "Tandem Partners", slug: "tandem-partners" },
  { name: "AMA Campus", slug: "ama-campus" },
];

function BeforeAfter({ card }: { card: Card }) {
  const { lang } = useLocale();
  const c = devCopy[lang];
  const [pos, setPos] = useState(50);
  const [current, setCurrent] = useState(0);
  const project = redesigns[current];

  return (
    <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-brand-sky">{c.eyebrow}</p>
            <RevealHeading text={c.heading} className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl" />
            <p className="mt-6 max-w-lg text-white/55">{c.intro}</p>
          </div>
          <div role="tablist" className="flex flex-wrap gap-2">
            {redesigns.map((r, i) => (
              <button
                key={r.slug}
                role="tab"
                aria-selected={i === current}
                type="button"
                onClick={() => {
                  setCurrent(i);
                  setPos(50);
                }}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${i === current ? "border-white bg-white text-night" : "border-white/15 text-white/70 hover:border-white/40"}`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div
          className="relative mt-12 aspect-[16/10] cursor-ew-resize select-none overflow-hidden rounded-[2rem] bg-night-soft ring-1 ring-white/10 md:aspect-[16/9]"
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse" && e.buttons === 0) return;
            const r = e.currentTarget.getBoundingClientRect();
            setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
          }}
        >
          <Image key={`${project.slug}-a`} src={`/images/showcase/${project.slug}-after.webp`} alt={`${project.name} · ${c.after}`} fill sizes="(min-width: 1280px) 80rem, 100vw" className="object-cover object-top" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image key={`${project.slug}-b`} src={`/images/showcase/${project.slug}-before.webp`} alt={`${project.name} · ${c.before}`} fill sizes="(min-width: 1280px) 80rem, 100vw" className="object-cover object-top grayscale-[35%]" />
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-night/80 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-white backdrop-blur">{c.before}</span>
          <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-white">{c.after}</span>
          <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]" style={{ left: `${pos}%` }}>
            <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-lg text-night shadow-xl">⇆</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={c.drag}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {card.rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between rounded-2xl border border-white/10 px-6 py-5">
              <dt className="flex items-center gap-2 font-mono text-sm text-white/60">
                <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                {row.label}
              </dt>
              <dd className="font-serif text-3xl text-emerald-300">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-white/55">{card.title}</p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- AI agents */

const agentCopy = {
  fr: {
    eyebrow: "Démonstration",
    heading: "Pendant que vous dormez, *l'agent travaille.*",
    inbox: "Boîte de réception",
    agent: "Agent IA",
    crm: "CRM",
    done: "tâches traitées cette nuit",
    live: "En direct · simulation",
    steps: ["Lecture de l'e-mail", "Qualification de la demande", "Mise à jour de la fiche CRM", "Réponse envoyée"],
    mails: [
      { from: "Claire · Atelier Norma", subject: "Demande de devis pour un site vitrine", tag: "Lead chaud", action: "Relance planifiée J+2" },
      { from: "Hugo · Cabinet Lemaire", subject: "Facture de septembre en attente", tag: "Comptabilité", action: "Transmis à la compta" },
      { from: "Sara · Groupe Veyra", subject: "Rendez-vous pour une démo ?", tag: "Rendez-vous", action: "Créneau proposé jeudi 10 h" },
    ],
  },
  en: {
    eyebrow: "Demo",
    heading: "While you sleep, *the agent works.*",
    inbox: "Inbox",
    agent: "AI agent",
    crm: "CRM",
    done: "tasks handled overnight",
    live: "Live · simulation",
    steps: ["Reading the email", "Qualifying the request", "Updating the CRM record", "Reply sent"],
    mails: [
      { from: "Claire · Atelier Norma", subject: "Quote request for a showcase website", tag: "Hot lead", action: "Follow-up scheduled D+2" },
      { from: "Hugo · Cabinet Lemaire", subject: "September invoice pending", tag: "Accounting", action: "Forwarded to accounting" },
      { from: "Sara · Groupe Veyra", subject: "Book a demo call?", tag: "Meeting", action: "Slot offered Thursday 10am" },
    ],
  },
};

function AgentLive() {
  const { lang } = useLocale();
  const c = agentCopy[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [tick, setTick] = useState(0);
  const cycle = c.steps.length + 1;

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, [inView]);

  const round = Math.floor(tick / cycle);
  const phase = tick % cycle;
  const mail = c.mails[round % c.mails.length];
  const log = Array.from({ length: Math.min(round, 4) }, (_, i) => c.mails[(round - 1 - i) % c.mails.length]);

  return (
    <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-brand-sky">{c.eyebrow}</p>
            <RevealHeading text={c.heading} className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl" />
          </div>
          <p className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> {c.live}
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <Panel title={c.inbox} index={1}>
            <motion.div key={round} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease }} className="rounded-2xl bg-white p-5 text-ink">
              <p className="flex items-center justify-between text-xs text-ink/60">
                <span>{mail.from}</span>
                <span className="size-2 rounded-full bg-brand-deep" />
              </p>
              <p className="mt-2 font-medium">{mail.subject}</p>
              <div className="mt-4 space-y-1.5">
                <span className="block h-1.5 w-full rounded-full bg-ink/10" />
                <span className="block h-1.5 w-4/5 rounded-full bg-ink/10" />
                <span className="block h-1.5 w-3/5 rounded-full bg-ink/10" />
              </div>
            </motion.div>
          </Panel>

          <Panel title={c.agent} index={2} glow>
            <ul className="space-y-2.5">
              {c.steps.map((s, i) => {
                const state = i < phase ? "done" : i === phase ? "run" : "idle";
                return (
                  <li key={s} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors duration-300 ${state === "idle" ? "border-white/5 text-white/30" : "border-white/15 text-white"}`}>
                    <span className={`flex size-5 items-center justify-center rounded-full text-[10px] ${state === "done" ? "bg-emerald-400 text-night" : state === "run" ? "border-2 border-brand-sky border-t-transparent animate-spin" : "border border-white/20"}`}>
                      {state === "done" ? "✓" : ""}
                    </span>
                    {s}
                    {i === 1 && state === "done" && <span className="ml-auto rounded-full bg-brand/30 px-2 py-0.5 text-[11px] text-brand-sky">{mail.tag}</span>}
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title={c.crm} index={3}>
            <ul className="space-y-2">
              {log.length === 0 && <li className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-white/30">…</li>}
              {log.map((m, i) => (
                <motion.li key={`${round}-${i}`} initial={i === 0 ? { opacity: 0, y: -10 } : false} animate={{ opacity: 1 - i * 0.2, y: 0 }} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] px-4 py-3 text-sm">
                  <span className="truncate">{m.from.split(" · ")[1]}</span>
                  <span className="shrink-0 text-xs text-emerald-300">{m.action}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 flex items-baseline gap-2 border-t border-white/10 pt-5">
              <span className="font-serif text-5xl text-brand-sky">{128 + round}</span>
              <span className="text-sm text-white/50">{c.done}</span>
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, index, glow = false, children }: { title: string; index: number; glow?: boolean; children: React.ReactNode }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border p-6 ${glow ? "border-brand/50 bg-linear-to-b from-brand/15 to-night-soft" : "border-white/10 bg-night-soft"}`}>
      <p className="mb-5 flex items-center justify-between">
        <span className="eyebrow text-white/50">{title}</span>
        <span className="font-mono text-xs text-white/30">{pad(index)}</span>
      </p>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- Sales funnel */

const funnelCopy = {
  fr: {
    eyebrow: "Le tunnel en mouvement",
    heading: "Chaque clic suivi jusqu'au *rendez-vous.*",
    note: "Exemple illustratif pour 100 visiteurs issus des publicités.",
    rate: "conversion",
  },
  en: {
    eyebrow: "The funnel in motion",
    heading: "Every click tracked to the *meeting.*",
    note: "Illustrative example for 100 visitors coming from ads.",
    rate: "conversion",
  },
};

function Counter({ to, run }: { to: number; run: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!run || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => (node.textContent = String(Math.round(v))) });
    return () => controls.stop();
  }, [run, to]);
  return <span ref={ref}>0</span>;
}

function FunnelLive({ card }: { card: Card }) {
  const { lang } = useLocale();
  const c = funnelCopy[lang];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const rows = card.rows.map((r) => ({ label: r.label, value: Number(r.value) }));

  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div ref={ref} className="mx-auto max-w-7xl">
        <p className="eyebrow text-brand-deep">{c.eyebrow}</p>
        <RevealHeading text={c.heading} accentClassName="italic text-brand-deep" className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl" />

        <ol className="mt-16 space-y-3">
          {rows.map((r, i) => (
            <li key={r.label} className="grid items-center gap-3 md:grid-cols-[12rem_1fr_7rem]">
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-ink/60">{pad(i + 1)}</span>
                <span className="font-serif text-2xl">{r.label}</span>
              </span>
              <div className="relative h-16 overflow-hidden rounded-2xl bg-ink/5">
                <div
                  style={{ width: inView ? `${r.value}%` : 0, transitionDelay: `${i * 150}ms` }}
                  className="relative h-full overflow-hidden rounded-2xl bg-linear-to-r from-brand-deep to-brand-sky transition-[width] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  {[0, 1, 2, 3].map((d) => (
                    <span
                      key={d}
                      aria-hidden
                      style={{ animationDelay: `${d * 0.55 + i * 0.2}s` }}
                      className="absolute -left-[5%] top-1/2 size-2 -translate-y-1/2 animate-flow rounded-full bg-white/80"
                    />
                  ))}
                </div>
              </div>
              <span className="flex items-baseline justify-end gap-2">
                <span className="font-serif text-4xl">
                  <Counter to={r.value} run={inView} />
                </span>
                {i > 0 && (
                  <span className="text-xs text-ink/60">
                    {Math.round((r.value / rows[i - 1].value) * 100)}%
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-8 flex items-center gap-2 text-sm text-ink/50">
          <span className="size-1.5 rounded-full bg-brand-deep" /> {c.note}
        </p>
      </div>
    </section>
  );
}
