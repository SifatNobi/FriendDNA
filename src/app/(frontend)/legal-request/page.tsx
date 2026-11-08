import { LegalDocument } from '../components/LegalDocument'
import LegalRequestForm from '../components/LegalRequestForm'

export const metadata = {
  title: 'Legal & Privacy Requests · FriendDNA',
}

export default function LegalRequestPage() {
  return (
    <LegalDocument title="Contact & legal requests" version="2026-10-31">
      <section>
        <h2>Submit a request</h2>
        <p>
          Use this public form for privacy requests, copyright notices or counter-notices, and
          legal or account support. Do not include passwords, authentication tokens, private
          quiz answers, payment details, or unrelated sensitive information.
        </p>
      </section>
      <LegalRequestForm defaultType="privacy" />
    </LegalDocument>
  )
}
