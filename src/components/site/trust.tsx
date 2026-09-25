"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { clients } from "./content";
import { useLocale } from "./locale";

export function Trust() {
  const { t } = useLocale();
  return (
    <section className="relative bg-night pb-24 pt-10 text-white">
      <p className="eyebrow text-center text-white/40">{t.trust.eyebrow}</p>
      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-16">
          {[...clients, ...clients].map((client, i) => (
            <li key={i} aria-hidden={i >= clients.length} className="shrink-0">
              <Image
                src={client.src}
                alt={i < clients.length ? client.name : ""}
                width={client.width}
                height={client.height}
                className="h-7 w-auto max-w-[140px] object-contain opacity-50 brightness-0 invert transition-opacity hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>

      <dl className="mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 px-0 md:grid-cols-4">
        {t.trust.stats.map((stat) => (
          <div key={stat.label} className="group bg-night p-6 transition-colors hover:bg-night-soft md:p-8">
            <dd className="font-serif text-5xl leading-none md:text-6xl">
              <CountUp to={stat.value} />
              <span className="text-brand-sky">{stat.suffix}</span>
            </dd>
            <dt className="mt-3 text-sm text-white/55">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
}
