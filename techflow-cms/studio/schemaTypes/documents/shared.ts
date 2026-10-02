import {defineField, type FieldDefinition, type SlugIsUniqueValidator, type SlugValue} from 'sanity'
import {pagePath} from '../../site-routes'

/** Set by the document-internationalization plugin; never edited by hand. */
export const languageField = defineField({
  name: 'language',
  type: 'string',
  readOnly: true,
  hidden: true,
})

/**
 * Unique per language only: the French and English versions of a document share a slug
 * (/projets/leapmotor and /en/projects/leapmotor), which Sanity's default check rejects.
 */
const isUniqueInLanguage: SlugIsUniqueValidator = async (slug, {document, getClient}) => {
  if (!document) return true
  const id = document._id.replace(/^drafts\./, '')
  return getClient({apiVersion: '2026-09-29'}).fetch<boolean>(
    `!defined(*[_type == $type && slug.current == $slug && language == $language && !(_id in [$id, $draft])][0]._id)`,
    {type: document._type, slug, language: document.language ?? null, id, draft: `drafts.${id}`},
  )
}

export const slugField = defineField({
  name: 'slug',
  type: 'slug',
  description: 'The end of the page URL. Lowercase letters, numbers and hyphens, no accents. Click Generate to build it from the title.',
  options: {
    source: 'title',
    maxLength: 96,
    isUnique: isUniqueInLanguage,
    // "Écran d'accueil" → "ecran-d-accueil"
    slugify: (input) =>
      input
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 96),
  },
  validation: (rule) => [
    rule.required().custom((slug) => {
      if (!slug?.current) return 'Required'
      return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current) || 'Lowercase letters, numbers and single hyphens only (no accents, spaces or slashes).'
    }),
    // Changing the slug of a live page breaks links and Google results: ask for a redirect.
    rule
      .custom(async (slug: SlugValue | undefined, {document, getClient}) => {
        if (!document || !slug?.current) return true
        const id = document._id.replace(/^drafts\./, '')
        const published = await getClient({apiVersion: '2026-09-29'}).fetch<string | null>(`*[_id == $id][0].slug.current`, {id})
        if (!published || published === slug.current) return true
        const lang = String(document.language ?? 'fr')
        const from = pagePath(document._type, lang, published)
        const to = pagePath(document._type, lang, slug.current)
        return `The live page is at ${from}. After publishing, add a Redirect from ${from} to ${to}, or old links and Google results will 404.`
      })
      .warning(),
  ],
})

/** Puts every field without a group in the Content tab. */
export const grouped = (fields: FieldDefinition[], group = 'content') =>
  fields.map((field) => ({group, ...field}) as FieldDefinition)

export const orderField = defineField({
  name: 'order',
  title: 'Order',
  type: 'number',
  description: 'Position in lists (lowest first).',
})

export const seoField = defineField({name: 'seo', type: 'seo'})
