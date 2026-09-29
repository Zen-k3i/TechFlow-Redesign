/**
 * Imports the team, client reviews, projects, tools and insights from the live Webflow site (techflow-agency.com)
 * into this dataset, in French and English, and links each pair as translations.
 *
 *   npx sanity exec scripts/import-live.ts --with-user-token            # write
 *   npx sanity exec scripts/import-live.ts --with-user-token -- --dry-run  # extract only
 *
 * Re-running is safe: documents are matched on `sourceUrl` (team members and reviews on `name`) and updated in place.
 */
import {randomUUID} from 'node:crypto'
import {createSchema} from 'sanity'
import {getCliClient} from 'sanity/cli'
import {htmlToBlocks} from '@portabletext/block-tools'
import {JSDOM} from 'jsdom'
import {schemaTypes} from '../schemaTypes'

const SITE = 'https://www.techflow-agency.com'
const DRY_RUN = process.argv.includes('--dry-run')
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice(7) // e.g. --only=project
const TEAM_PATH = '/notre-equipe'

type Lang = 'fr' | 'en'
type DocType = 'project' | 'tool' | 'insight'

const PATHS: Record<DocType, Record<Lang, string>> = {
  project: {fr: '/projets', en: '/en/projects'},
  tool: {fr: '/outils', en: '/en/tools'},
  insight: {fr: '/nos-insights', en: '/en/our-insights'},
}

const client = getCliClient({apiVersion: '2026-09-29'})
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)

// ---------------------------------------------------------------- fetching

const pageCache = new Map<string, Document>()
async function page(path: string): Promise<Document> {
  const cached = pageCache.get(path)
  if (cached) return cached
  const res = await fetch(SITE + path)
  if (!res.ok) throw new Error(`${res.status} ${path}`)
  const doc = new JSDOM(await res.text()).window.document
  pageCache.set(path, doc)
  return doc
}

async function sitemap(): Promise<string[]> {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ''))
}

const text = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim() ?? ''
const imgSrc = (img: Element | null | undefined) => img?.getAttribute('src') || undefined

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
const compiled = createSchema({
  name: 'import',
  types: [
    ...schemaTypes,
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

// ---------------------------------------------------------------- extractors

type Draft = Record<string, unknown> & {_type: DocType; language: Lang; sourceUrl: string; slug: {current: string}}
type TeamMember = {name: string; role: string; photo?: string; linkedin?: string; order?: number}
type ProjectRefs = {tools: string[]; team: TeamMember[]}

function seoFrom(doc: Document) {
  const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
  const title = doc.title
  return {_type: 'seo', ...(title ? {title} : {}), ...(description.length > 20 ? {description} : {})}
}

async function extractProject(path: string, lang: Lang, card?: {image?: string; order: number}) {
  const doc = await page(path)
  const info = doc.querySelector('.project_info-wrapper')
  const sector = text(info?.querySelector('.w-embed')).replace(/^(Secteur|Sector)\s*:\s*/i, '')
  const testimonialCard = [...doc.querySelectorAll('.content_newsletter .testimonial_card')].find(
    (c) => !c.closest('.members_wrapper'),
  )
  const quote = testimonialCard ? text(testimonialCard.lastElementChild).replace(/^["“]|["”]$/g, '') : ''

  const refs: ProjectRefs = {
    tools: [...doc.querySelectorAll('.tool-tag_wrapper a')].map((a) => text(a)).filter(Boolean),
    team: [...doc.querySelectorAll('.members_wrapper .testimonial_client-wrapper')].map((m) => {
      const lines = m.querySelector('.testimonial_client-info')?.children ?? []
      return {name: text(lines[0]), role: text(lines[1]), photo: imgSrc(m.querySelector('img'))}
    }),
  }

  const galleryImgs = [...doc.querySelectorAll('.case-study_images-layout .header_image')]
  const showcaseImgs = [...new Set([...doc.querySelectorAll('.branding_image-wrapper img, .gallery_component img')].map((i) => imgSrc(i)))]

  const draft: Draft = {
    _type: 'project',
    language: lang,
    sourceUrl: SITE + path,
    title: text(doc.querySelector('h1')),
    slug: {current: path.split('/').pop()!},
    summary: text(doc.querySelector('.portfolio-header11_content-right')),
    sector,
    metrics: [...doc.querySelectorAll('.impact_matric')].map((m) => ({
      _type: 'metric',
      _key: key(),
      value: text(m.children[0]),
      label: text(m.children[1]),
    })),
    websiteUrl: info?.querySelector('a[href^="http"]')?.getAttribute('href') ?? undefined,
    services: [...doc.querySelectorAll('.service-wrapper .link-block')].map((a) => text(a)).filter(Boolean),
    order: card?.order,
    coverImage: await image(card?.image, undefined, 'imageWithAlt'),
    logo: await image(imgSrc(info?.querySelector('img'))),
    ...(await heroFields(galleryImgs)),
    showcase: (await Promise.all(showcaseImgs.map((src) => image(src, undefined, 'imageWithAlt'))))
      .filter(Boolean)
      .map((i) => ({...i, _key: key()})),
    testimonial: testimonialCard && quote
      ? {
          _type: 'testimonial',
          quote,
          name: text(testimonialCard.querySelector('.testimonial_client-info')?.children[0]),
          role: text(testimonialCard.querySelector('.testimonial_client-info')?.children[1]),
          photo: await image(imgSrc(testimonialCard.querySelector('img'))),
        }
      : undefined,
    body: await richText([...doc.querySelectorAll('.content_content > .w-richtext, .content_content .text-rich-text')]),
    seo: seoFrom(doc),
  }
  return {draft, refs}
}

/** The header mosaic lists four sides, the hero image, then four more sides. */
async function heroFields(imgs: Element[]) {
  const fields = ['heroSide1', 'heroSide2', 'heroSide3', 'heroSide4', 'heroImage', 'heroSide5', 'heroSide6', 'heroSide7', 'heroSide8']
  const images = await Promise.all(imgs.slice(0, 9).map((i) => image(imgSrc(i), i.getAttribute('alt') || undefined, 'imageWithAlt')))
  return Object.fromEntries(images.map((img, i) => [fields[i], img]))
}

/** Unique review cards from the home page marquee, in page order. */
async function extractReviews() {
  const doc = await page('/')
  const reviews = new Map<string, {name: string; role: string; quote: string; photo?: string; rating: number}>()
  for (const card of doc.querySelectorAll('.testimonial_card')) {
    const info = card.querySelector('.testimonial_client-info')
    const name = text(info?.children[0])
    const quote = text(card.querySelector('.testimonial')).replace(/^["“]|["”]$/g, '')
    if (!name || !quote || reviews.has(name)) continue
    reviews.set(name, {
      name,
      role: text(info?.children[1]),
      quote,
      photo: imgSrc(card.querySelector('.testimonial_customer-image')),
      rating: card.querySelectorAll('.testimonial_rating-icon').length || 5,
    })
  }
  return [...reviews.values()]
}

async function upsertReview(review: Awaited<ReturnType<typeof extractReviews>>[number], order: number) {
  if (DRY_RUN) return
  const existing = await client.fetch<{_id: string; photo: boolean} | null>(
    `*[_type == "review" && name == $name && !(_id in path("drafts.**"))][0]{_id, "photo": defined(photo.asset)}`,
    {name: review.name},
  )
  const fields = {quote: review.quote, role: review.role, rating: review.rating, order}
  if (existing) {
    await client.patch(existing._id).set(clean({...fields, photo: existing.photo ? undefined : await image(review.photo)})).commit()
  } else {
    await client.create(clean({_type: 'review', name: review.name, ...fields, photo: await image(review.photo)}))
  }
}

async function extractTool(path: string, lang: Lang, order: number) {
  const doc = await page(path)
  const hero = doc.querySelector('.tool_hero-component')
  const benefitsHeader = doc.querySelector('.benefit-section .header-benefit_tool, .header-benefit_tool')
  const draft: Draft = {
    _type: 'tool',
    language: lang,
    sourceUrl: SITE + path,
    title: text(hero?.querySelector('h1')),
    slug: {current: path.split('/').pop()!},
    logo: await image(imgSrc(hero?.querySelector('img'))),
    intro: text(hero?.querySelector('p')),
    benefitsTitle: text(benefitsHeader?.querySelector('h2')),
    benefitsIntro: text(benefitsHeader?.querySelector('.text-size-large')),
    benefits: [...doc.querySelectorAll('.benefit-item')].map((item) => ({
      _type: 'benefit',
      _key: key(),
      title: text(item.querySelector('h1,h2,h3,h4,h5,h6')),
      text: text(item.querySelector('.text-size-medium')),
    })),
    order,
    seo: seoFrom(doc),
  }
  return draft
}

const MONTHS: Record<string, string> = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
  janvier: '01', février: '02', mars: '03', avril: '04', mai: '05', juin: '06',
  juillet: '07', août: '08', septembre: '09', octobre: '10', novembre: '11', décembre: '12',
}
function parseDate(raw: string) {
  const m = raw.toLowerCase().match(/(\d{1,2})\s+([a-zéû]+)\s+(\d{4})/)
  if (!m || !MONTHS[m[2]]) return undefined
  return `${m[3]}-${MONTHS[m[2]]}-${m[1].padStart(2, '0')}`
}

/** Team page cards, in page order. */
async function extractTeam(): Promise<TeamMember[]> {
  const doc = await page(TEAM_PATH)
  return [...doc.querySelectorAll('.team_item')].map((item, i) => {
    const href = item.querySelector<HTMLAnchorElement>('a[href*="linkedin.com/in/"]')?.getAttribute('href')
    // Drop tracking parameters and normalize to https://www.linkedin.com/in/<handle>
    const handle = href?.match(/linkedin\.com\/in\/([^/?#]+)/)?.[1]
    return {
      name: text(item.querySelector('.team-name_text')),
      role: text(item.querySelector('.team_title-wrapper > :not(.team-name_text)')),
      photo: imgSrc(item.querySelector('.team_image')),
      linkedin: handle ? `https://www.linkedin.com/in/${handle}` : undefined,
      order: i + 1,
    }
  })
}

async function extractInsight(path: string, lang: Lang) {
  const doc = await page(path)
  const header = doc.querySelector('.blog-post-header_component')
  const cover = doc.querySelector('.blog-post-header_image')
  const draft: Draft = {
    _type: 'insight',
    language: lang,
    sourceUrl: SITE + path,
    title: text(header?.querySelector('h1')),
    slug: {current: path.split('/').pop()!},
    excerpt: text(header?.querySelector('.blog-post-header2_meta-wrapper > p')),
    categories: [...new Set([...(header?.querySelectorAll('.tag') ?? [])].map((t) => text(t)).filter(Boolean))],
    publishedAt: parseDate(text(doc.querySelector('.blog-post-header_date'))),
    author: text(doc.querySelector('.blog-post-header_author')).replace(/^(Écrit par|Written by)\s*/i, '') || 'TechFlow Agency',
    coverImage: await image(imgSrc(cover), cover?.getAttribute('alt') || undefined, 'imageWithAlt'),
    body: await richText([...doc.querySelectorAll('.content-blog_content.w-richtext, .content-blog_content .w-richtext')]),
    seo: seoFrom(doc),
  }
  return {draft, coverSrc: imgSrc(cover)}
}

/** Card order and thumbnail for each slug, read from a listing page. */
async function listing(path: string, prefix: string) {
  const doc = await page(path)
  const cards = new Map<string, {order: number; image?: string}>()
  for (const a of doc.querySelectorAll(`a[href^="${prefix}/"]`)) {
    const slug = a.getAttribute('href')!.slice(prefix.length + 1).split(/[?#]/)[0]
    if (!slug || cards.has(slug) || a.closest('nav, .navbar_component, footer, .footer_section')) continue
    cards.set(slug, {order: cards.size + 1, image: imgSrc(a.querySelector('img'))})
  }
  return cards
}

// ---------------------------------------------------------------- writing

function clean<T extends Record<string, unknown>>(doc: T): T {
  return Object.fromEntries(
    Object.entries(doc).filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0)),
  ) as T
}

/** The live <title> is either the page title again or the bare brand; neither is a real SEO title. */
function dropGenericSeoTitle(draft: Record<string, unknown>) {
  const seo = draft.seo as {title?: string} | undefined
  if (seo?.title && (seo.title === draft.title || /^techflow agency$/i.test(seo.title.trim()))) delete seo.title
}

async function upsert(draft: Record<string, unknown> & {_type: string; sourceUrl?: string}) {
  dropGenericSeoTitle(draft)
  const doc = clean(draft)
  if (DRY_RUN) return `dry-run.${draft._type}.${(draft.slug as {current: string} | undefined)?.current ?? draft.name}`
  const existing = await client.fetch<string | null>(
    `*[_type == $type && sourceUrl == $url && !(_id in path("drafts.**"))][0]._id`,
    {type: draft._type, url: draft.sourceUrl ?? ''},
  )
  if (existing) {
    await client.createOrReplace({...doc, _id: existing})
    return existing
  }
  return (await client.create(doc))._id
}

const teamIds = new Map<string, string>()

/**
 * Finds a team member by name, creating it if needed. With `update`, the team page's
 * role, LinkedIn and order overwrite the stored ones; an existing photo is kept.
 */
async function upsertTeamMember(member: TeamMember, update = false) {
  if (DRY_RUN) return `dry-run.team.${member.name}`
  const cached = teamIds.get(member.name)
  if (cached && !update) return cached
  const existing = await client.fetch<{_id: string; photo: boolean} | null>(
    `*[_type == "teamMember" && name == $name && !(_id in path("drafts.**"))][0]{_id, "photo": defined(photo.asset)}`,
    {name: member.name},
  )
  const fields = {role: member.role, linkedin: member.linkedin, order: member.order}
  let id = existing?._id
  if (!id) {
    id = (await client.create(clean({_type: 'teamMember', name: member.name, ...fields, photo: await image(member.photo)})))._id
  } else if (update) {
    const photo = existing?.photo ? undefined : await image(member.photo)
    await client.patch(id).set(clean({...fields, photo})).commit()
  }
  teamIds.set(member.name, id)
  return id
}

async function linkTranslations(type: DocType, ids: Partial<Record<Lang, string>>) {
  const entries = Object.entries(ids).filter(([, id]) => id) as [Lang, string][]
  if (entries.length < 2 || DRY_RUN) return
  const translations = entries.map(([language, ref]) => ({
    _key: key(),
    _type: 'internationalizedArrayReferenceValue',
    language,
    value: {_type: 'reference', _ref: ref},
  }))
  const existing = await client.fetch<string | null>(
    `*[_type == "translation.metadata" && references($ids)][0]._id`,
    {ids: entries.map(([, id]) => id)},
  )
  const metadata = {_type: 'translation.metadata', schemaTypes: [type], translations}
  if (existing) await client.createOrReplace({...metadata, _id: existing})
  else await client.create(metadata)
}

// ---------------------------------------------------------------- run

async function run() {
  const urls = await sitemap()
  const slugsFor = (prefix: string) =>
    urls.filter((u) => u.startsWith(prefix + '/') && u.split('/').length === prefix.split('/').length + 1).map((u) => u.split('/').pop()!)

  const summary: string[] = []
  const toolIds: Record<Lang, Map<string, string>> = {fr: new Map(), en: new Map()}

  if (!ONLY || ONLY === 'review') {
    const reviews = await extractReviews()
    if (DRY_RUN) console.log(JSON.stringify(reviews, null, 1))
    for (const [i, review] of reviews.entries()) await upsertReview(review, i + 1)
    summary.push(`reviews: ${reviews.length}`)
  }

  if (!ONLY || ONLY === 'team') {
    const members = await extractTeam()
    if (DRY_RUN) console.log(JSON.stringify(members, null, 1))
    for (const member of members) await upsertTeamMember(member, true)
    summary.push(`team: ${members.length}`)
  }

  if (!ONLY || ONLY === 'tool') {
    for (const lang of ['fr', 'en'] as Lang[]) {
      const cards = await listing(PATHS.tool[lang], PATHS.tool[lang])
      const slugs = [...new Set([...cards.keys(), ...slugsFor(PATHS.tool[lang])])]
      for (const slug of slugs) {
        const draft = await extractTool(`${PATHS.tool[lang]}/${slug}`, lang, cards.get(slug)?.order ?? 100)
        const id = await upsert(draft)
        toolIds[lang].set(String(draft.title).toLowerCase(), id)
        toolIds[lang].set(slug, id)
        if (DRY_RUN && slug === 'n8n') console.log(JSON.stringify(clean(draft), null, 1).slice(0, 1500))
      }
      summary.push(`tools ${lang}: ${slugs.length}`)
    }
    for (const slug of slugsFor(PATHS.tool.fr)) {
      await linkTranslations('tool', {fr: toolIds.fr.get(slug), en: toolIds.en.get(slug)})
    }
  } else {
    for (const lang of ['fr', 'en'] as Lang[]) {
      for (const t of await client.fetch<{_id: string; title: string; slug: string}[]>(
        `*[_type == "tool" && language == $lang]{_id, title, "slug": slug.current}`,
        {lang},
      )) {
        toolIds[lang].set(t.title.toLowerCase(), t._id)
        toolIds[lang].set(t.slug, t._id)
      }
    }
  }

  if (!ONLY || ONLY === 'project') {
    const projectIds: Record<Lang, Map<string, string>> = {fr: new Map(), en: new Map()}
    for (const lang of ['fr', 'en'] as Lang[]) {
      const cards = await listing(PATHS.project[lang], PATHS.project[lang])
      const slugs = [...new Set([...cards.keys(), ...slugsFor(PATHS.project[lang])])]
      for (const slug of slugs) {
        const {draft, refs} = await extractProject(`${PATHS.project[lang]}/${slug}`, lang, cards.get(slug) ?? {order: 100})
        draft.tools = refs.tools
          .map((name) => toolIds[lang].get(name.toLowerCase()))
          .filter(Boolean)
          .map((id) => ({_type: 'reference', _ref: id, _key: key()}))
        draft.team = []
        for (const member of refs.team) {
          ;(draft.team as unknown[]).push({_type: 'reference', _ref: await upsertTeamMember(member), _key: key()})
        }
        projectIds[lang].set(slug, await upsert(draft))
        if (DRY_RUN && slug === 'kretz-club') {
          const {body, ...rest} = clean(draft)
          console.log(JSON.stringify(rest, null, 1).slice(0, 3000))
          console.log('body blocks:', (body as unknown[])?.length, JSON.stringify((body as unknown[])?.slice(0, 3)).slice(0, 800))
        }
      }
      summary.push(`projects ${lang}: ${slugs.length}`)
    }
    for (const [slug, fr] of projectIds.fr) await linkTranslations('project', {fr, en: projectIds.en.get(slug)})
  }

  if (!ONLY || ONLY === 'insight') {
    const byCover: Record<Lang, Map<string, string>> = {fr: new Map(), en: new Map()}
    for (const lang of ['fr', 'en'] as Lang[]) {
      const cards = await listing(PATHS.insight[lang], PATHS.insight[lang])
      const slugs = [...new Set([...cards.keys(), ...slugsFor(PATHS.insight[lang])])]
      for (const slug of slugs) {
        const {draft, coverSrc} = await extractInsight(`${PATHS.insight[lang]}/${slug}`, lang)
        // A named team member becomes a reference; the agency byline is the empty default.
        const author = String(draft.author ?? '')
        draft.author = author && !/^techflow agency$/i.test(author)
          ? {_type: 'reference', _ref: await upsertTeamMember({name: author, role: ''})}
          : undefined
        const id = await upsert(draft)
        // Weglot keeps the same cover image across languages, which pairs FR and EN articles.
        if (coverSrc) byCover[lang].set(coverSrc.split('/').pop()!, id)
        if (DRY_RUN && lang === 'fr' && slug === 'agence-webflow-pme') {
          const {body, ...rest} = clean(draft)
          console.log(JSON.stringify(rest, null, 1).slice(0, 1500))
          console.log('body blocks:', (body as unknown[])?.length, JSON.stringify((body as {_type: string}[])?.filter((b) => b._type !== 'block')).slice(0, 600))
        }
      }
      summary.push(`insights ${lang}: ${slugs.length}`)
    }
    for (const [cover, fr] of byCover.fr) await linkTranslations('insight', {fr, en: byCover.en.get(cover)})
  }

  console.log(`\n${DRY_RUN ? 'Dry run' : 'Imported'}: ${summary.join(', ')}; ${assetCache.size} images uploaded`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
