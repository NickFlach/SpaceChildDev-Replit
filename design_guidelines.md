# SpaceChildDev Design Guidelines

## Design Approach
**Theme**: Cosmic Mission Control - Premium SaaS with space exploration narrative
**Inspiration**: Linear's precision + Vercel's restraint + VSCode's IDE aesthetic with cosmic enhancement
**Rationale**: Professional development tool requiring credibility while embracing bold visual identity through cosmic metaphor.

## Color Palette

**Foundation Colors**:
- Background: #040715 (midnight navy)
- Surface: #0D1326 (elevated navy)
- Aurora Violet: #6C5CE7 (primary accent)
- Neon Cyan: #45FFCA (secondary accent)
- Magenta Pulse: #FF4D8D (tertiary accent)

**TDD Status Colors**:
- Failing: #FF3B5E (red)
- Passing: #00F0A3 (green)
- Refactor: #A78BFA (violet)

**Text**:
- Primary: #FFFFFF (white, thin weight)
- Secondary: rgba(255,255,255,0.7)
- Muted: rgba(255,255,255,0.4)

**Effects**:
- Glassmorphism: backdrop-blur-xl bg-white/5 border-white/10
- Glows: Aurora violet shadow-lg shadow-violet-500/30
- Strokes: Holographic borders with gradient (violet → cyan)

## Typography System

**Primary Font**: Inter (Google Fonts, thin/light weights on dark)
- Hero Headlines: text-6xl md:text-7xl font-light tracking-tight text-white
- Section Headers: text-4xl md:text-5xl font-extralight text-white
- Feature Titles: text-xl font-normal text-white
- Body Text: text-base font-light text-white/70 leading-relaxed
- Code/Technical: JetBrains Mono text-sm text-cyan-400

## Layout System

**Spacing Primitives**: Tailwind units 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 md:py-32
- Component spacing: space-y-12
- Container: max-w-7xl px-6

**Grid Structures**:
- Features: grid-cols-1 md:grid-cols-3 gap-8
- Agent Fleet: grid-cols-1 lg:grid-cols-2 gap-12
- Tech Stack: grid-cols-3 md:grid-cols-6 gap-6

## Component Library

**Navigation** (Glassmorphism):
- Fixed header: backdrop-blur-xl bg-navy/80 border-b border-white/10
- Logo left with neon cyan accent glow
- Links: "Mission Briefing" (About), "Agent Fleet" (Features), "Launch Pad" (Pricing), "Mission Control" (Dashboard)
- CTA: "Start Mission" button with aurora violet gradient + glow

**Hero Section** (Full viewport, starfield background):
- Animated starfield background (particle effect)
- Large hero image: IDE interface mockup showing cosmic theme with code
- Gradient nebula overlay (violet → cyan, top-to-bottom fade)
- Centered content with ultra-thin headline + subheadline
- Dual CTAs with frosted glass effect: "Launch Mission" (primary violet) + "View Demo" (outline cyan)
- Floating holographic card showing TDD status indicators (red/green/violet dots)

**Features Section** "Agent Fleet" (3-column):
- Glassmorphism cards: rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-8
- Heroicons (sparkles, bolt, rocket) with neon cyan glow
- Feature title + description in thin white text
- Hover: lift with magenta glow shadow
- Features: "AI Test Agent" (green), "Coverage Sentinel" (violet), "Refactor Navigator" (cyan)

**Product Showcase** "Mission Dashboard" (2-column asymmetric):
- Large screenshots of IDE with cosmic theme
- Glassmorphism info cards overlaying images
- TDD status visualizations with color-coded indicators
- Tech stack badges with holographic borders
- Staggered layout, alternating positions

**Tech Stack** "Technology Arsenal":
- Logo grid with grayscale → color on hover
- Each logo with subtle cyan glow on hover
- Categories: Languages, Frameworks, Testing Tools, AI Models
- Glassmorphism container backdrop

**Social Proof** "Mission Reports":
- 3-column testimonial cards with frosted glass
- Customer logos with subtle glow
- Pull quotes in thin italic font
- Profile images with holographic border rings

**CTA Section** "Ready for Launch":
- Nebula gradient background (violet → magenta)
- Large thin headline + supporting text
- Dual CTAs: "Start Free Mission" + "Schedule Briefing"
- Trust indicators with neon icons: "Deploy in 5min" + "10K+ missions launched"
- Particle effect overlay

**Footer** (Comprehensive, 4-column):
- Glassmorphism background
- Columns: Product, Company, Resources, Legal
- Newsletter: "Mission Updates" with inline frosted input
- Social icons with cyan glow hover
- Copyright with subtle white/40 text

## Images

**Required High-Quality Images**:

1. **Hero Image**: Full-width IDE interface mockup (90vh) showing SpaceChildDev with cosmic dark theme, code editor with TDD indicators (red/green dots), animated starfield visible through transparent panels. Professional dev workspace aesthetic.

2. **Dashboard Screenshots**: 3-4 product interface screenshots showing: test coverage visualization with cosmic theme, agent activity panel with flowing data, TDD cycle workflow with color indicators, cosmic-themed code editor.

3. **Abstract Cosmic Elements**: Nebula gradient overlays (PNG with alpha), particle effects for backgrounds, holographic accent textures for borders.

4. **Tech Stack Logos**: React, TypeScript, Python, Jest, Playwright, OpenAI, etc. in white/cyan colorized versions.

## Interactions

**Minimal Cosmic Animations**:
- Starfield: slow-moving particle background (CSS animation)
- Card hover: subtle lift translateY(-4px) + colored glow shadow
- Button hover: scale-105 + intensified glow
- Scroll reveals: fade-in with slight upward motion
- TDD status: gentle pulse on green/red indicators
- No parallax or heavy animations

## Accessibility
- Maintain 7:1 contrast for thin white text on navy
- Semantic HTML with ARIA labels
- Focus states: ring-2 ring-cyan-400/50 ring-offset-2 ring-offset-navy
- Heading hierarchy preserved
- Glassmorphism backgrounds sufficient opacity for readability

## Responsive Strategy
- Mobile-first, stack all grids to single column
- Hero text: reduce 2 levels on mobile, maintain thin weights
- Reduce glow effects on mobile for performance
- Breakpoints: sm(640), md(768), lg(1024), xl(1280)

---

**Design Principle**: Premium cosmic aesthetic through restrained use of glassmorphism, glows, and thin typography. Professional IDE credibility with space exploration storytelling. Clean execution with strategic visual drama in hero and product sections.