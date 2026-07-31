import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { eventId, guests } = body
    if (!eventId || !Array.isArray(guests) || guests.length === 0) {
      return NextResponse.json({ error: 'Donnees manquantes' }, { status: 400 })
    }
    const event = await db.event.findUnique({ where: { id: eventId } })
    if (!event) return NextResponse.json({ error: 'Evenement non trouve' }, { status: 404 })
    const rsvps = await db.$transaction(
      guests.map((g: { name: string; attending: boolean; meal?: string; plusOne?: string }) =>
        db.rsvp.create({ data: { eventId, guestName: g.name, attending: g.attending, meal: g.meal || '', plusOne: g.plusOne || '' } })
      )
    )
    return NextResponse.json({ success: true, count: rsvps.length }, { status: 201 })
  } catch (error) {
    console.error('Error creating RSVP:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const eventId = searchParams.get('eventId')
    if (!eventId) return NextResponse.json({ error: 'eventId requis' }, { status: 400 })
    const rsvps = await db.rsvp.findMany({ where: { eventId }, orderBy: { createdAt: 'desc' } })
    const summary = { total: rsvps.length, attending: rsvps.filter((r) => r.attending).length, declining: rsvps.filter((r) => !r.attending).length }
    return NextResponse.json({ rsvps, summary })
  } catch (error) {
    console.error('Error fetching RSVPs:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
