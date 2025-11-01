"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/auth-provider";
import Loading from "@/app/loading";

export const HomeRedirect: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error("[HomeRedirect] must be used within an AuthProvider");
  }

  const { user, isLoading } = authContext;

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  return user ? null : <>{children}</>;
};
