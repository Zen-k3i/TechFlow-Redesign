import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {languageField, grouped, seoField, slugField} from './shared'
import {sameLanguage} from './taxonomy'

export const insight = defineType({
  name: 'insight',
  title: 'Body',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: grouped([
    languageField,
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    slugField,
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3}),
    defineField({
      name: 'topics',
      title: 'Categories',
      description: 'Pick one or more from the list; add categories under Article categories in the sidebar.',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}], options: {filter: sameLanguage, disableNew: true}})],
      validation: (r) => r.unique(),
    }),
    // Free-text categories from the old site, replaced by `topics` (scripts/migrate-taxonomies.ts). Remove once migrated.
    defineField({
      name: 'categories',
      title: 'Old categories (text)',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      hidden: true,
      readOnly: true,
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
    {...seoField, group: 'seo'},
    defineField({name: 'sourceUrl', title: 'Source URL', type: 'url', readOnly: true}),
  ]),
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
