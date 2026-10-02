/**
 * One-off (2026-10-02): copies the SEO title and meta description written in Webflow into each document's
 * SEO tab, read from the live page (`sourceUrl`, else the same path on the live site).
 * Only fills empty fields, and replaces descriptions Weglot broke (`false"<client quote>…`); never touches
 * anything else. Drafts get the same values so publishing one doesn't bring the old SEO back.
 *
 *   npx sanity exec scripts/import-seo.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/import-seo.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'
import {JSDOM} from 'jsdom'
import {pagePath, SITE_URL} from '../site-routes'

const DRY_RUN = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2026-09-29'})

type Doc = {
  _id: string
  _type: string
  language: string
  slug: string
  title: string
  sourceUrl?: string
  seo?: {title?: string; description?: string}
  hasDraft: boolean
}

/** Weglot's English meta descriptions sometimes start with `false"` followed by a testimonial. */
const isBroken = (text?: string) => !text || /^false"/.test(text) || text.trim().length < 20

async function liveMeta(url: string) {
  const res = await fetch(url)
  if (!res.ok) return null
  const doc = new JSDOM(await res.text()).window.document
  return {
    title: doc.title.replace(/\s+/g, ' ').trim(),
    description: doc.querySelector('meta[name="description"]')?.getAttribute('content')?.replace(/\s+/g, ' ').trim() ?? '',
  }
}

async function run() {
  const docs = await client.fetch<Doc[]>(
    `*[_type in ["project", "growthCaseStudy", "tool", "insight"] && !(_id in path("drafts.**")) && defined(slug.current)]{
      _id, _type, language, "slug": slug.current, title, sourceUrl, seo { title, description },
      "hasDraft": defined(*[_id == "drafts." + ^._id][0]._id)
    }`,
  )
  const report: string[] = []
  let patched = 0
  for (const doc of docs) {
    const url = doc.sourceUrl ?? `${SITE_URL}${pagePath(doc._type, doc.language, doc.slug)}`
    const live = await liveMeta(url)
    if (!live) {
      report.push(`  - ${doc.language} ${doc._type} ${doc.slug}: no live page (${url})`)
      continue
    }
    const set: Record<string, string> = {}
    const genericTitle = !live.title || live.title === doc.title || /^techflow( agency)?$/i.test(live.title)
    if (!doc.seo?.title && !genericTitle) set['seo.title'] = live.title
    if (isBroken(doc.seo?.description) && !isBroken(live.description)) set['seo.description'] = live.description
    if (!Object.keys(set).length) continue

    patched++
    report.push(`  ✓ ${doc.language} ${doc._type} ${doc.slug}${doc.hasDraft ? ' (+ draft)' : ''}`)
    for (const [field, value] of Object.entries(set)) report.push(`      ${field.padEnd(15)} ${value.length} ch · ${value}`)
    if (DRY_RUN) continue
    const ids = [doc._id, ...(doc.hasDraft ? [`drafts.${doc._id}`] : [])]
    const tx = client.transaction()
    for (const id of ids) tx.patch(id, (p) => p.setIfMissing({seo: {_type: 'seo'}}).set(set))
    await tx.commit()
  }
  console.log(report.join('\n'))
  console.log(`\n${DRY_RUN ? 'Dry run' : 'Done'}: ${patched} of ${docs.length} documents ${DRY_RUN ? 'would be ' : ''}updated.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
