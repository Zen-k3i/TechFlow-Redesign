/**
 * Imports the English insight drafts that only exist in the Webflow CMS (never published, so
 * import-live.ts can't see them) as Sanity drafts, for review in the Studio. Also backfills
 * `publishedAt` on the published articles and their Webflow categories where `topics` is empty.
 *
 *   npx sanity exec scripts/import-webflow-drafts.ts --with-user-token -- --file=<insights.json> [--dry-run]
 *
 * insights.json is the Webflow CMS export made for the migration (docs/migration/insights-inventory.md).
 * Re-running is safe: drafts have fixed ids (`drafts.insight-en-<slug>`) and are only created when missing.
 */
import {randomUUID} from 'node:crypto'
import {readFileSync} from 'node:fs'
import {createSchema} from 'sanity'
import {getCliClient} from 'sanity/cli'
import {htmlToBlocks} from '@portabletext/block-tools'
import {JSDOM} from 'jsdom'
import {blockContent} from '../schemaTypes/objects/block-content'

const SITE = 'https://www.techflow-agency.com'
const DRY_RUN = process.argv.includes('--dry-run')
const FILE = process.argv.find((a) => a.startsWith('--file='))?.slice(7)
if (!FILE) throw new Error('--file=<insights.json> is required')

const client = getCliClient({apiVersion: '2026-09-29'})
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const text = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim() ?? ''

// ---------------------------------------------------------------- images

const assetCache = new Map<string, string>()
async function uploadImage(url: string | undefined): Promise<string | undefined> {
  if (!url) return undefined
  if (assetCache.has(url)) return assetCache.get(url)
  if (DRY_RUN) return `dry-run:${url.split('/').pop()}`
  const res = await fetch(url)
  if (!res.ok) {
    console.warn(`  ! image ${res.status}: ${url}`)
    return undefined
  }
  const filename = decodeURIComponent(url.split('/').pop() ?? 'image').replace(/^[0-9a-f]{24}_/, '')
  const asset = await client.assets.upload('image', Buffer.from(await res.arrayBuffer()), {filename})
  assetCache.set(url, asset._id)
  return asset._id
}

async function image(url: string | undefined, alt?: string, type = 'image') {
  const ref = await uploadImage(url)
  if (!ref) return undefined
  return {_type: type, asset: {_type: 'reference', _ref: ref}, ...(alt ? {alt} : {})}
}

// ---------------------------------------------------------------- rich text

// createSchema adds Sanity's built-in types (image hotspot, crop, …) that the block converter resolves.
// Only the rich text and the types it uses: the full schema imports Studio React inputs (.tsx) that `sanity exec` can't load.
const compiled = createSchema({
  name: 'import',
  types: [
    blockContent,
    {name: 'imageWithAlt', type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string'}]},
    // Stand-in for the @sanity/table plugin type, which is only registered inside the Studio.
    {
      name: 'table',
      type: 'object',
      fields: [{name: 'rows', type: 'array', of: [{type: 'object', name: 'tableRow', fields: [{name: 'cells', type: 'array', of: [{type: 'string'}]}]}]}],
    },
  ],
})
const blockContentType = (() => {
  const type = compiled.get('blockContent')
  if (!type) throw new Error('blockContent type missing from schema')
  return type as Parameters<typeof htmlToBlocks>[1]
})()

/** Converts Webflow rich text to Portable Text, uploading inline images. */
async function richText(elements: Element[]) {
  const pending: {src: string; alt: string; caption: string}[] = []
  const html = elements
    .map((el) => {
      const clone = el.cloneNode(true) as Element
      // Unfinished "📸 screenshot to insert" notes are editorial placeholders, not content.
      clone.querySelectorAll('p').forEach((p) => {
        if (text(p).startsWith('📸')) p.remove()
      })
      clone.querySelectorAll('img').forEach((img) => {
        const figure = img.closest('figure') ?? img
        const marker = clone.ownerDocument.createElement('figure')
        marker.setAttribute('data-img', String(pending.length))
        pending.push({
          src: img.getAttribute('src') ?? '',
          alt: img.getAttribute('alt') ?? '',
          caption: text(figure.querySelector('figcaption')),
        })
        figure.replaceWith(marker)
      })
      return clone.innerHTML
    })
    .join('')

  const blocks = htmlToBlocks(html, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
    rules: [
      {
        deserialize(el, next, block) {
          const node = el as Element
          const tag = node.tagName?.toLowerCase()
          if (tag === 'figure' && node.getAttribute('data-img')) {
            return block({_type: 'image', _pending: Number(node.getAttribute('data-img'))})
          }
          if (tag === 'table') {
            const rows = [...node.querySelectorAll('tr')].map((tr) => ({
              _type: 'tableRow',
              _key: key(),
              cells: [...tr.children].map((cell) => text(cell)),
            }))
            return block({_type: 'table', rows})
          }
          if (tag === 'a') {
            const href = node.getAttribute('href')
            if (!href) return undefined
            return {
              _type: '__annotation',
              markDef: {_key: key(), _type: 'link', href, blank: node.getAttribute('target') === '_blank'},
              children: next(node.childNodes),
            }
          }
          return undefined
        },
      },
    ],
  }) as Record<string, unknown>[]

  const out = []
  for (const b of blocks) {
    if (b._type === 'image' && typeof b._pending === 'number') {
      const info = pending[b._pending]
      const img = await image(info.src, info.alt || undefined)
      if (img) out.push({...img, _key: key(), ...(info.caption ? {caption: info.caption} : {})})
      continue
    }
    out.push({_key: key(), ...b})
  }
  return out
}

// ---------------------------------------------------------------- import

/** Webflow EN category names → Sanity `category` ids (the Sanity names differ for some). */
const CATEGORY: Record<string, string> = {
  'AI & Automation': 'category-en-ai-automation',
  'Content Strategy': 'category-en-content-strategy',
  'Data & Analytics': 'category-en-data-analysis',
  'Design & UX': 'category-en-design-ux',
  'Digital Marketing': 'category-en-digital-marketing',
  'E-commerce': 'category-en-ecommerce',
  SEO: 'category-en-seo',
  'Web Development': 'category-en-web-development',
  'Website Performance': 'category-en-website-performance',
}
const topicsOf = (names: string[]) =>
  names.map((n) => {
    const id = CATEGORY[n]
    if (!id) throw new Error(`Unknown Webflow category "${n}"`)
    return {_type: 'reference', _ref: id, _key: id.replace('category-en-', '')}
  })

type Item = {
  lang: 'fr' | 'en'
  slug: string
  path: string
  status: string
  publishedDate: string | null
  author: string
  categories: string[]
  sanity: {id: string} | null
  fields?: {
    title: string
    excerpt: string
    bodyHtml: string
    coverImage?: {url: string; alt?: string}
    seo?: {title?: string; description?: string}
  }
}

async function ensureEcommerceCategory() {
  const docs = [
    {_id: 'category-fr-ecommerce', _type: 'category', language: 'fr', title: 'E-commerce'},
    {_id: 'category-en-ecommerce', _type: 'category', language: 'en', title: 'E-commerce'},
  ]
  const meta = {
    _id: 'translation-category-ecommerce',
    _type: 'translation.metadata',
    schemaTypes: ['category'],
    translations: docs.map((d) => ({
      _key: d.language,
      _type: 'internationalizedArrayReferenceValue',
      language: d.language,
      value: {_type: 'reference', _ref: d._id},
    })),
  }
  if (DRY_RUN) return
  const tx = client.transaction()
  for (const d of [...docs, meta]) tx.createIfNotExists(d)
  await tx.commit()
}

async function run() {
  const data = JSON.parse(readFileSync(FILE!, 'utf8')) as {inventory: Item[]; missing_from_sanity: Item[]}
  await ensureEcommerceCategory()

  const members = await client.fetch<{_id: string; name: string}[]>(`*[_type == "teamMember" && !(_id in path("drafts.**"))]{_id, name}`)
  const memberId = (name: string) => members.find((m) => m.name.trim().toLowerCase() === name.trim().toLowerCase())?._id

  // 1. Published articles: publish date, and Webflow categories where none were picked yet.
  const published = data.inventory.filter((i) => i.sanity?.id)
  const current = await client.fetch<{_id: string; publishedAt: string | null; topics: unknown[] | null}[]>(
    `*[_id in $ids]{_id, publishedAt, topics}`,
    {ids: published.map((i) => i.sanity!.id)},
  )
  const patches = client.transaction()
  let patched = 0
  for (const item of published) {
    const doc = current.find((d) => d._id === item.sanity!.id)
    if (!doc) continue
    const set: Record<string, unknown> = {}
    if (item.publishedDate && doc.publishedAt !== item.publishedDate.slice(0, 10)) set.publishedAt = item.publishedDate.slice(0, 10)
    if (item.lang === 'en' && !doc.topics?.length && item.categories.length) set.topics = topicsOf(item.categories)
    if (Object.keys(set).length) {
      console.log(`  ~ ${item.lang} ${item.slug}: ${Object.keys(set).join(', ')}`)
      patches.patch(doc._id, {set})
      patched++
    }
  }
  if (!DRY_RUN && patched) await patches.commit()

  // 2. Drafts that only exist in Webflow.
  for (const item of data.missing_from_sanity) {
    const f = item.fields!
    const id = `drafts.insight-${item.lang}-${item.slug}`
    const exists = await client.fetch<string | null>(`*[_id == $id][0]._id`, {id})
    if (exists) {
      console.log(`  = ${item.slug} (already in Sanity)`)
      continue
    }
    const body = await richText([new JSDOM(`<div>${f.bodyHtml}</div>`).window.document.querySelector('div')!])
    const author = item.author && item.author !== 'TechFlow Agency' ? memberId(item.author) : undefined
    const seo = {
      _type: 'seo',
      ...(f.seo?.title && f.seo.title !== f.title ? {title: f.seo.title} : {}),
      ...(f.seo?.description ? {description: f.seo.description} : {}),
    }
    const doc = {
      _id: id,
      _type: 'insight',
      language: item.lang,
      sourceUrl: SITE + item.path,
      title: f.title,
      slug: {_type: 'slug', current: item.slug},
      excerpt: f.excerpt,
      topics: topicsOf(item.categories),
      ...(item.publishedDate ? {publishedAt: item.publishedDate.slice(0, 10)} : {}),
      ...(author
        ? {author: {_type: 'reference', _ref: author}}
        : item.author && item.author !== 'TechFlow Agency'
          ? {authorName: item.author}
          : {}),
      ...(f.coverImage?.url ? {coverImage: await image(f.coverImage.url, f.coverImage.alt || undefined, 'imageWithAlt')} : {}),
      body,
      seo,
    }
    console.log(`  + ${item.slug}: ${body.length} blocks, ${body.filter((b) => b._type === 'image').length} images, author ${author ? 'team' : item.author}`)
    if (!DRY_RUN) await client.createIfNotExists(doc)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
