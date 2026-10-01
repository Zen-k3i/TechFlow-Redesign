import {defineField, type SlugIsUniqueValidator} from 'sanity'

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
  options: {source: 'title', maxLength: 96, isUnique: isUniqueInLanguage},
  validation: (rule) =>
    rule.required().custom((slug) => {
      if (!slug?.current) return 'Required'
      return /^[a-z0-9-]+$/.test(slug.current) || 'Lowercase letters, numbers and hyphens only'
    }),
})

export const orderField = defineField({
  name: 'order',
  title: 'Order',
  type: 'number',
  description: 'Position in lists (lowest first).',
})

export const seoField = defineField({name: 'seo', type: 'seo'})
