import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "success";
  content: string;
  timestamp: Date;
}

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: "1", type: "output", content: "SpaceChildDev Terminal v1.0.0", timestamp: new Date() },
    { id: "2", type: "output", content: "Type 'help' for available commands", timestamp: new Date() },
    { id: "3", type: "output", content: "", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = (cmd: string) => {
    const timestamp = new Date();
    const newLines: TerminalLine[] = [
      { id: Date.now().toString(), type: "input", content: `$ ${cmd}`, timestamp },
    ];

    const cmdLower = cmd.toLowerCase().trim();

    if (cmdLower === "help") {
      newLines.push(
        { id: `${Date.now()}-1`, type: "output", content: "Available commands:", timestamp },
        { id: `${Date.now()}-2`, type: "output", content: "  help        - Show this help message", timestamp },
        { id: `${Date.now()}-3`, type: "output", content: "  clear       - Clear terminal", timestamp },
        { id: `${Date.now()}-4`, type: "output", content: "  npm test    - Run test suite", timestamp },
        { id: `${Date.now()}-5`, type: "output", content: "  npm run dev - Start dev server", timestamp },
        { id: `${Date.now()}-6`, type: "output", content: "  agents      - List QE agents", timestamp },
        { id: `${Date.now()}-7`, type: "output", content: "  tdd start   - Start TDD session", timestamp }
      );
    } else if (cmdLower === "clear") {
      setLines([]);
      return;
    } else if (cmdLower === "npm test") {
      newLines.push(
        { id: `${Date.now()}-1`, type: "output", content: "> spacechild-dev@1.0.0 test", timestamp },
        { id: `${Date.now()}-2`, type: "output", content: "> vitest run", timestamp },
        { id: `${Date.now()}-3`, type: "output", content: "", timestamp },
        { id: `${Date.now()}-4`, type: "success", content: " PASS  src/__tests__/App.test.tsx", timestamp },
        { id: `${Date.now()}-5`, type: "success", content: "   ✓ renders headline (12ms)", timestamp },
        { id: `${Date.now()}-6`, type: "success", content: "   ✓ increments counter on click (8ms)", timestamp },
        { id: `${Date.now()}-7`, type: "output", content: "", timestamp },
        { id: `${Date.now()}-8`, type: "success", content: "Test Files  1 passed (1)", timestamp },
        { id: `${Date.now()}-9`, type: "success", content: "Tests       2 passed (2)", timestamp }
      );
    } else if (cmdLower === "agents") {
      newLines.push(
        { id: `${Date.now()}-1`, type: "output", content: "Active QE Agents: 15", timestamp },
        { id: `${Date.now()}-2`, type: "success", content: "  [RUNNING] Coverage Analyzer", timestamp },
        { id: `${Date.now()}-3`, type: "output", content: "  [IDLE] Test Generator", timestamp },
        { id: `${Date.now()}-4`, type: "output", content: "  [IDLE] Security Scanner", timestamp },
        { id: `${Date.now()}-5`, type: "output", content: "  ... and 12 more", timestamp }
      );
    } else if (cmdLower === "tdd start") {
      newLines.push(
        { id: `${Date.now()}-1`, type: "success", content: "TDD Session Started", timestamp },
        { id: `${Date.now()}-2`, type: "output", content: "Phase: RED - Write a failing test", timestamp },
        { id: `${Date.now()}-3`, type: "output", content: "Target: src/components/Button.tsx", timestamp }
      );
    } else if (cmdLower === "npm run dev") {
      newLines.push(
        { id: `${Date.now()}-1`, type: "output", content: "> spacechild-dev@1.0.0 dev", timestamp },
        { id: `${Date.now()}-2`, type: "output", content: "> vite", timestamp },
        { id: `${Date.now()}-3`, type: "output", content: "", timestamp },
        { id: `${Date.now()}-4`, type: "success", content: "  VITE v5.0.0  ready in 342 ms", timestamp },
        { id: `${Date.now()}-5`, type: "output", content: "", timestamp },
        { id: `${Date.now()}-6`, type: "success", content: "  ➜  Local:   http://localhost:5173/", timestamp },
        { id: `${Date.now()}-7`, type: "output", content: "  ➜  Network: http://192.168.1.100:5173/", timestamp }
      );
    } else if (cmdLower) {
      newLines.push(
        { id: `${Date.now()}-err`, type: "error", content: `Command not found: ${cmd}`, timestamp }
      );
    }

    setLines((prev) => [...prev, ...newLines]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
      setInput("");
    }
  };

  if (isMinimized) {
    return (
      <div className="h-8 flex items-center justify-between px-3 bg-muted/50 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TerminalIcon className="h-4 w-4" />
          <span>Terminal</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(false)}>
          <ChevronDown className="h-4 w-4 rotate-180" />
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background" data-testid="terminal">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-0.5 bg-background rounded text-sm">
            <TerminalIcon className="h-3.5 w-3.5" />
            <span>bash</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(true)}>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setLines([])}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Terminal output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-3 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={cn(
              "leading-6",
              line.type === "error" && "text-destructive",
              line.type === "success" && "text-tdd-green",
              line.type === "input" && "text-primary"
            )}
          >
            {line.content || "\u00A0"}
          </div>
        ))}
        
        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-primary mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            autoFocus
            data-testid="terminal-input"
          />
        </form>
      </div>
    </div>
  );
}
