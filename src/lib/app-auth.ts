import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'
import type { User } from '@/payload-types'

const SESSION_COOKIE = 'app-session'

export type AppUser = User & { collection: 'users' }

export function createAppAuth(collection: 'users') {
  return {
    async currentUser(): Promise<AppUser | null> {
      const token = (await cookies()).get(SESSION_COOKIE)?.value
      if (!token) return null
      const payload = await getPayload({ config })
      const headers = new Headers({ Authorization: `JWT ${token}` })
      const { user } = await payload.auth({ headers })
      if (!user || user.collection !== collection) return null
      return user as AppUser
    },
    async login(email: string, password: string) {
      const payload = await getPayload({ config })
      const result = await payload.login({
        collection,
        data: { email: email.trim().toLowerCase(), password },
      })
      if (!result.token || !result.user || result.user.collection !== collection) {
        throw new Error('Unable to create an app session.')
      }
      ;(await cookies()).set(SESSION_COOKIE, result.token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      })
      return result.user as AppUser
    },
    async logout() {
      ;(await cookies()).delete(SESSION_COOKIE)
    },
  }
}

export const appAuth = createAppAuth('users')
