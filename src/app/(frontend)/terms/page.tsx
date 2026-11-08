import Link from 'next/link'
import { LegalDocument } from '../components/LegalDocument'
import {
  GOVERNING_LAW_PLACEHOLDER,
  LEGAL_CONTACT_PLACEHOLDER,
  POSTAL_ADDRESS_PLACEHOLDER,
  TERMS_VERSION,
} from '@/lib/legal'

export const metadata = {
  title: 'Terms of Service · FriendDNA',
  description: 'Terms governing use of FriendDNA.',
}

export default function TermsPage() {
  return (
    <LegalDocument title="Terms of Service" version={TERMS_VERSION}>
      <section>
        <h2>1. Agreement to these Terms</h2>
        <p>
          These Terms govern use of FriendDNA. By creating an account after checking the
          acceptance box, you agree to the displayed Terms and Privacy Policy versions. Opening
          a legal document alone is not acceptance. If you do not agree, do not create an
          account or use account features.
        </p>
      </section>
      <section>
        <h2>2. Eligibility and age</h2>
        <p>
          You must be at least 13 years old to create an account or use features that collect
          personal information. FriendDNA asks for age confirmation before account information
          and rejects registration server-side without it. The check depends on truthful
          information and is not foolproof. If you are under 13, do not submit personal
          information.
        </p>
      </section>
      <section>
        <h2>3. Accounts</h2>
        <p>
          You must provide accurate registration information, protect your password and device,
          and promptly report suspected unauthorized access. You are responsible for activity
          through your account to the extent permitted by law. FriendDNA may restrict an
          account when reasonably necessary to address security, abuse, infringement, legal
          obligations, or material violations of these Terms. Account deletion requests may be
          submitted through the <Link href="/legal-request">legal request form</Link>. A
          complete self-service deletion workflow is not yet available.
        </p>
      </section>
      <section>
        <h2>4. FriendDNA features</h2>
        <p>
          FriendDNA includes account registration, profiles, curated question packs, quiz
          creation settings, quiz questions and answer keys, participation records,
          deterministic scores, visibility controls, safety reports, and legal-request tools.
          Social connections, groups, notifications, native rewarded ads, and store billing are
          represented by unavailable or empty states and are not currently production
          integrations.
        </p>
      </section>
      <section>
        <h2>5. User content</h2>
        <p>
          You retain rights you have in quiz titles, descriptions, questions, answers, profile
          text, reports, and other content you submit. You are responsible for that content and
          must have permission to use it. You may not submit content that infringes copyright,
          privacy, publicity, trademark, or other rights.
        </p>
        <p>
          You grant FriendDNA a limited, non-exclusive license to host, store, process,
          reproduce, display, and share your content only as needed to operate FriendDNA and
          honor the visibility and sharing settings you select. This license ends when the
          content is deleted, except for reasonable backup, security, dispute, or legal
          retention.
        </p>
      </section>
      <section>
        <h2>6. Prohibited conduct</h2>
        <p>You must not:</p>
        <ul>
          <li>Infringe copyright or other rights, impersonate others, harass, threaten, defraud, or abuse people.</li>
          <li>Upload malware, probe or bypass security, scrape protected data, or access accounts without authorization.</li>
          <li>Manipulate scores, rewards, billing, subscriptions, referrals, reports, or moderation systems.</li>
          <li>Use FriendDNA unlawfully or to distribute spam, deceptive content, or privacy-invasive material.</li>
        </ul>
      </section>
      <section>
        <h2>7. Subscriptions and purchases</h2>
        <p>
          Proposed prices displayed in FriendDNA are Plus at $3.99 per month or $29.99 per year;
          Bestie Question Pack at $1.99; Couples Question Pack at $1.99; Ultimate Question
          Bundle at $4.99; and Premium Theme Bundle at $2.99. Billing is not configured, so
          these products cannot currently be purchased and no entitlement is granted.
        </p>
        <p>
          If enabled through Google Play or Apple&apos;s App Store, monthly and annual Plus
          subscriptions will automatically renew until cancelled, at the displayed billing
          frequency, unless the store says otherwise. The purchase screen must disclose the
          current price, renewal terms, and cancellation path before affirmative purchase.
          Store-managed subscriptions must be cancelled in the applicable store&apos;s
          subscription settings. Access continues until the verified entitlement expiration.
          Store terms may govern billing, cancellation, and refunds.
        </p>
        <p>
          No free trial is currently offered. Refund policy:{' '}
          <strong>[REFUND POLICY AND STORE-SPECIFIC PROCESS — LEGAL DECISION REQUIRED]</strong>.
          FriendDNA will not claim a purchase, cancellation, restoration, or refund succeeded
          until confirmed by the billing provider.
        </p>
      </section>
      <section>
        <h2>8. Advertising</h2>
        <p>
          The planned Free flow allows one quiz-creation entitlement after three separately
          completed and provider-verified rewarded ads. Ad availability and reward verification
          are not guaranteed; interrupted, failed, unverified, or duplicate callbacks do not
          earn rewards. No ad SDK is currently configured, so rewards cannot presently be
          earned.
        </p>
      </section>
      <section>
        <h2>9. Copyright and takedown</h2>
        <p>
          Copyright complaints and counter-notifications are governed by the{' '}
          <Link href="/copyright">Copyright &amp; DMCA Takedown Policy</Link>. Use the{' '}
          <Link href="/legal-request">legal request form</Link> to identify allegedly
          infringing content. FriendDNA has not confirmed registration of a designated DMCA
          agent.
        </p>
      </section>
      <section>
        <h2>10. Service availability and changes</h2>
        <p>
          Features may change, require updates, become unavailable, or be discontinued for
          operational, security, legal, or product reasons. FriendDNA does not promise
          uninterrupted or error-free availability.
        </p>
      </section>
      <section>
        <h2>11. Suspension and termination</h2>
        <p>
          FriendDNA may suspend or terminate access when reasonably supported by evidence of
          serious or repeated Terms violations, infringement, abuse, fraud, security risk, or a
          legal requirement. Reports are reviewed rather than automatically producing bans.
          Actions should be proportionate, documented, and limited to relevant content or
          accounts where practical.
        </p>
      </section>
      <section>
        <h2>12. Disclaimers and limitation of liability</h2>
        <p>
          FriendDNA is provided on an “as available” basis to the extent permitted by
          applicable law. Nothing in these Terms excludes warranties, remedies, or liability
          that cannot legally be excluded. Any limitation of liability must account for the
          user&apos;s jurisdiction, consumer status, and applicable mandatory rights.
        </p>
        <p>
          <strong>
            LEGAL REVIEW REQUIRED: qualified counsel must draft and approve any monetary cap,
            excluded damages, warranty disclaimer, indemnity, or jurisdiction-specific consumer
            language before launch.
          </strong>
        </p>
      </section>
      <section>
        <h2>13. Governing law and disputes</h2>
        <p><strong>{GOVERNING_LAW_PLACEHOLDER}</strong></p>
        <p>
          No arbitration clause, class-action waiver, venue, or governing jurisdiction is
          adopted by this draft. The operator must obtain jurisdiction-specific legal advice.
        </p>
      </section>
      <section>
        <h2>14. Changes to the Terms</h2>
        <p>
          The version and dates appear above. Material changes should be communicated through
          the app or another appropriate channel, and renewed acceptance requested where
          required. Existing acceptance records retain the version actually accepted.
        </p>
      </section>
      <section>
        <h2>15. Contact</h2>
        <p>Legal contact: <strong>{LEGAL_CONTACT_PLACEHOLDER}</strong></p>
        <p>Postal address: <strong>{POSTAL_ADDRESS_PLACEHOLDER}</strong></p>
        <p>
          Until these are configured, use the <Link href="/legal-request">legal request form</Link>.
        </p>
      </section>
    </LegalDocument>
  )
}
