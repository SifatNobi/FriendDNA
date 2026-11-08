'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

export type LegalRequestResult = { ok: boolean; message: string }

export async function submitLegalRequest(
  _previous: LegalRequestResult,
  formData: FormData,
): Promise<LegalRequestResult> {
  const requestType = String(formData.get('requestType') ?? '')
  const contactName = String(formData.get('contactName') ?? '').trim()
  const contactEmail = String(formData.get('contactEmail') ?? '').trim().toLowerCase()
  const contentLocation = String(formData.get('contentLocation') ?? '').trim()
  const rightsDescription = String(formData.get('rightsDescription') ?? '').trim()
  const details = String(formData.get('details') ?? '').trim()
  const signature = String(formData.get('signature') ?? '').trim()
  const goodFaithStatement = formData.get('goodFaithStatement') === 'on'
  const accuracyStatement = formData.get('accuracyStatement') === 'on'
  const requesterEligible = formData.get('requesterEligible') === 'on'

  if (!requesterEligible) {
    return {
      ok: false,
      message: 'Confirm that you are 13 or older or submitting as a parent or guardian.',
    }
  }
  if (!['privacy', 'copyright', 'support'].includes(requestType)) {
    return { ok: false, message: 'Choose a valid request type.' }
  }
  if (!contactName || !contactEmail.includes('@') || details.length < 20) {
    return { ok: false, message: 'Enter your name, a valid email, and enough detail to review the request.' }
  }
  if (
    requestType === 'copyright' &&
    (!contentLocation ||
      !rightsDescription ||
      !signature ||
      !goodFaithStatement ||
      !accuracyStatement)
  ) {
    return {
      ok: false,
      message:
        'Copyright notices require the content location, rights description, signature, and both statements.',
    }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'legal-requests',
      data: {
        requestType: requestType as 'privacy' | 'copyright' | 'support',
        contactName,
        contactEmail,
        contentLocation: contentLocation || undefined,
        rightsDescription: rightsDescription || undefined,
        details,
        signature: signature || undefined,
        goodFaithStatement,
        accuracyStatement,
      },
      context: { verifiedLegalRequest: true },
      overrideAccess: false,
    })
    return {
      ok: true,
      message: 'Your request was received. This confirms receipt only, not review or resolution.',
    }
  } catch {
    return { ok: false, message: "We couldn't submit your request. Please try again." }
  }
}
