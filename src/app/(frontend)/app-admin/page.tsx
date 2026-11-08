import Link from 'next/link'
import { appAuth } from '@/lib/app-auth'
import { EXCLUSIVE_ADMIN_EMAIL, isExclusiveAppAdmin, normalizeEmail } from '@/lib/admin-auth'
import { BarChart3, BookOpen, LockKeyhole, ShieldCheck, Users } from '../components/icons'
import config from '@payload-config'
import { getPayload } from 'payload'

export const metadata = {
  title: 'Application Administration · FriendDNA',
}

export default async function AppAdminPage() {
  const user = await appAuth.currentUser()
  const isAllowlisted = normalizeEmail(user?.email) === EXCLUSIVE_ADMIN_EMAIL
  const authorized = isExclusiveAppAdmin(user)

  if (!authorized) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center bg-[#05070B] px-6 text-center text-white">
        <div className="grid size-20 place-items-center rounded-3xl border border-rose-400/20 bg-rose-400/10 text-rose-300"><LockKeyhole className="size-9" /></div>
        <span className="mt-7 inline-flex rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[11px] font-bold text-slate-400">SERVER AUTHORIZATION GATE</span>
        <h1 className="mt-4 text-3xl font-black tracking-[-0.045em]">
          {!user ? 'Sign in required.' : isAllowlisted ? 'Administrator setup pending.' : 'Access denied.'}
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
          {!user
            ? 'Authenticate with the FriendDNA app account before this route can evaluate administrator access.'
            : isAllowlisted
              ? 'The allowlisted identity is present, but its email is not server-verified. No administrator session has been granted.'
              : 'You do not have permission to access this page. Changing browser state or UI code cannot grant access.'}
        </p>
        <div className="info-card mt-7 w-full text-left"><ShieldCheck className="size-5 text-cyan-300" /><div><strong>Exclusive application administrator</strong><p>The server allowlist contains only sifatnobiceo@gmail.com and also requires a verified identity.</p></div></div>
        <Link href={user ? '/' : '/account'} className="mt-6 flex min-h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 text-sm font-extrabold">{user ? 'Return to FriendDNA' : 'Go to app sign in'}</Link>
        <p className="mt-5 text-[11px] leading-5 text-slate-600">Payload CMS and Figma workspace permissions are separate control planes and must be configured independently.</p>
      </main>
    )
  }

  const cards = [
    [Users, 'Users & accounts', 'Review account status and safety restrictions.'],
    [ShieldCheck, 'Moderation queue', 'Review user-submitted reports and actions.'],
    [BookOpen, 'Question packs', 'Manage predefined, non-AI quiz content.'],
    [BarChart3, 'Product analytics', 'Consent-aware internal metrics overview.'],
  ] as const
  const payload = await getPayload({ config })
  const [legalRequests, reports] = await Promise.all([
    payload.find({
      collection: 'legal-requests',
      limit: 20,
      sort: '-createdAt',
      overrideAccess: false,
      user,
    }),
    payload.find({
      collection: 'reports',
      limit: 20,
      sort: '-createdAt',
      overrideAccess: false,
      user,
    }),
  ])
  return (
    <main className="mx-auto min-h-dvh max-w-4xl bg-[#05070B] px-6 py-10 text-white">
      <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">VERIFIED EXCLUSIVE ADMIN</span>
      <h1 className="mt-4 text-3xl font-black tracking-[-0.045em]">FriendDNA administration</h1>
      <p className="mt-2 text-sm text-slate-400">Signed in as {user?.email}. Sensitive actions must be audited and authorized individually.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">{cards.map(([Icon, title, description]) => <section key={title} className="surface-card"><div className="pack-icon pack-blue"><Icon className="size-5" /></div><h2 className="mt-4 font-extrabold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></section>)}</div>
      <section className="mt-10">
        <h2 className="text-xl font-black">Legal requests</h2>
        <p className="mt-2 text-sm text-slate-500">Private submissions visible only after exclusive app-admin authorization.</p>
        <div className="mt-4 space-y-3">
          {legalRequests.docs.length ? legalRequests.docs.map((request) => (
            <article key={request.id} className="surface-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong>{request.requestType}</strong>
                <span className="text-xs font-bold text-cyan-300">{request.status}</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">{request.contactName} · {request.contactEmail}</p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-500">{request.details}</p>
            </article>
          )) : <div className="surface-card text-sm text-slate-500">No legal requests.</div>}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-black">Safety and copyright reports</h2>
        <div className="mt-4 space-y-3">
          {reports.docs.length ? reports.docs.map((report) => (
            <article key={report.id} className="surface-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong>{report.reason}</strong>
                <span className="text-xs font-bold text-cyan-300">{report.status}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{report.targetType} · {report.targetId}</p>
              {report.details && <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-500">{report.details}</p>}
            </article>
          )) : <div className="surface-card text-sm text-slate-500">No safety reports.</div>}
        </div>
        <p className="mt-4 text-xs leading-5 text-orange-200">
          Review, notice validation, content removal, counter-notice handling, strike assignment,
          and restoration remain documented manual actions; do not action incomplete reports.
        </p>
      </section>
    </main>
  )
}
