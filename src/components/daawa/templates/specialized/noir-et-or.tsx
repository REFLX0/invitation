'use client'

import { motion } from 'framer-motion'
import type { InvitationTemplateProps } from '../invitation-template'
import type { LuxeTierConfig } from '../../wizard/tier-config-types'
import { useCountdown, useRsvpForm } from '../shared/hooks'
import {
  Section,
  OrnamentalDivider,
  CountdownDisplay,
  ScheduleTimeline,
  RsvpSection,
  MonogramDisplay,
  DressCodeSwatches,
  PhotoSection,
} from '../shared/atoms'

// ── Art Deco SVG Ornaments ────────────────────────────────────
function ArtDecoCorner({ className = '', color = '#C6A664' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`w-16 h-16 sm:w-20 sm:h-20 ${className}`} fill="none">
      <path d="M0 0 L30 0 L30 3 L3 3 L3 30 L0 30 Z" fill={color} opacity="0.6" />
      <path d="M8 8 L22 8 L22 10 L10 10 L10 22 L8 22 Z" fill={color} opacity="0.3" />
      <line x1="5" y1="40" x2="5" y2="75" stroke={color} strokeWidth="0.5" opacity="0.2" />
      <line x1="5" y1="75" x2="40" y2="75" stroke={color} strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}

function ArtDecoFrame({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 8" className={`w-full max-w-xs h-1.5 ${className}`} fill="none" stroke="#C6A664" strokeWidth="0.8" opacity="0.5">
      <line x1="0" y1="4" x2="400" y2="4" />
      <circle cx="200" cy="4" r="3" fill="#C6A664" />
      <circle cx="100" cy="4" r="1.5" fill="#C6A664" />
      <circle cx="300" cy="4" r="1.5" fill="#C6A664" />
      <path d="M0 4 L90 4" strokeDasharray="2 4" />
      <path d="M310 4 L400 4" strokeDasharray="2 4" />
    </svg>
  )
}

function ArtDecoSunburst({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`absolute inset-0 w-full h-full ${className}`} opacity="0.03">
      <defs>
        <linearGradient id="sunburst" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C6A664" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180
        const x2 = 100 + Math.sin(angle) * 300
        const y2 = 100 + Math.cos(angle) * 300
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={x2}
            y2={y2}
            stroke="url(#sunburst)"
            strokeWidth="1"
          />
        )
      })}
      <circle cx="100" cy="100" r="30" fill="url(#sunburst)" />
    </svg>
  )
}

function ArtDecoDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 4" className="w-16 sm:w-24" fill="none" stroke="#C6A664" strokeWidth="0.8">
        <path d="M0 2 L35 2" />
        <path d="M65 2 L100 2" />
      </svg>
      <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#C6A664" opacity="0.6">
        <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" />
      </svg>
      <svg viewBox="0 0 100 4" className="w-16 sm:w-24" fill="none" stroke="#C6A664" strokeWidth="0.8">
        <path d="M0 2 L35 2" />
        <path d="M65 2 L100 2" />
      </svg>
    </div>
  )
}

export function SpecializedNoirEtOr({ event }: InvitationTemplateProps) {
  const config: LuxeTierConfig = event.tierConfig
    ? JSON.parse(event.tierConfig)
    : {}

  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(
    parseInt(config.maxGuests || '10'),
    config.mealChoices || [],
    event.id,
  )

  const calligraphyFont = config.preferredCalligraphyFont || 'great-vibes'

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* ── HERO ── */}
      <Section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        <ArtDecoSunburst />

        {/* Corners */}
        <div className="absolute top-6 left-6">
          <ArtDecoCorner />
        </div>
        <div className="absolute top-6 right-6">
          <ArtDecoCorner className="rotate-90" />
        </div>
        <div className="absolute bottom-6 left-6">
          <ArtDecoCorner className="-rotate-90" />
        </div>
        <div className="absolute bottom-6 right-6">
          <ArtDecoCorner className="rotate-180" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 space-y-8 max-w-lg"
        >
          <ArtDecoFrame className="mx-auto" />

          {/* Monogram */}
          {config.monogramInitials && (
            <MonogramDisplay
              initials={config.monogramInitials}
              style={config.monogramStyle || 'classic-circle'}
              color="#C6A664"
              className="mx-auto"
            />
          )}

          <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A664]/60">
            Vous sont cordialement invites
          </p>

          <h1
            className="text-5xl sm:text-6xl font-light leading-tight"
            style={{ fontFamily: calligraphyFont === 'great-vibes' ? '"Great Vibes", cursive' : 'serif' }}
          >
            {event.partner1Name}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#C6A664]/30" />
            <span
              className="text-2xl text-[#C6A664]"
              style={{ fontFamily: 'serif' }}
            >
              &
            </span>
            <span className="h-px w-12 bg-[#C6A664]/30" />
          </div>
          <h1
            className="text-5xl sm:text-6xl font-light leading-tight"
            style={{ fontFamily: calligraphyFont === 'great-vibes' ? '"Great Vibes", cursive' : 'serif' }}
          >
            {event.partner2Name}
          </h1>

          <p className="text-xs text-white/50 tracking-wider">
            {new Date(event.eventDate).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Arabic calligraphy */}
          {config.arabicCalligraphyEnabled && (
            <p className="text-lg text-[#C6A664]/80" style={{ fontFamily: '"Amiri", serif' }} dir="rtl">
              بمناسبة زفافهما السعيد
            </p>
          )}

          <ArtDecoFrame className="mx-auto" />
        </motion.div>
      </Section>

      {/* ── HERO PHOTO ── */}
      {config.heroPhotoUrl && (
        <Section className="px-6 -mt-4">
          <PhotoSection
            imageUrl={config.heroPhotoUrl}
            fallbackGradient="from-[#1a1a1a] to-[#0a0a0a]"
            className="max-w-2xl mx-auto"
            aspectClass="aspect-[21/9]"
          />
        </Section>
      )}

      {/* ── COUPLE PHOTO ── */}
      {config.couplePhotoUrl && (
        <Section className="py-16 px-6">
          <div className="max-w-lg mx-auto text-center">
            <PhotoSection
              imageUrl={config.couplePhotoUrl}
              fallbackGradient="from-[#C6A664]/10 to-[#1a1a1a]"
              className="rounded-2xl"
            />
          </div>
        </Section>
      )}

      {/* ── COUNTDOWN ── */}
      <Section className="py-20 px-6 border-y border-[#C6A664]/10">
        <div className="max-w-md mx-auto text-center space-y-8">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A664]/50">
            Compte a rebours
          </p>
          <CountdownDisplay
            days={countdown.days}
            hours={countdown.hours}
            minutes={countdown.minutes}
            seconds={countdown.seconds}
            labelColor="text-[#C6A664]/50"
            boxClass="border border-[#C6A664]/15 rounded-lg px-5 py-4"
          />
        </div>
      </Section>

      {/* ── VENUE ── */}
      <Section className="py-20 px-6" delay={0.1}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <ArtDecoDivider className="text-[#C6A664]" />
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A664]/50">
            Lieu de la celebration
          </p>
          <h2
            className="text-2xl font-light"
            style={{ fontFamily: calligraphyFont === 'great-vibes' ? '"Great Vibes", cursive' : 'serif' }}
          >
            {event.venueName}
          </h2>
          <p className="text-xs text-white/40">{event.venueAddress}</p>
          {config.venueGps && (
            <a
              href={config.venueGps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#C6A664] hover:text-[#C6A664]/80 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Voir sur la carte
            </a>
          )}
          {config.directionsNote && (
            <p className="text-xs text-white/30 italic">{config.directionsNote}</p>
          )}
          <ArtDecoDivider className="text-[#C6A664]" />
        </div>
      </Section>

      {/* ── VENUE PHOTO ── */}
      {config.venuePhotoUrl && (
        <Section className="px-6">
          <PhotoSection
            imageUrl={config.venuePhotoUrl}
            fallbackGradient="from-[#1a1a1a] to-[#0a0a0a]"
            className="max-w-2xl mx-auto"
          />
        </Section>
      )}

      {/* ── SCHEDULE ── */}
      {(config.scheduleItems?.filter((s) => s.label).length > 0 || config.ceremonyTime || config.receptionTime) && (
        <Section className="py-20 px-6 border-t border-[#C6A664]/10" delay={0.2}>
          <div className="max-w-md mx-auto text-center space-y-8">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A664]/50">
              Programme
            </p>
            <ScheduleTimeline
              items={[
                ...(config.ceremonyTime ? [{ label: 'Ceremonie', time: config.ceremonyTime }] : []),
                ...(config.receptionTime ? [{ label: 'Reception', time: config.receptionTime }] : []),
                ...(config.scheduleItems?.filter((s) => s.label) || []),
              ]}
              accentColor="bg-[#C6A664]"
            />
          </div>
        </Section>
      )}

      {/* ── DRESS CODE ── */}
      {(config.dressCodeText || config.customColorSwatches?.filter(Boolean).length > 0) && (
        <Section className="py-16 px-6" delay={0.3}>
          <DressCodeSwatches
            text={config.dressCodeText || ''}
            swatches={config.customColorSwatches || []}
            paletteName={config.colorPaletteName || ''}
          />
        </Section>
      )}

      {/* ── AFTER PARTY ── */}
      {config.afterPartyVenue && (
        <Section className="py-16 px-6 border-y border-[#C6A664]/10" delay={0.35}>
          <div className="max-w-md mx-auto text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A664]/50">
              After Party
            </p>
            <h2 className="text-xl font-light" style={{ fontFamily: 'serif' }}>
              {config.afterPartyVenue}
            </h2>
            {config.afterPartyTime && (
              <p className="text-xs text-white/40">{config.afterPartyTime}</p>
            )}
          </div>
        </Section>
      )}

      {/* ── GALLERY ── */}
      {config.galleryPhotoUrls?.filter(Boolean).length > 0 && (
        <Section className="py-16 px-6" delay={0.4}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A664]/50 text-center mb-8">
              Galerie
            </p>
            <div className="grid grid-cols-2 gap-3">
              {config.galleryPhotoUrls.filter(Boolean).map((url, i) => (
                <PhotoSection
                  key={i}
                  imageUrl={url}
                  fallbackGradient="from-[#1a1a1a] to-[#0a0a0a]"
                  aspectClass="aspect-square"
                />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── RSVP ── */}
      <Section className="py-20 px-6 border-t border-[#C6A664]/10" delay={0.5}>
        <div className="max-w-md mx-auto text-center space-y-8">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#C6A664]/50">
            Repondez s'il vous plait
          </p>
          {config.rsvpDeadline && (
            <p className="text-xs text-white/30">
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
            onUpdateGuest={(i, f, v) => rsvp.updateGuest(i, f as 'name' | 'attending' | 'meal' | 'plusOne', v)}
            onSubmit={() => rsvp.submit()}
          />
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 text-center border-t border-[#C6A664]/10">
        {config.customFooterText && (
          <p className="text-xs text-white/30 italic mb-4">{config.customFooterText}</p>
        )}
        <ArtDecoFrame className="mx-auto mb-4" />
        <p className="text-[10px] text-white/20">Daawa — Invitations de mariage</p>
      </footer>
    </div>
  )
}
