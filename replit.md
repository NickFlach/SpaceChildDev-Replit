# SpaceChildDev - Agentic IDE with Robust Quality Engineering

## Overview
SpaceChildDev is a modern IDE focused on quality engineering, featuring AI-powered code assistance, test-driven development workflows, and a fleet of QE agents that automate testing tasks. The application now features a premium "Mission Control" cosmic-themed UI/UX with an epic landing page, dedicated authentication experience, and Space Child Auth integration for SSO.

## Features
- **31 QE Agents**: Automated testing, security scanning, performance analysis, accessibility auditing
- **41 QE Skills**: TDD, BDD, mutation testing, chaos engineering, and more
- **Self-Learning System**: Q-Learning algorithm that improves test pattern accuracy over time
- **Multi-Model AI Router**: GPT-5 powered assistant with 75%+ cost savings
- **Real-time Visualizations**: Quality Radar charts, agent timeline, learning metrics

## Tech Stack
- **Frontend**: React 18, TypeScript, TailwindCSS, Shadcn/UI, Recharts
- **Backend**: Express.js, Node.js
- **AI**: OpenAI GPT-5 via Replit AI Integrations
- **Database**: PostgreSQL (available for future persistence)
- **Storage**: In-memory storage for MVP (MemStorage)

## Routes
- `/` - Epic landing page with hero section, feature showcase, and CTAs
- `/auth` - Dedicated authentication page with SSO integration
- `/ide` - Full IDE interface with file explorer, editor, terminal, AI assistant
- `/verify-email` - Email verification callback
- `/reset-password` - Password reset page
- `/sso/callback` - SSO authentication callback

## Project Structure
```
client/
  src/
    components/
      AI/           - AI Assistant chat interface
      IDE/          - Code editor, file explorer, terminal
      Layout/       - Header, activity bar, status bar
      QE/           - Quality engineering dashboard, agents, metrics
      ui/           - Shadcn UI components
    lib/            - Utilities, mock data, query client
    pages/          - Route pages (Landing, Auth, Home/IDE)
server/
  routes.ts         - API endpoints
  storage.ts        - In-memory data storage
  index.ts          - Express server setup
shared/
  schema.ts         - Zod schemas and types
  models/           - Chat conversation models
```

## API Endpoints
- `GET /api/agents` - List all QE agents
- `POST /api/agents/:id/execute` - Execute an agent
- `POST /api/agents/:id/stop` - Stop an agent
- `GET /api/qe/skills` - List QE skills
- `GET /api/qe/metrics` - Get quality metrics
- `GET /api/tdd/session` - Get current TDD session
- `POST /api/tdd/start` - Start TDD workflow
- `POST /api/tdd/:phase` - Update TDD phase
- `GET /api/tasks` - Get agent tasks
- `GET /api/learning/patterns` - Get learning patterns
- `POST /api/chat` - AI chat with streaming

## Design System - Cosmic "Mission Control" Theme

### Color Palette
- **Midnight Navy**: #040715 (background)
- **Aurora Violet**: #6C5CE7 (primary accent)
- **Neon Cyan**: #45FFCA (secondary accent)
- **Magenta Pulse**: #FF4D8D (tertiary accent)

### TDD Status Colors
- **Red (Failing)**: #FF3B5E
- **Green (Passing)**: #00F0A3
- **Violet (Refactor)**: #A78BFA

### Typography
- **Fonts**: Inter (UI), JetBrains Mono (code)
- **Hero Headlines**: font-light tracking-tight
- **Body Text**: font-light text-white/70

### Visual Effects
- **Glassmorphism**: backdrop-blur-xl bg-white/5 border-white/10
- **Starfield**: Animated particle background
- **Glows**: glow-violet, glow-cyan, glow-magenta utilities
- **Gradient Text**: text-gradient, text-gradient-warm classes

## Running the Application
The application runs on port 5000 with `npm run dev`.

## Recent Changes
- Comprehensive UI/UX redesign with "Mission Control" cosmic theme
- Created epic landing page (/) with starfield animation, hero section, and glassmorphism design
- Built dedicated auth page (/auth) with split-panel layout and SSO integration
- Updated design system with midnight navy, aurora violet, neon cyan, and magenta palette
- Implemented glassmorphism effects, glow utilities, gradient text, and cosmic animations
- Added custom CSS utilities for starfield, glass, and glow effects
- All routes verified working: /, /auth, /ide, plus verification pages

## User Preferences
- Dark mode default
- Monospace font for code
- Minimal animations
- Professional IDE aesthetic
- Space exploration narrative ("Launch Mission", "Agent Fleet", "Mission Control")
