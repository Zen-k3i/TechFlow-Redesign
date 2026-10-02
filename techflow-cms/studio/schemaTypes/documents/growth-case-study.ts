import {defineArrayMember, defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons/Rocket'
import {languageField, orderField, seoField, slugField} from './shared'
import {ColorInput} from '../../components/color-input'
import {sameLanguage} from './taxonomy'

/**
 * Growth marketing case study (social video ads → qualified leads). Built like a website case
 * study (hero, "10 seconds" brief, story in chapters with images, client quote, related cards)
 * plus one marketing block: the ads, shown in phones as they run in the feed.
 * Results and testimonial values containing "TBD" are never shown on the site.
 */

const PLATFORMS = [
  {title: 'Instagram Reels', value: 'instagram'},
  {title: 'Facebook Reels', value: 'facebook'},
  {title: 'TikTok', value: 'tiktok'},
]

export const growthCaseStudy = defineType({
  name: 'growthCaseStudy',
  title: 'Growth case study',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'ads', title: 'Ads'},
    {name: 'details', title: 'Card, tags & team'},
    {name: 'media', title: 'Images'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    languageField,
    defineField({name: 'title', title: 'Client name', type: 'string', group: 'content', validation: (r) => r.required()}),
    {...slugField, group: 'content'},
    defineField({
      name: 'accentColor',
      title: 'Template colour',
      description: 'Accent for the page and the project card. Choose a light, bright tone: it is shown on dark backgrounds.',
      type: 'string',
      group: 'content',
      initialValue: '#c9a45c',
      components: {input: ColorInput},
      validation: (rule) => rule.regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, {name: 'hex colour'}).error('Use a hex code like #c9a45c.'),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      description: 'The phones next to the headline are the first 3 video ads: upload and order them in the Ads tab.',
      group: 'content',
      options: {collapsible: true},
      fields: [
        defineField({name: 'tagline', title: 'Service tag', description: 'e.g. "Growth marketing · Luxury real estate · Phnom Penh"', type: 'string'}),
        defineField({name: 'headline', title: 'Headline', description: 'One bold, outcome-driven line.', type: 'string'}),
        defineField({name: 'status', title: 'Live status', description: 'e.g. "Campaign live on Facebook, Instagram and TikTok". Leave empty to hide.', type: 'string'}),
        defineField({name: 'ctaLabel', title: 'Primary button', description: 'Goes to the contact page.', type: 'string'}),
        defineField({
          name: 'stats',
          title: 'Key figures',
          description: 'Up to 4 figures for "The essentials in 10 seconds" (what was delivered). Real results, once published, replace them.',
          type: 'array',
          of: [defineArrayMember({type: 'metric'})],
          validation: (r) => r.max(4),
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'One or two sentences under the hero headline and on the project cards.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Case study',
      description:
        'Same as a website case study: text before the first Heading 2 is the lead, each Heading 2 opens a numbered chapter (e.g. The challenge / Strategy & scripts / Production / Launch & testing / Lead qualification / Community). Add image groups between paragraphs to show the shoot, the creatives or the dashboards.',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'metrics',
          title: 'Results figures',
          description: 'e.g. "1 240" leads, "$4.80" per lead. Figures containing "TBD" are hidden; real ones lead the brief.',
          type: 'array',
          of: [defineArrayMember({type: 'metric'})],
          validation: (r) => r.max(4),
        }),
        defineField({name: 'testimonial', title: 'Client testimonial', description: 'Hidden while the quote is empty or contains "TBD".', type: 'testimonial'}),
      ],
    }),

    // ----- Ads
    defineField({
      name: 'handle',
      title: 'Social handle',
      description: 'Shown on the Instagram and TikTok overlays, without the @.',
      type: 'string',
      group: 'ads',
    }),
    defineField({
      name: 'adsSection',
      title: 'Ads section',
      type: 'object',
      group: 'ads',
      fields: [
        defineField({name: 'heading', title: 'Heading', description: 'Wrap words in *asterisks* to set them in the accent colour.', type: 'string'}),
        defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3}),
      ],
    }),
    defineField({
      name: 'ads',
      title: 'Video ads',
      description: 'Upload each video here. The first 3 are the phones in the hero (the 1st one plays in front), in the ads section and on the project card. Drag to reorder.',
      type: 'array',
      group: 'ads',
      of: [
        defineArrayMember({
          name: 'adVideo',
          type: 'object',
          fieldsets: [{name: 'media', title: 'Media', options: {columns: 2}}],
          fields: [
            defineField({name: 'angle', title: 'Angle', description: 'The reason to buy it plays on, e.g. "The view".', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'hook', title: 'Hook line', description: 'The first 3 seconds.', type: 'string'}),
            defineField({name: 'caption', title: 'Ad caption', type: 'text', rows: 2}),
            defineField({name: 'cta', title: 'Ad button', description: 'e.g. "Learn more", "Book a visit".', type: 'string'}),
            defineField({name: 'platform', title: 'Platform', type: 'string', options: {list: PLATFORMS, layout: 'radio', direction: 'horizontal'}, initialValue: 'instagram'}),
            defineField({name: 'duration', title: 'Duration', description: 'e.g. 0:58', type: 'string'}),
            defineField({name: 'note', title: 'What it tested', description: 'Shown when the video is opened.', type: 'text', rows: 2}),
            defineField({
              name: 'video',
              title: 'Video file',
              description: 'Vertical 9:16 MP4 (H.264), ideally under 20 MB. Plays muted in the hero and with sound when opened. Without it, a designed poster with the hook is shown.',
              type: 'file',
              fieldset: 'media',
              options: {accept: 'video/mp4,video/webm'},
            }),
            defineField({name: 'poster', title: 'Poster image', description: '9:16 still shown before the video plays.', type: 'image', fieldset: 'media'}),
            defineField({name: 'captions', title: 'Subtitles (.vtt)', type: 'file', options: {accept: '.vtt,text/vtt'}}),
          ],
          preview: {select: {title: 'angle', subtitle: 'hook', media: 'poster'}},
        }),
      ],
    }),

    // ----- Same "details" as a project, so growth case studies sit in the same lists and filters.
    defineField({
      name: 'sectors',
      title: 'Sectors',
      description: 'Pick one or more from the list; used for the filters on the Projects page.',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'reference', to: [{type: 'sector'}], options: {filter: sameLanguage, disableNew: true}})],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      description: 'Tags on the card and in the hero, e.g. "Video ads", "A/B testing", "Lead scoring".',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'channels',
      title: 'Channels',
      description: 'Where the ads run.',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      options: {list: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Google'], layout: 'grid'},
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tool'}], options: {filter: sameLanguage}})],
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
    defineField({name: 'websiteUrl', title: 'Client website', type: 'url', group: 'details'}),
    defineField({
      name: 'next',
      title: 'Next case study',
      description: 'Shown first among the related case studies.',
      type: 'reference',
      group: 'details',
      to: [{type: 'project'}, {type: 'growthCaseStudy'}],
      options: {filter: ({document}) => ({filter: 'language == $lang', params: {lang: document.language ?? 'fr'}})},
    }),
    {...orderField, group: 'details'},

    // ----- Images
    defineField({
      name: 'coverImage',
      title: 'Card image',
      description: 'Portrait visual for the project cards. Without it, the key visual, then a designed "growth" cover.',
      type: 'imageWithAlt',
      group: 'media',
    }),
    defineField({
      name: 'heroImage',
      title: 'Key visual',
      description: 'Photo or render of what is being sold, behind the phones in the hero (darkened). Also the share image if SEO has none.',
      type: 'imageWithAlt',
      group: 'media',
    }),
    defineField({name: 'logo', title: 'Client logo', description: 'Shown in the hero, and as the account avatar on the ad mockups.', type: 'image', group: 'media'}),
    defineField({
      name: 'logoFill',
      title: 'Logo has its own background',
      description: 'Show the logo edge to edge instead of on a white card.',
      type: 'boolean',
      group: 'media',
      hidden: ({document}) => !document?.logo,
    }),

    {...seoField, group: 'seo'},
  ],
  preview: {
    select: {title: 'title', subtitle: 'hero.tagline', language: 'language', media: 'coverImage'},
    prepare: ({title, subtitle, language, media}) => ({
      title,
      subtitle: [language?.toUpperCase(), subtitle].filter(Boolean).join(' · '),
      media,
    }),
  },
})
