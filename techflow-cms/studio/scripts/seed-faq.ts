/**
 * One-off seed (2026-10-01): the FAQs that were hard-coded in the website (home, services hub and
 * the four service pages, FR + EN), exported to scripts/faq-seed.json, become `faq` documents.
 *
 *   npx sanity exec scripts/seed-faq.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/seed-faq.ts --with-user-token
 *
 * Uses fixed ids (`faq-<page>-<lang>`) and never overwrites an FAQ that already exists,
 * so edits made in the Studio are safe if it is run again.
 */
import {readFileSync} from 'node:fs'
import {getCliClient} from 'sanity/cli'
import {FAQ_PAGES} from '../schemaTypes/documents/faq'

type Seed = Record<'fr' | 'en', Record<string, {heading: string; intro?: string; items: {q: string; a: string}[]}>>

const DRY_RUN = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2026-09-29'})
const seed = JSON.parse(readFileSync(new URL('./faq-seed.json', import.meta.url), 'utf8')) as Seed

async function run() {
  const tx = client.transaction()
  for (const lang of ['fr', 'en'] as const) {
    for (const page of FAQ_PAGES) {
      const faq = seed[lang][page.id]
      if (!faq) throw new Error(`No seed for ${page.id} (${lang})`)
      console.log(`${lang} ${page.id}: ${faq.items.length} questions · ${faq.heading}`)
      tx.createIfNotExists({
        _id: `faq-${page.id}-${lang}`,
        _type: 'faq',
        language: lang,
        page: page.id,
        heading: faq.heading,
        ...(faq.intro ? {intro: faq.intro} : {}),
        items: faq.items.map(({q, a}, i) => ({_key: `q${i + 1}`, _type: 'faqItem', question: q, answer: a})),
      })
    }
  }
  if (DRY_RUN) return console.log('Dry run, nothing written.')
  await tx.commit()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
