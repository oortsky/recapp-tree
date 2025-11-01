import * as React from "react";
import { MoreButton } from "@/components/buttons/more-button";

export interface TypeItemProps {
  id: string;
  label: string;
  value: number;
}

export function TypeItem({ id, label, value }: TypeItemProps) {
  return (
    <div
      id={id}
      className="flex flex-col border p-4 rounded-md bg-muted/20 gap-2"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-extrabold">{label}</h1>
        <MoreButton mode="type" item_id={id} />
      </div>

      <div className="text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Reward</span>
          <span>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0
            }).format(value)}
            /pcs
          </span>
        </div>
      </div>
    </div>
  );
}
