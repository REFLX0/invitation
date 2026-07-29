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

// ── Carthaginian SVG Ornaments ───────────────────────────────
function CarthageColumn({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 120" className={`w-6 h-20 ${className}`} fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3">
      {/* Column shaft */}
      <line x1="20" y1="20" x2="20" y2="100" />
      {/* Capital */}
      <path d="M10 20 Q20 12 30 20" />
      <line x1="10" y1="20" x2="10" y2="16" />
      <line x1="30" y1="20" x2="30" y2="16" />
      <line x1="8" y1="16" x2="32" y2="16" />
      {/* Base */}
      <line x1="12" y1="100" x2="28" y2="100" />
      <line x1="10" y1="104" x2="30" y2="104" />
      {/* Fluting */}
      <line x1="16" y1="22" x2="16" y2="98" strokeWidth="0.3" opacity="0.3" />
      <line x1="24" y1="22" x2="24" y2="98" strokeWidth="0.3" opacity="0.3" />
    </svg>
  )
}

function CarthageWreath({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`w-16 h-16 ${className}`} fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.4">
      {/* Laurel wreath */}
      <ellipse cx="60" cy="60" rx="40" ry="45" />
      {/* Left leaves */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = -140 + i * 20
        const rad = (angle * Math.PI) / 180
        const cx = 60 + Math.cos(rad) * 32
        const cy = 60 + Math.sin(rad) * 37
        return (
          <ellipse
            key={`l${i}`}
            cx={cx}
            cy={cy}
            rx="6"
            ry="12"
            transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
            fill="#D4AF37"
            opacity="0.2"
            stroke="none"
          />
        )
      })}
      {/* Right leaves */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = -40 + i * 20
        const rad = (angle * Math.PI) / 180
        const cx = 60 + Math.cos(rad) * 32
        const cy = 60 + Math.sin(rad) * 37
        return (
          <ellipse
            key={`r${i}`}
            cx={cx}
            cy={cy}
            rx="6"
            ry="12"
            transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
            fill="#D4AF37"
            opacity="0.2"
            stroke="none"
          />
        )
      })}
    </svg>
  )
}

function CarthageFrieze({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 16" className={`w-full ${className}`} fill="none">
      {/* Greek key / meander pattern */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = i * 20
        return (
          <g key={i} stroke="#D4AF37" strokeWidth="0.8" opacity="0.25">
            <path d={`M${x} 8 L${x} 2 L${x + 8} 2 L${x + 8} 6 L${x + 4} 6 L${x + 4} 4 L${x + 2} 4`} />
            <path d={`M${x + 12} 8 L${x + 12} 14 L${x + 20} 14`} />
          </g>
        )
      })}
      {/* Top/bottom lines */}
      <line x1="0" y1="0" x2="400" y2="0" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
      <line x1="0" y1="16" x2="400" y2="16" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

function CarthageDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <CarthageColumn />
      <span className="h-px flex-1 max-w-[40px] bg-[#D4AF37]/20" />
      <CarthageWreath />
      <span className="h-px flex-1 max-w-[40px] bg-[#D4AF37]/20" />
      <CarthageColumn />
    </div>
  )
}

export function SpecializedCarthageOr({ event }: InvitationTemplateProps) {
  const config: LuxeTierConfig = event.tierConfig
    ? JSON.parse(event.tierConfig)
    : {}

  const countdown = useCountdown(event.eventDate)
  const rsvp = useRsvpForm(
    parseInt(config.maxGuests || '10'),
    config.mealChoices || [],
    event.id,
  )

  const calligraphyFont = config.preferredCalligraphyFont || 'cinzel'

  return (
    <div className="min-h-screen bg-[#FDF6E3] text-[#1A0F00] overflow-hidden">
      {/* ── HERO ── */}
      <Section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        {/* Frieze top */}
        <div className="absolute top-0 left-0 right-0">
          <CarthageFrieze />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 space-y-8 max-w-lg pt-8"
        >
          {/* Wreath monogram area */}
          {config.monogramInitials ? (
            <div className="relative inline-block">
              <CarthageWreath className="absolute -top-4 -left-4 w-24 h-24" />
              <MonogramDisplay
                initials={config.monogramInitials}
                style={config.monogramStyle || 'art-deco-diamond'}
                color="#D4AF37"
                className="mx-auto"
              />
            </div>
          ) : (
            <CarthageWreath className="mx-auto w-20 h-20" />
          )}

          <p className="text-[10px] uppercase tracking-[0.5em] text-[#B8860B]/50">
            Vous sont cordialement invites
          </p>

          <h1
            className="text-4xl sm:text-5xl font-light leading-tight"
            style={{
              fontFamily: calligraphyFont === 'cinzel'
                ? '"Cinzel", serif'
                : calligraphyFont === 'great-vibes'
                  ? '"Great Vibes", cursive'
                  : '"Cormorant Garamond", serif',
            }}
          >
            {event.partner1Name}
          </h1>

          <CarthageDivider className="text-[#D4AF37]" />

          <h1
            className="text-4xl sm:text-5xl font-light leading-tight"
            style={{
              fontFamily: calligraphyFont === 'cinzel'
                ? '"Cinzel", serif'
                : calligraphyFont === 'great-vibes'
                  ? '"Great Vibes", cursive'
                  : '"Cormorant Garamond", serif',
            }}
          >
            {event.partner2Name}
          </h1>

          <p className="text-xs text-[#B8860B]/50 tracking-wider">
            {new Date(event.eventDate).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Arabic calligraphy */}
          {config.arabicCalligraphyEnabled && (
            <p className="text-lg text-[#D4AF37]/70" style={{ fontFamily: '"Amiri", serif' }} dir="rtl">
              بمناسبة زفافهما السعيد
            </p>
          )}
        </motion.div>

        {/* Frieze bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <CarthageFrieze />
        </div>
      </Section>

      {/* ── HERO PHOTO ── */}
      {config.heroPhotoUrl && (
        <Section className="px-6">
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute top-0 left-0 right-0 z-10">
              <CarthageFrieze className="scale-y-[-1]" />
            </div>
            <PhotoSection
              imageUrl={config.heroPhotoUrl}
              fallbackGradient="from-[#D4AF37]/10 to-[#FDF6E3]"
              className="rounded-sm"
              aspectClass="aspect-[16/9]"
            />
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <CarthageFrieze />
            </div>
          </div>
        </Section>
      )}

      {/* ── COUPLE PHOTO ── */}
      {config.couplePhotoUrl && (
        <Section className="py-16 px-6">
          <div className="max-w-md mx-auto">
            <PhotoSection
              imageUrl={config.couplePhotoUrl}
              fallbackGradient="from-[#B8860B]/10 to-[#FDF6E3]"
              className="rounded-lg"
            />
          </div>
        </Section>
      )}

      {/* ── COUNTDOWN ── */}
      <Section className="py-20 px-6 bg-[#F5E6C8]/50">
        <div className="max-w-md mx-auto text-center space-y-8">
          <CarthageDivider />
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#B8860B]/50">
            Compte a rebours
          </p>
          <CountdownDisplay
            days={countdown.days}
            hours={countdown.hours}
            minutes={countdown.minutes}
            seconds={countdown.seconds}
            labelColor="text-[#B8860B]/50"
            boxClass="bg-[#FDF6E3] border border-[#D4AF37]/15 rounded-sm px-5 py-4"
          />
          <CarthageDivider />
        </div>
      </Section>

      {/* ── VENUE ── */}
      <Section className="py-20 px-6" delay={0.1}>
        <div className="max-w-md mx-auto text-center space-y-6">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#B8860B]/50">
            Lieu de la celebration
          </p>
          <h2
            className="text-2xl font-light"
            style={{
              fontFamily: calligraphyFont === 'cinzel'
                ? '"Cinzel", serif'
                : '"Cormorant Garamond", serif',
            }}
          >
            {event.venueName}
          </h2>
          <p className="text-xs text-[#B8860B]/40">{event.venueAddress}</p>
          {config.venueGps && (
            <a
              href={config.venueGps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#B8860B] hover:text-[#B8860B]/80 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Voir sur la carte
            </a>
          )}
          {config.directionsNote && (
            <p className="text-xs text-[#B8860B]/30 italic">{config.directionsNote}</p>
          )}
        </div>
      </Section>

      {/* ── VENUE PHOTO ── */}
      {config.venuePhotoUrl && (
        <Section className="px-6">
          <div className="max-w-2xl mx-auto relative">
            <PhotoSection
              imageUrl={config.venuePhotoUrl}
              fallbackGradient="from-[#B8860B]/10 to-[#FDF6E3]"
              className="rounded-sm"
            />
          </div>
        </Section>
      )}

      {/* ── SCHEDULE ── */}
      {(config.scheduleItems?.filter((s) => s.label).length > 0 || config.ceremonyTime || config.receptionTime) && (
        <Section className="py-20 px-6 bg-[#F5E6C8]/40" delay={0.2}>
          <div className="max-w-md mx-auto text-center space-y-8">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#B8860B]/50">
              Programme
            </p>
            <ScheduleTimeline
              items={[
                ...(config.ceremonyTime ? [{ label: 'Ceremonie', time: config.ceremonyTime }] : []),
                ...(config.receptionTime ? [{ label: 'Reception', time: config.receptionTime }] : []),
                ...(config.scheduleItems?.filter((s) => s.label) || []),
              ]}
              accentColor="bg-[#D4AF37]"
            />
          </div>
        </Section>
      )}

      {/* ── CUSTOM MESSAGE ── */}
      {config.customMessage && (
        <Section className="py-12 px-6" delay={0.25}>
          <div className="max-w-md mx-auto text-center">
            <CarthageDivider className="mb-4" />
            <p className="text-sm italic leading-relaxed text-[#1A0F00]/60">
              "{config.customMessage}"
            </p>
            <CarthageDivider className="mt-4" />
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
        <Section className="py-16 px-6 bg-[#F5E6C8]/40" delay={0.35}>
          <div className="max-w-md mx-auto text-center space-y-4">
            <CarthageDivider />
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#B8860B]/50">
              After Party
            </p>
            <h2
              className="text-xl font-light"
              style={{ fontFamily: 'serif' }}
            >
              {config.afterPartyVenue}
            </h2>
            {config.afterPartyTime && (
              <p className="text-xs text-[#B8860B]/40">{config.afterPartyTime}</p>
            )}
            <CarthageDivider />
          </div>
        </Section>
      )}

      {/* ── GALLERY ── */}
      {config.galleryPhotoUrls?.filter(Boolean).length > 0 && (
        <Section className="py-16 px-6" delay={0.4}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#B8860B]/50 text-center mb-8">
              Galerie
            </p>
            <div className="grid grid-cols-2 gap-3">
              {config.galleryPhotoUrls.filter(Boolean).map((url, i) => (
                <PhotoSection
                  key={i}
                  imageUrl={url}
                  fallbackGradient="from-[#B8860B]/10 to-[#FDF6E3]"
                  aspectClass="aspect-square"
                />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ── RSVP ── */}
      <Section className="py-20 px-6 bg-[#F5E6C8]/40" delay={0.5}>
        <div className="max-w-md mx-auto text-center space-y-8">
          <CarthageDivider />
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#B8860B]/50">
            Repondez s'il vous plait
          </p>
          {config.rsvpDeadline && (
            <p className="text-xs text-[#B8860B]/30">
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
      <footer className="py-12 px-6 text-center bg-[#1A0F00]">
        {config.customFooterText && (
          <p className="text-xs text-[#D4AF37]/40 italic mb-4">{config.customFooterText}</p>
        )}
        <CarthageFrieze className="max-w-md mx-auto mb-4" />
        <p className="text-[10px] text-[#D4AF37]/25">Daawa — Invitations de mariage</p>
      </footer>
    </div>
  )
}
