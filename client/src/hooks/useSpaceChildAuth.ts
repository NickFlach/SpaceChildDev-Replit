import { useState, useEffect, useCallback } from "react";
import { spaceChildAuth, type User, type AuthResult } from "@/lib/space-child-auth";

interface UseSpaceChildAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  verifyEmail: (token: string) => Promise<AuthResult>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<AuthResult>;
  resendVerification: (email: string) => Promise<{ success: boolean; error?: string }>;
  loginWithSSO: () => void;
  refreshUser: () => Promise<void>;
}

export function useSpaceChildAuth(): UseSpaceChildAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const userData = await spaceChildAuth.getUser();
    setUser(userData);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      const ssoResult = spaceChildAuth.handleSSOCallback();
      if (ssoResult?.success) {
        await refreshUser();
      } else {
        await refreshUser();
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const result = await spaceChildAuth.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  const register = useCallback(async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ): Promise<AuthResult> => {
    return spaceChildAuth.register(email, password, firstName, lastName);
  }, []);

  const logout = useCallback(async () => {
    await spaceChildAuth.logout();
    setUser(null);
  }, []);

  const verifyEmail = useCallback(async (token: string): Promise<AuthResult> => {
    const result = await spaceChildAuth.verifyEmail(token);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    return spaceChildAuth.forgotPassword(email);
  }, []);

  const resetPassword = useCallback(async (token: string, password: string): Promise<AuthResult> => {
    const result = await spaceChildAuth.resetPassword(token, password);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  }, []);

  const resendVerification = useCallback(async (email: string) => {
    return spaceChildAuth.resendVerification(email);
  }, []);

  const loginWithSSO = useCallback(() => {
    spaceChildAuth.loginWithSSO();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    resendVerification,
    loginWithSSO,
    refreshUser,
  };
}
