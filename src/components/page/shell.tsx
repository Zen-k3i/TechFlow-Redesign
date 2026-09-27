import type { Locale } from "@/i18n/config";
import type { RouteKey } from "@/i18n/routes";
import { Footer } from "../site/footer";
import { Navbar } from "../site/navbar";
import { Providers } from "../site/providers";

export function PageShell({ lang, current, children }: { lang: Locale; current?: RouteKey; children: React.ReactNode }) {
  return (
    <Providers lang={lang}>
      <Navbar current={current} />
      <main>{children}</main>
      <Footer />
    </Providers>
  );
}
