import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ============ AGENTS ============
  
  // Get all agents
  app.get("/api/agents", async (req, res) => {
    try {
      const agents = await storage.getAgents();
      res.json(agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
      res.status(500).json({ error: "Failed to fetch agents" });
    }
  });

  // Get single agent
  app.get("/api/agents/:id", async (req, res) => {
    try {
      const agent = await storage.getAgent(req.params.id);
      if (!agent) {
        return res.status(404).json({ error: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      console.error("Error fetching agent:", error);
      res.status(500).json({ error: "Failed to fetch agent" });
    }
  });

  // Execute agent
  app.post("/api/agents/:id/execute", async (req, res) => {
    try {
      const { id } = req.params;
      const agent = await storage.getAgent(id);
      
      if (!agent) {
        return res.status(404).json({ error: "Agent not found" });
      }

      // Update agent status to running
      await storage.updateAgentStatus(id, "running");

      // Create task
      const task = await storage.createTask({
        agentId: id,
        agentName: agent.name,
        type: agent.category.toLowerCase(),
        status: "running",
        message: `Executing ${agent.name}...`,
        timestamp: new Date().toISOString(),
      });

      // Simulate execution (in real app, this would be async)
      setTimeout(async () => {
        await storage.updateAgentStatus(id, "completed");
        await storage.updateTaskStatus(task.id, "completed");
      }, 3000);

      res.json({ agent, task });
    } catch (error) {
      console.error("Error executing agent:", error);
      res.status(500).json({ error: "Failed to execute agent" });
    }
  });

  // Stop agent
  app.post("/api/agents/:id/stop", async (req, res) => {
    try {
      const agent = await storage.updateAgentStatus(req.params.id, "idle");
      if (!agent) {
        return res.status(404).json({ error: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      console.error("Error stopping agent:", error);
      res.status(500).json({ error: "Failed to stop agent" });
    }
  });

  // Execute fleet
  app.post("/api/agents/fleet/execute", async (req, res) => {
    try {
      const { agentIds } = req.body;
      const agents = await storage.getAgents();
      const selectedAgents = agents.filter((a) => agentIds.includes(a.id));

      const tasks = await Promise.all(
        selectedAgents.map(async (agent) => {
          await storage.updateAgentStatus(agent.id, "running");
          return storage.createTask({
            agentId: agent.id,
            agentName: agent.name,
            type: agent.category.toLowerCase(),
            status: "running",
            message: `Executing ${agent.name} as part of fleet...`,
            timestamp: new Date().toISOString(),
          });
        })
      );

      res.json({ agents: selectedAgents, tasks });
    } catch (error) {
      console.error("Error executing fleet:", error);
      res.status(500).json({ error: "Failed to execute fleet" });
    }
  });

  // ============ SKILLS ============

  app.get("/api/qe/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  // ============ TDD ============

  // Get TDD session
  app.get("/api/tdd/session", async (req, res) => {
    try {
      const session = await storage.getTDDSession();
      res.json(session || null);
    } catch (error) {
      console.error("Error fetching TDD session:", error);
      res.status(500).json({ error: "Failed to fetch TDD session" });
    }
  });

  // Start TDD session
  app.post("/api/tdd/start", async (req, res) => {
    try {
      const { testFile, targetFile } = req.body;
      const session = await storage.createTDDSession({
        phase: "red",
        testFile: testFile || "/src/__tests__/NewFeature.test.tsx",
        targetFile: targetFile || "/src/components/NewFeature.tsx",
        iterations: 1,
        startedAt: new Date().toISOString(),
      });
      res.json(session);
    } catch (error) {
      console.error("Error starting TDD session:", error);
      res.status(500).json({ error: "Failed to start TDD session" });
    }
  });

  // Update TDD phase
  app.post("/api/tdd/:phase", async (req, res) => {
    try {
      const { phase } = req.params;
      if (!["red", "green", "refactor", "idle"].includes(phase)) {
        return res.status(400).json({ error: "Invalid phase" });
      }

      const session = await storage.updateTDDSession({
        phase: phase as "red" | "green" | "refactor" | "idle",
      });

      if (!session) {
        return res.status(404).json({ error: "No active TDD session" });
      }

      res.json(session);
    } catch (error) {
      console.error("Error updating TDD phase:", error);
      res.status(500).json({ error: "Failed to update TDD phase" });
    }
  });

  // ============ QUALITY METRICS ============

  app.get("/api/qe/metrics", async (req, res) => {
    try {
      const metrics = await storage.getQualityMetrics();
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  // ============ TASKS ============

  app.get("/api/tasks", async (req, res) => {
    try {
      const tasks = await storage.getTasks();
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  // ============ LEARNING ============

  app.get("/api/learning/status", async (req, res) => {
    try {
      const patterns = await storage.getPatterns();
      const totalPatterns = patterns.length;
      const avgAccuracy = patterns.reduce((sum, p) => sum + p.accuracy, 0) / totalPatterns;
      const totalUsage = patterns.reduce((sum, p) => sum + p.usageCount, 0);

      res.json({
        algorithm: "Q-Learning",
        patterns: totalPatterns,
        accuracy: avgAccuracy,
        totalUsage,
        status: "active",
      });
    } catch (error) {
      console.error("Error fetching learning status:", error);
      res.status(500).json({ error: "Failed to fetch learning status" });
    }
  });

  app.get("/api/learning/patterns", async (req, res) => {
    try {
      const patterns = await storage.getPatterns();
      res.json(patterns);
    } catch (error) {
      console.error("Error fetching patterns:", error);
      res.status(500).json({ error: "Failed to fetch patterns" });
    }
  });

  // ============ AI CHAT ============

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, stream = false } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array required" });
      }

      const systemMessage = {
        role: "system" as const,
        content: `You are SpaceChildDev AI Assistant, an expert in software quality engineering, test-driven development, and code analysis. You help developers write better code, generate tests, and maintain high code quality. You have access to 31 QE agents and 41 quality engineering skills. Be helpful, concise, and technical when needed.`,
      };

      if (stream) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const completion = await openai.chat.completions.create({
          model: "gpt-5",
          messages: [systemMessage, ...messages],
          stream: true,
          max_completion_tokens: 2048,
        });

        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        }

        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
      } else {
        const completion = await openai.chat.completions.create({
          model: "gpt-5",
          messages: [systemMessage, ...messages],
          max_completion_tokens: 2048,
        });

        res.json({
          content: completion.choices[0]?.message?.content || "",
        });
      }
    } catch (error) {
      console.error("Error in chat:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Chat failed" })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to process chat" });
      }
    }
  });

  // ============ QE ANALYSIS ============

  app.post("/api/qe/analyze", async (req, res) => {
    try {
      const { code, type = "general" } = req.body;

      if (!code) {
        return res.status(400).json({ error: "Code is required" });
      }

      const prompts: Record<string, string> = {
        general: "Analyze this code for quality issues, potential bugs, and improvement suggestions.",
        security: "Analyze this code for security vulnerabilities and provide remediation steps.",
        performance: "Analyze this code for performance issues and optimization opportunities.",
        testing: "Suggest comprehensive tests for this code including edge cases.",
      };

      const completion = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are an expert code analyst. Provide detailed, actionable feedback.",
          },
          {
            role: "user",
            content: `${prompts[type] || prompts.general}\n\nCode:\n\`\`\`\n${code}\n\`\`\``,
          },
        ],
        max_completion_tokens: 2048,
      });

      res.json({
        analysis: completion.choices[0]?.message?.content || "",
        type,
      });
    } catch (error) {
      console.error("Error analyzing code:", error);
      res.status(500).json({ error: "Failed to analyze code" });
    }
  });

  // Generate tests
  app.post("/api/qe/generate-tests", async (req, res) => {
    try {
      const { code, framework = "vitest" } = req.body;

      if (!code) {
        return res.status(400).json({ error: "Code is required" });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `You are an expert test engineer. Generate comprehensive ${framework} tests with good coverage.`,
          },
          {
            role: "user",
            content: `Generate comprehensive tests for this code using ${framework}:\n\n\`\`\`\n${code}\n\`\`\``,
          },
        ],
        max_completion_tokens: 4096,
      });

      res.json({
        tests: completion.choices[0]?.message?.content || "",
        framework,
      });
    } catch (error) {
      console.error("Error generating tests:", error);
      res.status(500).json({ error: "Failed to generate tests" });
    }
  });

  return httpServer;
}
