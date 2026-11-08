'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#05070B] text-[#F5F8FF]">
        <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
          <div className="grid size-16 place-items-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-2xl font-black text-rose-300">!</div>
          <h1 className="mt-6 text-2xl font-black">FriendDNA hit a snag.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">Your local quiz progress is still on this device. Try the screen again.</p>
          <button type="button" onClick={reset} className="mt-6 min-h-12 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 text-sm font-extrabold text-white">Try again</button>
        </main>
      </body>
    </html>
  )
}
