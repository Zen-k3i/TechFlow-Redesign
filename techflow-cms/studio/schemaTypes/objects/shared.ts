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
  fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
})

export const metric = defineType({
  name: 'metric',
  title: 'Key figure',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    defineField({name: 'value', title: 'Value', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4}),
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})

export const benefit = defineType({
  name: 'benefit',
  title: 'Benefit',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
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
    defineField({name: 'title', title: 'SEO title', type: 'string'}),
    defineField({
      name: 'description',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(170).warning('Keep it under 170 characters.'),
    }),
    defineField({name: 'image', title: 'Social share image', type: 'image'}),
  ],
})
