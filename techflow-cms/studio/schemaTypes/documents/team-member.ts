import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons/User'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Position on the Our team page (lowest first).',
    }),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
