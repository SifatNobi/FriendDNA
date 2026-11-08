import type { Access, CollectionConfig } from 'payload'
import { isExclusiveAppAdmin } from '@/lib/admin-auth'

const adminOnly: Access = ({ req }) => isExclusiveAppAdmin(req.user as never)

export const LegalRequests: CollectionConfig = {
  slug: 'legal-requests',
  admin: { group: 'FriendDNA Safety', useAsTitle: 'requestType' },
  access: {
    create: ({ req }) => req.context?.verifiedLegalRequest === true,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, req }) => {
        if (operation !== 'create' || req.context?.verifiedLegalRequest !== true) return data
        return { ...data, status: 'open' }
      },
    ],
  },
  fields: [
    {
      name: 'requestType',
      type: 'select',
      required: true,
      options: ['privacy', 'copyright', 'support'],
    },
    { name: 'contactName', type: 'text', required: true, maxLength: 120 },
    { name: 'contactEmail', type: 'email', required: true },
    { name: 'contentLocation', type: 'text', maxLength: 500 },
    { name: 'rightsDescription', type: 'textarea', maxLength: 4000 },
    { name: 'details', type: 'textarea', required: true, maxLength: 5000 },
    { name: 'goodFaithStatement', type: 'checkbox', defaultValue: false },
    { name: 'accuracyStatement', type: 'checkbox', defaultValue: false },
    { name: 'signature', type: 'text', maxLength: 160 },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'open',
      options: ['open', 'reviewing', 'resolved', 'dismissed'],
      access: { create: () => false },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      access: { create: () => false },
    },
  ],
}
