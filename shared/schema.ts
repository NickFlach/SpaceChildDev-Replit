import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Re-export chat models
export * from "./models/chat";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// QE Agents
export const qeAgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["main", "tdd"]),
  category: z.string(),
  description: z.string(),
  status: z.enum(["idle", "running", "completed", "error"]),
  skills: z.array(z.string()),
  successRate: z.number().optional(),
  lastRun: z.string().optional(),
});

export type QEAgent = z.infer<typeof qeAgentSchema>;

// QE Skills
export const qeSkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  complexity: z.enum(["low", "medium", "high"]),
});

export type QESkill = z.infer<typeof qeSkillSchema>;

// TDD Session
export const tddSessionSchema = z.object({
  id: z.string(),
  phase: z.enum(["red", "green", "refactor", "idle"]),
  testFile: z.string().optional(),
  targetFile: z.string().optional(),
  iterations: z.number(),
  startedAt: z.string(),
});

export type TDDSession = z.infer<typeof tddSessionSchema>;

// Project File
export const projectFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  path: z.string(),
  type: z.enum(["file", "folder"]),
  content: z.string().optional(),
  language: z.string().optional(),
  children: z.array(z.lazy(() => projectFileSchema)).optional(),
});

export type ProjectFile = z.infer<typeof projectFileSchema>;

// Quality Metrics
export const qualityMetricsSchema = z.object({
  coverage: z.number(),
  maintainability: z.number(),
  reliability: z.number(),
  security: z.number(),
  performance: z.number(),
  accessibility: z.number(),
});

export type QualityMetrics = z.infer<typeof qualityMetricsSchema>;

// Agent Task
export const agentTaskSchema = z.object({
  id: z.string(),
  agentId: z.string(),
  agentName: z.string(),
  type: z.string(),
  status: z.enum(["pending", "running", "completed", "error"]),
  message: z.string(),
  timestamp: z.string(),
  duration: z.number().optional(),
});

export type AgentTask = z.infer<typeof agentTaskSchema>;

// Learning Pattern
export const learningPatternSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  accuracy: z.number(),
  usageCount: z.number(),
  createdAt: z.string(),
});

export type LearningPattern = z.infer<typeof learningPatternSchema>;
