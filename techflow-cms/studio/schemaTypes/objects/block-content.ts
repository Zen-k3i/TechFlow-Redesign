import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'
import {ImagesIcon} from '@sanity/icons/Images'
import {LinkIcon} from '@sanity/icons/Link'

/** Rich text used for case study, tool and insight bodies. */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullets', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                validation: (rule) =>
                  rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
              }),
              defineField({name: 'blank', title: 'Open in a new tab', type: 'boolean'}),
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
        defineField({name: 'alt', title: 'Alt text', type: 'string'}),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
      ],
    }),
    defineArrayMember({
      name: 'imageGroup',
      title: 'Image group',
      type: 'object',
      icon: ImagesIcon,
      description:
        'Project visuals shown full width at this point of the case study. With an odd number, the first image spans the width; the rest go two by two.',
      fields: [
        defineField({
          name: 'images',
          type: 'array',
          of: [defineArrayMember({type: 'imageWithAlt'})],
          options: {layout: 'grid'},
          validation: (rule) => rule.min(1),
        }),
      ],
      preview: {
        select: {images: 'images', media: 'images.0'},
        prepare: ({images, media}) => ({
          title: 'Image group',
          subtitle: `${Object.keys(images ?? {}).length} images`,
          media,
        }),
      },
    }),
    defineArrayMember({type: 'table'}),
  ],
})
