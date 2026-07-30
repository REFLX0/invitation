import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const event = await db.event.findUnique({ where: { slug } })
    if (!event) return NextResponse.json({ error: 'Evenement non trouve' }, { status: 404 })
    return NextResponse.json(event)
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
