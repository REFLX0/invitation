import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

const createEventSchema = {
  templateId: true,
  partner1Name: true,
  partner2Name: true,
  eventDate: true,
  venueName: true,
  venueAddress: true,
  tier: false,
  tierConfig: false,
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { templateId, partner1Name, partner2Name, eventDate, venueName, venueAddress, tier, tierConfig } = body

    if (!templateId || !partner1Name || !partner2Name || !eventDate || !venueName || !venueAddress) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    const slug = `${partner1Name.toLowerCase().replace(/\s+/g, '-')}-${partner2Name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`

    const event = await db.event.create({
      data: {
        slug,
        templateId,
        partner1Name,
        partner2Name,
        eventDate,
        venueName,
        venueAddress,
        tier: tier || 'Classique',
        tierConfig: typeof tierConfig === 'string' ? tierConfig : JSON.stringify(tierConfig || {}),
      },
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const events = await db.event.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
