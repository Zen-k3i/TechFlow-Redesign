import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { slugify } from "../page/slugify";
import { SanityImage } from "./sanity-image";

type TableValue = { rows?: { _key: string; cells?: string[] }[] };
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

/** Rich text from the CMS, styled for insight articles and case studies alike. */
export function PortableBody({ value }: { value: BodyValue | null | undefined }) {
  if (!value?.length) return null;
  const headingIds = new Map(headingsOf(value).map((h) => [h.key, h.id]));

  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value: block }) => (
        <h2
          id={block._key ? headingIds.get(block._key) : undefined}
          className="mt-16 scroll-mt-28 font-serif text-4xl leading-[1.05] first:mt-0 md:text-5xl"
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-10 text-xl font-semibold">{children}</h3>
      ),
      h4: ({ children }) => <h4 className="mt-8 text-lg font-semibold">{children}</h4>,
      normal: ({ children }) => (
        <p className="mt-5 text-lg leading-relaxed text-ink/75">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="mt-8 border-l-2 border-brand-deep pl-6 font-serif text-2xl leading-snug">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-relaxed text-ink/75 marker:text-brand-deep">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-relaxed text-ink/75">{children}</ol>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
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
        <figure className="mt-10">
          <SanityImage image={img} sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full rounded-2xl" />
          {img.caption && <figcaption className="mt-3 text-sm text-ink/50">{img.caption}</figcaption>}
        </figure>
      ),
      table: ({ value: table }: { value: TableValue }) => {
        const [head, ...rows] = table.rows ?? [];
        if (!head) return null;
        return (
          <div className="mt-8 overflow-x-auto rounded-3xl border border-ink/10 bg-white">
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
