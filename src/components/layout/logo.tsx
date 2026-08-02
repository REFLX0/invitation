import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function DaawaLogo({ className, variant = 'default' }: { className?: string, variant?: 'default' | 'light' }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/images/logo.png"
        alt="Daawa Logo"
        width={40}
        height={40}
        className="object-contain"
        priority
      />
      <div className="flex flex-col leading-tight">
        <span
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: 'var(--font-cormorant)', color: variant === 'light' ? 'white' : 'var(--daawa-burgundy)' }}
        >
          Daawa
        </span>
        <span
          className="text-[8px] tracking-[0.15em] uppercase font-medium"
          style={{ color: variant === 'light' ? 'rgba(255,255,255,0.6)' : 'var(--daawa-gold)' }}
        >
          Des invitations qui restent
        </span>
      </div>
    </div>
  )
}
