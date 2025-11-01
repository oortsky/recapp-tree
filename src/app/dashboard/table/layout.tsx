import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recapp - Table"
};

export default function TableLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
