import type { Access, CollectionConfig } from 'payload'

const ownAttempt: Access = ({ req }) =>
  req.user?.collection === 'users'
    ? { participant: { equals: req.user.id } }
    : false

export const QuizAttempts: CollectionConfig = {
  slug: 'quiz-attempts',
  admin: { group: 'FriendDNA' },
  access: {
    create: () => false,
    delete: () => false,
    read: ownAttempt,
    update: () => false,
  },
  fields: [
    { name: 'quiz', type: 'relationship', relationTo: 'quizzes', required: true, index: true },
    { name: 'participant', type: 'relationship', relationTo: 'users', index: true },
    { name: 'guestSessionId', type: 'text', index: true },
    {
      name: 'submittedAnswers',
      type: 'array',
      fields: [
        { name: 'question', type: 'relationship', relationTo: 'quiz-questions', required: true },
        { name: 'answer', type: 'text', required: true },
      ],
    },
    { name: 'score', type: 'number', required: true, min: 0, access: { create: () => false, update: () => false } },
    {
      name: 'totalScoredQuestions',
      type: 'number',
      required: true,
      min: 0,
      access: { create: () => false, update: () => false },
    },
    { name: 'completedAt', type: 'date', required: true },
    { name: 'status', type: 'select', required: true, options: ['submitted', 'flagged'] },
  ],
  indexes: [{ fields: ['quiz', 'participant'], unique: true }],
}
