'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  ChevronLeft, ChevronRight, Check, Sparkles,
  Palette, LayoutTemplate, User, Gift, Eye, PartyPopper,
} from 'lucide-react'
import {
  type Tier, type TierConfig, type Template,
  TEMPLATES, TIER_META, getDefaultConfig,
} from './wizard/tier-config-types'
import { ClassicForm } from './wizard/tier-forms/classic-form'
import { PremiumForm } from './wizard/tier-forms/premium-form'
import { LuxeForm } from './wizard/tier-forms/luxe-form'

type TierFilter = 'all' | Tier

const STEP_COUNT = 5
const STEP_TITLES = [
  'Choisissez votre modele',
  'Informations de base',
  'Details specifiques',
  'Apercu',
  'Confirmation',
]
const STEP_DESCRIPTIONS = [
  'Parcourez notre collection exclusive de modeles',
  'Les informations essentielles de votre evenement',
  'Personnalisez selon votre formule',
  'Verifiez votre invitation',
  'Votre invitation est prete !',
]
const STEP_ICONS = [LayoutTemplate, User, Gift, Eye, PartyPopper]

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
}

interface WizardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialTemplateId?: string | null
}

export function WizardModal({ open, onOpenChange, initialTemplateId }: WizardModalProps) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [createdSlug, setCreatedSlug] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialTemplateId && open) {
      const tpl = TEMPLATES.find((t) => t.id === initialTemplateId)
      if (tpl) {
        handleTemplateSelect(tpl)
        goNext()
      }
      setInitialTemplateId(null)
    }
  }, [initialTemplateId, open])

  const [partner1Name, setPartner1Name] = useState('')
  const [partner2Name, setPartner2Name] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [venueName, setVenueName] = useState('')
  const [venueAddress, setVenueAddress] = useState('')

  const [tier, setTier] = useState<Tier>('Classique')
  const [tierConfig, setTierConfig] = useState<TierConfig>(getDefaultConfig('Classique'))

  const currentTier = selectedTemplate?.tier || tier

  const filteredTemplates = useMemo(() => {
    if (tierFilter === 'all') return TEMPLATES
    return TEMPLATES.filter((t) => t.tier === tierFilter)
  }, [tierFilter])

  const handleTemplateSelect = useCallback((template: Template) => {
    setSelectedTemplate(template)
    setTier(template.tier)
    setTierConfig(getDefaultConfig(template.tier))
  }, [])

  const updateTierConfig = useCallback((update: Partial<TierConfig>) => {
    setTierConfig((prev) => ({ ...prev, ...update }))
  }, [])

  const goNext = () => { setDirection(1); setStep((s) => Math.min(s + 1, STEP_COUNT - 1)) }
  const goPrev = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 0)) }

  const handleSubmit = async () => {
    if (!selectedTemplate) return
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate.id, partner1Name, partner2Name, eventDate, venueName, venueAddress,
          tier: currentTier, tierConfig: JSON.stringify(tierConfig),
        }),
      })
      const data = await res.json()
      if (res.ok) { setCreatedSlug(data.slug); setSubmitted(true); goNext(); setError('') }
      else { setError(data.error || "Erreur lors de la creation. Reessayez.") }
    } catch { setError("Erreur de connexion. Verifiez votre internet.") } finally { setIsSubmitting(false) }
  }

  const shareWhatsApp = () => {
    const text = `Vous etes invites au mariage de ${partner1Name} & ${partner2Name} !\nhttps://daawa.tn/e/${createdSlug}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const resetWizard = () => {
    setStep(0); setSelectedTemplate(null); setSubmitted(false); setCreatedSlug('')
    setPartner1Name(''); setPartner2Name(''); setEventDate(''); setVenueName(''); setVenueAddress('')
    setTier('Classique'); setTierConfig(getDefaultConfig('Classique'))
  }

  const handleClose = (v: boolean) => { if (!v) resetWizard(); onOpenChange(v) }

  const canProceed = () => {
    if (step === 0) return !!selectedTemplate
    if (step === 1) return !!(partner1Name && partner2Name && eventDate && venueName && venueAddress)
    return true
  }

  const StepIcon = STEP_ICONS[step]
  const meta = TIER_META[currentTier]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent showCloseButton={step === 4} className="flex flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl h-[85vh] max-h-[700px] rounded-xl">
        <DialogTitle className="sr-only">Creation d invitation Daawa</DialogTitle>
        <DialogDescription className="sr-only">Assistant de creation d invitation de mariage</DialogDescription>

        {/* Header */}
        <div className="shrink-0 border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--daawa-burgundy)] to-[var(--daawa-burgundy)]/70">
                <StepIcon className="size-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold leading-none">{STEP_TITLES[step]}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{STEP_DESCRIPTIONS[step]}</p>
              </div>
            </div>
            {selectedTemplate && step >= 2 && (
              <Badge variant="outline" className={meta.badgeClass}>
                {meta.label} &middot; {meta.price}
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            {Array.from({ length: STEP_COUNT }).map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-[var(--daawa-burgundy)]' : 'bg-muted'}`} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: 'tween', duration: 0.3 }} className="h-full overflow-y-auto">
              <div className="p-6">
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {(['all', 'Classique', 'Premium', 'Luxe'] as TierFilter[]).map((f) => {
                        const isAll = f === 'all'
                        const label = isAll ? 'Tous' : TIER_META[f as Tier].label
                        return (
                          <button key={f} type="button" onClick={() => setTierFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${tierFilter === f ? 'bg-[var(--daawa-ink)] text-white border-[var(--daawa-ink)]' : 'border-border hover:border-foreground/20 text-muted-foreground'}`}>
                            {label}
                          </button>
                        )
                      })}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[calc(85vh-220px)] overflow-y-auto pr-1">
                      {filteredTemplates.map((template) => {
                        const tMeta = TIER_META[template.tier]
                        const isSelected = selectedTemplate?.id === template.id
                        return (
                          <button key={template.id} type="button" onClick={() => handleTemplateSelect(template)} className={`group relative flex flex-col rounded-xl border-2 overflow-hidden transition-all text-left ${isSelected ? 'border-[var(--daawa-burgundy)] ring-2 ring-[var(--daawa-burgundy)]/20' : 'border-border hover:border-foreground/20'}`}>
                            <div className={`aspect-[4/3] w-full flex items-center justify-center ${template.tier === 'Luxe' ? 'bg-gradient-to-br from-[var(--daawa-gold)]/20 to-[var(--daawa-burgundy)]/10' : template.tier === 'Premium' ? 'bg-gradient-to-br from-[var(--daawa-burgundy)]/10 to-[var(--daawa-cream)]/30' : 'bg-[var(--daawa-cream)]/20'}`}>
                              <Palette className={`size-8 ${template.tier === 'Luxe' ? 'text-[var(--daawa-gold)]/50' : template.tier === 'Premium' ? 'text-[var(--daawa-burgundy)]/30' : 'text-[var(--daawa-ink)]/20'}`} />
                            </div>
                            <div className="p-2.5 space-y-1">
                              <p className="text-xs font-medium truncate">{template.name}</p>
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] ${tMeta.color}`}>{tMeta.label}</span>
                                {isSelected && <Check className="size-3 text-[var(--daawa-burgundy)]" />}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6 max-w-md mx-auto">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="p1">Nom du premier partenaire</Label>
                        <Input id="p1" placeholder="Ex: Ahmed" value={partner1Name} onChange={(e) => setPartner1Name(e.target.value)} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="p2">Nom du deuxieme partenaire</Label>
                        <Input id="p2" placeholder="Ex: Fatima" value={partner2Name} onChange={(e) => setPartner2Name(e.target.value)} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date de l evenement</Label>
                        <Input id="date" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="venue">Nom du lieu</Label>
                        <Input id="venue" placeholder="Ex: Dar El Bey" value={venueName} onChange={(e) => setVenueName(e.target.value)} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse du lieu</Label>
                        <Input id="address" placeholder="Ex: Rue de la Kasbah, Tunis" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && selectedTemplate && (
                  <div className="max-h-[calc(85vh-260px)] overflow-y-auto pr-1">
                    {currentTier === 'Classique' && <ClassicForm config={tierConfig} onChange={updateTierConfig} />}
                    {currentTier === 'Premium' && <PremiumForm config={tierConfig} onChange={updateTierConfig} />}
                    {currentTier === 'Luxe' && <LuxeForm config={tierConfig} onChange={updateTierConfig} />}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 max-w-md mx-auto">
                    <div className="rounded-xl border border-[var(--daawa-cream)]/60 overflow-hidden">
                      <div className={`h-32 flex items-center justify-center ${currentTier === 'Luxe' ? 'bg-gradient-to-br from-[var(--daawa-gold)]/20 via-[var(--daawa-burgundy)]/10 to-[var(--daawa-cream)]/20' : currentTier === 'Premium' ? 'bg-gradient-to-br from-[var(--daawa-burgundy)]/15 to-[var(--daawa-cream)]/20' : 'bg-[var(--daawa-cream)]/30'}`}>
                        <div className="text-center">
                          <p className="text-lg font-light" style={{ fontFamily: 'serif' }}>{partner1Name} & {partner2Name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{eventDate}</p>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Modele</span><span className="font-medium">{selectedTemplate?.name}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Formule</span><span className={TIER_META[currentTier].color + ' font-medium'}>{TIER_META[currentTier].label}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Lieu</span><span className="font-medium text-right max-w-[60%] truncate">{venueName}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Adresse</span><span className="font-medium text-right max-w-[60%] truncate">{venueAddress}</span></div>
                        {(tierConfig as Record<string, string>).ceremonyTime && (
                          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Ceremonie</span><span className="font-medium">{(tierConfig as Record<string, string>).ceremonyTime}</span></div>
                        )}
                        {(tierConfig as Record<string, string>).receptionTime && (
                          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Reception</span><span className="font-medium">{(tierConfig as Record<string, string>).receptionTime}</span></div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && submitted && (
                  <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
                    <div className="size-16 rounded-full bg-green-100 flex items-center justify-center"><Check className="size-8 text-green-600" /></div>
                    <h3 className="text-xl font-semibold">Invitation creee !</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">Votre invitation pour {partner1Name} & {partner2Name} a ete generee avec succes.</p>
                    <div className="flex gap-3 mt-4 flex-wrap justify-center">
                      <Button onClick={shareWhatsApp} className="gap-2 bg-green-600 hover:bg-green-700">
                        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.798-6.382-2.147l-.446-.34-3.178 1.065 1.065-3.178-.34-.446A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                        Partager sur WhatsApp
                      </Button>
                      <a href={`/e/${createdSlug}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="gap-2">Voir l&apos;invitation<ArrowRight className="size-3.5" /></Button>
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Lien : daawa.tn/e/{createdSlug}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {step < 4 && (
          <div className="shrink-0 border-t border-border px-6 py-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={goPrev} disabled={step === 0} className="gap-1">
                <ChevronLeft className="size-4" />Precedent
              </Button>
              <span className="text-xs text-muted-foreground">{step + 1} / {STEP_COUNT}</span>
              {step === 3 ? (
                <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting} className="gap-1 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/90">
                  {isSubmitting ? <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles className="size-4" />}
                  Generer
                </Button>
              ) : (
                <Button onClick={goNext} disabled={!canProceed()} className="gap-1">Suivant<ChevronRight className="size-4" /></Button>
              )}
            </div>
            {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
