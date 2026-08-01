'use client'

import { SharedFields } from './shared-fields'
import type { ClassicTierConfig } from '../tier-config-types'

interface ClassicFormProps {
  config: ClassicTierConfig
  onChange: (update: Partial<ClassicTierConfig>) => void
}

export function ClassicForm({ config, onChange }: ClassicFormProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[var(--daawa-cream)]/60 bg-[var(--daawa-cream)]/10 p-4">
        <h3 className="text-sm font-semibold text-[var(--daawa-ink)]/70">
          Formule Classique
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Horaires, programme, itineraire, RSVP et choix de repas
        </p>
      </div>
      <SharedFields config={config} onChange={onChange} />
    </div>
  )
}
