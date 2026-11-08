import type { Access, CollectionConfig } from 'payload'

const ownQuestion: Access = ({ req }) =>
  req.user?.collection === 'users'
    ? { 'quiz.owner': { equals: req.user.id } }
    : false

export const QuizQuestions: CollectionConfig = {
  slug: 'quiz-questions',
  admin: { group: 'FriendDNA' },
  access: {
    create: ({ req }) => req.user?.collection === 'users',
    delete: ownQuestion,
    read: ownQuestion,
    update: ownQuestion,
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== 'create' || req.user?.collection !== 'users' || !data?.quiz) {
          return data
        }
        const quizID = typeof data.quiz === 'object' ? data.quiz.id : data.quiz
        const quiz = await req.payload.findByID({
          collection: 'quizzes',
          id: quizID,
          overrideAccess: false,
          user: req.user,
        })
        const ownerID = typeof quiz.owner === 'object' ? quiz.owner.id : quiz.owner
        if (String(ownerID) !== String(req.user.id)) {
          throw new Error('Questions may only be added to quizzes you own.')
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'quiz', type: 'relationship', relationTo: 'quizzes', required: true, index: true },
    { name: 'type', type: 'select', required: true, options: ['multiple-choice', 'this-or-that', 'short-text'] },
    { name: 'text', type: 'text', required: true, maxLength: 240 },
    { name: 'options', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    { name: 'correctAnswer', type: 'text', required: true },
    { name: 'acceptedAnswers', type: 'array', fields: [{ name: 'answer', type: 'text', required: true }] },
    { name: 'isScored', type: 'checkbox', defaultValue: true },
    { name: 'orderIndex', type: 'number', required: true, min: 0 },
  ],
}
