import {defineArrayMember, defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'
import {languageField, orderField, seoField, slugField} from './shared'

/** The case-study header is a 3×3 mosaic: four sides, the hero image in the middle, four sides. */
const HERO_SIDES = [1, 2, 3, 4, 5, 6, 7, 8]

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'details', title: 'Details'},
    {name: 'media', title: 'Media'},
    {name: 'seo', title: 'SEO'},
  ],
  fieldsets: [{name: 'hero', title: 'Case study header', options: {columns: 3}}],
  fields: [
    languageField,
    defineField({name: 'title', title: 'Project name', type: 'string', group: 'content', validation: (r) => r.required()}),
    {...slugField, group: 'content'},
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'body', title: 'Case study', type: 'blockContent', group: 'content'}),
    defineField({name: 'testimonial', title: 'Client testimonial', type: 'testimonial', group: 'content'}),

    defineField({name: 'sector', title: 'Sector', type: 'string', group: 'details'}),
    defineField({
      name: 'metrics',
      title: 'Key figures',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'metric'})],
      validation: (r) => r.max(4),
    }),
    defineField({name: 'websiteUrl', title: 'Client website', type: 'url', group: 'details'}),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tool'}]})],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'team',
      title: 'TechFlow team',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'reference', to: [{type: 'teamMember'}]})],
      validation: (r) => r.unique(),
    }),
    {...orderField, group: 'details'},

    defineField({
      name: 'coverImage',
      title: 'Card image',
      description: 'Portrait visual for project cards (home page, Projects page).',
      type: 'imageWithAlt',
      group: 'media',
    }),
    defineField({name: 'logo', title: 'Client logo', type: 'image', group: 'media'}),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description: 'Centre screen of the header, also shown when hovering project cards.',
      type: 'imageWithAlt',
      group: 'media',
      fieldset: 'hero',
      validation: (r) => r.required(),
    }),
    ...HERO_SIDES.map((n) =>
      defineField({
        name: `heroSide${n}`,
        title: `Hero side ${n}`,
        description: n <= 2 ? 'Also shown when hovering project cards.' : undefined,
        type: 'imageWithAlt',
        group: 'media',
        fieldset: 'hero',
        validation: (r) => r.required(),
      }),
    ),
    defineField({
      name: 'showcase',
      title: 'Project visuals',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({type: 'imageWithAlt'})],
      options: {layout: 'grid'},
    }),

    {...seoField, group: 'seo'},
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      description: 'Original page on the old site, used by the import.',
      type: 'url',
      group: 'seo',
      readOnly: true,
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'sector', language: 'language', media: 'coverImage'},
    prepare: ({title, subtitle, language, media}) => ({
      title,
      subtitle: [language?.toUpperCase(), subtitle].filter(Boolean).join(' · '),
      media,
    }),
  },
})
