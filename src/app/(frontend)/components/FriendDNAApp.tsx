'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Compass,
  Copy,
  Crown,
  Eye,
  Flame,
  Gamepad2,
  Heart,
  Home,
  LockKeyhole,
  Medal,
  MessageCircle,
  Music2,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UserPlus,
  Users,
  UserRound,
  X,
  Zap,
} from './icons'
import { useEffect, useMemo, useState } from 'react'
import ChangeAIPayPromo from './ChangeAIPayPromo'

type Screen =
  | 'welcome'
  | 'onboarding'
  | 'home'
  | 'discover'
  | 'create'
  | 'unlock'
  | 'play'
  | 'result'
  | 'friends'
  | 'profile'
  | 'settings'
  | 'plus'
  | 'notifications'
  | 'achievements'

type PackPreview = {
  title: string
  questionCount: number
  difficulty: string
  accent?: string | null
  premium?: boolean | null
  category: string
  questions?: Array<{
    text: string
    options?: Array<{ label: string }> | null
  }> | null
}

const quizTypes = [
  ['How well do you know me?', 'The classic FriendDNA challenge.', Heart],
  ['My favorites', 'Food, music, places, and tiny obsessions.', Star],
  ['This or That', 'Quick picks with zero overthinking.', Zap],
  ['Friendship memories', 'The moments only your people know.', BookOpen],
] as const

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/frienddna-logo.png"
        alt="FriendDNA"
        width={compact ? 38 : 48}
        height={compact ? 38 : 48}
        className="rounded-xl object-cover shadow-[0_0_24px_rgba(53,216,255,.22)]"
        priority
      />
      <div>
        <div className={cx('font-black tracking-[-0.04em]', compact ? 'text-lg' : 'text-xl')}>
          Friend<span className="text-cyan-300">DNA</span>
        </div>
        {!compact && <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Know your people</div>}
      </div>
    </div>
  )
}

function Avatar({ initials = 'FD', color = 'blue', small = false }: { initials?: string; color?: string; small?: boolean }) {
  const colors: Record<string, string> = {
    blue: 'from-blue-600 to-cyan-400',
    cyan: 'from-cyan-500 to-blue-500',
    violet: 'from-violet-500 to-blue-500',
    pink: 'from-pink-500 to-violet-500',
    green: 'from-emerald-500 to-cyan-500',
  }
  return (
    <div className={cx('grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-bold text-white ring-2 ring-white/10', colors[color] ?? colors.blue, small ? 'size-9 text-xs' : 'size-12 text-sm')}>
      {initials}
    </div>
  )
}

function Pill({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'green' | 'violet' | 'muted' }) {
  const tones = {
    blue: 'border-blue-400/20 bg-blue-500/10 text-cyan-300',
    green: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    violet: 'border-violet-400/20 bg-violet-400/10 text-violet-300',
    muted: 'border-white/10 bg-white/[.04] text-slate-400',
  }
  return <span className={cx('inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold', tones[tone])}>{children}</span>
}

function PrimaryButton({ children, onClick, disabled = false, icon: Icon = ArrowRight, type = 'button' }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; icon?: typeof ArrowRight; type?: 'button' | 'submit' }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_34px_rgba(22,119,255,.28)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(22,119,255,.38)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40">
      {children}
      <Icon className="size-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  )
}

function TopBar({ title, onBack, onNavigate }: { title?: string; onBack?: () => void; onNavigate: (screen: Screen) => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[.06] bg-[#05070B]/88 px-5 py-3 backdrop-blur-xl">
      {onBack ? (
        <button type="button" onClick={onBack} aria-label="Go back" className="icon-button">
          <ArrowLeft className="size-5" />
        </button>
      ) : <Brand compact />}
      {title && <div className="absolute left-1/2 -translate-x-1/2 text-sm font-extrabold">{title}</div>}
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onNavigate('notifications')} aria-label="Notifications" className="icon-button relative">
          <Bell className="size-5" />
        </button>
        <button type="button" onClick={() => onNavigate('profile')} aria-label="Profile">
          <Avatar small />
        </button>
      </div>
    </header>
  )
}

function BottomNav({ active, onNavigate }: { active: Screen; onNavigate: (screen: Screen) => void }) {
  const items = [
    [Home, 'Home', 'home'],
    [Compass, 'Discover', 'discover'],
    [Plus, 'Create', 'create'],
    [Users, 'Friends', 'friends'],
    [UserRound, 'Profile', 'profile'],
  ] as const
  return (
    <nav aria-label="Primary navigation" className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-md items-end justify-around border-t border-white/10 bg-[#080C13]/94 px-2 pb-[max(.65rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl">
      {items.map(([Icon, label, target]) => {
        const selected = active === target
        const prominent = target === 'create'
        return (
          <button key={target} type="button" onClick={() => onNavigate(target)} className={cx('flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold transition', selected ? 'text-cyan-300' : 'text-slate-500 hover:text-slate-200', prominent && '-mt-6')}>
            <span className={cx('grid place-items-center', prominent ? 'size-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-[0_8px_30px_rgba(22,119,255,.38)]' : 'size-6')}>
              <Icon className={prominent ? 'size-6' : 'size-5'} strokeWidth={selected ? 2.6 : 2} />
            </span>
            {label}
          </button>
        )
      })}
    </nav>
  )
}

function Welcome({ onStart, onPreview }: { onStart: () => void; onPreview: () => void }) {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden px-6 pb-8 pt-7">
      <div className="glow-orb -left-24 top-20 bg-blue-600" />
      <div className="glow-orb -right-24 top-1/3 bg-cyan-400" />
      <Brand />
      <div className="relative mx-auto mt-10 grid size-64 place-items-center">
        <div className="absolute inset-3 animate-[spin_18s_linear_infinite] rounded-full border border-blue-500/20" />
        <div className="absolute inset-10 rounded-full bg-blue-500/10 blur-2xl" />
        <Image src="/frienddna-logo.png" alt="" width={220} height={220} className="relative rounded-[2rem] object-cover shadow-[0_0_70px_rgba(22,119,255,.25)]" />
      </div>
      <div className="mt-10">
        <Pill>THE FRIENDSHIP QUIZ</Pill>
        <h1 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.055em] text-white">
          Your friends know you.
          <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">But how well?</span>
        </h1>
        <p className="mt-4 max-w-sm text-[15px] leading-6 text-slate-400">Create your quiz, challenge your people, and discover who really gets you.</p>
      </div>
      <div className="mt-auto space-y-3 pt-8">
        <PrimaryButton onClick={onStart}>Let&apos;s play</PrimaryButton>
        <button type="button" onClick={onPreview} className="secondary-button">Preview the experience</button>
        <button type="button" onClick={() => { window.location.href = '/account' }} className="text-button">I already have an account</button>
        <p className="text-center text-[11px] leading-4 text-slate-600">Preview progress stays on this device. Cross-device sync starts after sign-in.</p>
        <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-600">
          <Link href="/privacy" className="hover:text-cyan-300">Privacy</Link>
          <Link href="/terms" className="hover:text-cyan-300">Terms</Link>
          <Link href="/copyright" className="hover:text-cyan-300">Copyright</Link>
        </nav>
      </div>
    </main>
  )
}

function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [selectedAvatar, setSelectedAvatar] = useState(0)
  const labels = ['Your profile', 'Pick your vibe', 'Choose a look', 'Ready to play']
  const toggle = (value: string) => setInterests((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  return (
    <main className="min-h-dvh px-5 pb-8">
      <div className="flex items-center justify-between py-5">
        <button type="button" onClick={() => step ? setStep(step - 1) : undefined} className="icon-button" aria-label="Previous step"><ArrowLeft className="size-5" /></button>
        <div className="flex gap-1.5">{labels.map((_, index) => <span key={index} className={cx('h-1.5 rounded-full transition-all', index <= step ? 'w-6 bg-cyan-300' : 'w-2 bg-slate-800')} />)}</div>
        <span className="w-11 text-right text-xs font-bold text-slate-500">{step + 1}/4</span>
      </div>
      <Pill tone="muted">SETUP · {labels[step].toUpperCase()}</Pill>
      {step === 0 && (
        <section className="mt-5">
          <h1 className="screen-title">First, make it yours.</h1>
          <p className="screen-subtitle">This is how friends will recognize you.</p>
          <div className="mt-8 flex justify-center"><Avatar initials={(name || 'FD').slice(0, 2).toUpperCase()} /></div>
          <label className="field-label">Display name<input className="field" value={name} onChange={(event) => setName(event.target.value)} maxLength={48} /></label>
          <label className="field-label">Username<div className="relative"><span className="absolute left-4 top-3.5 text-slate-500">@</span><input className="field pl-9" value={username} onChange={(event) => setUsername(event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} maxLength={24} /></div></label>
          <p className="mt-2 text-xs text-slate-500">Local format check only. Availability is confirmed after account creation.</p>
        </section>
      )}
      {step === 1 && (
        <section className="mt-5">
          <h1 className="screen-title">What&apos;s your quiz energy?</h1>
          <p className="screen-subtitle">We&apos;ll filter predefined packs—no AI involved.</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            {['Best friends', 'Couples', 'Family', 'Gaming', 'Movies & music', 'Funny questions', 'Personality', 'Nostalgia', 'Random questions'].map((item) => (
              <button type="button" key={item} onClick={() => toggle(item)} className={cx('selection-card min-h-20 text-left', interests.includes(item) && 'selection-card-active')}>
                <span className="text-sm font-bold">{item}</span>
                {interests.includes(item) && <Check className="size-4 text-cyan-300" />}
              </button>
            ))}
          </div>
        </section>
      )}
      {step === 2 && (
        <section className="mt-5">
          <h1 className="screen-title">Choose your orbit.</h1>
          <p className="screen-subtitle">Safe illustrations and initials only. Add a photo later if you want.</p>
          <div className="mt-10 grid grid-cols-3 gap-5">
            {['blue', 'cyan', 'violet', 'pink', 'green', 'blue'].map((color, index) => (
              <button type="button" onClick={() => setSelectedAvatar(index)} key={index} className={cx('rounded-3xl border p-3 transition', index === selectedAvatar ? 'border-cyan-300 bg-cyan-300/10' : 'border-white/10 bg-white/[.03]')}>
                <Avatar initials={['SR', 'S', 'FD', 'SP', 'DNA', 'SK'][index]} color={color} />
              </button>
            ))}
          </div>
          <div className="mt-9 info-card"><ShieldCheck className="size-5 text-cyan-300" /><div><div className="font-bold">Privacy by default</div><p>Your quiz answers stay private until you choose to share a result.</p></div></div>
        </section>
      )}
      {step === 3 && (
        <section className="mt-5 text-center">
          <div className="mx-auto mt-8 grid size-24 place-items-center rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-400 shadow-[0_0_45px_rgba(22,119,255,.3)]"><Check className="size-11" strokeWidth={3} /></div>
          <h1 className="mt-8 text-3xl font-black tracking-[-0.04em]">You&apos;re ready, {name}.</h1>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400">One quiz. Ten questions. Zero excuses. Your first challenge is waiting.</p>
          <div className="mt-8 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-600/20 to-cyan-400/5 p-5 text-left">
            <div className="flex items-center gap-3"><Avatar initials={(name || 'FD').slice(0, 2).toUpperCase()} /><div><div className="font-extrabold">{name || 'FriendDNA Player'}</div><div className="text-xs text-slate-400">@{username || 'your_username'}</div></div><Pill tone="green">PROFILE PREVIEW</Pill></div>
          </div>
        </section>
      )}
      <div className="mt-10">
        <PrimaryButton onClick={() => step < 3 ? setStep(step + 1) : onDone()} disabled={step === 0 && (!name || username.length < 3)}>{step === 3 ? 'Create my first quiz' : 'Continue'}</PrimaryButton>
      </div>
    </main>
  )
}

function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <>
      <TopBar onNavigate={onNavigate} />
      <main className="page-shell">
        <div>
          <p className="text-sm text-slate-400">Welcome to FriendDNA</p>
          <h1 className="text-2xl font-black tracking-[-0.04em]">
            Ready to <span className="text-cyan-300">start something?</span>
          </h1>
        </div>
        <section className="hero-card mt-6">
          <div className="relative z-10 max-w-[68%]">
            <Pill>YOUR NEXT MOVE</Pill>
            <h2 className="mt-4 text-[26px] font-black leading-7 tracking-[-0.04em]">Who&apos;s got your DNA figured out?</h2>
            <p className="mt-3 text-sm leading-5 text-slate-300">Build a quiz and put your friendships to the test.</p>
            <button type="button" onClick={() => onNavigate('unlock')} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5">Create a quiz <ArrowRight className="size-4" /></button>
          </div>
          <Image src="/frienddna-logo.png" alt="" width={190} height={190} className="absolute -bottom-10 -right-10 rounded-[2.5rem] opacity-80 mix-blend-screen" />
        </section>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[[Send, 'Quizzes', 'discover'], [UserPlus, 'Invite', 'friends'], [Compass, 'Find packs', 'discover']].map(([Icon, label, screen]) => (
            <button key={label as string} type="button" onClick={() => onNavigate(screen as Screen)} className="quick-action"><span className="grid size-9 place-items-center rounded-xl bg-blue-500/10 text-cyan-300"><Icon className="size-4" /></span><span>{label as string}</span></button>
          ))}
        </div>
        <div className="section-heading"><div><span>Your quizzes</span></div></div>
        <div className="surface-card py-10 text-center">
          <BookOpen className="mx-auto size-6 text-slate-600" />
          <strong className="mt-4 block text-sm">No quizzes yet.</strong>
          <p className="mt-2 text-xs text-slate-500">Create your first quiz and challenge your friends.</p>
          <button type="button" onClick={() => onNavigate('unlock')} className="mt-5 text-xs font-bold text-cyan-300">Create a quiz</button>
        </div>
      </main>
    </>
  )
}

function DiscoverScreen({ onNavigate, packs }: { onNavigate: (screen: Screen) => void; packs: PackPreview[] }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const visiblePacks = packs.filter((pack) => {
    const matchesQuery = pack.title.toLowerCase().includes(query.trim().toLowerCase())
    const matchesFilter =
      filter === 'All' ||
      pack.category.toLowerCase() === filter.toLowerCase() ||
      (filter === 'Funny' && pack.category === 'funny')
    return matchesQuery && matchesFilter
  })
  return (
    <>
      <TopBar title="Discover" onNavigate={onNavigate} />
      <main className="page-shell">
        <h1 className="screen-title">Find your next <span className="text-cyan-300">obsession.</span></h1>
        <div className="relative mt-5"><Search className="absolute left-4 top-3.5 size-5 text-slate-500" /><input className="field mt-0 pl-12" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search question packs" /></div>
        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2">{['All', 'Friendship', 'Funny', 'Gaming', 'Music', 'Couples'].map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={cx('filter-chip', filter === item && 'filter-chip-active')}>{item}</button>)}</div>
        {packs[0] && <div className="mt-6 rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-transparent p-5">
          <div className="flex items-start justify-between"><div><Pill tone="violet">FEATURED PACK</Pill><h2 className="mt-4 text-xl font-black">{packs[0].title}</h2><p className="mt-2 max-w-[16rem] text-sm leading-5 text-slate-400">{packs[0].questionCount} curated questions · {packs[0].difficulty}</p></div><div className="grid size-14 place-items-center rounded-2xl bg-violet-400/15 text-violet-300"><Sparkles className="size-7" /></div></div>
          <button type="button" onClick={() => onNavigate('unlock')} className="mt-5 flex items-center gap-2 text-sm font-extrabold text-cyan-300">Use this pack <ArrowRight className="size-4" /></button>
        </div>}
        <div className="section-heading"><div><span>Curated for you</span><small>Based on selected interests</small></div><button type="button">See all</button></div>
        <div className="space-y-3">{visiblePacks.length ? visiblePacks.map(({ title, questionCount, difficulty, accent, premium, category }) => {
          const Icon = category === 'gaming' ? Gamepad2 : category === 'music' ? Music2 : category === 'nostalgia' ? Star : category === 'funny' ? Sparkles : Heart
          return <button type="button" onClick={() => onNavigate('unlock')} key={title} className="activity-card w-full text-left"><div className={cx('pack-icon', `pack-${accent ?? 'blue'}`)}><Icon className="size-5" /></div><div className="flex-1"><div className="flex items-center gap-2"><strong>{title}</strong>{premium && <Crown className="size-3.5 text-violet-300" />}</div><p>{questionCount} questions · {difficulty[0]?.toUpperCase() + difficulty.slice(1)}</p></div><ChevronRight className="size-5 text-slate-600" /></button>
        }) : <div className="surface-card text-center"><BookOpen className="mx-auto size-6 text-slate-600" /><strong className="mt-3 block text-sm">{packs.length ? 'No question packs match that search.' : 'Packs are being prepared'}</strong><p className="mt-1 text-xs text-slate-500">{packs.length ? 'Clear the search or choose another category.' : 'Try again after the next content publish.'}</p></div>}</div>
        <div className="section-heading"><div><span>Public quizzes</span></div></div>
        <div className="surface-card py-10 text-center">
          <Compass className="mx-auto size-6 text-slate-600" />
          <strong className="mt-4 block text-sm">No quizzes available yet.</strong>
          <p className="mt-2 text-xs text-slate-500">Check back soon.</p>
        </div>
      </main>
    </>
  )
}

function RewardedAdUnlockScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <>
      <TopBar title="Create quiz" onBack={() => onNavigate('home')} onNavigate={onNavigate} />
      <main className="page-shell">
        <Pill tone="muted">FREE QUIZ CREATION</Pill>
        <h1 className="screen-title mt-3">Unlock quiz creation</h1>
        <p className="screen-subtitle">Watch 3 rewarded ads to unlock 1 quiz creation.</p>
        <div className="mt-7 surface-card">
          <div className="flex items-center justify-between">
            <strong className="text-sm">Reward progress</strong>
            <span className="text-sm font-black text-cyan-300">0/3 completed</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-2 rounded-full bg-slate-800" />
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Progress only changes after the advertising provider verifies a completed reward.
          </p>
        </div>
        <div className="mt-5 info-card border-orange-400/15 bg-orange-400/[.04]">
          <CircleHelp className="size-5 text-orange-300" />
          <div>
            <strong>Rewarded ads are not configured</strong>
            <p>We couldn&apos;t load an ad. No reward or quiz entitlement was granted.</p>
          </div>
        </div>
        <button
          type="button"
          disabled
          className="mt-6 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 text-sm font-extrabold text-white opacity-40"
        >
          Watch an ad
        </button>
        <button type="button" onClick={() => onNavigate('plus')} className="text-button mt-3">
          View ad-free Plus plans
        </button>
        <p className="mt-5 text-center text-[11px] leading-5 text-slate-600">
          Google Mobile Ads requires a native Android SDK, ad unit configuration, and verified
          server-side reward callbacks. This web preview does not simulate them.
        </p>
      </main>
    </>
  )
}

function CreateScreen({ onNavigate, packs }: { onNavigate: (screen: Screen) => void; packs: PackPreview[] }) {
  const questions = (packs[0]?.questions ?? []).map((question) => ({
    text: question.text,
    options: (question.options ?? []).map((option) => option.label),
  }))
  const [stage, setStage] = useState(0)
  const [selectedType, setSelectedType] = useState(0)
  const [selectedTheme, setSelectedTheme] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const [title, setTitle] = useState('')
  const [answerKeys, setAnswerKeys] = useState<Record<number, number>>({})
  const [toast, setToast] = useState('')
  const stages = ['Type', 'Questions', 'Answers', 'Style', 'Preview']
  return (
    <>
      <TopBar title="Create quiz" onBack={stage ? () => setStage(stage - 1) : () => onNavigate('home')} onNavigate={onNavigate} />
      <main className="page-shell">
        <div className="flex gap-1.5">{stages.map((item, index) => <div key={item} className="flex-1"><div className={cx('h-1 rounded-full', index <= stage ? 'bg-gradient-to-r from-blue-600 to-cyan-300' : 'bg-slate-800')} /><span className={cx('mt-2 block text-center text-[9px] font-bold', index === stage ? 'text-cyan-300' : 'text-slate-600')}>{item}</span></div>)}</div>
        {stage === 0 && <section className="mt-7"><Pill>STEP 1 OF 5</Pill><h1 className="screen-title mt-3">What are we testing?</h1><p className="screen-subtitle">Pick a format. You can customize everything later.</p><div className="mt-6 space-y-3">{quizTypes.map(([name, desc, Icon], index) => <button type="button" key={name} onClick={() => setSelectedType(index)} className={cx('selection-card w-full text-left', selectedType === index && 'selection-card-active')}><div className="grid size-11 place-items-center rounded-xl bg-blue-500/10 text-cyan-300"><Icon className="size-5" /></div><div className="flex-1"><strong className="text-sm">{name}</strong><p className="mt-1 text-xs text-slate-500">{desc}</p></div>{selectedType === index && <Check className="size-5 text-cyan-300" />}</button>)}</div></section>}
        {stage === 1 && <section className="mt-7"><div className="flex items-end justify-between"><div><Pill>STEP 2 OF 5</Pill><h1 className="screen-title mt-3">Choose your questions.</h1></div><span className="text-xs font-bold text-cyan-300">{selected.length}/{questions.length}</span></div><p className="screen-subtitle">Choose from the real curated pack catalog.</p><div className="mt-6 space-y-3">{questions.length ? questions.map((question, index) => <button type="button" key={question.text} onClick={() => setSelected((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])} className={cx('selection-card w-full text-left', selected.includes(index) && 'selection-card-active')}><span className={cx('grid size-7 shrink-0 place-items-center rounded-lg border text-xs font-bold', selected.includes(index) ? 'border-cyan-300 bg-cyan-300 text-[#05070B]' : 'border-white/10 text-slate-500')}>{selected.includes(index) ? <Check className="size-4" /> : index + 1}</span><span className="text-sm font-semibold leading-5">{question.text}</span></button>) : <div className="surface-card text-center text-sm text-slate-500">No pack questions are available yet.</div>}</div><button type="button" disabled className="mt-3 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-dashed border-blue-400/25 text-sm font-bold text-cyan-300 opacity-40"><Plus className="size-4" /> Custom questions require sign-in</button></section>}
        {stage === 2 && <section className="mt-7"><Pill>STEP 3 OF 5</Pill><h1 className="screen-title mt-3">Lock in your answers.</h1><p className="screen-subtitle">Choose what you&apos;d actually pick. Friends will try to guess you.</p><div className="mt-6 space-y-4">{selected.map((questionIndex, shownIndex) => <div className="surface-card" key={questionIndex}><div className="flex gap-3"><span className="question-number">{shownIndex + 1}</span><strong className="text-sm leading-5">{questions[questionIndex].text}</strong></div><div className="mt-4 grid grid-cols-2 gap-2">{questions[questionIndex].options.map((option, optionIndex) => <button type="button" key={option} onClick={() => setAnswerKeys((current) => ({ ...current, [questionIndex]: optionIndex }))} className={cx('rounded-xl border px-3 py-2.5 text-left text-xs font-semibold', answerKeys[questionIndex] === optionIndex ? 'border-cyan-300/60 bg-cyan-300/10 text-cyan-200' : 'border-white/[.07] bg-white/[.02] text-slate-400')}>{answerKeys[questionIndex] === optionIndex && <Check className="mr-1 inline size-3" />}{option}</button>)}</div></div>)}</div><p className="mt-4 text-center text-xs text-slate-500">Answer keys are private and withheld before submission.</p></section>}
        {stage === 3 && <section className="mt-7"><Pill>STEP 4 OF 5</Pill><h1 className="screen-title mt-3">Make it unmistakably you.</h1><label className="field-label mt-7">Quiz title<input className="field" value={title} onChange={(event) => setTitle(event.target.value)} /></label><div className="field-label">Cover theme<div className="mt-3 grid grid-cols-3 gap-3">{['from-blue-600 to-cyan-400', 'from-violet-600 to-blue-500', 'from-emerald-500 to-cyan-500'].map((gradient, index) => <button type="button" onClick={() => setSelectedTheme(index)} key={gradient} className={cx('h-24 rounded-2xl border bg-gradient-to-br', gradient, index === selectedTheme ? 'border-white ring-2 ring-cyan-300/30' : 'border-transparent')} aria-label={`Theme ${index + 1}`} />)}</div></div><div className="mt-6 surface-card"><div className="setting-row"><div><strong>Guest participation</strong><p>No account required</p></div><span className="toggle toggle-on"><span /></span></div><div className="setting-row"><div><strong>Visibility</strong><p>Anyone with the link</p></div><span className="text-xs font-bold text-cyan-300">Unlisted</span></div><div className="setting-row"><div><strong>Share scores</strong><p>Off by default</p></div><span className="toggle"><span /></span></div></div></section>}
        {stage === 4 && <section className="mt-7"><Pill>FINAL CHECK</Pill><h1 className="screen-title mt-3">This is what friends see.</h1><div className="mt-7 overflow-hidden rounded-[1.75rem] border border-blue-400/20 bg-gradient-to-br from-blue-700/35 to-cyan-400/5"><div className="relative h-48 overflow-hidden p-5"><Image src="/frienddna-logo.png" alt="" width={210} height={210} className="absolute -bottom-14 -right-10 rounded-[2rem] opacity-60 mix-blend-screen" /><Pill>FRIENDDNA CHALLENGE</Pill><h2 className="relative mt-8 max-w-[70%] text-2xl font-black leading-7">{title || 'Your quiz title'}</h2></div><div className="bg-[#101827]/90 p-5"><div className="flex items-center gap-3"><Avatar small /><div><strong className="text-sm">Your challenge</strong><p className="text-xs text-slate-500">{selected.length} questions · About 2 min</p></div></div><div className="mt-4 flex gap-2"><Pill tone="muted"><Eye className="size-3" />Unlisted</Pill><Pill tone="muted"><UserRound className="size-3" />Guests on</Pill></div></div></div><div className="mt-5 info-card"><ShieldCheck className="size-5 text-cyan-300" /><div><strong>Answers stay hidden</strong><p>Friends only see the review after they submit.</p></div></div></section>}
        <div className="mt-8"><PrimaryButton onClick={() => stage < 4 ? setStage(stage + 1) : setToast('Publishing requires a signed-in account and a verified quiz-creation entitlement. No quiz was created.')} disabled={(stage === 1 && selected.length < 1) || (stage === 2 && selected.some((index) => answerKeys[index] === undefined)) || (stage === 3 && !title.trim())}>{stage === 4 ? 'Publish quiz' : 'Continue'}</PrimaryButton></div>
        {toast && <div className="mt-4 rounded-xl border border-orange-400/20 bg-orange-400/10 p-3 text-center text-xs leading-5 text-orange-200">{toast}</div>}
      </main>
    </>
  )
}

function PlayScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <main className="flex min-h-dvh flex-col px-5 pb-8 pt-5">
      <button type="button" onClick={() => onNavigate('discover')} className="icon-button">
        <ArrowLeft className="size-5" />
      </button>
      <div className="my-auto surface-card py-12 text-center">
        <BookOpen className="mx-auto size-7 text-slate-600" />
        <h1 className="mt-5 text-xl font-black">No quizzes available yet.</h1>
        <p className="mt-2 text-sm text-slate-500">Check back soon.</p>
      </div>
    </main>
  )
}

function ResultScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <main className="flex min-h-dvh flex-col px-5 pb-8 pt-5 text-center">
      <button type="button" onClick={() => onNavigate('home')} className="icon-button ml-auto">
        <X className="size-5" />
      </button>
      <div className="my-auto surface-card py-12">
        <BarChart3 className="mx-auto size-7 text-slate-600" />
        <h1 className="mt-5 text-xl font-black">No result available.</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Complete a real quiz and your verified result will appear here.
        </p>
      </div>
    </main>
  )
}

function FriendsScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <>
      <TopBar title="Friends" onNavigate={onNavigate} />
      <main className="page-shell">
        <div className="flex items-end justify-between">
          <div><h1 className="screen-title">Your people.</h1><p className="screen-subtitle">Challenge accepted?</p></div>
          <button type="button" disabled aria-label="Invite friends unavailable" className="icon-button cursor-not-allowed opacity-40"><UserPlus className="size-5" /></button>
        </div>
        <div className="surface-card mt-7 py-12 text-center">
          <Users className="mx-auto size-7 text-slate-600" />
          <strong className="mt-5 block text-sm">Your people aren&apos;t here yet.</strong>
          <p className="mt-2 text-xs text-slate-500">Invite friends to start playing.</p>
          <p className="mt-4 text-[11px] leading-5 text-slate-600">Invites become available after a real shareable quiz is published.</p>
        </div>
        <div className="section-heading"><div><span>Groups</span></div></div>
        <div className="surface-card py-10 text-center">
          <Users className="mx-auto size-6 text-slate-600" />
          <strong className="mt-4 block text-sm">No groups yet.</strong>
          <p className="mt-2 text-xs text-slate-500">Create a group and invite your friends.</p>
        </div>
      </main>
    </>
  )
}

function ProfileScreen({ onNavigate, onOpenPromotion }: { onNavigate: (screen: Screen) => void; onOpenPromotion: () => void }) {
  return (
    <>
      <TopBar onNavigate={onNavigate} />
      <main className="page-shell">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4"><Avatar initials="FD" /><div><h1 className="text-xl font-black">Your profile</h1><p className="text-sm text-slate-500">Sign in to add your details</p></div></div>
          <button type="button" onClick={() => onNavigate('settings')} className="icon-button"><Settings className="size-5" /></button>
        </div>
        <button type="button" onClick={() => { window.location.href = '/account' }} className="secondary-button mt-6">Sign in or create account</button>

        <div className="section-heading"><div><span>Plan</span></div><button type="button" onClick={() => onNavigate('plus')}>View pricing</button></div>
        <button type="button" onClick={() => onNavigate('plus')} className="surface-card flex w-full items-center gap-3 text-left">
          <div className="pack-icon pack-violet"><Crown className="size-5" /></div>
          <div className="flex-1"><strong className="text-sm">FriendDNA Free · $0</strong><p className="mt-1 text-xs text-slate-500">Compare Free and Plus</p></div>
          <ChevronRight className="size-5 text-slate-600" />
        </button>

        <div className="section-heading"><div><span>ChangeAIPay</span></div></div>
        <button type="button" onClick={onOpenPromotion} className="w-full overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-700/25 to-cyan-400/5 text-left">
          <div className="flex items-center gap-4 p-4">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#050b53]">
              <Image src="/changeaipay-logo.jpg" alt="ChangeAIPay" fill sizes="64px" className="object-contain" />
            </div>
            <div className="flex-1"><strong className="text-base">Keep your eyes out.</strong><p className="mt-1 text-xs leading-5 text-slate-400">Something big is coming. Discover a new way to move money with zero transaction fees for lifetime.</p></div>
            <ChevronRight className="size-5 text-cyan-300" />
          </div>
        </button>

        <div className="section-heading"><div><span>Quiz history</span></div></div>
        <div className="surface-card py-10 text-center"><BookOpen className="mx-auto size-6 text-slate-600" /><strong className="mt-4 block text-sm">Your quiz history will appear here.</strong></div>
        <div className="section-heading"><div><span>Achievements</span></div><button type="button" onClick={() => onNavigate('achievements')}>View</button></div>
        <div className="surface-card py-10 text-center"><Medal className="mx-auto size-6 text-slate-600" /><strong className="mt-4 block text-sm">No achievements yet.</strong><p className="mt-2 text-xs text-slate-500">Complete quizzes and challenges to start earning achievements.</p></div>
      </main>
    </>
  )
}

function SettingsScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [toggles, setToggles] = useState({ search: true, leaderboard: true, results: false, motion: false, quiz: true })
  const toggle = (key: keyof typeof toggles) => setToggles((current) => ({ ...current, [key]: !current[key] }))
  const groups = [
    ['Account', [['Edit profile', UserRound], ['Email & login', LockKeyhole], ['FriendDNA Plus', Crown]]],
    ['Privacy', [['Profile visibility', Eye], ['Blocked users', ShieldCheck], ['Data export', BookOpen]]],
    ['Support', [['Help center', CircleHelp], ['Community guidelines', ShieldCheck], ['Terms & privacy', BookOpen]]],
  ] as const
  return (
    <>
      <TopBar title="Settings" onBack={() => onNavigate('profile')} onNavigate={onNavigate} />
      <main className="page-shell">
        <Pill tone="muted">LOCAL PREFERENCES</Pill><h1 className="screen-title mt-3">Your app, your rules.</h1>
        <div className="mt-6 surface-card">
          {[['Search discoverability','Let people find your username','search'],['Leaderboard participation','Appear in friends rankings','leaderboard'],['Result sharing','Allow public score cards','results'],['Reduced motion','Limit celebrations and transitions','motion'],['Quiz notifications','In-app activity alerts','quiz']].map(([title, desc, key]) => <button type="button" onClick={() => toggle(key as keyof typeof toggles)} key={key} className="setting-row w-full text-left"><div><strong>{title}</strong><p>{desc}</p></div><span className={cx('toggle', toggles[key as keyof typeof toggles] && 'toggle-on')}><span /></span></button>)}
        </div>
        {groups.map(([group, rows]) => <section key={group}><div className="section-heading"><div><span>{group}</span></div></div><div className="surface-card p-0">{rows.map(([label, Icon]) => {
          const enabled = label === 'FriendDNA Plus' || label === 'Email & login'
          return <button type="button" key={label} disabled={!enabled} onClick={() => {
            if (label === 'FriendDNA Plus') onNavigate('plus')
            if (label === 'Email & login') window.location.href = '/account'
          }} className={cx('setting-row w-full', !enabled && 'cursor-not-allowed opacity-40')} title={enabled ? undefined : 'Available after sign-in and backend setup'}><div className="flex items-center gap-3"><Icon className="size-4 text-slate-500" /><strong>{label}</strong></div><ChevronRight className="size-4 text-slate-600" /></button>
        })}</div></section>)}
        <section>
          <div className="section-heading"><div><span>Legal</span></div></div>
          <div className="surface-card p-0">
            {[
              ['Privacy Policy', '/privacy'],
              ['Terms of Service', '/terms'],
              ['Copyright & DMCA', '/copyright'],
              ['Contact & legal requests', '/legal-request'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="setting-row w-full">
                <div className="flex items-center gap-3"><ShieldCheck className="size-4 text-slate-500" /><strong>{label}</strong></div>
                <ChevronRight className="size-4 text-slate-600" />
              </Link>
            ))}
          </div>
        </section>
        <div className="mt-7 info-card border-orange-400/15 bg-orange-400/[.04]"><ShieldCheck className="size-5 text-orange-300" /><div><strong>Administrator access</strong><p>Only the verified allowlisted account can access app administration. Setup is pending verification.</p></div></div>
        <p className="mt-8 text-center text-[11px] leading-5 text-slate-600">FriendDNA preview · Draft legal text requires professional review.<br />Figma workspace permissions are managed separately.</p>
      </main>
    </>
  )
}

function PlusScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const [message, setMessage] = useState('')
  const unavailable = () => setMessage('Purchases are not available yet. No charge or entitlement was created.')
  const restoreUnavailable = () => setMessage('Purchase restoration is unavailable until native store billing is configured.')
  const premiumProducts = [
    ['Bestie Question Pack', '$1.99'],
    ['Couples Question Pack', '$1.99'],
    ['Ultimate Question Bundle', '$4.99'],
    ['Premium Theme Bundle', '$2.99'],
  ]
  return (
    <main className="min-h-dvh px-5 pb-8">
      <div className="flex items-center justify-between py-5"><button type="button" onClick={() => onNavigate('profile')} className="icon-button"><X className="size-5" /></button><Brand compact /><span className="size-11" /></div>
      <div className="mt-6 text-center"><div className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_35px_rgba(167,139,250,.28)]"><Crown className="size-8" /></div><h1 className="mt-6 text-3xl font-black tracking-[-0.045em]">Make every quiz unforgettable.</h1><p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400">Clear pricing with no purchase simulation.</p></div>

      <div className="mt-7 grid gap-3">
        <div className="surface-card"><div className="flex items-start justify-between"><div><Pill tone="muted">FRIENDDNA FREE</Pill><div className="mt-3 text-3xl font-black">$0</div></div><Check className="size-6 text-emerald-300" /></div><div className="mt-5 space-y-3">{['Create quizzes with verified rewarded-ad unlocks','Participate in friends’ quizzes','Basic question packs','Basic results and scoring','Shareable quizzes','Basic profile and achievements','Limited customization'].map((item) => <div key={item} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-emerald-300" />{item}</div>)}</div></div>
        <div className="rounded-3xl border border-violet-400/25 bg-violet-400/[.06] p-5"><div className="flex items-start justify-between"><div><Pill tone="violet">FRIENDDNA PLUS</Pill><div className="mt-3"><div><span className="text-2xl font-black">$3.99</span><span className="text-sm text-slate-500">/month</span></div><div className="mt-1"><span className="text-2xl font-black">$29.99</span><span className="text-sm text-slate-500">/year</span></div></div></div><Crown className="size-8 text-violet-300" /></div><div className="mt-5 space-y-3">{['Premium themes','Expanded quiz history','Higher custom-question limits','Advanced personal statistics','Additional private groups','Additional customization','Ad-free experience'].map((item) => <div key={item} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-violet-300" />{item}</div>)}</div><div className="mt-5 rounded-2xl border border-white/10 bg-black/15 p-4 text-xs leading-5 text-slate-400"><strong className="text-slate-200">Recurring subscription terms</strong><p className="mt-2">Monthly or annual, depending on the plan selected at store checkout. Renews until cancelled. No free trial is offered. Cancel in Google Play or Apple App Store subscription settings before renewal. Access continues until the store-confirmed entitlement expiration.</p></div><button type="button" onClick={unavailable} className="mt-4 flex min-h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 text-sm font-extrabold text-white">Choose Plus — billing unavailable</button></div>
      </div>

      <div className="section-heading"><div><span>Premium content</span><small>One-time proposed prices</small></div></div>
      <div className="space-y-3">{premiumProducts.map(([name, price]) => <div key={name} className="activity-card"><div className="pack-icon pack-violet"><Sparkles className="size-5" /></div><div className="flex-1"><strong>{name}</strong><p>Purchase unavailable</p></div><button type="button" onClick={unavailable} className="rounded-xl border border-violet-400/20 px-3 py-2 text-xs font-extrabold text-violet-200">{price}</button></div>)}</div>
      <button type="button" onClick={restoreUnavailable} className="text-button mt-4">Restore purchases</button>
      {message && <div className="mt-4 rounded-xl border border-orange-400/20 bg-orange-400/10 p-3 text-center text-xs leading-5 text-orange-200">{message}</div>}
      <p className="mt-6 text-center text-[10px] leading-4 text-slate-600">Google Play Billing and StoreKit require native app distribution, store products, and server-verified receipts. Payment credentials are never collected here.</p>
    </main>
  )
}

function NotificationsScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <>
      <TopBar title="Notifications" onBack={() => onNavigate('home')} onNavigate={onNavigate} />
      <main className="page-shell">
        <h1 className="screen-title">What&apos;s happening.</h1>
        <div className="surface-card mt-7 py-12 text-center"><Bell className="mx-auto size-7 text-slate-600" /><strong className="mt-5 block text-sm">You&apos;re all caught up.</strong></div>
      </main>
    </>
  )
}

function AchievementsScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <>
      <TopBar title="Achievements" onBack={() => onNavigate('profile')} onNavigate={onNavigate} />
      <main className="page-shell">
        <div className="surface-card py-12 text-center"><Medal className="mx-auto size-7 text-slate-600" /><strong className="mt-5 block text-sm">No achievements yet.</strong><p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-500">Complete quizzes and challenges to start earning achievements.</p></div>
        <div className="section-heading"><div><span>Leaderboard</span></div></div>
        <div className="surface-card py-10 text-center"><Trophy className="mx-auto size-6 text-slate-600" /><strong className="mt-4 block text-sm">No rankings yet.</strong><p className="mt-2 text-xs text-slate-500">Play quizzes with friends to get started.</p></div>
      </main>
    </>
  )
}

export default function FriendDNAApp({ packs }: { packs: PackPreview[] }) {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [onboarded, setOnboarded] = useState(false)
  const [showChangeAIPay, setShowChangeAIPay] = useState(false)
  const [promotionEntry, setPromotionEntry] = useState<'profile' | 'result'>('profile')
  const [resultPromotionDismissed, setResultPromotionDismissed] = useState(false)
  useEffect(() => {
    const saved = window.localStorage.getItem('frienddna-onboarded') === 'true'
    setOnboarded(saved)
    if (saved) setScreen('home')
  }, [])
  const navigate = (target: Screen) => {
    const nextScreen = target === 'create' ? 'unlock' : target
    setScreen(nextScreen)
    if (target === 'result' && !resultPromotionDismissed) {
      setPromotionEntry('result')
      setShowChangeAIPay(true)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const openProfilePromotion = () => {
    setPromotionEntry('profile')
    setShowChangeAIPay(true)
  }
  const dismissPromotion = () => {
    setShowChangeAIPay(false)
    if (promotionEntry === 'result') setResultPromotionDismissed(true)
  }
  const content = useMemo(() => {
    switch (screen) {
      case 'welcome': return <Welcome onStart={() => navigate('onboarding')} onPreview={() => navigate('home')} />
      case 'onboarding': return <Onboarding onDone={() => { window.localStorage.setItem('frienddna-onboarded', 'true'); setOnboarded(true); navigate('create') }} />
      case 'home': return <HomeScreen onNavigate={navigate} />
      case 'discover': return <DiscoverScreen onNavigate={navigate} packs={packs} />
      case 'unlock': return <RewardedAdUnlockScreen onNavigate={navigate} />
      case 'create': return <CreateScreen onNavigate={navigate} packs={packs} />
      case 'play': return <PlayScreen onNavigate={navigate} />
      case 'result': return <ResultScreen onNavigate={navigate} />
      case 'friends': return <FriendsScreen onNavigate={navigate} />
      case 'profile': return <ProfileScreen onNavigate={navigate} onOpenPromotion={openProfilePromotion} />
      case 'settings': return <SettingsScreen onNavigate={navigate} />
      case 'plus': return <PlusScreen onNavigate={navigate} />
      case 'notifications': return <NotificationsScreen onNavigate={navigate} />
      case 'achievements': return <AchievementsScreen onNavigate={navigate} />
    }
  }, [screen, packs, resultPromotionDismissed])
  const navScreens: Screen[] = ['home', 'discover', 'create', 'friends', 'profile']
  return (
    <div className="mx-auto min-h-dvh max-w-md overflow-x-hidden border-x border-white/[.04] bg-[#05070B] text-[#F5F8FF] shadow-2xl">
      {content}
      {navScreens.includes(screen) && <BottomNav active={screen} onNavigate={navigate} />}
      {showChangeAIPay && <ChangeAIPayPromo onDismiss={dismissPromotion} />}
      {onboarded && screen === 'welcome' && <button type="button" onClick={() => navigate('home')} className="fixed bottom-4 right-4 rounded-xl bg-white/10 px-3 py-2 text-xs">Return home</button>}
    </div>
  )
}
