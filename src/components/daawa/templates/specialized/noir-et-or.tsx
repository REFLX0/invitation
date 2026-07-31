'use client'
import { motion } from 'framer-motion'
import type { InvitationTemplateProps } from '../invitation-template'
import type { LuxeTierConfig } from '../../wizard/tier-config-types'
import { useCountdown, useRsvpForm } from '../shared/hooks'
import { Section, OrnamentalDivider, CountdownDisplay, ScheduleTimeline, RsvpSection } from '../shared/atoms'
import { MusicPlayer } from '../shared/interactive'

export function SpecializedNoirEtOr({ event }: InvitationTemplateProps) {
  const config: LuxeTierConfig = event.tierConfig ? JSON.parse(event.tierConfig) : {}
  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(parseInt(config.maxGuests || '5'), config.mealChoices || [], event.id)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tpl-bg)', color: 'var(--tpl-text)' }}>
      <div className="fixed top-4 right-4 z-50"><MusicPlayer enabled={config.backgroundMusicEnabled || false} style={config.musicStyle || 'none'} /></div>
      <Section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center relative">
        <div className="absolute top-8 left-8 w-16 h-16 border border-current/10 rotate-45" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border border-current/10 rotate-45" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative space-y-8 max-w-lg">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: 'var(--tpl-accent)', opacity: 0.7 }}>Vous sont cordialement invites</p>
          <h1 className="text-4xl sm:text-6xl font-light leading-tight" style={{ fontFamily: 'var(--tpl-heading-font)', color: 'var(--tpl-accent)' }}>
            {event.partner1Name}<span className="block text-2xl my-3 opacity-60">&</span>{event.partner2Name}
          </h1>
          <OrnamentalDivider variant="ornate" className="text-[var(--tpl-accent)]" />
          <p className="text-sm opacity-50">{new Date(event.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          {config.monogramInitials && <div className="text-5xl font-light tracking-[0.3em]" style={{ fontFamily: 'var(--tpl-heading-font)', color: 'var(--tpl-accent)', opacity: 0.6 }}>{config.monogramInitials}</div>}
        </motion.div>
      </Section>
      <Section className="py-16 px-6" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] opacity-50">Compte a rebours</p>
          <CountdownDisplay days={countdown.days} hours={countdown.hours} minutes={countdown.minutes} seconds={countdown.seconds} />
        </div>
      </Section>
      <Section className="py-16 px-6">
        <div className="max-w-md mx-auto text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] opacity-50">Lieu</p>
          <h2 className="text-2xl font-light" style={{ fontFamily: 'var(--tpl-heading-font)', color: 'var(--tpl-accent)' }}>{event.venueName}</h2>
          <p className="text-sm opacity-50">{event.venueAddress}</p>
        </div>
      </Section>
      <Section className="py-16 px-6" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] opacity-50">RSVP</p>
          <RsvpSection guests={rsvp.guests} submitted={rsvp.submitted} submitting={rsvp.submitting} message={rsvp.message} canSubmit={rsvp.canSubmit} mealChoices={config.mealChoices || []} onAddGuest={rsvp.addGuest} onRemoveGuest={rsvp.removeGuest} onUpdateGuest={rsvp.updateGuest} onSubmit={rsvp.submit} />
        </div>
      </Section>
      <footer className="py-8 px-6 text-center"><p className="text-[10px] opacity-20">Daawa — Invitations de mariage</p></footer>
    </div>
  )
}
