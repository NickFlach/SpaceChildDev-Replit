import { Circle, CheckCircle2, RefreshCw, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TDDSession } from "@shared/schema";

interface TDDIndicatorProps {
  session: TDDSession | null;
  onPhaseChange?: (phase: TDDSession["phase"]) => void;
  onStart?: () => void;
  onStop?: () => void;
}

export function TDDIndicator({ session, onPhaseChange, onStart, onStop }: TDDIndicatorProps) {
  const phases = [
    { id: "red", label: "RED", description: "Write failing test", icon: Circle },
    { id: "green", label: "GREEN", description: "Make it pass", icon: CheckCircle2 },
    { id: "refactor", label: "REFACTOR", description: "Improve code", icon: RefreshCw },
  ] as const;

  const getPhaseIndex = () => {
    if (!session || session.phase === "idle") return -1;
    return phases.findIndex((p) => p.id === session.phase);
  };

  const currentPhaseIndex = getPhaseIndex();

  return (
    <div className="p-4 bg-card rounded-lg border" data-testid="tdd-indicator">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="font-semibold">TDD Workflow</div>
          {session && session.phase !== "idle" && (
            <span className="text-xs text-muted-foreground">
              Iteration {session.iterations}
            </span>
          )}
        </div>
        {session && session.phase !== "idle" ? (
          <Button variant="outline" size="sm" onClick={onStop} data-testid="tdd-stop">
            <Pause className="h-3.5 w-3.5 mr-1.5" />
            Stop
          </Button>
        ) : (
          <Button size="sm" onClick={onStart} data-testid="tdd-start">
            <Play className="h-3.5 w-3.5 mr-1.5" />
            Start TDD
          </Button>
        )}
      </div>

      {/* Phase indicators */}
      <div className="flex items-center gap-2">
        {phases.map((phase, index) => {
          const isActive = session?.phase === phase.id;
          const isCompleted = currentPhaseIndex > index;
          const Icon = phase.icon;

          return (
            <div key={phase.id} className="flex-1">
              <button
                className={cn(
                  "w-full p-3 rounded-md border-2 transition-all text-left",
                  isActive && phase.id === "red" && "border-tdd-red bg-tdd-red/10",
                  isActive && phase.id === "green" && "border-tdd-green bg-tdd-green/10",
                  isActive && phase.id === "refactor" && "border-tdd-refactor bg-tdd-refactor/10",
                  !isActive && isCompleted && "border-muted bg-muted/50",
                  !isActive && !isCompleted && "border-transparent bg-muted/30"
                )}
                onClick={() => onPhaseChange?.(phase.id)}
                disabled={!session || session.phase === "idle"}
                data-testid={`tdd-phase-${phase.id}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive && phase.id === "red" && "text-tdd-red",
                      isActive && phase.id === "green" && "text-tdd-green",
                      isActive && phase.id === "refactor" && "text-tdd-refactor",
                      !isActive && "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "font-semibold text-sm",
                      isActive && phase.id === "red" && "text-tdd-red",
                      isActive && phase.id === "green" && "text-tdd-green",
                      isActive && phase.id === "refactor" && "text-tdd-refactor",
                      !isActive && "text-muted-foreground"
                    )}
                  >
                    {phase.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{phase.description}</p>
              </button>
              {index < phases.length - 1 && (
                <div className="hidden" /> // Connection line handled by flex gap
              )}
            </div>
          );
        })}
      </div>

      {/* Current file info */}
      {session && session.phase !== "idle" && (
        <div className="mt-4 p-3 bg-muted/50 rounded-md">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Test File:</span>
              <p className="font-mono text-xs mt-0.5 truncate">{session.testFile}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Target File:</span>
              <p className="font-mono text-xs mt-0.5 truncate">{session.targetFile}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
