'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Settings, ShieldCheck, X } from './icons'

type ConsentChoice = 'essential' | 'analytics'
const STORAGE_KEY = 'frienddna-privacy-choice-v1'

function removeAnalytics(id: string) {
  if (!id) return
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = true
  document.getElementById('frienddna-google-analytics')?.remove()
  document.getElementById('frienddna-google-analytics-config')?.remove()
  for (const name of ['_ga', '_gid', `_ga_${id.replace(/^G-/, '')}`]) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`
  }
}

function loadAnalytics(id: string) {
  if (!id || document.getElementById('frienddna-google-analytics')) return
  ;(window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = false
  const script = document.createElement('script')
  script.id = 'frienddna-google-analytics'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  const config = document.createElement('script')
  config.id = 'frienddna-google-analytics-config'
  config.text = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)}, { anonymize_ip: true });
`
  document.head.append(script, config)
}

export default function PrivacyChoices({ googleAnalyticsId }: { googleAnalyticsId: string }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'analytics' && googleAnalyticsId) {
      setChoice('analytics')
      loadAnalytics(googleAnalyticsId)
      return
    }
    if (saved === 'essential') {
      setChoice('essential')
      removeAnalytics(googleAnalyticsId)
      return
    }
    setOpen(true)
  }, [googleAnalyticsId])

  const saveChoice = (nextChoice: ConsentChoice) => {
    window.localStorage.setItem(STORAGE_KEY, nextChoice)
    setChoice(nextChoice)
    setOpen(false)
    if (nextChoice === 'analytics' && googleAnalyticsId) loadAnalytics(googleAnalyticsId)
    else removeAnalytics(googleAnalyticsId)
  }

  return (
    <>
      {open && (
        <div className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-lg rounded-3xl border border-blue-400/20 bg-[#101827] p-5 text-[#F5F8FF] shadow-[0_20px_80px_rgba(0,0,0,.55)]">
          {choice && (
            <button type="button" onClick={() => setOpen(false)} aria-label="Close privacy choices" className="absolute right-3 top-3 icon-button">
              <X className="size-4" />
            </button>
          )}
          <div className="flex gap-3">
            <div className="pack-icon pack-blue"><ShieldCheck className="size-5" /></div>
            <div className="pr-8">
              <strong className="text-sm">Privacy choices</strong>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Essential storage supports login, consent, and onboarding. Optional Google
                Analytics loads only if configured and you choose Allow analytics.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => saveChoice('essential')} className="secondary-button">
              Use essential only
            </button>
            <button
              type="button"
              onClick={() => saveChoice('analytics')}
              disabled={!googleAnalyticsId}
              className="flex min-h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-4 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {googleAnalyticsId ? 'Allow analytics' : 'Analytics not configured'}
            </button>
          </div>
          <p className="mt-3 text-[10px] leading-4 text-slate-600">
            Continued browsing is not consent. Read the <Link href="/privacy" className="text-cyan-300">Privacy Policy</Link>.
          </p>
        </div>
      )}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-3 left-3 z-50 flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-[#101827] px-3 text-[11px] font-bold text-slate-300 shadow-xl"
        >
          <Settings className="size-4" /> Privacy choices
        </button>
      )}
    </>
  )
}
