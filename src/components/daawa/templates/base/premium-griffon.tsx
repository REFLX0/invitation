'use client'

import { motion } from 'framer-motion'
import type { InvitationTemplateProps } from '../invitation-template'
import type { PremiumTierConfig } from '../../wizard/tier-config-types'
import { useCountdown, useRsvpForm } from '../shared/hooks'
import {
  Section,
  OrnamentalDivider,
  CountdownDisplay,
  ScheduleTimeline,
  RsvpSection,
} from '../shared/atoms'

export function PremiumGriffon({ event }: InvitationTemplateProps) {
  const config: PremiumTierConfig = event.tierConfig
    ? JSON.parse(event.tierConfig)
    : { ceremonyTime: '', receptionTime: '', scheduleItems: [], venueGps: '', directionsNote: '', rsvpDeadline: '', maxGuests: '5', mealChoices: [], customMessage: '', scratchRevealMessage: '', waxSealColor: 'red', envelopeLinerPattern: 'plain', backgroundMusicEnabled: false, musicStyle: 'none', guestPersonalMessage: '', customColorAccent: '', preferredLanguage: 'FR' }

  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(
    parseInt(config.maxGuests || '5'),
    config.mealChoices || [],
  )

  const accentColor = config.customColorAccent || 'var(--daawa-burgundy)'

  return (
    <div className="min-h-screen bg-[var(--daawa-cream)]/30">
      {/* Hero — Premium has richer background + personal message */}
      <Section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${accentColor} 0%, transparent 70%)`,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative space-y-6 max-w-lg z-10"
        >
          <OrnamentalDivider variant="ornate" className="text-[var(--daawa-gold)]" />
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {config.preferredLanguage === 'AR' ? 'بمناسبة زفافهما' : 'Vous sont cordialement invites'}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-light leading-tight"
            style={{ fontFamily: 'serif' }}
          >
            {event.partner1Name}
            <span className="block text-2xl my-2" style={{ color: accentColor }}>&</span>
            {event.partner2Name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date(event.eventDate).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {config.guestPersonalMessage && (
            <p className="text-sm italic leading-relaxed mt-4" style={{ color: accentColor }}>
              "{config.guestPersonalMessage}"
            </p>
          )}
          <OrnamentalDivider variant="ornate" className="text-[var(--daawa-gold)]" />
        </motion.div>
      </Section>

      {/* Scratch Reveal Message */}
      {config.scratchRevealMessage && (
        <Section className="py-12 px-6 bg-background/50">
          <div className="max-w-md mx-auto text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Message secret</p>
            <div
              className="rounded-xl border p-6"
              style={{
                borderColor: `${accentColor}30`,
                background: `linear-gradient(135deg, ${accentColor}08, ${accentColor}15)`,
              }}
            >
              <p className="text-sm italic">{config.scratchRevealMessage}</p>
            </div>
          </div>
        </Section>
      )}

      {/* Countdown */}
      <Section className="py-16 px-6">
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Compte a rebours
          </p>
          <CountdownDisplay
            days={countdown.days}
            hours={countdown.hours}
            minutes={countdown.minutes}
            seconds={countdown.seconds}
            labelColor=""
            boxClass="bg-background/60 rounded-lg px-4 py-3 shadow-sm"
          />
        </div>
      </Section>

      {/* Venue */}
      <Section className="py-16 px-6 bg-background/50" delay={0.1}>
        <div className="max-w-md mx-auto text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Lieu de la celebration
          </p>
          <h2 className="text-2xl font-light" style={{ fontFamily: 'serif' }}>
            {event.venueName}
          </h2>
          <p className="text-sm text-muted-foreground">{event.venueAddress}</p>
          {config.venueGps && (
            <a
              href={config.venueGps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs hover:underline"
              style={{ color: accentColor }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Voir sur la carte
            </a>
          )}
          {config.directionsNote && (
            <p className="text-xs text-muted-foreground italic mt-2">{config.directionsNote}</p>
          )}
        </div>
      </Section>

      {/* Schedule */}
      {(config.scheduleItems?.filter((s) => s.label).length > 0 || config.ceremonyTime || config.receptionTime) && (
        <Section className="py-16 px-6" delay={0.2}>
          <div className="max-w-md mx-auto text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Programme
            </p>
            <ScheduleTimeline
              items={[
                ...(config.ceremonyTime ? [{ label: 'Ceremonie', time: config.ceremonyTime }] : []),
                ...(config.receptionTime ? [{ label: 'Reception', time: config.receptionTime }] : []),
                ...(config.scheduleItems?.filter((s) => s.label) || []),
              ]}
              accentColor={`bg-[${accentColor}]`}
            />
          </div>
        </Section>
      )}

      {/* Custom message */}
      {config.customMessage && (
        <Section className="py-12 px-6 bg-background/50" delay={0.3}>
          <div className="max-w-md mx-auto text-center">
            <OrnamentalDivider variant="ornate" className="mb-4" />
            <p className="text-sm italic leading-relaxed">{config.customMessage}</p>
            <OrnamentalDivider variant="ornate" className="mt-4" />
          </div>
        </Section>
      )}

      {/* RSVP */}
      <Section className="py-16 px-6" delay={0.4}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Repondez s'il vous plait
          </p>
          {config.rsvpDeadline && (
            <p className="text-xs text-muted-foreground">
              Avant le {new Date(config.rsvpDeadline).toLocaleDateString('fr-FR')}
            </p>
          )}
          <RsvpSection
            guests={rsvp.guests}
            submitted={rsvp.submitted}
            submitting={rsvp.submitting}
            message={rsvp.message}
            canSubmit={rsvp.canSubmit}
            mealChoices={config.mealChoices || []}
            onAddGuest={rsvp.addGuest}
            onRemoveGuest={rsvp.removeGuest}
            onUpdateGuest={rsvp.updateGuest}
            onSubmit={rsvp.submit}
          />
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <OrnamentalDivider variant="ornate" className="text-muted-foreground/30 mb-4" />
        <p className="text-[10px] text-muted-foreground/50">Daawa — Invitations de mariage</p>
      </footer>
    </div>
  )
}
