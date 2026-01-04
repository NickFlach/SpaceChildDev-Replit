import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import type { QualityMetrics } from "@shared/schema";

interface QualityRadarProps {
  metrics: QualityMetrics;
}

export function QualityRadar({ metrics }: QualityRadarProps) {
  const data = [
    { metric: "Coverage", value: metrics.coverage, fullMark: 100 },
    { metric: "Maintainability", value: metrics.maintainability, fullMark: 100 },
    { metric: "Reliability", value: metrics.reliability, fullMark: 100 },
    { metric: "Security", value: metrics.security, fullMark: 100 },
    { metric: "Performance", value: metrics.performance, fullMark: 100 },
    { metric: "Accessibility", value: metrics.accessibility, fullMark: 100 },
  ];

  return (
    <div className="p-4 bg-card rounded-lg border" data-testid="quality-radar">
      <h3 className="font-semibold mb-4">Quality Metrics</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <Radar
              name="Quality"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics summary */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item) => (
          <div key={item.metric} className="text-center p-2 bg-muted/50 rounded">
            <div className="text-lg font-semibold">{item.value}%</div>
            <div className="text-xs text-muted-foreground">{item.metric}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
