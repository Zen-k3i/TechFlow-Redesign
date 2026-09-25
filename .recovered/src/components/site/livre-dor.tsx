import Image from "next/image";
import { testimonials, type Testimonial } from "./content";

const rowA = testimonials.slice(0, 5);
const rowB = testimonials.slice(5);

export function LivreDor() {
  return (
    <section id="livre-dor" className="grain relative overflow-hidden bg-sand py-28 text-ink">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="label text-ink/50">Salle V — Livre d&apos;or</p>
        <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="font-serif text-5xl leading-none md:text-8xl">
            Ils l&apos;ont fait <em className="text-brand-deep">avant vous.</em>
          </h2>
          <p className="max-w-xs text-ink/60">Les mots sont d&apos;eux. Nous les publions sans les retoucher.</p>
        </div>
      </div>

      <div className="mt-16 space-y-6 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <Row items={rowA} className="animate-marquee" />
        <Row items={rowB} className="animate-marquee-reverse" />
      </div>
    </section>
  );
}

function Row({ items, className }: { items: Testimonial[]; className: string }) {
  return (
    <ul className={`flex w-max gap-6 hover:[animation-play-state:paused] ${className}`}>
      {[...items, ...items].map((t, i) => (
        <li key={i} aria-hidden={i >= items.length} className="w-[22rem] shrink-0 md:w-[26rem]">
          <figure className="flex h-full flex-col justify-between gap-8 rounded-sm border border-ink/10 bg-cream p-7 shadow-[0_1px_0_rgba(22,27,80,0.06)]">
            <blockquote className="font-serif text-2xl leading-snug text-ink/90">“{t.quote}”</blockquote>
            <figcaption className="flex items-center gap-3 border-t border-dashed border-ink/20 pt-5">
              {t.photo ? (
                <Image src={t.photo} alt="" width={44} height={44} className="size-11 rounded-full object-cover grayscale" />
              ) : (
                <span className="flex size-11 items-center justify-center rounded-full bg-ink font-serif text-lg text-cream">
                  {t.name[0]}
                </span>
              )}
              <span>
                <span className="block font-medium">{t.name}</span>
                <span className="label block text-ink/50">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
