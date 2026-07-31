#!/usr/bin/env python3
"""Generate 16 beautiful SVG thumbnail previews for template catalogue."""

import os

OUT = "/home/z/my-project/public/templates"

# Template definitions: id, bg, text, accent, pattern_type
TEMPLATES = [
    ("cl-1", "#FBF7F2", "#8B2252", "#8B2252", "elegant"),
    ("cl-2", "#FFF5F8", "#D4859A", "#D4859A", "floral"),
    ("cl-3", "#F5F0EB", "#6B7B8D", "#8BAAC8", "aquarelle"),
    ("cl-4", "#F2E8D5", "#6B4226", "#C4A87C", "parchemin"),
    ("cl-5", "#FFFFFF", "#333333", "#999999", "minimal"),
    ("pr-1", "#1A1A2E", "#C6A664", "#C6A664", "griffon"),
    ("pr-2", "#F0F5E8", "#4A6B3A", "#D4859A", "jardin"),
    ("pr-3", "#0F1B2D", "#C8D8E8", "#A0B8D0", "nuit"),
    ("pr-4", "#F0EDE8", "#2A6B6B", "#1A8B8B", "mosaic"),
    ("pr-5", "#4A1942", "#E8D0E8", "#C6A0C8", "soie"),
    ("pr-6", "#F5E0D0", "#A0604A", "#D4956A", "sahara"),
    ("pr-7", "#EEF5F0", "#3A7B5A", "#5A9B7A", "oasis"),
    ("pr-8", "#F0E5D5", "#8B5E3C", "#B8860B", "medina"),
    ("lx-1", "#0A0A0A", "#C6A664", "#C6A664", "noir_or"),
    ("lx-2", "#FFF8F0", "#2C1810", "#8B5E3C", "lella"),
    ("lx-3", "#FDF6E3", "#1A0F00", "#D4AF37", "carthage"),
]

W, H = 400, 300

def svg_header(bg):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'

def svg_footer():
    return '</svg>'

def pattern_elegant(bg, text, accent):
    # Classic centered design with ornamental dividers
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Elegant border -->
  <rect x="20" y="20" width="{W-40}" height="{H-40}" rx="2" fill="none" stroke="{accent}" stroke-width="1" opacity="0.3"/>
  <!-- Ornamental lines -->
  <line x1="60" y1="100" x2="{W-60}" y2="100" stroke="{accent}" stroke-width="0.5" opacity="0.4"/>
  <line x1="60" y1="200" x2="{W-60}" y2="200" stroke="{accent}" stroke-width="0.5" opacity="0.4"/>
  <!-- Diamond divider -->
  <polygon points="{W//2},95 {W//2+8},100 {W//2},105 {W//2-8},100" fill="{accent}" opacity="0.3"/>
  <!-- Names -->
  <text x="{W//2}" y="135" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="300" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="158" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="{accent}" opacity="0.7">&amp;</text>
  <text x="{W//2}" y="180" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="300" fill="{text}">Fatima</text>
  <!-- Bottom diamond -->
  <polygon points="{W//2},195 {W//2+8},200 {W//2},205 {W//2-8},200" fill="{accent}" opacity="0.3"/>
  <!-- Date -->
  <text x="{W//2}" y="240" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.5">15 Juin 2025</text>
  <!-- Label -->
  <text x="{W//2}" y="270" text-anchor="middle" font-family="Georgia,serif" font-size="8" fill="{text}" opacity="0.3">ELEGANCE</text>'''

def pattern_floral(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Soft floral circles -->
  <circle cx="80" cy="60" r="30" fill="{accent}" opacity="0.06"/>
  <circle cx="{W-80}" cy="{H-60}" r="25" fill="{accent}" opacity="0.06"/>
  <circle cx="{W//2}" cy="50" r="15" fill="{accent}" opacity="0.08"/>
  <!-- Flower petals -->
  <g transform="translate({W//2},70)" opacity="0.15">
    <ellipse cx="0" cy="-10" rx="4" ry="8" fill="{accent}"/>
    <ellipse cx="8" cy="-4" rx="4" ry="8" fill="{accent}" transform="rotate(72)"/>
    <ellipse cx="5" cy="6" rx="4" ry="8" fill="{accent}" transform="rotate(144)"/>
    <ellipse cx="-5" cy="6" rx="4" ry="8" fill="{accent}" transform="rotate(216)"/>
    <ellipse cx="-8" cy="-4" rx="4" ry="8" fill="{accent}" transform="rotate(288)"/>
  </g>
  <!-- Names -->
  <text x="{W//2}" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-style="italic" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="175" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-style="italic" fill="{text}">Fatima</text>
  <!-- Date -->
  <text x="{W//2}" y="220" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.5">15 Juin 2025</text>
  <!-- More flowers -->
  <g transform="translate({W//2},260)" opacity="0.1">
    <ellipse cx="0" cy="-8" rx="3" ry="6" fill="{accent}"/>
    <ellipse cx="6" cy="-3" rx="3" ry="6" fill="{accent}" transform="rotate(72)"/>
    <ellipse cx="4" cy="5" rx="3" ry="6" fill="{accent}" transform="rotate(144)"/>
    <ellipse cx="-4" cy="5" rx="3" ry="6" fill="{accent}" transform="rotate(216)"/>
    <ellipse cx="-6" cy="-3" rx="3" ry="6" fill="{accent}" transform="rotate(288)"/>
  </g>'''

def pattern_aquarelle(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Watercolor blobs -->
  <ellipse cx="60" cy="80" rx="50" ry="35" fill="{accent}" opacity="0.08"/>
  <ellipse cx="{W-70}" cy="{H-70}" rx="45" ry="30" fill="{accent}" opacity="0.06"/>
  <ellipse cx="{W//2+60}" cy="120" rx="40" ry="50" fill="{text}" opacity="0.03"/>
  <!-- Soft washes -->
  <rect x="0" y="{H-60}" width="{W}" height="60" fill="{accent}" opacity="0.05" rx="2"/>
  <!-- Names - clean modern -->
  <text x="{W//2}" y="125" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" font-weight="300" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="148" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="172" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" font-weight="300" fill="{text}">Fatima</text>
  <!-- Date -->
  <text x="{W//2}" y="210" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>
  <!-- Thin line -->
  <line x1="{W//2-40}" y1="230" x2="{W//2+40}" y2="230" stroke="{accent}" stroke-width="0.5" opacity="0.3"/>'''

def pattern_parchemin(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Parchment texture lines -->
  {"".join(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}" stroke="{accent}" stroke-width="0.2" opacity="0.08"/>' for y in range(0, H, 12))}
  <!-- Aged edges -->
  <rect x="5" y="5" width="{W-10}" height="{H-10}" rx="0" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.2"/>
  <!-- Inner border -->
  <rect x="15" y="15" width="{W-30}" height="{H-30}" rx="0" fill="none" stroke="{accent}" stroke-width="0.5" opacity="0.15"/>
  <!-- Corner ornaments -->
  <path d="M20,30 Q20,20 30,20" fill="none" stroke="{accent}" stroke-width="1" opacity="0.3"/>
  <path d="M{W-20},30 Q{W-20},20 {W-30},20" fill="none" stroke="{accent}" stroke-width="1" opacity="0.3"/>
  <path d="M20,{H-30} Q20,{H-20} 30,{H-20}" fill="none" stroke="{accent}" stroke-width="1" opacity="0.3"/>
  <path d="M{W-20},{H-30} Q{W-20},{H-20} {W-30},{H-20}" fill="none" stroke="{accent}" stroke-width="1" opacity="0.3"/>
  <!-- Seal -->
  <circle cx="{W//2}" cy="75" r="20" fill="none" stroke="{accent}" stroke-width="0.5" opacity="0.2"/>
  <text x="{W//2}" y="80" text-anchor="middle" font-family="Georgia,serif" font-size="8" fill="{accent}" opacity="0.4">A &amp; F</text>
  <!-- Names -->
  <text x="{W//2}" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="175" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="{text}">Fatima</text>
  <text x="{W//2}" y="210" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="{text}" opacity="0.4">15 Juin 2025</text>'''

def pattern_minimal(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Single thin line -->
  <line x1="{W//2-30}" y1="110" x2="{W//2+30}" y2="110" stroke="{accent}" stroke-width="0.5"/>
  <!-- Names - very clean -->
  <text x="{W//2}" y="145" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="28" font-weight="100" fill="{text}" letter-spacing="4">AHMED</text>
  <text x="{W//2}" y="170" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="{accent}" letter-spacing="8">&amp;</text>
  <text x="{W//2}" y="195" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="28" font-weight="100" fill="{text}" letter-spacing="4">FATIMA</text>
  <!-- Single thin line -->
  <line x1="{W//2-30}" y1="215" x2="{W//2+30}" y2="215" stroke="{accent}" stroke-width="0.5"/>
  <!-- Date -->
  <text x="{W//2}" y="250" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="9" fill="{text}" opacity="0.35" letter-spacing="2">15 . 06 . 2025</text>'''

def pattern_griffon(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Gold radial glow -->
  <radialGradient id="glow" cx="50%" cy="40%"><stop offset="0%" stop-color="{accent}" stop-opacity="0.15"/><stop offset="100%" stop-color="{accent}" stop-opacity="0"/></radialGradient>
  <circle cx="{W//2}" cy="{H//2-20}" r="150" fill="url(#glow)"/>
  <!-- Art deco frame -->
  <rect x="25" y="25" width="{W-50}" height="{H-50}" fill="none" stroke="{accent}" stroke-width="1" opacity="0.25"/>
  <rect x="35" y="35" width="{W-70}" height="{H-70}" fill="none" stroke="{accent}" stroke-width="0.5" opacity="0.15"/>
  <!-- Corner accents -->
  <path d="M25,50 L25,25 L50,25" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.4"/>
  <path d="M{W-25},50 L{W-25},25 L{W-50},25" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.4"/>
  <path d="M25,{H-50} L25,{H-25} L50,{H-25}" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.4"/>
  <path d="M{W-25},{H-50} L{W-25},{H-25} L{W-50},{H-25}" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.4"/>
  <!-- Griffin crown icon (simplified) -->
  <text x="{W//2}" y="85" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="{accent}" opacity="0.6">&#9813;</text>
  <!-- Names -->
  <text x="{W//2}" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="300" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="180" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="300" fill="{text}">Fatima</text>
  <!-- Date -->
  <text x="{W//2}" y="225" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>
  <!-- Star divider -->
  <text x="{W//2}" y="250" text-anchor="middle" font-family="Georgia,serif" font-size="8" fill="{accent}" opacity="0.3">&#10045;</text>'''

def pattern_jardin(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Garden leaves -->
  <g opacity="0.12">
    <path d="M0,0 Q30,40 60,20 Q40,60 0,{H}" fill="{text}"/>
    <path d="M{W},0 Q{W-40},50 {W-60},30 Q{W-30},70 {W},{H}" fill="{text}"/>
  </g>
  <!-- Branch -->
  <path d="M{W//2-80},40 Q{W//2},100 {W//2+80},40" fill="none" stroke="{text}" stroke-width="0.8" opacity="0.15"/>
  <!-- Small flowers on branch -->
  <circle cx="{W//2-40}" cy="55" r="3" fill="{accent}" opacity="0.2"/>
  <circle cx="{W//2}" cy="50" r="3" fill="{accent}" opacity="0.25"/>
  <circle cx="{W//2+40}" cy="55" r="3" fill="{accent}" opacity="0.2"/>
  <!-- Names -->
  <text x="{W//2}" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-style="italic" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="153" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="175" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-style="italic" fill="{text}">Fatima</text>
  <!-- Date -->
  <text x="{W//2}" y="215" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>
  <!-- Bottom branch -->
  <path d="M{W//2-60},{H-40} Q{W//2},{H-70} {W//2+60},{H-40}" fill="none" stroke="{text}" stroke-width="0.8" opacity="0.15"/>'''

def pattern_nuit(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Stars -->
  {"".join(f'<circle cx="{x}" cy="{y}" r="{0.8 if i%3 else 1.2}" fill="{accent}" opacity="{0.2+i%4*0.1}"/>' for i,(x,y) in enumerate([(40,30),(80,55),(120,20),(180,40),(220,25),(260,50),(310,35),(350,20),(60,70),(150,65),(250,60),(330,75),(100,85),(200,80),(W-50,45)]))}
  <!-- Moon crescent -->
  <circle cx="{W-60}" cy="50" r="18" fill="{accent}" opacity="0.1"/>
  <circle cx="{W-52}" cy="46" r="15" fill="{bg}"/>
  <!-- Names -->
  <text x="{W//2}" y="135" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="24" font-weight="200" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="160" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="185" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="24" font-weight="200" fill="{text}">Fatima</text>
  <!-- Date -->
  <text x="{W//2}" y="230" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>
  <!-- Shooting star -->
  <line x1="50" y1="{H-50}" x2="90" y2="{H-60}" stroke="{accent}" stroke-width="0.5" opacity="0.3"/>'''

def pattern_mosaic(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Tunisian mosaic pattern top -->
  <g opacity="0.08">
    <rect x="20" y="20" width="30" height="30" fill="{accent}" transform="rotate(45,35,35)"/>
    <rect x="70" y="20" width="30" height="30" fill="{accent}" transform="rotate(45,85,35)"/>
    <rect x="120" y="20" width="30" height="30" fill="{accent}" transform="rotate(45,135,35)"/>
    <rect x="{W-120}" y="20" width="30" height="30" fill="{accent}" transform="rotate(45,{W-105},35)"/>
    <rect x="{W-70}" y="20" width="30" height="30" fill="{accent}" transform="rotate(45,{W-55},35)"/>
    <rect x="{W-20}" y="20" width="30" height="30" fill="{accent}" transform="rotate(45,{W-5},35)"/>
  </g>
  <!-- Mosaic border bottom -->
  <g opacity="0.06">
    <rect x="20" y="{H-50}" width="30" height="30" fill="{accent}" transform="rotate(45,35,{H-35})"/>
    <rect x="70" y="{H-50}" width="30" height="30" fill="{accent}" transform="rotate(45,85,{H-35})"/>
    <rect x="{W-70}" y="{H-50}" width="30" height="30" fill="{accent}" transform="rotate(45,{W-55},{H-35})"/>
    <rect x="{W-20}" y="{H-50}" width="30" height="30" fill="{accent}" transform="rotate(45,{W-5},{H-35})"/>
  </g>
  <!-- Tile border -->
  <rect x="15" y="15" width="{W-30}" height="{H-30}" fill="none" stroke="{accent}" stroke-width="1" opacity="0.15" stroke-dasharray="4,4"/>
  <!-- Names -->
  <text x="{W//2}" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="178" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="{text}">Fatima</text>
  <!-- Date -->
  <text x="{W//2}" y="220" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>'''

def pattern_soie(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Velvet gradient overlay -->
  <rect width="{W}" height="{H}" fill="url(#velvet)" opacity="0.3"/>
  <defs><linearGradient id="velvet" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="{accent}" stop-opacity="0.15"/><stop offset="50%" stop-color="{bg}" stop-opacity="0"/><stop offset="100%" stop-color="{accent}" stop-opacity="0.1"/></linearGradient></defs>
  <!-- Silk ribbon -->
  <path d="M{W//2-80},60 Q{W//2},40 {W//2+80},60" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.2"/>
  <path d="M{W//2-60},70 Q{W//2},55 {W//2+60},70" fill="none" stroke="{accent}" stroke-width="0.5" opacity="0.15"/>
  <!-- Names -->
  <text x="{W//2}" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-style="italic" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="178" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-style="italic" fill="{text}">Fatima</text>
  <!-- Silk ribbon bottom -->
  <path d="M{W//2-80},{H-60} Q{W//2},{H-40} {W//2+80},{H-60}" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.2"/>
  <!-- Date -->
  <text x="{W//2}" y="220" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>'''

def pattern_sahara(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Desert dunes -->
  <path d="M0,{H-40} Q{W//4},{H-70} {W//2},{H-50} Q{3*W//4},{H-30} {W},{H-55} L{W},{H} L0,{H}Z" fill="{accent}" opacity="0.08"/>
  <path d="M0,{H-25} Q{W//3},{H-45} {2*W//3},{H-30} Q{5*W//6},{H-15} {W},{H-35} L{W},{H} L0,{H}Z" fill="{accent}" opacity="0.06"/>
  <!-- Sun -->
  <circle cx="{W-70}" cy="55" r="20" fill="{accent}" opacity="0.12"/>
  <circle cx="{W-70}" cy="55" r="14" fill="{accent}" opacity="0.08"/>
  <!-- Names -->
  <text x="{W//2}" y="125" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="150" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="175" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="{text}">Fatima</text>
  <!-- Date -->
  <text x="{W//2}" y="210" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>'''

def pattern_oasis(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Palm leaves -->
  <g opacity="0.1">
    <path d="M{W-40},0 Q{W-60},40 {W-30},70" fill="{text}" stroke="none"/>
    <path d="M{W-20},0 Q{W-40},35 {W-15},65" fill="{text}" stroke="none"/>
    <path d="M{W-55},5 Q{W-75},40 {W-50},65" fill="{text}" stroke="none"/>
  </g>
  <g opacity="0.08">
    <path d="M40,0 Q20,40 45,70" fill="{text}" stroke="none"/>
    <path d="M60,5 Q35,35 55,65" fill="{text}" stroke="none"/>
  </g>
  <!-- Water line -->
  <path d="M0,{H-30} Q{W//2},{H-45} {W},{H-30}" fill="none" stroke="{accent}" stroke-width="0.8" opacity="0.15"/>
  <path d="M0,{H-22} Q{W//2},{H-37} {W},{H-22}" fill="none" stroke="{accent}" stroke-width="0.5" opacity="0.1"/>
  <!-- Names -->
  <text x="{W//2}" y="130" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" font-weight="300" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="155" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="178" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" font-weight="300" fill="{text}">Fatima</text>
  <text x="{W//2}" y="215" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>'''

def pattern_medina(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Arch shape (Islamic arch) -->
  <path d="M{W//2-100},{H} L{W//2-100},110 Q{W//2-100},40 {W//2},40 Q{W//2+100},40 {W//2+100},110 L{W//2+100},{H}" fill="none" stroke="{accent}" stroke-width="1" opacity="0.15"/>
  <!-- Inner arch -->
  <path d="M{W//2-85},{H} L{W//2-85},115 Q{W//2-85},55 {W//2},55 Q{W//2+85},55 {W//2+85},115 L{W//2+85},{H}" fill="none" stroke="{accent}" stroke-width="0.5" opacity="0.1"/>
  <!-- Geometric star -->
  <g transform="translate({W//2},90)" opacity="0.12">
    <polygon points="0,-12 3,-4 12,-4 5,2 7,10 0,5 -7,10 -5,2 -12,-4 -3,-4" fill="{accent}"/>
  </g>
  <!-- Names -->
  <text x="{W//2}" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="190" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="{text}">Fatima</text>
  <text x="{W//2}" y="225" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>'''

def pattern_noir_or(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Art deco gold frame -->
  <rect x="20" y="20" width="{W-40}" height="{H-40}" fill="none" stroke="{accent}" stroke-width="1.5" opacity="0.4"/>
  <rect x="30" y="30" width="{W-60}" height="{H-60}" fill="none" stroke="{accent}" stroke-width="0.5" opacity="0.2"/>
  <!-- Art deco corners -->
  <g stroke="{accent}" stroke-width="2" opacity="0.5" fill="none">
    <path d="M20,50 L20,20 L50,20"/>
    <path d="M{W-20},50 L{W-20},20 L{W-50},20"/>
    <path d="M20,{H-50} L20,{H-20} L50,{H-20}"/>
    <path d="M{W-20},{H-50} L{W-20},{H-20} L{W-50},{H-20}"/>
  </g>
  <!-- Fan/sunburst at top -->
  <g transform="translate({W//2},55)" opacity="0.2">
    <line x1="0" y1="0" x2="-30" y2="-20" stroke="{accent}" stroke-width="0.5"/>
    <line x1="0" y1="0" x2="-15" y2="-25" stroke="{accent}" stroke-width="0.5"/>
    <line x1="0" y1="0" x2="0" y2="-27" stroke="{accent}" stroke-width="0.5"/>
    <line x1="0" y1="0" x2="15" y2="-25" stroke="{accent}" stroke-width="0.5"/>
    <line x1="0" y1="0" x2="30" y2="-20" stroke="{accent}" stroke-width="0.5"/>
  </g>
  <!-- Chevron divider -->
  <path d="M{W//2-20},195 L{W//2},205 L{W//2+20},195" fill="none" stroke="{accent}" stroke-width="0.8" opacity="0.3"/>
  <!-- Names -->
  <text x="{W//2}" y="120" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-weight="200" fill="{text}" letter-spacing="3">AHMED</text>
  <text x="{W//2}" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{accent}" letter-spacing="6">&amp;</text>
  <text x="{W//2}" y="175" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-weight="200" fill="{text}" letter-spacing="3">FATIMA</text>
  <text x="{W//2}" y="240" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.35">15 JUIN 2025</text>'''

def pattern_lella(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Ottoman arch -->
  <path d="M{W//2-120},{H} L{W//2-120},100 Q{W//2-120},20 {W//2},20 Q{W//2+120},20 {W//2+120},100 L{W//2+120},{H}" fill="none" stroke="{accent}" stroke-width="1.2" opacity="0.15"/>
  <!-- Inner arch -->
  <path d="M{W//2-105},{H} L{W//2-105},105 Q{W//2-105},35 {W//2},35 Q{W//2+105},35 {W//2+105},105 L{W//2+105},{H}" fill="none" stroke="{accent}" stroke-width="0.5" opacity="0.08"/>
  <!-- Ottoman tile pattern -->
  <g opacity="0.06">
    <circle cx="{W//2}" cy="65" r="15" fill="{accent}"/>
    <circle cx="{W//2-25}" cy="65" r="10" fill="{accent}"/>
    <circle cx="{W//2+25}" cy="65" r="10" fill="{accent}"/>
  </g>
  <!-- Arabic bismillah hint -->
  <text x="{W//2}" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{accent}" opacity="0.25">بسم الله الرحمن الرحيم</text>
  <!-- Names -->
  <text x="{W//2}" y="135" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="158" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="180" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="{text}">Fatima</text>
  <text x="{W//2}" y="220" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>
  <!-- Ottoman bottom ornament -->
  <g opacity="0.08" transform="translate({W//2},{H-30})">
    <circle cx="0" cy="0" r="5" fill="{accent}"/>
    <line x1="-20" y1="0" x2="20" y2="0" stroke="{accent}" stroke-width="0.5"/>
  </g>'''

def pattern_carthage(bg, text, accent):
    return f'''
  <rect width="{W}" height="{H}" fill="{bg}"/>
  <!-- Gold gradient -->
  <defs><linearGradient id="carthage-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="{accent}" stop-opacity="0.1"/><stop offset="100%" stop-color="{accent}" stop-opacity="0.02"/></linearGradient></defs>
  <rect width="{W}" height="{H}" fill="url(#carthage-gold)"/>
  <!-- Carthaginian columns -->
  <g opacity="0.1">
    <rect x="{W//2-60}" y="30" width="8" height="50" fill="{accent}" rx="2"/>
    <rect x="{W//2-14}" y="30" width="8" height="50" fill="{accent}" rx="2"/>
    <rect x="{W//2+32}" y="30" width="8" height="50" fill="{accent}" rx="2"/>
    <!-- Capitals -->
    <rect x="{W//2-65}" y="27" width="18" height="5" fill="{accent}" rx="1"/>
    <rect x="{W//2-19}" y="27" width="18" height="5" fill="{accent}" rx="1"/>
    <rect x="{W//2+27}" y="27" width="18" height="5" fill="{accent}" rx="1"/>
    <!-- Base -->
    <rect x="{W//2-70}" y="78" width="18" height="4" fill="{accent}" rx="1"/>
    <rect x="{W//2-24}" y="78" width="18" height="4" fill="{accent}" rx="1"/>
    <rect x="{W//2+22}" y="78" width="18" height="4" fill="{accent}" rx="1"/>
  </g>
  <!-- Wreath -->
  <ellipse cx="{W//2}" cy="{H//2+20}" rx="80" ry="60" fill="none" stroke="{accent}" stroke-width="0.8" opacity="0.12"/>
  <!-- Names -->
  <text x="{W//2}" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="300" fill="{text}">Ahmed</text>
  <text x="{W//2}" y="157" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="{accent}">&amp;</text>
  <text x="{W//2}" y="182" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="300" fill="{text}">Fatima</text>
  <!-- Date -->
  <text x="{W//2}" y="225" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="{text}" opacity="0.4">15 Juin 2025</text>
  <!-- Laurel bottom -->
  <g opacity="0.1">
    <path d="M{W//2-30},{H-35} Q{W//2-15},{H-50} {W//2},{H-40}" fill="{accent}"/>
    <path d="M{W//2+30},{H-35} Q{W//2+15},{H-50} {W//2},{H-40}" fill="{accent}"/>
  </g>'''

PATTERNS = {
    "elegant": pattern_elegant,
    "floral": pattern_floral,
    "aquarelle": pattern_aquarelle,
    "parchemin": pattern_parchemin,
    "minimal": pattern_minimal,
    "griffon": pattern_griffon,
    "jardin": pattern_jardin,
    "nuit": pattern_nuit,
    "mosaic": pattern_mosaic,
    "soie": pattern_soie,
    "sahara": pattern_sahara,
    "oasis": pattern_oasis,
    "medina": pattern_medina,
    "noir_or": pattern_noir_or,
    "lella": pattern_lella,
    "carthage": pattern_carthage,
}

for tid, bg, text, accent, pat in TEMPLATES:
    svg = svg_header(bg) + "\n" + PATTERNS[pat](bg, text, accent) + "\n" + svg_footer()
    with open(os.path.join(OUT, f"{tid}.svg"), "w") as f:
        f.write(svg)
    print(f"  Created {tid}.svg")

print("Done! 16 thumbnails generated.")
