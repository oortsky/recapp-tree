"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldError,
  FieldLabel
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput
} from "@/components/ui/input-group";
import { Hash } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  createRecap,
  updateRecap,
  getRecapById,
  getAllTypes
} from "@/db/appwrite";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/date-picker";

const formSchema = z.object({
  user_id: z.string().min(1, "User ID cannot be empty."),
  amount: z.number().min(1, "Amount must be at least 1 piece."),
  type: z.object({
    id: z.string().min(1, "Type ID is required."),
    label: z.string().min(1, "Type label is required."),
    value: z.number().min(1, "Type value is required.")
  }),
  date: z.date()
});

interface RecapFormProps
  extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  setOpen: (open: boolean) => void;
  item_id?: string | null;
}

export function RecapForm({ className, setOpen, item_id }: RecapFormProps) {
  const { user } = useAuth();
  const [types, setTypes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(!!item_id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      user_id: user?.$id ?? "",
      amount: 0,
      type: { id: "", label: "", value: 0 },
      date: undefined
    }
  });

  React.useEffect(() => {
    (async () => {
      try {
        const fetchedTypes = await getAllTypes();
        setTypes(fetchedTypes);
      } catch (error) {
        console.error("Error fetching type:", error);
        toast.error("Failed to fetch type data");
      }
    })();

    if (!item_id) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const existingRecap = await getRecapById(item_id);

        if (existingRecap) {
          form.reset({
            user_id: existingRecap.user_id,
            amount: existingRecap.amount,
            type: {
              id: existingRecap?.type?.id,
              label: existingRecap?.type?.label,
              value: existingRecap?.type?.value
            },
            date: new Date(existingRecap.date)
          });
        }
      } catch (error) {
        console.error("Error fetching recap:", error);
        toast.error("Failed to fetch recap data");
      } finally {
        setLoading(false);
      }
    })();
  }, [item_id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const revenue = values.type.value * values.amount;

    const data = {
      user_id: values.user_id,
      amount: values.amount,
      type_id: values.type.id,
      date: values.date.toISOString(),
      revenue: revenue
    };

    try {
      let res;

      if (item_id) {
        res = await updateRecap(item_id, data);
        toast.success("Recap updated successfully!");
      } else {
        res = await createRecap(data);
        toast.success("Recap created successfully!");
      }

      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error details:", error)
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      toast.error("Failed to save recap.");
    }
  };

  return (
    <form
      id="recap"
      className={cn("grid items-start gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldSet>
        <FieldGroup>
          {/* Amount */}
          <div className="grid gap-3">
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                  <InputGroup
                    data-empty={!field.value}
                    className="[&[data-empty=true]_*]:text-muted-foreground [&:not([data-empty=true])_*]:text-foreground"
                    data-disabled={loading}
                  >
                    <InputGroupAddon>
                      {loading ? <Spinner /> : <Hash className="size-4" />}
                    </InputGroupAddon>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.value?.toString() ?? ""}
                      onChange={e => {
                        const val = Number(e.target.value);
                        field.onChange(isNaN(val) ? 0 : val);
                      }}
                      type="number"
                      inputMode="numeric"
                      placeholder={loading ? "Loading..." : "0"}
                      aria-invalid={fieldState.invalid}
                      disabled={loading}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>PCS</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Type */}
          <div className="grid gap-3">
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Type</FieldLabel>
                  <Combobox
                    id={field.name}
                    name={field.name}
                    options={types.map(t => ({
                      id: t.id,
                      label: t.label,
                      value: t.value
                    }))}
                    value={field.value?.id || null}
                    onChange={id => {
                      const selected = types.find(t => t.id === id);
                      if (selected) {
                        field.onChange({
                          id: selected.id,
                          label: selected.label,
                          value: selected.value
                        });
                      } else {
                        field.onChange({ id: "", label: "", value: 0 });
                      }
                    }}
                    placeholder={loading ? "Loading..." : "Select type..."}
                    aria-invalid={fieldState.invalid}
                    loading={loading}
                    disabled={loading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Date */}
          <div className="grid gap-3">
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                  <DatePicker
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onChange={date => field.onChange(date)}
                    placeholder={loading ? "Loading..." : "Select date"}
                    aria-invalid={fieldState.invalid}
                    loading={loading}
                    disabled={loading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>
      <Button type="submit" disabled={!form.formState.isValid}>
        Submit
      </Button>
    </form>
  );
}
