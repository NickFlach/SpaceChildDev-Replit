import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useSpaceChildAuth } from "@/hooks/useSpaceChildAuth";
import {
  Code2,
  Loader2,
  Mail,
  Lock,
  User,
  Sparkles,
  Rocket,
  ArrowLeft,
  CheckCircle,
  Shield,
  Bot,
  Activity,
} from "lucide-react";

type AuthView = "auth" | "forgot" | "verification-sent";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const {
    login,
    register,
    forgotPassword,
    resendVerification,
    loginWithSSO,
  } = useSpaceChildAuth();

  const [view, setView] = useState<AuthView>("auth");
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

    const result = await login(loginForm.email, loginForm.password);

    if (result.success) {
      toast({ title: "Welcome back!", description: "Entering Mission Control..." });
      setLocation("/ide");
    } else if (result.requiresVerification) {
      setPendingEmail(loginForm.email);
      setView("verification-sent");
    } else {
      toast({ title: "Mission aborted", description: result.error, variant: "destructive" });
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await register(
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
        toast({ title: "Mission initiated!", description: "Welcome to SpaceChildDev!" });
        setLocation("/ide");
      }
    } else {
      toast({ title: "Registration failed", description: result.error, variant: "destructive" });
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await forgotPassword(forgotEmail);

    if (result.success) {
      toast({
        title: "Recovery signal sent",
        description: "Check your inbox for the reset link.",
      });
      setView("auth");
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }

    setIsLoading(false);
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    const result = await resendVerification(pendingEmail);

    if (result.success) {
      toast({ title: "Signal resent", description: "Check your inbox for the verification link." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-cosmic relative overflow-hidden">
      <div className="starfield" />
      
      <div className="relative z-10 min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative">
          <Link href="/" className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-primary glow-violet">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg">SpaceChildDev</span>
          </Link>
          
          <div className="space-y-8 max-w-lg">
            <h1 className="text-5xl font-light text-white leading-tight">
              Welcome to <span className="text-gradient">Mission Control</span>
            </h1>
            <p className="text-xl text-white/60 font-light leading-relaxed">
              Your autonomous quality engineering command center awaits. 
              Sign in to deploy your agent fleet.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Bot, text: "31 QE agents at your command", color: "neon-cyan" },
                { icon: Shield, text: "Enterprise-grade security", color: "aurora-violet" },
                { icon: Activity, text: "Real-time quality metrics", color: "tdd-green" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/70">
                  <item.icon className={`h-5 w-5 text-[hsl(var(--${item.color}))]`} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-white/40">
            Part of the Space Child ecosystem
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center justify-center mb-8">
              <Link href="/" className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-primary glow-violet">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="font-semibold text-lg">SpaceChildDev</span>
              </Link>
            </div>
            
            <div className="glass-card p-8">
              {view === "verification-sent" ? (
                <div className="space-y-6 text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center glow-violet">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white">Check your transmissions</h3>
                    <p className="text-sm text-white/60 mt-2">
                      We've sent a verification signal to <strong className="text-white">{pendingEmail}</strong>
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      onClick={handleResendVerification}
                      disabled={isLoading}
                      className="border-white/20 text-white hover:bg-white/10"
                      data-testid="button-resend"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Resend Signal"}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setView("auth")}
                      className="text-white/60"
                      data-testid="button-back-auth"
                    >
                      Back to launch pad
                    </Button>
                  </div>
                </div>
              ) : view === "forgot" ? (
                <div className="space-y-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setView("auth")}
                    className="gap-2 text-white/60 -ml-2"
                    data-testid="button-back"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  
                  <div>
                    <h2 className="text-2xl font-light text-white">Reset your credentials</h2>
                    <p className="text-white/60 mt-2">Enter your email to receive a recovery signal.</p>
                  </div>
                  
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email" className="text-white/80">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                          id="forgot-email"
                          type="email"
                          placeholder="commander@mission.dev"
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                          data-testid="input-forgot-email"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full glow-violet" disabled={isLoading} data-testid="button-reset">
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Recovery Signal"}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-light text-white">Enter Mission Control</h2>
                    <p className="text-white/60 mt-2">Sign in or create your command access.</p>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-white/20 text-white hover:bg-white/10"
                    onClick={loginWithSSO}
                    data-testid="button-sso"
                  >
                    <Sparkles className="h-4 w-4 text-[hsl(var(--neon-cyan))]" />
                    Continue with Space Child Hub
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[hsl(var(--midnight-navy))] px-2 text-white/40">Or continue with</span>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/5">
                      <TabsTrigger value="login" className="data-[state=active]:bg-white/10" data-testid="tab-login">
                        Sign In
                      </TabsTrigger>
                      <TabsTrigger value="register" className="data-[state=active]:bg-white/10" data-testid="tab-register">
                        Create Account
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="mt-6">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email" className="text-white/80">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input
                              id="login-email"
                              type="email"
                              placeholder="commander@mission.dev"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                              value={loginForm.email}
                              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                              required
                              data-testid="input-login-email"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password" className="text-white/80">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input
                              id="login-password"
                              type="password"
                              placeholder="Enter access code"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
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
                          className="px-0 text-sm text-white/50 hover:text-white h-auto"
                          onClick={() => setView("forgot")}
                          data-testid="button-forgot"
                        >
                          Forgot access code?
                        </Button>
                        <Button type="submit" className="w-full gap-2 glow-violet" disabled={isLoading} data-testid="button-login">
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                            <>
                              <Rocket className="h-4 w-4" />
                              Launch Session
                            </>
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="register" className="mt-6">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="register-firstName" className="text-white/80">First Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                              <Input
                                id="register-firstName"
                                placeholder="Commander"
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                                value={registerForm.firstName}
                                onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                                data-testid="input-register-firstName"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="register-lastName" className="text-white/80">Last Name</Label>
                            <Input
                              id="register-lastName"
                              placeholder="Shepard"
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                              value={registerForm.lastName}
                              onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                              data-testid="input-register-lastName"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-email" className="text-white/80">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input
                              id="register-email"
                              type="email"
                              placeholder="commander@mission.dev"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                              value={registerForm.email}
                              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                              required
                              data-testid="input-register-email"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password" className="text-white/80">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input
                              id="register-password"
                              type="password"
                              placeholder="Create access code (min. 8 chars)"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                              value={registerForm.password}
                              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                              required
                              minLength={8}
                              data-testid="input-register-password"
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full gap-2 glow-violet" disabled={isLoading} data-testid="button-register">
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                            <>
                              <Rocket className="h-4 w-4" />
                              Initialize Mission
                            </>
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
            
            <p className="text-center text-xs text-white/30 mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
