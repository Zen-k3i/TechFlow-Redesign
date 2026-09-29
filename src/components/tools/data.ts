import type { Locale } from "@/i18n/config";
import type { TOOL_DETAIL_QUERY_RESULT, TOOLS_INDEX_QUERY_RESULT } from "@/sanity.types";

/** Tools live in Sanity (TechFlow CMS); this file only holds the interface copy. */
export type ToolCard = TOOLS_INDEX_QUERY_RESULT[number];
export type ToolDetail = NonNullable<TOOL_DETAIL_QUERY_RESULT>;

const fr = {
  meta: {
    title: "Nos outils : Webflow, Figma, n8n, HubSpot et plus | TechFlow",
    description: "La boîte à outils TechFlow : les plateformes que nous utilisons pour concevoir, développer et automatiser vos produits web.",
  },
  label: "Outils",
  badge: "La boîte à outils TechFlow",
  title: "Les bons outils, *pour chaque projet.*",
  intro:
    "Tous les projets n'appellent pas la même solution. C'est pourquoi nous travaillons sur toute la stack : Webflow, Figma, Bubble, Shopify, n8n, Zapier, HubSpot, et plus encore.",
  all: "Tous les outils",
  discover: "Découvrir",
  projects: { eyebrow: "Réalisations", heading: "Projets livrés avec *{tool}.*" },
  toolbox: { eyebrow: "Boîte à outils", heading: "Et le reste de *la stack.*" },
  services: { eyebrow: "Services", heading: "Quel service pouvons-nous *vous apporter ?*" },
};

const en: typeof fr = {
  meta: {
    title: "Our tools: Webflow, Figma, n8n, HubSpot and more | TechFlow",
    description: "The TechFlow toolbox: the platforms we use to design, build and automate your web products.",
  },
  label: "Tools",
  badge: "The TechFlow toolbox",
  title: "The right tools, *for every project.*",
  intro:
    "Not every project calls for the same solution. That's why we work across the whole stack: Webflow, Figma, Bubble, Shopify, n8n, Zapier, HubSpot, and more.",
  all: "All tools",
  discover: "Discover",
  projects: { eyebrow: "Work", heading: "Projects shipped with *{tool}.*" },
  toolbox: { eyebrow: "Toolbox", heading: "And the rest of *the stack.*" },
  services: { eyebrow: "Services", heading: "How can we *help you?*" },
};

export const toolsContent: Record<Locale, typeof fr> = { fr, en };
