import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'
import {LinkIcon} from '@sanity/icons/Link'

/** Rich text used for case study, tool and insight bodies. */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Contenu',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraphe', value: 'normal'},
        {title: 'Titre 2', value: 'h2'},
        {title: 'Titre 3', value: 'h3'},
        {title: 'Titre 4', value: 'h4'},
        {title: 'Citation', value: 'blockquote'},
      ],
      lists: [
        {title: 'Puces', value: 'bullet'},
        {title: 'Numérotée', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Lien',
            type: 'object',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                validation: (rule) =>
                  rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
              }),
              defineField({name: 'blank', title: 'Ouvrir dans un nouvel onglet', type: 'boolean'}),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
        defineField({name: 'caption', title: 'Légende', type: 'string'}),
      ],
    }),
    defineArrayMember({type: 'table'}),
  ],
})
