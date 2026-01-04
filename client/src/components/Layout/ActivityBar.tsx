import { 
  Files, 
  Search, 
  GitBranch, 
  Bug, 
  Blocks, 
  Bot,
  FlaskConical,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type ActivityView = "files" | "search" | "git" | "debug" | "extensions" | "ai" | "qe";

interface ActivityBarProps {
  activeView: ActivityView;
  onViewChange: (view: ActivityView) => void;
}

export function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
  const topItems = [
    { id: "files", icon: Files, label: "Explorer" },
    { id: "search", icon: Search, label: "Search" },
    { id: "git", icon: GitBranch, label: "Source Control" },
    { id: "debug", icon: Bug, label: "Run and Debug" },
    { id: "extensions", icon: Blocks, label: "Extensions" },
  ] as const;

  const bottomItems = [
    { id: "ai", icon: Bot, label: "AI Assistant" },
    { id: "qe", icon: FlaskConical, label: "Quality Engineering" },
  ] as const;

  return (
    <div className="w-12 bg-muted/30 border-r flex flex-col items-center py-2" data-testid="activity-bar">
      <div className="flex flex-col items-center gap-1">
        {topItems.map((item) => (
          <Tooltip key={item.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative",
                  activeView === item.id && "bg-accent text-accent-foreground"
                )}
                onClick={() => onViewChange(item.id as ActivityView)}
                data-testid={`activity-${item.id}`}
              >
                <item.icon className="h-5 w-5" />
                {activeView === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex flex-col items-center gap-1">
        {bottomItems.map((item) => (
          <Tooltip key={item.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative",
                  activeView === item.id && "bg-accent text-accent-foreground"
                )}
                onClick={() => onViewChange(item.id as ActivityView)}
                data-testid={`activity-${item.id}`}
              >
                <item.icon className="h-5 w-5" />
                {activeView === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}

        <div className="h-px w-6 bg-border my-2" />

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" data-testid="activity-settings">
              <Settings className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
