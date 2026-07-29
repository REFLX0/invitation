import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const event = await db.event.findUnique({
      where: { slug },
    })
    if (!event) {
      return NextResponse.json({ error: 'Evenement non trouve' }, { status: 404 })
    }
    return NextResponse.json(event)
  } catch (error) {
    console.error('Error fetching event by slug:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
