import type { Locale } from "@/i18n/config";

const fr = {
  meta: {
    title: "Contact | TechFlow Agency",
    description: "Parlez-nous de votre projet de site, de produit web ou d'automatisation. Premier échange de 30 minutes, sans engagement.",
  },
  badge: "Contact",
  title: "Envie de construire quelque chose ? *Parlons de votre projet.*",
  intro: "Un site à créer, une refonte, un produit web ou un agent IA : décrivez-nous votre besoin, nous revenons vers vous avec une première lecture et les bonnes questions.",
  person: {
    availability: "Disponible pour de nouveaux projets",
    book: "Réserver 30 min",
    or: "ou écrire à",
  },
  form: {
    eyebrow: "Brief de projet",
    heading: "Parlez-nous de votre *projet.*",
    promises: [
      { title: "30 minutes pour cadrer", text: "Un premier appel pour comprendre vos objectifs, sans engagement." },
      { title: "Un devis clair", text: "Un périmètre, des livrables et un calendrier de 4 à 12 semaines." },
      { title: "3 mois de support", text: "Inclus après chaque mise en ligne, pour avancer sereinement." },
    ],
    name: "Nom complet",
    email: "E-mail professionnel",
    company: "Entreprise",
    website: "Site actuel (facultatif)",
    services: "De quoi avez-vous besoin ?",
    serviceOptions: ["Design web", "Développement", "Agents IA", "Tunnel de vente", "Refonte", "Autre"],
    budget: "Budget indicatif",
    budgetOptions: ["< 5 k€", "5 – 15 k€", "15 – 30 k€", "30 k€ +", "À définir"],
    timeline: "Échéance souhaitée",
    timelineOptions: ["Dès que possible", "1 – 3 mois", "3 – 6 mois", "Flexible"],
    message: "Votre projet en quelques lignes",
    messagePlaceholder: "Contexte, objectifs, pages ou fonctionnalités clés, références que vous aimez…",
    submit: "Envoyer le brief",
    note: "L'envoi ouvre votre messagerie avec le brief pré-rempli.",
    sent: "Votre messagerie s'est ouverte avec le brief pré-rempli. Il ne reste qu'à l'envoyer.",
    subject: "Nouveau projet",
  },
  offices: {
    eyebrow: "Nos bureaux",
    heading: "Paris et Phnom Penh, *une seule équipe.*",
    intro: "Deux fuseaux horaires pour avancer pendant que vous dormez, un pilotage en français.",
    localTime: "Heure locale",
    call: "Appeler",
  },
};

const en: typeof fr = {
  meta: {
    title: "Contact | TechFlow Agency",
    description: "Tell us about your website, web product or automation project. A free, no-commitment 30-minute first call.",
  },
  badge: "Contact",
  title: "Want to build something? *Let's talk about your project.*",
  intro: "A new website, a redesign, a web product or an AI agent: tell us what you need and we'll come back with a first read and the right questions.",
  person: {
    availability: "Available for new projects",
    book: "Book 30 min",
    or: "or email",
  },
  form: {
    eyebrow: "Project brief",
    heading: "Tell us about your *project.*",
    promises: [
      { title: "30 minutes to scope", text: "A first call to understand your goals, with no commitment." },
      { title: "A clear quote", text: "A scope, deliverables and a 4 to 12-week timeline." },
      { title: "3 months of support", text: "Included after every launch, so you can move forward with confidence." },
    ],
    name: "Full name",
    email: "Work email",
    company: "Company",
    website: "Current website (optional)",
    services: "What do you need?",
    serviceOptions: ["Web design", "Development", "AI agents", "Sales funnel", "Redesign", "Other"],
    budget: "Estimated budget",
    budgetOptions: ["< €5k", "€5 – 15k", "€15 – 30k", "€30k +", "To be defined"],
    timeline: "Target timeline",
    timelineOptions: ["As soon as possible", "1 – 3 months", "3 – 6 months", "Flexible"],
    message: "Your project in a few lines",
    messagePlaceholder: "Context, goals, key pages or features, references you like…",
    submit: "Send the brief",
    note: "Sending opens your email app with the brief pre-filled.",
    sent: "Your email app opened with the brief pre-filled. All that's left is to hit send.",
    subject: "New project",
  },
  offices: {
    eyebrow: "Our offices",
    heading: "Paris and Phnom Penh, *one team.*",
    intro: "Two time zones so work moves while you sleep, with project management in English and French.",
    localTime: "Local time",
    call: "Call",
  },
};

export const contactContent: Record<Locale, typeof fr> = { fr, en };
