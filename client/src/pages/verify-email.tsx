import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useSpaceChildAuth } from "@/hooks/useSpaceChildAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react";

export default function VerifyEmailPage() {
  const [, setLocation] = useLocation();
  const { verifyEmail } = useSpaceChildAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    verifyEmail(token).then((result) => {
      if (result.success) {
        setStatus("success");
        setMessage("Your email has been verified successfully!");
      } else {
        setStatus("error");
        setMessage(result.error || "Verification failed. The link may have expired.");
      }
    });
  }, [verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === "loading" && (
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            )}
            {status === "error" && (
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            )}
          </div>
          <CardTitle>
            {status === "loading" && "Verifying your email..."}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {status === "success" && (
            <Button onClick={() => setLocation("/")} data-testid="button-go-home">
              Go to SpaceChildDev
            </Button>
          )}
          {status === "error" && (
            <>
              <Button onClick={() => setLocation("/")} data-testid="button-go-home-error">
                Go to Home
              </Button>
              <Button variant="outline" onClick={() => setLocation("/")} className="gap-2">
                <Mail className="h-4 w-4" />
                Request new verification link
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
