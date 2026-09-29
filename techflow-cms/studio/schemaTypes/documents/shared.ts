import {defineField} from 'sanity'

/** Set by the document-internationalization plugin; never edited by hand. */
export const languageField = defineField({
  name: 'language',
  type: 'string',
  readOnly: true,
  hidden: true,
})

export const slugField = defineField({
  name: 'slug',
  type: 'slug',
  options: {source: 'title', maxLength: 96},
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
