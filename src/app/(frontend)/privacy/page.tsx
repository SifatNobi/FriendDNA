import Link from 'next/link'
import { LegalDocument } from '../components/LegalDocument'
import {
  PRIVACY_CONTACT_PLACEHOLDER,
  PRIVACY_POLICY_VERSION,
} from '@/lib/legal'

export const metadata = {
  title: 'Privacy Policy · FriendDNA',
  description: 'How FriendDNA collects, uses, shares, and protects information.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument title="Privacy Policy" version={PRIVACY_POLICY_VERSION}>
      <section>
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy explains how the FriendDNA application and service handles
          information when people create accounts, build or answer quizzes, use social and
          safety features, or contact us. It applies to FriendDNA&apos;s public website,
          account area, app experience, and connected Payload backend.
        </p>
        <p>
          Privacy contact: <strong>{PRIVACY_CONTACT_PLACEHOLDER}</strong>. Until a monitored
          privacy email is configured, use the public{' '}
          <Link href="/legal-request">privacy request form</Link>.
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <h3>Information you provide</h3>
        <ul>
          <li>
            <strong>Account and profile information:</strong> email address, password handled
            by Payload authentication, username, display name, avatar selection, optional bio,
            interests, and privacy preferences.
          </li>
          <li>
            <strong>Age and legal acceptance:</strong> FriendDNA stores the time you confirmed
            you were 13 or older, the time of acceptance, and the Privacy Policy and Terms
            versions accepted. FriendDNA does not request your birth date.
          </li>
          <li>
            <strong>Quiz information:</strong> quiz titles, descriptions, types, visibility,
            settings, questions, answer keys, accepted answers, and content you choose to add.
          </li>
          <li>
            <strong>Participation information:</strong> submitted answers, quiz score, number
            of scored questions, completion time, account identifier when signed in, or a guest
            session identifier where guest participation is supported.
          </li>
          <li>
            <strong>Safety and legal requests:</strong> reports, target identifiers, reasons,
            details, contact name, contact email, copyright statements, signatures, and
            supporting descriptions submitted through legal forms.
          </li>
          <li>
            <strong>Subscription state:</strong> the account schema can store Free or Plus
            status. Store billing is not currently configured, so FriendDNA does not currently
            receive confirmed purchase receipts or payment credentials.
          </li>
        </ul>
        <h3>Information collected automatically</h3>
        <p>
          The web application uses an HTTP-only app session cookie after login. It also uses
          browser local storage for onboarding status and privacy-consent preferences. The
          hosting and backend infrastructure necessarily receives request information such as
          IP address, browser or user-agent information, requested URL, and timestamps for
          delivery, security, and operational logs. The app does not currently implement a
          separate retention schedule for those platform logs.
        </p>
        <h3>Information not currently collected by active app features</h3>
        <p>
          FriendDNA has no active contact upload, push-notification provider, marketing email
          provider, ad SDK, payment SDK, crash-reporting SDK, session replay, microphone
          recording, or app-user photo upload. Payload includes an administrator media
          collection, but the public account flow does not currently provide a media-upload
          control.
        </p>
      </section>

      <section>
        <h2>3. How information is used</h2>
        <p>FriendDNA uses information to:</p>
        <ul>
          <li>Create and authenticate app accounts and restore app sessions.</li>
          <li>Provide profiles, quiz creation, participation, deterministic scoring, sharing settings, and safety tools.</li>
          <li>Apply privacy choices and restrict access to user-owned and private records.</li>
          <li>Investigate reports, copyright notices, abuse, security events, and legal requests.</li>
          <li>Maintain service security, diagnose failures, and prevent unauthorized access.</li>
          <li>Record legal acceptance and age confirmation for account eligibility.</li>
        </ul>
        <p>
          Optional analytics would be used only for aggregate product measurement after a user
          chooses analytics in Privacy Choices and only if a Google Analytics identifier is
          configured. Advertising and billing are currently unavailable and are not active
          processing purposes.
        </p>
      </section>

      <section>
        <h2>4. Sharing and third-party services</h2>
        <ul>
          <li>
            <strong>Figma Make and Payload/Figma Cloud:</strong> essential hosting, database,
            authentication, file delivery, and application infrastructure. These services may
            process account records, user content, request metadata, and operational logs as
            needed to run FriendDNA.
          </li>
          <li>
            <strong>Google Analytics:</strong> optional and not currently configured in the
            checked site settings. If configured later, its script is loaded only after
            analytics consent and may receive device, browser, page, and interaction
            information. It is not essential.
          </li>
          <li>
            <strong>Google Forms / ChangeAIPay:</strong> an optional external destination opened
            from the ChangeAIPay promotion. No FriendDNA score, username, answers, account ID,
            or form-prefill data is added to the destination. Google and the destination may
            receive browser, IP, and information a visitor submits after leaving FriendDNA.
          </li>
          <li>
            <strong>Apple App Store, Google Play, and Google Mobile Ads:</strong> described in
            unavailable product screens but no related SDK is installed or active. Their data
            practices do not apply unless those integrations are configured and the policy is
            updated.
          </li>
        </ul>
        <p>FriendDNA does not sell personal information in the audited implementation.</p>
      </section>

      <section>
        <h2>5. Cookies, analytics, advertising, and tracking</h2>
        <p>
          The app-session cookie is essential for signed-in use. Local storage remembers
          onboarding status and the user&apos;s privacy choice. FriendDNA does not treat
          continued browsing as consent. The Privacy Choices control lets a visitor reject or
          allow optional analytics and later reopen the choice. Rejecting analytics prevents
          the Google Analytics script from loading; withdrawal disables future analytics calls
          in that browser and attempts to remove first-party Google Analytics cookies.
        </p>
        <p>
          No advertising SDK, behavioral advertising identifier, pixel, heatmap, session
          replay, or keystroke recorder is active. The rewarded-ad screen is disabled because
          no provider is configured.
        </p>
      </section>

      <section>
        <h2>6. Data retention and deletion</h2>
        <p>
          Specific retention periods have not been configured for users, quizzes, questions,
          attempts, reports, legal requests, audit logs, media, or infrastructure logs. These
          periods must be set before production launch. Records are presently retained until
          deletion, anonymization, operational cleanup, or a legitimate legal or security need
          requires temporary preservation.
        </p>
        <p>
          Users may request access, correction, or deletion through the{' '}
          <Link href="/legal-request">legal request form</Link>. The existing app schema allows
          an authenticated user to delete their own account, but a complete self-service
          reauthentication, cascade-deletion, content anonymization, and session-revocation
          workflow remains to be implemented. Uninstalling the app does not delete an account.
          Content that must be preserved for fraud, security, dispute, or legal obligations may
          be retained only as necessary.
        </p>
      </section>

      <section>
        <h2>7. Security</h2>
        <p>
          FriendDNA separates public app accounts from Payload CMS administrators, uses an
          HTTP-only same-site app session cookie, enforces collection access rules, assigns
          ownership server-side, withholds answer-key collections from unauthenticated access,
          and restricts app administration to one verified allowlisted identity. Password
          processing is provided by Payload authentication. No system can guarantee absolute
          security, and FriendDNA does not claim a security certification.
        </p>
      </section>

      <section>
        <h2>8. Children&apos;s privacy</h2>
        <p>
          FriendDNA is not intended for children under 13. We do not knowingly collect personal
          information from children under 13. If we learn that we have collected personal
          information from a child under 13, we will take appropriate steps to delete it.
        </p>
        <p>
          Registration asks for age confirmation before account fields appear, and the backend
          rejects account creation without trusted age confirmation. The check relies on the
          registrant&apos;s truthful statement and is not foolproof.
        </p>
      </section>

      <section>
        <h2>9. Privacy rights</h2>
        <p>
          Depending on location and applicable law, a person may have rights to request access,
          correction, deletion, restriction, portability, objection, or withdrawal of consent.
          These rights are not universal and may be subject to exceptions. Submit requests
          through the <Link href="/legal-request">privacy request form</Link>. Identity
          verification may be required before disclosing or changing account information.
        </p>
      </section>

      <section>
        <h2>10. International data transfers</h2>
        <p>
          FriendDNA uses Figma-managed hosting and Payload infrastructure. The codebase does not
          specify processing countries or contractual transfer safeguards. Information may be
          processed outside a user&apos;s country depending on infrastructure configuration.
          The operator must obtain and publish the hosting locations and applicable transfer
          safeguards before launch.
        </p>
      </section>

      <section>
        <h2>11. Policy updates</h2>
        <p>
          The effective date, last-updated date, and version appear above. Material changes
          should be communicated in the app or by another appropriate channel and renewed
          acceptance requested where required. FriendDNA stores the version accepted at
          registration and does not silently rewrite that record.
        </p>
      </section>

      <section>
        <h2>12. Contact</h2>
        <p>
          Privacy contact: <strong>{PRIVACY_CONTACT_PLACEHOLDER}</strong>. A monitored email and
          valid operator details must be configured. Until then, submit a{' '}
          <Link href="/legal-request">privacy request</Link>.
        </p>
      </section>
    </LegalDocument>
  )
}
