import type { Metadata } from 'next'
import { InvitationTemplate } from '@/components/daawa/templates/invitation-template'

interface PageProps {
  params: Promise<{ slug: string }>
}

const BASE_URL = 'https://daawa.tn'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  let event: Awaited<ReturnType<typeof import('@/lib/db').db.event.findUnique>> | null = null

  try {
    const { db } = await import('@/lib/db')
    event = await db.event.findUnique({ where: { slug } })
  } catch {
    // ignore
  }

  if (!event) {
    return {
      title: 'Invitation non trouvee — Daawa',
      description: 'Cette invitation n\'existe pas ou a ete supprimee.',
    }
  }

  const title = `Invitation de ${event.partner1Name} & ${event.partner2Name} — Daawa`
  const description = `Vous etes invites au mariage de ${event.partner1Name} et ${event.partner2Name} le ${event.eventDate}. ${event.venueName}, ${event.venueAddress}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/e/${slug}`,
      siteName: 'Daawa',
      locale: 'fr_TN',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/api/og?slug=${slug}`,
          width: 1200,
          height: 630,
          alt: `Invitation ${event.partner1Name} & ${event.partner2Name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/api/og?slug=${slug}`],
    },
    other: {
      'whatsapp:url': `${BASE_URL}/e/${slug}`,
    },
  }
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params

  let event: Awaited<ReturnType<typeof import('@/lib/db').db.event.findUnique>>

  try {
    const { db } = await import('@/lib/db')
    event = await db.event.findUnique({ where: { slug } })
  } catch {
    event = null
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-6xl">{'\u2764\uFE0F'}</p>
          <h1 className="text-xl font-semibold">Invitation non trouvee</h1>
          <p className="text-sm text-muted-foreground">
            Cette invitation n&apos;existe pas ou a ete supprimee.
          </p>
        </div>
      </div>
    )
  }

  // Serialize dates to strings for client component
  const serializedEvent = {
    id: event.id,
    slug: event.slug,
    templateId: event.templateId,
    partner1Name: event.partner1Name,
    partner2Name: event.partner2Name,
    eventDate: event.eventDate,
    venueName: event.venueName,
    venueAddress: event.venueAddress,
    tier: event.tier,
    tierConfig: event.tierConfig,
  }

  return <InvitationTemplate event={serializedEvent} />
}
