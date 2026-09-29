import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {languageField, seoField, slugField} from './shared'

export const insight = defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    languageField,
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    slugField,
    defineField({name: 'excerpt', title: 'Chapô', type: 'text', rows: 3}),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({name: 'publishedAt', title: 'Date de publication', type: 'date'}),
    defineField({name: 'author', title: 'Auteur', type: 'string', initialValue: 'TechFlow Agency'}),
    defineField({name: 'coverImage', title: 'Image de couverture', type: 'imageWithAlt'}),
    defineField({name: 'body', title: 'Article', type: 'blockContent'}),
    seoField,
    defineField({name: 'sourceUrl', title: 'URL source', type: 'url', readOnly: true}),
  ],
  orderings: [
    {title: 'Plus récents', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
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
