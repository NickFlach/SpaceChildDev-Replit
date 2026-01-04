import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Users, BarChart3, BookOpen, Zap, Loader2 } from "lucide-react";
import { AgentCard } from "./AgentCard";
import { TDDIndicator } from "./TDDIndicator";
import { QualityRadar } from "./QualityRadar";
import { AgentTimeline } from "./AgentTimeline";
import { LearningStatus } from "./LearningStatus";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { QEAgent, TDDSession, QESkill, QualityMetrics, AgentTask, LearningPattern } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function QEDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("agents");

  // Fetch agents
  const { data: agents = [], isLoading: agentsLoading } = useQuery<QEAgent[]>({
    queryKey: ["/api/agents"],
  });

  // Fetch skills
  const { data: skills = [] } = useQuery<QESkill[]>({
    queryKey: ["/api/qe/skills"],
  });

  // Fetch TDD session
  const { data: tddSession } = useQuery<TDDSession | null>({
    queryKey: ["/api/tdd/session"],
  });

  // Fetch metrics
  const { data: metrics } = useQuery<QualityMetrics>({
    queryKey: ["/api/qe/metrics"],
  });

  // Fetch tasks
  const { data: tasks = [] } = useQuery<AgentTask[]>({
    queryKey: ["/api/tasks"],
  });

  // Fetch patterns
  const { data: patterns = [] } = useQuery<LearningPattern[]>({
    queryKey: ["/api/learning/patterns"],
  });

  // Execute agent mutation
  const executeAgentMutation = useMutation({
    mutationFn: async (agentId: string) => {
      return apiRequest("POST", `/api/agents/${agentId}/execute`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  // Stop agent mutation
  const stopAgentMutation = useMutation({
    mutationFn: async (agentId: string) => {
      return apiRequest("POST", `/api/agents/${agentId}/stop`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
    },
  });

  // TDD mutations
  const startTDDMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/tdd/start", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tdd/session"] });
    },
  });

  const updateTDDPhaseMutation = useMutation({
    mutationFn: async (phase: string) => {
      return apiRequest("POST", `/api/tdd/${phase}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tdd/session"] });
    },
  });

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mainAgents = filteredAgents.filter((a) => a.type === "main");
  const tddAgents = filteredAgents.filter((a) => a.type === "tdd");

  const handleExecuteAgent = (agent: QEAgent) => {
    executeAgentMutation.mutate(agent.id);
  };

  const handleStopAgent = (agent: QEAgent) => {
    stopAgentMutation.mutate(agent.id);
  };

  const handleStartTDD = () => {
    startTDDMutation.mutate();
  };

  const handleStopTDD = () => {
    updateTDDPhaseMutation.mutate("idle");
  };

  const handlePhaseChange = (phase: TDDSession["phase"]) => {
    updateTDDPhaseMutation.mutate(phase);
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, QESkill[]>);

  const defaultMetrics: QualityMetrics = {
    coverage: 78,
    maintainability: 85,
    reliability: 91,
    security: 88,
    performance: 72,
    accessibility: 94,
  };

  if (agentsLoading) {
    return (
      <div className="h-full flex items-center justify-center" data-testid="qe-loading">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" data-testid="qe-dashboard">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold">Quality Engineering</h2>
            <p className="text-sm text-muted-foreground">{agents.length} Agents, {skills.length} Skills, Self-Learning</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <span className="w-2 h-2 rounded-full bg-agent-active animate-pulse" />
              {agents.filter((a) => a.status === "running").length} Running
            </Badge>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="qe-search"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="agents" className="gap-1.5">
            <Users className="h-4 w-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="metrics" className="gap-1.5">
            <BarChart3 className="h-4 w-4" />
            Metrics
          </TabsTrigger>
          <TabsTrigger value="skills" className="gap-1.5">
            <BookOpen className="h-4 w-4" />
            Skills
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="agents" className="p-4 mt-0 space-y-4">
            {/* TDD Indicator */}
            <TDDIndicator
              session={tddSession || null}
              onPhaseChange={handlePhaseChange}
              onStart={handleStartTDD}
              onStop={handleStopTDD}
            />

            {/* Main Agents */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Main Agents ({mainAgents.length})
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {mainAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onExecute={handleExecuteAgent}
                    onStop={handleStopAgent}
                  />
                ))}
              </div>
            </div>

            {/* TDD Agents */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <span className="text-tdd-refactor">TDD</span> Subagents ({tddAgents.length})
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {tddAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onExecute={handleExecuteAgent}
                    onStop={handleStopAgent}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="p-4 mt-0 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <QualityRadar metrics={metrics || defaultMetrics} />
              <LearningStatus patterns={patterns} />
            </div>
            <AgentTimeline tasks={tasks} />
          </TabsContent>

          <TabsContent value="skills" className="p-4 mt-0 space-y-4">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="font-medium mb-3">{category}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 bg-card rounded-lg border flex items-start justify-between gap-2"
                      data-testid={`skill-${skill.id}`}
                    >
                      <div>
                        <div className="font-medium text-sm">{skill.name}</div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {skill.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0",
                          skill.complexity === "high" && "border-tdd-red text-tdd-red",
                          skill.complexity === "medium" && "border-chart-4 text-chart-4",
                          skill.complexity === "low" && "border-tdd-green text-tdd-green"
                        )}
                      >
                        {skill.complexity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
