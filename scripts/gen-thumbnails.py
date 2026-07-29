#!/usr/bin/env python3
"""Generate 16 SVG template thumbnails for the wedding invitation gallery."""

import os

OUT = "/home/z/my-project/public/templates"

def svg(filename, content):
    path = os.path.join(OUT, filename)
    with open(path, "w") as f:
        f.write(content)
    print(f"  wrote {filename}")

# ── Classic 1: Elegance ──
svg("cl-1.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#FBF7F2"/>
  <rect x="20" y="20" width="360" height="260" rx="4" fill="none" stroke="#8B2252" stroke-width="1" opacity="0.3"/>
  <line x1="80" y1="110" x2="320" y2="110" stroke="#8B2252" stroke-width="0.8" opacity="0.25"/>
  <line x1="80" y1="190" x2="320" y2="190" stroke="#8B2252" stroke-width="0.8" opacity="0.25"/>
  <polygon points="200,90 203,104 217,104 206,112 209,126 200,118 191,126 194,112 183,104 197,104" fill="#8B2252" opacity="0.2"/>
  <text x="200" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#8B2252" opacity="0.7">Ahmed</text>
  <text x="200" y="165" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#8B2252" opacity="0.5">&amp;</text>
  <text x="200" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#8B2252" opacity="0.7">Fatima</text>
  <text x="200" y="250" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#8B2252" opacity="0.35">Elegance</text>
</svg>''')

# ── Classic 2: Fleur de Lys ──
svg("cl-2.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#FFF5F8"/>
  <rect x="15" y="15" width="370" height="270" rx="6" fill="none" stroke="#D4859A" stroke-width="1.5" opacity="0.3"/>
  <circle cx="50" cy="50" r="12" fill="none" stroke="#D4859A" stroke-width="0.8" opacity="0.25"/>
  <circle cx="350" cy="50" r="12" fill="none" stroke="#D4859A" stroke-width="0.8" opacity="0.25"/>
  <circle cx="50" cy="250" r="12" fill="none" stroke="#D4859A" stroke-width="0.8" opacity="0.25"/>
  <circle cx="350" cy="250" r="12" fill="none" stroke="#D4859A" stroke-width="0.8" opacity="0.25"/>
  <path d="M100,80 Q120,60 140,80 Q120,95 100,80Z" fill="#D4859A" opacity="0.12"/>
  <path d="M260,80 Q280,60 300,80 Q280,95 260,80Z" fill="#D4859A" opacity="0.12"/>
  <path d="M180,65 Q200,45 220,65 Q200,80 180,65Z" fill="#D4859A" opacity="0.15"/>
  <text x="200" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#D4859A" opacity="0.7">Ahmed</text>
  <text x="200" y="165" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#D4859A" opacity="0.5">&amp;</text>
  <text x="200" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#D4859A" opacity="0.7">Fatima</text>
  <path d="M150,210 Q175,195 200,210 Q225,195 250,210" fill="none" stroke="#D4859A" stroke-width="1" opacity="0.2"/>
  <text x="200" y="250" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#D4859A" opacity="0.35">Fleur de Lys</text>
</svg>''')

# ── Classic 3: Aquarelle ──
svg("cl-3.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <radialGradient id="aq1" cx="30%" cy="40%"><stop offset="0%" stop-color="#B8D4E3" stop-opacity="0.4"/><stop offset="100%" stop-color="#F0F4F8" stop-opacity="0"/></radialGradient>
    <radialGradient id="aq2" cx="70%" cy="60%"><stop offset="0%" stop-color="#D4B8D8" stop-opacity="0.3"/><stop offset="100%" stop-color="#F0F4F8" stop-opacity="0"/></radialGradient>
    <radialGradient id="aq3" cx="50%" cy="30%"><stop offset="0%" stop-color="#B8D8B8" stop-opacity="0.3"/><stop offset="100%" stop-color="#F0F4F8" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="400" height="300" fill="#F5F0EB"/>
  <rect width="400" height="300" fill="url(#aq1)"/>
  <rect width="400" height="300" fill="url(#aq2)"/>
  <rect width="400" height="300" fill="url(#aq3)"/>
  <circle cx="80" cy="80" r="30" fill="#C8A8D0" opacity="0.08"/>
  <circle cx="320" cy="220" r="40" fill="#A8C8D8" opacity="0.08"/>
  <text x="200" y="140" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#6B7B8D" opacity="0.7">Ahmed</text>
  <text x="200" y="160" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#8B9BA8" opacity="0.5">&amp;</text>
  <text x="200" y="180" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#6B7B8D" opacity="0.7">Fatima</text>
  <text x="200" y="250" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#8B9BA8" opacity="0.35">Aquarelle</text>
</svg>''')

# ── Classic 4: Parchemin ──
svg("cl-4.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#F2E8D5"/>
  <rect x="30" y="30" width="340" height="240" rx="2" fill="#EDDFC8" stroke="#C4A87C" stroke-width="1" opacity="0.5"/>
  <line x1="50" y1="50" x2="50" y2="250" stroke="#C4A87C" stroke-width="0.5" opacity="0.15"/>
  <line x1="350" y1="50" x2="350" y2="250" stroke="#C4A87C" stroke-width="0.5" opacity="0.15"/>
  <text x="200" y="135" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="#6B4226" opacity="0.65">Ahmed</text>
  <text x="200" y="158" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#8B6340" opacity="0.45">&amp;</text>
  <text x="200" y="180" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="#6B4226" opacity="0.65">Fatima</text>
  <text x="200" y="245" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#8B6340" opacity="0.35">Parchemin</text>
</svg>''')

# ── Classic 5: Minimaliste ──
svg("cl-5.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#FFFFFF"/>
  <line x1="150" y1="100" x2="250" y2="100" stroke="#333" stroke-width="0.5" opacity="0.2"/>
  <text x="200" y="148" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="24" fill="#333" opacity="0.6" font-weight="300">Ahmed</text>
  <text x="200" y="168" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#999" opacity="0.5">&amp;</text>
  <text x="200" y="192" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="24" fill="#333" opacity="0.6" font-weight="300">Fatima</text>
  <line x1="150" y1="210" x2="250" y2="210" stroke="#333" stroke-width="0.5" opacity="0.2"/>
  <text x="200" y="255" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="9" fill="#999" opacity="0.35" letter-spacing="3">MINIMALISTE</text>
</svg>''')

# ── Premium 1: Griffon d'Or ──
svg("pr-1.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#1A1A2E"/>
  <rect x="20" y="20" width="360" height="260" rx="2" fill="none" stroke="#C6A664" stroke-width="1.2" opacity="0.4"/>
  <rect x="28" y="28" width="344" height="244" rx="1" fill="none" stroke="#C6A664" stroke-width="0.5" opacity="0.2"/>
  <polygon points="200,75 205,95 225,95 209,106 215,126 200,115 185,126 191,106 175,95 195,95" fill="#C6A664" opacity="0.3"/>
  <text x="200" y="150" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#C6A664" opacity="0.7">Ahmed</text>
  <text x="200" y="170" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#C6A664" opacity="0.5">&amp;</text>
  <text x="200" y="192" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#C6A664" opacity="0.7">Fatima</text>
  <line x1="120" y1="220" x2="280" y2="220" stroke="#C6A664" stroke-width="0.5" opacity="0.2"/>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#C6A664" opacity="0.35">Griffon d'Or</text>
</svg>''')

# ── Premium 2: Jardin Secret ──
svg("pr-2.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#F0F5E8"/>
  <path d="M0,300 Q50,250 100,270 Q150,290 200,260 Q250,230 300,260 Q350,290 400,250 L400,300Z" fill="#6B8E5A" opacity="0.12"/>
  <path d="M60,100 Q70,80 80,100 Q70,115 60,100Z" fill="#8BA87A" opacity="0.2"/>
  <path d="M320,100 Q330,80 340,100 Q330,115 320,100Z" fill="#8BA87A" opacity="0.2"/>
  <path d="M190,80 Q200,60 210,80 Q200,95 190,80Z" fill="#8BA87A" opacity="0.15"/>
  <circle cx="200" cy="120" r="3" fill="#D4859A" opacity="0.3"/>
  <text x="200" y="148" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="#4A6B3A" opacity="0.7">Ahmed</text>
  <text x="200" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#D4859A" opacity="0.5">&amp;</text>
  <text x="200" y="188" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="#4A6B3A" opacity="0.7">Fatima</text>
  <text x="200" y="250" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#6B8E5A" opacity="0.35">Jardin Secret</text>
</svg>''')

# ── Premium 3: Nuit Etoilee ──
svg("pr-3.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#0F1B2D"/>
  <circle cx="80" cy="50" r="1.5" fill="#FFF" opacity="0.4"/>
  <circle cx="150" cy="30" r="1" fill="#FFF" opacity="0.3"/>
  <circle cx="300" cy="45" r="1.5" fill="#FFF" opacity="0.35"/>
  <circle cx="350" cy="80" r="1" fill="#FFF" opacity="0.25"/>
  <circle cx="60" cy="120" r="1" fill="#FFF" opacity="0.3"/>
  <circle cx="340" cy="150" r="1.2" fill="#FFF" opacity="0.3"/>
  <circle cx="100" cy="200" r="0.8" fill="#FFF" opacity="0.2"/>
  <circle cx="250" cy="60" r="1.5" fill="#FFF" opacity="0.35"/>
  <circle cx="180" cy="90" r="0.8" fill="#FFF" opacity="0.25"/>
  <circle cx="320" cy="230" r="1" fill="#FFF" opacity="0.2"/>
  <circle cx="50" cy="250" r="1.2" fill="#FFF" opacity="0.25"/>
  <circle cx="200" cy="40" r="12" fill="#E8D5A0" opacity="0.08"/>
  <text x="200" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#C8D8E8" opacity="0.7">Ahmed</text>
  <text x="200" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#A0B8D0" opacity="0.5">&amp;</text>
  <text x="200" y="190" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#C8D8E8" opacity="0.7">Fatima</text>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#8098B0" opacity="0.35">Nuit Etoilee</text>
</svg>''')

# ── Premium 4: Mosaic ──
svg("pr-4.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#F0EDE8"/>
  <g opacity="0.08">
    <rect x="20" y="20" width="40" height="40" fill="#1A8B8B" rx="2"/>
    <rect x="65" y="20" width="40" height="40" fill="#F5F0E0" rx="2"/>
    <rect x="20" y="65" width="40" height="40" fill="#F5F0E0" rx="2"/>
    <rect x="65" y="65" width="40" height="40" fill="#1A8B8B" rx="2"/>
    <rect x="300" y="200" width="40" height="40" fill="#1A8B8B" rx="2"/>
    <rect x="345" y="200" width="40" height="40" fill="#F5F0E0" rx="2"/>
    <rect x="300" y="245" width="40" height="40" fill="#F5F0E0" rx="2"/>
    <rect x="345" y="245" width="40" height="40" fill="#1A8B8B" rx="2"/>
  </g>
  <circle cx="200" cy="120" r="25" fill="none" stroke="#1A8B8B" stroke-width="1" opacity="0.2"/>
  <text x="200" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#2A6B6B" opacity="0.7">Ahmed</text>
  <text x="200" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#3A8B8B" opacity="0.5">&amp;</text>
  <text x="200" y="192" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#2A6B6B" opacity="0.7">Fatima</text>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#3A8B8B" opacity="0.35">Mosaic</text>
</svg>''')

# ── Premium 5: Soie & Velours ──
svg("pr-5.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="velvet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4A1942"/>
      <stop offset="100%" stop-color="#6B2D5B"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#velvet)"/>
  <rect x="30" y="30" width="340" height="240" rx="4" fill="none" stroke="#C6A0C8" stroke-width="0.8" opacity="0.3"/>
  <text x="200" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#E8D0E8" opacity="0.7">Ahmed</text>
  <text x="200" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#D8B8D8" opacity="0.5">&amp;</text>
  <text x="200" y="192" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#E8D0E8" opacity="0.7">Fatima</text>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#C8A0C8" opacity="0.35">Soie &amp; Velours</text>
</svg>''')

# ── Premium 6: Sahara Rose ──
svg("pr-6.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="sahara" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F5E0D0"/>
      <stop offset="100%" stop-color="#E8C8B0"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sahara)"/>
  <circle cx="320" cy="60" r="30" fill="#D4956A" opacity="0.1"/>
  <text x="200" y="140" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#A0604A" opacity="0.7">Ahmed</text>
  <text x="200" y="162" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#C0806A" opacity="0.5">&amp;</text>
  <text x="200" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#A0604A" opacity="0.7">Fatima</text>
  <line x1="140" y1="210" x2="260" y2="210" stroke="#C0806A" stroke-width="0.8" opacity="0.2"/>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#B07060" opacity="0.35">Sahara Rose</text>
</svg>''')

# ── Premium 7: Oasis ──
svg("pr-7.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#EEF5F0"/>
  <path d="M0,280 Q100,240 200,260 Q300,280 400,240 L400,300 L0,300Z" fill="#5A9B7A" opacity="0.1"/>
  <ellipse cx="200" cy="100" rx="30" ry="25" fill="none" stroke="#4A8B6A" stroke-width="1" opacity="0.15"/>
  <text x="200" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#3A7B5A" opacity="0.7">Ahmed</text>
  <text x="200" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#5A9B7A" opacity="0.5">&amp;</text>
  <text x="200" y="192" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#3A7B5A" opacity="0.7">Fatima</text>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#5A9B7A" opacity="0.35">Oasis</text>
</svg>''')

# ── Premium 8: Medina ──
svg("pr-8.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#F0E5D5"/>
  <path d="M20,20 L20,280" stroke="#B8860B" stroke-width="0.8" opacity="0.15"/>
  <path d="M380,20 L380,280" stroke="#B8860B" stroke-width="0.8" opacity="0.15"/>
  <path d="M50,80 L200,40 L350,80" fill="none" stroke="#B8860B" stroke-width="1" opacity="0.2"/>
  <rect x="100" y="60" width="8" height="40" fill="#B8860B" opacity="0.08"/>
  <rect x="146" y="50" width="8" height="50" fill="#B8860B" opacity="0.08"/>
  <rect x="246" y="50" width="8" height="50" fill="#B8860B" opacity="0.08"/>
  <rect x="292" y="60" width="8" height="40" fill="#B8860B" opacity="0.08"/>
  <text x="200" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#8B5E3C" opacity="0.7">Ahmed</text>
  <text x="200" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#B8860B" opacity="0.5">&amp;</text>
  <text x="200" y="192" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#8B5E3C" opacity="0.7">Fatima</text>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#A07040" opacity="0.35">Medina</text>
</svg>''')

# ── Luxe 1: Noir et Or ──
svg("lx-1.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#0A0A0A"/>
  <path d="M20,20 L30,20 L30,22 L22,22 L22,30 L20,30Z" fill="#C6A664" opacity="0.5"/>
  <path d="M380,20 L370,20 L370,22 L378,22 L378,30 L380,30Z" fill="#C6A664" opacity="0.5" transform="rotate(0,380,20)"/>
  <path d="M20,280 L30,280 L30,278 L22,278 L22,270 L20,270Z" fill="#C6A664" opacity="0.5"/>
  <path d="M380,280 L370,280 L370,278 L378,278 L378,270 L380,270Z" fill="#C6A664" opacity="0.5"/>
  <line x1="80" y1="150" x2="160" y2="150" stroke="#C6A664" stroke-width="0.5" opacity="0.3"/>
  <circle cx="200" cy="150" r="3" fill="#C6A664" opacity="0.4"/>
  <line x1="240" y1="150" x2="320" y2="150" stroke="#C6A664" stroke-width="0.5" opacity="0.3"/>
  <text x="200" y="120" text-anchor="middle" font-family="Georgia,serif" font-size="30" fill="#C6A664" opacity="0.65">Ahmed</text>
  <text x="200" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="30" fill="#C6A664" opacity="0.65">Fatima</text>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#C6A664" opacity="0.3">Noir et Or</text>
</svg>''')

# ── Luxe 2: Lella Beya ──
svg("lx-2.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#FFF8F0"/>
  <path d="M50,280 Q50,40 200,40 Q350,40 350,280" fill="none" stroke="#8B5E3C" stroke-width="1" opacity="0.25"/>
  <circle cx="200" cy="35" r="3" fill="#8B5E3C" opacity="0.25"/>
  <g opacity="0.06">
    <rect x="60" y="60" width="20" height="20" fill="none" stroke="#8B5E3C" stroke-width="0.5"/>
    <circle cx="70" cy="70" r="5" fill="none" stroke="#8B5E3C" stroke-width="0.3"/>
    <rect x="320" y="220" width="20" height="20" fill="none" stroke="#8B5E3C" stroke-width="0.5"/>
    <circle cx="330" cy="230" r="5" fill="none" stroke="#8B5E3C" stroke-width="0.3"/>
  </g>
  <text x="200" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#2C1810" opacity="0.65">Ahmed</text>
  <text x="200" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#8B5E3C" opacity="0.45">&amp;</text>
  <text x="200" y="178" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#2C1810" opacity="0.65">Fatima</text>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#8B5E3C" opacity="0.35">Lella Beya</text>
</svg>''')

# ── Luxe 3: Carthage Or ──
svg("lx-3.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#FDF6E3"/>
  <g opacity="0.2">
    <line x1="40" y1="0" x2="400" y2="0" stroke="#D4AF37" stroke-width="0.8"/>
    <line x1="40" y1="6" x2="400" y2="6" stroke="#D4AF37" stroke-width="0.5"/>
  </g>
  <g opacity="0.2">
    <line x1="0" y1="294" x2="360" y2="294" stroke="#D4AF37" stroke-width="0.5"/>
    <line x1="0" y1="300" x2="360" y2="300" stroke="#D4AF37" stroke-width="0.8"/>
  </g>
  <ellipse cx="200" cy="100" rx="22" ry="22" fill="none" stroke="#D4AF37" stroke-width="0.8" opacity="0.25"/>
  <text x="200" y="140" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#1A0F00" opacity="0.65">Ahmed</text>
  <text x="200" y="165" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#B8860B" opacity="0.45">&amp;</text>
  <text x="200" y="190" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#1A0F00" opacity="0.65">Fatima</text>
  <text x="200" y="255" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#B8860B" opacity="0.35">Carthage Or</text>
</svg>''')

print(f"\nDone! Generated 16 SVG thumbnails in {OUT}")
