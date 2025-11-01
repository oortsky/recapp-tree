import * as React from "react";
import { format } from "date-fns";
import { id as idn } from "date-fns/locale";
import { MoreButton } from "@/components/buttons/more-button";

export interface RecapItemProps {
  id: string;
  amount: number;
  type_label: string;
  date: string;
  revenue: number;
}

export function RecapItem({
  id,
  amount,
  type_label,
  date,
  revenue
}: RecapItemProps) {
  return (
    <div
      id={id}
      className="flex flex-col border p-4 rounded-md bg-muted/20 gap-2"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-sm font-extrabold">
            {format(new Date(date), "dd MMMM yyyy", { locale: idn })}
          </h1>
        </div>
        <MoreButton mode="recap" item_id={id} />
      </div>
      <div className="text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Type</span>
          <span>{type_label}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Amount</span>
          <span>{amount} pcs</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Revenue</span>
          <span>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0
            }).format(revenue)}
          </span>
        </div>
      </div>
    </div>
  );
}
