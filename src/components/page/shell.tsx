import type { Locale } from "@/i18n/config";
import type { RouteKey } from "@/i18n/routes";
import { breadcrumbJsonLd, JsonLd } from "../seo/json-ld";
import { SiteFooter } from "../site/site-footer";
import { Navbar, type Alternates } from "../site/navbar";
import { Providers } from "../site/providers";

export function PageShell({
  lang,
  current,
  alternates,
  footerCta = true,
  breadcrumb,
  children,
}: {
  lang: Locale;
  current?: RouteKey;
  /** Where the language switch leads, for pages whose URL differs per locale beyond the section. */
  alternates?: Alternates;
  /** Off for pages that already end on their own call to action. */
  footerCta?: boolean;
  /** The page's own breadcrumb entry under its section (detail pages: case study, tool, article). */
  breadcrumb?: { name: string; slug: string };
  children: React.ReactNode;
}) {
  return (
    <Providers lang={lang}>
      <Navbar current={current} alternates={alternates} />
      {current && current !== "home" && <JsonLd data={breadcrumbJsonLd(lang, current, breadcrumb)} />}
      <main>{children}</main>
      <SiteFooter lang={lang} cta={footerCta} />
    </Providers>
  );
}
