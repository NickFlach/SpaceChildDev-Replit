import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import VerifyEmailPage from "@/pages/verify-email";
import ResetPasswordPage from "@/pages/reset-password";
import SSOCallbackPage from "@/pages/sso-callback";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verify-email" component={VerifyEmailPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/sso/callback" component={SSOCallbackPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
