import type { Metadata } from "next";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { FileX } from "lucide-react";

export const metadata: Metadata = {
  title: "Recapp - Not Found",
};

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <Empty>
        <EmptyHeader>
          <FileX className="size-8" />
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>
            <Link href="/">Return Home</Link>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </main>
  );
}
