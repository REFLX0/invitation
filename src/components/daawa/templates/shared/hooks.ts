'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// ── Countdown hook ──────────────────────────────────────────────
interface CountdownResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

export function useCountdown(targetDate: string): CountdownResult {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const target = new Date(targetDate).getTime()
  const diff = Math.max(0, target - now)
  const isPast = target - now < 0

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isPast,
  }
}

// ── RSVP Form hook ────────────────────────────────────────────
interface RsvpGuest {
  name: string
  attending: boolean | null
  meal: string
  plusOne: string
}

export function useRsvpForm(maxGuests: number, mealChoices: string[], eventId?: string) {
  const [guests, setGuests] = useState<RsvpGuest[]>([
    { name: '', attending: null, meal: mealChoices[0] || '', plusOne: '' },
  ])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const addGuest = useCallback(() => {
    if (guests.length < maxGuests) {
      setGuests((prev) => [
        ...prev,
        { name: '', attending: null, meal: mealChoices[0] || '', plusOne: '' },
      ])
    }
  }, [guests.length, maxGuests, mealChoices])

  const removeGuest = useCallback((index: number) => {
    setGuests((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const updateGuest = useCallback(
    (index: number, field: string, value: string | boolean | null) => {
      setGuests((prev) =>
        prev.map((g, i) => (i === index ? { ...g, [field]: value } : g)),
      )
    },
    [],
  )

  const canSubmit = guests.every((g) => g.name.trim() !== '' && g.attending !== null)

  const submit = useCallback(async () => {
    if (!canSubmit) return
    setSubmitting(true)
    try {
      if (eventId) {
        const res = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventId,
            guests: guests.map((g) => ({
              name: g.name,
              attending: g.attending === true,
              meal: g.meal,
              plusOne: g.plusOne,
            })),
          }),
        })
        if (!res.ok) throw new Error('Server error')
      } else {
        // Fallback for when eventId is not available
        await new Promise((r) => setTimeout(r, 1200))
      }
      setSubmitted(true)
    } catch {
      setMessage("Erreur lors de l'envoi. Veuillez reessayer.")
    } finally {
      setSubmitting(false)
    }
  }, [canSubmit, eventId, guests])

  const reset = useCallback(() => {
    setGuests([{ name: '', attending: null, meal: mealChoices[0] || '', plusOne: '' }])
    setSubmitted(false)
    setMessage('')
  }, [mealChoices])

  return {
    guests,
    submitted,
    submitting,
    message,
    canSubmit,
    addGuest,
    removeGuest,
    updateGuest,
    submit,
    reset,
  }
}

// ── Scroll reveal hook ───────────────────────────────────────
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
