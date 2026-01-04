import type { QEAgent, QESkill, ProjectFile, QualityMetrics, AgentTask, LearningPattern, TDDSession } from "@shared/schema";

export const mockAgents: QEAgent[] = [
  { id: "1", name: "Test Generator", type: "main", category: "Testing", description: "Generates comprehensive test suites", status: "idle", skills: ["unit-testing", "integration-testing"], successRate: 94 },
  { id: "2", name: "Coverage Analyzer", type: "main", category: "Analysis", description: "Analyzes code coverage metrics", status: "running", skills: ["coverage-analysis", "gap-detection"], successRate: 97 },
  { id: "3", name: "Security Scanner", type: "main", category: "Security", description: "Scans for security vulnerabilities", status: "idle", skills: ["vulnerability-scan", "dependency-audit"], successRate: 91 },
  { id: "4", name: "Performance Tester", type: "main", category: "Performance", description: "Runs performance benchmarks", status: "completed", skills: ["load-testing", "profiling"], successRate: 88 },
  { id: "5", name: "Accessibility Auditor", type: "main", category: "Accessibility", description: "Checks WCAG compliance", status: "idle", skills: ["wcag-audit", "aria-check"], successRate: 95 },
  { id: "6", name: "Mutation Tester", type: "main", category: "Testing", description: "Validates test effectiveness", status: "idle", skills: ["mutation-testing"], successRate: 86 },
  { id: "7", name: "API Contract Validator", type: "main", category: "Integration", description: "Validates API contracts", status: "idle", skills: ["contract-testing", "schema-validation"], successRate: 92 },
  { id: "8", name: "Visual Regression", type: "main", category: "UI", description: "Detects visual changes", status: "idle", skills: ["screenshot-comparison", "pixel-diff"], successRate: 89 },
  { id: "9", name: "RED Phase Agent", type: "tdd", category: "TDD", description: "Writes failing tests first", status: "idle", skills: ["test-first", "requirements-analysis"], successRate: 93 },
  { id: "10", name: "GREEN Phase Agent", type: "tdd", category: "TDD", description: "Implements minimal code to pass", status: "idle", skills: ["implementation", "minimal-code"], successRate: 91 },
  { id: "11", name: "REFACTOR Agent", type: "tdd", category: "TDD", description: "Improves code quality", status: "idle", skills: ["refactoring", "code-cleanup"], successRate: 94 },
  { id: "12", name: "Flaky Test Detector", type: "main", category: "Reliability", description: "Identifies flaky tests", status: "idle", skills: ["flaky-detection", "test-stability"], successRate: 90 },
  { id: "13", name: "Code Smell Detector", type: "main", category: "Quality", description: "Finds code smells", status: "idle", skills: ["smell-detection", "anti-patterns"], successRate: 87 },
  { id: "14", name: "Complexity Analyzer", type: "main", category: "Analysis", description: "Measures cyclomatic complexity", status: "idle", skills: ["complexity-analysis"], successRate: 96 },
  { id: "15", name: "Documentation Generator", type: "main", category: "Documentation", description: "Generates test documentation", status: "idle", skills: ["doc-generation"], successRate: 85 },
];

export const mockSkills: QESkill[] = [
  { id: "1", name: "Test-Driven Development", category: "Methodology", description: "RED-GREEN-REFACTOR workflow", complexity: "high" },
  { id: "2", name: "Behavior-Driven Development", category: "Methodology", description: "Given-When-Then specifications", complexity: "high" },
  { id: "3", name: "Unit Testing", category: "Testing", description: "Isolated component testing", complexity: "low" },
  { id: "4", name: "Integration Testing", category: "Testing", description: "Component interaction testing", complexity: "medium" },
  { id: "5", name: "End-to-End Testing", category: "Testing", description: "Full workflow testing", complexity: "high" },
  { id: "6", name: "Mutation Testing", category: "Testing", description: "Test effectiveness validation", complexity: "high" },
  { id: "7", name: "Chaos Engineering", category: "Reliability", description: "Failure injection testing", complexity: "high" },
  { id: "8", name: "Contract Testing", category: "Integration", description: "API contract validation", complexity: "medium" },
  { id: "9", name: "Visual Regression", category: "UI", description: "Screenshot comparison", complexity: "medium" },
  { id: "10", name: "Performance Profiling", category: "Performance", description: "Runtime analysis", complexity: "high" },
  { id: "11", name: "Load Testing", category: "Performance", description: "Stress and load testing", complexity: "high" },
  { id: "12", name: "Security Scanning", category: "Security", description: "Vulnerability detection", complexity: "high" },
  { id: "13", name: "Accessibility Auditing", category: "Accessibility", description: "WCAG compliance", complexity: "medium" },
  { id: "14", name: "Code Coverage", category: "Analysis", description: "Coverage measurement", complexity: "low" },
  { id: "15", name: "Flaky Test Detection", category: "Reliability", description: "ML-powered detection", complexity: "high" },
];

export const mockFileTree: ProjectFile = {
  id: "root",
  name: "spacechild-dev",
  path: "/",
  type: "folder",
  children: [
    {
      id: "src",
      name: "src",
      path: "/src",
      type: "folder",
      children: [
        { id: "app", name: "App.tsx", path: "/src/App.tsx", type: "file", language: "typescript", content: "import { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div className=\"app\">\n      <h1>SpaceChildDev</h1>\n      <button onClick={() => setCount(c => c + 1)}>\n        Count: {count}\n      </button>\n    </div>\n  );\n}" },
        { id: "main", name: "main.tsx", path: "/src/main.tsx", type: "file", language: "typescript", content: "import { createRoot } from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(<App />);" },
        { id: "index-css", name: "index.css", path: "/src/index.css", type: "file", language: "css", content: "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n.app {\n  @apply min-h-screen bg-background text-foreground;\n}" },
        {
          id: "components",
          name: "components",
          path: "/src/components",
          type: "folder",
          children: [
            { id: "button", name: "Button.tsx", path: "/src/components/Button.tsx", type: "file", language: "typescript", content: "export function Button({ children, onClick }) {\n  return (\n    <button\n      className=\"px-4 py-2 bg-primary text-primary-foreground rounded-md\"\n      onClick={onClick}\n    >\n      {children}\n    </button>\n  );\n}" },
            { id: "card", name: "Card.tsx", path: "/src/components/Card.tsx", type: "file", language: "typescript", content: "export function Card({ children, title }) {\n  return (\n    <div className=\"p-6 bg-card rounded-lg border\">\n      {title && <h3 className=\"text-lg font-semibold mb-4\">{title}</h3>}\n      {children}\n    </div>\n  );\n}" },
          ],
        },
        {
          id: "tests",
          name: "__tests__",
          path: "/src/__tests__",
          type: "folder",
          children: [
            { id: "app-test", name: "App.test.tsx", path: "/src/__tests__/App.test.tsx", type: "file", language: "typescript", content: "import { render, screen } from '@testing-library/react';\nimport App from '../App';\n\ndescribe('App', () => {\n  it('renders headline', () => {\n    render(<App />);\n    expect(screen.getByText('SpaceChildDev')).toBeInTheDocument();\n  });\n\n  it('increments counter on click', async () => {\n    render(<App />);\n    const button = screen.getByRole('button');\n    await userEvent.click(button);\n    expect(button).toHaveTextContent('Count: 1');\n  });\n});" },
          ],
        },
      ],
    },
    { id: "package", name: "package.json", path: "/package.json", type: "file", language: "json", content: "{\n  \"name\": \"spacechild-dev\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"tsc && vite build\",\n    \"test\": \"vitest\"\n  }\n}" },
    { id: "tsconfig", name: "tsconfig.json", path: "/tsconfig.json", type: "file", language: "json", content: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"strict\": true,\n    \"jsx\": \"react-jsx\"\n  }\n}" },
    { id: "readme", name: "README.md", path: "/README.md", type: "file", language: "markdown", content: "# SpaceChildDev\n\nAn Agentic IDE with Robust Quality Engineering.\n\n## Features\n\n- 31 QE Agents\n- 41 QE Skills\n- Self-Learning System\n- Multi-Model Router" },
  ],
};

export const mockMetrics: QualityMetrics = {
  coverage: 78,
  maintainability: 85,
  reliability: 91,
  security: 88,
  performance: 72,
  accessibility: 94,
};

export const mockTasks: AgentTask[] = [
  { id: "1", agentId: "2", agentName: "Coverage Analyzer", type: "analysis", status: "running", message: "Analyzing test coverage for src/components...", timestamp: new Date().toISOString(), duration: 12500 },
  { id: "2", agentId: "1", agentName: "Test Generator", type: "generation", status: "completed", message: "Generated 12 unit tests for Button.tsx", timestamp: new Date(Date.now() - 60000).toISOString(), duration: 8400 },
  { id: "3", agentId: "3", agentName: "Security Scanner", type: "scan", status: "completed", message: "No vulnerabilities found in dependencies", timestamp: new Date(Date.now() - 120000).toISOString(), duration: 15200 },
  { id: "4", agentId: "9", agentName: "RED Phase Agent", type: "tdd", status: "completed", message: "Created failing test for new feature", timestamp: new Date(Date.now() - 180000).toISOString(), duration: 5600 },
  { id: "5", agentId: "10", agentName: "GREEN Phase Agent", type: "tdd", status: "completed", message: "Implemented minimal code to pass tests", timestamp: new Date(Date.now() - 240000).toISOString(), duration: 7800 },
];

export const mockPatterns: LearningPattern[] = [
  { id: "1", name: "React Component Testing", category: "Testing", accuracy: 94.5, usageCount: 1247, createdAt: "2024-01-15" },
  { id: "2", name: "API Integration Mocking", category: "Mocking", accuracy: 91.2, usageCount: 892, createdAt: "2024-01-20" },
  { id: "3", name: "State Management Tests", category: "Testing", accuracy: 88.7, usageCount: 654, createdAt: "2024-02-01" },
  { id: "4", name: "Async Error Handling", category: "Patterns", accuracy: 92.1, usageCount: 423, createdAt: "2024-02-10" },
  { id: "5", name: "Form Validation Tests", category: "Testing", accuracy: 95.8, usageCount: 1089, createdAt: "2024-02-15" },
];

export const mockTDDSession: TDDSession = {
  id: "tdd-1",
  phase: "green",
  testFile: "/src/__tests__/App.test.tsx",
  targetFile: "/src/App.tsx",
  iterations: 3,
  startedAt: new Date(Date.now() - 600000).toISOString(),
};
