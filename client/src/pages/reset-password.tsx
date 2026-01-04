import { useState } from "react";
import { useLocation } from "wouter";
import { useSpaceChildAuth } from "@/hooks/useSpaceChildAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle, Lock, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ResetPasswordPage() {
  const [, setLocation] = useLocation();
  const { resetPassword } = useSpaceChildAuth();
  const { toast } = useToast();
  const [status, setStatus] = useState<"form" | "loading" | "success" | "error">("form");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Invalid Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")} className="w-full" data-testid="button-go-home">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }

    if (password.length < 8) {
      toast({ title: "Error", description: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }

    setStatus("loading");

    const result = await resetPassword(token, password);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Password reset failed");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle>Password Reset!</CardTitle>
            <CardDescription>
              Your password has been updated successfully. You can now sign in with your new password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")} className="w-full" data-testid="button-go-login">
              Go to SpaceChildDev
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Reset Failed</CardTitle>
            <CardDescription>{errorMessage}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button onClick={() => setStatus("form")} data-testid="button-try-again">
              Try Again
            </Button>
            <Button variant="outline" onClick={() => setLocation("/")} data-testid="button-go-home-error">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  data-testid="input-new-password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  data-testid="input-confirm-password"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={status === "loading"} data-testid="button-reset-submit">
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
