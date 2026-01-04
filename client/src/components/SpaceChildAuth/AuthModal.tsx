import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail, Lock, User, ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { AuthResult } from "@/lib/space-child-auth";

type AuthView = "login" | "register" | "forgot" | "verification-sent";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (email: string, password: string) => Promise<AuthResult>;
  onRegister: (email: string, password: string, firstName?: string, lastName?: string) => Promise<AuthResult>;
  onForgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  onResendVerification: (email: string) => Promise<{ success: boolean; error?: string }>;
  onLoginWithSSO: () => void;
}

export function AuthModal({
  open,
  onOpenChange,
  onLogin,
  onRegister,
  onForgotPassword,
  onResendVerification,
  onLoginWithSSO,
}: AuthModalProps) {
  const { toast } = useToast();
  const [view, setView] = useState<AuthView>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await onLogin(loginForm.email, loginForm.password);

    if (result.success) {
      toast({ title: "Welcome back!", description: "You've successfully signed in." });
      onOpenChange(false);
      setLoginForm({ email: "", password: "" });
    } else if (result.requiresVerification) {
      setPendingEmail(loginForm.email);
      setView("verification-sent");
    } else {
      toast({ title: "Login failed", description: result.error, variant: "destructive" });
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await onRegister(
      registerForm.email,
      registerForm.password,
      registerForm.firstName,
      registerForm.lastName
    );

    if (result.success) {
      if (result.requiresVerification) {
        setPendingEmail(registerForm.email);
        setView("verification-sent");
      } else {
        toast({ title: "Account created!", description: "Welcome to SpaceChildDev!" });
        onOpenChange(false);
      }
      setRegisterForm({ email: "", password: "", firstName: "", lastName: "" });
    } else {
      toast({ title: "Registration failed", description: result.error, variant: "destructive" });
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await onForgotPassword(forgotEmail);

    if (result.success) {
      toast({
        title: "Check your email",
        description: "If an account exists, you'll receive a password reset link.",
      });
      setView("login");
      setForgotEmail("");
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }

    setIsLoading(false);
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    const result = await onResendVerification(pendingEmail);

    if (result.success) {
      toast({ title: "Email sent", description: "Check your inbox for the verification link." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }

    setIsLoading(false);
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            className="pl-10"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            required
            data-testid="input-login-email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            className="pl-10"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            required
            data-testid="input-login-password"
          />
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="px-0 text-sm h-auto"
        onClick={() => setView("forgot")}
        data-testid="button-forgot-password"
      >
        Forgot password?
      </Button>
      <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-login-submit">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="register-firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="register-firstName"
              placeholder="John"
              className="pl-10"
              value={registerForm.firstName}
              onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
              data-testid="input-register-firstName"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-lastName">Last Name</Label>
          <Input
            id="register-lastName"
            placeholder="Doe"
            value={registerForm.lastName}
            onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
            data-testid="input-register-lastName"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            className="pl-10"
            value={registerForm.email}
            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
            required
            data-testid="input-register-email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-password"
            type="password"
            placeholder="Min. 8 characters"
            className="pl-10"
            value={registerForm.password}
            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            required
            minLength={8}
            data-testid="input-register-password"
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-register-submit">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
      </Button>
    </form>
  );

  const renderForgotForm = () => (
    <div className="space-y-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setView("login")}
        className="gap-2"
        data-testid="button-back-to-login"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Button>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="forgot-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="forgot-email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
              data-testid="input-forgot-email"
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-forgot-submit">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );

  const renderVerificationSent = () => (
    <div className="space-y-4 text-center">
      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Mail className="h-8 w-8 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">Check your email</h3>
        <p className="text-sm text-muted-foreground mt-1">
          We've sent a verification link to <strong>{pendingEmail}</strong>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={handleResendVerification}
          disabled={isLoading}
          data-testid="button-resend-verification"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Resend Email"}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setView("login")}
          data-testid="button-back-to-login-verification"
        >
          Back to login
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Space Child Auth
          </DialogTitle>
          <DialogDescription>
            Sign in to SpaceChildDev to access your workspace and settings.
          </DialogDescription>
        </DialogHeader>

        {view === "verification-sent" ? (
          renderVerificationSent()
        ) : view === "forgot" ? (
          renderForgotForm()
        ) : (
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={onLoginWithSSO}
              data-testid="button-sso-login"
            >
              <Sparkles className="h-4 w-4" />
              Sign in with Space Child Hub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" data-testid="tab-login">Sign In</TabsTrigger>
                <TabsTrigger value="register" data-testid="tab-register">Create Account</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-4">
                {renderLoginForm()}
              </TabsContent>
              <TabsContent value="register" className="mt-4">
                {renderRegisterForm()}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
