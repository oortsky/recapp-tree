"use client";

import * as React from "react";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface PeriodPickerProps {
  period: DateRange | undefined;
  onPeriodChange: (period: DateRange | undefined) => void;
}

export function PeriodPicker({ period, onPeriodChange }: PeriodPickerProps) {
  const [open, setOpen] = React.useState(false);

  const formatPeriod = (range: DateRange | undefined) => {
    if (!range?.from) return "Select period";
    if (!range.to) return range.from.toLocaleDateString();
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
  };

  const handleDateChange = (range: DateRange | undefined) => {
    onPeriodChange(range);

    if (range) {
      localStorage.setItem(
        "recapp:period",
        JSON.stringify({
          from: range.from?.toISOString(),
          to: range.to?.toISOString()
        })
      );
    }

    if (range?.from && range?.to) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-sm justify-between font-normal data-[empty=true]:text-muted-foreground dark:bg-input/30 px-3 rounded-full"
        >
          <div className="flex items-center justify-start text-left gap-3">
            <CalendarIcon className="size-4" />
            {formatPeriod(period)}
          </div>
          <ChevronDown className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="center">
        <Calendar
          mode="range"
          defaultMonth={period?.from}
          selected={period}
          onSelect={handleDateChange}
          disabled={{ dayOfWeek: [0] }}
          captionLayout="dropdown"
          className="rounded-lg border-0 shadow-none"
          min={1}
          max={31}
          required
        />
      </PopoverContent>
    </Popover>
  );
}
