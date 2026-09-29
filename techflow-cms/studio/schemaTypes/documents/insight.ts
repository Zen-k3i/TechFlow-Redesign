import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {languageField, seoField, slugField} from './shared'

export const insight = defineType({
  name: 'insight',
  title: 'Body',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    languageField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    slugField,
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3}),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({name: 'publishedAt', title: 'Publish date', type: 'date'}),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'teamMember'}],
      description: 'Leave empty to sign as “TechFlow Agency”.',
    }),
    defineField({name: 'coverImage', title: 'Cover image', type: 'imageWithAlt'}),
    defineField({name: 'body', title: 'Body', type: 'blockContent'}),
    seoField,
    defineField({name: 'sourceUrl', title: 'Source URL', type: 'url', readOnly: true}),
  ],
  orderings: [
    {title: 'Newest first', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', date: 'publishedAt', language: 'language', media: 'coverImage'},
    prepare: ({title, date, language, media}) => ({
      title,
      subtitle: [language?.toUpperCase(), date].filter(Boolean).join(' · '),
      media,
    }),
  },
})
