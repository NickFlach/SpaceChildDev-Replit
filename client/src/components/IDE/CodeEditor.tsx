import { useState, useEffect } from "react";
import { X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectFile } from "@shared/schema";

interface CodeEditorProps {
  file: ProjectFile | null;
  openFiles: ProjectFile[];
  onFileClose: (file: ProjectFile) => void;
  onFileSelect: (file: ProjectFile) => void;
  onContentChange?: (content: string) => void;
}

export function CodeEditor({ file, openFiles, onFileClose, onFileSelect, onContentChange }: CodeEditorProps) {
  const [content, setContent] = useState(file?.content || "");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setContent(file?.content || "");
    setHasChanges(false);
  }, [file?.id]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setHasChanges(newContent !== file?.content);
    onContentChange?.(newContent);
  };

  const getLanguageLabel = (lang?: string) => {
    const labels: Record<string, string> = {
      typescript: "TypeScript",
      javascript: "JavaScript",
      css: "CSS",
      json: "JSON",
      markdown: "Markdown",
      html: "HTML",
    };
    return labels[lang || ""] || "Plain Text";
  };

  const syntaxHighlight = (code: string, language?: string) => {
    const lines = code.split("\n");
    return lines.map((line, i) => {
      let highlighted = line
        .replace(/(\/\/.*$)/gm, '<span class="text-muted-foreground italic">$1</span>')
        .replace(/('.*?'|".*?")/g, '<span class="text-tdd-green">$1</span>')
        .replace(/\b(import|export|from|const|let|var|function|return|if|else|async|await|class|extends|interface|type)\b/g, '<span class="text-primary">$1</span>')
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-chart-4">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-chart-4">$1</span>');
      return (
        <div key={i} className="flex">
          <span className="w-12 shrink-0 text-right pr-4 text-muted-foreground select-none">{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-background" data-testid="editor-empty">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-20">{"</>"}</div>
          <p className="text-muted-foreground text-lg">Select a file to edit</p>
          <p className="text-muted-foreground/60 text-sm mt-2">Use the file explorer on the left</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background" data-testid="code-editor">
      {/* Tab bar */}
      <div className="flex items-center border-b bg-muted/30 overflow-x-auto">
        {openFiles.map((f) => (
          <div
            key={f.id}
            className={cn(
              "flex items-center gap-2 px-3 py-2 border-r cursor-pointer text-sm group",
              f.id === file.id ? "bg-background" : "hover-elevate"
            )}
            onClick={() => onFileSelect(f)}
            data-testid={`tab-${f.name}`}
          >
            {f.id === file.id && hasChanges ? (
              <Circle className="h-2 w-2 fill-current text-chart-4" />
            ) : null}
            <span className={cn(f.id === file.id ? "text-foreground" : "text-muted-foreground")}>
              {f.name}
            </span>
            <button
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation();
                onFileClose(f);
              }}
              data-testid={`close-tab-${f.name}`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Editor area */}
      <div className="flex-1 overflow-hidden relative">
        {/* Syntax highlighted overlay (read-only view) */}
        <div className="absolute inset-0 overflow-auto p-4 font-mono text-sm leading-6 pointer-events-none whitespace-pre">
          {syntaxHighlight(content, file.language)}
        </div>
        
        {/* Actual textarea for editing */}
        <textarea
          className="absolute inset-0 w-full h-full p-4 pl-16 font-mono text-sm leading-6 bg-transparent text-transparent caret-foreground resize-none outline-none"
          value={content}
          onChange={handleContentChange}
          spellCheck={false}
          data-testid="editor-textarea"
        />
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-1 text-xs text-muted-foreground border-t bg-muted/30">
        <div className="flex items-center gap-4">
          <span>{getLanguageLabel(file.language)}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
}
