"use client";

import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { ModeToggle } from "@/components/buttons/mode-toggle";
import { AuthButton } from "@/components/buttons/auth-button";
import { AppVersion } from "@/components/cosmetics/app-version";

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 p-4 bg-transparent backdrop-blur-md rounded-b-md z-50 dark:backdrop-brightness-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-end justify-between gap-2">
            <Link href="/">
              <span className="text-3xl tracking-wider font-bold drop-shadow-sm dark:shadow-white">
                Recapp
              </span>
            </Link>
            <AppVersion className="text-xs font-mono" />
          </div>
          <div className="flex items-end justify-between gap-2">
            <ModeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
