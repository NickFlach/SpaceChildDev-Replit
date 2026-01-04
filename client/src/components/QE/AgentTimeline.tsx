import { CheckCircle2, AlertCircle, Loader2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { AgentTask } from "@shared/schema";

interface AgentTimelineProps {
  tasks: AgentTask[];
}

export function AgentTimeline({ tasks }: AgentTimelineProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return "";
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const statusIcons = {
    pending: Clock,
    running: Loader2,
    completed: CheckCircle2,
    error: AlertCircle,
  };

  return (
    <div className="p-4 bg-card rounded-lg border" data-testid="agent-timeline">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Agent Activity</h3>
        <Badge variant="outline">{tasks.length} tasks</Badge>
      </div>

      <ScrollArea className="h-72">
        <div className="space-y-1">
          {tasks.map((task, index) => {
            const StatusIcon = statusIcons[task.status];
            const isLast = index === tasks.length - 1;

            return (
              <div
                key={task.id}
                className="relative pl-6"
                data-testid={`timeline-task-${task.id}`}
              >
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-2 top-6 w-px h-full bg-border" />
                )}

                {/* Status icon */}
                <div
                  className={cn(
                    "absolute left-0 top-1 p-1 rounded-full bg-background border-2",
                    task.status === "completed" && "border-tdd-green",
                    task.status === "running" && "border-agent-active",
                    task.status === "error" && "border-agent-error",
                    task.status === "pending" && "border-muted"
                  )}
                >
                  <StatusIcon
                    className={cn(
                      "h-3 w-3",
                      task.status === "completed" && "text-tdd-green",
                      task.status === "running" && "text-agent-active animate-spin",
                      task.status === "error" && "text-agent-error",
                      task.status === "pending" && "text-muted-foreground"
                    )}
                  />
                </div>

                {/* Content */}
                <div className="pb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{task.agentName}</span>
                    <Badge variant="secondary" className="text-xs">
                      {task.type}
                    </Badge>
                    {task.duration && (
                      <span className="text-xs text-muted-foreground">
                        {formatDuration(task.duration)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{task.message}</p>
                  <span className="text-xs text-muted-foreground/60">
                    {formatTime(task.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
