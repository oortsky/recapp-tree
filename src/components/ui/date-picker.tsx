"use client";

import * as React from "react";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface DatePickerProps {
  id?: string;
  name?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  "aria-invalid"?: boolean;
}

export function DatePicker({
  id,
  name,
  value,
  onChange,
  placeholder = "Select date",
  className,
  disabled = false,
  loading,
  "aria-invalid": ariaInvalid
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          variant="outline"
          data-empty={!value}
          aria-invalid={ariaInvalid}
          disabled={disabled}
          className={cn(
            "w-full justify-between text-base font-normal border-input data-[empty=true]:text-muted-foreground dark:bg-input/30 disabled:bg-input/30 px-3",
            className
          )}
        >
          <div className="flex items-center justify-start text-left gap-3">
            {loading ? <Spinner /> : <CalendarIcon className="size-4" />}
            {value ? value.toLocaleDateString() : placeholder}
          </div>
          <ChevronDown className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto overflow-hidden p-0" align="center">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={date => {
            onChange?.(date);
            setOpen(false);
          }}
          disabled={{ dayOfWeek: [0] }}
        />
      </PopoverContent>
    </Popover>
  );
}
