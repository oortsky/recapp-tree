"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function AuthCard() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = await signIn();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Please sign in with your Google account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClick} disabled={loading} className="w-full">
          {loading ? (
            <Spinner className="size-4" />
          ) : (
            <LogIn className="size-4 hidden md:block" />
          )}{" "}
          Sign In with Google
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          By clicking the sign in button you agree to our terms and conditions.
        </p>
      </CardFooter>
    </Card>
  );
}
