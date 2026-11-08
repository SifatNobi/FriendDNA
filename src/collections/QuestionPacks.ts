import type { CollectionConfig } from 'payload'
import { isExclusiveAppAdmin } from '@/lib/admin-auth'

export const QuestionPacks: CollectionConfig = {
  slug: 'question-packs',
  admin: { group: 'FriendDNA Content', useAsTitle: 'title' },
  access: {
    create: ({ req }) => isExclusiveAppAdmin(req.user as never),
    delete: ({ req }) => isExclusiveAppAdmin(req.user as never),
    read: () => true,
    update: ({ req }) => isExclusiveAppAdmin(req.user as never),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['friendship', 'couples', 'family', 'gaming', 'music', 'nostalgia', 'funny'],
    },
    { name: 'difficulty', type: 'select', required: true, options: ['easy', 'medium', 'spicy'] },
    { name: 'questionCount', type: 'number', required: true, min: 1, max: 50 },
    { name: 'premium', type: 'checkbox', defaultValue: false },
    { name: 'accent', type: 'text', defaultValue: 'blue' },
    {
      name: 'questions',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'type', type: 'select', required: true, options: ['multiple-choice', 'this-or-that'] },
        { name: 'options', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
      ],
    },
  ],
}
