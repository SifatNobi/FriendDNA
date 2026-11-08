import type { Access, CollectionConfig, Where } from 'payload'

const isAppUser = (user: { collection?: string } | null | undefined) =>
  user?.collection === 'users'

const ownQuiz: Access = ({ req }) =>
  isAppUser(req.user) ? { owner: { equals: req.user!.id } } : false

export const Quizzes: CollectionConfig = {
  slug: 'quizzes',
  admin: { group: 'FriendDNA', useAsTitle: 'title' },
  access: {
    create: ({ req }) => isAppUser(req.user),
    delete: ownQuiz,
    read: ({ req }) => {
      const publicQuiz: Where = { visibility: { in: ['public', 'unlisted'] } }
      if (!isAppUser(req.user)) return publicQuiz
      const own: Where = { owner: { equals: req.user!.id } }
      return { or: [publicQuiz, own] }
    },
    update: ownQuiz,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, req }) => {
        if (operation === 'create' && isAppUser(req.user)) {
          return { ...data, owner: req.user!.id }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      access: { create: () => false, update: () => false },
    },
    { name: 'shareId', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true, maxLength: 80 },
    { name: 'description', type: 'textarea', maxLength: 240 },
    { name: 'quizType', type: 'text', required: true },
    {
      name: 'visibility',
      type: 'select',
      required: true,
      defaultValue: 'unlisted',
      options: ['public', 'friends', 'group', 'unlisted'],
    },
    { name: 'status', type: 'select', defaultValue: 'draft', options: ['draft', 'published', 'archived'] },
    { name: 'coverTheme', type: 'text', defaultValue: 'electric-orbit' },
    { name: 'guestParticipation', type: 'checkbox', defaultValue: true },
    { name: 'repeatParticipation', type: 'checkbox', defaultValue: false },
    { name: 'shareScores', type: 'checkbox', defaultValue: false },
    { name: 'activeUntil', type: 'date' },
  ],
}
