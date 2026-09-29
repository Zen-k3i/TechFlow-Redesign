import {defineArrayMember, defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'
import {languageField, orderField, seoField, slugField} from './shared'

export const project = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'details', title: 'Détails'},
    {name: 'media', title: 'Médias'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    languageField,
    defineField({name: 'title', title: 'Nom du projet', type: 'string', group: 'content', validation: (r) => r.required()}),
    {...slugField, group: 'content'},
    defineField({name: 'summary', title: 'Résumé', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'body', title: 'Étude de cas', type: 'blockContent', group: 'content'}),
    defineField({name: 'testimonial', title: 'Témoignage client', type: 'testimonial', group: 'content'}),

    defineField({name: 'sector', title: 'Secteur', type: 'string', group: 'details'}),
    defineField({
      name: 'metrics',
      title: 'Chiffres clés',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'metric'})],
      validation: (r) => r.max(4),
    }),
    defineField({name: 'websiteUrl', title: 'Site du client', type: 'url', group: 'details'}),
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
      title: 'Outils',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tool'}]})],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'team',
      title: 'Équipe TechFlow',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'reference', to: [{type: 'teamMember'}]})],
      validation: (r) => r.unique(),
    }),
    {...orderField, group: 'details'},

    defineField({name: 'coverImage', title: 'Image de carte', type: 'imageWithAlt', group: 'media'}),
    defineField({name: 'logo', title: 'Logo du client', type: 'image', group: 'media'}),
    defineField({
      name: 'gallery',
      title: "Galerie d'en-tête",
      description: "Jusqu'à 9 images. La 5e est l'image centrale.",
      type: 'array',
      group: 'media',
      of: [defineArrayMember({type: 'imageWithAlt'})],
      options: {layout: 'grid'},
      validation: (r) => r.max(9),
    }),
    defineField({
      name: 'showcase',
      title: 'Visuels du projet',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({type: 'imageWithAlt'})],
      options: {layout: 'grid'},
    }),

    {...seoField, group: 'seo'},
    defineField({
      name: 'sourceUrl',
      title: 'URL source',
      description: "Page d'origine sur l'ancien site, utilisée par l'import.",
      type: 'url',
      group: 'seo',
      readOnly: true,
    }),
  ],
  orderings: [{title: 'Ordre', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'sector', language: 'language', media: 'coverImage'},
    prepare: ({title, subtitle, language, media}) => ({
      title,
      subtitle: [language?.toUpperCase(), subtitle].filter(Boolean).join(' · '),
      media,
    }),
  },
})
