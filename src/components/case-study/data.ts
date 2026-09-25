export type CaseStudy = {
  slug: string;
  summary: string;
  services: string[];
  tools: string[];
  about: string;
  context: string;
  challenges: string[];
  /** Weeks spent on each phase; `design` is 0 when the mockups came from another agency. */
  timeline: { design: number; dev: number };
  approach: { title: string; text: string; points?: string[] }[];
  results: { text: string; metrics: { value: string; label: string }[] };
  testimonial?: { quote: string; name: string; role: string; photo?: string };
};

const brand = "Image de marque";
const uiux = "Design UI/UX";
const dev = "Développement Web";

export const caseStudies: CaseStudy[] = [
  {
    slug: "concorde",
    summary: "Refonte de marque et site web pour un acteur majeur du développement durable au Cambodge.",
    services: [brand, uiux, dev],
    tools: ["Figma", "Webflow"],
    about:
      "Concorde travaille avec des agences internationales et des partenaires locaux pour transformer les plans de développement en réalités durables : infrastructures, transport public, projets d'impact.",
    context:
      "Habitués à parler aux gouvernements, aux grandes institutions et aux ONG, ils avaient besoin d'une marque sérieuse et crédible, avec une touche de modernité dans un écosystème de sites très classiques.",
    challenges: [
      "Allier ancrage local et standards internationaux",
      "Rester crédible auprès des institutions",
      "Se démarquer d'un secteur visuellement daté",
    ],
    timeline: { design: 4, dev: 6 },
    approach: [
      {
        title: "Recherche & stratégie",
        text: "Analyse du secteur du développement durable au Cambodge et des attentes de chaque partie prenante, pour un positionnement centré sur la double expertise locale et internationale.",
      },
      {
        title: "Branding & identité visuelle",
        text: "Nouveau logo, charte et palette qui évoquent à la fois innovation et durabilité, fidèles aux valeurs de l'entreprise.",
      },
      {
        title: "Maquettes UX/UI",
        text: "Une architecture pensée pour présenter clairement les projets et initiatives, et faire comprendre l'impact en quelques secondes.",
      },
      {
        title: "Développement Webflow & CMS",
        text: "Un site responsive, rapide et accessible, avec un CMS pour publier les projets et réalisations en autonomie.",
      },
    ],
    results: {
      text: "Concorde communique enfin à la hauteur de son rôle de leader, et renforce sa crédibilité auprès des partenaires internationaux.",
      metrics: [
        { value: "7", label: "demandes de partenariat par mois" },
        { value: "1,5 s", label: "temps de chargement moyen" },
        { value: "10", label: "semaines, de la marque au site" },
      ],
    },
    testimonial: {
      quote:
        "Nous avons fait appel à Maximilien et ses équipes pour l'identité visuelle et la construction du site internet d'une de nos ventures. Très satisfaits à la fois de la manière dont le projet a été géré et de son résultat final.",
      name: "Soreasmey Ke Bin",
      role: "Co-Founder @Concorde",
    },
  },
  {
    slug: "mandil-avocats",
    summary: "Refonte digitale d'un cabinet d'avocats spécialisé en droit du numérique : fintech, data et IA.",
    services: [brand, uiux, dev],
    tools: ["Figma", "Webflow", "Screaming Frog"],
    about:
      "Mandil Avocats accompagne start-up, PME et directions juridiques de grands groupes sur des sujets à forte technicité : fintech, protection des données, intelligence artificielle.",
    context:
      "Entre RGPD et AI Act, le cabinet devait affirmer son expertise du droit du numérique. Le site historique ne reflétait ni la modernité de ses expertises, ni sa double culture juridique et tech.",
    challenges: [
      "Rendre lisible une expertise très pointue",
      "Inspirer confiance aux start-up comme aux grands groupes",
      "Se distinguer des cabinets trop institutionnels",
    ],
    timeline: { design: 3, dev: 5 },
    approach: [
      {
        title: "Recherche & stratégie",
        text: "Benchmark des cabinets du numérique en France et à l'international : peu d'acteurs concilient expertise pointue et lisibilité.",
        points: ["Rendre compréhensibles des sujets complexes", "Affirmer l'expertise sur les sujets émergents", "Adopter les codes du secteur tech"],
      },
      {
        title: "Branding & identité visuelle",
        text: "Une identité classique modernisée : palette sobre aux touches contemporaines, typographie structurée, grilles et contrastes inspirés de la tech.",
      },
      {
        title: "Maquettes UX/UI",
        text: "Des pages services pédagogiques, orientées problématiques clients, et une hiérarchie forte pour guider la lecture.",
      },
      {
        title: "Développement Webflow & migration",
        text: "Animations légères, CMS évolutif, audit de l'ancien site, migration des contenus et redirections 301 pour préserver le SEO.",
      },
    ],
    results: {
      text: "Le cabinet dispose d'un outil moderne et performant qui valorise ses expertises et le différencie des cabinets traditionnels.",
      metrics: [
        { value: "9", label: "demandes de contact par mois" },
        { value: "1,3 s", label: "temps de chargement moyen" },
        { value: "301", label: "redirections, SEO préservé" },
      ],
    },
    testimonial: {
      quote: "J'ai apprécié leur écoute, leur réactivité et leurs propositions pour satisfaire à mon besoin ! Merci encore !",
      name: "Pauline Mandil",
      role: "Partner @Mandil Avocats",
      photo: "/images/people/pauline-mandil.webp",
    },
  },
  {
    slug: "place-des-aines",
    summary: "Une plateforme qui accompagne les familles de la recherche d'un établissement jusqu'à la mise en relation.",
    services: [brand, uiux, dev],
    tools: ["Figma", "Webflow", "Odoo"],
    about:
      "Place des Aînés aide les familles à trouver un établissement adapté pour un proche dépendant, avec des conseillers qui qualifient chaque demande.",
    context:
      "Trouver un établissement reste un parcours éprouvant : sources multiples, offres hétérogènes, démarches en urgence. L'ambition était de créer bien plus qu'un annuaire : un véritable outil d'accompagnement.",
    challenges: [
      "Un parcours rassurant pour des publics peu digitalisés",
      "Plusieurs centaines d'établissements dans une seule base",
      "Un workflow de mise en relation piloté depuis une interface unique",
    ],
    timeline: { design: 6, dev: 14 },
    approach: [
      {
        title: "Recherche & stratégie",
        text: "Immersion dans le secteur médico-social : la plupart des outils s'arrêtent à la recherche. Nous avons placé les conseillers au cœur de la qualification.",
      },
      {
        title: "Architecture produit",
        text: "Trois parcours distincts qui alimentent un seul workflow de mise en relation, avec statuts, notifications et traçabilité à chaque étape.",
        points: ["Familles en recherche d'accompagnement", "Familles intéressées par un établissement", "Établissements qui rejoignent le réseau"],
      },
      {
        title: "Branding & UX/UI",
        text: "Avec la brand designer Claire Pinot, une identité qui parle des familles avant de parler d'administratif, et des espaces connectés qui montrent l'avancement de chaque dossier.",
      },
      {
        title: "Webflow + Odoo & automatisations",
        text: "Webflow pour le site public et le CMS, Odoo comme CRM, back-office et moteur de matching, synchronisés par des intégrations sur mesure.",
        points: ["Création des dossiers et des comptes", "Notifications et suivi des transmissions", "Plusieurs dizaines d'automatisations métier"],
      },
    ],
    results: {
      text: "L'intégralité du parcours de mise en relation est digitalisée, tout en gardant un contrôle humain sur chaque décision de matching.",
      metrics: [
        { value: "150", label: "nouvelles demandes familles par mois" },
        { value: "48 h", label: "délai moyen de mise en relation" },
        { value: "3", label: "espaces connectés : familles, établissements, équipe" },
      ],
    },
  },
  {
    slug: "leapmotor",
    summary: "Lancement digital bilingue anglais/khmer pour la mobilité électrique premium au Cambodge.",
    services: [uiux, dev],
    tools: ["Figma", "Webflow", "Client-First"],
    about:
      "Leapmotor conçoit des véhicules électriques intelligents, du SUV familial C10 à la citadine T03, alliant haute technologie, design premium et durabilité.",
    context:
      "Le Cambodge amorce sa transition électrique. Via son distributeur local, Leapmotor voulait transposer son univers premium sur un site adapté au marché, sans trahir le design system international.",
    challenges: [
      "Respecter le design system mondial de la marque",
      "Un site entièrement bilingue anglais et khmer",
      "Présenter la gamme de façon immersive",
    ],
    timeline: { design: 4, dev: 8 },
    approach: [
      {
        title: "Recherche & stratégie",
        text: "Analyse du positionnement international de Leapmotor et benchmark des sites automobiles premium d'Asie du Sud-Est.",
      },
      {
        title: "UI & maquettes bilingues",
        text: "Chaque écran décliné en anglais et en khmer dès la maquette, pour anticiper hauteurs de ligne et espacements, et guider vers la demande d'essai.",
      },
      {
        title: "Développement Webflow",
        text: "Framework Client-First, bilinguisme natif, animations fluides et rendu typographique khmer soigné, pour 1,2 seconde de chargement.",
      },
    ],
    results: {
      text: "Une vitrine premium et crédible, fidèle à la marque et adaptée au marché local, que les équipes gèrent en autonomie.",
      metrics: [
        { value: "320", label: "demandes d'essai en 3 mois" },
        { value: "+48 %", label: "de trafic en 3 mois" },
        { value: "54 %", label: "des pages vues en khmer" },
      ],
    },
    testimonial: {
      quote:
        "L'expérience avec Techflow a été excellente. Le travail a été rapide, réactif et efficace. Ils ont formulé d'excellentes recommandations pour le projet et assurent un bon suivi jusqu'à présent.",
      name: "Sorya Pum",
      role: "Managing Director @TF Motors Cambodia",
      photo: "/images/people/sorya-pum.webp",
    },
  },
  {
    slug: "little-green-spark",
    summary: "Une identité de marque et un site pour rendre le zéro déchet désirable.",
    services: [brand, uiux, dev],
    tools: ["Figma", "Webflow"],
    about:
      "Entreprise sociale cambodgienne née en 2021, Little Green Spark accompagne entreprises, ONG et écoles dans la réduction de leurs déchets : coaching, audit et formation.",
    context:
      "Les déchets sont un sujet essentiel mais ingrat, souvent perçu comme technique ou moralisateur. Il fallait prouver une vraie crédibilité technique tout en rendant le sujet chaleureux, engageant et même amusant.",
    challenges: [
      "Asseoir une crédibilité technique réelle",
      "Rendre un sujet austère chaleureux",
      "Convaincre directions et équipes de terrain",
    ],
    timeline: { design: 4, dev: 5 },
    approach: [
      {
        title: "Branding & UX/UI",
        text: "Une marque au ton léger et optimiste, qui parle de déchets sans jamais être ennuyeuse, et des parcours qui mènent vers les offres de coaching, d'audit et de formation.",
      },
      {
        title: "Développement Webflow & CMS",
        text: "Un CMS pour publier études de cas, ressources et formations en autonomie, des pages légères pensées pour une audience majoritairement mobile, et un formulaire de devis simplifié.",
      },
    ],
    results: {
      text: "Little Green Spark se différencie nettement dans un secteur à la communication austère, et convertit mieux vers ses offres.",
      metrics: [
        { value: "15", label: "demandes de devis par mois" },
        { value: "9 %", label: "de conversion sur les pages formation" },
        { value: "9", label: "semaines, de la marque au site" },
      ],
    },
    testimonial: {
      quote:
        "Le nouveau site est visuellement attrayant, convivial et a considérablement amélioré ma présence en ligne. J'ai reçu de nombreux compliments sur son design et ses fonctionnalités.",
      name: "Sarah Kolbenstetter",
      role: "Founder @Little Green Spark",
    },
  },
  {
    slug: "ama-campus",
    summary: "Refonte digitale d'un organisme de formation certifié Qualiopi, spécialisé petite enfance et service à la personne.",
    services: [brand, uiux, dev],
    tools: ["Figma", "Webflow", "Finsweet", "Make"],
    about:
      "Marque du groupe Studi, AMA Campus propose plus de 60 formations en ligne : petite enfance, service à la personne, diététique. 2 408 apprenants formés en 2024.",
    context:
      "Des indicateurs solides, mais un site WordPress fragmenté sur plusieurs sous-domaines : catalogue difficile à parcourir, financements peu visibles, identité trop générique face aux plateformes généralistes.",
    challenges: [
      "Rendre un catalogue de 60+ formations facile à explorer",
      "Rendre les financements (CPF, OPCO…) compréhensibles",
      "Allier chaleur du secteur et sérieux Qualiopi",
    ],
    timeline: { design: 4, dev: 12 },
    approach: [
      {
        title: "Recherche & stratégie",
        text: "Benchmark des spécialistes et des généralistes du e-learning : navigation confuse et financements mal expliqués chez la majorité des concurrents.",
      },
      {
        title: "Branding & identité visuelle",
        text: "Une palette douce et structurée, une typographie lisible et professionnelle, des éléments graphiques chaleureux.",
      },
      {
        title: "Maquettes UX/UI",
        text: "Un parcours qui mène chaque profil du catalogue à l'inscription, avec une section financement dédiée et des preuves de confiance visibles.",
        points: ["Catalogue organisé par thématique", "Entrées par dispositif de financement", "Qualiopi et 4,8/5 sur 600+ avis Google"],
      },
      {
        title: "Développement Webflow & CMS",
        text: "Architecture CMS repensée avec Finsweet pour filtrer le catalogue, formulaires reliés à deux CRM via Make, migration et SEO technique.",
      },
    ],
    results: {
      text: "Chaque apprenant trouve rapidement la bonne formation et comprend comment la financer, ce qui se voit directement dans les inscriptions.",
      metrics: [
        { value: "+54", label: "inscriptions supplémentaires par mois" },
        { value: "+38 %", label: "de trafic en 6 mois" },
        { value: "1,1 s", label: "de chargement, contre 3,6 s avant" },
      ],
    },
  },
  {
    slug: "opco-ep",
    summary: "Un mini-site animé pour présenter les missions et les résultats annuels d'Opco EP.",
    services: [dev],
    tools: ["Webflow", "Client-First", "GSAP"],
    about:
      "Opco EP est un opérateur de compétences qui accompagne 54 branches professionnelles, 442 700 entreprises et plus de 2,5 millions de salariés.",
    context:
      "Avec l'agence EPOKA, auteure du branding et des maquettes, et le groupe Mantu, nous avons développé un rapport annuel animé de 16 pages sur Webflow.",
    challenges: [
      "Transformer un rapport institutionnel en expérience immersive",
      "Rythmer la lecture par des animations au scroll",
      "Rendre lisible une forte densité de chiffres",
    ],
    timeline: { design: 0, dev: 6 },
    approach: [
      {
        title: "Analyse & cadrage technique",
        text: "Étude des maquettes EPOKA et benchmark des meilleurs rapports annuels animés pour calibrer l'expérience.",
      },
      {
        title: "Intégration Webflow",
        text: "Une base Client-First pixel-perfect, une navigation fluide entre les sections et un responsive optimisé.",
      },
      {
        title: "Animations GSAP",
        text: "Le cœur du projet : chiffres animés, reveals, parallax synchronisé au scroll et animations SVG sur mesure.",
      },
    ],
    results: {
      text: "Un contenu institutionnel devenu une lecture dynamique, qui valorise l'impact national d'Opco EP.",
      metrics: [
        { value: "16", label: "pages animées" },
        { value: "6", label: "semaines de développement" },
        { value: "2,5 M", label: "salariés accompagnés en 2025" },
      ],
    },
  },
  {
    slug: "epargne-plurielle",
    summary: "Refonte digitale d'un cabinet indépendant de conseil en gestion de patrimoine, fort de 15 ans d'expérience.",
    services: [brand, uiux, dev],
    tools: ["Figma", "Webflow", "Google Calendar"],
    about:
      "Épargne Plurielle Avenir accompagne particuliers et professionnels : assurance vie luxembourgeoise, SCPI, private equity, optimisation fiscale. En architecture ouverte, sans lien avec une banque.",
    context:
      "Les clients choisissent désormais leur conseiller en ligne. Le positionnement indépendant d'EPA était une vraie force, mais restait incompréhensible pour un prospect non averti.",
    challenges: [
      "Rendre accessible une offre patrimoniale pointue",
      "Exister face aux banques et aux fintechs",
      "Une image moderne, élégante et rassurante",
    ],
    timeline: { design: 3, dev: 6 },
    approach: [
      {
        title: "Recherche & stratégie",
        text: "Benchmark des CGP en France : offres illisibles, identités vieillissantes, parcours rarement pensés pour convertir.",
      },
      {
        title: "Branding & identité visuelle",
        text: "Une palette profonde et élégante, une typographie claire et des éléments graphiques fluides, pour un premium accessible.",
      },
      {
        title: "Maquettes UX/UI",
        text: "Des services organisés par besoin client, et un parcours qui mène de la découverte à la prise de rendez-vous.",
        points: ["Optimiser, investir, transmettre, protéger", "Pages pédagogiques par solution", "Une équipe mise en avant"],
      },
      {
        title: "Développement Webflow & CMS",
        text: "Prise de rendez-vous intégrée à Google Calendar, CMS pour les actualités et SEO technique complet.",
      },
    ],
    results: {
      text: "L'audit gratuit est accessible depuis toutes les pages clés, et le site est devenu la première source de rendez-vous du cabinet.",
      metrics: [
        { value: "12 %", label: "de conversion sur les pages clés" },
        { value: "×3", label: "demandes d'audit : 18 par mois contre 6" },
        { value: "1,4 s", label: "temps de chargement moyen" },
      ],
    },
  },
  {
    slug: "exelmans",
    summary: "Refonte de marque et site web premium pour un cabinet d'audit et de conseil financier.",
    services: [brand, uiux, dev],
    tools: ["Figma", "Webflow", "Screaming Frog"],
    about:
      "Près de 20 ans d'expérience, 12 associés et plus de 100 collaborateurs : Exelmans est une référence du Transaction Services, de la Valuation et du Restructuring.",
    context:
      "Le site historique, très classique, ne reflétait plus l'ambition du cabinet. Il fallait moderniser la marque, renforcer la marque employeur et refondre tout l'écosystème digital sans perdre le SEO.",
    challenges: [
      "Adopter les codes de l'audit et du private equity",
      "Attirer les meilleurs talents",
      "Migrer sans impacter le référencement",
    ],
    timeline: { design: 4, dev: 9 },
    approach: [
      {
        title: "Recherche & stratégie",
        text: "Benchmark audit et finance, en France et à l'international, pour un positionnement sérieux mais jamais austère.",
      },
      {
        title: "Branding & identité visuelle",
        text: "Une palette vert profond, une typographie statutaire et des lignes graphiques qui évoquent la rigueur et l'analyse.",
      },
      {
        title: "Maquettes UX/UI",
        text: "Pages d'expertise hiérarchisées, fiches associés, blog réorganisé et un espace RH au service de la marque employeur.",
      },
      {
        title: "Développement Webflow & CMS",
        text: "Animations fines, CMS pour associés, expertises, articles et offres d'emploi, migration propre et redirections 301.",
      },
    ],
    results: {
      text: "Une identité au niveau des standards du private equity, un SEO conservé, et un site entièrement administrable par les équipes.",
      metrics: [
        { value: "11", label: "candidatures et contacts par mois" },
        { value: "1,3 s", label: "temps de chargement moyen" },
        { value: "13", label: "semaines, de la marque au site" },
      ],
    },
  },
  {
    slug: "district-6",
    summary: "Refonte digitale pour un groupe indépendant de publication musicale au rayonnement international.",
    services: [uiux, dev],
    tools: ["Figma", "Webflow"],
    about:
      "District 6 réunit deux maisons d'édition, à Londres et à Paris, et gère plus de 80 000 copyrights dans plus de 40 pays, d'Ofenbach à Ultra Music.",
    context:
      "Il leur fallait un site moderne et fonctionnel à la hauteur de leur portée internationale, qui souligne créativité et modernité, à partir de l'identité conçue par FakePaper.",
    challenges: [
      "Refléter une envergure mondiale",
      "Rester simple pour artistes, labels et partenaires",
      "Respecter une identité existante",
    ],
    timeline: { design: 3, dev: 5 },
    approach: [
      {
        title: "Recherche & stratégie",
        text: "Étude de leur audience internationale et ajustement des angles de communication autour de la gestion des droits.",
      },
      {
        title: "Maquettes UX/UI",
        text: "Une interface élégante et fonctionnelle, fidèle à l'univers FakePaper, avec des interactions créatives pour découvrir artistes et catalogues.",
      },
      {
        title: "Développement Webflow",
        text: "Chaque détail de l'identité intégré, un responsive complet et des tests rigoureux pour une navigation rapide et sans bug.",
      },
    ],
    results: {
      text: "La plateforme est devenue un outil essentiel pour promouvoir leur catalogue auprès de partenaires dans plus de 40 pays.",
      metrics: [
        { value: "6", label: "demandes de contact par mois" },
        { value: "1,4 s", label: "temps de chargement moyen" },
        { value: "40+", label: "pays couverts par le catalogue" },
      ],
    },
    testimonial: {
      quote: "Nous avons été pleinement satisfaits de cette collaboration. Le suivi était vraiment pro jusqu'au bout.",
      name: "David Bossan",
      role: "Directeur Général @District 6 Publishing",
      photo: "/images/people/david-bossan.webp",
    },
  },
  {
    slug: "tandem-partners",
    summary: "Refonte de l'identité digitale d'un groupe d'investissement franco-asiatique : 18 entreprises en portefeuille, 120 M€ investis.",
    services: [brand, uiux, dev],
    tools: ["Figma", "Webflow"],
    about:
      "Fondé en 2015, Tandem Partners est un groupe d'investissement diversifié qui opère entre la France et l'Asie, à travers cinq entités distinctes.",
    context:
      "Il fallait présenter clairement cinq entités d'investissement tout en gardant une image sophistiquée, et refléter la position unique du groupe entre cultures française et asiatique.",
    challenges: [
      "Structurer cinq entités sans perdre la cohérence",
      "Allier professionnalisme financier et créativité",
      "Incarner le pont entre l'Europe et l'Asie",
    ],
    timeline: { design: 4, dev: 7 },
    approach: [
      {
        title: "Recherche & stratégie",
        text: "Étude de la communication des fonds multi-expertises, pour un positionnement centré sur le pont Europe-Asie.",
      },
      {
        title: "Branding & identité visuelle",
        text: "Une élégance financière relevée de touches créatives, qui distingue chaque entité tout en gardant une cohérence globale.",
      },
      {
        title: "Maquettes UX/UI",
        text: "Une navigation qui fait comprendre en quelques secondes chaque entité et son expertise.",
      },
      {
        title: "Développement Webflow & CMS",
        text: "Une présentation dynamique du portefeuille, des transitions subtiles et une attention forte au mobile pour une audience internationale.",
      },
    ],
    results: {
      text: "Le site consolide l'image d'un acteur innovant, capable de connecter les marchés européens et asiatiques.",
      metrics: [
        { value: "6 %", label: "de conversion sur les pages entités" },
        { value: "1,3 s", label: "temps de chargement moyen" },
        { value: "5", label: "entités réunies sur un seul site" },
      ],
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
