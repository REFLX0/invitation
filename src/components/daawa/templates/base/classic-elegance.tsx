'use client'

import { motion } from 'framer-motion'
import type { InvitationTemplateProps } from '../invitation-template'
import type { ClassicTierConfig } from '../../wizard/tier-config-types'
import { useCountdown, useRsvpForm } from '../shared/hooks'
import { Section, OrnamentalDivider, CountdownDisplay, ScheduleTimeline, RsvpSection } from '../shared/atoms'

export function ClassicElegance({ event }: InvitationTemplateProps) {
  const config: ClassicTierConfig = event.tierConfig ? JSON.parse(event.tierConfig) : { ceremonyTime: '', receptionTime: '', scheduleItems: [], venueGps: '', directionsNote: '', rsvpDeadline: '', maxGuests: '5', mealChoices: [], customMessage: '' }
  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(parseInt(config.maxGuests || '5'), config.mealChoices || [], event.id)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tpl-bg)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full anim-petal"
            style={{
              width: 8 + i * 2,
              height: 14 + i * 2,
              backgroundColor: 'var(--tpl-accent)',
              opacity: 0.15,
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>
      <Section className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6 max-w-lg">
          <OrnamentalDivider variant="classic" className="text-[var(--tpl-accent)]" />
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>Vous sont cordialement invites</p>
          <h1 className="text-4xl sm:text-5xl font-light leading-tight" style={{ fontFamily: 'var(--tpl-heading-font)', color: 'var(--tpl-text)' }}>
            {event.partner1Name}<span className="block text-2xl my-2" style={{ color: 'var(--tpl-accent)' }}>&</span>{event.partner2Name}
          </h1>
          <p className="text-sm" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>
            {new Date(event.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <OrnamentalDivider variant="classic" className="text-[var(--tpl-accent)]" />
        </motion.div>
      </Section>

      <Section className="py-16 px-6" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>Compte a rebours</p>
          <CountdownDisplay days={countdown.days} hours={countdown.hours} minutes={countdown.minutes} seconds={countdown.seconds} />
        </div>
      </Section>

      <Section className="py-16 px-6" delay={0.1}>
        <div className="max-w-md mx-auto text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>Lieu de la celebration</p>
          <h2 className="text-2xl font-light" style={{ fontFamily: 'var(--tpl-heading-font)', color: 'var(--tpl-text)' }}>{event.venueName}</h2>
          <p className="text-sm" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>{event.venueAddress}</p>
          {config.venueGps && (
            <a href={config.venueGps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs hover:underline" style={{ color: 'var(--tpl-accent)' }}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Voir sur la carte
            </a>
          )}
        </div>
      </Section>

      {(config.scheduleItems?.filter((s) => s.label).length > 0 || config.ceremonyTime || config.receptionTime) && (
        <Section className="py-16 px-6" delay={0.2} style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
          <div className="max-w-md mx-auto text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>Programme</p>
            <ScheduleTimeline items={[
              ...(config.ceremonyTime ? [{ label: 'Ceremonie', time: config.ceremonyTime }] : []),
              ...(config.receptionTime ? [{ label: 'Reception', time: config.receptionTime }] : []),
              ...(config.scheduleItems?.filter((s) => s.label) || []),
            ]} />
          </div>
        </Section>
      )}

      {config.customMessage && (
        <Section className="py-12 px-6" delay={0.3}>
          <div className="max-w-md mx-auto text-center">
            <OrnamentalDivider variant="minimal" className="text-[var(--tpl-accent)] mb-4" />
            <p className="text-sm italic leading-relaxed" style={{ color: 'var(--tpl-text)', opacity: 0.7 }}>{config.customMessage}</p>
            <OrnamentalDivider variant="minimal" className="text-[var(--tpl-accent)] mt-4" />
          </div>
        </Section>
      )}

      <Section className="py-16 px-6" delay={0.4}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>Repondez s&apos;il vous plait</p>
          <RsvpSection guests={rsvp.guests} submitted={rsvp.submitted} submitting={rsvp.submitting} message={rsvp.message} canSubmit={rsvp.canSubmit} mealChoices={config.mealChoices || []} onAddGuest={rsvp.addGuest} onRemoveGuest={rsvp.removeGuest} onUpdateGuest={rsvp.updateGuest} onSubmit={rsvp.submit} />
        </div>
      </Section>

      <footer className="py-8 px-6 text-center">
        <OrnamentalDivider variant="minimal" className="mb-4" style={{ color: 'var(--tpl-text)', opacity: 0.2 }} />
        <p className="text-[10px]" style={{ color: 'var(--tpl-text)', opacity: 0.3 }}>Daawa — Invitations de mariage</p>
      </footer>
    </div>
  )
}
