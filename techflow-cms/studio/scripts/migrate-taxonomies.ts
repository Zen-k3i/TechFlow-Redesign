/**
 * One-off migration (2026-10-01): project sectors and article categories go from free text
 * to `sector` / `category` documents (FR + EN, linked as translations) that editors pick from a dropdown.
 *
 *   npx sanity exec scripts/migrate-taxonomies.ts --with-user-token -- --dry-run   # show the mapping
 *   npx sanity exec scripts/migrate-taxonomies.ts --with-user-token                # write
 *
 * Re-running is safe: the lists use fixed ids, and documents that already hold references are left alone.
 * Stops without writing if a document holds a value that isn't in the lists below.
 */
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2026-09-29'})

type Lang = 'fr' | 'en'
type Pair = {key: string; fr: string; en: string}

// English project pages on the old site showed the French sector, so both languages map from French.
const SECTORS: Pair[] = [
  {key: 'automobile', fr: 'Automobile', en: 'Automotive'},
  {key: 'ecommerce', fr: 'eCommerce', en: 'eCommerce'},
  {key: 'education', fr: 'Education & Formation', en: 'Education & Training'},
  {key: 'finance-legal', fr: 'Finance & Juridique', en: 'Finance & Legal'},
  {key: 'real-estate', fr: 'Immobilier & Archi', en: 'Real Estate & Architecture'},
  {key: 'music', fr: 'Musique', en: 'Music'},
  {key: 'ngo', fr: 'ONG', en: 'NGO'},
  {key: 'services', fr: 'Service', en: 'Services'},
]

const CATEGORIES: Pair[] = [
  {key: 'ai-automation', fr: 'IA & Automatisation', en: 'AI & Automation'},
  {key: 'content-strategy', fr: 'Stratégie de contenu', en: 'Content Strategy'},
  {key: 'data-analysis', fr: 'Analyse de données', en: 'Data Analysis'},
  {key: 'design-ux', fr: 'Design & UX', en: 'Design & UX'},
  {key: 'digital-marketing', fr: 'Marketing Numérique', en: 'Digital Marketing'},
  {key: 'seo', fr: 'Optimisation SEO', en: 'SEO Optimization'},
  {key: 'web-development', fr: 'Développement Web', en: 'Web Development'},
  {key: 'website-performance', fr: 'Performance du Site Web', en: 'Website Performance'},
]

const docId = (type: string, pair: Pair, lang: Lang) => `${type}-${lang}-${pair.key}`
const ref = (_ref: string, _key?: string) => ({_type: 'reference', _ref, ...(_key ? {_key} : {})})

/** Finds the pair for a stored value, whichever language it was written in. */
function lookup(pairs: Pair[], value: string) {
  const v = value.trim().toLowerCase()
  return pairs.find((p) => p.fr.toLowerCase() === v || p.en.toLowerCase() === v)
}

async function run() {
  const projects = await client.fetch<{_id: string; language: Lang; sector: unknown}[]>(
    `*[_type == "project" && defined(sector)]{_id, language, sector}`,
  )
  const insights = await client.fetch<{_id: string; language: Lang; categories: unknown[]}[]>(
    `*[_type == "insight" && defined(categories)]{_id, language, categories}`,
  )

  const missing: string[] = []
  const projectPatches = projects.flatMap((p) => {
    if (typeof p.sector !== 'string') return [] // already a reference
    const pair = lookup(SECTORS, p.sector)
    if (!pair) missing.push(`sector "${p.sector}" (${p._id})`)
    return pair ? [{id: p._id, set: {sector: ref(docId('sector', pair, p.language))}, log: `${p.language} ${p.sector} → ${pair[p.language]}`}] : []
  })
  const insightPatches = insights.flatMap((doc) => {
    const strings = doc.categories.filter((c): c is string => typeof c === 'string')
    if (strings.length === 0) return []
    const pairs = strings.map((value) => {
      const pair = lookup(CATEGORIES, value)
      if (!pair) missing.push(`category "${value}" (${doc._id})`)
      return pair
    })
    if (pairs.some((p) => !p)) return []
    const refs = [...new Set(pairs.map((p) => p!.key))].map((k) => {
      const pair = CATEGORIES.find((p) => p.key === k)!
      return ref(docId('category', pair, doc.language), k)
    })
    return [{id: doc._id, set: {categories: refs}, log: `${doc.language} [${strings.join(', ')}] → [${pairs.map((p) => p![doc.language]).join(', ')}]`}]
  })

  if (missing.length) {
    console.error(`Unknown values, add them to the lists first:\n  ${missing.join('\n  ')}`)
    process.exit(1)
  }

  for (const p of [...projectPatches, ...insightPatches]) console.log(p.log)
  console.log(`\n${SECTORS.length * 2} sectors, ${CATEGORIES.length * 2} categories; ${projectPatches.length} projects and ${insightPatches.length} articles to update`)
  if (DRY_RUN) return

  const tx = client.transaction()
  for (const [type, pairs] of [['sector', SECTORS], ['category', CATEGORIES]] as const) {
    for (const pair of pairs) {
      for (const lang of ['fr', 'en'] as Lang[]) tx.createOrReplace({_id: docId(type, pair, lang), _type: type, language: lang, title: pair[lang]})
      tx.createOrReplace({
        _id: `translation-${type}-${pair.key}`,
        _type: 'translation.metadata',
        schemaTypes: [type],
        translations: (['fr', 'en'] as Lang[]).map((language) => ({
          _key: language,
          _type: 'internationalizedArrayReferenceValue',
          language,
          value: ref(docId(type, pair, language)),
        })),
      })
    }
  }
  for (const p of [...projectPatches, ...insightPatches]) tx.patch(p.id, (patch) => patch.set(p.set))
  await tx.commit()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
