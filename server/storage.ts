import { randomUUID } from "crypto";
import type { 
  User, 
  InsertUser, 
  QEAgent, 
  QESkill, 
  TDDSession, 
  QualityMetrics, 
  AgentTask, 
  LearningPattern 
} from "@shared/schema";

// Default QE Agents
const defaultAgents: QEAgent[] = [
  { id: "1", name: "Test Generator", type: "main", category: "Testing", description: "Generates comprehensive test suites", status: "idle", skills: ["unit-testing", "integration-testing"], successRate: 94 },
  { id: "2", name: "Coverage Analyzer", type: "main", category: "Analysis", description: "Analyzes code coverage metrics", status: "idle", skills: ["coverage-analysis", "gap-detection"], successRate: 97 },
  { id: "3", name: "Security Scanner", type: "main", category: "Security", description: "Scans for security vulnerabilities", status: "idle", skills: ["vulnerability-scan", "dependency-audit"], successRate: 91 },
  { id: "4", name: "Performance Tester", type: "main", category: "Performance", description: "Runs performance benchmarks", status: "idle", skills: ["load-testing", "profiling"], successRate: 88 },
  { id: "5", name: "Accessibility Auditor", type: "main", category: "Accessibility", description: "Checks WCAG compliance", status: "idle", skills: ["wcag-audit", "aria-check"], successRate: 95 },
  { id: "6", name: "Mutation Tester", type: "main", category: "Testing", description: "Validates test effectiveness", status: "idle", skills: ["mutation-testing"], successRate: 86 },
  { id: "7", name: "API Contract Validator", type: "main", category: "Integration", description: "Validates API contracts", status: "idle", skills: ["contract-testing", "schema-validation"], successRate: 92 },
  { id: "8", name: "Visual Regression", type: "main", category: "UI", description: "Detects visual changes", status: "idle", skills: ["screenshot-comparison", "pixel-diff"], successRate: 89 },
  { id: "9", name: "RED Phase Agent", type: "tdd", category: "TDD", description: "Writes failing tests first", status: "idle", skills: ["test-first", "requirements-analysis"], successRate: 93 },
  { id: "10", name: "GREEN Phase Agent", type: "tdd", category: "TDD", description: "Implements minimal code to pass", status: "idle", skills: ["implementation", "minimal-code"], successRate: 91 },
  { id: "11", name: "REFACTOR Agent", type: "tdd", category: "TDD", description: "Improves code quality", status: "idle", skills: ["refactoring", "code-cleanup"], successRate: 94 },
  { id: "12", name: "Flaky Test Detector", type: "main", category: "Reliability", description: "Identifies flaky tests with 90%+ accuracy", status: "idle", skills: ["flaky-detection", "test-stability"], successRate: 90 },
  { id: "13", name: "Code Smell Detector", type: "main", category: "Quality", description: "Finds code smells and anti-patterns", status: "idle", skills: ["smell-detection", "anti-patterns"], successRate: 87 },
  { id: "14", name: "Complexity Analyzer", type: "main", category: "Analysis", description: "Measures cyclomatic complexity", status: "idle", skills: ["complexity-analysis"], successRate: 96 },
  { id: "15", name: "Documentation Generator", type: "main", category: "Documentation", description: "Generates test documentation", status: "idle", skills: ["doc-generation"], successRate: 85 },
  { id: "16", name: "E2E Test Generator", type: "main", category: "Testing", description: "Creates end-to-end test scenarios", status: "idle", skills: ["e2e-testing", "user-flow"], successRate: 88 },
  { id: "17", name: "Mock Generator", type: "main", category: "Testing", description: "Generates mock data and stubs", status: "idle", skills: ["mocking", "stubbing"], successRate: 92 },
  { id: "18", name: "Chaos Engineer", type: "main", category: "Reliability", description: "Injects failures for resilience testing", status: "idle", skills: ["chaos-engineering", "fault-injection"], successRate: 84 },
  { id: "19", name: "BDD Specification Writer", type: "main", category: "Methodology", description: "Writes Given-When-Then specs", status: "idle", skills: ["bdd", "gherkin"], successRate: 90 },
  { id: "20", name: "Dependency Auditor", type: "main", category: "Security", description: "Audits npm/yarn dependencies", status: "idle", skills: ["dependency-audit", "license-check"], successRate: 93 },
];

const defaultSkills: QESkill[] = [
  { id: "1", name: "Test-Driven Development", category: "Methodology", description: "RED-GREEN-REFACTOR workflow", complexity: "high" },
  { id: "2", name: "Behavior-Driven Development", category: "Methodology", description: "Given-When-Then specifications", complexity: "high" },
  { id: "3", name: "Unit Testing", category: "Testing", description: "Isolated component testing", complexity: "low" },
  { id: "4", name: "Integration Testing", category: "Testing", description: "Component interaction testing", complexity: "medium" },
  { id: "5", name: "End-to-End Testing", category: "Testing", description: "Full workflow testing", complexity: "high" },
  { id: "6", name: "Mutation Testing", category: "Testing", description: "Test effectiveness validation", complexity: "high" },
  { id: "7", name: "Chaos Engineering", category: "Reliability", description: "Failure injection testing", complexity: "high" },
  { id: "8", name: "Contract Testing", category: "Integration", description: "API contract validation", complexity: "medium" },
  { id: "9", name: "Visual Regression", category: "UI", description: "Screenshot comparison testing", complexity: "medium" },
  { id: "10", name: "Performance Profiling", category: "Performance", description: "Runtime analysis and optimization", complexity: "high" },
  { id: "11", name: "Load Testing", category: "Performance", description: "Stress and load testing", complexity: "high" },
  { id: "12", name: "Security Scanning", category: "Security", description: "Vulnerability detection", complexity: "high" },
  { id: "13", name: "Accessibility Auditing", category: "Accessibility", description: "WCAG compliance checking", complexity: "medium" },
  { id: "14", name: "Code Coverage", category: "Analysis", description: "Coverage measurement and gaps", complexity: "low" },
  { id: "15", name: "Flaky Test Detection", category: "Reliability", description: "ML-powered detection", complexity: "high" },
];

const defaultPatterns: LearningPattern[] = [
  { id: "1", name: "React Component Testing", category: "Testing", accuracy: 94.5, usageCount: 1247, createdAt: "2024-01-15" },
  { id: "2", name: "API Integration Mocking", category: "Mocking", accuracy: 91.2, usageCount: 892, createdAt: "2024-01-20" },
  { id: "3", name: "State Management Tests", category: "Testing", accuracy: 88.7, usageCount: 654, createdAt: "2024-02-01" },
  { id: "4", name: "Async Error Handling", category: "Patterns", accuracy: 92.1, usageCount: 423, createdAt: "2024-02-10" },
  { id: "5", name: "Form Validation Tests", category: "Testing", accuracy: 95.8, usageCount: 1089, createdAt: "2024-02-15" },
];

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Agents
  getAgents(): Promise<QEAgent[]>;
  getAgent(id: string): Promise<QEAgent | undefined>;
  updateAgentStatus(id: string, status: QEAgent["status"]): Promise<QEAgent | undefined>;
  
  // Skills
  getSkills(): Promise<QESkill[]>;
  
  // TDD Sessions
  getTDDSession(): Promise<TDDSession | undefined>;
  createTDDSession(session: Omit<TDDSession, "id">): Promise<TDDSession>;
  updateTDDSession(session: Partial<TDDSession>): Promise<TDDSession | undefined>;
  
  // Metrics
  getQualityMetrics(): Promise<QualityMetrics>;
  
  // Tasks
  getTasks(): Promise<AgentTask[]>;
  createTask(task: Omit<AgentTask, "id">): Promise<AgentTask>;
  updateTaskStatus(id: string, status: AgentTask["status"]): Promise<AgentTask | undefined>;
  
  // Learning
  getPatterns(): Promise<LearningPattern[]>;
  createPattern(pattern: Omit<LearningPattern, "id">): Promise<LearningPattern>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private agents: Map<string, QEAgent>;
  private skills: Map<string, QESkill>;
  private tddSession: TDDSession | undefined;
  private tasks: Map<string, AgentTask>;
  private patterns: Map<string, LearningPattern>;
  private metrics: QualityMetrics;

  constructor() {
    this.users = new Map();
    this.agents = new Map(defaultAgents.map((a) => [a.id, a]));
    this.skills = new Map(defaultSkills.map((s) => [s.id, s]));
    this.tasks = new Map();
    this.patterns = new Map(defaultPatterns.map((p) => [p.id, p]));
    this.metrics = {
      coverage: 78,
      maintainability: 85,
      reliability: 91,
      security: 88,
      performance: 72,
      accessibility: 94,
    };
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Agents
  async getAgents(): Promise<QEAgent[]> {
    return Array.from(this.agents.values());
  }

  async getAgent(id: string): Promise<QEAgent | undefined> {
    return this.agents.get(id);
  }

  async updateAgentStatus(id: string, status: QEAgent["status"]): Promise<QEAgent | undefined> {
    const agent = this.agents.get(id);
    if (agent) {
      agent.status = status;
      agent.lastRun = new Date().toISOString();
      this.agents.set(id, agent);
      return agent;
    }
    return undefined;
  }

  // Skills
  async getSkills(): Promise<QESkill[]> {
    return Array.from(this.skills.values());
  }

  // TDD Sessions
  async getTDDSession(): Promise<TDDSession | undefined> {
    return this.tddSession;
  }

  async createTDDSession(session: Omit<TDDSession, "id">): Promise<TDDSession> {
    this.tddSession = { ...session, id: randomUUID() };
    return this.tddSession;
  }

  async updateTDDSession(updates: Partial<TDDSession>): Promise<TDDSession | undefined> {
    if (this.tddSession) {
      this.tddSession = { ...this.tddSession, ...updates };
      return this.tddSession;
    }
    return undefined;
  }

  // Metrics
  async getQualityMetrics(): Promise<QualityMetrics> {
    return this.metrics;
  }

  // Tasks
  async getTasks(): Promise<AgentTask[]> {
    return Array.from(this.tasks.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async createTask(task: Omit<AgentTask, "id">): Promise<AgentTask> {
    const id = randomUUID();
    const newTask: AgentTask = { ...task, id };
    this.tasks.set(id, newTask);
    return newTask;
  }

  async updateTaskStatus(id: string, status: AgentTask["status"]): Promise<AgentTask | undefined> {
    const task = this.tasks.get(id);
    if (task) {
      task.status = status;
      this.tasks.set(id, task);
      return task;
    }
    return undefined;
  }

  // Learning
  async getPatterns(): Promise<LearningPattern[]> {
    return Array.from(this.patterns.values());
  }

  async createPattern(pattern: Omit<LearningPattern, "id">): Promise<LearningPattern> {
    const id = randomUUID();
    const newPattern: LearningPattern = { ...pattern, id };
    this.patterns.set(id, newPattern);
    return newPattern;
  }
}

export const storage = new MemStorage();
