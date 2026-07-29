'use client'

import { useMemo } from 'react'
import { TEMPLATE_REGISTRY } from './template-registry'
import { ClassicElegance } from './base/classic-elegance'
import { PremiumGriffon } from './base/premium-griffon'
import { SpecializedNoirEtOr } from './specialized/noir-et-or'
import { SpecializedLellaBeya } from './specialized/lella-beya'
import { SpecializedCarthageOr } from './specialized/carthage-or'

export interface InvitationTemplateProps {
  event: {
    id: string
    slug: string
    templateId: string
    partner1Name: string
    partner2Name: string
    eventDate: string
    venueName: string
    venueAddress: string
    tier: string
    tierConfig: string
  }
}

// Component map — specialized templates get their own renderers, others fall back to tier base
const COMPONENT_MAP: Record<string, React.ComponentType<InvitationTemplateProps>> = {
  'specialized-noir-et-or': SpecializedNoirEtOr,
  'specialized-lella-beya': SpecializedLellaBeya,
  'specialized-carthage-or': SpecializedCarthageOr,
  'classic-elegance': ClassicElegance,
  'classic-fleur': ClassicElegance,
  'classic-aquarelle': ClassicElegance,
  'classic-parchemin': ClassicElegance,
  'classic-minimal': ClassicElegance,
  'premium-griffon': PremiumGriffon,
  'premium-jardin': PremiumGriffon,
  'premium-nuit': PremiumGriffon,
  'premium-mosaic': PremiumGriffon,
  'premium-soie': PremiumGriffon,
  'premium-sahara': PremiumGriffon,
  'premium-oasis': PremiumGriffon,
  'premium-medina': PremiumGriffon,
}

export function InvitationTemplate({ event }: InvitationTemplateProps) {
  const Component = useMemo(() => {
    const reg = TEMPLATE_REGISTRY.find((t) => t.id === event.templateId)
    const layoutKey = reg?.layoutComponent || 'classic-elegance'
    return COMPONENT_MAP[layoutKey] || ClassicElegance
  }, [event.templateId])

  return <Component event={event} />
}
