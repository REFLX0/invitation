'use client'

import { SharedFields } from './shared-fields'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Music, Palette, Globe } from 'lucide-react'
import type { PremiumTierConfig } from '../tier-config-types'

const WAX_SEAL_COLORS = [
  { name: 'Rouge', value: '#C41E3A' },
  { name: 'Dore', value: '#D4AF37' },
  { name: 'Bordeaux', value: '#722F37' },
  { name: 'Bleu marine', value: '#1B2A4A' },
  { name: 'Emeraude', value: '#046307' },
  { name: 'Noir', value: '#1A1A1A' },
]

const ENVELOPE_PATTERNS = [
  { value: 'damas', label: 'Damas' },
  { value: 'floral', label: 'Floral' },
  { value: 'geometric', label: 'Geometrique' },
  { value: 'plain', label: 'Uni' },
]

const MUSIC_STYLES = [
  { value: 'classical', label: 'Classique' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'acoustic', label: 'Acoustique' },
  { value: 'none', label: 'Aucune' },
]

const COLOR_ACCENTS = [
  { name: 'Bordeaux', value: '#722F37' },
  { name: 'Dore', value: '#D4AF37' },
  { name: 'Rose poudre', value: '#D4A0A0' },
  { name: 'Sauge', value: '#9CAF88' },
  { name: 'Bleu ciel', value: '#87CEEB' },
  { name: 'Lavande', value: '#B57EDC' },
]

interface PremiumFormProps {
  config: PremiumTierConfig
  onChange: (update: Partial<PremiumTierConfig>) => void
}

export function PremiumForm({ config, onChange }: PremiumFormProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-[var(--daawa-burgundy)]/20 bg-[var(--daawa-burgundy)]/5 p-4">
        <h3 className="text-sm font-semibold text-[var(--daawa-burgundy)]">
          Formule Premium
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Tout Classique inclus + interactions exclusives, musique, message personnalise
        </p>
      </div>

      <SharedFields config={config} onChange={onChange} />

      <div className="border-t border-[var(--daawa-cream)]/60" />

      {/* Scratch Card */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-[var(--daawa-burgundy)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
            Interaction exclusive
          </h3>
        </div>
        <div className="space-y-2">
          <Label htmlFor="scratchRevealMessage">Message de la carte a gratter</Label>
          <Input
            id="scratchRevealMessage"
            placeholder="Ex: Vous etes invite..."
            value={config.scratchRevealMessage}
            onChange={(e) => onChange({ scratchRevealMessage: e.target.value })}
            className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30"
          />
        </div>
      </section>

      {/* Wax Seal Color */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Label>Couleur du sceau de cire</Label>
          <div className="flex flex-wrap gap-3">
            {WAX_SEAL_COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange({ waxSealColor: c.value })}
                className={`group flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-all ${
                  config.waxSealColor === c.value
                    ? 'border-[var(--daawa-burgundy)] bg-[var(--daawa-burgundy)]/5'
                    : 'border-transparent hover:border-border'
                }`}
              >
                <div
                  className="size-8 rounded-full shadow-sm ring-2 ring-offset-2 ring-offset-background transition-all"
                  style={{
                    backgroundColor: c.value,
                    ringColor: config.waxSealColor === c.value ? c.value : 'transparent',
                  }}
                />
                <span className="text-[10px] text-muted-foreground">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Envelope Liner */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Label>Motif de la doublure d&#x27;enveloppe</Label>
          <Select
            value={config.envelopeLinerPattern}
            onValueChange={(v) => onChange({ envelopeLinerPattern: v })}
          >
            <SelectTrigger className="w-full border-[var(--daawa-cream)]/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ENVELOPE_PATTERNS.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Background Music */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Music className="size-4 text-[var(--daawa-burgundy)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
            Musique de fond
          </h3>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[var(--daawa-cream)]/60 p-3">
          <Label className="cursor-pointer">Activer la musique</Label>
          <Switch
            checked={config.backgroundMusicEnabled}
            onCheckedChange={(checked) => onChange({ backgroundMusicEnabled: checked, musicStyle: checked ? 'classical' : 'none' })}
          />
        </div>
        {config.backgroundMusicEnabled && (
          <div className="space-y-2 pl-2">
            <Label>Style musical</Label>
            <Select value={config.musicStyle} onValueChange={(v) => onChange({ musicStyle: v })}>
              <SelectTrigger className="w-full border-[var(--daawa-cream)]/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MUSIC_STYLES.filter((s) => s.value !== 'none').map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </section>

      {/* Guest Message */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="guestMessage">Message personnel aux invites</Label>
          <Textarea
            id="guestMessage"
            placeholder="Un mot du coeur pour vos proches..."
            value={config.guestPersonalMessage}
            onChange={(e) => onChange({ guestPersonalMessage: e.target.value })}
            className="min-h-[80px] resize-none border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30"
          />
        </div>
      </section>

      {/* Color Accent */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="size-4 text-[var(--daawa-burgundy)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
            Couleur d&#x27;accent personnalisee
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {COLOR_ACCENTS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange({ customColorAccent: c.value })}
              className={`group flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-all ${
                config.customColorAccent === c.value
                  ? 'border-[var(--daawa-burgundy)] bg-[var(--daawa-burgundy)]/5'
                  : 'border-transparent hover:border-border'
              }`}
            >
              <div
                className="size-8 rounded-full shadow-sm ring-2 ring-offset-2 ring-offset-background"
                style={{ backgroundColor: c.value }}
              />
              <span className="text-[10px] text-muted-foreground">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Language */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="size-4 text-[var(--daawa-burgundy)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
            Langue preferee
          </h3>
        </div>
        <RadioGroup
          value={config.preferredLanguage}
          onValueChange={(v) => onChange({ preferredLanguage: v as 'FR' | 'AR' | 'EN' })}
          className="flex gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="FR" id="lang-fr" />
            <Label htmlFor="lang-fr" className="cursor-pointer font-normal">Francais</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="AR" id="lang-ar" />
            <Label htmlFor="lang-ar" className="cursor-pointer font-normal">عربي</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="EN" id="lang-en" />
            <Label htmlFor="lang-en" className="cursor-pointer font-normal">English</Label>
          </div>
        </RadioGroup>
      </section>
    </div>
  )
}
