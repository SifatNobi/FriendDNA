import type { Access, CollectionConfig } from 'payload'
import { isExclusiveAppAdmin } from '@/lib/admin-auth'

const adminOnly: Access = ({ req }) => isExclusiveAppAdmin(req.user as never)

export const AdminAuditLogs: CollectionConfig = {
  slug: 'admin-audit-logs',
  admin: { group: 'FriendDNA Security', useAsTitle: 'action' },
  access: { create: adminOnly, delete: () => false, read: adminOnly, update: () => false },
  fields: [
    { name: 'action', type: 'text', required: true },
    { name: 'targetType', type: 'text' },
    { name: 'targetId', type: 'text' },
    { name: 'metadata', type: 'json' },
  ],
}
