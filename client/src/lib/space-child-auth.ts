const SPACE_CHILD_AUTH_URL = import.meta.env.VITE_SPACE_CHILD_AUTH_URL || "https://space-child-dream.replit.app";
const SUBDOMAIN = "spacechilddev";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

interface AuthResult {
  success: boolean;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  requiresVerification?: boolean;
  error?: string;
}

class SpaceChildAuthClient {
  private baseUrl: string;
  private subdomain: string;

  constructor() {
    this.baseUrl = SPACE_CHILD_AUTH_URL;
    this.subdomain = SUBDOMAIN;
  }

  private getTokens(): AuthTokens | null {
    const accessToken = localStorage.getItem("space_child_access_token");
    const refreshToken = localStorage.getItem("space_child_refresh_token");
    if (!accessToken || !refreshToken) return null;
    return { accessToken, refreshToken };
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem("space_child_access_token", accessToken);
    localStorage.setItem("space_child_refresh_token", refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem("space_child_access_token");
    localStorage.removeItem("space_child_refresh_token");
  }

  getAccessToken(): string | null {
    return localStorage.getItem("space_child_access_token");
  }

  async register(email: string, password: string, firstName?: string, lastName?: string): Promise<AuthResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/space-child-auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }

      return {
        success: true,
        user: data.user,
        requiresVerification: data.requiresVerification,
      };
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  }

  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/space-child-auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Login failed",
          requiresVerification: data.requiresVerification,
        };
      }

      if (data.accessToken && data.refreshToken) {
        this.setTokens(data.accessToken, data.refreshToken);
      }

      return {
        success: true,
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  }

  async verifyEmail(token: string): Promise<AuthResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/space-child-auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Verification failed" };
      }

      if (data.accessToken && data.refreshToken) {
        this.setTokens(data.accessToken, data.refreshToken);
      }

      return {
        success: true,
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  }

  async forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/space-child-auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Failed to send reset email" };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  }

  async resetPassword(token: string, password: string): Promise<AuthResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/space-child-auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Password reset failed" };
      }

      if (data.accessToken && data.refreshToken) {
        this.setTokens(data.accessToken, data.refreshToken);
      }

      return {
        success: true,
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  }

  async resendVerification(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/space-child-auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Failed to resend verification" };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  }

  async refreshTokens(): Promise<AuthResult> {
    const tokens = this.getTokens();
    if (!tokens) {
      return { success: false, error: "No refresh token" };
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/space-child-auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        this.clearTokens();
        return { success: false, error: data.error || "Token refresh failed" };
      }

      this.setTokens(data.accessToken, data.refreshToken);

      return {
        success: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  }

  async getUser(): Promise<User | null> {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const response = await fetch(`${this.baseUrl}/api/space-child-auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          const refreshResult = await this.refreshTokens();
          if (refreshResult.success) {
            return this.getUser();
          }
        }
        return null;
      }

      return response.json();
    } catch (error) {
      return null;
    }
  }

  async logout(): Promise<void> {
    const token = this.getAccessToken();
    if (token) {
      try {
        await fetch(`${this.baseUrl}/api/space-child-auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    this.clearTokens();
  }

  loginWithSSO(): void {
    const callback = `${window.location.origin}/sso/callback`;
    const ssoUrl = `${this.baseUrl}/api/space-child-auth/sso/authorize?subdomain=${this.subdomain}&callback=${encodeURIComponent(callback)}`;
    window.location.href = ssoUrl;
  }

  handleSSOCallback(): AuthResult | null {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    if (accessToken && refreshToken) {
      this.setTokens(accessToken, refreshToken);
      window.history.replaceState({}, document.title, window.location.pathname);
      return { success: true, accessToken, refreshToken };
    }

    return null;
  }
}

export const spaceChildAuth = new SpaceChildAuthClient();
export type { User, AuthResult, AuthTokens };
