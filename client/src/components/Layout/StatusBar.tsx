import { 
  GitBranch, 
  AlertCircle, 
  AlertTriangle, 
  Bell,
  Wifi,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  errors?: number;
  warnings?: number;
  branch?: string;
  isConnected?: boolean;
  isSyncing?: boolean;
}

export function StatusBar({ 
  errors = 0, 
  warnings = 0, 
  branch = "main",
  isConnected = true,
  isSyncing = false
}: StatusBarProps) {
  return (
    <div className="h-6 bg-primary text-primary-foreground flex items-center justify-between px-2 text-xs" data-testid="status-bar">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <GitBranch className="h-3.5 w-3.5" />
          <span>{branch}</span>
          {isSyncing && <Loader2 className="h-3 w-3 animate-spin ml-1" />}
        </div>

        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-1",
            errors > 0 && "text-white"
          )}>
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors}</span>
          </div>
          <div className={cn(
            "flex items-center gap-1",
            warnings > 0 && "text-yellow-200"
          )}>
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>{warnings}</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Wifi className={cn(
            "h-3.5 w-3.5",
            isConnected ? "text-tdd-green" : "text-agent-error"
          )} />
          <span>{isConnected ? "Connected" : "Offline"}</span>
        </div>

        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>Spaces: 2</span>

        <div className="flex items-center gap-1">
          <Bell className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}
