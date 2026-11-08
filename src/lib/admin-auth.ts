export const EXCLUSIVE_ADMIN_EMAIL = 'sifatnobiceo@gmail.com'

type AppIdentity = {
  collection?: string
  email?: string | null
  emailVerified?: boolean | null
}

export function normalizeEmail(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? ''
}

export function isExclusiveAppAdmin(user: AppIdentity | null | undefined) {
  return (
    user?.collection === 'users' &&
    user.emailVerified === true &&
    normalizeEmail(user.email) === EXCLUSIVE_ADMIN_EMAIL
  )
}
