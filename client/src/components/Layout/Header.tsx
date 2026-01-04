import { 
  Code2, 
  GitBranch, 
  Settings, 
  Bell, 
  Search,
  Cpu,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
  modelSavings?: number;
}

export function Header({ modelSavings = 75 }: HeaderProps) {
  return (
    <header className="h-12 border-b bg-background flex items-center justify-between px-4 gap-4" data-testid="header">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary">
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">SpaceChildDev</span>
        </div>

        <div className="h-4 w-px bg-border" />

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <GitBranch className="h-4 w-4" />
          <span>main</span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md">
        <Button variant="outline" className="w-full justify-start text-muted-foreground gap-2" data-testid="search-button">
          <Search className="h-4 w-4" />
          <span>Search files, commands...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">Ctrl</span>K
          </kbd>
        </Button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Model Router Savings */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-tdd-green/10 rounded-md" data-testid="model-savings">
          <Cpu className="h-4 w-4 text-tdd-green" />
          <span className="text-sm font-medium text-tdd-green">{modelSavings}% Saved</span>
        </div>

        {/* AI Status */}
        <Badge variant="outline" className="gap-1.5">
          <Sparkles className="h-3 w-3 text-primary" />
          GPT-5
        </Badge>

        <div className="h-4 w-px bg-border" />

        <Button variant="ghost" size="icon" data-testid="button-notifications">
          <Bell className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" data-testid="button-settings">
          <Settings className="h-4 w-4" />
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
}
