import type { Metadata } from "next";
import { ProtectedRoute } from "@/components/protected-route";

export const metadata: Metadata = {
  title: "Recapp - Dashboard"
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
