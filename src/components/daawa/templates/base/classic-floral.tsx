'use client'

import { motion } from 'framer-motion'
import type { InvitationTemplateProps } from '../invitation-template'
import type { ClassicTierConfig } from '../../wizard/tier-config-types'
import { useCountdown, useRsvpForm } from '../shared/hooks'
import { Section, OrnamentalDivider, CountdownDisplay, ScheduleTimeline, RsvpSection } from '../shared/atoms'

/* ── Floral variant: left-aligned, card-based sections ── */
export function ClassicFloral({ event }: InvitationTemplateProps) {
  const config: ClassicTierConfig = event.tierConfig ? JSON.parse(event.tierConfig) : { ceremonyTime: '', receptionTime: '', scheduleItems: [], venueGps: '', directionsNote: '', rsvpDeadline: '', maxGuests: '5', mealChoices: [], customMessage: '' }
  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(parseInt(config.maxGuests || '5'), config.mealChoices || [], event.id)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tpl-bg)' }}>
      {/* Hero: Left-aligned with decorative circle */}
      <Section className="min-h-[85vh] flex items-center px-8 sm:px-16">
        <div className="max-w-xl space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'var(--tpl-accent)' }}>
              <span className="text-lg" style={{ color: 'var(--tpl-accent)' }}>&#9825;</span>
            </div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.5 }}>Vous sont cordialement invites</p>
          </div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-5xl sm:text-7xl font-light leading-tight" style={{ fontFamily: 'var(--tpl-heading-font)', color: 'var(--tpl-text)' }}>
            {event.partner1Name}
            <span className="block text-2xl my-2" style={{ color: 'var(--tpl-accent)' }}>&amp;</span>
            {event.partner2Name}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="flex items-center gap-4">
            <div className="w-16 h-px" style={{ backgroundColor: 'var(--tpl-accent)', opacity: 0.3 }} />
            <p className="text-sm" style={{ color: 'var(--tpl-text)', opacity: 0.5 }}>
              {new Date(event.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Countdown: Full-width card */}
      <Section className="py-16 px-8" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
        <div className="max-w-md mx-auto text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-accent)', opacity: 0.6 }}>Compte a rebours</p>
          <CountdownDisplay days={countdown.days} hours={countdown.hours} minutes={countdown.minutes} seconds={countdown.seconds} />
        </div>
      </Section>

      {/* Venue + Schedule combined */}
      <Section className="py-16 px-8" delay={0.1}>
        <div className="max-w-lg mx-auto space-y-10">
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--tpl-accent)', opacity: 0.5 }}>Lieu</p>
            <h2 className="text-2xl font-light mb-1" style={{ fontFamily: 'var(--tpl-heading-font)', color: 'var(--tpl-text)' }}>{event.venueName}</h2>
            <p className="text-sm" style={{ color: 'var(--tpl-text)', opacity: 0.5 }}>{event.venueAddress}</p>
            {config.venueGps && (
              <a href={config.venueGps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs mt-2 hover:underline" style={{ color: 'var(--tpl-accent)' }}>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Voir sur la carte
              </a>
            )}
          </div>
          {(config.scheduleItems?.filter((s) => s.label).length > 0 || config.ceremonyTime || config.receptionTime) && (
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--tpl-accent)', opacity: 0.5 }}>Programme</p>
              <ScheduleTimeline items={[
                ...(config.ceremonyTime ? [{ label: 'Ceremonie', time: config.ceremonyTime }] : []),
                ...(config.receptionTime ? [{ label: 'Reception', time: config.receptionTime }] : []),
                ...(config.scheduleItems?.filter((s) => s.label) || []),
              ]} />
            </div>
          )}
        </div>
      </Section>

      {config.customMessage && (
        <Section className="py-10 px-8" delay={0.2} style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
          <p className="text-sm italic text-center max-w-md mx-auto leading-relaxed" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>&ldquo;{config.customMessage}&rdquo;</p>
        </Section>
      )}

      {/* RSVP */}
      <Section className="py-16 px-8" delay={0.3}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.5 }}>Repondez s&apos;il vous plait</p>
          <RsvpSection guests={rsvp.guests} submitted={rsvp.submitted} submitting={rsvp.submitting} message={rsvp.message} canSubmit={rsvp.canSubmit} mealChoices={config.mealChoices || []} onAddGuest={rsvp.addGuest} onRemoveGuest={rsvp.removeGuest} onUpdateGuest={rsvp.updateGuest} onSubmit={rsvp.submit} />
        </div>
      </Section>

      <footer className="py-6 px-8 text-center">
        <p className="text-[10px]" style={{ color: 'var(--tpl-text)', opacity: 0.25 }}>Daawa — Invitations de mariage</p>
      </footer>
    </div>
  )
}
