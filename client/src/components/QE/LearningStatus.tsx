import { Brain, TrendingUp, Sparkles, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { LearningPattern } from "@shared/schema";

interface LearningStatusProps {
  patterns: LearningPattern[];
}

export function LearningStatus({ patterns }: LearningStatusProps) {
  const totalPatterns = patterns.length;
  const avgAccuracy = totalPatterns > 0 
    ? patterns.reduce((sum, p) => sum + p.accuracy, 0) / totalPatterns 
    : 0;
  const totalUsage = patterns.reduce((sum, p) => sum + p.usageCount, 0);

  const stats = [
    { icon: Brain, label: "Patterns", value: totalPatterns, color: "text-primary" },
    { icon: TrendingUp, label: "Accuracy", value: `${avgAccuracy.toFixed(1)}%`, color: "text-tdd-green" },
    { icon: Sparkles, label: "Uses", value: totalUsage.toLocaleString(), color: "text-chart-4" },
  ];

  return (
    <div className="p-4 bg-card rounded-lg border" data-testid="learning-status">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Self-Learning System</h3>
        <Badge variant="secondary" className="ml-auto">Q-Learning</Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center p-3 bg-muted/50 rounded-md">
            <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
            <div className="font-semibold">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Top patterns */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Database className="h-4 w-4 text-muted-foreground" />
          Top Patterns
        </div>
        {patterns.slice(0, 3).map((pattern) => (
          <div key={pattern.id} className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm truncate">{pattern.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {pattern.accuracy.toFixed(1)}%
                </span>
              </div>
              <Progress value={pattern.accuracy} className="h-1 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
