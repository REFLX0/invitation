'use client'

import { PremiumForm } from './premium-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Crown, Shirt, Image, Wand2, PenTool, PartyPopper, Star } from 'lucide-react'
import type { LuxeTierConfig } from '../tier-config-types'

const MONOGRAM_STYLES = [
  { value: 'classic-circle', label: 'Cercle classique' },
  { value: 'interlocking', label: 'Entrelace' },
  { value: 'modern-line', label: 'Ligne moderne' },
  { value: 'arabesque', label: 'Arabesque' },
]

const COLOR_PALETTES = [
  { value: 'dore-noir', label: 'Dore & Noir' },
  { value: 'ivoire-bleu', label: 'Ivoire & Bleu' },
  { value: 'blush-champagne', label: 'Blush & Champagne' },
]

const ANIMATION_STYLES = [
  { value: 'fade-in', label: 'Fondu' },
  { value: 'slide-up', label: 'Glissement vertical' },
  { value: 'parallax', label: 'Parallaxe' },
  { value: 'cinematic', label: 'Cinematique' },
]

const CALIGRAPHY_FONTS = [
  { value: 'great-vibes', label: 'Great Vibes' },
  { value: 'dancing-script', label: 'Dancing Script' },
  { value: 'cinzel', label: 'Cinzel' },
  { value: 'amiri', label: 'Amiri' },
]

const SWATCH_PRESETS = ['#D4AF37', '#1A1A1A', '#F5F0EB', '#722F37', '#D4A0A0', '#87CEEB', '#9CAF88', '#B57EDC']

interface LuxeFormProps {
  config: LuxeTierConfig
  onChange: (update: Partial<LuxeTierConfig>) => void
}

export function LuxeForm({ config, onChange }: LuxeFormProps) {
  const updateSwatch = (index: number, value: string) => {
    const updated = [...config.customColorSwatches]
    updated[index] = value
    onChange({ customColorSwatches: updated })
  }

  const updateGalleryUrl = (index: number, value: string) => {
    const updated = [...config.galleryPhotoUrls]
    updated[index] = value
    onChange({ galleryPhotoUrls: updated })
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-[var(--daawa-gold)]/30 bg-[var(--daawa-gold)]/5 p-4">
        <h3 className="text-sm font-semibold text-[var(--daawa-gold)]">Formule Luxe</h3>
        <p className="text-xs text-muted-foreground mt-1">Tout Premium inclus + monogrammes, dress code, photos, animations personnalisees</p>
      </div>

      <PremiumForm config={config} onChange={onChange} />

      <div className="border-t border-[var(--daawa-cream)]/60" />

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Crown className="size-4 text-[var(--daawa-gold)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">Monogramme</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monogramInitials">Initiales (2-4 caracteres)</Label>
            <Input id="monogramInitials" placeholder="Ex: A&B" maxLength={4} value={config.monogramInitials} onChange={(e) => onChange({ monogramInitials: e.target.value })} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-gold)]/30" />
          </div>
          <div className="space-y-2">
            <Label>Style du monogramme</Label>
            <Select value={config.monogramStyle} onValueChange={(v) => onChange({ monogramStyle: v })}>
              <SelectTrigger className="border-[var(--daawa-cream)]/80"><SelectValue /></SelectTrigger>
              <SelectContent>{MONOGRAM_STYLES.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}</SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Shirt className="size-4 text-[var(--daawa-gold)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">Code vestimentaire</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dressCodeText">Dress code</Label>
            <Input id="dressCodeText" placeholder="Ex: Black Tie, Tenue de soiree..." value={config.dressCodeText} onChange={(e) => onChange({ dressCodeText: e.target.value })} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-gold)]/30" />
          </div>
          <div className="space-y-2">
            <Label>Palette de couleurs</Label>
            <Select value={config.colorPaletteName} onValueChange={(v) => onChange({ colorPaletteName: v })}>
              <SelectTrigger className="w-full border-[var(--daawa-cream)]/80"><SelectValue /></SelectTrigger>
              <SelectContent>{COLOR_PALETTES.map((p) => (<SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Swatches de couleurs personnalisees</Label>
            <div className="flex flex-wrap gap-3">
              {config.customColorSwatches.map((color, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <input type="color" value={color || SWATCH_PRESETS[index % SWATCH_PRESETS.length]} onChange={(e) => updateSwatch(index, e.target.value)} className="size-10 rounded-md border border-[var(--daawa-cream)] cursor-pointer" />
                  <span className="text-[10px] text-muted-foreground">Couleur {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Image className="size-4 text-[var(--daawa-gold)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">Photos</h3>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="heroPhotoUrl">Photo hero (banniere)</Label>
            <Input id="heroPhotoUrl" placeholder="https://..." value={config.heroPhotoUrl} onChange={(e) => onChange({ heroPhotoUrl: e.target.value })} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-gold)]/30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="couplePhotoUrl">Photo du couple</Label>
            <Input id="couplePhotoUrl" placeholder="https://..." value={config.couplePhotoUrl} onChange={(e) => onChange({ couplePhotoUrl: e.target.value })} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-gold)]/30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="venuePhotoUrl">Photo du lieu</Label>
            <Input id="venuePhotoUrl" placeholder="https://..." value={config.venuePhotoUrl} onChange={(e) => onChange({ venuePhotoUrl: e.target.value })} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-gold)]/30" />
          </div>
          <div className="space-y-2">
            <Label>Photos de galerie (jusqu'a 4)</Label>
            {config.galleryPhotoUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input placeholder={`Photo galerie ${index + 1}`} value={url} onChange={(e) => updateGalleryUrl(index, e.target.value)} className="flex-1 h-9 text-sm border-[var(--daawa-cream)]/80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Wand2 className="size-4 text-[var(--daawa-gold)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">Animations</h3>
        </div>
        <div className="space-y-2">
          <Label>Style d'animation</Label>
          <Select value={config.customAnimationStyle} onValueChange={(v) => onChange({ customAnimationStyle: v })}>
            <SelectTrigger className="w-full border-[var(--daawa-cream)]/80"><SelectValue /></SelectTrigger>
            <SelectContent>{ANIMATION_STYLES.map((s) => (<SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>))}</SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <PenTool className="size-4 text-[var(--daawa-gold)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">Typographie</h3>
        </div>
        <div className="space-y-2">
          <Label>Police calligraphique</Label>
          <Select value={config.preferredCalligraphyFont} onValueChange={(v) => onChange({ preferredCalligraphyFont: v })}>
            <SelectTrigger className="w-full border-[var(--daawa-cream)]/80"><SelectValue /></SelectTrigger>
            <SelectContent>{CALIGRAPHY_FONTS.map((f) => (<SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>))}</SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customFooterText">Texte de pied de page personnalise</Label>
          <Input id="customFooterText" placeholder="Ex: Avec l'amour de nos familles" value={config.customFooterText} onChange={(e) => onChange({ customFooterText: e.target.value })} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-gold)]/30" />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-[var(--daawa-cream)]/60 p-3">
          <div className="space-y-0.5">
            <Label className="cursor-pointer">Calligraphie arabe</Label>
            <p className="text-xs text-muted-foreground">Activer les textes en calligraphie arabe</p>
          </div>
          <Switch checked={config.arabicCalligraphyEnabled} onCheckedChange={(checked) => onChange({ arabicCalligraphyEnabled: checked })} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-[var(--daawa-cream)]/60 p-3">
          <div className="flex items-center gap-2">
            <Star className="size-4 text-[var(--daawa-gold)]" />
            <div className="space-y-0.5">
              <Label className="cursor-pointer">Liste d'invites VIP</Label>
              <p className="text-xs text-muted-foreground">Activer la gestion des invites VIP</p>
            </div>
          </div>
          <Switch checked={config.vipGuestListEnabled} onCheckedChange={(checked) => onChange({ vipGuestListEnabled: checked })} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <PartyPopper className="size-4 text-[var(--daawa-gold)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">After-party (optionnel)</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="afterPartyVenue">Lieu de l'after-party</Label>
            <Input id="afterPartyVenue" placeholder="Ex: Lounge XYZ" value={config.afterPartyVenue} onChange={(e) => onChange({ afterPartyVenue: e.target.value })} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-gold)]/30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="afterPartyTime">Heure</Label>
            <Input id="afterPartyTime" type="time" value={config.afterPartyTime} onChange={(e) => onChange({ afterPartyTime: e.target.value })} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-gold)]/30" />
          </div>
        </div>
      </section>
    </div>
  )
}
