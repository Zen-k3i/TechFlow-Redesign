"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { href } from "@/i18n/routes";
import { OfficeMap } from "../page/office-map";
import { ButtonLink, PageHero, SectionHeader } from "../page/ui";
import { useLocale } from "../site/locale";
import { Magnetic } from "../site/magnetic";
import { FadeIn, RevealHeading } from "../site/reveal";
import { members, offices } from "../team/data";
import { LocalTime } from "../team/team-page";
import { contactContent } from "./data";

const founder = members[0];

export function ContactPage() {
  const { lang, t } = useLocale();
  const c = contactContent[lang];

  return (
    <>
      <PageHero
        badge={c.badge}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: t.nav.pages.contact, href: href(lang, "contact") }]}
        aside={<FounderCard />}
      />
      <BriefForm />

      <section className="bg-night px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={c.offices.eyebrow}
            title={c.offices.heading}
            intro={c.offices.intro}
          />
          <FadeIn className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-white/10 bg-night-soft p-6 md:p-10">
            <OfficeMap />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {offices.map((o) => (
                <div
                  key={o.city}
                  className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="whitespace-nowrap font-serif text-3xl md:text-4xl">
                      {o.city}
                    </p>
                    <div className="shrink-0 text-right">
                      <p className="eyebrow whitespace-nowrap text-white/55">
                        {c.offices.localTime}
                      </p>
                      <LocalTime timeZone={o.timeZone} lang={lang} />
                    </div>
                  </div>
                  <address className="mb-8 mt-6 not-italic leading-relaxed text-white/60">
                    {o.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={`tel:${o.phone.replace("(0)", "").replace(/[^\d+]/g, "")}`}
                    className="mt-auto inline-flex items-center justify-between gap-3 rounded-full border border-white/15 py-2 pl-5 pr-2 transition-colors hover:border-white"
                  >
                    <span>
                      <span className="text-white/55">{c.offices.call} · </span>
                      {o.phone}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
                      ↗
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function FounderCard() {
  const { lang, links } = useLocale();
  const c = contactContent[lang];
  return (
    <div className="relative mx-auto max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-night-soft/80 p-3 backdrop-blur">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
        <Image
          src={founder.photo}
          alt={founder.name}
          fill
          sizes="(min-width: 1024px) 28rem, 100vw"
          preload
          className="object-cover object-[50%_25%]"
        />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-night/70 px-3 py-1.5 text-xs text-white backdrop-blur">
          {c.person.availability}
        </span>
      </div>
      <div className="p-5">
        <p className="font-serif text-3xl">{founder.name}</p>
        <p className="text-sm text-white/55">{founder.role}</p>
        <div className="mt-6">
          <Magnetic>
            <ButtonLink
              href={links.booking}
              external
              className="w-full justify-between"
            >
              {c.person.book}
            </ButtonLink>
          </Magnetic>
        </div>
        <p className="mt-4 text-center text-sm text-white/55">
          {c.person.or}{" "}
          {/* No email address on the page (spam bots): the form sends through Resend. */}
          <a href="#brief-form" className="text-white underline-offset-4 hover:underline">
            {c.person.formLink}
          </a>
        </p>
      </div>
    </div>
  );
}

function Chips({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink/70">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(o)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                on
                  ? "border-brand-deep bg-brand-deep text-white"
                  : "border-ink/15 text-ink/70 hover:border-ink/40"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const field =
  "mt-2 w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-brand-deep focus:ring-4 focus:ring-brand-deep/10";

function BriefForm() {
  const { lang, links } = useLocale();
  const c = contactContent[lang];
  const f = c.form;
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const toggle = (value: string) =>
    setServices((s) =>
      s.includes(value) ? s.filter((v) => v !== value) : [...s, value],
    );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          name: get("name"),
          email: get("email"),
          company: get("company"),
          website: get("website"),
          services,
          timeline,
          message: get("message"),
          consent: data.get("consent") === "on",
          fax: get("fax"),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setServices([]);
      setTimeline("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-night px-5 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-14 rounded-[2.5rem] bg-paper px-6 py-16 text-ink md:rounded-[3.5rem] md:px-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-brand-deep">{f.eyebrow}</p>
          <RevealHeading
            text={f.heading}
            accentClassName="italic text-brand-deep"
            className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl"
          />
          <ul className="mt-12 space-y-6">
            {f.promises.map((p, i) => (
              <FadeIn as="li" key={p.title} delay={i * 0.08} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-deep/10 font-serif text-lg text-brand-deep">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-medium">{p.title}</span>
                  <span className="mt-1 block text-ink/60">{p.text}</span>
                </span>
              </FadeIn>
            ))}
          </ul>
        </div>

        <FadeIn>
          <form
            id="brief-form"
            onSubmit={onSubmit}
            className="space-y-7 rounded-[2rem] border border-ink/10 bg-white/60 p-6 md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-ink/70">
                {f.name} *
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className={field}
                />
              </label>
              <label className="block text-sm font-medium text-ink/70">
                {f.email} *
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={field}
                />
              </label>
              <label className="block text-sm font-medium text-ink/70">
                {f.company}
                <input
                  name="company"
                  autoComplete="organization"
                  className={field}
                />
              </label>
              <label className="block text-sm font-medium text-ink/70">
                {f.website}
                <input
                  name="website"
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                  className={field}
                />
              </label>
            </div>
            <Chips
              legend={f.services}
              options={f.serviceOptions}
              selected={services}
              onToggle={toggle}
            />

            <Chips
              legend={f.timeline}
              options={f.timelineOptions}
              selected={[timeline]}
              onToggle={(v) => setTimeline(timeline === v ? "" : v)}
            />
            <label className="block text-sm font-medium text-ink/70">
              {f.message} *
              <textarea
                name="message"
                required
                rows={5}
                placeholder={f.messagePlaceholder}
                className={`${field} resize-y`}
              />
            </label>
            {/* Honeypot: hidden from people, filled by bots. */}
            <input type="text" name="fax" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <label className="flex items-start gap-3 text-sm text-ink/70">
              <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-brand-deep" />
              <span>
                {f.consent}{" "}
                <Link href={links.privacy} className="underline underline-offset-2 hover:text-ink">
                  {f.privacy}
                </Link>
                .
              </span>
            </label>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex h-14 items-center gap-3 self-start rounded-full bg-ink pl-7 pr-2 font-medium text-paper transition-colors hover:bg-brand disabled:opacity-60"
              >
                {f.submit}
                <span className="flex size-10 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:-rotate-45">
                  →
                </span>
              </button>
              <p className="text-sm text-ink/60" aria-live="polite">
                {{ idle: f.note, sending: f.sending, sent: f.sent, error: f.error }[status]}
              </p>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
