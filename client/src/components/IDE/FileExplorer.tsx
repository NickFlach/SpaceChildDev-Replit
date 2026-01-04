import { useState } from "react";
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectFile } from "@shared/schema";

interface FileExplorerProps {
  files: ProjectFile;
  onFileSelect: (file: ProjectFile) => void;
  selectedFile?: ProjectFile | null;
}

interface FileNodeProps {
  file: ProjectFile;
  depth: number;
  onFileSelect: (file: ProjectFile) => void;
  selectedFile?: ProjectFile | null;
}

function FileNode({ file, depth, onFileSelect, selectedFile }: FileNodeProps) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isFolder = file.type === "folder";
  const isSelected = selectedFile?.id === file.id;

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    const iconColors: Record<string, string> = {
      ts: "text-blue-400",
      tsx: "text-blue-400",
      js: "text-yellow-400",
      jsx: "text-yellow-400",
      css: "text-pink-400",
      json: "text-yellow-500",
      md: "text-gray-400",
      html: "text-orange-400",
    };
    return iconColors[ext || ""] || "text-muted-foreground";
  };

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 py-1 px-2 cursor-pointer rounded-sm text-sm hover-elevate active-elevate-2",
          isSelected && "bg-accent text-accent-foreground"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleClick}
        data-testid={`file-node-${file.name}`}
      >
        {isFolder ? (
          <>
            {isOpen ? (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )}
            {isOpen ? (
              <FolderOpen className="h-4 w-4 text-amber-400 shrink-0" />
            ) : (
              <Folder className="h-4 w-4 text-amber-400 shrink-0" />
            )}
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <File className={cn("h-4 w-4 shrink-0", getFileIcon(file.name))} />
          </>
        )}
        <span className="truncate">{file.name}</span>
      </div>
      {isFolder && isOpen && file.children && (
        <div>
          {file.children.map((child) => (
            <FileNode
              key={child.id}
              file={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer({ files, onFileSelect, selectedFile }: FileExplorerProps) {
  return (
    <div className="h-full overflow-auto py-2" data-testid="file-explorer">
      <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
        Explorer
      </div>
      <FileNode file={files} depth={0} onFileSelect={onFileSelect} selectedFile={selectedFile} />
    </div>
  );
}
