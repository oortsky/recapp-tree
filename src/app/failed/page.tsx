import type { Metadata } from "next";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from "@/components/ui/empty";
import { CircleX } from "lucide-react";

export const metadata: Metadata = {
  title: "Recapp - Failed",
};

export default function Page() {
  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <Empty>
        <EmptyHeader>
          <CircleX className="size-8" />
          <EmptyTitle>Failed</EmptyTitle>
          <EmptyDescription>
            Something went wrong. The operation could not be completed.
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
