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
      if (!slug?.current) return 'Obligatoire'
      return /^[a-z0-9-]+$/.test(slug.current) || 'Minuscules, chiffres et tirets uniquement'
    }),
})

export const orderField = defineField({
  name: 'order',
  title: 'Ordre',
  type: 'number',
  description: "Position dans la liste (le plus petit s'affiche en premier).",
})

export const seoField = defineField({name: 'seo', type: 'seo'})
