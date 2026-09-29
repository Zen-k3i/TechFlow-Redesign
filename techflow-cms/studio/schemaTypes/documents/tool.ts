import {defineArrayMember, defineField, defineType} from 'sanity'
import {WrenchIcon} from '@sanity/icons/Wrench'
import {languageField, orderField, seoField, slugField} from './shared'

export const tool = defineType({
  name: 'tool',
  title: 'Outil',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    languageField,
    defineField({name: 'title', title: "Nom de l'outil", type: 'string', validation: (r) => r.required()}),
    slugField,
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4}),
    defineField({name: 'benefitsTitle', title: 'Titre des avantages', type: 'string'}),
    defineField({name: 'benefitsIntro', title: 'Chapô des avantages', type: 'text', rows: 2}),
    defineField({
      name: 'benefits',
      title: 'Avantages',
      type: 'array',
      of: [defineArrayMember({type: 'benefit'})],
    }),
    orderField,
    seoField,
    defineField({name: 'sourceUrl', title: 'URL source', type: 'url', readOnly: true}),
  ],
  orderings: [{title: 'Ordre', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', language: 'language', media: 'logo'},
    prepare: ({title, language, media}) => ({title, subtitle: language?.toUpperCase(), media}),
  },
})
