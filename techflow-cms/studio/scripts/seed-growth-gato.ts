/**
 * Seed (2026-10-02, rewritten for the simpler template): the G.A.T.O Tower growth case study in
 * French and English, as linked `growthCaseStudy` documents. The story is a `body` in chapters,
 * like a website case study. Building facts come from the developer's site
 * (gato-tower-cambodia.com). Results are "[TBD]" placeholders, never shown on the
 * site. No images or video files: upload them in the Studio.
 *
 *   npx sanity exec scripts/seed-growth-gato.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/seed-growth-gato.ts --with-user-token
 *   npx sanity exec scripts/seed-growth-gato.ts --with-user-token -- --replace   (overwrites Studio edits)
 *
 * Fixed ids (`growth-gato-tower-<lang>`); without --replace, existing documents are left alone.
 */
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.argv.includes('--dry-run')
const REPLACE = process.argv.includes('--replace')
const client = getCliClient({apiVersion: '2026-09-29'})

type Lang = 'fr' | 'en'
const TBD = '[TBD]'

let n = 0
const key = () => `k${(++n).toString(36)}`
const keyed = <T extends object>(items: T[], _type?: string) => items.map((item) => ({_key: key(), ...(_type ? {_type} : {}), ...item}))
const metrics = (items: [string, string][]) => keyed(items.map(([value, label]) => ({value, label})), 'metric')

// ---------------------------------------------------------------- Portable Text helpers

const span = (text: string, marks: string[] = []) => ({_type: 'span', _key: key(), text, marks})
const block = (style: string, children: ReturnType<typeof span>[], extra: Record<string, unknown> = {}) => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children,
  ...extra,
})
const p = (text: string) => block('normal', [span(text)])
const h2 = (text: string) => block('h2', [span(text)])
/** Bullet with a bold lead-in: li("Title", "text") → "**Title** : text". */
const li = (title: string, text: string, sep = ' : ') => block('normal', [span(title, ['strong']), span(`${sep}${text}`)], {listItem: 'bullet', level: 1})

const shared = {
  _type: 'growthCaseStudy',
  title: 'G.A.T.O Tower',
  slug: {_type: 'slug', current: 'gato-tower'},
  accentColor: '#c9a45c',
  handle: 'gatotowerofficial',
  order: 0,
  channels: ['Facebook', 'Instagram', 'TikTok'],
}

const content: Record<Lang, Record<string, unknown>> = {
  fr: {
    summary:
      'Cinq publicités vidéo, des A/B tests en continu et un lead scoring branché sur les commerciaux, pour vendre sur plan une tour de luxe de 67 étages à Phnom Penh.',
    sectors: [
      {_key: 'growth-marketing', _type: 'reference', _ref: 'sector-fr-growth-marketing'},
      {_key: 'real-estate', _type: 'reference', _ref: 'sector-fr-real-estate'},
    ],
    services: ['Publicités vidéo', 'Scripts & copywriting', 'A/B testing', 'Lead scoring', 'Community management'],
    hero: {
      tags: [
        {_key: 'growth-marketing', _type: 'reference', _ref: 'sector-fr-growth-marketing'},
        {_key: 'real-estate', _type: 'reference', _ref: 'sector-fr-real-estate'},
      ],
      headline: 'Vendre du luxe sur plan, une vidéo à la fois.',
      status: 'Campagne en cours sur Facebook, Instagram et TikTok',
      ctaLabel: 'Lancer ma campagne',
      stats: metrics([
        ['5', 'publicités vidéo'],
        ['~1 min', 'par vidéo, format 9:16'],
        ['3', 'publications par semaine'],
        ['A/B', 'tests et ajustements en continu'],
      ]),
    },
    body: [
      p("Une tour de 67 étages qui n'existe pas encore, et des acheteurs à convaincre dès maintenant. Nous avons écrit, tourné et diffusé cinq publicités vidéo, puis branché chaque lead sur un système de scoring qui alimente directement l'équipe commerciale."),
      h2('Le défi'),
      p("Sur plan, l'acheteur n'achète pas des mètres carrés : il achète une promesse. Il faut lui faire ressentir la vue, les finitions et le quartier avant qu'une seule pierre ne soit posée, puis ne transmettre aux commerciaux que les personnes réellement prêtes à acheter."),
      p('G.A.T.O Tower, développée par Miraku Capital Group dans le quartier de BKK1, compte 67 étages, 297 mètres de hauteur et plus de 650 appartements, pour une livraison prévue fin 2030 (source : gato-tower-cambodia.com).'),
      li('Un cycle de décision long', 'un achat à six chiffres se mûrit sur plusieurs semaines. La campagne doit rester présente à chaque étape, sans lasser.'),
      li('Deux publics, deux discours', "les résidents cherchent un art de vivre, les investisseurs un rendement. Chaque vidéo parle à l'un ou à l'autre."),
      li('Du volume, mais qualifié', 'mille formulaires ne valent rien si les commerciaux passent leurs journées à rappeler des curieux.'),
      h2('Stratégie et scripts'),
      p("Avant d'écrire une ligne, nous avons défini les audiences (futurs résidents et investisseurs), les raisons d'acheter et l'offre de conversion. Chaque vidéo défend un seul argument et le pose dans les trois premières secondes, puis suit la même structure : accroche, désir, preuve, action."),
      li('La vue', '« Imagine waking up to this view. From the 60th floor. »'),
      li("L'investissement", '« Why smart investors buy off-plan in BKK1. »'),
      li("L'art de vivre", '« Infinity pool. 67th floor. And you. »'),
      li('Les finitions', '« Japanese design, down to the last detail. »'),
      li('Le quartier', '« Everything that matters in Phnom Penh. Minutes away. »'),
      h2('Production'),
      p("Tournage sur site et en galerie de vente, montage, étalonnage et sous-titres : cinq vidéos d'environ une minute au format vertical 9:16, pensées pour être comprises sans le son et pour arrêter le pouce dès la première seconde."),
      h2('Diffusion et A/B tests'),
      p("Les vidéos tournent sur Facebook, Instagram et TikTok, auprès de deux audiences. Chaque accroche existe en plusieurs versions : nous suivons les performances chaque jour et, chaque semaine, nous coupons la version la plus chère par lead et renforçons la gagnante. Le budget suit ce qui convertit."),
      h2('Qualification des leads'),
      p("Un formulaire rempli n'est pas un acheteur. Chaque contact reçoit un score de 0 à 100 selon son budget, son délai et son engagement :"),
      li('Chaud (70+)', 'transmis en temps réel aux commerciaux, avec la vidéo source et son intérêt, pour un appel sous 24 h.'),
      li('Tiède (40–69)', 'relancé automatiquement sur WhatsApp et en retargeting.'),
      li('Froid', 'renvoyé dans les audiences de retargeting.'),
      p("Les retours des commerciaux sur chaque lead affinent le ciblage d'une semaine à l'autre : la qualité des leads s'améliore avec le temps."),
      h2('Community management'),
      p("Une publicité attire l'attention, la page la convertit. Trois publications par semaine (avancement du chantier, focus sur un plan, vie de quartier) entretiennent la confiance entre deux publicités, et chaque commentaire ou message reçoit une réponse : un prospect qui obtient une réponse rapide ne part pas chez le concurrent."),
    ],
    results: {
      metrics: metrics([
        [TBD, 'leads générés'],
        [TBD, 'coût par lead'],
        [TBD, 'de leads qualifiés'],
        [TBD, 'personnes touchées'],
      ]),
    },
    adsSection: {
      heading: 'Les publicités, *telles qu’elles passent.*',
      intro: "Cliquez sur un écran pour regarder la vidéo avec le son et voir ce qu'elle teste. Le sélecteur change l'interface : Instagram, Facebook ou TikTok.",
    },
    ads: keyed(
      [
        {angle: 'La vue', hook: 'Imagine waking up to this view. From the 60th floor.', caption: "Phnom Penh like you've never seen it. Discover G.A.T.O Tower, in the heart of BKK1.", cta: 'Learn more', platform: 'instagram', duration: '0:58', note: "Face à l'accroche « prix » : l'émotion de la vue convertit-elle mieux auprès des futurs résidents ?"},
        {angle: "L'investissement", hook: 'Why smart investors buy off-plan in BKK1.', caption: 'Studios from $95,000. 20% down, 48-month payment plan, freehold, in the city’s most sought-after district.', cta: 'Send message', platform: 'facebook', duration: '1:02', note: "Un argument rationnel (prix de lancement, échéancier) pour les investisseurs, face à l'accroche émotion."},
        {angle: "L'art de vivre", hook: 'Infinity pool. 67th floor. And you.', caption: 'A spa on the 48th floor, an infinity pool on the 67th, coworking and a kids’ club in between.', cta: 'Learn more', platform: 'tiktok', duration: '0:55', note: 'Même argument, rythme plus rapide : le format natif TikTok contre le même montage en Reels.'},
        {angle: 'Les finitions', hook: 'Japanese design, down to the last detail.', caption: 'Materials, layouts, ceiling heights: tour the show apartment from your phone.', cta: 'Book a visit', platform: 'instagram', duration: '1:00', note: "Une visite de l'appartement témoin pour répondre à l'objection n° 1 d'un achat sur plan : la qualité."},
        {angle: 'Le quartier', hook: 'Everything that matters in Phnom Penh. Minutes away.', caption: 'Embassies, restaurants, international schools: BKK1, 200 m from the city centre.', cta: 'Learn more', platform: 'facebook', duration: '0:57', note: 'Le quartier comme argument principal, pour les acheteurs qui comparent plusieurs projets.'},
      ],
      'adVideo',
    ),
    seo: {
      _type: 'seo',
      title: 'G.A.T.O Tower : publicités vidéo et leads qualifiés | TechFlow Agency',
      description: 'Étude de cas growth marketing : 5 publicités vidéo, A/B testing, lead scoring et community management pour une tour de luxe sur plan à Phnom Penh.',
    },
  },

  en: {
    summary: 'Five video ads, ongoing A/B tests and lead scoring wired to the sales team, to sell a 67-storey off-plan luxury tower in Phnom Penh.',
    sectors: [
      {_key: 'growth-marketing', _type: 'reference', _ref: 'sector-en-growth-marketing'},
      {_key: 'real-estate', _type: 'reference', _ref: 'sector-en-real-estate'},
    ],
    services: ['Video ads', 'Scripts & copywriting', 'A/B testing', 'Lead scoring', 'Community management'],
    hero: {
      tags: [
        {_key: 'growth-marketing', _type: 'reference', _ref: 'sector-en-growth-marketing'},
        {_key: 'real-estate', _type: 'reference', _ref: 'sector-en-real-estate'},
      ],
      headline: 'Selling off-plan luxury, one video at a time.',
      status: 'Campaign live on Facebook, Instagram and TikTok',
      ctaLabel: 'Launch my campaign',
      stats: metrics([
        ['5', 'video ads'],
        ['~1 min', 'each, 9:16 format'],
        ['3', 'posts per week'],
        ['A/B', 'testing and tuning, ongoing'],
      ]),
    },
    body: [
      p("A 67-storey tower that doesn't exist yet, and buyers to win over right now. We wrote, shot and ran five video ads, then plugged every lead into a scoring system that feeds the sales team directly."),
      h2('The challenge'),
      p("Off-plan, buyers don't buy square metres: they buy a promise. They have to feel the view, the finishes and the neighbourhood before a single stone is laid, and only the people truly ready to buy should reach the sales team."),
      p('G.A.T.O Tower, developed by Miraku Capital Group in the BKK1 district, has 67 storeys, stands 297 metres tall and holds more than 650 apartments, with completion planned for the end of 2030 (source: gato-tower-cambodia.com).'),
      li('A long decision cycle', 'a six-figure purchase takes weeks to mature. The campaign has to stay present at every step without wearing people out.', ': '),
      li('Two audiences, two messages', 'residents look for a lifestyle, investors for a return. Each video speaks to one or the other.', ': '),
      li('Volume, but qualified', 'a thousand forms are worthless if the sales team spends its days calling back the merely curious.', ': '),
      h2('Strategy and scripts'),
      p('Before writing a line, we set the audiences (future residents and investors), the reasons to buy and the conversion offer. Each video makes a single case and states it in the first three seconds, then follows the same structure: hook, desire, proof, action.'),
      li('The view', '"Imagine waking up to this view. From the 60th floor."', ': '),
      li('The investment', '"Why smart investors buy off-plan in BKK1."', ': '),
      li('The lifestyle', '"Infinity pool. 67th floor. And you."', ': '),
      li('The finishes', '"Japanese design, down to the last detail."', ': '),
      li('The neighbourhood', '"Everything that matters in Phnom Penh. Minutes away."', ': '),
      h2('Production'),
      p('On-site and sales gallery shoots, editing, grading and subtitles: five videos of about a minute each in vertical 9:16, made to be understood without sound and to stop the thumb in the first second.'),
      h2('Launch and A/B testing'),
      p('The videos run on Facebook, Instagram and TikTok, to two audiences. Every hook exists in several versions: we track performance daily and, every week, cut the version with the highest cost per lead and back the winner. Budget follows what converts.'),
      h2('Lead qualification'),
      p('A filled-in form is not a buyer. Every contact gets a score from 0 to 100 based on budget, timing and engagement:'),
      li('Hot (70+)', 'handed to the sales team in real time, with the source video and their interest, for a call within 24 hours.', ': '),
      li('Warm (40–69)', 'followed up automatically on WhatsApp and through retargeting.', ': '),
      li('Cold', 'sent back to the retargeting audiences.', ': '),
      p("The sales team's feedback on each lead sharpens the targeting week after week: lead quality improves over time."),
      h2('Community management'),
      p('An ad grabs attention; the page converts it. Three posts a week (construction progress, a floor plan up close, life in BKK1) build trust between ads, and every comment and message gets a reply: a prospect who gets a quick answer doesn’t go to the competition.'),
    ],
    results: {
      metrics: metrics([
        [TBD, 'leads generated'],
        [TBD, 'cost per lead'],
        [TBD, 'qualified lead rate'],
        [TBD, 'people reached'],
      ]),
    },
    adsSection: {
      heading: 'The ads, *as they run.*',
      intro: 'Click a screen to watch the video with sound and see what it tests. The switch changes the interface: Instagram, Facebook or TikTok.',
    },
    ads: keyed(
      [
        {angle: 'The view', hook: 'Imagine waking up to this view. From the 60th floor.', caption: "Phnom Penh like you've never seen it. Discover G.A.T.O Tower, in the heart of BKK1.", cta: 'Learn more', platform: 'instagram', duration: '0:58', note: 'Against the price hook: does the emotion of the view convert future residents better?'},
        {angle: 'The investment', hook: 'Why smart investors buy off-plan in BKK1.', caption: 'Studios from $95,000. 20% down, 48-month payment plan, freehold, in the city’s most sought-after district.', cta: 'Send message', platform: 'facebook', duration: '1:02', note: 'A rational case (launch price, payment plan) for investors, against the emotion hook.'},
        {angle: 'The lifestyle', hook: 'Infinity pool. 67th floor. And you.', caption: 'A spa on the 48th floor, an infinity pool on the 67th, coworking and a kids’ club in between.', cta: 'Learn more', platform: 'tiktok', duration: '0:55', note: 'Same message, faster pace: the native TikTok edit against the same cut in Reels.'},
        {angle: 'The finishes', hook: 'Japanese design, down to the last detail.', caption: 'Materials, layouts, ceiling heights: tour the show apartment from your phone.', cta: 'Book a visit', platform: 'instagram', duration: '1:00', note: 'A show-apartment tour to answer the number one off-plan objection: quality.'},
        {angle: 'The neighbourhood', hook: 'Everything that matters in Phnom Penh. Minutes away.', caption: 'Embassies, restaurants, international schools: BKK1, 200 m from the city centre.', cta: 'Learn more', platform: 'facebook', duration: '0:57', note: 'The neighbourhood as the main argument, for buyers comparing several projects.'},
      ],
      'adVideo',
    ),
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
    const doc = {_id: ids[lang], ...shared, language: lang, ...content[lang]}
    const chapters = (content[lang].body as {style: string}[]).filter((b) => b.style === 'h2').length
    console.log(`${lang}: ${chapters} chapters · ${(content[lang].ads as unknown[]).length} ads`)
    if (REPLACE) tx.createOrReplace(doc)
    else tx.createIfNotExists(doc)
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
  console.log(REPLACE ? 'Done (replaced).' : 'Done (existing documents left as they were).')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
