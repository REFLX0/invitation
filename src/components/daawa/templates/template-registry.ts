import type { Tier } from '../wizard/tier-config-types'

export interface TemplateRegistryItem {
  id: string
  name: string
  tier: Tier
  thumbnail: string
  description: string
  layoutComponent: string
}

export const TEMPLATE_REGISTRY: TemplateRegistryItem[] = [
  // ── Classique (5) ──
  {
    id: 'cl-1',
    name: 'Elegance',
    tier: 'Classique',
    thumbnail: '/templates/cl-1.jpg',
    description: 'Design classique et raffine',
    layoutComponent: 'classic-elegance',
  },
  {
    id: 'cl-2',
    name: 'Fleur de Lys',
    tier: 'Classique',
    thumbnail: '/templates/cl-2.jpg',
    description: 'Motifs floraux delicats',
    layoutComponent: 'classic-fleur',
  },
  {
    id: 'cl-3',
    name: 'Aquarelle',
    tier: 'Classique',
    thumbnail: '/templates/cl-3.jpg',
    description: 'Tons pastel aquarelles',
    layoutComponent: 'classic-aquarelle',
  },
  {
    id: 'cl-4',
    name: 'Parchemin',
    tier: 'Classique',
    thumbnail: '/templates/cl-4.jpg',
    description: 'Style parchemin ancien',
    layoutComponent: 'classic-parchemin',
  },
  {
    id: 'cl-5',
    name: 'Minimaliste',
    tier: 'Classique',
    thumbnail: '/templates/cl-5.jpg',
    description: 'Ligne epuree et moderne',
    layoutComponent: 'classic-minimal',
  },

  // ── Premium (8) ──
  {
    id: 'pr-1',
    name: "Griffon d'Or",
    tier: 'Premium',
    thumbnail: '/templates/pr-1.jpg',
    description: 'Theme royal avec touches dorees',
    layoutComponent: 'premium-griffon',
  },
  {
    id: 'pr-2',
    name: 'Jardin Secret',
    tier: 'Premium',
    thumbnail: '/templates/pr-2.jpg',
    description: 'Ambiance jardin romantique',
    layoutComponent: 'premium-jardin',
  },
  {
    id: 'pr-3',
    name: 'Nuit Etoilee',
    tier: 'Premium',
    thumbnail: '/templates/pr-3.jpg',
    description: 'Ciel nocturne et etoiles',
    layoutComponent: 'premium-nuit',
  },
  {
    id: 'pr-4',
    name: 'Mosaic',
    tier: 'Premium',
    thumbnail: '/templates/pr-4.jpg',
    description: 'Inspire de la mosaique tunisienne',
    layoutComponent: 'premium-mosaic',
  },
  {
    id: 'pr-5',
    name: 'Soie & Velours',
    tier: 'Premium',
    thumbnail: '/templates/pr-5.jpg',
    description: 'Textures riches et luxueuses',
    layoutComponent: 'premium-soie',
  },
  {
    id: 'pr-6',
    name: 'Sahara Rose',
    tier: 'Premium',
    thumbnail: '/templates/pr-6.jpg',
    description: 'Tons roses du desert',
    layoutComponent: 'premium-sahara',
  },
  {
    id: 'pr-7',
    name: 'Oasis',
    tier: 'Premium',
    thumbnail: '/templates/pr-7.jpg',
    description: 'Fraicheur oasis mediterraneenne',
    layoutComponent: 'premium-oasis',
  },
  {
    id: 'pr-8',
    name: 'Medina',
    tier: 'Premium',
    thumbnail: '/templates/pr-8.jpg',
    description: 'Esprit medina traditionnelle',
    layoutComponent: 'premium-medina',
  },

  // ── Luxe (3) ──
  {
    id: 'lx-1',
    name: 'Noir et Or',
    tier: 'Luxe',
    thumbnail: '/templates/lx-1.jpg',
    description: 'Art deco noir et or',
    layoutComponent: 'specialized-noir-et-or',
  },
  {
    id: 'lx-2',
    name: 'Lella Beya',
    tier: 'Luxe',
    thumbnail: '/templates/lx-2.jpg',
    description: 'Heritage ottoman tunisien',
    layoutComponent: 'specialized-lella-beya',
  },
  {
    id: 'lx-3',
    name: 'Carthage Or',
    tier: 'Luxe',
    thumbnail: '/templates/lx-3.jpg',
    description: 'Grandeur carthaginoise',
    layoutComponent: 'specialized-carthage-or',
  },
]
