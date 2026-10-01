import { href } from "./routes";

export const fr = {
  meta: {
    title: "TechFlow Agency | Design, développement et agents IA",
    description:
      "Design, Développement et IA : TechFlow est un start-up studio. Nous livrons en cinq semaines les produits web que d'autres mettent des mois à livrer.",
  },

  nav: {
    pages: {
      services: "Services",
      projects: "Projets",
      team: "Notre équipe",
      insights: "Ressources",
      contact: "Contact",
    },
    allServices: "Voir tous les services",
    servicesIntro: "Un studio de design web et de développement, du premier wireframe au site en ligne.",
    book: "Réserver un appel",
    bookMobile: "Réserver un appel gratuit →",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    home: "TechFlow Agency, retour en haut",
    language: "Langue",
  },

  hero: {
    badge: "12 ans · 45+ projets livrés",
    subtitle:
      "Design, développement et IA : TechFlow est un start-up studio. Nous livrons en *cinq semaines* les produits web que d'autres mettent des *mois* à livrer.",
    start: "Démarrer un projet",
    human: "Parler à un humain",
    reassurance: "Gratuit · Sans engagement · 30 minutes",
    clients: { value: "35+", label: "clients accompagnés" },
    speed: { title: "De l'idée au produit", sub: "en 5 semaines" },
    compiled: { label: "Compiled in", value: "5 sem." },
    leads: "leads",
    caseCursor: "Voir le cas",
    caseAlt: "Étude de cas",
    view: "Voir →",
  },

  trust: {
    eyebrow: "Ils nous font confiance",
    stats: [
      { value: 12, suffix: " ans", label: "d'expérience cumulée" },
      { value: 45, suffix: "+", label: "projets livrés" },
      { value: 35, suffix: "+", label: "clients accompagnés" },
      { value: 5, suffix: " sem.", label: "de l'idée à la mise en ligne" },
    ],
  },

  industries: {
    eyebrow: "Secteurs",
    heading: "Des secteurs différents. *Une même exigence.*",
    intro:
      "Chaque secteur a ses codes, ses contraintes et ses décideurs. Notre niveau d'exigence, lui, reste le même d'un projet à l'autre.",
    references: "Références",
    seeCase: "Voir l'étude de cas",
    items: [
      {
        id: "conseil",
        title: "Cabinets de conseil et professions libérales",
        short: "Conseil & professions libérales",
        text: "Des sites qui transforment votre crédibilité en rendez-vous qualifiés.",
        tags: ["Site vitrine", "Prise de rendez-vous", "SEO"],
        clients: ["Mandil Avocats", "Exelmans", "Tandem Partners"],
        project: "mandil-avocats",
      },
      {
        id: "plateformes",
        title: "Plateformes numériques & ERP",
        short: "Plateformes & ERP",
        text: "Sites, plateformes et outils internes : nous couvrons la chaîne complète.",
        tags: ["Plateformes web", "Outils internes", "Intégrations"],
        clients: ["AMA Campus", "Place des Aînés", "District 6"],
        project: "ama-campus",
      },
      {
        id: "institutions",
        title: "Institutions et organismes publics",
        short: "Institutions publiques",
        text: "Des plateformes conçues pour durer : accessibilité, souveraineté des données, maintenance sereine.",
        tags: ["Accessibilité", "Souveraineté des données", "Maintenance"],
        clients: ["OPCO EP", "Little Green Spark"],
        project: "opco-ep",
      },
    ],
    cta: {
      short: "Votre secteur ?",
      title: "Devenir notre prochain client ?",
      text: "Votre secteur n'est pas dans la liste ? Notre méthode s'adapte, notre exigence reste la même.",
      button: "Parlons-en",
    },
  },

  manifesto: {
    eyebrow: "Manifeste",
    statement:
      "Chez TechFlow, nous sommes convaincus qu'une expérience numérique de qualité ne devrait pas demander *des mois* de travail.",
    bridge: "Pas parce que nous allons vite. Parce que nous avons supprimé :",
    removed: ["Les allers-retours flous", "Les briefs qui se réécrivent", "Les validations qui traînent"],
    removedTag: "Supprimé",
    closing: "Le process fait *la vitesse.*",
    body: "Nous couvrons toute la chaîne : recherche, design system, développement, automatisation par l'IA. Les technologies changent chaque trimestre, notre exigence sur ce qui part en production, elle, ne bouge pas d'un cran.",
  },

  services: {
    eyebrow: "Services",
    heading: "Quatre expertises, *une seule* équipe.",
    intro:
      "Choisissez un service, ou combinez-les : chaque brique se branche sur les autres, sans perte entre deux prestataires.",
    discover: "Découvrir l'offre",
    items: [
      {
        id: "design",
        title: "Design",
        tagline: "Une marque qui inspire confiance avant le premier mot.",
        pitch: "Branding, UX/UI, Social Ads, Motion Design : nous concevons votre marque pour positionner votre expertise.",
        deliverables: ["Identité visuelle", "Design system Figma", "UX/UI haute fidélité", "Motion design"],
        image: "little-green-spark",
        href: href("fr", "design"),
      },
      {
        id: "developpement",
        title: "Développement",
        tagline: "Rapide au lancement, propre trois ans après.",
        pitch: "Des plateformes et des sites web conçus pour être performants et propres même trois ans après la livraison.",
        deliverables: ["Webflow", "Shopify & Bubble", "Sur mesure", "SEO & performance"],
        image: "opco-ep",
        href: href("fr", "development"),
      },
      {
        id: "agents-ia",
        title: "Agents IA",
        tagline: "Vos tâches répétitives, faites pendant la nuit.",
        pitch: "Ce que votre équipe refait quinze fois par semaine, un agent le fait pendant la nuit.",
        deliverables: ["Automatisation n8n", "CRM HubSpot & Twenty", "Intégrations API", "IA souveraines"],
        image: "leapmotor",
        href: href("fr", "aiAgents"),
      },
      {
        id: "tunnel-de-vente",
        title: "Tunnel de vente",
        tagline: "De la publicité au rendez-vous, mesuré à chaque étape.",
        pitch:
          "De la création de la publicité à la prise de rendez-vous : on crée, on mesure, on ajuste pour maximiser les résultats.",
        deliverables: ["Publicités sociales", "Landing pages", "Prise de rendez-vous", "Mesure & optimisation"],
        image: "place-des-aines",
        href: href("fr", "salesFunnel"),
      },
    ],
  },

  work: {
    eyebrow: "Projets sélectionnés",
    heading: "Le travail parle *avant nous.*",
    intro: "Chaque projet avait un objectif chiffré. Ouvrez une étude de cas pour voir lequel, et ce qu'il est devenu.",
    filterLabel: "Filtrer par secteur",
    all: "Tous",
    seeAll: "Voir les 21 projets",
    growthCover: { videos: "5 vidéos", title: ["De la publicité", "au rendez-vous."] },
    sectors: {} as Record<string, string>,
    disciplines: {} as Record<string, string>,
  },

  convictions: {
    eyebrow: "Convictions",
    heading: "Trois convictions qui *changent le résultat.*",
    items: [
      {
        title: "Si vous pouvez l'imaginer, nous pouvons le construire",
        text: "Notre travail est de rester à la pointe des technologies. Nous utilisons les frameworks reconnus, des outils propriétaires et open-source et des IA souveraines. Aucune idée ne meurt en réunion.",
      },
      {
        title: "L'outil suit le besoin, jamais l'inverse",
        text: "Nous utilisons Webflow, Figma, n8n, Notion, HubSpot, Twenty, Granola, Finsweet et d'autres. Nous ne choisissons pas un outil unique pour y faire entrer votre problème de force.",
      },
      {
        title: "Comprendre avant de concevoir",
        text: "Avant la moindre ligne de code : recherche, stratégie, design system. Un projet qui démarre par du développement se termine par des correctifs. Un projet qui démarre par la compréhension se termine par un lancement.",
      },
    ],
    build: {
      prompt: "Votre idée",
      ideas: ["Un portail client sur mesure", "Un agent IA qui qualifie vos leads", "Une plateforme de formation en ligne"],
      stack: ["Frameworks reconnus", "Open-source", "Outils propriétaires", "IA souveraines"],
      status: "Faisable",
      quote: "Aucune idée ne meurt en réunion.",
    },
    tools: {
      label: "Votre besoin",
      needs: [
        { label: "Site vitrine", tools: ["Webflow", "Figma", "Finsweet"] },
        { label: "Automatisation", tools: ["n8n", "Notion", "Granola"] },
        { label: "CRM & ventes", tools: ["HubSpot", "Twenty", "n8n"] },
      ],
      note: "L'outil se choisit une fois le besoin compris.",
    },
    understand: {
      bad: { label: "Démarrer par le code", steps: ["Code", "Bug", "Correctif", "Bug"], end: "Correctifs" },
      good: { label: "Démarrer par la compréhension", steps: ["Recherche", "Stratégie", "Design system", "Code"], end: "Lancement" },
    },
    disciplines: ["Branding", "Produit", "Développement", "UX Design", "Growth", "Marketing"],
  },

  process: {
    eyebrow: "Méthode",
    heading: "De l'idée au lancement en *cinq semaines.*",
    intro:
      "Un calendrier fixé dès le premier jour, un interlocuteur unique, et une démo chaque vendredi. Vous savez toujours où en est votre projet.",
    week: "Semaine",
    steps: [
      {
        week: "Semaine 1",
        title: "Cadrage du projet",
        text: "Votre marché, vos utilisateurs, vos objectifs, votre stack. Avant toute conception, nous alignons le périmètre, le calendrier et les indicateurs de réussite.",
        app: "Google Meet",
        alt: "Visio de cadrage avec le client et l'équipe TechFlow",
      },
      {
        week: "Semaine 2",
        title: "Recherche et stratégie",
        text: "Analyse concurrentielle, recherche utilisateur, positionnement, architecture SEO et visibilité dans les IA : quoi construire, et pourquoi cela fonctionnera.",
        app: "FigJam",
        alt: "Atelier de recherche sur un tableau FigJam",
      },
      {
        week: "Semaine 3",
        title: "Image de marque",
        text: "Logo, système visuel, langage de design, voix de marque. Une identité qui inspire confiance avant même qu'un mot ne soit lu.",
        app: "Figma",
        alt: "Quatre pistes de direction artistique comparées côte à côte",
      },
      {
        week: "Semaine 4",
        title: "Design UX/UI",
        text: "Chaque écran est conçu dans Figma avant la première ligne de code : parcours, design system, interactions et cas limites.",
        app: "Figma",
        alt: "Wireframes des pages dans Figma",
      },
      {
        week: "Semaine 5",
        title: "Développement et recette",
        text: "Navigateurs, appareils, vitesse, formulaires, CMS : rien ne quitte nos mains sans une recette complète.",
        app: "Webflow",
        alt: "Site en cours de développement dans Webflow",
      },
    ],
  },

  testimonials: {
    eyebrow: "Avis clients",
    heading: "Ce qu'ils disent *après* la mise en ligne.",
    verified: "avis vérifiés",
    pause: "Survolez pour mettre en pause",
  },

  brief: {
    eyebrow: "Votre projet",
    heading: "Construisez votre brief *en 20 secondes.*",
    needs: { title: "De quoi avez-vous besoin ?", hint: "Plusieurs choix possibles" },
    goal: { title: "Quel est votre objectif principal ?", label: "Objectif" },
    timing: { title: "Quand voulez-vous lancer ?", label: "Lancement" },
    goals: ["Lancer une nouvelle marque", "Refondre mon site", "Générer plus de leads", "Automatiser mon activité"],
    timings: ["Dès que possible", "Dans 1 à 3 mois", "Je me renseigne"],
    estimates: {
      full: { value: "60 à 90 jours", note: "Système complet : site, funnel et agents IA." },
      site: { value: "3 à 6 semaines", note: "Délai habituel d'un site vitrine." },
      custom: { value: "Sur mesure", note: "Nous chiffrons le délai lors de l'appel." },
    },
    card: "Brief TechFlow",
    live: "Mis à jour en direct",
    estimate: "Délai estimé",
    empty: "Sélectionnez au moins un service.",
    services: "Services",
    tbd: "À définir",
    start: { label: "Démarrage", value: "Sous 2 semaines" },
    book: "Réserver l'appel ↗",
    copy: "Copier le brief",
    copied: "Brief copié ✓",
    note: "Collez votre brief lors de la réservation : on arrive à l'appel en ayant déjà réfléchi.",
    colon: " : ",
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Les questions qu'on nous pose *avant de signer.*",
    items: [
      {
        q: "Combien ça coûte ?",
        a: "Chaque système est dimensionné sur mesure. L'audit gratuit nous permet de chiffrer précisément vos besoins, et vous obtenez un budget ferme avant tout engagement (le périmètre est ensuite suivi sprint par sprint, il ne dérive jamais).",
      },
      {
        q: "Combien de temps pour lancer un projet ?",
        a: "La plupart de nos projets démarrent sous deux semaines. Un site vitrine se livre en 3 à 6 semaines, un système complet (site + funnel + agents IA) en 60 à 90 jours.",
      },
      {
        q: "Travaillez-vous avec des petites structures ?",
        a: "Oui. Nos offres sont modulaires : on commence là où l'impact est le plus rapide, et on étend le périmètre au rythme de vos résultats.",
      },
      {
        q: "Que se passe-t-il après la livraison ?",
        a: "On ne disparaît pas : maintenance, amélioration continue et suivi des métriques font partie de nos abonnements d'accompagnement.",
      },
      {
        q: "Comment démarre une collaboration ?",
        a: "Par un appel de 30 minutes, gratuit et sans engagement. On analyse votre besoin et vous repartez avec un plan d'action concret, que l'on travaille ensemble ou non.",
      },
    ],
  },

  footer: {
    status: "Ouverts aux nouveaux projets",
    heading: "Parlons de *votre projet.*",
    text: "Trente minutes avec l'équipe qui construira votre projet, pas avec un commercial. Vous repartez avec un périmètre, un délai et un ordre de grandeur.",
    cursor: "Réserver",
    book: ["Réserver", "un appel ↗"],
    tagline: "Start-up studio : design, développement et agents IA pour les entreprises qui veulent aller vite.",
    columns: { services: "Services", agency: "Agence", follow: "Suivez-nous" },
    agency: { projects: "Projets", tools: "Outils", team: "Notre équipe", insights: "Ressources", contact: "Contact" },
    legal: "Mentions légales",
    terms: "Conditions générales",
    top: "Haut de page ↑",
    newTab: "nouvel onglet",
  },

  common: {
    human: "Parler à un humain",
    start: "Démarrer un projet",
    reassurance: "Gratuit · Sans engagement · 30 minutes",
    viewCase: "Voir le cas",
    allProjects: "Tous les projets",
    readMore: "Lire l'article",
    deliverable: "Livrable",
    step: "Étape",
    breadcrumbHome: "Accueil",
    playVideo: "Lire la vidéo avec le son",
    comparison: {
      eyebrow: "Comparatif",
      heading: "Pourquoi nous sommes le *choix naturel.*",
      techflow: "TechFlow",
      agencies: "Autres agences",
      freelancers: "Freelances",
      yes: "Oui",
      no: "Non",
      partial: "En partie",
      criterion: "Critère",
      note: "35 % moins cher que les agences européennes, à exigence égale.",
    },
    nextSteps: {
      eyebrow: "Et ensuite ?",
      heading: "De la première conversation au *lancement.*",
      intro:
        "La démarche est simple. Voici exactement ce qui vous attend lorsque vous contactez TechFlow.",
      steps: [
        {
          title: "Planifier un appel",
          text: "Un appel découverte de 30 minutes avec l'équipe. Nous voulons comprendre votre projet, vos objectifs et la vision derrière : c'est ici que nous écoutons.",
        },
        {
          title: "Mini design sprint",
          text: "Un sprint ciblé pour explorer votre vision et commencer à donner forme à la solution : parcours, interfaces, architecture. Avant de chiffrer quoi que ce soit.",
        },
        {
          title: "Co-construire la proposition",
          text: "Périmètre, calendrier, livrables et stack retenue : la proposition se construit avec vous, autour de vos besoins réels.",
        },
        {
          title: "Premier versement",
          text: "Simple et transparent. Le premier versement confirme l'engagement et bloque la date de démarrage de votre projet.",
        },
        {
          title: "Lancer le projet",
          text: "La première semaine commence. Le cadre est posé, l'équipe est alignée : préparez-vous à vous réveiller avec des avancées.",
        },
      ],
    },
    cta: {
      heading: "Un projet en *tête ?*",
      text: "TechFlow transforme les idées en résultats. Nos clients lancent 40 % plus vite et constatent une croissance mesurable dès le premier trimestre.",
    },
  },
};

export type Dictionary = typeof fr;
