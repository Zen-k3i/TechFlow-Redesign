import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "../fonts/Satoshi-400.woff2", weight: "400" },
    { path: "../fonts/Satoshi-500.woff2", weight: "500" },
    { path: "../fonts/Satoshi-700.woff2", weight: "700" },
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
});

export const metadata: Metadata = {
  title: "TechFlow Agency | La Galerie — Design, développement et agents IA",
  description:
    "Une galerie de produits web qui n'existe que dans votre navigateur. Design, Développement et IA : TechFlow livre en cinq semaines ce que d'autres mettent des mois à livrer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${satoshi.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
