/**
 * One-off (2026-10-02): adds the "Growth Marketing" sector (FR + EN, linked as translations, same
 * fixed ids as the lists made by `migrate-taxonomies.ts`) and puts it first on the G.A.T.O Tower
 * growth case study, before its real-estate sector.
 *
 *   npx sanity exec scripts/add-growth-sector.ts --with-user-token
 *
 * Re-running is safe: existing documents are left as they are and the sector is only added once.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-09-29'})
const KEY = 'growth-marketing'
const TITLES = {fr: 'Growth Marketing', en: 'Growth Marketing'} as const
const LANGS = ['fr', 'en'] as const
const sectorId = (lang: (typeof LANGS)[number]) => `sector-${lang}-${KEY}`

async function run() {
  const tx = client.transaction()
  for (const lang of LANGS) tx.createIfNotExists({_id: sectorId(lang), _type: 'sector', language: lang, title: TITLES[lang]})
  tx.createIfNotExists({
    _id: `translation-sector-${KEY}`,
    _type: 'translation.metadata',
    schemaTypes: ['sector'],
    translations: LANGS.map((language) => ({
      _key: language,
      _type: 'internationalizedArrayReferenceValue',
      language,
      value: {_type: 'reference', _ref: sectorId(language)},
    })),
  })

  for (const lang of LANGS) {
    const id = `growth-gato-tower-${lang}`
    const doc = await client.fetch<{sectors?: {_ref: string}[]} | null>(`*[_id == $id][0]{sectors}`, {id})
    if (!doc) {
      console.log(`${id} not found, skipped`)
      continue
    }
    if (doc.sectors?.some((s) => s._ref === sectorId(lang))) continue
    tx.patch(id, (p) => p.setIfMissing({sectors: []}).insert('before', 'sectors[0]', [{_key: KEY, _type: 'reference', _ref: sectorId(lang)}]))
  }
  await tx.commit()
  console.log(JSON.stringify(await client.fetch(`*[_id match "growth-gato-tower-*"]{_id, "sectors": sectors[]->title}`)))
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
