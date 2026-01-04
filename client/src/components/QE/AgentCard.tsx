import { Play, Square, CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { QEAgent } from "@shared/schema";

interface AgentCardProps {
  agent: QEAgent;
  onExecute?: (agent: QEAgent) => void;
  onStop?: (agent: QEAgent) => void;
}

export function AgentCard({ agent, onExecute, onStop }: AgentCardProps) {
  const statusIcons = {
    idle: Zap,
    running: Play,
    completed: CheckCircle2,
    error: AlertCircle,
  };

  const StatusIcon = statusIcons[agent.status];

  return (
    <div
      className={cn(
        "p-4 rounded-lg border bg-card transition-all",
        agent.status === "running" && "ring-2 ring-agent-active/50"
      )}
      data-testid={`agent-card-${agent.id}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium truncate">{agent.name}</h3>
            <Badge
              variant="outline"
              className={cn(
                "shrink-0",
                agent.type === "tdd" && "border-tdd-refactor text-tdd-refactor"
              )}
            >
              {agent.type === "tdd" ? "TDD" : agent.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {agent.description}
          </p>
        </div>
        <div
          className={cn(
            "shrink-0 p-1.5 rounded-full",
            agent.status === "idle" && "bg-agent-idle/20",
            agent.status === "running" && "bg-agent-active/20",
            agent.status === "completed" && "bg-tdd-green/20",
            agent.status === "error" && "bg-agent-error/20"
          )}
        >
          <StatusIcon
            className={cn(
              "h-4 w-4",
              agent.status === "idle" && "text-agent-idle",
              agent.status === "running" && "text-agent-active animate-pulse",
              agent.status === "completed" && "text-tdd-green",
              agent.status === "error" && "text-agent-error"
            )}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {agent.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
        {agent.skills.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{agent.skills.length - 3}
          </Badge>
        )}
      </div>

      {/* Success rate */}
      {agent.successRate !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Success Rate</span>
            <span className="font-medium">{agent.successRate}%</span>
          </div>
          <Progress value={agent.successRate} className="h-1.5" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {agent.status === "running" ? (
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onStop?.(agent)}
            data-testid={`agent-stop-${agent.id}`}
          >
            <Square className="h-3.5 w-3.5 mr-1.5" />
            Stop
          </Button>
        ) : (
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onExecute?.(agent)}
            disabled={agent.status === "running"}
            data-testid={`agent-execute-${agent.id}`}
          >
            <Play className="h-3.5 w-3.5 mr-1.5" />
            Execute
          </Button>
        )}
      </div>
    </div>
  );
}
