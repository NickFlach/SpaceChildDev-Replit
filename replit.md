# SpaceChildDev - Agentic IDE with Robust Quality Engineering

## Overview
SpaceChildDev is a modern IDE focused on quality engineering, featuring AI-powered code assistance, test-driven development workflows, and a fleet of QE agents that automate testing tasks.

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
    pages/          - Route pages (Home)
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

## Design System
- **Fonts**: Inter (UI), JetBrains Mono (code)
- **TDD Colors**: Red (#dc3545), Green (#28a745), Refactor (#8b5cf6)
- **Agent Status**: Active (emerald), Idle (slate), Error (red)
- **Theme**: Dark-first with light mode toggle

## Running the Application
The application runs on port 5000 with `npm run dev`.

## Recent Changes
- Initial implementation of full IDE with QE dashboard
- AI Assistant with GPT-5 streaming support
- TDD workflow management
- Quality metrics radar chart
- Agent timeline visualization
- Learning patterns display

## User Preferences
- Dark mode default
- Monospace font for code
- Minimal animations
- Professional IDE aesthetic
