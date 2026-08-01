'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Heart, Star, Crown, Sparkles, ArrowRight, Eye, X,
  Gem, Layers, ChevronRight, Play,
} from 'lucide-react'
import { DaawaLogo } from '@/components/layout/logo'
import { TEMPLATE_REGISTRY } from '@/components/daawa/templates/template-registry'
import { type Tier, TIER_META } from '@/components/daawa/wizard/tier-config-types'

type TierFilter = 'all' | Tier

const TIER_CONFIG = {
  all:      { label: 'Tous',      icon: Layers,  accent: 'var(--daawa-ink)',      bg: 'from-[var(--daawa-ink)]/10 to-transparent',     count: 16 },
  Classique:{ label: 'Classique', icon: Heart,   accent: 'var(--daawa-burgundy)', bg: 'from-[var(--daawa-burgundy)]/10 to-transparent', count: 5  },
  Premium:  { label: 'Premium',   icon: Star,    accent: 'var(--daawa-rose)',     bg: 'from-[var(--daawa-rose)]/10 to-transparent',     count: 8  },
  Luxe:     { label: 'Luxe',      icon: Crown,   accent: 'var(--daawa-gold)',     bg: 'from-[var(--daawa-gold)]/10 to-transparent',     count: 3  },
} as const

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }),
}

// --- Animated preview that renders SVG + overlay animations per tier ---
function TemplatePreviewCard({
  template,
  onClick,
  onQuickSelect,
}: {
  template: typeof TEMPLATE_REGISTRY[0]
  onClick: () => void
  onQuickSelect: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const tierAccent =
    template.tier === 'Luxe'     ? '#D4AF37' :
    template.tier === 'Premium'  ? '#C17767' :
                                   '#722F37'

  const tierBadgeClass =
    template.tier === 'Luxe'    ? 'border-[var(--daawa-gold)]/40 bg-[var(--daawa-gold)]/10 text-[var(--daawa-gold)]' :
    template.tier === 'Premium' ? 'border-[var(--daawa-rose)]/40 bg-[var(--daawa-rose)]/10 text-[var(--daawa-rose)]' :
                                  'border-[var(--daawa-ink)]/20 bg-[var(--daawa-ink)]/5 text-[var(--daawa-ink)]/70'

  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.88, y: 10 }}
      className="group relative flex flex-col rounded-2xl border border-border/50 bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden cursor-pointer template-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Preview area */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '3/4', backgroundColor: template.themeColors.bg }}
      >
        {/* SVG template thumbnail */}
        <img
          src={template.thumbnail}
          alt={template.name}
          className="template-preview w-full h-full object-cover"
          loading="lazy"
        />

        {/* Animated background overlay for each tier on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 pointer-events-none"
            >
              {template.tier === 'Luxe' && (
                <>
                  {/* Gold particle shimmer for Luxe */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 4 + i * 2,
                        height: 4 + i * 2,
                        backgroundColor: '#D4AF37',
                        left: `${15 + i * 14}%`,
                        top: `${20 + (i % 3) * 20}%`,
                        opacity: 0.6,
                      }}
                      animate={{ y: [-8, 8, -8], opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </>
              )}
              {template.tier === 'Premium' && (
                <>
                  {/* Star twinkle for Premium */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ left: `${10 + i * 18}%`, top: `${10 + (i % 2) * 30}%` }}
                      animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 1.8 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <Star style={{ color: tierAccent }} size={8} fill={tierAccent} />
                    </motion.div>
                  ))}
                </>
              )}
              {template.tier === 'Classique' && (
                <>
                  {/* Petal float for Classique */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 6,
                        height: 10,
                        backgroundColor: template.themeColors.accent,
                        opacity: 0.4,
                        left: `${20 + i * 20}%`,
                        top: '20%',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      }}
                      animate={{
                        y: [0, -40, 80],
                        x: [0, (i % 2 === 0 ? 10 : -10), 0],
                        rotate: [0, 15, -10],
                        opacity: [0.4, 0.6, 0],
                      }}
                      transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.6 }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover overlay with CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-end pb-5 gap-2"
        >
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="flex gap-2"
          >
            <button
              onClick={(e) => { e.stopPropagation(); onClick() }}
              className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-foreground shadow-lg hover:bg-white transition-colors"
            >
              <Eye size={12} />
              Aperçu
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onQuickSelect() }}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-colors"
              style={{ backgroundColor: tierAccent }}
            >
              Choisir
              <ChevronRight size={12} />
            </button>
          </motion.div>
        </motion.div>

        {/* Tier badge top-right */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${tierBadgeClass}`}>
            {template.tier === 'Luxe' && <Crown size={8} />}
            {template.tier === 'Premium' && <Star size={8} />}
            {template.tier === 'Classique' && <Heart size={8} />}
            {template.tier}
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {template.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{template.description}</p>
          </div>
          <span className="text-xs font-bold shrink-0" style={{ color: tierAccent }}>
            {TIER_META[template.tier].price}
          </span>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5">
          {[template.themeColors.bg, template.themeColors.text, template.themeColors.accent].map((c, i) => (
            <div key={i} className="size-3.5 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: c }} />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">Palette</span>
        </div>
      </div>
    </motion.div>
  )
}

// --- Full preview modal ---
function PreviewModal({
  template,
  onClose,
  onSelect,
}: {
  template: typeof TEMPLATE_REGISTRY[0]
  onClose: () => void
  onSelect: () => void
}) {
  const tierAccent =
    template.tier === 'Luxe'    ? '#D4AF37' :
    template.tier === 'Premium' ? '#C17767' :
                                  '#722F37'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl bg-background rounded-3xl border border-border/60 overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 size-9 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors"
        >
          <X size={16} className="text-white" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left: big preview */}
          <div
            className="relative min-h-[400px] overflow-hidden"
            style={{ backgroundColor: template.themeColors.bg }}
          >
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-full object-cover"
            />
            {/* Animated overlays in modal too */}
            <div className="absolute inset-0 pointer-events-none">
              {template.tier === 'Luxe' && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 3 + i,
                        height: 3 + i,
                        backgroundColor: '#D4AF37',
                        left: `${8 + i * 11}%`,
                        top: `${15 + (i % 4) * 18}%`,
                      }}
                      animate={{ y: [-6, 6, -6], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2 + i * 0.25, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </>
              )}
              {template.tier === 'Premium' && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ left: `${10 + i * 15}%`, top: `${8 + (i % 3) * 25}%` }}
                      animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.2, 0.7, 0.2] }}
                      transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                    >
                      <Star size={10} style={{ color: '#C17767' }} fill="#C17767" />
                    </motion.div>
                  ))}
                </>
              )}
              {template.tier === 'Classique' && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 5, height: 8,
                        backgroundColor: template.themeColors.accent,
                        opacity: 0.35,
                        left: `${15 + i * 16}%`,
                        top: '15%',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      }}
                      animate={{ y: [0, -50, 100], x: [0, (i % 2 ? 12 : -12), 0], rotate: [0, 20, -15], opacity: [0.35, 0.5, 0] }}
                      transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Tier badge overlay */}
            <div className="absolute bottom-4 left-4">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg"
                style={{ backgroundColor: tierAccent }}
              >
                {template.tier === 'Luxe' && <Crown size={10} />}
                {template.tier === 'Premium' && <Star size={10} />}
                {template.tier === 'Classique' && <Heart size={10} />}
                {template.tier} · {TIER_META[template.tier].price}
              </span>
            </div>
          </div>

          {/* Right: info panel */}
          <div className="p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Modèle</p>
                <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  {template.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{template.description}</p>
              </div>

              {/* Color palette */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">Palette</p>
                <div className="flex gap-3">
                  {[
                    { label: 'Fond',   color: template.themeColors.bg },
                    { label: 'Texte',  color: template.themeColors.text },
                    { label: 'Accent', color: template.themeColors.accent },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1.5">
                      <div className="size-8 rounded-xl border border-black/10 shadow-sm" style={{ backgroundColor: s.color }} />
                      <span className="text-[9px] text-muted-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's included */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">Inclus</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{TIER_META[template.tier].description}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={onSelect}
                className="w-full gap-2.5 py-5 rounded-xl font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: tierAccent, boxShadow: `0 8px 24px ${tierAccent}40` }}
              >
                <Sparkles size={16} />
                Utiliser ce modèle
                <ArrowRight size={14} className="opacity-70" />
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">Personnalisation en moins de 5 minutes</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CataloguePage() {
  const router = useRouter()
  const [filter, setFilter] = useState<TierFilter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const headerRef = useRef(null)

  const filtered = useMemo(
    () => filter === 'all' ? TEMPLATE_REGISTRY : TEMPLATE_REGISTRY.filter(t => t.tier === filter),
    [filter]
  )

  const selectedTemplate = selectedId ? TEMPLATE_REGISTRY.find(t => t.id === selectedId) ?? null : null

  const handleSelect = useCallback((id: string) => {
    router.push(`/?wizard=true&template=${id}`)
  }, [router])

  const counts = useMemo(() => ({
    all:       TEMPLATE_REGISTRY.length,
    Classique: TEMPLATE_REGISTRY.filter(t => t.tier === 'Classique').length,
    Premium:   TEMPLATE_REGISTRY.filter(t => t.tier === 'Premium').length,
    Luxe:      TEMPLATE_REGISTRY.filter(t => t.tier === 'Luxe').length,
  }), [])

  return (
    <div className="min-h-screen flex flex-col bg-theme-marble">
      {/* ── Sticky header ─────────────────────────── */}
      <motion.header
        ref={headerRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-[var(--daawa-cream)] bg-white/70 backdrop-blur-xl sticky top-0 z-40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <DaawaLogo />
          </a>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground text-sm" onClick={() => router.push('/')}>
              Accueil
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white shadow-md shadow-[var(--daawa-burgundy)]/20"
              onClick={() => router.push('/?wizard=true')}
            >
              <Sparkles size={13} />
              <span className="hidden sm:inline">Créer mon invitation</span>
              <span className="sm:hidden">Créer</span>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative px-4 pt-16 pb-10 text-center overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full bg-[var(--daawa-burgundy)]/[0.04] blur-3xl" />
          <div className="absolute top-0 right-1/4 w-[300px] h-[250px] rounded-full bg-[var(--daawa-gold)]/[0.05] blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-2xl mx-auto space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--daawa-gold)]/30 bg-[var(--daawa-gold)]/8 px-4 py-1.5 shadow-sm">
            <Gem size={12} className="text-[var(--daawa-gold)]" />
            <span className="text-xs font-medium text-[var(--daawa-gold)]">16 modèles exclusifs</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Notre collection{' '}
            <span className="text-[var(--daawa-burgundy)]">d&apos;invitations</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            Chaque modèle est soigneusement conçu pour votre mariage tunisien. Choisissez, personnalisez et partagez en 5 minutes.
          </p>
        </motion.div>
      </section>

      {/* ── Tier filters ──────────────────────────── */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(Object.entries(TIER_CONFIG) as [TierFilter, typeof TIER_CONFIG['all']][]).map(([key, cfg]) => {
              const Icon = cfg.icon
              const active = filter === key
              const c = counts[key]
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                    active
                      ? 'text-white shadow-lg scale-105'
                      : 'border-border/60 text-muted-foreground hover:border-foreground/20 hover:text-foreground bg-white/50 hover:bg-white/80'
                  }`}
                  style={active ? { backgroundColor: cfg.accent, borderColor: cfg.accent, boxShadow: `0 4px 16px ${cfg.accent}40` } : undefined}
                >
                  <Icon size={13} />
                  {cfg.label}
                  <span className={`text-[10px] rounded-full px-1.5 py-0.5 ${active ? 'bg-white/20' : 'bg-muted text-muted-foreground'}`}>
                    {c}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Template Grid ─────────────────────────── */}
      <section className="px-4 pb-24 flex-1">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((template, i) => (
                <motion.div
                  key={template.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  <TemplatePreviewCard
                    template={template}
                    onClick={() => setSelectedId(template.id)}
                    onQuickSelect={() => handleSelect(template.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────── */}
      <section className="px-4 py-20 bg-gradient-to-b from-transparent to-[var(--daawa-burgundy)]/[0.04]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto space-y-5"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Votre invitation en 5 minutes
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Choisissez un modèle, personnalisez vos informations et partagez le lien avec vos invités sur WhatsApp.
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/?wizard=true')}
            className="gap-2.5 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white text-base px-8 py-6 rounded-xl shadow-lg shadow-[var(--daawa-burgundy)]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Play size={16} />
            Commencer maintenant
            <ArrowRight size={15} className="opacity-60" />
          </Button>
        </motion.div>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <footer className="border-t border-border/50 bg-background/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Heart size={14} className="text-[var(--daawa-burgundy)]" />
            <span>Daawa — Invitations de mariage tunisiennes</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2025 Daawa. Tous droits réservés.</p>
        </div>
      </footer>

      {/* ── Preview Modal ─────────────────────────── */}
      <AnimatePresence>
        {selectedTemplate && (
          <PreviewModal
            template={selectedTemplate}
            onClose={() => setSelectedId(null)}
            onSelect={() => { handleSelect(selectedTemplate.id); setSelectedId(null) }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
