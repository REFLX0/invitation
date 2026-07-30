'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Star, Crown, Sparkles, Filter, ArrowRight, Eye, X, Check } from 'lucide-react'
import { TEMPLATE_REGISTRY } from '@/components/daawa/templates/template-registry'
import { type Tier, TIER_META } from '@/components/daawa/wizard/tier-config-types'

type TierFilter = 'all' | Tier

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } } }

function AnimatedGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className={className}>
      {children}
    </motion.div>
  )
}

export default function CataloguePage() {
  const router = useRouter()
  const [filter, setFilter] = useState<TierFilter>('all')
  const [selected, setSelected] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const filtered = useMemo(() => {
    if (filter === 'all') return TEMPLATE_REGISTRY
    return TEMPLATE_REGISTRY.filter((t) => t.tier === filter)
  }, [filter])

  const selectedTemplate = selected ? TEMPLATE_REGISTRY.find((t) => t.id === selected) : null

  const counts = useMemo(() => ({
    all: TEMPLATE_REGISTRY.length,
    Classique: TEMPLATE_REGISTRY.filter((t) => t.tier === 'Classique').length,
    Premium: TEMPLATE_REGISTRY.filter((t) => t.tier === 'Premium').length,
    Luxe: TEMPLATE_REGISTRY.filter((t) => t.tier === 'Luxe').length,
  }), [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--daawa-cream)] bg-background/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="size-5 text-[var(--daawa-burgundy)] fill-[var(--daawa-burgundy)]/20" />
            <span className="text-xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Daawa</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-sm" onClick={() => router.push('/')}>Accueil</Button>
            <Button size="sm" className="gap-2 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white shadow-md shadow-[var(--daawa-burgundy)]/20" onClick={() => router.push('/?wizard=true')}>
              <Sparkles className="size-3.5" />Creer mon invitation
            </Button>
          </div>
        </div>
      </header>

      <section className="relative px-4 pt-16 pb-12 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-[var(--daawa-burgundy)]/[0.03] blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] rounded-full bg-[var(--daawa-gold)]/[0.04] blur-3xl" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--daawa-gold)]/30 bg-[var(--daawa-gold)]/8 px-3.5 py-1">
            <Filter className="size-3 text-[var(--daawa-gold)]" />
            <span className="text-xs font-medium text-[var(--daawa-gold)]">Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>Nos 16 modeles <span className="text-[var(--daawa-burgundy)]">&apos;invitations</span></h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Parcourez notre collection exclusive de modeles tunisiens. Chaque design est unique et soigneusement cree pour votre jour special.</p>
        </motion.div>
      </section>

      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { key: 'all' as TierFilter, label: 'Tous ('.concat(String(counts.all), ')') },
              { key: 'Classique' as TierFilter, label: 'Classique ('.concat(String(counts.Classique), ')') },
              { key: 'Premium' as TierFilter, label: 'Premium ('.concat(String(counts.Premium), ')') },
              { key: 'Luxe' as TierFilter, label: 'Luxe ('.concat(String(counts.Luxe), ')') },
            ].map((f) => (
              <button key={f.key} onClick={() => setFilter(f.key)} className={"px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ".concat(filter === f.key ? 'bg-[var(--daawa-ink)] text-white border-[var(--daawa-ink)] shadow-md' : 'border-border hover:border-foreground/20 text-muted-foreground hover:text-foreground bg-white/40')}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 flex-1">
        <div className="max-w-7xl mx-auto">
          <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((template) => {
                const meta = TIER_META[template.tier]
                const isSelected = selected === template.id
                return (
                  <motion.div key={template.id} variants={fadeUp} layout exit={{ opacity: 0, scale: 0.9 }} className={"group relative rounded-2xl border-2 overflow-hidden bg-white/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.06] hover:-translate-y-1 ".concat(isSelected ? 'border-[var(--daawa-burgundy)] ring-2 ring-[var(--daawa-burgundy)]/20' : 'border-border/60')}>
                    <div className="aspect-[4/3] w-full overflow-hidden cursor-pointer relative" style={{ backgroundColor: template.themeColors.bg }} onClick={() => { setSelected(template.id); setPreviewOpen(true) }}>
                      <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="size-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"><Eye className="size-5 text-foreground" /></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold truncate" style={{ fontFamily: 'var(--font-cormorant)' }}>{template.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{template.description}</p>
                        </div>
                        {isSelected && <div className="size-5 rounded-full bg-[var(--daawa-burgundy)] flex items-center justify-center shrink-0"><Check className="size-3 text-white" /></div>}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[template.themeColors.bg, template.themeColors.text, template.themeColors.accent].map((c, i) => (
                          <div key={i} className="size-4 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <Badge variant="outline" className={"text-[10px] ".concat(template.tier === 'Luxe' ? 'border-[var(--daawa-gold)]/30 text-[var(--daawa-gold)]' : template.tier === 'Premium' ? 'border-[var(--daawa-burgundy)]/30 text-[var(--daawa-burgundy)]' : 'border-[var(--daawa-ink)]/20 text-[var(--daawa-ink)]/60')}>
                          {meta.label} &middot; {meta.price}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-xs gap-1.5 text-[var(--daawa-burgundy)] hover:text-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/5" onClick={() => router.push('/?wizard=true&template='.concat(template.id))}>
                          Choisir<ArrowRight className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </AnimatedGrid>
        </div>
      </section>

      <section className="px-4 py-20 bg-gradient-to-b from-transparent to-[var(--daawa-burgundy)]/[0.03]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-xl mx-auto space-y-5">
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-cormorant)' }}>Trouvez votre modele ideal</h2>
          <p className="text-muted-foreground">Parcourez notre catalogue et creez votre invitation en quelques minutes. Partagez-la sur WhatsApp avec tous vos invites.</p>
          <Button size="lg" onClick={() => router.push('/?wizard=true')} className="gap-2.5 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white shadow-lg shadow-[var(--daawa-burgundy)]/25">
            <Sparkles className="size-5" />Commencer maintenant<ArrowRight className="size-4 opacity-60" />
          </Button>
        </motion.div>
      </section>

      <footer className="border-t border-border/50 bg-background/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Heart className="size-3.5 text-[var(--daawa-burgundy)]" /><span>Daawa — Invitations de mariage tunisiennes</span></div>
          <p className="text-xs text-muted-foreground">2025 Daawa. Tous droits reserves.</p>
        </div>
      </footer>

      <AnimatePresence>
        {previewOpen && selectedTemplate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setPreviewOpen(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }} onClick={(e) => e.stopPropagation()} className="relative z-10 w-full max-w-2xl bg-background rounded-2xl border border-border/60 overflow-hidden shadow-2xl">
              <button onClick={() => setPreviewOpen(false)} className="absolute top-4 right-4 z-10 size-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"><X className="size-4 text-white" /></button>
              <div className="aspect-[16/10] w-full" style={{ backgroundColor: selectedTemplate.themeColors.bg }}><img src={selectedTemplate.thumbnail} alt={selectedTemplate.name} className="w-full h-full object-cover" /></div>
              <div className="p-6 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div><h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-cormorant)' }}>{selectedTemplate.name}</h3><p className="text-sm text-muted-foreground mt-1">{selectedTemplate.description}</p></div>
                  <Badge variant="outline" className={selectedTemplate.tier === 'Luxe' ? 'border-[var(--daawa-gold)]/30 text-[var(--daawa-gold)]' : selectedTemplate.tier === 'Premium' ? 'border-[var(--daawa-burgundy)]/30 text-[var(--daawa-burgundy)]' : 'border-[var(--daawa-ink)]/20 text-[var(--daawa-ink)]/60'}>{TIER_META[selectedTemplate.tier].label} &middot; {TIER_META[selectedTemplate.tier].price}</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Palette de couleurs</p>
                  <div className="flex gap-3">
                    {[
                      { label: 'Arriere-plan', color: selectedTemplate.themeColors.bg },
                      { label: 'Texte', color: selectedTemplate.themeColors.text },
                      { label: 'Accent', color: selectedTemplate.themeColors.accent },
                    ].map((swatch) => (
                      <div key={swatch.label} className="flex items-center gap-2">
                        <div className="size-6 rounded-lg border border-black/10 shadow-sm" style={{ backgroundColor: swatch.color }} />
                        <div><p className="text-[10px] text-muted-foreground">{swatch.label}</p><p className="text-[10px] font-mono text-foreground">{swatch.color}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Inclus dans la formule</p>
                  <p className="text-sm text-muted-foreground">{TIER_META[selectedTemplate.tier].description}</p>
                </div>
                <Button onClick={() => { router.push('/?wizard=true&template='.concat(selectedTemplate.id)); setPreviewOpen(false) }} className="w-full gap-2 bg-[var(--daawa-burgundy)] hover:bg-[var(--daawa-burgundy)]/85 text-white shadow-md shadow-[var(--daawa-burgundy)]/20">
                  <Sparkles className="size-4" />Utiliser ce modele
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
