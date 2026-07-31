'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }) }
export const fadeIn = { hidden: { opacity: 0 }, visible: (i: number = 0) => ({ opacity: 1, transition: { delay: i * 0.08, duration: 0.5 } as const }) }

export function Section({ children, className = '', delay = 0, id, style }: { children: React.ReactNode; className?: string; delay?: number; id?: string; style?: React.CSSProperties }) {
  return (
    <motion.section id={id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} custom={delay} className={className} style={style}>
      {children}
    </motion.section>
  )
}

export function OrnamentalDivider({ variant = 'classic', className = '', style }: { variant?: 'classic' | 'gold' | 'minimal' | 'ornate'; className?: string; style?: React.CSSProperties }) {
  if (variant === 'minimal') {
    return <div className={"flex items-center justify-center gap-3 ".concat(className)} style={style}><span className="h-px w-12 bg-current opacity-20" /><span className="text-[8px] opacity-40">&#9830;</span><span className="h-px w-12 bg-current opacity-20" /></div>
  }
  return <div className={"flex items-center justify-center gap-3 ".concat(className)} style={style}><span className="h-px w-16 bg-current opacity-20" /><span className="text-[10px] opacity-40">&#10045;</span><span className="h-px w-16 bg-current opacity-20" /></div>
}

export function CountdownDisplay({ days, hours, minutes, seconds }: { days: number; hours: number; minutes: number; seconds: number }) {
  const items = [
    { value: days, label: 'Jours' },
    { value: hours, label: 'Heures' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Secondes' },
  ]
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-3xl sm:text-4xl font-light tabular-nums" style={{ fontFamily: 'var(--tpl-heading-font)' }}>{String(item.value).padStart(2, '0')}</div>
          <div className="text-[10px] uppercase tracking-wider mt-1 opacity-50">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export function ScheduleTimeline({ items }: { items: { label: string; time: string }[] }) {
  if (items.length === 0) return null
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="text-sm font-medium opacity-80 w-20 text-right shrink-0">{item.time}</div>
          <div className="flex flex-col items-center">
            <div className="size-2 rounded-full bg-current opacity-40" />
            {i < items.length - 1 && <div className="w-px h-8 bg-current opacity-15" />}
          </div>
          <div className="text-sm opacity-70">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

export function RsvpSection({ guests, submitted, submitting, message, canSubmit, mealChoices, onAddGuest, onRemoveGuest, onUpdateGuest, onSubmit }: {
  guests: { name: string; attending: boolean | null; meal: string; plusOne: string }[]
  submitted: boolean
  submitting: boolean
  message: string
  canSubmit: boolean
  mealChoices: string[]
  onAddGuest: () => void
  onRemoveGuest: (i: number) => void
  onUpdateGuest: (i: number, field: string, value: string | boolean | null) => void
  onSubmit: () => void
}) {
  if (submitted) {
    return (
      <div className="text-center space-y-3 py-6">
        <div className="text-4xl">&#10003;</div>
        <p className="text-sm font-medium">Merci pour votre reponse !</p>
      </div>
    )
  }
  return (
    <div className="space-y-4">
      {guests.map((guest, i) => (
        <div key={i} className="space-y-3 p-4 rounded-lg border border-current/10">
          <div className="flex items-center gap-2">
            <input value={guest.name} onChange={(e) => onUpdateGuest(i, 'name', e.target.value)} placeholder="Nom complet" className="flex-1 rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-current/20" />
            {guests.length > 1 && <button onClick={() => onRemoveGuest(i)} className="text-xs opacity-40 hover:opacity-70">Supprimer</button>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => onUpdateGuest(i, 'attending', true)} className={"flex-1 rounded-md border px-3 py-2 text-sm transition-colors ".concat(guest.attending === true ? 'bg-current text-white border-current' : 'hover:border-current/30')}>Oui, je viens</button>
            <button onClick={() => onUpdateGuest(i, 'attending', false)} className={"flex-1 rounded-md border px-3 py-2 text-sm transition-colors ".concat(guest.attending === false ? 'bg-current text-white border-current' : 'hover:border-current/30')}>Non, desole</button>
          </div>
          {mealChoices.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {mealChoices.map((meal) => (
                <button key={meal} onClick={() => onUpdateGuest(i, 'meal', meal)} className={"rounded-full border px-3 py-1 text-xs transition-colors ".concat(guest.meal === meal ? 'bg-current text-white border-current' : 'hover:border-current/30')}>{meal}</button>
              ))}
            </div>
          )}
        </div>
      ))}
      {guests.length < 10 && <button onClick={onAddGuest} className="text-xs opacity-50 hover:opacity-80 transition-opacity">+ Ajouter un invite</button>}
      {message && <p className="text-xs text-red-500">{message}</p>}
      <button onClick={onSubmit} disabled={!canSubmit || submitting} className={"w-full rounded-md py-2.5 text-sm font-medium text-white transition-colors ".concat(canSubmit && !submitting ? 'bg-current hover:opacity-90' : 'opacity-40 cursor-not-allowed')}>
        {submitting ? 'Envoi en cours...' : 'Confirmer'}
      </button>
    </div>
  )
}
