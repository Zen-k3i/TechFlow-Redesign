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
  filters: {
    search: "Rechercher un article",
    all: "Toutes",
    label: "Filtrer par catégorie",
    empty: "Aucun article ne correspond à votre recherche.",
    reset: "Réinitialiser les filtres",
    count: (n: number) => `${n} article${n > 1 ? "s" : ""}`,
  },
  by: "Écrit par",
  backToList: "Retour à la liste",
  published: "Publié le",
  reading: "Lecture",
  minutes: "min de lecture",
  share: "Partager",
  copy: "Copier le lien",
  copied: "Lien copié ✓",
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
  filters: {
    search: "Search articles",
    all: "All",
    label: "Filter by category",
    empty: "No article matches your search.",
    reset: "Clear filters",
    count: (n: number) => `${n} article${n > 1 ? "s" : ""}`,
  },
  by: "Written by",
  backToList: "Back to the list",
  published: "Published",
  reading: "Reading time",
  minutes: "min read",
  share: "Share",
  copy: "Copy link",
  copied: "Link copied ✓",
  toc: "Contents",
  back: "All articles",
  related: "Read next",
  services: { eyebrow: "Services", heading: "How can we *help you?*" },
};

export const insightsContent: Record<Locale, typeof fr> = { fr, en };
