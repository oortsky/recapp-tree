"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MoreButton } from "@/components/buttons/more-button";

type Type = {
  $id: string;
  label: string;
  value: number;
};

export type Recap = {
  id: string;
  user_id: string;
  amount: number;
  type: Type | null;
  date: string;
  revenue: number;
};

export const columns: ColumnDef<Recap>[] = [
  {
    accessorKey: "amount",
    header: () => <div className="text-left">Jumlah</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="text-left font-medium">{amount} pcs</div>;
    }
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">Tanggal</div>,
    cell: ({ row }) => {
      const dateValue = row.getValue("date");
      const date = new Date(dateValue as string);
      const formatted = date.toLocaleDateString("id-ID");
      return <div className="text-center font-medium">{formatted}</div>;
    }
  },
  {
    accessorKey: "revenue",
    header: () => <div className="text-right">Pendapatan</div>,
    cell: ({ row }) => {
      const revenue = parseFloat(row.getValue("revenue"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(revenue);
      return <div className="text-right font-medium">{formatted}</div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const recap = row.original;
      return (
        <div className="text-center">
          <MoreButton mode="recap" item_id={recap.id} />
        </div>
      );
    }
  }
];
