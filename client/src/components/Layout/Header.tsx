import { useState } from "react";
import { 
  Code2, 
  GitBranch, 
  Settings, 
  Bell, 
  Search,
  Cpu,
  Sparkles,
  User,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSpaceChildAuth } from "@/hooks/useSpaceChildAuth";
import { AuthModal } from "@/components/SpaceChildAuth/AuthModal";

interface HeaderProps {
  modelSavings?: number;
}

export function Header({ modelSavings = 75 }: HeaderProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resendVerification,
    loginWithSSO,
  } = useSpaceChildAuth();

  const getInitials = (firstName?: string, lastName?: string, email?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) {
      return firstName[0].toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <>
      <header className="h-12 border-b bg-background flex items-center justify-between px-4 gap-4" data-testid="header">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">SpaceChildDev</span>
          </div>

          <div className="h-4 w-px bg-border" />

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <GitBranch className="h-4 w-4" />
            <span>main</span>
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <Button variant="outline" className="w-full justify-start text-muted-foreground gap-2" data-testid="search-button">
            <Search className="h-4 w-4" />
            <span>Search files, commands...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">Ctrl</span>K
            </kbd>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-tdd-green/10 rounded-md" data-testid="model-savings">
            <Cpu className="h-4 w-4 text-tdd-green" />
            <span className="text-sm font-medium text-tdd-green">{modelSavings}% Saved</span>
          </div>

          <Badge variant="outline" className="gap-1.5">
            <Sparkles className="h-3 w-3 text-primary" />
            GPT-5
          </Badge>

          <div className="h-4 w-px bg-border" />

          <Button variant="ghost" size="icon" data-testid="button-notifications">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" data-testid="button-settings">
            <Settings className="h-4 w-4" />
          </Button>

          <ThemeToggle />

          <div className="h-4 w-px bg-border" />

          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profileImageUrl} alt={user.firstName || user.email} />
                    <AvatarFallback>
                      {getInitials(user.firstName, user.lastName, user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2" data-testid="menu-profile">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2" data-testid="menu-settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 text-destructive focus:text-destructive"
                  onClick={logout}
                  data-testid="menu-logout"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => setAuthModalOpen(true)}
              className="gap-2"
              data-testid="button-sign-in"
            >
              <Sparkles className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </header>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onLogin={login}
        onRegister={register}
        onForgotPassword={forgotPassword}
        onResendVerification={resendVerification}
        onLoginWithSSO={loginWithSSO}
      />
    </>
  );
}
