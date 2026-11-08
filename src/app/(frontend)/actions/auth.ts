'use server'

import { appAuth } from '@/lib/app-auth'
import config from '@payload-config'
import { getPayload } from 'payload'
import { PRIVACY_POLICY_VERSION, TERMS_VERSION } from '@/lib/legal'

export type AuthResult = { ok: boolean; message: string }

export async function loginAction(
  _previous: AuthResult,
  formData: FormData,
): Promise<AuthResult> {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  if (!email || password.length < 8) {
    return { ok: false, message: 'Enter a valid email and an 8+ character password.' }
  }
  try {
    await appAuth.login(email, password)
    return { ok: true, message: 'Signed in securely.' }
  } catch {
    return { ok: false, message: 'Email or password was not accepted.' }
  }
}

export async function logoutAction() {
  await appAuth.logout()
}

export async function registerAction(
  _previous: AuthResult,
  formData: FormData,
): Promise<AuthResult> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const displayName = String(formData.get('displayName') ?? '').trim()
  const username = String(formData.get('username') ?? '').trim().toLowerCase()
  const ageConfirmed = formData.get('ageConfirmed') === 'yes'
  const legalAccepted = formData.get('legalAccepted') === 'on'
  if (!ageConfirmed) {
    return { ok: false, message: 'You must confirm that you are 13 or older to create an account.' }
  }
  if (!legalAccepted) {
    return { ok: false, message: 'You must agree to the Privacy Policy and Terms of Service.' }
  }
  if (!email || !displayName || !/^[a-z0-9_]{3,24}$/.test(username) || password.length < 8) {
    return { ok: false, message: 'Check your name, username, email, and 8+ character password.' }
  }
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        displayName,
        username,
        privacySettings: {
          profileVisibility: 'public',
          searchable: true,
          leaderboards: true,
          shareResults: false,
        },
      },
      overrideAccess: false,
      context: {
        appRegistration: true,
        ageConfirmed: true,
        legalAccepted: true,
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
        termsVersion: TERMS_VERSION,
      },
    })
    await appAuth.login(email, password)
    return {
      ok: true,
      message: 'Account created. Email verification remains pending until delivery is configured.',
    }
  } catch {
    return { ok: false, message: 'We could not create that account. The email or username may be in use.' }
  }
}
