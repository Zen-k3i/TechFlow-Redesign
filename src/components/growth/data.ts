export type Platform = "instagram" | "facebook" | "tiktok";

export type AdVideo = {
  id: string;
  angle: string;
  hook: string;
  caption: string;
  cta: string;
  duration: string;
  /** Drop the file in /public and point to it; a designed poster is shown until it exists. */
  src?: string;
  poster?: string;
  script: { time: string; beat: string; line: string }[];
};

export type FunnelVisual = "hook" | "reach" | "test" | "score" | "close";

export type FunnelStage = {
  verb: string;
  /** What the funnel holds at this stage, e.g. "Impressions". */
  level: string;
  kpi: string;
  title: string;
  text: string;
  deliverables: string[];
  visual: FunnelVisual;
};

export type GrowthCaseStudy = {
  slug: string;
  client: string;
  handle: string;
  title: string;
  tagline: string;
  intro: string;
  accent: string;
  meta: { label: string; value: string }[];
  services: string[];
  status: string;
  deliverables: { value: string; label: string }[];
  facts: { value: string; label: string }[];
  factsSource: { label: string; href: string };
  challenge: { title: string; text: string; points: { title: string; text: string }[] };
  ads: AdVideo[];
  community: {
    perWeek: number;
    calendar: { day: string; format: string; title: string }[];
    thread: { author: string; text: string; reply: string }[];
  };
  funnel: {
    stages: FunnelStage[];
    /** `ads` are indexes into `ads`. */
    audiences: { name: string; ads: number[] }[];
    scoring: { label: string; points: number; met: boolean }[];
    booking: { title: string; when: string; interest: string; sourceAd: number };
  };
  /** Leave empty while the campaign is running; the page then shows the KPIs being tracked instead. */
  results: { value: string; label: string }[];
};

export const growthCaseStudies: GrowthCaseStudy[] = [
  {
    slug: "gato-tower",
    client: "G.A.T.O Tower",
    handle: "gatotower",
    title: "Vendre du luxe sur plan, une vidéo à la fois.",
    tagline: "Growth marketing · Immobilier de luxe · Phnom Penh",
    intro:
      "Une tour de 67 étages qui n'existe pas encore, et des acheteurs à convaincre dès maintenant. Nous avons conçu, tourné et diffusé cinq publicités vidéo, puis branché chaque lead sur un système de scoring qui alimente directement l'équipe commerciale.",
    accent: "#c9a45c",
    meta: [
      { label: "Client", value: "Miraku Capital & Development" },
      { label: "Projet", value: "G.A.T.O Tower, BKK1" },
      { label: "Marché", value: "Appartements sur plan" },
      { label: "Canaux", value: "Facebook, Instagram, TikTok" },
    ],
    services: [
      "Stratégie créative",
      "Scripts & copywriting",
      "Tournage & post-production",
      "Media buying",
      "A/B testing",
      "Lead scoring",
      "Community management",
    ],
    status: "Campagne en cours",
    deliverables: [
      { value: "5", label: "publicités vidéo" },
      { value: "~1 min", label: "par vidéo, format 9:16" },
      { value: "3", label: "publications par semaine" },
      { value: "A/B", label: "tests & ajustements en continu" },
    ],
    facts: [
      { value: "67", label: "étages" },
      { value: "296 m", label: "de hauteur" },
      { value: "472", label: "résidences" },
      { value: "T4 2030", label: "livraison prévue" },
    ],
    factsSource: { label: "realestate.com.kh", href: "https://www.realestate.com.kh/news/miraku-capital-and-development-launches-gato-tower-bkk1/" },
    challenge: {
      title: "Rien à visiter, tout à prouver.",
      text: "Sur plan, l'acheteur n'achète pas des mètres carrés : il achète une promesse. Il faut lui faire ressentir la vue, les finitions et le quartier avant qu'une seule pierre ne soit posée, puis ne transmettre aux commerciaux que les personnes réellement prêtes à acheter.",
      points: [
        {
          title: "Un cycle de décision long",
          text: "Un achat à six chiffres se mûrit sur plusieurs semaines. La campagne doit rester présente à chaque étape, sans lasser.",
        },
        {
          title: "Deux publics, deux discours",
          text: "Les résidents cherchent un art de vivre, les investisseurs un rendement. Chaque vidéo parle à l'un ou à l'autre.",
        },
        {
          title: "Du volume, mais qualifié",
          text: "Mille formulaires ne valent rien si l'équipe commerciale passe ses journées à rappeler des curieux.",
        },
      ],
    },
    ads: [
      {
        id: "ad-01",
        angle: "La vue",
        hook: "Imagine waking up to this view. From the 60th floor.",
        caption: "Phnom Penh like you've never seen it. Discover G.A.T.O Tower, in the heart of BKK1.",
        cta: "Learn more",
        duration: "0:58",
        src: "/videos/gato-tower/ad-01.mp4",
        script: [
          { time: "0–3 s", beat: "Hook", line: "Plan drone qui s'élève au-dessus de BKK1, texte : « 60ᵉ étage. »" },
          { time: "3–20 s", beat: "Désir", line: "Lever de soleil, Mékong à l'horizon, intérieur baigné de lumière." },
          { time: "20–45 s", beat: "Preuve", line: "67 étages, 296 m, standards de construction japonais." },
          { time: "45–58 s", beat: "Action", line: "« Réservez votre visite de la galerie de vente. »" },
        ],
      },
      {
        id: "ad-02",
        angle: "L'investissement",
        hook: "Why smart investors buy off-plan in BKK1.",
        caption: "Studios, 1 to 3 bedrooms and penthouses: a rare asset in the city's most sought-after district.",
        cta: "Send message",
        duration: "1:02",
        src: "/videos/gato-tower/ad-02.mp4",
        script: [
          { time: "0–3 s", beat: "Hook", line: "Face caméra : « Voici pourquoi on achète avant la construction. »" },
          { time: "3–25 s", beat: "Logique", line: "Prix de lancement, échéancier de paiement, demande locative." },
          { time: "25–50 s", beat: "Preuve", line: "Emplacement BKK1, promoteur nippo-cambodgien, livraison 2030." },
          { time: "50–62 s", beat: "Action", line: "« Recevez la grille des prix sur WhatsApp. »" },
        ],
      },
      {
        id: "ad-03",
        angle: "L'art de vivre",
        hook: "Infinity pool. Skybar. And you.",
        caption: "An address designed for living, hosting and unwinding. Above the city.",
        cta: "Learn more",
        duration: "0:55",
        src: "/videos/gato-tower/ad-03.mp4",
        script: [
          { time: "0–3 s", beat: "Hook", line: "Plongeon au ralenti, coupe nette sur la ville au crépuscule." },
          { time: "3–30 s", beat: "Désir", line: "Journée type : salle de sport, coworking, dîner au skybar." },
          { time: "30–45 s", beat: "Preuve", line: "Liste des équipements, rendu des espaces communs." },
          { time: "45–55 s", beat: "Action", line: "« Découvrez les résidences disponibles. »" },
        ],
      },
      {
        id: "ad-04",
        angle: "Les finitions",
        hook: "Japanese precision, down to the last detail.",
        caption: "Materials, layouts, ceiling heights: tour the show apartment from your phone.",
        cta: "Book a visit",
        duration: "1:00",
        src: "/videos/gato-tower/ad-04.mp4",
        script: [
          { time: "0–3 s", beat: "Hook", line: "Gros plan macro sur une poignée, un joint, une texture." },
          { time: "3–30 s", beat: "Désir", line: "Visite guidée de l'appartement témoin, lumière naturelle." },
          { time: "30–48 s", beat: "Preuve", line: "Plans, surfaces, balcons privés, vues dégagées." },
          { time: "48–60 s", beat: "Action", line: "« Réservez votre visite privée. »" },
        ],
      },
      {
        id: "ad-05",
        angle: "Le quartier",
        hook: "Everything that matters in Phnom Penh. Five minutes away.",
        caption: "Embassies, restaurants, international schools: BKK1, at Norodom Blvd and Street 334.",
        cta: "Learn more",
        duration: "0:57",
        src: "/videos/gato-tower/ad-05.mp4",
        script: [
          { time: "0–3 s", beat: "Hook", line: "Timelapse de Norodom Boulevard, compteur « 5 min »." },
          { time: "3–30 s", beat: "Désir", line: "Cafés, écoles, commerces : le quotidien autour de la tour." },
          { time: "30–45 s", beat: "Preuve", line: "Carte animée des points d'intérêt autour de la tour." },
          { time: "45–57 s", beat: "Action", line: "« Parlez à un conseiller dès aujourd'hui. »" },
        ],
      },
    ],
    community: {
      perWeek: 3,
      calendar: [
        { day: "Lundi", format: "Reel", title: "Avancement du chantier" },
        { day: "Mercredi", format: "Carrousel", title: "Focus sur un plan d'appartement" },
        { day: "Vendredi", format: "Story + post", title: "Vie de quartier à BKK1" },
      ],
      thread: [
        {
          author: "sokha.invest",
          text: "What's the payment plan for a 2-bedroom?",
          reply: "Great question! We've sent you the full payment schedule by message 🙏",
        },
        {
          author: "claire_pp",
          text: "Is the showroom open on weekends?",
          reply: "Yes, every day from 9am to 6pm on Norodom Blvd. Want us to book you a slot?",
        },
        {
          author: "dara.k",
          text: "The view from the top floors looks incredible 😍",
          reply: "Wait until you see it at sunset 🌇 Penthouse tours are available by appointment.",
        },
      ],
    },
    funnel: {
      stages: [
        {
          verb: "Accrocher",
          level: "Impressions",
          kpi: "Taux de visionnage à 3 s",
          title: "3 secondes pour arrêter le pouce.",
          text: "Cinq vidéos d'une minute, chacune construite sur une raison d'acheter : la vue, le rendement, l'art de vivre, les finitions, le quartier.",
          deliverables: ["5 scripts hook → preuve → action", "Tournage et post-production", "Formats 9:16 sous-titrés"],
          visual: "hook",
        },
        {
          verb: "Diffuser",
          level: "Vues engagées",
          kpi: "Coût par vue engagée",
          title: "Le bon message, au bon acheteur.",
          text: "Les résidents voient un art de vivre, les investisseurs un rendement. Même tour, deux discours, trois plateformes.",
          deliverables: ["Audiences résidents et investisseurs", "Facebook, Instagram, TikTok", "Retargeting des spectateurs"],
          visual: "reach",
        },
        {
          verb: "Tester",
          level: "Clics & messages",
          kpi: "Coût par lead",
          title: "Le budget suit ce qui convertit.",
          text: "Chaque accroche tourne en plusieurs versions. Chaque semaine, on coupe la plus chère et on renforce la gagnante.",
          deliverables: ["A/B tests d'accroches et de textes", "Suivi quotidien des performances", "Réallocation hebdomadaire du budget"],
          visual: "test",
        },
        {
          verb: "Qualifier",
          level: "Leads scorés",
          kpi: "Taux de qualification",
          title: "Les commerciaux n'appellent que les acheteurs.",
          text: "Budget, délai, engagement : chaque contact reçoit un score de 0 à 100. Les tièdes sont relancés automatiquement, les froids repartent en retargeting.",
          deliverables: ["Grille de scoring sur mesure", "Relances WhatsApp automatiques", "Retour des commerciaux sur le ciblage"],
          visual: "score",
        },
        {
          verb: "Closer",
          level: "Rendez-vous",
          kpi: "Coût par rendez-vous",
          title: "Un rendez-vous à la galerie de vente.",
          text: "Le lead chaud arrive chez le commercial avec tout son contexte. Entre-temps, trois publications par semaine entretiennent la relation.",
          deliverables: ["Transmission au CRM en temps réel", "3 publications par semaine", "Réponse à chaque commentaire"],
          visual: "close",
        },
      ],
      audiences: [
        { name: "Futurs résidents", ads: [0, 2, 4] },
        { name: "Investisseurs", ads: [1, 3] },
      ],
      scoring: [
        { label: "Budget compatible", points: 30, met: true },
        { label: "Achat sous 6 mois", points: 25, met: true },
        { label: "Répond sur WhatsApp", points: 20, met: true },
        { label: "Vidéo vue à plus de 75 %", points: 15, met: true },
        { label: "Profil ciblé", points: 10, met: false },
      ],
      booking: {
        title: "Visite de la galerie de vente",
        when: "Samedi · 10:00 · Norodom Blvd",
        interest: "2 chambres, investisseur",
        sourceAd: 1,
      },
    },
    results: [],
  },
];

export const getGrowthCaseStudy = (slug: string) => growthCaseStudies.find((c) => c.slug === slug);
