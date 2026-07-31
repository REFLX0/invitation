'use client'
import { motion } from 'framer-motion'
import type { InvitationTemplateProps } from '../invitation-template'
import type { LuxeTierConfig } from '../../wizard/tier-config-types'
import { useCountdown, useRsvpForm } from '../shared/hooks'
import { Section, OrnamentalDivider, CountdownDisplay, ScheduleTimeline, RsvpSection } from '../shared/atoms'
import { MusicPlayer } from '../shared/interactive'

export function SpecializedLellaBeya({ event }: InvitationTemplateProps) {
  const config: LuxeTierConfig = event.tierConfig ? JSON.parse(event.tierConfig) : {}
  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(parseInt(config.maxGuests || '5'), config.mealChoices || [], event.id)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tpl-bg)', color: 'var(--tpl-text)' }}>
      <div className="fixed top-4 right-4 z-50"><MusicPlayer enabled={config.backgroundMusicEnabled || false} style={config.musicStyle || 'none'} /></div>
      <Section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center relative">
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-8 opacity-10" viewBox="0 0 256 32"><path d="M0,16 Q64,0 128,16 Q192,32 256,16" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative space-y-8 max-w-lg">
          {config.arabicCalligraphyEnabled && <p className="text-xl" style={{ fontFamily: 'var(--font-amiri)', color: 'var(--tpl-accent)', opacity: 0.7 }}>&#1576;&#1616;&#1587;&#1605; &#1575;&#1604;&#1604;&#1607; &#1575;&#1604;&#1585;&#1614;&#1581;&#1605;&#1614;&#1606; &#1575;&#1604;&#1585;&#1614;&#1581;&#1616;&#1610;&#1605;</p>}
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-accent)', opacity: 0.7 }}>Vous sont cordialement invites</p>
          <h1 className="text-4xl sm:text-6xl font-light leading-tight" style={{ fontFamily: 'var(--tpl-heading-font)' }}>
            {event.partner1Name}<span className="block text-2xl my-3" style={{ color: 'var(--tpl-accent)' }}>&</span>{event.partner2Name}
          </h1>
          <OrnamentalDivider variant="ornate" className="text-[var(--tpl-accent)]" />
          <p className="text-sm opacity-50">{new Date(event.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          {config.monogramInitials && <div className="text-4xl tracking-[0.2em]" style={{ fontFamily: 'var(--font-amiri)', color: 'var(--tpl-accent)', opacity: 0.5 }}>{config.monogramInitials}</div>}
        </motion.div>
      </Section>
      <Section className="py-16 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
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
      <Section className="py-16 px-6" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] opacity-50">RSVP</p>
          <RsvpSection guests={rsvp.guests} submitted={rsvp.submitted} submitting={rsvp.submitting} message={rsvp.message} canSubmit={rsvp.canSubmit} mealChoices={config.mealChoices || []} onAddGuest={rsvp.addGuest} onRemoveGuest={rsvp.removeGuest} onUpdateGuest={rsvp.updateGuest} onSubmit={rsvp.submit} />
        </div>
      </Section>
      <footer className="py-8 px-6 text-center"><p className="text-[10px] opacity-20">Daawa — Invitations de mariage</p></footer>
    </div>
  )
}
