'use client'

import { useActionState, useState } from 'react'
import {
  submitLegalRequest,
  type LegalRequestResult,
} from '../actions/legal-request'
import { Check, ShieldCheck } from './icons'

const initialState: LegalRequestResult = { ok: false, message: '' }

export default function LegalRequestForm({
  defaultType,
}: {
  defaultType: 'privacy' | 'copyright' | 'support'
}) {
  const [eligible, setEligible] = useState(false)
  const [state, formAction, pending] = useActionState(submitLegalRequest, initialState)
  if (!eligible) {
    return (
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[.03] p-5">
        <h2 className="text-lg font-black">Before you continue</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          This form collects contact information. Continue only if you are 13 or older, or you
          are a parent or guardian submitting for a child.
        </p>
        <button type="button" onClick={() => setEligible(true)} className="secondary-button mt-5">
          I am eligible to submit
        </button>
      </section>
    )
  }
  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input type="hidden" name="requesterEligible" value="on" />
      <label className="field-label">
        Request type
        <select name="requestType" defaultValue={defaultType} className="field" required>
          <option value="privacy">Privacy request</option>
          <option value="copyright">Copyright notice or counter-notice</option>
          <option value="support">Legal or account support</option>
        </select>
      </label>
      <label className="field-label">Full name<input className="field" name="contactName" required maxLength={120} autoComplete="name" /></label>
      <label className="field-label">Contact email<input className="field" name="contactEmail" required type="email" autoComplete="email" /></label>
      <label className="field-label">Content location or identifier<input className="field" name="contentLocation" maxLength={500} placeholder="Required for copyright notices" /></label>
      <label className="field-label">Copyrighted work or rights involved<textarea className="field min-h-28 py-3" name="rightsDescription" maxLength={4000} placeholder="Required for copyright notices" /></label>
      <label className="field-label">Request details<textarea className="field min-h-36 py-3" name="details" required minLength={20} maxLength={5000} /></label>
      <label className="field-label">Electronic signature<input className="field" name="signature" maxLength={160} placeholder="Required for copyright notices" /></label>
      <label className="flex items-start gap-3 text-xs leading-5 text-slate-400">
        <input type="checkbox" name="goodFaithStatement" className="mt-1 size-4 shrink-0 accent-cyan-400" />
        <span>I have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</span>
      </label>
      <label className="flex items-start gap-3 text-xs leading-5 text-slate-400">
        <input type="checkbox" name="accuracyStatement" className="mt-1 size-4 shrink-0 accent-cyan-400" />
        <span>The information is accurate and I am authorized to act for the rights holder, under penalty of perjury where applicable.</span>
      </label>
      {state.message && (
        <div className={`rounded-xl border p-3 text-xs leading-5 ${state.ok ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200' : 'border-rose-400/20 bg-rose-400/10 text-rose-200'}`}>
          {state.ok && <Check className="mr-2 inline size-4" />}{state.message}
        </div>
      )}
      <button type="submit" disabled={pending} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 text-sm font-extrabold text-white disabled:opacity-50">
        <ShieldCheck className="size-4" />{pending ? 'Submitting…' : 'Submit request'}
      </button>
      <p className="text-[11px] leading-5 text-slate-600">
        Submission confirms receipt only. It does not mean the request has been reviewed,
        accepted, or resolved.
      </p>
    </form>
  )
}
