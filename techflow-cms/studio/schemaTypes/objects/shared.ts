import {defineField, defineType} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons/ChartUpward'
import {CommentIcon} from '@sanity/icons/Comment'
import {SearchIcon} from '@sanity/icons/Search'
import {StarIcon} from '@sanity/icons/Star'
import {counterInput, NoIndexInput, SeoInput} from '../../components/seo-inputs'

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

type SeoParent = {ogSameAsMeta?: boolean} | undefined

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  description: 'Everything is optional: empty fields fall back to the page content, then to Site settings.',
  components: {input: SeoInput},
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      description:
        'Title shown in Google and the browser tab. " | TechFlow" is added automatically when it fits in 60 characters and the title does not already contain "TechFlow". Empty = the page title.',
      type: 'string',
      components: {input: counterInput(0, 60)},
      validation: (r) => r.max(60).warning('Google cuts titles after about 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      description: 'Text under the title in Google. Empty = the summary / excerpt, then the site default.',
      type: 'text',
      rows: 3,
      components: {input: counterInput(120, 160)},
      validation: (r) =>
        r
          .custom((text?: string) => !text || (text.length >= 120 && text.length <= 160) || 'Aim for 120–160 characters.')
          .warning(),
    }),
    defineField({
      name: 'ogSameAsMeta',
      title: 'Social sharing: same as meta title / meta description',
      description: 'Turn off to write a different title and text for LinkedIn, Facebook, WhatsApp…',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ogTitle',
      title: 'Social title',
      type: 'string',
      hidden: ({parent}) => (parent as SeoParent)?.ogSameAsMeta !== false,
    }),
    defineField({
      name: 'ogDescription',
      title: 'Social description',
      type: 'text',
      rows: 2,
      hidden: ({parent}) => (parent as SeoParent)?.ogSameAsMeta !== false,
    }),
    defineField({
      name: 'image',
      title: 'Social share image',
      description: '1200 × 630 px recommended; it is cropped to that size around the hotspot. Empty = the page\'s main image, then the site default.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      description: 'Only when this content is the copy of another page. Empty = the page\'s own URL (the normal case).',
      type: 'url',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Google (noindex)',
      type: 'boolean',
      initialValue: false,
      components: {input: NoIndexInput},
    }),
    defineField({
      name: 'noFollow',
      title: 'Don\'t follow links on this page (nofollow)',
      description: 'Rarely needed.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
