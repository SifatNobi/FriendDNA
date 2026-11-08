'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useActionState, useState } from 'react'
import { loginAction, registerAction, type AuthResult } from '../actions/auth'
import { ArrowLeft, Check, LockKeyhole, ShieldCheck } from './icons'

const initialState: AuthResult = { ok: false, message: '' }

export default function AccountAuth() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [ageStatus, setAgeStatus] = useState<'eligible' | 'blocked' | null>(null)
  const [loginState, loginForm, loginPending] = useActionState(loginAction, initialState)
  const [registerState, registerForm, registerPending] = useActionState(registerAction, initialState)
  const state = mode === 'login' ? loginState : registerState
  const pending = mode === 'login' ? loginPending : registerPending
  return (
    <main className="mx-auto min-h-dvh max-w-md border-x border-white/[.04] bg-[#05070B] px-5 pb-8 text-[#F5F8FF]">
      <div className="flex items-center justify-between py-5">
        <Link href="/" className="icon-button" aria-label="Back to FriendDNA"><ArrowLeft className="size-5" /></Link>
        <div className="flex items-center gap-2">
          <Image src="/frienddna-logo.png" alt="" width={36} height={36} className="rounded-xl" />
          <strong>Friend<span className="text-cyan-300">DNA</span></strong>
        </div>
        <span className="size-11" />
      </div>
      <div className="mt-8">
        <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold text-cyan-300">SECURE APP ACCOUNT</span>
        <h1 className="mt-4 text-3xl font-black tracking-[-0.045em]">{mode === 'login' ? 'Welcome back.' : 'Join the challenge.'}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">{mode === 'login' ? 'Sign in to sync quizzes and friendships.' : 'Create an app account\u00a0\u00a0\u00a0\u00a0'}</p>
      </div>
      <div className="mt-7 grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[.03] p-1.5">
        <button type="button" onClick={() => setMode('login')} className={`rounded-xl px-4 py-3 text-sm font-bold ${mode === 'login' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Sign in</button>
        <button type="button" onClick={() => { setMode('register'); setAgeStatus(null) }} className={`rounded-xl px-4 py-3 text-sm font-bold ${mode === 'register' ? 'bg-white/10 text-white' : 'text-slate-500'}`}>Create account</button>
      </div>
      {mode === 'register' && ageStatus === null && (
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[.03] p-5">
          <h2 className="text-lg font-black">Age check</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            FriendDNA is not intended for children under 13. Confirm your age before entering
            account information.
          </p>
          <div className="mt-5 space-y-3">
            <button type="button" onClick={() => setAgeStatus('eligible')} className="secondary-button">
              I am 13 or older
            </button>
            <button type="button" onClick={() => setAgeStatus('blocked')} className="text-button">
              I am under 13
            </button>
          </div>
        </section>
      )}
      {mode === 'register' && ageStatus === 'blocked' && (
        <section className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-5">
          <h2 className="text-lg font-black text-rose-100">Account creation unavailable</h2>
          <p className="mt-2 text-sm leading-6 text-rose-100/75">
            You must be at least 13 to create a FriendDNA account. No account information was
            collected or submitted.
          </p>
          <button type="button" onClick={() => setMode('login')} className="secondary-button mt-5">
            Return to sign in
          </button>
        </section>
      )}
      {(mode === 'login' || ageStatus === 'eligible') && <form action={mode === 'login' ? loginForm : registerForm} className="mt-6">
        {mode === 'register' && (
          <>
            <input type="hidden" name="ageConfirmed" value="yes" />
            <label className="field-label">Display name<input className="field" name="displayName" required maxLength={48} autoComplete="name" /></label>
            <label className="field-label">Username<input className="field" name="username" required minLength={3} maxLength={24} pattern="[a-z0-9_]+" autoCapitalize="none" /></label>
          </>
        )}
        <label className="field-label">Email<input className="field" name="email" required type="email" autoComplete="email" /></label>
        <label className="field-label">Password<input className="field" name="password" required type="password" minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
        {mode === 'register' && (
          <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-slate-400">
            <input
              type="checkbox"
              name="legalAccepted"
              required
              className="mt-1 size-4 shrink-0 accent-cyan-400"
            />
            <span>
              By signing up, you agree to our{' '}
              <Link href="/privacy" className="font-bold text-cyan-300 underline underline-offset-2">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="font-bold text-cyan-300 underline underline-offset-2">
                Terms of Service
              </Link>
              .
            </span>
          </label>
        )}
        {state.message && <div className={`mt-4 rounded-xl border p-3 text-xs leading-5 ${state.ok ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200' : 'border-rose-400/20 bg-rose-400/10 text-rose-200'}`}>{state.ok && <Check className="mr-2 inline size-4" />}{state.message}</div>}
        <button type="submit" disabled={pending} className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3.5 text-sm font-extrabold text-white disabled:opacity-50">
          <LockKeyhole className="size-4" />{pending ? 'Working…' : mode === 'login' ? 'Sign in securely' : 'Create account'}
        </button>
      </form>}
      <div className="info-card mt-6"><ShieldCheck className="size-5 text-cyan-300" /><div><strong>Secured</strong><p>{'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}</p></div></div>
      <p className="mt-6 text-center text-[11px] leading-5 text-slate-600">Password reset and verification email delivery require a transactional email provider and are not active in this preview.</p>
      <nav aria-label="Legal" className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] font-bold text-slate-500">
        <Link href="/privacy" className="hover:text-cyan-300">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-cyan-300">Terms of Service</Link>
        <Link href="/copyright" className="hover:text-cyan-300">Copyright &amp; DMCA</Link>
      </nav>
    </main>
  )
}
