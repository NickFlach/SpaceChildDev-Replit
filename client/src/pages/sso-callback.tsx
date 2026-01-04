import { useEffect } from "react";
import { useLocation } from "wouter";
import { spaceChildAuth } from "@/lib/space-child-auth";
import { Loader2, Sparkles } from "lucide-react";

export default function SSOCallbackPage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const result = spaceChildAuth.handleSSOCallback();
    
    if (result?.success) {
      setLocation("/");
    } else {
      setTimeout(() => setLocation("/"), 1000);
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
        <Sparkles className="h-10 w-10 text-primary animate-pulse" />
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Completing sign in...</span>
      </div>
    </div>
  );
}
