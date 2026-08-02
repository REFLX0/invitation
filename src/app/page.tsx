'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { WizardModal } from '@/components/daawa/wizard-modal'
import { Button } from '@/components/ui/button'
import { DaawaLogo } from '@/components/layout/logo'
import Image from 'next/image'
import {
  Sparkles, Heart, Star, Crown, Palette, Share2,
  MessageCircle, ChevronDown, Check, ArrowRight, Play,
  Gem, Music, Camera, PenTool, Instagram, Facebook, Search,
  Send, ChevronRight,
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

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--daawa-ink)]" style={{ fontFamily: 'var(--font-cormorant)' }}>
        {children}
      </h2>
      {sub && <p className="text-[var(--daawa-ink)]/55 mt-3 max-w-lg mx-auto text-sm">{sub}</p>}
      <div className="flex items-center justify-center gap-3 mt-4 opacity-40">
        <div className="h-px w-12 bg-[var(--daawa-burgundy)]" />
        <span className="text-[var(--daawa-burgundy)] text-[10px]">♦</span>
        <div className="h-px w-12 bg-[var(--daawa-burgundy)]" />
      </div>
    </div>
  )
}

const FEATURES_DATA = [
  { icon: Palette, title: 'Designs exclusifs', desc: 'Des modèles tunisiens soignés : Art Déco, Ottoman, Carthaginois et plus encore.' },
  { icon: Music, title: 'Musique personnalisée', desc: 'Ajoutez une ambiance musicale à votre invitation avec nos styles sélectionnés.' },
  { icon: Camera, title: 'Photos & galerie', desc: 'Intégrez vos plus beaux souvenirs dans une galerie élégante et interactive.' },
  { icon: PenTool, title: 'Monogrammes sur mesure', desc: 'Créez vos initiales entrelacées en 3 styles : Classique, Royal et Arabesque.' },
]

const TEMPLATES = [
  { id: 'cl-1', names: 'Sarah & Yassine', date: '25.07.2025', bg: 'bg-[#F5EFE6]', textColor: 'text-[var(--daawa-ink)]', accentColor: 'text-[var(--daawa-gold)]', isNew: true },
  { id: 'cl-2', names: 'Lina & Malek', date: '12.09.2025', bg: 'bg-[#1C3A2A]', textColor: 'text-white', accentColor: 'text-[var(--daawa-gold)]', isNew: false },
  { id: 'cl-3', names: 'Amel & Fares', date: '18.08.2025', bg: 'bg-[#F9F0EC]', textColor: 'text-[var(--daawa-ink)]', accentColor: 'text-[var(--daawa-rose)]', isNew: false },
  { id: 'cl-4', names: 'Meryem & Karim', date: '05.10.2025', bg: 'bg-[#4A1020]', textColor: 'text-white', accentColor: 'text-[var(--daawa-gold)]', isNew: false },
  { id: 'cl-5', names: 'Inès & Ghassen', date: '22.06.2025', bg: 'bg-[#F7F2ED]', textColor: 'text-[var(--daawa-ink)]', accentColor: 'text-[var(--daawa-sage)]', isNew: false },
]

const TESTIMONIALS = [
  { names: 'Sarah & Yassine', text: 'Nos invités ont adoré l\'invitation ! Elle était magnifique et super originale.', stars: 5, imgSrc: '/images/couple-1.jpg' },
  { names: 'Amel & Fares', text: 'Très facile à utiliser, un rendu élégant et professionnel.', stars: 5, imgSrc: '/images/couple-2.jpg' },
  { names: 'Meryem & Karim', text: 'Le partage instantané a tout changé, merci Daawa !', stars: 5, imgSrc: '/images/couple-3.jpg' },
]

const NAV_LINKS = [
  { label: 'Modèles', href: '/catalogue' },
  { label: 'Inspirations', href: '#inspirations' },
  { label: 'Comment ça marche', href: '#how-it-works' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

const FOOTER_LINKS = {
  decouvrir: [
    { label: 'Modèles', href: '/catalogue' },
    { label: 'Inspirations', href: '#inspirations' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'Comment ça marche', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ],
  aide: [
    { label: "Centre d'aide", href: '#' },
    { label: 'Tutoriels', href: '#' },
    { label: 'Nous contacter', href: '#' },
    { label: "Conditions d'utilisation", href: '#' },
    { label: 'Politique de confidentialité', href: '#' },
  ],
}

function TemplateCard({ t, onClick }: { t: typeof TEMPLATES[0]; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden cursor-pointer group aspect-[3/4] flex flex-col items-center justify-center p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${t.bg}`}
    >
      {t.isNew && (
        <div className="absolute top-2 left-2 bg-[var(--daawa-burgundy)] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest z-10">
          Nouveau
        </div>
      )}
      {/* Ornament top */}
      <div className={`absolute top-4 left-1/2 -translate-x-1/2 w-12 h-8 opacity-30`}>
        <svg viewBox="0 0 48 32" fill="none" className="w-full h-full">
          <path d="M24 2 C12 2 2 10 2 16 C2 22 12 30 24 30 C36 30 46 22 46 16 C46 10 36 2 24 2Z" stroke="currentColor" strokeWidth="1" className={t.textColor === 'text-white' ? 'text-white' : 'text-[var(--daawa-gold)]'} />
        </svg>
      </div>
      {/* Names */}
      <div className="text-center mt-4">
        <p className={`text-xs tracking-[0.2em] uppercase mb-2 opacity-50 ${t.textColor}`}>— Invitation —</p>
        <p className={`text-lg font-bold leading-tight ${t.textColor}`} style={{ fontFamily: 'var(--font-cormorant)' }}>
          {t.names.split(' & ')[0]}<br />
          <span className={`text-2xl ${t.accentColor}`}>&</span><br />
          {t.names.split(' & ')[1]}
        </p>
        <p className={`text-[11px] mt-2 opacity-60 ${t.textColor}`}>{t.date}</p>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
          <Search className="size-4 text-[var(--daawa-burgundy)]" />
        </div>
      </div>
    </div>
  )
}

function HomeContent() {
  const searchParams = useSearchParams()
  const [wizardOpen, setWizardOpen] = useState(false)
  const [initialTemplateId, setInitialTemplateId] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const w = searchParams.get('wizard')
    const t = searchParams.get('template')
    if (w === 'true') {
      if (t) setInitialTemplateId(t)
      setWizardOpen(true)
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams])

  const handleNav = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = href
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF6F1', backgroundImage: "url('/images/bg.png')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>

      {/* ── Header ─────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-4 mx-4 md:mx-auto max-w-7xl z-50 rounded-2xl bg-white/20 backdrop-blur-md backdrop-saturate-150 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="hover:opacity-80 transition-opacity shrink-0">
            <DaawaLogo />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-sm text-[var(--daawa-ink)]/70 hover:text-[var(--daawa-ink)] transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setWizardOpen(true)}
              size="sm"
              className="gap-2 text-white text-sm px-4 py-2 rounded-lg shadow-md"
              style={{ backgroundColor: 'var(--daawa-burgundy)' }}
            >
              <Sparkles className="size-3.5" />
              <span className="hidden sm:inline">Créer mon invitation</span>
              <span className="sm:hidden">Créer</span>
            </Button>
            <button
              className="lg:hidden p-2 text-[var(--daawa-ink)]/70"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="space-y-1">
                <div className="h-px w-5 bg-current" />
                <div className="h-px w-5 bg-current" />
                <div className="h-px w-5 bg-current" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-[var(--daawa-cream)] bg-white/95"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_LINKS.map(link => (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className="block w-full text-left px-3 py-2.5 text-sm text-[var(--daawa-ink)]/80 hover:bg-[var(--daawa-cream)]/60 rounded-lg transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative flex-1 px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Background floral decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10">
            <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
              <circle cx="300" cy="100" r="180" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
              <circle cx="300" cy="100" r="140" stroke="#722F37" strokeWidth="0.3" fill="none" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6 text-left">
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.1] text-[var(--daawa-ink)]"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Votre mariage mérite<br />
                une invitation inoubliable
              </motion.h1>

              <motion.div variants={fadeUp} className="flex items-center gap-2">
                <div className="h-px w-8 bg-[var(--daawa-burgundy)]" />
              </motion.div>

              <motion.p variants={fadeUp} className="text-[var(--daawa-ink)]/60 max-w-sm leading-relaxed text-sm sm:text-base">
                Des invitations digitales uniques, conçues avec amour,<br className="hidden sm:block" />
                pour célébrer votre histoire.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={() => setWizardOpen(true)}
                  className="gap-2 text-white text-sm px-6 py-5 rounded-lg shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--daawa-burgundy)' }}
                >
                  <Sparkles className="size-4" />
                  Créer mon invitation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-sm px-6 py-5 rounded-lg border-[var(--daawa-ink)]/20 text-[var(--daawa-ink)]/70 bg-transparent hover:bg-[var(--daawa-cream)]/40"
                >
                  <Play className="size-3.5 opacity-60" />
                  Voir la démo
                </Button>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-5 pt-2">
                {[
                  { icon: Gem, label: '100% Personnalisable' },
                  { icon: Share2, label: 'Partage instantané' },
                  { icon: Heart, label: 'Pour tous vos proches' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-[var(--daawa-ink)]/50">
                    <div className="size-6 rounded-full border border-[var(--daawa-ink)]/15 flex items-center justify-center">
                      <Icon className="size-3" />
                    </div>
                    {label}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[var(--daawa-burgundy)]/10">
                  <Image
                    src="/images/hero-mockup.png"
                    alt="Invitation de mariage Daawa"
                    width={560}
                    height={600}
                    className="w-full object-cover"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-lg shadow-black/10 px-4 py-3 flex items-center gap-2.5 border border-[var(--daawa-cream)]"
                >
                  <div className="size-8 rounded-full bg-[var(--daawa-gold)]/15 flex items-center justify-center">
                    <Star className="size-4 text-[var(--daawa-gold)] fill-[var(--daawa-gold)]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[var(--daawa-ink)]">500+ couples</p>
                    <p className="text-[9px] text-[var(--daawa-ink)]/50">nous font confiance</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features Bar ─────────────────────── */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[var(--daawa-cream)] shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--daawa-cream)]">
                {FEATURES_DATA.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 px-6 py-5">
                    <div className="size-9 rounded-lg bg-[var(--daawa-cream)] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="size-4 text-[var(--daawa-burgundy)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--daawa-ink)] mb-1">{title}</p>
                      <p className="text-[11px] text-[var(--daawa-ink)]/50 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── How it Works ─────────────────────── */}
      <section id="how-it-works" className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionTitle sub="Trois étapes simples pour votre invitation parfaite">
              Comment ça marche ?
            </SectionTitle>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Steps */}
            <div className="space-y-0">
              {[
                { icon: Palette, step: '1', title: 'Choisissez', desc: 'Sélectionnez le modèle qui vous ressemble.' },
                { icon: MessageCircle, step: '2', title: 'Personnalisez', desc: "Ajoutez vos textes, photos, couleurs et musique." },
                { icon: Share2, step: '3', title: 'Partagez', desc: "Envoyez instantanément à vos proches." },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <AnimatedSection key={item.step} delay={i * 0.15}>
                    <div className="flex gap-5 py-6 relative">
                      {/* Connector line */}
                      {i < 2 && (
                        <div className="absolute left-5 top-16 bottom-0 w-px border-l-2 border-dashed border-[var(--daawa-burgundy)]/20" style={{ height: '40px' }} />
                      )}
                      {/* Step circle */}
                      <div className="relative shrink-0">
                        <div className="size-10 rounded-full border-2 border-[var(--daawa-burgundy)]/20 bg-white flex items-center justify-center shadow-sm">
                          <span className="text-sm font-bold text-[var(--daawa-burgundy)]" style={{ fontFamily: 'var(--font-cormorant)' }}>{item.step}</span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="pt-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="size-7 rounded-lg bg-[var(--daawa-cream)] flex items-center justify-center">
                            <Icon className="size-3.5 text-[var(--daawa-burgundy)]" />
                          </div>
                          <h3 className="font-semibold text-[var(--daawa-ink)]" style={{ fontFamily: 'var(--font-cormorant)' }}>{item.title}</h3>
                        </div>
                        <p className="text-sm text-[var(--daawa-ink)]/55 max-w-xs">{item.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>

            {/* Phone Mockup */}
            <AnimatedSection>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-xs mx-auto">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Image
                      src="/images/phone-mockup.png"
                      alt="App sur téléphone"
                      width={300}
                      height={600}
                      className="w-full object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Templates Gallery ─────────────────── */}
      <section id="inspirations" className="px-4 py-20 sm:py-28 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionTitle>
              Nos modèles phares
            </SectionTitle>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {TEMPLATES.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.08}>
                <TemplateCard t={t} onClick={() => { setInitialTemplateId(t.id); setWizardOpen(true) }} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center mt-8">
              <button
                onClick={() => window.location.href = '/catalogue'}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--daawa-burgundy)] hover:underline transition-all"
              >
                Voir tous les modèles
                <ChevronRight className="size-4" />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionTitle sub="Des invitations qui font la différence">
              Ils nous ont fait confiance
            </SectionTitle>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={t.names} delay={i * 0.12}>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[var(--daawa-cream)] p-6 space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(t.stars)].map((_, s) => (
                      <Star key={s} className="size-3.5 text-[var(--daawa-gold)] fill-[var(--daawa-gold)]" />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--daawa-ink)]/65 italic leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-1 border-t border-[var(--daawa-cream)]">
                    <div className="size-10 rounded-full overflow-hidden shrink-0 border-2 border-[var(--daawa-cream)]">
                      <Image src={t.imgSrc} alt={t.names} width={40} height={40} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--daawa-ink)]">{t.names}</p>
                      <p className="text-[10px] text-[var(--daawa-ink)]/40">Couple marié en 2025</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────── */}
      <section id="pricing" className="px-4 py-20 sm:py-28 bg-white/30">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionTitle sub="Choisissez la formule qui correspond à votre vision.">
              Tarifs
            </SectionTitle>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {[
              {
                name: 'Classique', price: '89', icon: Heart, popular: false,
                features: ["5 designs élégants", "Vidéo d'ouverture animée", "RSVP & compte à rebours", "Mises à jour illimitées"],
              },
              {
                name: 'Premium', price: '149', icon: Star, popular: true,
                features: ["8 designs immersifs", "Interactions exclusives", "Musique de fond personnalisée", "3 tours de révision gratuits", "Grattage-cadeau interactif"],
              },
              {
                name: 'Luxe', price: '289', icon: Crown, popular: false,
                features: ["Traitement luxe complet", "Monogrammes personnalisés", "AI photo backgrounds", "Swatches code vestimentaire", "Galerie photo couple", "Support prioritaire"],
              },
            ].map((tier, i) => {
              const Icon = tier.icon
              return (
                <AnimatedSection key={tier.name} delay={i * 0.15}>
                  <div className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm ${tier.popular ? 'border-[var(--daawa-burgundy)]/30 ring-1 ring-[var(--daawa-burgundy)]/20 shadow-lg scale-[1.02]' : 'border-[var(--daawa-cream)]'}`}>
                    {tier.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--daawa-burgundy)] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                        Le plus populaire
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="size-10 rounded-xl bg-[var(--daawa-cream)] flex items-center justify-center">
                        <Icon className="size-5 text-[var(--daawa-burgundy)]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--daawa-ink)]" style={{ fontFamily: 'var(--font-cormorant)' }}>{tier.name}</h3>
                        <p className="text-[10px] text-[var(--daawa-ink)]/40">
                          {tier.name === 'Classique' ? 'Élégant & simple' : tier.name === 'Premium' ? 'Immersif & unique' : 'Prestigieux & sur mesure'}
                        </p>
                      </div>
                    </div>
                    <div className="mb-5 pb-5 border-b border-[var(--daawa-cream)]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-[var(--daawa-ink)] tracking-tight">{tier.price}</span>
                        <span className="text-sm text-[var(--daawa-ink)]/50 font-medium">DT</span>
                      </div>
                      <p className="text-[10px] text-[var(--daawa-ink)]/40 mt-1">Paiement unique, utilisation illimitée</p>
                    </div>
                    <ul className="space-y-2.5 flex-1 mb-6">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <div className="mt-0.5 size-4 rounded-full bg-[var(--daawa-burgundy)]/10 flex items-center justify-center shrink-0">
                            <Check className="size-2.5 text-[var(--daawa-burgundy)]" />
                          </div>
                          <span className="text-[var(--daawa-ink)]/65">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => setWizardOpen(true)}
                      className={`w-full py-5 rounded-xl text-sm font-medium transition-all ${tier.popular ? 'bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white shadow-md shadow-[var(--daawa-burgundy)]/20' : 'bg-[var(--daawa-cream)] hover:bg-[var(--daawa-cream)]/80 text-[var(--daawa-ink)] border border-[var(--daawa-ink)]/10'}`}
                    >
                      Choisir {tier.name}
                    </Button>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────── */}
      <section id="faq" className="px-4 py-20 sm:py-28">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <SectionTitle sub="Tout ce que vous devez savoir">
              Questions fréquentes
            </SectionTitle>
          </AnimatedSection>
          <AnimatedSection>
            <div className="space-y-3">
              {[
                { q: 'Combien de temps faut-il pour créer une invitation ?', a: "Moins de 5 minutes. Choisissez votre modèle, remplissez vos informations, et votre invitation est prête à partager immédiatement avec un lien unique." },
                { q: "Puis-je modifier mon invitation après création ?", a: "Absolument ! Avec les formules Premium et Luxe, vous pouvez modifier les détails, ajouter des photos, ajuster le design et mettre à jour votre invitation autant que nécessaire." },
                { q: 'Comment mes invités confirment leur présence ?', a: "Chaque invitation inclut un formulaire RSVP intégré. Vos invités confirment en un clic depuis leur téléphone et vous recevez les réponses en temps réel." },
                { q: 'Quels modes de paiement acceptez-vous ?', a: "Nous acceptons les paiements par carte bancaire, D17 et virement bancaire. Le paiement est sécurisé et se fait en une seule étape." },
              ].map((faq, i) => <FaqItem key={i} question={faq.q} answer={faq.a} />)}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Footer ────────────────────────────── */}
      <footer className="border-t border-[var(--daawa-cream)] bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <DaawaLogo className="mb-4" />
              <p className="text-xs text-[var(--daawa-ink)]/50 leading-relaxed max-w-[200px] mb-5">
                Daawa vous accompagne pour créer des invitations digitales uniques, élégantes et mémorables pour célébrer vos plus beaux moments.
              </p>
              <div className="flex items-center gap-3">
                {[Instagram, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="size-8 rounded-full border border-[var(--daawa-ink)]/15 flex items-center justify-center text-[var(--daawa-ink)]/40 hover:text-[var(--daawa-burgundy)] hover:border-[var(--daawa-burgundy)]/30 transition-colors">
                    <Icon className="size-3.5" />
                  </a>
                ))}
                {/* TikTok & Pinterest icons */}
                <a href="#" className="size-8 rounded-full border border-[var(--daawa-ink)]/15 flex items-center justify-center text-[var(--daawa-ink)]/40 hover:text-[var(--daawa-burgundy)] hover:border-[var(--daawa-burgundy)]/30 transition-colors">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.94a8.16 8.16 0 004.77 1.52V7.01a4.85 4.85 0 01-1-.32z"/></svg>
                </a>
                <a href="#" className="size-8 rounded-full border border-[var(--daawa-ink)]/15 flex items-center justify-center text-[var(--daawa-ink)]/40 hover:text-[var(--daawa-burgundy)] hover:border-[var(--daawa-burgundy)]/30 transition-colors">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                </a>
              </div>
            </div>

            {/* Découvrir */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--daawa-ink)] mb-4">Découvrir</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.decouvrir.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-xs text-[var(--daawa-ink)]/50 hover:text-[var(--daawa-burgundy)] transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aide */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--daawa-ink)] mb-4">Aide</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.aide.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-xs text-[var(--daawa-ink)]/50 hover:text-[var(--daawa-burgundy)] transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--daawa-ink)] mb-2">Restez inspirés</h4>
              <p className="text-xs text-[var(--daawa-ink)]/50 mb-4 leading-relaxed">
                Recevez nos nouveautés et inspirations mariage directement par email.
              </p>
              <div className="flex items-stretch gap-0 rounded-lg overflow-hidden border border-[var(--daawa-ink)]/15">
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2.5 text-xs bg-white/80 text-[var(--daawa-ink)] placeholder-[var(--daawa-ink)]/30 outline-none"
                />
                <button
                  className="px-3 bg-[var(--daawa-ink)] text-white hover:bg-[var(--daawa-burgundy)] transition-colors flex items-center justify-center"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--daawa-cream)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-[var(--daawa-ink)]/40">© 2024 Daawa. Tous droits réservés.</p>
            <button className="text-[11px] text-[var(--daawa-ink)]/40 hover:text-[var(--daawa-ink)] transition-colors flex items-center gap-1">
              Français
              <ChevronDown className="size-3" />
            </button>
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
    <div className="rounded-xl border border-[var(--daawa-cream)] bg-white/60 backdrop-blur-sm overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-6 py-4 text-sm font-medium text-left text-[var(--daawa-ink)] hover:bg-[var(--daawa-cream)]/30 transition-colors"
      >
        <span>{question}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-[var(--daawa-ink)]/40 ml-4 shrink-0">
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
            <div className="px-6 pb-5 text-sm text-[var(--daawa-ink)]/55 leading-relaxed border-t border-[var(--daawa-cream)] pt-4">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
