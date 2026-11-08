'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ArrowRight, X } from './icons'

const CHANGEAIPAY_DESTINATION = 'https://forms.gle/yHUUAbWaQS2hhfQq8'

type ChangeAIPayPromoProps = {
  onDismiss: () => void
}

export default function ChangeAIPayPromo({ onDismiss }: ChangeAIPayPromoProps) {
  const [phase, setPhase] = useState<'invite' | 'confirm'>('invite')
  const [seconds, setSeconds] = useState(3)
  const [navigationError, setNavigationError] = useState('')

  const visitChangeAIPay = useCallback(() => {
    setNavigationError('')
    try {
      window.location.assign(CHANGEAIPAY_DESTINATION)
    } catch {
      setNavigationError("We couldn't open ChangeAIPay. Please try again.")
    }
  }, [])

  useEffect(() => {
    if (phase !== 'invite') return
    const redirectTimer = window.setTimeout(visitChangeAIPay, 3000)
    const countdownTimer = window.setInterval(
      () => setSeconds((value) => Math.max(0, value - 1)),
      1000,
    )
    return () => {
      window.clearTimeout(redirectTimer)
      window.clearInterval(countdownTimer)
    }
  }, [phase, visitChangeAIPay])

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="changeaipay-title"
    >
      <div className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-blue-400/20 bg-[#101827] shadow-[0_24px_90px_rgba(0,0,0,.55)]">
        <div className="relative h-48 overflow-hidden bg-[#050b53]">
          <Image
            src="/changeaipay-logo.jpg"
            alt="ChangeAIPay"
            fill
            sizes="384px"
            className="object-contain"
            priority
          />
          <button
            type="button"
            onClick={() => setPhase('confirm')}
            aria-label="Close ChangeAIPay invitation"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-xl border border-white/20 bg-black/35 text-white backdrop-blur"
          >
            <X className="size-5" />
          </button>
        </div>
        {phase === 'invite' ? (
          <div className="p-6">
            <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold text-cyan-300">
              OPENS IN {seconds}S
            </span>
            <h2 id="changeaipay-title" className="mt-4 text-2xl font-black tracking-[-0.04em]">
              Join ChangeAIPay
            </h2>
            <p className="mt-2 text-lg font-extrabold text-cyan-300">
              Zero transaction fees for lifetime.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Experience a new way to move money. Join ChangeAIPay and discover the future of
              payments.
            </p>
            {navigationError && (
              <p className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-xs text-rose-200">
                {navigationError}
              </p>
            )}
            <button
              type="button"
              onClick={visitChangeAIPay}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 text-sm font-extrabold text-white"
            >
              Join ChangeAIPay <ArrowRight className="size-4" />
            </button>
            <p className="mt-3 text-center text-[10px] leading-4 text-slate-600">
              Opening the invitation does not submit the form or confirm membership.
            </p>
          </div>
        ) : (
          <div className="p-6">
            <h2 id="changeaipay-title" className="text-2xl font-black tracking-[-0.04em]">
              You&apos;re missing out on something big!
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Leave now or visit ChangeAIPay and discover what&apos;s waiting for you.
            </p>
            {navigationError && (
              <p className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-xs text-rose-200">
                {navigationError}
              </p>
            )}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={visitChangeAIPay}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 text-sm font-extrabold text-white"
              >
                Visit ChangeAIPay <ArrowRight className="size-4" />
              </button>
              <button type="button" onClick={onDismiss} className="secondary-button">
                Leave now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
