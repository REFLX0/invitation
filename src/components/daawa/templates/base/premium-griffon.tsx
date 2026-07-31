'use client'

import { motion } from 'framer-motion'
import type { InvitationTemplateProps } from '../invitation-template'
import type { PremiumTierConfig } from '../../wizard/tier-config-types'
import { useCountdown, useRsvpForm } from '../shared/hooks'
import { Section, OrnamentalDivider, CountdownDisplay, ScheduleTimeline, RsvpSection } from '../shared/atoms'
import { ScratchCard, MusicPlayer } from '../shared/interactive'

export function PremiumGriffon({ event }: InvitationTemplateProps) {
  const config: PremiumTierConfig = event.tierConfig ? JSON.parse(event.tierConfig) : { ceremonyTime: '', receptionTime: '', scheduleItems: [], venueGps: '', directionsNote: '', rsvpDeadline: '', maxGuests: '5', mealChoices: [], customMessage: '', scratchRevealMessage: '', waxSealColor: 'red', envelopeLinerPattern: 'plain', backgroundMusicEnabled: false, musicStyle: 'none', guestPersonalMessage: '', customColorAccent: '', preferredLanguage: 'FR' }
  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(parseInt(config.maxGuests || '5'), config.mealChoices || [], event.id)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tpl-bg)', color: 'var(--tpl-text)' }}>
      <div className="fixed top-4 right-4 z-50"><MusicPlayer enabled={config.backgroundMusicEnabled} style={config.musicStyle || 'none'} /></div>

      <Section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: 'radial-gradient(ellipse at 50% 30%, var(--tpl-accent) 0%, transparent 70%)' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative space-y-6 max-w-lg z-10">
          <OrnamentalDivider variant="ornate" className="text-[var(--tpl-accent)]" />
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>
            {config.preferredLanguage === 'AR' ? '\u0628\u0645\u0646\u0627\u0633\u0628\u0629 \u0632\u0641\u0627\u0641\u0647\u0645\u0627' : 'Vous sont cordialement invites'}
          </p>
          <h1 className="text-4xl sm:text-5xl font-light leading-tight" style={{ fontFamily: 'var(--tpl-heading-font)', color: 'var(--tpl-text)' }}>
            {event.partner1Name}<span className="block text-2xl my-2" style={{ color: 'var(--tpl-accent)' }}>&</span>{event.partner2Name}
          </h1>
          <p className="text-sm" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>
            {new Date(event.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          {config.guestPersonalMessage && <p className="text-sm italic leading-relaxed mt-4" style={{ color: 'var(--tpl-accent)' }}>&ldquo;{config.guestPersonalMessage}&rdquo;</p>}
          <OrnamentalDivider variant="ornate" className="text-[var(--tpl-accent)]" />
        </motion.div>
      </Section>

      {config.scratchRevealMessage && (
        <Section className="py-12 px-6" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
          <div className="max-w-md mx-auto text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>Message secret</p>
            <div className="flex justify-center"><ScratchCard message={config.scratchRevealMessage} revealColor="var(--tpl-accent)" width={300} height={100} /></div>
          </div>
        </Section>
      )}

      <Section className="py-16 px-6">
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>Compte a rebours</p>
          <CountdownDisplay days={countdown.days} hours={countdown.hours} minutes={countdown.minutes} seconds={countdown.seconds} />
        </div>
      </Section>

      <Section className="py-16 px-6" delay={0.1} style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
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
        <Section className="py-16 px-6" delay={0.2}>
          <div className="max-w-md mx-auto text-center space-y-6">
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--tpl-text)', opacity: 0.6 }}>Programme</p>
            <ScheduleTimeline items={[...(config.ceremonyTime ? [{ label: 'Ceremonie', time: config.ceremonyTime }] : []), ...(config.receptionTime ? [{ label: 'Reception', time: config.receptionTime }] : []), ...(config.scheduleItems?.filter((s) => s.label) || [])]} />
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
        <OrnamentalDivider variant="ornate" className="mb-4" style={{ color: 'var(--tpl-text)', opacity: 0.2 }} />
        <p className="text-[10px]" style={{ color: 'var(--tpl-text)', opacity: 0.3 }}>Daawa — Invitations de mariage</p>
      </footer>
    </div>
  )
}
