import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowLeft } from './icons'
import { LEGAL_EFFECTIVE_DATE, LEGAL_LAST_UPDATED } from '@/lib/legal'

export function LegalDocument({
  title,
  version,
  children,
}: {
  title: string
  version: string
  children: ReactNode
}) {
  return (
    <main className="min-h-dvh bg-[#05070B] px-5 pb-16 text-[#F5F8FF]">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between border-b border-white/[.07] py-5">
          <Link href="/" className="icon-button" aria-label="Back to FriendDNA">
            <ArrowLeft className="size-5" />
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/frienddna-logo.png" alt="" width={36} height={36} className="rounded-xl" />
            <strong>Friend<span className="text-cyan-300">DNA</span></strong>
          </Link>
          <span className="size-11" />
        </header>
        <article className="legal-document pt-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            Legal document
          </p>
          <h1>{title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
            <span>Effective: {LEGAL_EFFECTIVE_DATE}</span>
            <span>Last updated: {LEGAL_LAST_UPDATED}</span>
            <span>Version: {version}</span>
          </div>
          <div className="mt-10">{children}</div>
        </article>
        <nav aria-label="Legal documents" className="mt-12 flex flex-wrap gap-4 border-t border-white/[.07] pt-6 text-sm font-bold text-cyan-300">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/copyright">Copyright &amp; DMCA</Link>
          <Link href="/legal-request">Contact &amp; legal requests</Link>
        </nav>
      </div>
    </main>
  )
}
