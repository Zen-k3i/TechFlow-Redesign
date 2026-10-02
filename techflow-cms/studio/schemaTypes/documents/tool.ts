import {defineArrayMember, defineField, defineType} from 'sanity'
import {WrenchIcon} from '@sanity/icons/Wrench'
import {languageField, orderField, grouped, seoField, slugField} from './shared'

export const tool = defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  icon: WrenchIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: grouped([
    languageField,
    defineField({name: 'title', title: 'Tool name', type: 'string', validation: (r) => r.required()}),
    slugField,
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4}),
    defineField({name: 'benefitsTitle', title: 'Benefits title', type: 'string'}),
    defineField({name: 'benefitsIntro', title: 'Benefits intro', type: 'text', rows: 2}),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [defineArrayMember({type: 'benefit'})],
    }),
    orderField,
    {...seoField, group: 'seo'},
    defineField({name: 'sourceUrl', title: 'Source URL', type: 'url', readOnly: true}),
  ]),
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', language: 'language', media: 'logo'},
    prepare: ({title, language, media}) => ({title, subtitle: language?.toUpperCase(), media}),
  },
})
