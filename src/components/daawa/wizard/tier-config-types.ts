// --- Tier Types ---
export type Tier = 'Classique' | 'Premium' | 'Luxe'

// --- Shared (Classic) Tier Config ---
export interface ScheduleItem {
  label: string
  time: string
}

export interface ClassicTierConfig {
  ceremonyTime: string
  receptionTime: string
  scheduleItems: ScheduleItem[]
  venueGps: string
  directionsNote: string
  rsvpDeadline: string
  maxGuests: string
  mealChoices: string[]
  customMessage: string
}

// --- Premium extends Classic ---
export interface PremiumTierConfig extends ClassicTierConfig {
  scratchRevealMessage: string
  waxSealColor: string
  envelopeLinerPattern: string
  backgroundMusicEnabled: boolean
  musicStyle: string
  guestPersonalMessage: string
  customColorAccent: string
  preferredLanguage: 'FR' | 'AR' | 'EN'
}

// --- Luxe extends Premium ---
export interface LuxeTierConfig extends PremiumTierConfig {
  monogramInitials: string
  monogramStyle: string
  dressCodeText: string
  colorPaletteName: string
  customColorSwatches: string[]
  heroPhotoUrl: string
  couplePhotoUrl: string
  venuePhotoUrl: string
  galleryPhotoUrls: string[]
  customAnimationStyle: string
  preferredCalligraphyFont: string
  customFooterText: string
  arabicCalligraphyEnabled: boolean
  vipGuestListEnabled: boolean
  afterPartyVenue: string
  afterPartyTime: string
}

// --- Union type ---
export type TierConfig = ClassicTierConfig | PremiumTierConfig | LuxeTierConfig

// --- Template ---
export interface Template {
  id: string
  name: string
  tier: Tier
  thumbnail: string
  description: string
}

// --- Wizard form data ---
export interface WizardFormData {
  templateId: string
  partner1Name: string
  partner2Name: string
  eventDate: string
  venueName: string
  venueAddress: string
  tier: Tier
  tierConfig: TierConfig
}

// --- Defaults ---
export const defaultClassicConfig: ClassicTierConfig = {
  ceremonyTime: '',
  receptionTime: '',
  scheduleItems: [{ label: '', time: '' }],
  venueGps: '',
  directionsNote: '',
  rsvpDeadline: '',
  maxGuests: '',
  mealChoices: [''],
  customMessage: '',
}

export const defaultPremiumConfig: PremiumTierConfig = {
  ...defaultClassicConfig,
  scratchRevealMessage: '',
  waxSealColor: 'red',
  envelopeLinerPattern: 'plain',
  backgroundMusicEnabled: false,
  musicStyle: 'none',
  guestPersonalMessage: '',
  customColorAccent: '',
  preferredLanguage: 'FR',
}

export const defaultLuxeConfig: LuxeTierConfig = {
  ...defaultPremiumConfig,
  monogramInitials: '',
  monogramStyle: 'classic-circle',
  dressCodeText: '',
  colorPaletteName: '',
  customColorSwatches: ['', '', ''],
  heroPhotoUrl: '',
  couplePhotoUrl: '',
  venuePhotoUrl: '',
  galleryPhotoUrls: ['', '', '', ''],
  customAnimationStyle: 'fade-in',
  preferredCalligraphyFont: 'great-vibes',
  customFooterText: '',
  arabicCalligraphyEnabled: false,
  vipGuestListEnabled: false,
  afterPartyVenue: '',
  afterPartyTime: '',
}

export function getDefaultConfig(tier: Tier): TierConfig {
  switch (tier) {
    case 'Classique': return { ...defaultClassicConfig }
    case 'Premium': return { ...defaultPremiumConfig }
    case 'Luxe': return { ...defaultLuxeConfig }
  }
}

// --- Templates (mirrors template-registry.ts) ---
export const TEMPLATES: Template[] = [
  { id: 'cl-1', name: 'Elegance', tier: 'Classique', thumbnail: '/templates/cl-1.svg', description: 'Design classique et raffine' },
  { id: 'cl-2', name: 'Fleur de Lys', tier: 'Classique', thumbnail: '/templates/cl-2.svg', description: 'Motifs floraux delicats' },
  { id: 'cl-3', name: 'Aquarelle', tier: 'Classique', thumbnail: '/templates/cl-3.svg', description: 'Tons pastel aquarelles' },
  { id: 'cl-4', name: 'Parchemin', tier: 'Classique', thumbnail: '/templates/cl-4.svg', description: 'Style parchemin ancien' },
  { id: 'cl-5', name: 'Minimaliste', tier: 'Classique', thumbnail: '/templates/cl-5.svg', description: 'Ligne epuree et moderne' },
  { id: 'pr-1', name: "Griffon d'Or", tier: 'Premium', thumbnail: '/templates/pr-1.svg', description: 'Theme royal avec touches dorees' },
  { id: 'pr-2', name: 'Jardin Secret', tier: 'Premium', thumbnail: '/templates/pr-2.svg', description: 'Ambiance jardin romantique' },
  { id: 'pr-3', name: 'Nuit Etoilee', tier: 'Premium', thumbnail: '/templates/pr-3.svg', description: 'Ciel nocturne et etoiles' },
  { id: 'pr-4', name: 'Mosaic', tier: 'Premium', thumbnail: '/templates/pr-4.svg', description: 'Inspire de la mosaique tunisienne' },
  { id: 'pr-5', name: 'Soie & Velours', tier: 'Premium', thumbnail: '/templates/pr-5.svg', description: 'Textures riches et luxueuses' },
  { id: 'pr-6', name: 'Sahara Rose', tier: 'Premium', thumbnail: '/templates/pr-6.svg', description: 'Tons roses du desert' },
  { id: 'pr-7', name: 'Oasis', tier: 'Premium', thumbnail: '/templates/pr-7.svg', description: 'Fraicheur oasis mediterraneenne' },
  { id: 'pr-8', name: 'Medina', tier: 'Premium', thumbnail: '/templates/pr-8.svg', description: 'Esprit medina traditionnelle' },
  { id: 'lx-1', name: 'Noir et Or', tier: 'Luxe', thumbnail: '/templates/lx-1.svg', description: 'Art deco noir et or' },
  { id: 'lx-2', name: 'Lella Beya', tier: 'Luxe', thumbnail: '/templates/lx-2.svg', description: 'Heritage ottoman tunisien' },
  { id: 'lx-3', name: 'Carthage Or', tier: 'Luxe', thumbnail: '/templates/lx-3.svg', description: 'Grandeur carthaginoise' },
]

// --- Tier metadata ---
export const TIER_META: Record<Tier, { label: string; price: string; color: string; badgeClass: string; description: string }> = {
  Classique: {
    label: 'Classique',
    price: '89 DT',
    color: 'text-[var(--daawa-ink)]/60',
    badgeClass: 'border-[var(--daawa-ink)]/30 text-[var(--daawa-ink)]/70',
    description: "5 designs elegants \u00b7 Video d'ouverture \u00b7 RSVP \u00b7 Compte a rebours \u00b7 Programme",
  },
  Premium: {
    label: 'Premium',
    price: '149 DT',
    color: 'text-[var(--daawa-burgundy)]',
    badgeClass: 'border-[var(--daawa-burgundy)]/30 text-[var(--daawa-burgundy)]',
    description: "8 designs immersifs \u00b7 Interactions exclusives \u00b7 Tout Classique inclus \u00b7 3 revisions",
  },
  Luxe: {
    label: 'Luxe',
    price: '289 DT',
    color: 'text-[var(--daawa-gold)]',
    badgeClass: 'border-[var(--daawa-gold)]/40 text-[var(--daawa-gold)]',
    description: 'Traitement de luxe complet \u00b7 AI photos \u00b7 Monogrammes \u00b7 Swatches dress code',
  },
}
