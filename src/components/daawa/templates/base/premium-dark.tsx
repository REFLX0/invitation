'use client'

import { motion } from 'framer-motion'
import type { InvitationTemplateProps } from '../invitation-template'
import type { PremiumTierConfig } from '../../wizard/tier-config-types'
import { useCountdown, useRsvpForm } from '../shared/hooks'
import { Section, OrnamentalDivider, CountdownDisplay, ScheduleTimeline, RsvpSection } from '../shared/atoms'
import { ScratchCard, MusicPlayer } from '../shared/interactive'

/* ── Dark immersive variant: full-bleed hero, overlay sections ── */
export function PremiumDark({ event }: InvitationTemplateProps) {
  const config: PremiumTierConfig = event.tierConfig ? JSON.parse(event.tierConfig) : { ceremonyTime: '', receptionTime: '', scheduleItems: [], venueGps: '', directionsNote: '', rsvpDeadline: '', maxGuests: '5', mealChoices: [], customMessage: '', scratchRevealMessage: '', waxSealColor: 'red', envelopeLinerPattern: 'plain', backgroundMusicEnabled: false, musicStyle: 'none', guestPersonalMessage: '', customColorAccent: '', preferredLanguage: 'FR' }
  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(parseInt(config.maxGuests || '5'), config.mealChoices || [], event.id)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tpl-bg)', color: 'var(--tpl-text)' }}>
      <div className="fixed top-4 right-4 z-50"><MusicPlayer enabled={config.backgroundMusicEnabled} style={config.musicStyle || 'none'} /></div>

      {/* Full-bleed hero with vertical names */}
      <Section className="min-h-screen flex items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: 'radial-gradient(circle at 50% 50%, var(--tpl-accent) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: 'var(--tpl-accent)', opacity: 0.15 }} />
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ backgroundColor: 'var(--tpl-accent)', opacity: 0.15 }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="relative z-10 space-y-10 max-w-lg">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.5em]" style={{ color: 'var(--tpl-accent)', opacity: 0.5 }}>
              {config.preferredLanguage === 'AR' ? '\u0628\u0645\u0646\u0627\u0633\u0628\u0629 \u0632\u0641\u0627\u0641\u0647\u0645\u0627' : 'Vous sont cordialement invites'}
            </p>
          </div>
          <div className="space-y-2">
            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-5xl sm:text-7xl font-extralight tracking-tight" style={{ fontFamily: 'var(--tpl-heading-font)' }}>
              {event.partner1Name}
            </motion.h1>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }} className="py-2">
              <span className="text-sm tracking-[0.6em] uppercase" style={{ color: 'var(--tpl-accent)' }}>et</span>
            </motion.div>
            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-5xl sm:text-7xl font-extralight tracking-tight" style={{ fontFamily: 'var(--tpl-heading-font)' }}>
              {event.partner2Name}
            </motion.h1>
          </div>
          {config.guestPersonalMessage && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-sm italic" style={{ color: 'var(--tpl-accent)', opacity: 0.7 }}>&ldquo;{config.guestPersonalMessage}&rdquo;</motion.p>
          )}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="space-y-1">
            <p className="text-xs tracking-[0.2em] uppercase" style={{ opacity: 0.4 }}>
              {new Date(event.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.2 }} className="pt-4">
            <svg className="w-4 h-4 mx-auto animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </motion.div>
        </motion.div>
      </Section>

      {/* Scratch card */}
      {config.scratchRevealMessage && (
        <Section className="py-12 px-6" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <div className="max-w-md mx-auto text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em]" style={{ opacity: 0.4 }}>Message secret</p>
            <ScratchCard message={config.scratchRevealMessage} revealColor="var(--tpl-accent)" width={300} height={100} />
          </div>
        </Section>
      )}

      {/* Countdown: Horizontal bar */}
      <Section className="py-16 px-6">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <p className="text-[10px] uppercase tracking-[0.4em]" style={{ opacity: 0.4 }}>Compte a rebours</p>
          <CountdownDisplay days={countdown.days} hours={countdown.hours} minutes={countdown.minutes} seconds={countdown.seconds} />
        </div>
      </Section>

      {/* Venue */}
      <Section className="py-16 px-6" delay={0.1} style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
        <div className="max-w-md mx-auto text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em]" style={{ opacity: 0.4 }}>Lieu</p>
          <h2 className="text-2xl font-extralight tracking-wide" style={{ fontFamily: 'var(--tpl-heading-font)' }}>{event.venueName}</h2>
          <p className="text-sm" style={{ opacity: 0.5 }}>{event.venueAddress}</p>
          {config.venueGps && (
            <a href={config.venueGps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs mt-1 hover:underline" style={{ color: 'var(--tpl-accent)' }}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Voir sur la carte
            </a>
          )}
        </div>
      </Section>

      {/* Schedule */}
      {(config.scheduleItems?.filter((s) => s.label).length > 0 || config.ceremonyTime || config.receptionTime) && (
        <Section className="py-16 px-6" delay={0.2}>
          <div className="max-w-md mx-auto text-center space-y-6">
            <p className="text-[10px] uppercase tracking-[0.4em]" style={{ opacity: 0.4 }}>Programme</p>
            <ScheduleTimeline items={[...(config.ceremonyTime ? [{ label: 'Ceremonie', time: config.ceremonyTime }] : []), ...(config.receptionTime ? [{ label: 'Reception', time: config.receptionTime }] : []), ...(config.scheduleItems?.filter((s) => s.label) || [])]} />
          </div>
        </Section>
      )}

      {/* RSVP */}
      <Section className="py-16 px-6" delay={0.3} style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-[10px] uppercase tracking-[0.4em]" style={{ opacity: 0.4 }}>Repondez s&apos;il vous plait</p>
          <RsvpSection guests={rsvp.guests} submitted={rsvp.submitted} submitting={rsvp.submitting} message={rsvp.message} canSubmit={rsvp.canSubmit} mealChoices={config.mealChoices || []} onAddGuest={rsvp.addGuest} onRemoveGuest={rsvp.removeGuest} onUpdateGuest={rsvp.updateGuest} onSubmit={rsvp.submit} />
        </div>
      </Section>

      <footer className="py-8 px-6 text-center">
        <OrnamentalDivider variant="minimal" className="mb-4" />
        <p className="text-[10px]" style={{ opacity: 0.2 }}>Daawa — Invitations de mariage</p>
      </footer>
    </div>
  )
}
