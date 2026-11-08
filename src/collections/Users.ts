import type { Access, CollectionConfig, Where } from 'payload'

const isAppUser = (user: { collection?: string } | null | undefined) =>
  user?.collection === 'users'

const ownProfile: Access = ({ req }) =>
  isAppUser(req.user) ? { id: { equals: req.user!.id } } : false

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: 'FriendDNA',
    useAsTitle: 'username',
  },
  access: {
    create: ({ req }) =>
      req.context?.appRegistration === true &&
      req.context?.ageConfirmed === true &&
      req.context?.legalAccepted === true,
    delete: ownProfile,
    read: ({ req }) => {
      const publicProfile: Where = {
        'privacySettings.profileVisibility': { equals: 'public' },
      }
      if (!isAppUser(req.user)) return publicProfile
      const own: Where = { id: { equals: req.user!.id } }
      return { or: [own, publicProfile] }
    },
    update: ownProfile,
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, req }) => {
        if (operation !== 'create') return data
        if (
          req.context?.appRegistration !== true ||
          req.context?.ageConfirmed !== true ||
          req.context?.legalAccepted !== true
        ) {
          throw new Error('Age confirmation and legal acceptance are required.')
        }
        return {
          ...data,
          ageConfirmedAt: new Date().toISOString(),
          legalAcceptedAt: new Date().toISOString(),
          privacyPolicyVersion: req.context.privacyPolicyVersion,
          termsVersion: req.context.termsVersion,
        }
      },
    ],
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      minLength: 3,
      maxLength: 24,
      validate: (value: unknown) =>
        typeof value === 'string' && /^[a-z0-9_]+$/.test(value)
          ? true
          : 'Use lowercase letters, numbers, and underscores only.',
    },
    { name: 'displayName', type: 'text', required: true, maxLength: 48 },
    { name: 'avatarId', type: 'text', defaultValue: 'orbit-blue' },
    { name: 'bio', type: 'textarea', maxLength: 180 },
    {
      name: 'interests',
      type: 'select',
      hasMany: true,
      options: [
        'best-friends',
        'couples',
        'family',
        'school',
        'gaming',
        'movies-music',
        'funny',
        'personality',
        'nostalgia',
        'random',
      ],
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
      access: { create: () => false, update: () => false },
      admin: {
        description:
          'Server-owned verification flag. Required in addition to the exclusive email allowlist for app administration.',
      },
    },
    {
      name: 'ageConfirmedAt',
      type: 'date',
      access: { create: () => false, update: () => false },
      admin: { description: 'Server-recorded confirmation that the registrant stated they are 13 or older.' },
    },
    {
      name: 'legalAcceptedAt',
      type: 'date',
      access: { create: () => false, update: () => false },
    },
    {
      name: 'privacyPolicyVersion',
      type: 'text',
      access: { create: () => false, update: () => false },
    },
    {
      name: 'termsVersion',
      type: 'text',
      access: { create: () => false, update: () => false },
    },
    {
      name: 'copyrightStrikeCount',
      type: 'number',
      defaultValue: 0,
      min: 0,
      access: { create: () => false, update: () => false },
    },
    {
      name: 'accountStatus',
      type: 'select',
      defaultValue: 'active',
      options: ['active', 'suspended', 'deletion-pending'],
      access: { create: () => false, update: () => false },
    },
    {
      name: 'plan',
      type: 'select',
      defaultValue: 'free',
      options: ['free', 'plus'],
      access: { create: () => false, update: () => false },
    },
    {
      name: 'privacySettings',
      type: 'group',
      fields: [
        {
          name: 'profileVisibility',
          type: 'select',
          defaultValue: 'public',
          options: ['public', 'friends', 'private'],
        },
        { name: 'searchable', type: 'checkbox', defaultValue: true },
        { name: 'leaderboards', type: 'checkbox', defaultValue: true },
        { name: 'shareResults', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'xp',
      type: 'number',
      defaultValue: 0,
      min: 0,
      access: { create: () => false, update: () => false },
    },
  ],
}
