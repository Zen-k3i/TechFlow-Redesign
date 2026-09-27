import type { Locale } from "@/i18n/config";
import type { Mark } from "../page/ui";

export const members = [
  { name: "Maximilien Grolier", role: "Founder & CEO", photo: "/images/team/maximilien-grolier.webp" },
  { name: "Wichheca Hin", role: "Senior Project Manager", photo: "/images/team/wichheca-hin.jpg" },
  { name: "Andres Ramirez", role: "Senior Developer & AI", photo: "/images/team/andres-ramirez.webp" },
  { name: "Aung Kaung Bo", role: "UX/UI Designer", photo: "/images/team/aung-kaung-bo.webp" },
  { name: "Kimheng Kou", role: "Webflow Developer", photo: "/images/team/kimheng-kou.webp" },
  { name: "Raphaël Benichou", role: "Senior Project Manager", photo: "/images/team/raphael-benichou.webp" },
  { name: "Sovanrath Soem", role: "Webflow Developer", photo: "/images/team/sovanrath-soem.jpg" },
  { name: "Nicolas Bocage", role: "Product Builder", photo: "/images/team/nicolas-bocage.jpg" },
  { name: "Maxime Pauchon", role: "Product Manager", photo: "/images/team/maxime-pauchon.webp" },
  { name: "Axel Malherbe", role: "Backend Developer", photo: "/images/team/axel-malherbe.jpg" },
];

export const offices = [
  { city: "Paris", timeZone: "Europe/Paris", phone: "+33 (0) 672 690 701", address: ["229 rue Saint-Honoré", "75001 Paris, France"] },
  {
    city: "Phnom Penh",
    timeZone: "Asia/Phnom_Penh",
    phone: "+855 (0) 12 537 289",
    address: ["Confluences | Aquation Office Park #540", "Koh Pich Street, Diamond Island", "120101 Phnom Penh, Cambodia"],
  },
];

type Comparison = { label: string; values: [Mark, Mark, Mark] }[];

const fr = {
  meta: {
    title: "Notre équipe | TechFlow Agency",
    description:
      "Une équipe de designers, développeurs et chefs de projet entre Paris et Phnom Penh : design, développement et stratégie digitale pilotés en français.",
  },
  badge: "L'équipe derrière TechFlow",
  title: "Une équipe humaine, qui construit du *numérique.*",
  intro:
    "TechFlow est une équipe culturellement diverse et répartie à l'international. Nous réunissons une expérience collective en design, développement et stratégie digitale, pilotée en français et livrée au niveau d'exigence d'une agence parisienne.",
  stats: [
    { value: "12+", label: "années de métier" },
    { value: "45+", label: "projets réussis" },
    { value: "40+", label: "clients satisfaits" },
    { value: "10", label: "membres de l'équipe" },
  ],
  pillars: {
    eyebrow: "Notre ADN",
    heading: "Construit sur des années *d'expérience.*",
    intro: "Plus de dix ans de produits numériques, entre la France et l'Asie du Sud-Est.",
    items: [
      {
        title: "Si vous pouvez l'imaginer, nous pouvons le construire",
        text: "Outils d'IA, plateformes no-code, applications web sur mesure, systèmes d'automatisation : nous savons ce que 2026 a à offrir, et comment s'en servir.",
      },
      {
        title: "La stack fait la différence",
        text: "Webflow, Figma, n8n, Zapier, Bubble, HubSpot et d'autres. Nous ne choisissons pas un outil unique pour y faire entrer votre problème de force.",
      },
      {
        title: "Le design et la création d'abord",
        text: "Avant la moindre ligne de code : recherche, stratégie et design. Chaque projet commence par une compréhension approfondie de votre marché et de vos utilisateurs.",
      },
    ],
  },
  howWeWork: {
    eyebrow: "Comment nous travaillons",
    heading: "Une collaboration *sans zone grise.*",
    items: [
      {
        title: "Votre projet. Toujours visible.",
        text: "Chaque jalon, chaque tâche et chaque livrable vit dans un espace Notion partagé. Aucune supposition, aucun mail « un point rapide ? ». Vous voyez où en sont les choses, à tout moment.",
        image: "/images/studio/frame.jpg",
        alt: "Tableau de suivi de projet partagé",
        tags: ["Notion partagé", "Jalons", "Livrables"],
      },
      {
        title: "Des réponses, pas du silence radio.",
        text: "Slack, WhatsApp et un point hebdomadaire. Vos questions trouvent une réponse le jour même, parce qu'attendre trois jours n'est pas un « processus », c'est de la négligence.",
        image: "/images/studio/team.webp",
        alt: "Point visio hebdomadaire avec l'équipe",
        tags: ["Slack", "WhatsApp", "Point hebdo"],
      },
      {
        title: "Dans les délais. À chaque fois.",
        text: "Chaque projet démarre avec un calendrier clair et des jalons sur lesquels nous engager. Vous savez toujours ce qui arrive ensuite, et où nous en sommes par rapport au plan.",
        image: "/images/studio/office.webp",
        alt: "Designer travaillant sur un site web",
        tags: ["Calendrier au jour 1", "Démo chaque vendredi", "Jalons"],
      },
    ],
  },
  team: {
    eyebrow: "Notre équipe",
    heading: "Les visages *derrière vos projets.*",
    intro: "Une seule équipe pour la stratégie, le design, le développement et l'automatisation, du premier atelier à la mise en ligne.",
  },
  comparison: {
    heading: "Pourquoi nous sommes le *choix naturel.*",
    intro:
      "Les freelances apportent du talent mais pas de système. Les autres agences apportent du process mais pas de vision. TechFlow apporte les deux, avec une équipe dédiée et une responsabilité complète, du brief à la mise en ligne.",
    rows: [
      { label: "Équipe dédiée", values: ["yes", "partial", "no"] },
      { label: "Accompagnement stratégique", values: ["yes", "yes", "no"] },
      { label: "Design et ingénierie", values: ["yes", "partial", "partial"] },
      { label: "Engagement sur les résultats", values: ["yes", "no", "no"] },
    ] as Comparison,
  },
  cambodia: {
    eyebrow: "Paris · Phnom Penh",
    heading: "Pourquoi le Cambodge est un *avantage ?*",
    points: [
      {
        title: "Deux fuseaux, une seule équipe",
        text: "Paris pour la stratégie et le suivi client, Phnom Penh pour la production. Quand vous vous couchez, votre projet avance.",
      },
      {
        title: "Piloté en français",
        text: "Un interlocuteur francophone et le niveau d'exigence d'une agence parisienne, du brief à la mise en ligne.",
      },
      {
        title: "35 % moins cher",
        text: "Une équipe senior et dédiée, 35 % moins chère que les agences européennes, sans compromis sur la qualité.",
      },
    ],
    localTime: "Heure locale",
  },
};

const en: typeof fr = {
  meta: {
    title: "Our Team | TechFlow Agency",
    description:
      "A team of designers, developers and project managers between Paris and Phnom Penh: design, development and digital strategy, run to a Paris-agency standard.",
  },
  badge: "The team behind TechFlow",
  title: "A human team that builds *digital.*",
  intro:
    "TechFlow is a culturally diverse team spread across the globe. We bring together collective experience in design, development and digital strategy, managed in French and delivered to the standard you'd expect from a Paris agency.",
  stats: [
    { value: "12+", label: "years in the craft" },
    { value: "45+", label: "successful projects" },
    { value: "40+", label: "happy clients" },
    { value: "10", label: "team members" },
  ],
  pillars: {
    eyebrow: "Our DNA",
    heading: "Built on years *of experience.*",
    intro: "Over ten years of digital products, between France and Southeast Asia.",
    items: [
      {
        title: "If you can imagine it, we can build it",
        text: "AI tools, no-code platforms, custom web apps, automation systems: we know what 2026 has to offer, and how to use it.",
      },
      {
        title: "The stack makes the difference",
        text: "Webflow, Figma, n8n, Zapier, Bubble, HubSpot and more. We don't pick one tool and force your problem into it.",
      },
      {
        title: "Design and craft first",
        text: "Before a single line of code: research, strategy and design. Every project starts with a deep understanding of your market and your users.",
      },
    ],
  },
  howWeWork: {
    eyebrow: "How we work",
    heading: "Collaboration *with no grey areas.*",
    items: [
      {
        title: "Your project. Always visible.",
        text: "Every milestone, task and deliverable lives in a shared Notion workspace. No guessing, no “quick sync?” emails. You see exactly where things stand, at any time.",
        image: "/images/studio/frame.jpg",
        alt: "Shared project tracking board",
        tags: ["Shared Notion", "Milestones", "Deliverables"],
      },
      {
        title: "Answers, not radio silence.",
        text: "Slack, WhatsApp and a weekly check-in. Your questions get answered the same day, because waiting three days isn't a “process”, it's negligence.",
        image: "/images/studio/team.webp",
        alt: "Weekly video call with the team",
        tags: ["Slack", "WhatsApp", "Weekly check-in"],
      },
      {
        title: "On time. Every time.",
        text: "Every project starts with a clear timeline and milestones we commit to. You always know what's next, and where we stand against the plan.",
        image: "/images/studio/office.webp",
        alt: "Designer working on a website",
        tags: ["Timeline on day 1", "Demo every Friday", "Milestones"],
      },
    ],
  },
  team: {
    eyebrow: "Our team",
    heading: "The faces *behind your projects.*",
    intro: "One team for strategy, design, development and automation, from the first workshop to launch.",
  },
  comparison: {
    heading: "Why we're the *natural choice.*",
    intro:
      "Freelancers bring talent but no system. Other agencies bring process but no vision. TechFlow brings both, with a dedicated team and full accountability, from brief to launch.",
    rows: [
      { label: "Dedicated team", values: ["yes", "partial", "no"] },
      { label: "Strategic guidance", values: ["yes", "yes", "no"] },
      { label: "Design and engineering", values: ["yes", "partial", "partial"] },
      { label: "Commitment to results", values: ["yes", "no", "no"] },
    ],
  },
  cambodia: {
    eyebrow: "Paris · Phnom Penh",
    heading: "Why Cambodia is an *advantage.*",
    points: [
      {
        title: "Two time zones, one team",
        text: "Paris for strategy and client follow-up, Phnom Penh for production. While you sleep, your project moves forward.",
      },
      {
        title: "Managed in French",
        text: "A French-speaking point of contact and the standard of a Paris agency, from brief to launch.",
      },
      {
        title: "35% cheaper",
        text: "A senior, dedicated team, 35% cheaper than European agencies, with no compromise on quality.",
      },
    ],
    localTime: "Local time",
  },
};

export const teamContent: Record<Locale, typeof fr> = { fr, en };
