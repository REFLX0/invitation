import type { Tier } from '../wizard/tier-config-types'

export interface TemplateRegistryItem {
  id: string
  name: string
  tier: Tier
  thumbnail: string
  description: string
  layoutComponent: string
  themeColors: {
    bg: string
    text: string
    accent: string
  }
}

export const TEMPLATE_REGISTRY: TemplateRegistryItem[] = [
  // ── Classique (5) ──
  {
    id: 'cl-1',
    name: 'Elegance',
    tier: 'Classique',
    thumbnail: '/templates/cl-1.svg',
    description: 'Design classique et raffine',
    layoutComponent: 'classic-elegance',
    themeColors: { bg: '#FBF7F2', text: '#8B2252', accent: '#8B2252' },
  },
  {
    id: 'cl-2',
    name: 'Fleur de Lys',
    tier: 'Classique',
    thumbnail: '/templates/cl-2.svg',
    description: 'Motifs floraux delicats',
    layoutComponent: 'classic-fleur',
    themeColors: { bg: '#FFF5F8', text: '#D4859A', accent: '#D4859A' },
  },
  {
    id: 'cl-3',
    name: 'Aquarelle',
    tier: 'Classique',
    thumbnail: '/templates/cl-3.svg',
    description: 'Tons pastel aquarelles',
    layoutComponent: 'classic-aquarelle',
    themeColors: { bg: '#F5F0EB', text: '#6B7B8D', accent: '#8BAAC8' },
  },
  {
    id: 'cl-4',
    name: 'Parchemin',
    tier: 'Classique',
    thumbnail: '/templates/cl-4.svg',
    description: 'Style parchemin ancien',
    layoutComponent: 'classic-parchemin',
    themeColors: { bg: '#F2E8D5', text: '#6B4226', accent: '#C4A87C' },
  },
  {
    id: 'cl-5',
    name: 'Minimaliste',
    tier: 'Classique',
    thumbnail: '/templates/cl-5.svg',
    description: 'Ligne epuree et moderne',
    layoutComponent: 'classic-minimal',
    themeColors: { bg: '#FFFFFF', text: '#333333', accent: '#999999' },
  },

  // ── Premium (8) ──
  {
    id: 'pr-1',
    name: "Griffon d'Or",
    tier: 'Premium',
    thumbnail: '/templates/pr-1.svg',
    description: 'Theme royal avec touches dorees',
    layoutComponent: 'premium-griffon',
    themeColors: { bg: '#1A1A2E', text: '#C6A664', accent: '#C6A664' },
  },
  {
    id: 'pr-2',
    name: 'Jardin Secret',
    tier: 'Premium',
    thumbnail: '/templates/pr-2.svg',
    description: 'Ambiance jardin romantique',
    layoutComponent: 'premium-jardin',
    themeColors: { bg: '#F0F5E8', text: '#4A6B3A', accent: '#D4859A' },
  },
  {
    id: 'pr-3',
    name: 'Nuit Etoilee',
    tier: 'Premium',
    thumbnail: '/templates/pr-3.svg',
    description: 'Ciel nocturne et etoiles',
    layoutComponent: 'premium-nuit',
    themeColors: { bg: '#0F1B2D', text: '#C8D8E8', accent: '#A0B8D0' },
  },
  {
    id: 'pr-4',
    name: 'Mosaic',
    tier: 'Premium',
    thumbnail: '/templates/pr-4.svg',
    description: 'Inspire de la mosaique tunisienne',
    layoutComponent: 'premium-mosaic',
    themeColors: { bg: '#F0EDE8', text: '#2A6B6B', accent: '#1A8B8B' },
  },
  {
    id: 'pr-5',
    name: 'Soie & Velours',
    tier: 'Premium',
    thumbnail: '/templates/pr-5.svg',
    description: 'Textures riches et luxueuses',
    layoutComponent: 'premium-soie',
    themeColors: { bg: '#4A1942', text: '#E8D0E8', accent: '#C6A0C8' },
  },
  {
    id: 'pr-6',
    name: 'Sahara Rose',
    tier: 'Premium',
    thumbnail: '/templates/pr-6.svg',
    description: 'Tons roses du desert',
    layoutComponent: 'premium-sahara',
    themeColors: { bg: '#F5E0D0', text: '#A0604A', accent: '#D4956A' },
  },
  {
    id: 'pr-7',
    name: 'Oasis',
    tier: 'Premium',
    thumbnail: '/templates/pr-7.svg',
    description: 'Fraicheur oasis mediterraneenne',
    layoutComponent: 'premium-oasis',
    themeColors: { bg: '#EEF5F0', text: '#3A7B5A', accent: '#5A9B7A' },
  },
  {
    id: 'pr-8',
    name: 'Medina',
    tier: 'Premium',
    thumbnail: '/templates/pr-8.svg',
    description: 'Esprit medina traditionnelle',
    layoutComponent: 'premium-medina',
    themeColors: { bg: '#F0E5D5', text: '#8B5E3C', accent: '#B8860B' },
  },

  // ── Luxe (3) ──
  {
    id: 'lx-1',
    name: 'Noir et Or',
    tier: 'Luxe',
    thumbnail: '/templates/lx-1.svg',
    description: 'Art deco noir et or',
    layoutComponent: 'specialized-noir-et-or',
    themeColors: { bg: '#0A0A0A', text: '#C6A664', accent: '#C6A664' },
  },
  {
    id: 'lx-2',
    name: 'Lella Beya',
    tier: 'Luxe',
    thumbnail: '/templates/lx-2.svg',
    description: 'Heritage ottoman tunisien',
    layoutComponent: 'specialized-lella-beya',
    themeColors: { bg: '#FFF8F0', text: '#2C1810', accent: '#8B5E3C' },
  },
  {
    id: 'lx-3',
    name: 'Carthage Or',
    tier: 'Luxe',
    thumbnail: '/templates/lx-3.svg',
    description: 'Grandeur carthaginoise',
    layoutComponent: 'specialized-carthage-or',
    themeColors: { bg: '#FDF6E3', text: '#1A0F00', accent: '#D4AF37' },
  },
]
