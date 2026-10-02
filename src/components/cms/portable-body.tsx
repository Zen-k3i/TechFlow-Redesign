import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { slugify } from "../page/slugify";
import { SanityImage, type CmsImage } from "./sanity-image";

type TableValue = { rows?: { _key: string; cells?: string[] }[] };
type ImageGroupValue = { images?: (CmsImage & { _key: string })[] | null };
/** A Portable Text body as returned by GROQ (generated types are stricter than PortableTextBlock). */
export type BodyValue = ReadonlyArray<{ _type: string; _key: string }>;

const text = (block: object) =>
  ((block as { children?: { text?: string }[] }).children)?.map((c) => c.text ?? "").join("") ?? "";

/** Only these link schemes (or relative paths) reach an href; anything else renders as plain text. */
export const safeHref = (url: string | null | undefined) =>
  url && (/^(https?:|mailto:|tel:)/i.test(url) || /^[/#?]/.test(url)) ? url : undefined;

/** The article's h2 headings, for a table of contents that links to them. Repeated titles get -2, -3… ids. */
export const headingsOf = (body: BodyValue | null | undefined) => {
  const seen = new Map<string, number>();
  return (body ?? []).flatMap((b) => {
    if (b._type !== "block" || (b as { style?: string }).style !== "h2") return [];
    const title = text(b);
    const base = slugify(title) || "section";
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return [{ key: b._key, id: n === 1 ? base : `${base}-${n}`, title }];
  });
};

/**
 * Type scales: `story` for case study chapters, `article` for long reads (insights),
 * with a larger body size, longer line height and more air around headings.
 */
const scales = {
  story: {
    h2: "mt-16 font-serif text-4xl leading-[1.05] md:text-5xl",
    h3: "mt-10 text-xl font-semibold",
    h4: "mt-8 text-lg font-semibold",
    text: "text-lg leading-relaxed text-ink/75",
    gap: "mt-5",
    figure: "mt-10",
    table: "mt-8",
  },
  article: {
    h2: "mt-20 font-serif text-[2rem] leading-[1.08] tracking-[-0.01em] md:text-[2.6rem]",
    h3: "mt-12 text-[1.3rem] font-semibold leading-snug md:text-[1.45rem]",
    h4: "mt-10 text-lg font-semibold",
    text: "text-[1.125rem] leading-[1.8] text-ink/80 md:text-[1.1875rem]",
    gap: "mt-6",
    figure: "my-14",
    table: "my-12",
  },
};

/** Rich text from the CMS, styled for insight articles and case studies alike. */
export function PortableBody({ value, scale = "story" }: { value: BodyValue | null | undefined; scale?: keyof typeof scales }) {
  if (!value?.length) return null;
  const headingIds = new Map(headingsOf(value).map((h) => [h.key, h.id]));
  const s = scales[scale];

  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value: block }) => (
        <h2
          id={block._key ? headingIds.get(block._key) : undefined}
          className={`${s.h2} scroll-mt-28 first:mt-0`}
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className={s.h3}>{children}</h3>
      ),
      h4: ({ children }) => <h4 className={s.h4}>{children}</h4>,
      normal: ({ children }) => (
        <p className={`${s.gap} ${s.text}`}>{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="mt-8 border-l-2 border-brand-deep pl-6 font-serif text-2xl leading-snug">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`${s.gap} list-disc space-y-3 pl-6 marker:text-brand-deep ${s.text}`}>{children}</ul>
      ),
      number: ({ children }) => (
        <ol className={`${s.gap} list-decimal space-y-3 pl-6 marker:font-semibold marker:text-brand-deep ${s.text}`}>{children}</ol>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      link: ({ children, value: link }) => {
        const url = safeHref(link?.href);
        if (!url) return <>{children}</>;
        const external = /^https?:/i.test(url);
        return (
          <a
            href={url}
            target={link?.blank || external ? "_blank" : undefined}
            rel={link?.blank || external ? "noreferrer" : undefined}
            className="font-medium text-brand-deep underline decoration-brand-deep/30 underline-offset-4 hover:decoration-brand-deep"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value: img }) => (
        <figure className={s.figure}>
          <SanityImage image={img} sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full rounded-2xl border border-ink/10" />
          {img.caption && <figcaption className="mt-3 text-center text-sm text-ink/60">{img.caption}</figcaption>}
        </figure>
      ),
      // As on the old site: with an odd count the first image spans the width, the rest go two by two.
      imageGroup: ({ value: group }: { value: ImageGroupValue }) => {
        const images = (group.images ?? []).filter((img) => img?.asset);
        const lead = images.length % 2;
        return (
          <div className={`${s.figure} grid items-start gap-3 sm:grid-cols-2`}>
            {images.map((img, i) => (
              <SanityImage
                key={`${img._key}-${i}`}
                image={img}
                sizes={i < lead ? "(min-width: 768px) 720px, 100vw" : "(min-width: 768px) 360px, (min-width: 640px) 50vw, 100vw"}
                className={`h-auto w-full rounded-2xl ${i < lead ? "sm:col-span-2" : ""}`}
              />
            ))}
          </div>
        );
      },
      table: ({ value: table }: { value: TableValue }) => {
        const [head, ...rows] = table.rows ?? [];
        if (!head) return null;
        return (
          <div className={`${s.table} overflow-x-auto rounded-3xl border border-ink/10 bg-white`}>
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="bg-ink text-paper">
                  {head.cells?.map((cell, i) => (
                    <th key={i} scope="col" className="p-4 text-sm font-medium md:p-5">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row._key} className="border-t border-ink/10">
                    {row.cells?.map((cell, i) => (
                      <td key={i} className={`p-4 md:p-5 ${i === 0 ? "font-medium" : "text-ink/65"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
    },
  };

  return <PortableText value={value as unknown as PortableTextBlock[]} components={components} />;
}
