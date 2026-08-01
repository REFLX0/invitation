import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function DaawaLogo({ className, variant = 'default' }: { className?: string, variant?: 'default' | 'light' }) {
  const color = variant === 'default' ? 'var(--daawa-burgundy)' : 'white'
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-8"
        initial={{ rotate: -10, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <path
          d="M50 15 C 20 15, 10 40, 10 60 C 10 85, 45 85, 50 65 C 55 85, 90 85, 90 60 C 90 40, 80 15, 50 15 Z"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-20"
        />
        <path
          d="M50 25 C 30 25, 25 45, 25 60 C 25 75, 45 75, 50 60 C 55 75, 75 75, 75 60 C 75 45, 70 25, 50 25 Z"
          fill={color}
          opacity="0.8"
        />
        <circle cx="50" cy="45" r="4" fill="white" />
      </motion.svg>
      <span
        className="text-2xl font-semibold tracking-tight mt-1"
        style={{ fontFamily: 'var(--font-cormorant)', color }}
      >
        Daawa
      </span>
    </div>
  )
}
