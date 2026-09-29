import type { Locale } from "@/i18n/config";
import type { INSIGHT_DETAIL_QUERY_RESULT, INSIGHTS_INDEX_QUERY_RESULT } from "@/sanity.types";

/** Articles live in Sanity (TechFlow CMS); this file only holds the interface copy. */
export type InsightCard = INSIGHTS_INDEX_QUERY_RESULT[number];
export type InsightDetail = NonNullable<INSIGHT_DETAIL_QUERY_RESULT>;

const fr = {
  meta: {
    title: "Insights sur le design, Webflow et l'IA | TechFlow",
    description: "Méthodes, livrables et retours d'expérience : ce que nous apprenons en concevant et en développant des sites et des produits web.",
  },
  badge: "Ressources",
  title: "Nos *insights.*",
  intro: "Design, Webflow, IA : ce que nous apprenons en livrant, avec les livrables, les outils et les délais réels.",
  latest: "Dernier article",
  all: "Tous les articles",
  by: "Écrit par",
  minutes: "min de lecture",
  toc: "Sommaire",
  back: "Tous les articles",
  related: "À lire aussi",
  services: { eyebrow: "Services", heading: "Quel service pouvons-nous *vous apporter ?*" },
};

const en: typeof fr = {
  meta: {
    title: "Insights on Design, Webflow & AI | TechFlow",
    description: "Methods, deliverables and lessons learned: what we learn designing and building websites and web products.",
  },
  badge: "Insights",
  title: "Our *insights.*",
  intro: "Design, Webflow, AI: what we learn by shipping, with the real deliverables, tools and timelines.",
  latest: "Latest article",
  all: "All articles",
  by: "Written by",
  minutes: "min read",
  toc: "Contents",
  back: "All articles",
  related: "Read next",
  services: { eyebrow: "Services", heading: "How can we *help you?*" },
};

export const insightsContent: Record<Locale, typeof fr> = { fr, en };
