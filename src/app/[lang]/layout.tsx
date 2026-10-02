import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { siteUrl } from "@/i18n/routes";
import { getSiteSettings } from "@/sanity/seo";
import "../globals.css";

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "../../fonts/Satoshi-400.woff2", weight: "400" },
    { path: "../../fonts/Satoshi-500.woff2", weight: "500" },
    { path: "../../fonts/Satoshi-700.woff2", weight: "700" },
  ],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  // Only small labels use it: not worth competing with the hero text and images on first load.
  preload: false,
});

// No `dynamicParams = false` here: Next applies it to every child route, which would 404
// CMS slugs published after the build. Unknown locales are rejected in the layout below.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const { meta } = lang === "en" ? en : fr;
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: settings?.siteName || "TechFlow",
    // Search Console "HTML tag" verification, from Site settings in the Studio.
    verification: settings?.googleVerification ? { google: settings.googleVerification } : undefined,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${satoshi.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
