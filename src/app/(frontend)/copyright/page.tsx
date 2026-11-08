import Link from 'next/link'
import { LegalDocument } from '../components/LegalDocument'
import {
  COPYRIGHT_POLICY_VERSION,
  LEGAL_CONTACT_PLACEHOLDER,
  POSTAL_ADDRESS_PLACEHOLDER,
} from '@/lib/legal'

export const metadata = {
  title: 'Copyright & DMCA Takedown Policy · FriendDNA',
  description: 'How to submit copyright notices and counter-notifications to FriendDNA.',
}

export default function CopyrightPolicyPage() {
  return (
    <LegalDocument title="Copyright & DMCA Takedown Policy" version={COPYRIGHT_POLICY_VERSION}>
      <section>
        <h2>1. Respect for copyright</h2>
        <p>
          FriendDNA users may create quiz titles, descriptions, questions, answer choices,
          profile text, and shared quiz content. Users must own or have permission to use
          submitted material. FriendDNA may disable access to specifically identified content
          after a sufficiently complete, good-faith notice and appropriate review.
        </p>
      </section>
      <section>
        <h2>2. Submitting a copyright complaint</h2>
        <p>
          Submit a notice using the <Link href="/legal-request">copyright request
          form</Link>. A complete notice should include:
        </p>
        <ul>
          <li>Your full name and a working email address.</li>
          <li>Identification of the copyrighted work or representative list of works.</li>
          <li>The specific FriendDNA quiz, question, profile, media, share identifier, or location of the allegedly infringing content.</li>
          <li>Enough information for FriendDNA to locate the content.</li>
          <li>A statement that you have a good-faith belief the use is not authorized by the copyright owner, agent, or law.</li>
          <li>A statement that the notice is accurate and, under penalty of perjury where applicable, that you are authorized to act.</li>
          <li>Your physical or electronic signature.</li>
        </ul>
        <p>
          Legal contact: <strong>{LEGAL_CONTACT_PLACEHOLDER}</strong>. Postal address:{' '}
          <strong>{POSTAL_ADDRESS_PLACEHOLDER}</strong>. These operator details must be
          configured before launch.
        </p>
      </section>
      <section>
        <h2>3. Review and content action</h2>
        <p>
          A submitted notice is recorded in a private legal-request queue. Authorized
          administration can review reports, update their status, record a moderation action,
          disable or remove specifically identified content using existing collection controls,
          and change an account&apos;s status when justified. FriendDNA should not remove
          unrelated content or automatically ban a user based only on an incomplete or
          unreviewed notice.
        </p>
        <p>
          The operator must establish a documented manual procedure for notice validation,
          evidence preservation, takedown, user notification, restoration, and audit logging.
          The current admin screen does not yet automate those actions.
        </p>
      </section>
      <section>
        <h2>4. Counter-notification</h2>
        <p>
          If your content was disabled because of a copyright notice and you believe the action
          was a mistake or misidentification, use the{' '}
          <Link href="/legal-request">legal request form</Link> and identify the removed content,
          the original notice if known, your contact information, your explanation, and the
          statements and consent to jurisdiction required by applicable law. Because
          jurisdiction and agent details are not configured, qualified counsel must approve the
          final counter-notice requirements before production processing.
        </p>
      </section>
      <section>
        <h2>5. Repeat infringement</h2>
        <p>
          FriendDNA may suspend or terminate accounts of repeat infringers in appropriate
          circumstances after review. The user schema includes a server-controlled copyright
          strike count and account status. A strike must not be added solely from an unreviewed
          report, and the operator must adopt a consistent written review and appeal process.
        </p>
      </section>
      <section>
        <h2>6. Misrepresentations</h2>
        <p>
          Knowingly submitting a materially false notice or counter-notice may create legal
          liability. Do not use this process for disputes that are not genuinely about
          copyright.
        </p>
      </section>
      <section>
        <h2>7. Designated agent status</h2>
        <p>
          FriendDNA does not claim that a designated DMCA agent has been registered. The
          operator must register and maintain an agent with the U.S. Copyright Office if
          seeking applicable DMCA safe-harbor protections and verify the current filing process
          and fee directly in the{' '}
          <a
            href="https://www.copyright.gov/dmca-directory/"
            target="_blank"
            rel="noreferrer"
          >
            U.S. Copyright Office DMCA Designated Agent Directory
          </a>
          . The fee is commonly listed as $6, but FriendDNA has not verified that the fee or
          process remains current.
        </p>
      </section>
    </LegalDocument>
  )
}
