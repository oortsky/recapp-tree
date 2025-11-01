"use client";

import React, { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/contexts/auth-provider";
import Loading from "@/app/loading";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  if (!authContext) {
    throw new Error("ProtectedRoute must be used within an AuthProvider");
  }

  const { user, isLoading } = authContext;

  useEffect(() => {
    if (!isLoading && !user && pathname.startsWith("/dashboard")) {
      router.push("/");
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <Loading />;
  }

  return user || !pathname.startsWith("/dashboard") ? <>{children}</> : null;
};
