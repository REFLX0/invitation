'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

export function ScratchCard({ message, revealColor, width = 300, height = 100 }: { message: string; revealColor: string; width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width * 2
    canvas.height = height * 2
    ctx.scale(2, 2)

    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#C6A664')
    gradient.addColorStop(0.5, '#D4AF37')
    gradient.addColorStop(1, '#C6A664')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Grattez ici', width / 2, height / 2 + 4)

    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = 'rgba(255,255,255,'.concat(String(Math.random() * 0.15), ')')
      ctx.beginPath()
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 8 + 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [width, height])

  const handleScratch = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = (width * 2) / rect.width
    const scaleY = (height * 2) / rect.height

    let clientX: number, clientY: number
    if ('touches' in e) {
      if (e.touches.length === 0) return
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY, 20, 0, Math.PI * 2)
    ctx.fill()

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    for (let i = 3; i < pixels.length; i += 4) { if (pixels[i] === 0) transparent++ }
    if (transparent / (pixels.length / 4) > 0.5) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setIsRevealed(true)
    }
  }, [width, height])

  return (
    <div className="relative rounded-lg overflow-hidden border border-current/10" style={{ width, height }}>
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center" style={{ color: revealColor }}>
        <p className="text-sm italic">{message}</p>
      </div>
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
          style={{ width, height }}
          onMouseDown={handleScratch}
          onMouseMove={(e) => e.buttons === 1 && handleScratch(e)}
          onTouchMove={handleScratch}
        />
      )}
    </div>
  )
}

const MUSIC_URLS: Record<string, string> = {
  classical: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  jazz: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  oriental: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  romantic: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
}

export function MusicPlayer({ enabled, style }: { enabled: boolean; style: string }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (enabled && style !== 'none') {
      audioRef.current = new Audio(MUSIC_URLS[style] || MUSIC_URLS.classical)
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null } }
  }, [enabled, style])

  if (!enabled || style === 'none') return null

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause() } else { audioRef.current.play() }
    setPlaying(!playing)
  }

  return (
    <button
      onClick={toggle}
      className={"flex items-center gap-2 rounded-full px-3 py-1.5 shadow-lg transition-all duration-300 ".concat(playing ? 'bg-[var(--tpl-accent)] text-white' : 'bg-white/90 backdrop-blur-sm text-foreground border border-current/10')}
      title={playing ? 'Pause' : 'Play'}
    >
      <div className="flex gap-[2px] items-end h-3">
        {[1, 2, 3].map((bar) => (
          <div key={bar} className={"w-[3px] rounded-full transition-all duration-300 ".concat(playing ? 'animate-pulse' : '')} style={{ height: playing ? ''.concat(String(bar * 4 + 4), 'px') : '4px', backgroundColor: playing ? 'white' : 'currentColor', animationDelay: playing ? ''.concat(String(bar * 100), 'ms') : undefined }} />
        ))}
      </div>
      <span className="text-[10px]">{playing ? 'Pause' : 'Musique'}</span>
    </button>
  )
}
