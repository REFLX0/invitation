'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// ── Animation variants ────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.5 } as const,
  }),
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const

// ── Reusable animated section wrapper ────────────────────────
export function Section({
  children,
  className = '',
  delay = 0,
  id,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  id?: string
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      custom={delay}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ── Ornamental dividers ──────────────────────────────────────
export function OrnamentalDivider({ variant = 'classic', className = '' }: { variant?: 'classic' | 'gold' | 'minimal' | 'ornate'; className?: string }) {
  if (variant === 'minimal') {
    return <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-current opacity-20" />
      <span className="text-[8px] opacity-40">&#9830;</span>
      <span className="h-px w-12 bg-current opacity-20" />
    </div>
  }

  if (variant === 'ornate') {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <svg viewBox="0 0 60 12" className="w-16 h-3 opacity-30" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M0 6 Q15 0 30 6 Q45 12 60 6" />
          <circle cx="30" cy="6" r="2" fill="currentColor" />
        </svg>
        <span className="text-xs opacity-40">&#10047;</span>
        <svg viewBox="0 0 60 12" className="w-16 h-3 opacity-30" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M0 6 Q15 12 30 6 Q45 0 60 6" />
          <circle cx="30" cy="6" r="2" fill="currentColor" />
        </svg>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className="h-px flex-1 max-w-[60px] bg-current opacity-15" />
      <svg viewBox="0 0 20 20" className={`w-4 h-4 ${variant === 'gold' ? 'text-[#C6A664]' : ''}`} fill="currentColor" opacity="0.35">
        <path d="M10 0L12.2 7.8L20 10L12.2 12.2L10 20L7.8 12.2L0 10L7.8 7.8Z" />
      </svg>
      <span className="h-px flex-1 max-w-[60px] bg-current opacity-15" />
    </div>
  )
}

// ── Countdown display ─────────────────────────────────────────
export function CountdownDisplay({
  days,
  hours,
  minutes,
  seconds,
  labelColor = 'text-muted-foreground',
  boxClass = '',
}: {
  days: number
  hours: number
  minutes: number
  seconds: number
  labelColor?: string
  boxClass?: string
}) {
  const units = [
    { value: days, label: 'Jours' },
    { value: hours, label: 'Heures' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Secondes' },
  ]

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {units.map((u, i) => (
        <div key={i} className={`flex flex-col items-center ${boxClass}`}>
          <span className="text-3xl sm:text-4xl font-light tabular-nums">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className={`text-[10px] uppercase tracking-widest mt-1 ${labelColor}`}>
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Schedule timeline ────────────────────────────────────────
export function ScheduleTimeline({
  items,
  accentColor = 'bg-[var(--daawa-burgundy)]',
  className = '',
}: {
  items: { label: string; time: string }[]
  accentColor?: string
  className?: string
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {items.filter((i) => i.label).map((item, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="flex flex-col items-center">
            <div className={`w-2.5 h-2.5 rounded-full ${accentColor} shrink-0 mt-1`} />
            {i < items.length - 1 && <div className="w-px h-8 bg-border mt-1" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── RSVP Section ──────────────────────────────────────────────
export function RsvpSection({
  guests,
  submitted,
  submitting,
  message,
  canSubmit,
  mealChoices,
  onAddGuest,
  onRemoveGuest,
  onUpdateGuest,
  onSubmit,
}: {
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
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-medium">Merci pour votre reponse !</p>
        <p className="text-sm text-muted-foreground mt-1">Nous avons bien recu votre RSVP.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {guests.map((guest, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border/50 p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">
              Invite {i + 1}
            </span>
            {guests.length > 1 && (
              <button
                onClick={() => onRemoveGuest(i)}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Supprimer
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Nom complet"
            value={guest.name}
            onChange={(e) => onUpdateGuest(i, 'name', e.target.value)}
            className="w-full rounded-md border border-border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-[var(--daawa-burgundy)]/30"
          />
          <div className="flex gap-2">
            <button
              onClick={() => onUpdateGuest(i, 'attending', true)}
              className={`flex-1 rounded-md border px-3 py-2 text-sm transition-colors ${
                guest.attending === true
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-border hover:border-green-300'
              }`}
            >
              Oui, j'y serai
            </button>
            <button
              onClick={() => onUpdateGuest(i, 'attending', false)}
              className={`flex-1 rounded-md border px-3 py-2 text-sm transition-colors ${
                guest.attending === false
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-border hover:border-red-300'
              }`}
            >
              Non, desole(e)
            </button>
          </div>
          {guest.attending === true && mealChoices.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Choix du repas</p>
              <div className="flex flex-wrap gap-2">
                {mealChoices.map((meal) => (
                  <button
                    key={meal}
                    onClick={() => onUpdateGuest(i, 'meal', meal)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      guest.meal === meal
                        ? 'border-[var(--daawa-burgundy)] bg-[var(--daawa-burgundy)]/5 text-[var(--daawa-burgundy)]'
                        : 'border-border hover:border-foreground/20'
                    }`}
                  >
                    {meal}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ))}
      <button
        onClick={onAddGuest}
        className="w-full rounded-md border border-dashed border-border/60 py-2 text-xs text-muted-foreground hover:border-foreground/30 transition-colors"
      >
        + Ajouter un invite
      </button>
      {message && <p className="text-xs text-destructive text-center">{message}</p>}
      <button
        onClick={onSubmit}
        disabled={!canSubmit || submitting}
        className="w-full rounded-md bg-[var(--daawa-burgundy)] text-white py-2.5 text-sm font-medium hover:bg-[var(--daawa-burgundy)]/90 disabled:opacity-50 transition-colors"
      >
        {submitting ? 'Envoi en cours...' : 'Envoyer ma reponse'}
      </button>
    </div>
  )
}

// ── Dress code swatches ───────────────────────────────────────
export function DressCodeSwatches({
  text,
  swatches,
  paletteName,
  className = '',
}: {
  text: string
  swatches: string[]
  paletteName: string
  className?: string
}) {
  return (
    <div className={`text-center space-y-3 ${className}`}>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Code vestimentaire</p>
      {text && <p className="text-sm italic">{text}</p>}
      {swatches.filter(Boolean).length > 0 && (
        <div className="flex items-center justify-center gap-2">
          {swatches.filter(Boolean).map((color, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}
      {paletteName && (
        <p className="text-xs text-muted-foreground">Palette : {paletteName}</p>
      )}
    </div>
  )
}

// ── Monogram display ──────────────────────────────────────────
export function MonogramDisplay({
  initials,
  style = 'classic-circle',
  color = '#C6A664',
  className = '',
}: {
  initials: string
  style?: string
  color?: string
  className?: string
}) {
  const cleanInitials = initials.slice(0, 2).toUpperCase()

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 120" className="w-20 h-20 sm:w-28 sm:h-28">
        {style === 'classic-circle' && (
          <>
            <circle cx="60" cy="60" r="55" fill="none" stroke={color} strokeWidth="1" />
            <circle cx="60" cy="60" r="48" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
            {/* Ornamental corners */}
            <path d="M30 60 Q60 30 90 60 Q60 90 30 60Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
          </>
        )}
        {style === 'art-deco-diamond' && (
          <>
            <path d="M60 8 L112 60 L60 112 L8 60 Z" fill="none" stroke={color} strokeWidth="1" />
            <path d="M60 20 L100 60 L60 100 L20 60 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
            <line x1="60" y1="20" x2="60" y2="100" stroke={color} strokeWidth="0.3" opacity="0.3" />
            <line x1="20" y1="60" x2="100" y2="60" stroke={color} strokeWidth="0.3" opacity="0.3" />
          </>
        )}
        {style === 'arabesque-square' && (
          <>
            <rect x="10" y="10" width="100" height="100" rx="4" fill="none" stroke={color} strokeWidth="1" />
            <rect x="18" y="18" width="84" height="84" rx="2" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
            {/* Simple arabesque corners */}
            <path d="M18 30 Q30 18 42 18" fill="none" stroke={color} strokeWidth="0.6" opacity="0.4" />
            <path d="M78 18 Q90 18 102 30" fill="none" stroke={color} strokeWidth="0.6" opacity="0.4" transform="scale(1,1)" />
            <path d="M18 90 Q30 102 42 102" fill="none" stroke={color} strokeWidth="0.6" opacity="0.4" />
            <path d="M78 102 Q90 102 102 90" fill="none" stroke={color} strokeWidth="0.6" opacity="0.4" />
          </>
        )}
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize="28"
          fontWeight="300"
          letterSpacing="4"
          fontFamily="serif"
        >
          {cleanInitials}
        </text>
      </svg>
    </div>
  )
}

// ── Photo section (Luxe hero/couple/venue/gallery) ──────────
export function PhotoSection({
  imageUrl,
  fallbackGradient = 'from-[var(--daawa-burgundy)]/10 to-[var(--daawa-cream)]/20',
  className = '',
  aspectClass = 'aspect-[16/9]',
}: {
  imageUrl: string
  fallbackGradient?: string
  className?: string
  aspectClass?: string
}) {
  const [error, setError] = useState(false)

  if (!imageUrl || error) {
    return (
      <div
        className={`${aspectClass} rounded-xl bg-gradient-to-br ${fallbackGradient} flex items-center justify-center ${className}`}
      >
        <svg className="w-8 h-8 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <div className={`${aspectClass} rounded-xl overflow-hidden ${className}`}>
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  )
}
