import { InvitationTemplate } from '@/components/daawa/templates/invitation-template'

interface PageProps {
  params: Promise<{ slug: string }>
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
          <p className="text-6xl">💔</p>
          <h1 className="text-xl font-semibold">Invitation non trouvee</h1>
          <p className="text-sm text-muted-foreground">
            Cette invitation n'existe pas ou a ete supprimee.
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
