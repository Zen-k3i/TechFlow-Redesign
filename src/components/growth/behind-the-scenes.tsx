"use client";

import { motion } from "motion/react";
import { SanityImage, type CmsImage } from "../cms/sanity-image";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { growthCopy } from "./copy";
import { SECTION_IDS } from "./types";

type Photo = NonNullable<CmsImage> & { _key: string };

/** Perforations along a film strip, purely decorative. */
function Sprockets() {
  return <div aria-hidden className="h-4 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_3px,transparent_3.5px)] bg-size-[22px_16px] bg-repeat-x" />;
}

/**
 * Photos from the shoot as a film strip: one scrollable row, each photo at its own ratio (no
 * cropping), its alt text as the caption. Swipe on touch screens, scroll or drag on desktop.
 */
export function BehindTheScenes({ heading, intro, images }: { heading: string | null; intro: string | null; images: Photo[] }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];

  return (
    <section id={SECTION_IDS.gallery} className="relative overflow-hidden bg-night py-28 text-white md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {heading && <RevealHeading text={heading} accentClassName="italic text-(--accent)" className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl" />}
        {intro && (
          <FadeIn>
            <p className="mt-6 max-w-xl text-white/60 md:text-lg">{intro}</p>
          </FadeIn>
        )}
      </div>

      <div className="mt-14 bg-[#050608] py-3">
        <Sprockets />
        <ul
          aria-label={c.photos}
          tabIndex={0}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 py-3 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-(--accent) md:px-10"
        >
          {images.map((img, i) => {
            const d = img.asset?.metadata?.dimensions;
            const ratio = d?.width && d?.height ? d.width / d.height : 3 / 2;
            return (
              <motion.li
                key={`${img._key}-${i}`}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.06, ease }}
                className="shrink-0 snap-start"
              >
                <figure>
                  {/* Width from the photo's ratio, so the strip has its final size before the images load. */}
                  <div className="relative h-[clamp(14rem,48vh,30rem)] overflow-hidden rounded-md bg-white/5" style={{ aspectRatio: ratio }}>
                    <SanityImage image={img} fill width={1400} sizes="(min-width: 768px) 45vw, 85vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-3 text-sm text-white/55">
                    <span className="font-mono text-xs text-(--accent)">{String(i + 1).padStart(2, "0")}</span>
                    {img.alt}
                  </figcaption>
                </figure>
              </motion.li>
            );
          })}
        </ul>
        <Sprockets />
      </div>
    </section>
  );
}
