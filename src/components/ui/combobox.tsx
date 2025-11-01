"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

export interface ComboboxOption {
  id: string;
  label: string;
  value: number;
}

interface ComboboxProps {
  id?: string;
  name?: string;
  options: ComboboxOption[];
  placeholder?: string;
  emptyMessage?: string;
  value?: string | null;
  onChange?: (id: string | null) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  "aria-invalid"?: boolean;
}

export function Combobox({
  id,
  name,
  options,
  placeholder = "Select option...",
  emptyMessage = "No results found.",
  value,
  onChange,
  className,
  disabled = false,
  loading,
  "aria-invalid": ariaInvalid
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selected = options.find(opt => opt.id === value);

  const handleSelect = (id: string) => {
    onChange?.(id === value ? null : id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          type="button"
          variant="outline"
          role="combobox"
          data-empty={!selected}
          aria-invalid={ariaInvalid}
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between text-base font-normal border-input data-[empty=true]:text-muted-foreground dark:bg-input/30 disabled:bg-input/30 px-3",
            "w-full justify-between text-base font-normal  data-[empty=true]:text-muted-foreground dark:bg-input/30 disabled:bg-input/30 px-3",
            className
          )}
        >
          <div className="flex items-center justify-start text-left gap-3">
            {loading ? <Spinner /> : <Tag className="size-4" />}
            {selected ? selected.label : placeholder}
          </div>
          <ChevronsUpDown className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("w-[240px] p-0", className)}>
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map(opt => (
                <CommandItem
                  key={opt.id}
                  value={opt.label}
                  onSelect={() => handleSelect(opt.id)}
                >
                  {opt.label}
                  <Check
                    className={cn(
                      "ml-auto size-4",
                      value === opt.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
