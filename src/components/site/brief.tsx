"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ease } from "./content";
import { useLocale } from "./locale";
import { Magnetic } from "./magnetic";
import { RevealHeading } from "./reveal";

function estimate(picked: string[]) {
  if (picked.length === 0) return null;
  const hasDev = picked.includes("developpement");
  const hasSystem = picked.includes("agents-ia") || picked.includes("tunnel-de-vente");
  if (hasDev && hasSystem) return "full";
  if (!hasSystem) return "site";
  return "custom";
}

export function Brief() {
  const { t, links } = useLocale();
  const b = t.brief;
  const services = t.services.items;
  const [picked, setPicked] = useState<string[]>(["design", "developpement"]);
  const [goal, setGoal] = useState(1);
  const [timing, setTiming] = useState(0);
  const [copied, setCopied] = useState(false);
  const kind = estimate(picked);
  const result = kind && b.estimates[kind];
  const pickedTitles = services.filter((s) => picked.includes(s.id)).map((s) => s.title);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : services.map((s) => s.id).filter((x) => p.includes(x) || x === id)));

  const summary = [
    `${b.goal.label}${b.colon}${b.goals[goal]}`,
    `${b.services}${b.colon}${pickedTitles.join(", ") || b.tbd}`,
    `${b.timing.label}${b.colon}${b.timings[timing]}`,
    result ? `${b.estimate}${b.colon}${result.value}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const copy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="brief" className="relative rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-brand-deep">{b.eyebrow}</p>
        <RevealHeading
          text={b.heading}
          accentClassName="italic text-brand-deep"
          className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="space-y-12">
            <Question index={1} title={b.needs.title} hint={b.needs.hint}>
              {services.map((s) => (
                <Chip key={s.id} active={picked.includes(s.id)} onClick={() => toggle(s.id)} multi>
                  {s.title}
                </Chip>
              ))}
            </Question>
            <Question index={2} title={b.goal.title}>
              {b.goals.map((g, i) => (
                <Chip key={g} active={goal === i} onClick={() => setGoal(i)}>
                  {g}
                </Chip>
              ))}
            </Question>
            <Question index={3} title={b.timing.title}>
              {b.timings.map((label, i) => (
                <Chip key={label} active={timing === i} onClick={() => setTiming(i)}>
                  {label}
                </Chip>
              ))}
            </Question>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[2rem] bg-night p-8 text-white shadow-[0_40px_100px_-30px_rgba(54,71,245,0.6)] md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/30 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-white/50">{b.card}</p>
                  <span className="flex items-center gap-2 text-xs text-white/60">
                    <span className="size-2 rounded-full bg-emerald-400" /> {b.live}
                  </span>
                </div>

                <p className="mt-8 eyebrow text-white/40">{b.estimate}</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={result?.value ?? "none"}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease }}
                    className="mt-2 font-serif text-5xl leading-none text-brand-sky md:text-6xl"
                  >
                    {result?.value ?? "—"}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-2 text-sm text-white/50">
                  {result?.note ?? b.empty}
                </p>

                <dl className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm">
                  <Row label={b.goal.label} value={b.goals[goal]} />
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-white/45">{b.services}</dt>
                    <dd className="flex flex-wrap justify-end gap-1.5">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {pickedTitles.map((p) => (
                          <motion.span
                            key={p}
                            layout
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="rounded-full bg-white/10 px-2.5 py-0.5"
                          >
                            {p}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                      {picked.length === 0 && <span className="text-white/35">{b.tbd}</span>}
                    </dd>
                  </div>
                  <Row label={b.timing.label} value={b.timings[timing]} />
                  <Row label={b.start.label} value={b.start.value} />
                </dl>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Magnetic strength={0.2} className="flex-1">
                    <a
                      href={links.booking}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-white px-6 font-medium text-night transition-colors hover:bg-brand-sky hover:text-white"
                    >
                      {b.book}
                    </a>
                  </Magnetic>
                  <button
                    type="button"
                    onClick={copy}
                    className="h-13 rounded-full border border-white/20 px-6 text-sm transition-colors hover:border-white"
                  >
                    {copied ? b.copied : b.copy}
                  </button>
                </div>
                <p className="mt-4 text-xs text-white/40">
                  {b.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Question({
  index,
  title,
  hint,
  children,
}: {
  index: number;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="flex items-baseline gap-3">
        <span className="eyebrow text-brand-deep">0{index}</span>
        <span className="text-2xl font-medium md:text-3xl">{title}</span>
      </legend>
      {hint && <p className="mt-1 pl-9 text-sm text-ink/50">{hint}</p>}
      <div className="mt-5 flex flex-wrap gap-2.5">{children}</div>
    </fieldset>
  );
}

function Chip({
  active,
  onClick,
  multi,
  children,
}: {
  active: boolean;
  onClick: () => void;
  multi?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 rounded-full border px-5 py-3 text-[15px] transition-colors ${
        active ? "border-brand-deep bg-brand-deep text-white" : "border-ink/15 bg-white hover:border-ink/40"
      }`}
    >
      {multi && (
        <span
          className={`flex size-4 items-center justify-center rounded-full border text-[10px] ${
            active ? "border-white bg-white text-brand-deep" : "border-ink/30"
          }`}
        >
          {active && "✓"}
        </span>
      )}
      {children}
    </motion.button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-white/45">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}
