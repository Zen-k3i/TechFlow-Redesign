/**
 * Seed (2026-10-02): the G.A.T.O Tower growth case study, in French and English, as linked
 * `growthCaseStudy` documents. Copy comes from the page that used to be coded in
 * src/components/growth/data.ts, with the building facts updated from the developer's site
 * (gato-tower-cambodia.com). Results and testimonial are "[TBD]" placeholders: the site never
 * shows a value containing "TBD". The A/B figures and example leads are illustrative and labelled so.
 *
 *   npx sanity exec scripts/seed-growth-gato.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/seed-growth-gato.ts --with-user-token
 *   npx sanity exec scripts/seed-growth-gato.ts --with-user-token -- --replace   (overwrites Studio edits)
 *
 * Fixed ids (`growth-gato-tower-<lang>`); without --replace, existing documents only get the fields
 * they don't have yet (setIfMissing), so Studio edits are safe.
 * No video files: upload the 5 MP4s (and posters) in the Studio.
 */
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.argv.includes('--dry-run')
const REPLACE = process.argv.includes('--replace')
const client = getCliClient({apiVersion: '2026-09-29'})

type Lang = 'fr' | 'en'
const TBD = '[TBD]'

let n = 0
const key = () => `k${(++n).toString(36)}`
/** Adds `_key` (and `_type` when given) to each array item. */
const keyed = <T extends object>(items: T[], _type?: string) => items.map((item) => ({_key: key(), ...(_type ? {_type} : {}), ...item}))
const metrics = (items: [string, string][]) => keyed(items.map(([value, label]) => ({value, label})), 'metric')
const beats = (items: [string, string, string][]) => keyed(items.map(([time, beat, line]) => ({time, beat, line})), 'scriptBeat')

const shared = {
  _type: 'growthCaseStudy',
  title: 'G.A.T.O Tower',
  slug: {_type: 'slug', current: 'gato-tower'},
  accentColor: '#c9a45c',
  handle: 'gatotowerofficial',
  order: 0,
  channels: ['Facebook', 'Instagram', 'TikTok'],
}

/** Project-style details (card, tags), per language; the sector is the existing "Real estate" one. */
const details: Record<Lang, Record<string, unknown>> = {
  fr: {
    summary: 'Cinq publicités vidéo, des A/B tests en continu et un lead scoring branché sur les commerciaux, pour vendre sur plan une tour de luxe de 67 étages à Phnom Penh.',
    sectors: [{_key: 'real-estate', _type: 'reference', _ref: 'sector-fr-real-estate'}],
    services: ['Publicités vidéo', 'Scripts & copywriting', 'A/B testing', 'Lead scoring', 'Community management'],
  },
  en: {
    summary: 'Five video ads, ongoing A/B tests and lead scoring wired to the sales team, to sell a 67-storey off-plan luxury tower in Phnom Penh.',
    sectors: [{_key: 'real-estate', _type: 'reference', _ref: 'sector-en-real-estate'}],
    services: ['Video ads', 'Scripts & copywriting', 'A/B testing', 'Lead scoring', 'Community management'],
  },
}

const content: Record<Lang, Record<string, unknown>> = {
  fr: {
    hero: {
      tagline: 'Growth marketing · Immobilier de luxe · Phnom Penh',
      headline: 'Vendre du luxe sur plan, une vidéo à la fois.',
      intro:
        "Une tour de 67 étages qui n'existe pas encore, et des acheteurs à convaincre dès maintenant. Nous avons conçu, tourné et diffusé cinq publicités vidéo, puis branché chaque lead sur un système de scoring qui alimente directement l'équipe commerciale.",
      status: 'Campagne en cours sur Facebook, Instagram et TikTok',
      ctaLabel: 'Lancer ma campagne',
      stats: metrics([
        ['5', 'publicités vidéo'],
        ['~1 min', 'par vidéo, format 9:16'],
        ['3', 'publications par semaine'],
        ['A/B', 'tests et ajustements en continu'],
      ]),
    },
    challenge: {
      heading: 'Rien à visiter, *tout à prouver.*',
      text: "Sur plan, l'acheteur n'achète pas des mètres carrés : il achète une promesse. Il faut lui faire ressentir la vue, les finitions et le quartier avant qu'une seule pierre ne soit posée, puis ne transmettre aux commerciaux que les personnes réellement prêtes à acheter.",
      points: keyed(
        [
          {title: 'Un cycle de décision long', text: 'Un achat à six chiffres se mûrit sur plusieurs semaines. La campagne doit rester présente à chaque étape, sans lasser.'},
          {title: 'Deux publics, deux discours', text: "Les résidents cherchent un art de vivre, les investisseurs un rendement. Chaque vidéo parle à l'un ou à l'autre."},
          {title: 'Du volume, mais qualifié', text: 'Mille formulaires ne valent rien si les commerciaux passent leurs journées à rappeler des curieux.'},
        ],
        'benefit',
      ),
    },
    client: {
      meta: keyed(
        [
          {label: 'Promoteur', value: 'Miraku Capital Group'},
          {label: 'Projet', value: 'G.A.T.O Tower, BKK1'},
          {label: 'Marché', value: 'Appartements sur plan, pleine propriété'},
        ],
        'labelValue',
      ),
      facts: metrics([
        ['67', 'étages'],
        ['297 m', 'de hauteur'],
        ['650+', 'appartements'],
        ['Déc. 2030', 'livraison prévue'],
      ]),
      sourceLabel: 'gato-tower-cambodia.com',
      sourceUrl: 'https://gato-tower-cambodia.com/',
    },
    funnel: {
      heading: 'De la vidéo *à la vente.*',
      intro: "Une seule équipe, six étapes, chacune mesurée par un indicateur précis. Rien ne se perd entre l'agence créative et le media buyer : c'est la même.",
      stages: keyed(
        [
          {
            name: 'Stratégie',
            icon: 'strategy',
            title: 'Qui achète, et pourquoi.',
            text: "Audiences, angles d'achat et offre de conversion sont fixés avant d'écrire une ligne, puis les scripts suivent.",
            tasks: ['Personas résidents et investisseurs', "Cinq angles d'achat", 'Scripts et copywriting'],
            kpi: 'Scripts validés',
            section: 'creative',
          },
          {
            name: 'Production',
            icon: 'production',
            title: 'Cinq vidéos pensées pour le pouce.',
            text: "Tournage, montage, étalonnage et sous-titres : cinq vidéos d'environ une minute, au format vertical.",
            tasks: ['Tournage sur site et en galerie de vente', 'Montage et post-production', 'Sous-titres, format 9:16'],
            kpi: 'Taux de visionnage à 3 s',
            section: 'ads',
          },
          {
            name: 'Lancement',
            icon: 'launch',
            title: 'Plusieurs versions, en même temps.',
            text: 'Chaque accroche tourne en plusieurs versions, sur trois plateformes, auprès de deux audiences.',
            tasks: ["A/B tests d'accroches et de textes", 'Audiences résidents et investisseurs', 'Retargeting des spectateurs'],
            kpi: 'Coût par lead',
            section: 'abTest',
          },
          {
            name: 'Optimisation',
            icon: 'optimize',
            title: 'Le budget suit ce qui convertit.',
            text: 'Suivi quotidien, réallocation chaque semaine : on coupe la version la plus chère et on renforce la gagnante.',
            tasks: ['Suivi quotidien des performances', 'Réallocation hebdomadaire du budget', 'Nouvelles accroches en test'],
            kpi: 'Coût par lead qualifié',
            section: 'abTest',
          },
          {
            name: 'Scoring',
            icon: 'score',
            title: "Les commerciaux n'appellent que les acheteurs.",
            text: 'Budget, délai, engagement : chaque contact reçoit un score de 0 à 100.',
            tasks: ['Grille de scoring sur mesure', 'Relances WhatsApp automatiques', 'Leads froids renvoyés en retargeting'],
            kpi: 'Taux de qualification',
            section: 'leads',
          },
          {
            name: 'Ventes',
            icon: 'sales',
            title: 'Un rendez-vous à la galerie de vente.',
            text: "Le lead chaud arrive chez le commercial avec tout son contexte, et ses retours affinent le ciblage.",
            tasks: ['Transmission au CRM en temps réel', 'Vidéo source, intérêt et score joints', 'Boucle de retour vers le ciblage'],
            kpi: 'Coût par rendez-vous',
            section: 'leads',
          },
        ],
        'funnelStage',
      ),
    },
    creative: {
      heading: "Cinq raisons d'acheter, *cinq accroches.*",
      intro: 'Chaque vidéo défend un seul argument et le pose dans les trois premières secondes. Le script suit ensuite la même structure : accroche, désir, preuve, action.',
    },
    adsSection: {
      heading: 'Les publicités, *telles qu’elles passent.*',
      intro: "Cliquez sur un écran pour regarder la vidéo avec le son, lire son script et voir ce qu'elle teste. Le sélecteur change l'interface : Instagram, Facebook ou TikTok.",
    },
    ads: keyed(
      [
        {
          angle: 'La vue',
          hook: 'Imagine waking up to this view. From the 60th floor.',
          caption: "Phnom Penh like you've never seen it. Discover G.A.T.O Tower, in the heart of BKK1.",
          cta: 'Learn more',
          platform: 'instagram',
          variant: 'Accroche émotion',
          note: "Face à l'accroche « prix » (vidéo 02) : l'émotion de la vue convertit-elle mieux auprès des futurs résidents ?",
          duration: '0:58',
          script: beats([
            ['0–3 s', 'Accroche', 'Plan drone qui s’élève au-dessus de BKK1, texte : « 60ᵉ étage. »'],
            ['3–20 s', 'Désir', 'Lever de soleil sur la ville, intérieur baigné de lumière.'],
            ['20–45 s', 'Preuve', '67 étages, 297 m, une tour signée par l’agence de l’architecte Shin Takamatsu.'],
            ['45–58 s', 'Action', '« Réservez votre visite de la galerie de vente. »'],
          ]),
        },
        {
          angle: "L'investissement",
          hook: 'Why smart investors buy off-plan in BKK1.',
          caption: 'Studios from $95,000. 20% down, 48-month payment plan, freehold, in the city’s most sought-after district.',
          cta: 'Send message',
          platform: 'facebook',
          variant: 'Accroche prix',
          note: 'Un argument rationnel (prix de lancement, échéancier) pour les investisseurs, face à l’accroche émotion.',
          duration: '1:02',
          script: beats([
            ['0–3 s', 'Accroche', 'Face caméra : « Voici pourquoi on achète avant la construction. »'],
            ['3–25 s', 'Logique', 'Studios dès 95 000 $, 20 % d’apport, paiement sur 48 mois.'],
            ['25–50 s', 'Preuve', 'Pleine propriété, BKK1, gestion locative possible, livraison fin 2030.'],
            ['50–62 s', 'Action', '« Recevez la grille des prix sur WhatsApp. »'],
          ]),
        },
        {
          angle: "L'art de vivre",
          hook: 'Infinity pool. 67th floor. And you.',
          caption: 'A spa on the 48th floor, an infinity pool on the 67th, coworking and a kids’ club in between.',
          cta: 'Learn more',
          platform: 'tiktok',
          variant: 'Format TikTok',
          note: 'Même argument, rythme plus rapide : le format natif TikTok contre le même montage en Reels.',
          duration: '0:55',
          script: beats([
            ['0–3 s', 'Accroche', 'Plongeon au ralenti, coupe nette sur la ville au crépuscule.'],
            ['3–30 s', 'Désir', 'Journée type : spa, coworking, dîner avec vue panoramique.'],
            ['30–45 s', 'Preuve', 'Piscine à débordement au 67ᵉ, spa au 48ᵉ, cinéma, club enfants.'],
            ['45–55 s', 'Action', '« Découvrez les résidences disponibles. »'],
          ]),
        },
        {
          angle: 'Les finitions',
          hook: 'Japanese design, down to the last detail.',
          caption: 'Materials, layouts, ceiling heights: tour the show apartment from your phone.',
          cta: 'Book a visit',
          platform: 'instagram',
          variant: 'Visite guidée',
          note: 'Une visite de l’appartement témoin pour rassurer sur la qualité, l’objection n° 1 d’un achat sur plan.',
          duration: '1:00',
          script: beats([
            ['0–3 s', 'Accroche', 'Gros plan macro sur une poignée, un joint, une texture.'],
            ['3–30 s', 'Désir', 'Visite guidée de l’appartement témoin, lumière naturelle.'],
            ['30–48 s', 'Preuve', 'Plans du studio (31 m²) au 3 chambres (93 m²), vues dégagées.'],
            ['48–60 s', 'Action', '« Réservez votre visite privée. »'],
          ]),
        },
        {
          angle: 'Le quartier',
          hook: 'Everything that matters in Phnom Penh. Minutes away.',
          caption: 'Embassies, restaurants, international schools: BKK1, 200 m from the city centre.',
          cta: 'Learn more',
          platform: 'facebook',
          variant: 'Accroche lieu',
          note: 'Le quartier comme argument principal, pour les acheteurs qui comparent plusieurs projets.',
          duration: '0:57',
          script: beats([
            ['0–3 s', 'Accroche', 'Timelapse sur BKK1, compteur « 200 m ».'],
            ['3–30 s', 'Désir', 'Cafés, écoles, commerces : le quotidien autour de la tour.'],
            ['30–45 s', 'Preuve', 'Carte animée des points d’intérêt autour de la tour.'],
            ['45–57 s', 'Action', '« Parlez à un conseiller dès aujourd’hui. »'],
          ]),
        },
      ],
      'adVideo',
    ),
    abTest: {
      heading: 'Le budget va *là où ça convertit.*',
      intro: 'Chaque vidéo tourne en plusieurs versions. On compare le coût par lead et la qualité des prospects, puis on réalloue le budget chaque semaine. Cliquez sur une semaine pour voir ce qui a été décidé.',
      illustrative: true,
      variants: keyed(
        [
          {label: 'A', hook: 'Imagine waking up to this view.', angle: 'La vue'},
          {label: 'B', hook: 'Why smart investors buy off-plan.', angle: "L'investissement"},
          {label: 'C', hook: 'Infinity pool. 67th floor. And you.', angle: "L'art de vivre"},
        ],
        'abVariant',
      ),
      weeks: keyed(
        [
          {label: 'S1', budget: [34, 33, 33], cpl: [1, 1.15, 1.6], note: 'Lancement : budget réparti à parts égales entre les trois accroches.'},
          {label: 'S2', budget: [42, 38, 20], cpl: [0.92, 1.05, 1.7], note: 'Premiers signaux : C coûte plus cher par lead, on réduit sa part.'},
          {label: 'S3', budget: [52, 40, 8], cpl: [0.85, 0.98, 1.8], note: 'A et B convertissent, C passe en test minimal.'},
          {label: 'S4', budget: [58, 42, 0], cpl: [0.8, 0.9, 0], note: 'C est coupée. Une nouvelle accroche entre en test la semaine suivante.'},
        ],
        'abWeek',
      ),
    },
    leads: {
      heading: 'Des leads, puis *les bons leads.*',
      intro: "Un formulaire rempli n'est pas un acheteur. Chaque contact est noté, trié, et seuls les plus chauds arrivent chez les commerciaux, avec tout leur contexte.",
      flow: keyed(
        [
          {title: 'Clic sur la publicité', text: 'La vidéo renvoie vers un formulaire instantané ou WhatsApp.'},
          {title: 'Formulaire', text: 'Budget, délai, type de bien : trois questions, rien de plus.'},
          {title: 'Score', text: 'Chaque contact reçoit un score de 0 à 100.'},
          {title: 'Équipe commerciale', text: 'Les leads chauds sont transmis en temps réel.'},
        ],
        'benefit',
      ),
      criteria: keyed(
        [
          {label: 'Budget déclaré compatible', points: 30},
          {label: 'Achat prévu sous 6 mois', points: 25},
          {label: 'A répondu sur WhatsApp', points: 20},
          {label: 'Vidéo regardée à plus de 75 %', points: 15},
          {label: 'Profil investisseur ou résident ciblé', points: 10},
        ],
        'scoreCriterion',
      ),
      sampleLeads: keyed(
        [
          {name: 'Lead · Investisseur', source: "Vidéo 02 · L'investissement", interest: '1 chambre', score: 90},
          {name: 'Lead · Curieux', source: 'Vidéo 03 · L’art de vivre', interest: 'Non précisé', score: 25},
          {name: 'Lead · Futur résident', source: 'Vidéo 01 · La vue', interest: '3 chambres', score: 75},
          {name: 'Lead · Expatrié', source: 'Vidéo 05 · Le quartier', interest: 'Studio', score: 55},
          {name: 'Lead · Famille', source: 'Vidéo 04 · Les finitions', interest: '3 chambres', score: 45},
        ],
        'sampleLead',
      ),
      tiers: {hot: 'Appel commercial sous 24 h', warm: 'Séquence WhatsApp + retargeting', cold: 'Audience de retargeting'},
      note: 'Exemple de grille et leads fictifs. Les critères et les pondérations sont définis avec votre équipe commerciale.',
    },
    community: {
      heading: 'Chaque commentaire *reçoit une réponse.*',
      intro: 'Une publicité attire l’attention, la page la convertit. Trois publications par semaine nourrissent la confiance entre deux publicités, et chaque commentaire ou message reçoit une réponse : un prospect qui obtient une réponse rapide ne part pas chez le concurrent.',
      perWeek: 3,
      calendar: keyed(
        [
          {day: 'mon', format: 'Reel', title: 'Avancement du chantier'},
          {day: 'wed', format: 'Carrousel', title: "Focus sur un plan d'appartement"},
          {day: 'fri', format: 'Story + post', title: 'Vie de quartier à BKK1'},
        ],
        'calendarPost',
      ),
      thread: keyed(
        [
          {author: 'sokha.invest', text: "What's the payment plan for a 1-bedroom?", reply: '20% down, then 48 monthly instalments. We’ve sent you the full schedule by message 🙏'},
          {author: 'claire_pp', text: 'Can I visit the show apartment?', reply: 'Of course! Send us a message and we’ll book you a slot at the sales gallery.'},
          {author: 'dara.k', text: 'The view from the top floors looks incredible 😍', reply: 'Wait until you see it at sunset 🌇 Penthouses are on floors 61 to 66.'},
        ],
        'commentReply',
      ),
    },
    results: {
      heading: 'Les *résultats.*',
      metrics: metrics([
        [TBD, 'leads générés'],
        [TBD, 'coût par lead'],
        [TBD, 'de leads qualifiés'],
        [TBD, 'personnes touchées'],
        [TBD, "taux d'engagement"],
      ]),
      tracked: ['Coût par lead', 'Taux de qualification', 'Coût par rendez-vous', 'Délai de réponse'],
      testimonial: {_type: 'testimonial', quote: TBD, name: TBD, role: TBD},
    },
    cta: {
      eyebrow: 'Growth marketing · Tunnel de vente',
      heading: 'Des leads qualifiés grâce aux publicités ? *Construisons votre tunnel.*',
      text: 'Vous vous concentrez sur vos ventes. Nous écrivons, tournons, diffusons, testons et qualifions, puis nous vous envoyons des prospects prêts à parler à vos commerciaux.',
      deliverables: [
        'Stratégie créative, scripts et copywriting',
        "5 vidéos d'environ une minute, tournées et montées pour les réseaux (9:16)",
        'Diffusion et A/B tests en continu sur plusieurs versions',
        'Suivi des performances et réallocation du budget',
        'Lead scoring et transmission à votre équipe commerciale',
        'Community management : 3 publications par semaine, réponse à chaque commentaire',
      ],
    },
    seo: {
      _type: 'seo',
      title: 'G.A.T.O Tower : publicités vidéo et leads qualifiés | TechFlow Agency',
      description: 'Étude de cas growth marketing : 5 publicités vidéo, A/B testing, lead scoring et community management pour une tour de luxe sur plan à Phnom Penh.',
    },
  },

  en: {
    hero: {
      tagline: 'Growth marketing · Luxury real estate · Phnom Penh',
      headline: 'Selling off-plan luxury, one video at a time.',
      intro:
        "A 67-storey tower that doesn't exist yet, and buyers to win over right now. We wrote, shot and ran five video ads, then plugged every lead into a scoring system that feeds the sales team directly.",
      status: 'Campaign live on Facebook, Instagram and TikTok',
      ctaLabel: 'Launch my campaign',
      stats: metrics([
        ['5', 'video ads'],
        ['~1 min', 'each, 9:16 format'],
        ['3', 'posts per week'],
        ['A/B', 'testing and tuning, ongoing'],
      ]),
    },
    challenge: {
      heading: 'Nothing to visit, *everything to prove.*',
      text: "Off-plan, buyers don't buy square metres: they buy a promise. They have to feel the view, the finishes and the neighbourhood before a single stone is laid, and only the people truly ready to buy should reach the sales team.",
      points: keyed(
        [
          {title: 'A long decision cycle', text: 'A six-figure purchase takes weeks to mature. The campaign has to stay present at every step without wearing people out.'},
          {title: 'Two audiences, two messages', text: 'Residents look for a lifestyle, investors for a return. Each video speaks to one or the other.'},
          {title: 'Volume, but qualified', text: 'A thousand forms are worthless if the sales team spends its days calling back the merely curious.'},
        ],
        'benefit',
      ),
    },
    client: {
      meta: keyed(
        [
          {label: 'Developer', value: 'Miraku Capital Group'},
          {label: 'Project', value: 'G.A.T.O Tower, BKK1'},
          {label: 'Market', value: 'Off-plan apartments, freehold'},
        ],
        'labelValue',
      ),
      facts: metrics([
        ['67', 'storeys'],
        ['297 m', 'tall'],
        ['650+', 'apartments'],
        ['Dec 2030', 'planned completion'],
      ]),
      sourceLabel: 'gato-tower-cambodia.com',
      sourceUrl: 'https://gato-tower-cambodia.com/',
    },
    funnel: {
      heading: 'From video *to sale.*',
      intro: 'One team, six stages, each measured by a clear metric. Nothing gets lost between the creative agency and the media buyer: they are the same people.',
      stages: keyed(
        [
          {
            name: 'Strategy',
            icon: 'strategy',
            title: 'Who buys, and why.',
            text: 'Audiences, buying angles and the conversion offer are set before a line is written; the scripts follow.',
            tasks: ['Resident and investor personas', 'Five buying angles', 'Scripts and copywriting'],
            kpi: 'Approved scripts',
            section: 'creative',
          },
          {
            name: 'Production',
            icon: 'production',
            title: 'Five videos built to stop the thumb.',
            text: 'Shooting, editing, grading and subtitles: five videos of about a minute each, in vertical format.',
            tasks: ['On-site and sales gallery shoots', 'Editing and post-production', 'Subtitles, 9:16 format'],
            kpi: '3-second view rate',
            section: 'ads',
          },
          {
            name: 'Launch',
            icon: 'launch',
            title: 'Several versions, side by side.',
            text: 'Every hook runs in several versions, on three platforms, to two audiences.',
            tasks: ['Hook and copy A/B tests', 'Resident and investor audiences', 'Viewer retargeting'],
            kpi: 'Cost per lead',
            section: 'abTest',
          },
          {
            name: 'Optimize',
            icon: 'optimize',
            title: 'Budget follows what converts.',
            text: 'Daily monitoring, weekly reallocation: the most expensive version is cut and the winner gets more.',
            tasks: ['Daily performance tracking', 'Weekly budget reallocation', 'New hooks in testing'],
            kpi: 'Cost per qualified lead',
            section: 'abTest',
          },
          {
            name: 'Scoring',
            icon: 'score',
            title: 'Sales only calls buyers.',
            text: 'Budget, timing, engagement: every contact gets a score from 0 to 100.',
            tasks: ['Custom scoring grid', 'Automated WhatsApp follow-ups', 'Cold leads sent back to retargeting'],
            kpi: 'Qualification rate',
            section: 'leads',
          },
          {
            name: 'Sales',
            icon: 'sales',
            title: 'A meeting at the sales gallery.',
            text: "Hot leads reach the sales team with their full context, and the team's feedback sharpens the targeting.",
            tasks: ['Real-time handover to the CRM', 'Source video, interest and score attached', 'Feedback loop into targeting'],
            kpi: 'Cost per meeting',
            section: 'leads',
          },
        ],
        'funnelStage',
      ),
    },
    creative: {
      heading: 'Five reasons to buy, *five hooks.*',
      intro: 'Each video makes a single case and states it in the first three seconds. Every script then follows the same structure: hook, desire, proof, action.',
    },
    adsSection: {
      heading: 'The ads, *as they run.*',
      intro: 'Click a screen to watch the video with sound, read its script and see what it tests. The switch changes the interface: Instagram, Facebook or TikTok.',
    },
    ads: keyed(
      [
        {
          angle: 'The view',
          hook: 'Imagine waking up to this view. From the 60th floor.',
          caption: "Phnom Penh like you've never seen it. Discover G.A.T.O Tower, in the heart of BKK1.",
          cta: 'Learn more',
          platform: 'instagram',
          variant: 'Emotion hook',
          note: 'Against the price hook (video 02): does the emotion of the view convert future residents better?',
          duration: '0:58',
          script: beats([
            ['0–3 s', 'Hook', 'Drone shot rising over BKK1, on-screen text: "60th floor."'],
            ['3–20 s', 'Desire', 'Sunrise over the city, an interior flooded with light.'],
            ['20–45 s', 'Proof', '67 storeys, 297 m, a tower designed by architect Shin Takamatsu’s studio.'],
            ['45–58 s', 'Action', '"Book your visit to the sales gallery."'],
          ]),
        },
        {
          angle: 'The investment',
          hook: 'Why smart investors buy off-plan in BKK1.',
          caption: 'Studios from $95,000. 20% down, 48-month payment plan, freehold, in the city’s most sought-after district.',
          cta: 'Send message',
          platform: 'facebook',
          variant: 'Price hook',
          note: 'A rational case (launch price, payment plan) for investors, against the emotion hook.',
          duration: '1:02',
          script: beats([
            ['0–3 s', 'Hook', 'Straight to camera: "Here’s why people buy before it’s built."'],
            ['3–25 s', 'Logic', 'Studios from $95,000, 20% down, 48-month payment plan.'],
            ['25–50 s', 'Proof', 'Freehold, BKK1, optional rental management, completion end of 2030.'],
            ['50–62 s', 'Action', '"Get the price list on WhatsApp."'],
          ]),
        },
        {
          angle: 'The lifestyle',
          hook: 'Infinity pool. 67th floor. And you.',
          caption: 'A spa on the 48th floor, an infinity pool on the 67th, coworking and a kids’ club in between.',
          cta: 'Learn more',
          platform: 'tiktok',
          variant: 'TikTok cut',
          note: 'Same message, faster pace: the native TikTok edit against the same cut in Reels.',
          duration: '0:55',
          script: beats([
            ['0–3 s', 'Hook', 'Slow-motion dive, hard cut to the city at dusk.'],
            ['3–30 s', 'Desire', 'A typical day: spa, coworking, dinner with a panoramic view.'],
            ['30–45 s', 'Proof', 'Infinity pool on the 67th floor, spa on the 48th, cinema, kids’ club.'],
            ['45–55 s', 'Action', '"Discover the available residences."'],
          ]),
        },
        {
          angle: 'The finishes',
          hook: 'Japanese design, down to the last detail.',
          caption: 'Materials, layouts, ceiling heights: tour the show apartment from your phone.',
          cta: 'Book a visit',
          platform: 'instagram',
          variant: 'Guided tour',
          note: 'A show-apartment tour to answer the number one off-plan objection: quality.',
          duration: '1:00',
          script: beats([
            ['0–3 s', 'Hook', 'Macro close-ups: a handle, a joint, a texture.'],
            ['3–30 s', 'Desire', 'Guided tour of the show apartment in natural light.'],
            ['30–48 s', 'Proof', 'Layouts from the studio (31 m²) to the 3-bedroom (93 m²), open views.'],
            ['48–60 s', 'Action', '"Book your private visit."'],
          ]),
        },
        {
          angle: 'The neighbourhood',
          hook: 'Everything that matters in Phnom Penh. Minutes away.',
          caption: 'Embassies, restaurants, international schools: BKK1, 200 m from the city centre.',
          cta: 'Learn more',
          platform: 'facebook',
          variant: 'Location hook',
          note: 'The neighbourhood as the main argument, for buyers comparing several projects.',
          duration: '0:57',
          script: beats([
            ['0–3 s', 'Hook', 'Timelapse over BKK1, a "200 m" counter.'],
            ['3–30 s', 'Desire', 'Cafés, schools, shops: everyday life around the tower.'],
            ['30–45 s', 'Proof', 'Animated map of the places around the tower.'],
            ['45–57 s', 'Action', '"Talk to an advisor today."'],
          ]),
        },
      ],
      'adVideo',
    ),
    abTest: {
      heading: 'Budget goes *where it converts.*',
      intro: 'Every video runs in several versions. We compare cost per lead and lead quality, then reallocate the budget every week. Click a week to see what was decided.',
      illustrative: true,
      variants: keyed(
        [
          {label: 'A', hook: 'Imagine waking up to this view.', angle: 'The view'},
          {label: 'B', hook: 'Why smart investors buy off-plan.', angle: 'The investment'},
          {label: 'C', hook: 'Infinity pool. 67th floor. And you.', angle: 'The lifestyle'},
        ],
        'abVariant',
      ),
      weeks: keyed(
        [
          {label: 'W1', budget: [34, 33, 33], cpl: [1, 1.15, 1.6], note: 'Launch: budget split evenly across the three hooks.'},
          {label: 'W2', budget: [42, 38, 20], cpl: [0.92, 1.05, 1.7], note: 'First signals: C costs more per lead, so its share drops.'},
          {label: 'W3', budget: [52, 40, 8], cpl: [0.85, 0.98, 1.8], note: 'A and B convert; C moves to minimal testing.'},
          {label: 'W4', budget: [58, 42, 0], cpl: [0.8, 0.9, 0], note: 'C is paused. A new hook enters testing the following week.'},
        ],
        'abWeek',
      ),
    },
    leads: {
      heading: 'Leads, then *the right leads.*',
      intro: 'A filled-in form is not a buyer. Every contact is scored and sorted, and only the hottest reach the sales team, with their full context.',
      flow: keyed(
        [
          {title: 'Ad click', text: 'The video leads to an instant form or to WhatsApp.'},
          {title: 'Form', text: 'Budget, timing, type of unit: three questions, nothing more.'},
          {title: 'Score', text: 'Every contact gets a score from 0 to 100.'},
          {title: 'Sales team', text: 'Hot leads are handed over in real time.'},
        ],
        'benefit',
      ),
      criteria: keyed(
        [
          {label: 'Stated budget fits', points: 30},
          {label: 'Plans to buy within 6 months', points: 25},
          {label: 'Replied on WhatsApp', points: 20},
          {label: 'Watched over 75% of the video', points: 15},
          {label: 'Target investor or resident profile', points: 10},
        ],
        'scoreCriterion',
      ),
      sampleLeads: keyed(
        [
          {name: 'Lead · Investor', source: 'Video 02 · The investment', interest: '1 bedroom', score: 90},
          {name: 'Lead · Just browsing', source: 'Video 03 · The lifestyle', interest: 'Not stated', score: 25},
          {name: 'Lead · Future resident', source: 'Video 01 · The view', interest: '3 bedrooms', score: 75},
          {name: 'Lead · Expat', source: 'Video 05 · The neighbourhood', interest: 'Studio', score: 55},
          {name: 'Lead · Family', source: 'Video 04 · The finishes', interest: '3 bedrooms', score: 45},
        ],
        'sampleLead',
      ),
      tiers: {hot: 'Sales call within 24 h', warm: 'WhatsApp sequence + retargeting', cold: 'Retargeting audience'},
      note: 'Example grid and fictional leads. Criteria and weights are set with your sales team.',
    },
    community: {
      heading: 'Every comment *gets a reply.*',
      intro: 'An ad grabs attention; the page converts it. Three posts a week build trust between ads, and every comment and message gets an answer: a prospect who gets a quick reply doesn’t go to the competition.',
      perWeek: 3,
      calendar: keyed(
        [
          {day: 'mon', format: 'Reel', title: 'Construction progress'},
          {day: 'wed', format: 'Carousel', title: 'A floor plan up close'},
          {day: 'fri', format: 'Story + post', title: 'Life in BKK1'},
        ],
        'calendarPost',
      ),
      thread: keyed(
        [
          {author: 'sokha.invest', text: "What's the payment plan for a 1-bedroom?", reply: '20% down, then 48 monthly instalments. We’ve sent you the full schedule by message 🙏'},
          {author: 'claire_pp', text: 'Can I visit the show apartment?', reply: 'Of course! Send us a message and we’ll book you a slot at the sales gallery.'},
          {author: 'dara.k', text: 'The view from the top floors looks incredible 😍', reply: 'Wait until you see it at sunset 🌇 Penthouses are on floors 61 to 66.'},
        ],
        'commentReply',
      ),
    },
    results: {
      heading: 'The *results.*',
      metrics: metrics([
        [TBD, 'leads generated'],
        [TBD, 'cost per lead'],
        [TBD, 'qualified lead rate'],
        [TBD, 'people reached'],
        [TBD, 'engagement rate'],
      ]),
      tracked: ['Cost per lead', 'Qualification rate', 'Cost per meeting', 'Response time'],
      testimonial: {_type: 'testimonial', quote: TBD, name: TBD, role: TBD},
    },
    cta: {
      eyebrow: 'Growth marketing · Sales funnel',
      heading: 'Want qualified leads from social ads? *Let’s build your funnel.*',
      text: 'You focus on selling. We write, shoot, run, test and qualify, then send you prospects ready to talk to your sales team.',
      deliverables: [
        'Creative strategy, scripts and copywriting',
        '5 videos of about a minute, shot and edited for social ads (9:16)',
        'Campaign launch and ongoing A/B testing across versions',
        'Performance monitoring and budget reallocation',
        'Lead scoring and handover to your sales team',
        'Community management: 3 posts a week, a reply to every comment',
      ],
    },
    seo: {
      _type: 'seo',
      title: 'G.A.T.O Tower: video ads and qualified leads | TechFlow Agency',
      description: 'Growth marketing case study: 5 video ads, A/B testing, lead scoring and community management for an off-plan luxury tower in Phnom Penh.',
    },
  },
}

async function run() {
  const ids: Record<Lang, string> = {fr: 'growth-gato-tower-fr', en: 'growth-gato-tower-en'}
  const tx = client.transaction()
  for (const lang of ['fr', 'en'] as const) {
    const doc = {_id: ids[lang], ...shared, language: lang, ...details[lang], ...content[lang]}
    console.log(`${lang}: ${(content[lang].ads as unknown[]).length} ads · ${(content[lang].hero as {headline: string}).headline}`)
    if (REPLACE) tx.createOrReplace(doc)
    else {
      tx.createIfNotExists(doc)
      tx.patch(ids[lang], (p) => p.setIfMissing({channels: shared.channels, ...details[lang]}))
    }
  }
  tx.createIfNotExists({
    _id: 'translation-growth-gato-tower',
    _type: 'translation.metadata',
    schemaTypes: ['growthCaseStudy'],
    translations: (['fr', 'en'] as const).map((language) => ({
      _key: language,
      _type: 'internationalizedArrayReferenceValue',
      language,
      value: {_type: 'reference', _ref: ids[language]},
    })),
  })
  if (DRY_RUN) return console.log('Dry run, nothing written.')
  await tx.commit()
  console.log(REPLACE ? 'Done (replaced).' : 'Done (missing fields added, Studio edits kept).')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
