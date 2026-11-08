import type { Access, CollectionConfig } from 'payload'
import { isExclusiveAppAdmin } from '@/lib/admin-auth'

const adminOnly: Access = ({ req }) => isExclusiveAppAdmin(req.user as never)

export const Reports: CollectionConfig = {
  slug: 'reports',
  admin: { group: 'FriendDNA Safety' },
  access: {
    create: ({ req }) => req.user?.collection === 'users',
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, req }) => {
        if (operation === 'create' && req.user?.collection === 'users') {
          return { ...data, reporter: req.user.id, status: 'open' }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'reporter',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: { create: () => false, update: () => false },
    },
    { name: 'targetType', type: 'select', required: true, options: ['user', 'profile', 'quiz', 'question', 'media'] },
    { name: 'targetId', type: 'text', required: true },
    {
      name: 'reason',
      type: 'select',
      required: true,
      options: ['harassment', 'impersonation', 'spam', 'inappropriate', 'privacy', 'copyright', 'suspicious'],
    },
    { name: 'details', type: 'textarea', maxLength: 1000 },
    { name: 'status', type: 'select', defaultValue: 'open', options: ['open', 'reviewing', 'resolved', 'dismissed'] },
    { name: 'reviewedAt', type: 'date', access: { create: () => false } },
    { name: 'moderationAction', type: 'textarea', access: { create: () => false }, maxLength: 1000 },
  ],
}
