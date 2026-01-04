# SpaceChildDev Design Guidelines

## Design Approach
**System Selected**: Hybrid approach combining Linear's precision with Vercel's modern restraint and Stripe's sophisticated balance.

**Rationale**: Tech/development project requiring professional credibility while maintaining visual impact and modern aesthetic.

## Typography System

**Primary Font**: Inter (Google Fonts)
- Hero Headlines: text-6xl/text-7xl, font-bold, tracking-tight
- Section Headers: text-4xl/text-5xl, font-semibold
- Subheadings: text-2xl/text-3xl, font-medium
- Body Text: text-base/text-lg, font-normal, leading-relaxed
- Code/Technical: JetBrains Mono, text-sm

**Secondary Font**: None - maintain single-family consistency

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section vertical padding: py-20 (desktop), py-12 (mobile)
- Component spacing: space-y-8 to space-y-12
- Container max-widths: max-w-7xl with px-6

**Grid Structure**:
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-8
- Case Studies/Projects: grid-cols-1 lg:grid-cols-2, gap-12
- Tech Stack: grid-cols-2 md:grid-cols-4 lg:grid-cols-6, gap-6

## Component Library

**Navigation**:
- Fixed header with backdrop-blur-lg
- Logo left, navigation links center, CTA button right
- Mobile: Hamburger menu with slide-in drawer
- Include: Docs, Projects, About, Contact, GitHub link

**Hero Section** (Full viewport impact):
- Large hero image showing development workspace/code environment
- Overlay with gradient (top-to-bottom fade)
- Centered content with headline + subheadline + dual CTAs
- Floating code snippet card or terminal window as visual accent
- Buttons with backdrop-blur-md bg-white/10 border-white/20

**Features Section** (3-column grid):
- Icon (Heroicons via CDN - code, lightning, rocket themes)
- Feature title (text-xl font-semibold)
- Description (text-base text-gray-600)
- Each card: rounded-2xl border p-8 hover:shadow-xl transition

**Project Showcase** (2-column asymmetric):
- Large project thumbnail images
- Project title + tech stack tags
- Brief description + "View Project" link
- Staggered layout with alternating image/content positions

**Tech Stack Display**:
- Logo grid with grayscale filter, color on hover
- Technology name below each logo
- Organized by category (Frontend, Backend, Tools)

**Testimonials/Social Proof**:
- 3-column grid with client logos
- Pull quotes with attribution
- Profile images for testimonials

**CTA Section** (Rich, contextual):
- Background: Subtle gradient or pattern
- Primary headline + supporting text
- Dual CTAs: "Start Project" + "Schedule Call"
- Trust indicators: "Response within 24h" + client count

**Footer** (Comprehensive):
- 4-column layout: About, Services, Resources, Contact
- Newsletter signup with inline form
- Social media icons
- Copyright + links (Privacy, Terms)

## Images

**Required Images**:
1. **Hero Image**: Large, high-quality image of modern development workspace with multiple monitors showing code, ambient lighting. Full-width, 90vh height.
2. **Project Thumbnails**: 4-6 project showcase images showing web applications, dashboards, or digital products. High-fidelity mockups preferred.
3. **Team/About Photo**: Professional developer workspace or headshot for personal branding.
4. **Tech Stack Logos**: React, Next.js, TypeScript, Node.js, Tailwind CSS, etc. (use actual logo images).

## Interactions

**Minimal Animations**:
- Smooth scroll behavior
- Card hover: subtle lift (translateY(-4px)) + shadow
- Button hover: slight scale (scale-105)
- Page transitions: fade-in on scroll for sections
- No complex animations or parallax effects

## Accessibility
- Semantic HTML throughout
- Proper heading hierarchy (h1 → h6)
- ARIA labels for icon-only buttons
- Focus states: ring-2 ring-offset-2 ring-blue-500
- Minimum contrast ratio 4.5:1 for text

## Responsive Breakpoints
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Stack all multi-column layouts to single column on mobile
- Reduce hero text sizes by 2 levels on mobile

---

**Design Principle**: Professional credibility through clean execution, strategic visual impact in hero and project sections, comprehensive information architecture with breathing room.