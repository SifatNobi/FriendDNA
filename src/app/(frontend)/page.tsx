import FriendDNAApp from './components/FriendDNAApp'
import config from '@payload-config'
import { getPayload } from 'payload'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'question-packs',
    depth: 0,
    limit: 20,
    overrideAccess: false,
    select: {
      title: true,
      questionCount: true,
      difficulty: true,
      accent: true,
      premium: true,
      category: true,
      questions: true,
    },
  })
  return <FriendDNAApp packs={result.docs} />
}
