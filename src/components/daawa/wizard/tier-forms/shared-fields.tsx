'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Minus, Clock, MapPin, CalendarCheck, UtensilsCrossed, MessageSquare } from 'lucide-react'
import type { ClassicTierConfig, ScheduleItem } from '../tier-config-types'

interface SharedFieldsProps {
  config: ClassicTierConfig
  onChange: (update: Partial<ClassicTierConfig>) => void
}

export function SharedFields({ config, onChange }: SharedFieldsProps) {
  const addScheduleItem = () => {
    onChange({ scheduleItems: [...config.scheduleItems, { label: '', time: '' }] })
  }

  const removeScheduleItem = (index: number) => {
    onChange({ scheduleItems: config.scheduleItems.filter((_, i) => i !== index) })
  }

  const updateScheduleItem = (index: number, field: keyof ScheduleItem, value: string) => {
    const updated = config.scheduleItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    onChange({ scheduleItems: updated })
  }

  const addMealChoice = () => {
    onChange({ mealChoices: [...config.mealChoices, ''] })
  }

  const removeMealChoice = (index: number) => {
    onChange({ mealChoices: config.mealChoices.filter((_, i) => i !== index) })
  }

  const updateMealChoice = (index: number, value: string) => {
    const updated = config.mealChoices.map((item, i) => (i === index ? value : item))
    onChange({ mealChoices: updated })
  }

  return (
    <div className="space-y-8">
      {/* Ceremony & Reception Times */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-[var(--daawa-burgundy)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
            Horaires de la ceremonie
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ceremonyTime">Heure de la ceremonie</Label>
            <Input
              id="ceremonyTime"
              type="time"
              value={config.ceremonyTime}
              onChange={(e) => onChange({ ceremonyTime: e.target.value })}
              className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="receptionTime">Heure de la reception</Label>
            <Input
              id="receptionTime"
              type="time"
              value={config.receptionTime}
              onChange={(e) => onChange({ receptionTime: e.target.value })}
              className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30"
            />
          </div>
        </div>
      </section>

      {/* Schedule Items */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck className="size-4 text-[var(--daawa-burgundy)]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
              Programme de la soiree
            </h3>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addScheduleItem}
            className="h-8 gap-1 text-xs border-[var(--daawa-cream)] hover:bg-[var(--daawa-burgundy)]/5 hover:text-[var(--daawa-burgundy)]"
          >
            <Plus className="size-3" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
          {config.scheduleItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder="Ex: Cocktail"
                value={item.label}
                onChange={(e) => updateScheduleItem(index, 'label', e.target.value)}
                className="flex-1 h-9 text-sm border-[var(--daawa-cream)]/80"
              />
              <Input
                type="time"
                value={item.time}
                onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
                className="w-32 h-9 text-sm border-[var(--daawa-cream)]/80"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeScheduleItem(index)}
                disabled={config.scheduleItems.length <= 1}
                className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
              >
                <Minus className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Venue Directions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-[var(--daawa-burgundy)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
            Itineraire & Localisation
          </h3>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="venueGps">Coordonnees GPS (optionnel)</Label>
            <Input
              id="venueGps"
              placeholder="Ex: 36.8065, 10.1815"
              value={config.venueGps}
              onChange={(e) => onChange({ venueGps: e.target.value })}
              className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="directionsNote">Note d'itineraire</Label>
            <Textarea
              id="directionsNote"
              placeholder="Ex: Prendre la sortie 12, puis continuer sur 2 km..."
              value={config.directionsNote}
              onChange={(e) => onChange({ directionsNote: e.target.value })}
              className="min-h-[80px] resize-none border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30"
            />
          </div>
        </div>
      </section>

      {/* RSVP Settings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <CalendarCheck className="size-4 text-[var(--daawa-burgundy)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
            Parametres RSVP
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rsvpDeadline">Date limite de reponse</Label>
            <Input
              id="rsvpDeadline"
              type="date"
              value={config.rsvpDeadline}
              onChange={(e) => onChange({ rsvpDeadline: e.target.value })}
              className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxGuests">Nombre maximal d'invites</Label>
            <Input
              id="maxGuests"
              type="number"
              placeholder="Ex: 200"
              value={config.maxGuests}
              onChange={(e) => onChange({ maxGuests: e.target.value })}
              className="border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30"
            />
          </div>
        </div>
      </section>

      {/* Meal Choices */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="size-4 text-[var(--daawa-burgundy)]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
              Choix de repas
            </h3>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addMealChoice}
            className="h-8 gap-1 text-xs border-[var(--daawa-cream)] hover:bg-[var(--daawa-burgundy)]/5 hover:text-[var(--daawa-burgundy)]"
          >
            <Plus className="size-3" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {config.mealChoices.map((choice, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder={`Choix ${index + 1} (ex: Viande, Poisson...)`}
                value={choice}
                onChange={(e) => updateMealChoice(index, e.target.value)}
                className="flex-1 h-9 text-sm border-[var(--daawa-cream)]/80"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeMealChoice(index)}
                disabled={config.mealChoices.length <= 1}
                className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
              >
                <Minus className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Message */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-[var(--daawa-burgundy)]" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--daawa-ink)]">
            Message personnalise
          </h3>
        </div>
        <div className="space-y-2">
          <Label htmlFor="customMessage">Message d'invitation (optionnel)</Label>
          <Textarea
            id="customMessage"
            placeholder="Un message personnel pour vos invites..."
            value={config.customMessage}
            onChange={(e) => onChange({ customMessage: e.target.value })}
            className="min-h-[100px] resize-none border-[var(--daawa-cream)]/80 focus-visible:ring-[var(--daawa-burgundy)]/30"
          />
        </div>
      </section>
    </div>
  )
}
