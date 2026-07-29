'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

// ── Scratch Card Reveal ────────────────────────────────────────
export function ScratchCard({
  message,
  width = 320,
  height = 100,
  revealColor = 'var(--daawa-burgundy)',
  className = '',
}: {
  message: string
  width?: number
  height?: number
  revealColor?: string
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(false)
  const isDrawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Fill the scratch surface
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#C6A664')
    gradient.addColorStop(1, '#8B2252')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Add sparkle pattern
    ctx.fillStyle = 'rgba(255,255,255,0.15)'
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      ctx.beginPath()
      ctx.arc(x, y, Math.random() * 2 + 0.5, 0, Math.PI * 2)
      ctx.fill()
    }

    // Text hint
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Grattez ici', width / 2, height / 2)
  }, [width, height])

  const getPos = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = width / rect.width
    const scaleY = height / rect.height
    if ('touches' in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY }
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }, [width, height])

  const scratch = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pos = getPos(e)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2)
    ctx.fill()

    // Check how much has been scratched
    const imageData = ctx.getImageData(0, 0, width, height)
    const pixels = imageData.data
    let transparent = 0
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }
    const percent = transparent / (pixels.length / 4)
    if (percent > 0.5) {
      setRevealed(true)
    }
  }, [getPos, width, height, revealed])

  return (
    <div className={`inline-block ${className}`}>
      <div
        className="relative rounded-xl overflow-hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Message underneath */}
        <div
          className="absolute inset-0 flex items-center justify-center p-6 text-center"
          style={{ backgroundColor: `${revealColor}08` }}
        >
          <p className="text-sm italic" style={{ color: revealColor }}>{message}</p>
        </div>

        {/* Scratch surface */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none"
            style={{ borderRadius: '12px' }}
            onMouseDown={(e) => { isDrawing.current = true; scratch(e) }}
            onMouseMove={(e) => { if (isDrawing.current) scratch(e) }}
            onMouseUp={() => { isDrawing.current = false }}
            onMouseLeave={() => { isDrawing.current = false }}
            onTouchStart={(e) => { isDrawing.current = true; scratch(e) }}
            onTouchMove={(e) => { if (isDrawing.current) scratch(e) }}
            onTouchEnd={() => { isDrawing.current = false }}
          />
        )}

        {/* Fade out animation after reveal */}
        {revealed && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, rgba(198,166,100,0.1) 50%, transparent 100%)',
              animationDuration: '2s',
              animationIterationCount: '3',
            }}
          />
        )}
      </div>
      {!revealed && (
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Utilisez votre doigt pour gratter
        </p>
      )}
    </div>
  )
}

// ── Background Music Player ────────────────────────────────────
export function MusicPlayer({
  enabled,
  style,
  className = '',
}: {
  enabled: boolean
  style: string
  className?: string
}) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // We use a base64 silent audio placeholder since real tracks aren't bundled
  // In production, audio files would be uploaded per-event and referenced via tierConfig
  const toggle = useCallback(() => {
    if (!audioRef.current) {
      // Create a simple tone as placeholder (will be replaced by real audio)
      const audio = new Audio()
      // Placeholder: no actual src, just UI demo
      audioRef.current = audio
    }
    if (playing) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play?.().catch(() => {
        // Autoplay blocked — that's expected
      })
    }
    setPlaying(!playing)
  }, [playing])

  if (!enabled) return null

  const styleLabel = style === 'classical' ? '🎵 Classique' :
    style === 'jazz' ? '🎷 Jazz' :
    style === 'oriental' ? '🎵 Oriental' :
    style === 'piano' ? '🎹 Piano' :
      '🎵 Musique'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={toggle}
        className="inline-flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground/20 hover:text-foreground transition-colors"
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <span className={`inline-block w-2 h-2 rounded-full ${playing ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground/30'}`} />
        {styleLabel}
        {playing ? ' ▌▌' : ' ▶'}
      </button>
    </div>
  )
}
