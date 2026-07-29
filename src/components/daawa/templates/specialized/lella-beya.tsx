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

// ── Ottoman / Tunisian SVG Ornaments ─────────────────────────
function OttomanArch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 120" className={`w-full max-w-xs ${className}`} fill="none">
      <path
        d="M10 110 Q10 10 150 10 Q290 10 290 110"
        stroke="#8B5E3C"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <path
        d="M30 110 Q30 25 150 25 Q270 25 270 110"
        stroke="#8B5E3C"
        strokeWidth="0.8"
        opacity="0.2"
      />
      {/* Top finial */}
      <circle cx="150" cy="8" r="4" fill="#8B5E3C" opacity="0.3" />
      <path d="M145 12 L150 2 L155 12" stroke="#8B5E3C" strokeWidth="0.8" opacity="0.3" />
    </svg>
  )
}

function OttomanBorder({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <svg viewBox="0 0 400 12" className="w-full h-3" fill="none">
        {/* Top band */}
        <line x1="0" y1="1" x2="400" y2="1" stroke="#8B5E3C" strokeWidth="0.8" opacity="0.4" />
        <line x1="0" y1="3" x2="400" y2="3" stroke="#8B5E3C" strokeWidth="0.5" opacity="0.2" />
        {/* Repeating diamond pattern */}
        {Array.from({ length: 25 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 16 + 8}, 6)`}>
            <path
              d="M0 -2 L3 0 L0 2 L-3 0 Z"
              fill="#8B5E3C"
              opacity={0.15 + (i % 2 === 0 ? 0.1 : 0)}
            />
          </g>
        ))}
        {/* Bottom band */}
        <line x1="0" y1="9" x2="400" y2="9" stroke="#8B5E3C" strokeWidth="0.5" opacity="0.2" />
        <line x1="0" y1="11" x2="400" y2="11" stroke="#8B5E3C" strokeWidth="0.8" opacity="0.4" />
      </svg>
    </div>
  )
}

function OttomanStar({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 50 50" className={className} width={size} height={size} fill="#D4A76A" opacity="0.5">
      <path d="M25 2 L29 18 L45 18 L32 28 L36 44 L25 35 L14 44 L18 28 L5 18 L21 18 Z" />
    </svg>
  )
}

function TilePattern({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`absolute inset-0 w-full h-full ${className}`} opacity="0.025">
      <defs>
        <pattern id="ottoman-tiles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="40" height="40" fill="none" stroke="#8B5E3C" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="8" fill="none" stroke="#8B5E3C" strokeWidth="0.3" />
          <path d="M12 20 L20 12 L28 20 L20 28 Z" fill="none" stroke="#8B5E3C" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#ottoman-tiles)" />
    </svg>
  )
}

function OttomanDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px flex-1 max-w-[60px] bg-[#8B5E3C]/20" />
      <OttomanStar size={14} />
      <span className="h-px flex-1 max-w-[60px] bg-[#8B5E3C]/20" />
    </div>
  )
}

export function SpecializedLellaBeya({ event }: InvitationTemplateProps) {
  const config: LuxeTierConfig = event.tierConfig
    ? JSON.parse(event.tierConfig)
    : {}

  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(
    parseInt(config.maxGuests || '10'),
    config.mealChoices || [],
    event.id,
  )

  const calligraphyFont = config.preferredCalligraphyFont || 'amiri'

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#2C1810] overflow-hidden">
      {/* ── HERO ── */}
      <Section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        <TilePattern />
        <OttomanArch className="absolute top-0 left-1/2 -translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 space-y-8 max-w-lg"
        >
          <OttomanBorder className="mx-auto max-w-[200px]" />

          {/* Bismillah / Arabic header */}
          {config.arabicCalligraphyEnabled && (
            <p
              className="text-2xl text-[#8B5E3C]/70"
              style={{ fontFamily: '"Amiri", serif' }}
              dir="rtl"
            >
              باسم الله الرحمن الرحيم
            </p>
          )}

          {/* Monogram */}
          {config.monogramInitials && (
            <MonogramDisplay
              initials={config.monogramInitials}
              style={config.monogramStyle || 'arabesque-square'}
              color="#8B5E3C"
              className="mx-auto"
            />
          )}

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B5E3C]/50">
            Vous sont cordialement invites
          </p>

          <h1
            className="text-4xl sm:text-5xl font-light leading-tight text-[#2C1810]"
            style={{
              fontFamily: calligraphyFont === 'amiri'
                ? '"Amiri", serif'
                : calligraphyFont === 'great-vibes'
                  ? '"Great Vibes", cursive'
                  : 'serif',
            }}
          >
            {event.partner1Name}
          </h1>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#8B5E3C]/25" />
            <OttomanStar size={16} />
            <span className="h-px w-10 bg-[#8B5E3C]/25" />
          </div>

          <h1
            className="text-4xl sm:text-5xl font-light leading-tight text-[#2C1810]"
            style={{
              fontFamily: calligraphyFont === 'amiri'
                ? '"Amiri", serif'
                : calligraphyFont === 'great-vibes'
                  ? '"Great Vibes", cursive'
                  : 'serif',
            }}
          >
            {event.partner2Name}
          </h1>

          <p className="text-xs text-[#8B5E3C]/50 tracking-wider">
            {new Date(event.eventDate).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Arabic names */}
          {config.arabicCalligraphyEnabled && (
            <p
              className="text-lg text-[#D4A76A]/70"
              style={{ fontFamily: '"Amiri", serif' }}
              dir="rtl"
            >
              {event.partner1Name} و {event.partner2Name}
            </p>
          )}

          <OttomanBorder className="mx-auto max-w-[200px]" />
        </motion.div>
      </Section>

      {/* ── HERO PHOTO ── */}
      {config.heroPhotoUrl && (
        <Section className="px-6">
          <div className="max-w-2xl mx-auto relative">
            <OttomanBorder className="absolute -top-2 left-0 right-0 z-10" />
            <PhotoSection
              imageUrl={config.heroPhotoUrl}
              fallbackGradient="from-[#8B5E3C]/10 to-[#FFF8F0]"
              className="rounded-lg"
              aspectClass="aspect-[16/9]"
            />
            <OttomanBorder className="absolute -bottom-2 left-0 right-0 z-10" />
          </div>
        </Section>
      )}

      {/* ── COUPLE PHOTO ── */}
      {config.couplePhotoUrl && (
        <Section className="py-16 px-6">
          <div className="max-w-md mx-auto">
            <PhotoSection
              imageUrl={config.couplePhotoUrl}
              fallbackGradient="from-[#D4A76A]/10 to-[#FFF8F0]"
              className="rounded-xl"
            />
          </div>
        </Section>
      )}

      {/* ── COUNTDOWN ── */}
      <Section className="py-20 px-6 bg-[#F5EDE0]/60">
        <div className="max-w-md mx-auto text-center space-y-8">
          <OttomanDivider />
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B5E3C]/50">
            Compte a rebours
          </p>
          <CountdownDisplay
            days={countdown.days}
            hours={countdown.hours}
            minutes={countdown.minutes}
            seconds={countdown.seconds}
            labelColor="text-[#8B5E3C]/50"
            boxClass="bg-[#FFF8F0] border border-[#8B5E3C]/15 rounded-lg px-5 py-4 shadow-sm"
          />
          <OttomanDivider />
        </div>
      </Section>

      {/* ── VENUE ── */}
      <Section className="py-20 px-6" delay={0.1}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B5E3C]/50">
            Lieu de la celebration
          </p>
          <h2
            className="text-2xl font-light text-[#2C1810]"
            style={{ fontFamily: 'serif' }}
          >
            {event.venueName}
          </h2>
          <p className="text-xs text-[#8B5E3C]/40">{event.venueAddress}</p>
          {config.venueGps && (
            <a
              href={config.venueGps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#8B5E3C] hover:text-[#8B5E3C]/80 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Voir sur la carte
            </a>
          )}
          {config.directionsNote && (
            <p className="text-xs text-[#8B5E3C]/30 italic">{config.directionsNote}</p>
          )}
        </div>
      </Section>

      {/* ── VENUE PHOTO ── */}
      {config.venuePhotoUrl && (
        <Section className="px-6">
          <PhotoSection
            imageUrl={config.venuePhotoUrl}
            fallbackGradient="from-[#D4A76A]/10 to-[#FFF8F0]"
            className="max-w-2xl mx-auto rounded-lg"
          />
        </Section>
      )}

      {/* ── SCHEDULE ── */}
      {(config.scheduleItems?.filter((s) => s.label).length > 0 || config.ceremonyTime || config.receptionTime) && (
        <Section className="py-20 px-6 bg-[#F5EDE0]/40" delay={0.2}>
          <div className="max-w-md mx-auto text-center space-y-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B5E3C]/50">
              Programme
            </p>
            <ScheduleTimeline
              items={[
                ...(config.ceremonyTime ? [{ label: 'Ceremonie', time: config.ceremonyTime }] : []),
                ...(config.receptionTime ? [{ label: 'Reception', time: config.receptionTime }] : []),
                ...(config.scheduleItems?.filter((s) => s.label) || []),
              ]}
              accentColor="bg-[#8B5E3C]"
            />
          </div>
        </Section>
      )}

      {/* ── CUSTOM MESSAGE ── */}
      {config.customMessage && (
        <Section className="py-12 px-6" delay={0.25}>
          <div className="max-w-md mx-auto text-center">
            <OttomanDivider className="mb-4" />
            <p className="text-sm italic leading-relaxed text-[#2C1810]/70">
              "{config.customMessage}"
            </p>
            <OttomanDivider className="mt-4" />
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
        <Section className="py-16 px-6 bg-[#F5EDE0]/40" delay={0.35}>
          <div className="max-w-md mx-auto text-center space-y-4">
            <OttomanDivider />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B5E3C]/50">
              After Party
            </p>
            <h2 className="text-xl font-light" style={{ fontFamily: 'serif' }}>
              {config.afterPartyVenue}
            </h2>
            {config.afterPartyTime && (
              <p className="text-xs text-[#8B5E3C]/40">{config.afterPartyTime}</p>
            )}
            <OttomanDivider />
          </div>
        </Section>
      )}

      {/* ── GALLERY ── */}
      {config.galleryPhotoUrls?.filter(Boolean).length > 0 && (
        <Section className="py-16 px-6" delay={0.4}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B5E3C]/50 text-center mb-8">
              Galerie
            </p>
            <div className="grid grid-cols-2 gap-3">
              {config.galleryPhotoUrls.filter(Boolean).map((url, i) => (
                <PhotoSection
                  key={i}
                  imageUrl={url}
                  fallbackGradient="from-[#D4A76A]/10 to-[#FFF8F0]"
                  aspectClass="aspect-square"
                />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── RSVP ── */}
      <Section className="py-20 px-6 bg-[#F5EDE0]/40" delay={0.5}>
        <div className="max-w-md mx-auto text-center space-y-8">
          <OttomanDivider />
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8B5E3C]/50">
            Repondez s'il vous plait
          </p>
          {config.rsvpDeadline && (
            <p className="text-xs text-[#8B5E3C]/30">
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
      <footer className="py-12 px-6 text-center bg-[#2C1810]">
        {config.customFooterText && (
          <p className="text-xs text-[#D4A76A]/50 italic mb-4">{config.customFooterText}</p>
        )}
        <OttomanBorder className="mx-auto max-w-[200px] mb-4" />
        <p className="text-[10px] text-[#D4A76A]/30">Daawa — Invitations de mariage</p>
      </footer>
    </div>
  )
}
