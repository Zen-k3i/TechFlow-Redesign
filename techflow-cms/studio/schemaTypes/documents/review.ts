import {defineField, defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons/Blockquote'

/** Client review shown in the testimonials marquee (same text in every language). */
export const review = defineType({
  name: 'review',
  title: 'Client review',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({name: 'quote', title: 'Review', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Role @ Company', type: 'string'}),
    defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 5,
      validation: (r) => r.min(1).max(5).integer(),
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
