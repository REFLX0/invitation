'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { WizardModal } from '@/components/daawa/wizard-modal'
import { Button } from '@/components/ui/button'
import { Sparkles, Heart, Star, Crown, Palette, Share2, Clock, MessageCircle } from 'lucide-react'

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

      {/* How it Works */}
      <section className="px-4 py-20 bg-background/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-2" style={{ fontFamily: 'serif' }}>Comment ca marche</h2>
          <p className="text-center text-sm text-muted-foreground mb-12">Trois etapes pour votre invitation parfaite</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Palette, step: '01', title: 'Choisissez votre modele', desc: 'Parcourez notre collection de 16 modeles exclusifs tunisiens, classes par formule : Classique, Premium ou Luxe.' },
              { icon: MessageCircle, step: '02', title: 'Personnalisez les details', desc: 'Ajoutez vos noms, date, lieu, et personnalisez selon votre formule : musique, monogrammes, photos, code vestimentaire.' },
              { icon: Share2, step: '03', title: 'Partagez avec vos invites', desc: 'Recevez un lien unique et partagez-le sur WhatsApp, Messenger ou par email. Suivez les RSVP en temps reel.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-center space-y-4"
                >
                  <div className="inline-flex items-center justify-center size-14 rounded-full border border-[var(--daawa-burgundy)]/15 bg-[var(--daawa-burgundy)]/5">
                    <Icon className="size-6 text-[var(--daawa-burgundy)]" />
                  </div>
                  <span className="text-xs font-medium text-[var(--daawa-burgundy)]/50">{item.step}</span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-2" style={{ fontFamily: 'serif' }}>Ce que disent nos couples</h2>
          <p className="text-center text-sm text-muted-foreground mb-12">Des invitations qui font la difference</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { names: 'Yasmine & Karim', text: 'Nos invites etaient ravis ! Le modele Lella Beya correspondait parfaitement a notre theme. La personnalisation etait incroyablement facile.', tier: 'Luxe' },
              { names: 'Amira & Nizar', text: 'On a choisi la formule Premium et le resultat etait magnifique. Le RSVP en ligne nous a fait gagner enormement de temps.', tier: 'Premium' },
              { names: 'Rania & Fares', text: 'Simple, elegant et abordable. On a recu notre invitation en quelques minutes et nos invites l\'ont adoree.', tier: 'Classique' },
            ].map((t) => (
              <motion.div
                key={t.names}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-border p-6 space-y-4"
              >
                <p className="text-sm text-muted-foreground italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{t.names}</p>
                  <span className="text-[10px] text-[var(--daawa-burgundy)]/50 border border-[var(--daawa-burgundy)]/20 rounded-full px-2 py-0.5">{t.tier}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 bg-background/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-2" style={{ fontFamily: 'serif' }}>Questions frequentes</h2>
          <p className="text-center text-sm text-muted-foreground mb-12">Tout ce que vous devez savoir</p>
          <div className="space-y-4">
            {[
              { q: 'Combien de temps faut-il pour creer une invitation ?', a: 'Moins de 5 minutes. Choisissez votre modele, remplissez vos informations, et votre invitation est prete a partager immediatement.' },
              { q: 'Puis-je modifier mon invitation apres creation ?', a: 'Oui ! Avec les formules Premium et Luxe, vous pouvez modifier les details, ajouter des photos et ajuster le design autant que necessaire.' },
              { q: 'Comment mes invites confirment leur presence ?', a: 'Chaque invitation inclut un formulaire RSVP integre. Vos invites confirment en un clic et vous recevez les reponses en temps reel.' },
              { q: 'Quels modes de paiement acceptez-vous ?', a: 'Nous acceptons les paiements par carte bancaire, D17 et virement bancaire. Le paiement est securise et se fait en une seule etape.' },
            ].map((faq) => (
              <details key={faq.q} className="group rounded-lg border border-border">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium">
                  {faq.q}
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform text-xs">&#9662;</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

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
