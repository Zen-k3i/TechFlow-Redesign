import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons/User'

export const teamMember = defineType({
  name: 'teamMember',
  title: "Membre de l'équipe",
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Fonction', type: 'string'}),
    defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
