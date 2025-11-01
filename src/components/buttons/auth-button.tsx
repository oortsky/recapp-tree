"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function AuthButton() {
  const { signIn, signOut, isLoading, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = isAuthenticated ? await signOut() : await signIn();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (isLoading) {
    return <Skeleton className="h-9 w-20 rounded-full" />;
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant="secondary"
      className="rounded-full"
    >
      {loading ? (
        <Spinner className="size-4" />
      ) : isAuthenticated ? (
        <LogOut className="size-4 hidden md:block" />
      ) : (
        <LogIn className="size-4 hidden md:block" />
      )}{" "}
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </Button>
  );
}
