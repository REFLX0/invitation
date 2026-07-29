'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { WizardModal } from '@/components/daawa/wizard-modal'
import { Button } from '@/components/ui/button'
import { Sparkles, Heart, Star, Crown } from 'lucide-react'

export default function Home() {
  const [wizardOpen, setWizardOpen] = useState(false)

  const tiers = [
    { name: 'Classique', price: '89', icon: Heart, color: 'text-[var(--daawa-ink)]/60', border: 'border-[var(--daawa-ink)]/10', popular: false, features: ['5 designs elegants', "Video d'ouverture", 'RSVP & compte a rebours', 'Mises a jour illimitees'] },
    { name: 'Premium', price: '149', icon: Star, color: 'text-[var(--daawa-burgundy)]', border: 'border-[var(--daawa-burgundy)]/20', popular: true, features: ['8 designs immersifs', 'Interactions exclusives', 'Musique de fond', '3 tours de revision'] },
    { name: 'Luxe', price: '289', icon: Crown, color: 'text-[var(--daawa-gold)]', border: 'border-[var(--daawa-gold)]/30', popular: false, features: ['Traitement luxe complet', 'Monogrammes personnalises', 'AI photo backgrounds', 'Swatches dress code'] },
  ] as const

  return (
    <div className="min-h-screen flex flex-col bg-[var(--daawa-cream)]/30">
      {/* Header */}
      <header className="border-b border-[var(--daawa-cream)]/60 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="size-5 text-[var(--daawa-burgundy)]" />
            <span className="text-lg font-semibold" style={{ fontFamily: 'serif' }}>Daawa</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">Invitations de mariage</span>
          </div>
          <Button onClick={() => setWizardOpen(true)} className="gap-2 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/90">
            <Sparkles className="size-4" />Creer mon invitation
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--daawa-gold)]/30 bg-[var(--daawa-gold)]/5 px-4 py-1.5">
              <Star className="size-3.5 text-[var(--daawa-gold)]" />
              <span className="text-xs font-medium text-[var(--daawa-gold)]">Plateforme tunisienne N.1</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'serif' }}>
              Vos invitations de mariage,{' '}
              <span className="text-[var(--daawa-burgundy)]">simplement magnifiques</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Creez des invitations digitales uniques avec nos modeles tunisiens.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button size="lg" onClick={() => setWizardOpen(true)} className="gap-2 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/90 text-base px-8">
                <Sparkles className="size-5" />Commencer
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Pricing */}
        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-2" style={{ fontFamily: 'serif' }}>Nos formules</h2>
            <p className="text-center text-sm text-muted-foreground mb-10">Choisissez la formule qui vous correspond</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((tier) => {
                const Icon = tier.icon
                const ringClass = tier.popular ? 'ring-2 ring-[var(--daawa-burgundy)]/20' : ''
                const btnClass = tier.popular ? 'bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/90' : ''
                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={`relative rounded-xl border ${tier.border} bg-background p-6 flex flex-col ${ringClass}`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--daawa-burgundy)] text-white text-[10px] font-semibold px-3 py-0.5 rounded-full">
                        Populaire
                      </div>
                    )}
                    <Icon className={`size-6 ${tier.color} mb-3`} />
                    <h3 className={`text-lg font-semibold ${tier.color}`}>{tier.name}</h3>
                    <div className="mt-1 mb-4">
                      <span className="text-3xl font-bold">{tier.price}</span>
                      <span className="text-sm text-muted-foreground"> DT</span>
                    </div>
                    <ul className="space-y-2.5 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 rounded-full bg-[var(--daawa-burgundy)]/40 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => setWizardOpen(true)}
                      variant={tier.popular ? 'default' : 'outline'}
                      className={`mt-6 w-full ${btnClass}`}
                    >
                      Choisir
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart className="size-3.5 text-[var(--daawa-burgundy)]" />
            <span>Daawa — Invitations de mariage tunisiennes</span>
          </div>
          <p className="text-xs text-muted-foreground">2025 Daawa. Tous droits reserves.</p>
        </div>
      </footer>

      <WizardModal open={wizardOpen} onOpenChange={setWizardOpen} />
    </div>
  )
}
