'use client'

import { useMemo } from 'react'
import { TEMPLATE_REGISTRY } from './template-registry'
import { ClassicElegance } from './base/classic-elegance'
import { ClassicFloral } from './base/classic-floral'
import { PremiumGriffon } from './base/premium-griffon'
import { PremiumDark } from './base/premium-dark'
import { SpecializedNoirEtOr } from './specialized/noir-et-or'
import { SpecializedLellaBeya } from './specialized/lella-beya'
import { SpecializedCarthageOr } from './specialized/carthage-or'

export interface InvitationTemplateProps {
  event: { id: string; slug: string; templateId: string; partner1Name: string; partner2Name: string; eventDate: string; venueName: string; venueAddress: string; tier: string; tierConfig: string; rsvps?: { guestName: string; attending: boolean; meal: string; plusOne: string }[] }
}

const COMPONENT_MAP: Record<string, React.ComponentType<InvitationTemplateProps>> = {
  'specialized-noir-et-or': SpecializedNoirEtOr, 'specialized-lella-beya': SpecializedLellaBeya, 'specialized-carthage-or': SpecializedCarthageOr,
  'classic-elegance': ClassicElegance, 'classic-fleur': ClassicFloral, 'classic-aquarelle': ClassicFloral,
  'classic-parchemin': ClassicElegance, 'classic-minimal': ClassicFloral,
  'premium-griffon': PremiumGriffon, 'premium-jardin': PremiumGriffon, 'premium-nuit': PremiumDark,
  'premium-mosaic': PremiumGriffon, 'premium-soie': PremiumDark, 'premium-sahara': PremiumGriffon,
  'premium-oasis': PremiumGriffon, 'premium-medina': PremiumGriffon,
}

const FONT_MAP: Record<string, string> = {
  'classic-elegance': '"Cormorant Garamond", serif', 'classic-fleur': '"Great Vibes", cursive', 'classic-aquarelle': '"Montserrat", sans-serif',
  'classic-parchemin': '"Amiri", serif', 'classic-minimal': '"Montserrat", sans-serif',
  'premium-griffon': '"Cinzel", serif', 'premium-jardin': '"Great Vibes", cursive', 'premium-nuit': '"Montserrat", sans-serif',
  'premium-mosaic': '"Cormorant Garamond", serif', 'premium-soie': '"Dancing Script", cursive', 'premium-sahara': '"Amiri", serif',
  'premium-oasis': '"Montserrat", sans-serif', 'premium-medina': '"Cormorant Garamond", serif',
}

export function InvitationTemplate({ event }: InvitationTemplateProps) {
  const { Component, themeColors, headingFont } = useMemo(() => {
    const reg = TEMPLATE_REGISTRY.find((t) => t.id === event.templateId)
    const layoutKey = reg?.layoutComponent || 'classic-elegance'
    const Component = COMPONENT_MAP[layoutKey] || ClassicElegance
    const themeColors = reg?.themeColors || { bg: '#FBF7F2', text: '#8B2252', accent: '#8B2252' }
    const headingFont = FONT_MAP[layoutKey] || 'serif'
    return { Component, themeColors, headingFont }
  }, [event.templateId])

  return (
    <div style={{ '--tpl-bg': themeColors.bg, '--tpl-text': themeColors.text, '--tpl-accent': themeColors.accent, '--tpl-heading-font': headingFont } as React.CSSProperties}>
      <Component event={event} />
    </div>
  )
}
