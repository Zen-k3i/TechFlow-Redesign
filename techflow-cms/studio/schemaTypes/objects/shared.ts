import {defineField, defineType} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons/ChartUpward'
import {CommentIcon} from '@sanity/icons/Comment'
import {SearchIcon} from '@sanity/icons/Search'
import {StarIcon} from '@sanity/icons/Star'

/** Image with the alt text the frontend needs. */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [defineField({name: 'alt', title: 'Texte alternatif', type: 'string'})],
})

export const metric = defineType({
  name: 'metric',
  title: 'Chiffre clé',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    defineField({name: 'value', title: 'Valeur', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'label', title: 'Libellé', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({name: 'quote', title: 'Citation', type: 'text', rows: 4}),
    defineField({name: 'name', title: 'Nom', type: 'string'}),
    defineField({name: 'role', title: 'Fonction', type: 'string'}),
    defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})

export const benefit = defineType({
  name: 'benefit',
  title: 'Avantage',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title', subtitle: 'text'}},
})

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({name: 'title', title: 'Titre SEO', type: 'string'}),
    defineField({
      name: 'description',
      title: 'Description SEO',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(170).warning('Restez sous 170 caractères.'),
    }),
    defineField({name: 'image', title: 'Image de partage', type: 'image'}),
  ],
})
