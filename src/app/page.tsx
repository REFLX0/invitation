'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { WizardModal } from '@/components/daawa/wizard-modal'
import { Button } from '@/components/ui/button'
import {
  Sparkles, Heart, Star, Crown, Palette, Share2,
  MessageCircle, ChevronDown, Check, ArrowRight, Play,
  Gem, Music, Camera, PenTool,
} from 'lucide-react'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger} className={className}>
      <motion.div variants={fadeUp} transition={{ delay }}>{children}</motion.div>
    </motion.div>
  )
}

function Divider({ className = '' }: { className?: string }) {
  return (
    <div className={`daawa-divider ${className}`}>
      <span className="text-[10px]">&#9830;</span>
    </div>
  )
}

const TIER_DATA = [
  {
    name: 'Classique',
    price: '89',
    icon: Heart,
    color: 'text-[var(--daawa-ink)]',
    border: 'border-[var(--daawa-ink)]/10',
    bg: 'bg-white/60',
    popular: false,
    features: [
      "5 designs elegants",
      "Video d'ouverture animee",
      "RSVP & compte a rebours",
      "Mises a jour illimitees",
    ],
  },
  {
    name: 'Premium',
    price: '149',
    icon: Star,
    color: 'text-[var(--daawa-burgundy)]',
    border: 'border-[var(--daawa-burgundy)]/20',
    bg: 'bg-white/80',
    popular: true,
    features: [
      "8 designs immersifs",
      "Interactions exclusives",
      "Musique de fond personnalisee",
      "3 tours de revision gratuits",
      "Grattage-cadeau interactif",
    ],
  },
  {
    name: 'Luxe',
    price: '289',
    icon: Crown,
    color: 'text-[var(--daawa-gold)]',
    border: 'border-[var(--daawa-gold)]/25',
    bg: 'bg-gradient-to-b from-[var(--daawa-gold)]/5 to-white/40',
    popular: false,
    features: [
      "Traitement luxe complet",
      "Monogrammes personnalises",
      "AI photo backgrounds",
      "Swatches code vestimentaire",
      "Galerie photo couple",
      "Support prioritaire",
    ],
  },
]

const FEATURES_DATA = [
  { icon: Palette, title: '16 Modeles exclusifs', desc: 'Designs tunisiens soignes : Art Deco, Ottoman, Carthaginois et plus encore.', color: 'bg-[var(--daawa-burgundy)]/8 text-[var(--daawa-burgundy)]', borderColor: 'border-[var(--daawa-burgundy)]/15' },
  { icon: Music, title: 'Musique personnalisee', desc: 'Ajoutez une ambiance musicale a votre invitation avec nos styles selectionnes.', color: 'bg-[var(--daawa-gold)]/8 text-[var(--daawa-gold)]', borderColor: 'border-[var(--daawa-gold)]/15' },
  { icon: Camera, title: 'Photos & galerie', desc: 'Integrez vos plus beaux souvenirs dans une galerie elegante et interactive.', color: 'bg-[var(--daawa-rose)]/8 text-[var(--daawa-rose)]', borderColor: 'border-[var(--daawa-rose)]/15' },
  { icon: PenTool, title: 'Monogrammes sur mesure', desc: 'Creez vos initiales entrelacees en 3 styles : Classique, Royal et Arabesque.', color: 'bg-[var(--daawa-sage)]/8 text-[var(--daawa-sage)]', borderColor: 'border-[var(--daawa-sage)]/15' },
]

const HOW_IT_WORKS = [
  { icon: Palette, step: '01', title: 'Choisissez votre modele', desc: 'Parcourez notre collection de 16 modeles exclusifs tunisiens, classes par formule : Classique, Premium ou Luxe.', color: 'from-[var(--daawa-burgundy)]/10 to-transparent' },
  { icon: MessageCircle, step: '02', title: 'Personnalisez les details', desc: 'Ajoutez vos noms, date, lieu, et personnalisez selon votre formule : musique, monogrammes, photos, code vestimentaire.', color: 'from-[var(--daawa-gold)]/10 to-transparent' },
  { icon: Share2, step: '03', title: 'Partagez avec vos invites', desc: 'Recevez un lien unique et partagez-le sur WhatsApp, Messenger ou par email. Suivez les RSVP en temps reel.', color: 'from-[var(--daawa-rose)]/10 to-transparent' },
]

const TESTIMONIALS = [
  { names: 'Yasmine & Karim', text: 'Nos invites etaient ravis ! Le modele Lella Beya correspondait parfaitement a notre theme Ottoman. La personnalisation etait incroyablement facile et le resultat depassait nos attentes.', tier: 'Luxe', initials: 'YK', color: 'bg-[var(--daawa-gold)]/10 border-[var(--daawa-gold)]/20' },
  { names: 'Amira & Nizar', text: "On a choisi la formule Premium et le resultat etait magnifique. Le RSVP en ligne nous a fait gagner enormement de temps. Toute notre famille etait impressionnee !", tier: 'Premium', initials: 'AN', color: 'bg-[var(--daawa-burgundy)]/10 border-[var(--daawa-burgundy)]/20' },
  { names: 'Rania & Fares', text: "Simple, elegant et abordable. On a recu notre invitation en quelques minutes et nos invites l'ont adoree. Le meilleur rapport qualite-prix pour un mariage tunisien.", tier: 'Classique', initials: 'RF', color: 'bg-[var(--daawa-rose)]/10 border-[var(--daawa-rose)]/20' },
]

const FAQ_DATA = [
  { q: 'Combien de temps faut-il pour creer une invitation ?', a: "Moins de 5 minutes. Choisissez votre modele, remplissez vos informations, et votre invitation est prete a partager immediatement avec un lien unique." },
  { q: "Puis-je modifier mon invitation apres creation ?", a: "Absolument ! Avec les formules Premium et Luxe, vous pouvez modifier les details, ajouter des photos, ajuster le design et mettre a jour votre invitation autant que necessaire." },
  { q: 'Comment mes invites confirment leur presence ?', a: "Chaque invitation inclut un formulaire RSVP integre. Vos invites confirment en un clic depuis leur telephone et vous recevez les reponses en temps reel." },
  { q: 'Quels modes de paiement acceptez-vous ?', a: "Nous acceptons les paiements par carte bancaire, D17 et virement bancaire. Le paiement est securise et se fait en une seule etape." },
]

function HomeContent() {
  const searchParams = useSearchParams()
  const [wizardOpen, setWizardOpen] = useState(false)
  const [initialTemplateId, setInitialTemplateId] = useState<string | null>(null)

  useEffect(() => {
    const w = searchParams.get('wizard')
    const t = searchParams.get('template')
    if (w === 'true') {
      if (t) setInitialTemplateId(t)
      setWizardOpen(true)
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ─────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-[var(--daawa-cream)] bg-background/70 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="size-5 text-[var(--daawa-burgundy)] fill-[var(--daawa-burgundy)]/20" />
            <span className="text-xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Daawa</span>
            <span className="hidden sm:inline text-xs text-muted-foreground ml-1 tracking-wide uppercase">Invitations de mariage</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-foreground text-sm" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Tarifs</Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-foreground text-sm" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>Comment ca marche</Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-foreground text-sm" onClick={() => window.location.href = '/catalogue'}>Catalogue</Button>
            <Button onClick={() => setWizardOpen(true)} size="sm" className="gap-2 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white shadow-md shadow-[var(--daawa-burgundy)]/20">
              <Sparkles className="size-3.5" />
              <span className="hidden sm:inline">Creer mon invitation</span>
              <span className="sm:hidden">Creer</span>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--daawa-burgundy)]/[0.03] blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--daawa-gold)]/[0.04] blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--daawa-rose)]/[0.02] blur-3xl" />
        </div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-3xl text-center space-y-8">
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--daawa-gold)]/30 bg-[var(--daawa-gold)]/8 px-4 py-1.5 shadow-sm">
              <Gem className="size-3.5 text-[var(--daawa-gold)]" />
              <span className="text-xs font-medium text-[var(--daawa-gold)] tracking-wide">Plateforme tunisienne N.1</span>
            </div>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Vos invitations de mariage,{' '}
            <span className="relative inline-block">
              <span className="text-[var(--daawa-burgundy)]">simplement magnifiques</span>
              <motion.span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--daawa-burgundy)]/40 to-transparent rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }} />
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Creez des invitations digitales uniques avec nos modeles tunisiens. Partagez le bonheur avec style.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button size="lg" onClick={() => setWizardOpen(true)} className="gap-2.5 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white text-base px-8 py-6 rounded-xl shadow-lg shadow-[var(--daawa-burgundy)]/25 transition-all hover:shadow-xl hover:shadow-[var(--daawa-burgundy)]/35 hover:-translate-y-0.5">
              <Sparkles className="size-5" />Commencer gratuitement<ArrowRight className="size-4 opacity-60" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="gap-2 text-base px-8 py-6 rounded-xl border-border/60 bg-white/40 backdrop-blur-sm hover:bg-white/60">
              <Play className="size-4 opacity-60" />Decouvrir
            </Button>
          </motion.div>
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-60">
            <div className="flex -space-x-2">
              {['bg-[var(--daawa-burgundy)]', 'bg-[var(--daawa-gold)]', 'bg-[var(--daawa-rose)]', 'bg-[var(--daawa-sage)]'].map((bg, i) => (
                <div key={i} className={"size-7 rounded-full border-2 border-white/80 flex items-center justify-center ".concat(bg)}>
                  <span className="text-[8px] text-white font-medium">{['Y', 'K', 'A', 'N'][i]}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Plus de <span className="font-semibold text-foreground">500+</span> couples ont cree leur invitation avec Daawa</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Trusted by ────────────────────────────── */}
      <section className="px-4 py-8 border-y border-border/40 bg-background/40">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center">
            <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-6">Fait avec amour pour les couples tunisiens</p>
            <div className="flex items-center justify-center gap-8 sm:gap-12 opacity-40">
              {['Tunis', 'Sfax', 'Sousse', 'Nabeul', 'Monastir'].map((city) => (
                <span key={city} className="text-sm font-medium tracking-wide" style={{ fontFamily: 'var(--font-cormorant)' }}>{city}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Features ──────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Tout ce qu&apos;il vous faut, <span className="text-[var(--daawa-burgundy)]">en un seul endroit</span></h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Des modeles soignes aux interactions uniques, chaque detail est pense pour votre jour special.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES_DATA.map((feat, i) => {
              const Icon = feat.icon
              return (
                <AnimatedSection key={feat.title} delay={i * 0.1}>
                  <div className={"relative rounded-2xl border p-6 space-y-4 hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300 hover:-translate-y-1 ".concat(feat.borderColor, " bg-white/60 backdrop-blur-sm")}>
                    <div className={"inline-flex items-center justify-center size-12 rounded-xl ".concat(feat.color)}><Icon className="size-5" /></div>
                    <h3 className="text-base font-semibold">{feat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────── */}
      <section id="pricing" className="px-4 py-20 sm:py-28 bg-gradient-to-b from-transparent via-[var(--daawa-cream)]/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Nos formules</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Choisissez la formule qui correspond a votre vision. Toutes incluent le RSVP en ligne.</p>
            <Divider className="mt-6" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {TIER_DATA.map((tier, i) => {
              const Icon = tier.icon
              const isPopular = tier.popular
              return (
                <AnimatedSection key={tier.name} delay={i * 0.15}>
                  <div className={"relative rounded-2xl border p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.04] hover:-translate-y-1 ".concat(tier.border, " ", tier.bg, " backdrop-blur-sm", isPopular ? " ring-2 ring-[var(--daawa-burgundy)]/20 shadow-lg shadow-[var(--daawa-burgundy)]/[0.06] scale-[1.02]" : "")}>
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--daawa-burgundy)] text-white text-[10px] font-semibold px-4 py-1 rounded-full shadow-md shadow-[var(--daawa-burgundy)]/30 tracking-wide uppercase">Le plus populaire</div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={"size-10 rounded-xl flex items-center justify-center ".concat(isPopular ? "bg-[var(--daawa-burgundy)]/10" : "bg-muted/50")}>
                        <Icon className={"size-5 ".concat(tier.color)} />
                      </div>
                      <div>
                        <h3 className={"text-lg font-semibold ".concat(tier.color)} style={{ fontFamily: 'var(--font-cormorant)' }}>{tier.name}</h3>
                        <p className="text-[11px] text-muted-foreground">{tier.name === 'Classique' ? 'Elegant & simple' : tier.name === 'Premium' ? 'Immersif & unique' : 'Prestigieux & sur mesure'}</p>
                      </div>
                    </div>
                    <div className="mb-6 pb-6 border-b border-border/50">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                        <span className="text-sm text-muted-foreground font-medium">DT</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">Paiement unique, utilisation illimitee</p>
                    </div>
                    <ul className="space-y-3 flex-1 mb-6">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <div className="mt-1 size-4 rounded-full bg-[var(--daawa-burgundy)]/10 flex items-center justify-center shrink-0">
                            <Check className="size-2.5 text-[var(--daawa-burgundy)]" />
                          </div>
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button onClick={() => setWizardOpen(true)} variant={isPopular ? 'default' : 'outline'} className={"w-full py-5.5 rounded-xl transition-all duration-200 ".concat(isPopular ? "bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white shadow-md shadow-[var(--daawa-burgundy)]/20 hover:shadow-lg shadow-[var(--daawa-burgundy)]/30" : "hover:bg-muted/50")}>
                      Choisir {tier.name}
                    </Button>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it Works ─────────────────────────── */}
      <section id="how-it-works" className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Comment ca marche</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Trois etapes simples pour votre invitation parfaite</p>
            <Divider className="mt-6" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {HOW_IT_WORKS.map((item, i) => {
              const Icon = item.icon
              return (
                <AnimatedSection key={item.step} delay={i * 0.15}>
                  <div className="relative text-center space-y-5">
                    <div className="relative mx-auto">
                      <div className={"inline-flex items-center justify-center size-20 rounded-2xl border border-border/50 bg-gradient-to-br ".concat(item.color)}>
                        <Icon className="size-8 text-[var(--daawa-burgundy)]" />
                      </div>
                      <div className="absolute -top-2 -right-2 size-7 rounded-lg bg-[var(--daawa-burgundy)] flex items-center justify-center shadow-md shadow-[var(--daawa-burgundy)]/30">
                        <span className="text-[10px] text-white font-bold">{item.step}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-cormorant)' }}>{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                    {i < 2 && (
                      <div className="hidden md:block absolute top-10 -right-6 lg:-right-8 w-12 lg:w-16">
                        <div className="h-px w-full bg-gradient-to-r from-border to-transparent" />
                        <ChevronDown className="size-3 text-border/60 rotate-[-90deg] ml-auto -mt-1.5" />
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <section className="px-4 py-20 sm:py-28 bg-gradient-to-b from-transparent via-[var(--daawa-cream)]/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Ce que disent nos couples</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Des invitations qui font la difference, des couples qui nous font confiance</p>
            <Divider className="mt-6" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={t.names} delay={i * 0.12}>
                <div className="rounded-2xl border border-border/60 bg-white/60 backdrop-blur-sm p-7 space-y-5 hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, s) => (<Star key={s} className="size-3.5 text-[var(--daawa-gold)] fill-[var(--daawa-gold)]" />))}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-1 border-t border-border/40">
                    <div className={"size-9 rounded-full border flex items-center justify-center ".concat(t.color)}>
                      <span className="text-[10px] font-semibold text-foreground">{t.initials}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{t.names}</p>
                      <p className="text-[10px] text-muted-foreground">Couple marie en 2025</p>
                    </div>
                    <span className="text-[10px] font-medium text-[var(--daawa-burgundy)]/60 border border-[var(--daawa-burgundy)]/15 rounded-full px-2.5 py-0.5">{t.tier}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Questions frequentes</h2>
            <p className="text-muted-foreground mt-3">Tout ce que vous devez savoir</p>
            <Divider className="mt-6" />
          </AnimatedSection>
          <AnimatedSection>
            <div className="space-y-3">
              {FAQ_DATA.map((faq, i) => <FaqItem key={i} question={faq.q} answer={faq.a} />)}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28 bg-gradient-to-b from-transparent to-[var(--daawa-burgundy)]/[0.03]">
        <AnimatedSection className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Pret a creer votre invitation ?</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">Rejoignez des centaines de couples tunisiens qui ont fait confiance a Daawa pour leur jour le plus beau.</p>
          <Button size="lg" onClick={() => setWizardOpen(true)} className="gap-2.5 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white text-base px-10 py-6 rounded-xl shadow-lg shadow-[var(--daawa-burgundy)]/25 hover:shadow-xl hover:shadow-[var(--daawa-burgundy)]/35 hover:-translate-y-0.5">
            <Sparkles className="size-5" />Commencer maintenant<ArrowRight className="size-4 opacity-60" />
          </Button>
        </AnimatedSection>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <footer className="border-t border-border/50 bg-background/60 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <Heart className="size-4 text-[var(--daawa-burgundy)] fill-[var(--daawa-burgundy)]/20" />
              <span className="font-semibold" style={{ fontFamily: 'var(--font-cormorant)' }}>Daawa</span>
              <span className="text-xs text-muted-foreground ml-1">Invitations de mariage tunisiennes</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span>2025 Daawa. Tous droits reserves.</span>
              <Heart className="size-3 text-[var(--daawa-burgundy)] hidden sm:block" />
            </div>
          </div>
        </div>
      </footer>

      <WizardModal open={wizardOpen} onOpenChange={setWizardOpen} initialTemplateId={initialTemplateId} />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HomeContent />
    </Suspense>
  )
}

/* ── FAQ Accordion Item ──────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-border/60 bg-white/50 backdrop-blur-sm overflow-hidden transition-all duration-200">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-6 py-4 text-sm font-medium text-left hover:bg-muted/30 transition-colors">
        <span>{question}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-muted-foreground ml-4 shrink-0">
          <ChevronDown className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }} className="overflow-hidden">
            <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── FAQ Accordion Item ──────────────────────────────── */
function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl border border-border/60 bg-white/50 backdrop-blur-sm overflow-hidden transition-all duration-200"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-6 py-4 text-sm font-medium text-left hover:bg-muted/30 transition-colors"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground ml-4 shrink-0"
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
