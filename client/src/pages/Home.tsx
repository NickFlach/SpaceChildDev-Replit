import { useState } from "react";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { Header } from "@/components/Layout/Header";
import { ActivityBar, type ActivityView } from "@/components/Layout/ActivityBar";
import { StatusBar } from "@/components/Layout/StatusBar";
import { FileExplorer } from "@/components/IDE/FileExplorer";
import { CodeEditor } from "@/components/IDE/CodeEditor";
import { Terminal } from "@/components/IDE/Terminal";
import { AIAssistant } from "@/components/AI/AIAssistant";
import { QEDashboard } from "@/components/QE/QEDashboard";
import { mockFileTree } from "@/lib/mockData";
import type { ProjectFile } from "@shared/schema";

export default function Home() {
  const [activeView, setActiveView] = useState<ActivityView>("files");
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [openFiles, setOpenFiles] = useState<ProjectFile[]>([]);
  const [showTerminal, setShowTerminal] = useState(true);

  const handleFileSelect = (file: ProjectFile) => {
    if (file.type === "file") {
      setSelectedFile(file);
      if (!openFiles.find((f) => f.id === file.id)) {
        setOpenFiles((prev) => [...prev, file]);
      }
    }
  };

  const handleFileClose = (file: ProjectFile) => {
    setOpenFiles((prev) => prev.filter((f) => f.id !== file.id));
    if (selectedFile?.id === file.id) {
      const remaining = openFiles.filter((f) => f.id !== file.id);
      setSelectedFile(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const renderSidebarContent = () => {
    switch (activeView) {
      case "files":
        return (
          <FileExplorer
            files={mockFileTree}
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        );
      case "ai":
        return <AIAssistant />;
      case "qe":
        return <QEDashboard />;
      case "search":
        return (
          <div className="p-4 text-center text-muted-foreground">
            <p className="text-sm">Search across files</p>
            <input
              type="text"
              placeholder="Search..."
              className="mt-2 w-full px-3 py-2 bg-muted rounded-md text-sm"
            />
          </div>
        );
      case "git":
        return (
          <div className="p-4">
            <h3 className="font-semibold text-sm mb-3">Source Control</h3>
            <p className="text-sm text-muted-foreground">No changes detected</p>
          </div>
        );
      case "debug":
        return (
          <div className="p-4">
            <h3 className="font-semibold text-sm mb-3">Run and Debug</h3>
            <p className="text-sm text-muted-foreground">Configure launch.json to start debugging</p>
          </div>
        );
      case "extensions":
        return (
          <div className="p-4">
            <h3 className="font-semibold text-sm mb-3">Extensions</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>QE Agent Fleet - Installed</p>
              <p>TDD Workflow - Installed</p>
              <p>AI Assistant - Installed</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Determine sidebar width based on content type
  const getSidebarWidth = () => {
    if (activeView === "ai" || activeView === "qe") return 35;
    return 20;
  };

  return (
    <div className="h-screen flex flex-col bg-background" data-testid="home">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <ActivityBar activeView={activeView} onViewChange={setActiveView} />

        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Sidebar */}
          <ResizablePanel defaultSize={getSidebarWidth()} minSize={15} maxSize={50}>
            <div className="h-full bg-sidebar border-r overflow-hidden">
              {renderSidebarContent()}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Main content */}
          <ResizablePanel defaultSize={80 - getSidebarWidth()}>
            <ResizablePanelGroup direction="vertical">
              {/* Editor */}
              <ResizablePanel defaultSize={showTerminal ? 70 : 100} minSize={30}>
                <CodeEditor
                  file={selectedFile}
                  openFiles={openFiles}
                  onFileClose={handleFileClose}
                  onFileSelect={setSelectedFile}
                />
              </ResizablePanel>

              {showTerminal && (
                <>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={30} minSize={10} maxSize={50}>
                    <Terminal />
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <StatusBar errors={0} warnings={2} />
    </div>
  );
}
