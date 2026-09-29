import type { Locale } from "@/i18n/config";
import type { RouteKey } from "@/i18n/routes";
import { Footer } from "../site/footer";
import { Navbar, type Alternates } from "../site/navbar";
import { Providers } from "../site/providers";

export function PageShell({
  lang,
  current,
  alternates,
  children,
}: {
  lang: Locale;
  current?: RouteKey;
  /** Where the language switch leads, for pages whose URL differs per locale beyond the section. */
  alternates?: Alternates;
  children: React.ReactNode;
}) {
  return (
    <Providers lang={lang}>
      <Navbar current={current} alternates={alternates} />
      <main>{children}</main>
      <Footer />
    </Providers>
  );
}
