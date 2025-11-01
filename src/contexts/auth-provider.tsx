"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  getUser,
  getSession,
  refreshSession,
  signIn,
  signOut
} from "@/lib/appwrite/auth";
import type { Models } from "appwrite";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  session: Models.Session | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: (sessionId?: string) => Promise<void>;
  refreshSession: (sessionId?: string) => Promise<Models.Session>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const REFRESH_THRESHOLD = 5 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [session, setSession] = useState<Models.Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [isActive, setIsActive] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      const currentSession = await getSession();
      if (currentSession) {
        setSession(currentSession);
        const currentUser = await getUser();
        setUser(currentUser);
      } else {
        setSession(null);
        setUser(null);
      }
    } catch (error) {
      console.error("[AuthProvider] Check session error:", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      setSession(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    const handleActivity = () => {
      setIsActive(true);
    };

    const resetActivity = () => {
      setIsActive(false);
    };
    const activityTimeout = setTimeout(resetActivity, 30 * 1000);

    events.forEach(event => window.addEventListener(event, handleActivity));

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, handleActivity)
      );
      clearTimeout(activityTimeout);
    };
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (!session || !isActive) {
      
      return;
    }

    const checkAndRefreshSession = async () => {
      const now = new Date().getTime();
      const expiry = new Date(session.expire).getTime();

      if (expiry - now <= REFRESH_THRESHOLD) {
      
        try {
          const newSession = await refreshSession();
          setSession(newSession);
        } catch (error) {
          console.error("[AuthProvider] Auto refresh session failed:", {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
          });
          setSession(null);
          setUser(null);
        }
      }
    };

    const interval = setInterval(checkAndRefreshSession, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [session, isActive]);

  const contextValue: AuthContextType = {
    user,
    session,
    isLoading,
    signIn: async () => {
      try {
        await signIn();
        await checkSession();
      } catch (error) {
        console.error("[AuthProvider] Sign-in failed:", {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    },
    signOut: async (sessionId = "current") => {
      try {
        await signOut({ sessionId });
        setUser(null);
        setSession(null);
        router.push("/");
      } catch (error) {
        console.error("[AuthProvider] Sign-out failed:", {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    },
    refreshSession: async (sessionId = "current") => {
      try {
        const newSession = await refreshSession({ sessionId });
        setSession(newSession);
        return newSession;
      } catch (error) {
        console.error("[AuthProvider] Manual session refresh failed:", {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
