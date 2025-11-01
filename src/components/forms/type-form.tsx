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
import { createType, getTypeById, updateType } from "@/db/appwrite";
import { Tag } from "lucide-react";

const formSchema = z.object({
  label: z.string().min(1, "Label must be at least 1 character."),
  value: z.number().min(1, "Value must be at least 1 IDR.")
});

interface TypeFormProps extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  setOpen: (open: boolean) => void;
  item_id?: string | null;
}

export function TypeForm({ className, setOpen, item_id }: TypeFormProps) {
  const [loading, setLoading] = React.useState(!!item_id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      label: "",
      value: 0
    }
  });

  React.useEffect(() => {
    if (!item_id) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const existingType = await getTypeById(item_id);
        if (existingType) {
          form.reset({
            label: existingType.label,
            value: existingType.value
          });
        }
      } catch (error) {
        console.error("Error fetching type:", error);
        toast.error("Failed to fetch type data");
      } finally {
        setLoading(false);
      }
    })();
  }, [item_id, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let res;

      if (item_id) {
        res = await updateType(item_id, values);
        toast.success("Type updated successfully!");
      } else {
        res = await createType(values);
        toast.success("Type created successfully!");
      }

      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error saving type:", error);
      toast.error("Failed to save type");
    }
  };

  return (
    <form
      id="type"
      className={cn("grid items-start gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldSet>
        <FieldGroup>
          {/* Label */}
          <div className="grid gap-3">
            <Controller
              name="label"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Label</FieldLabel>
                  <InputGroup
                    data-empty={!field.value}
                    className="[&[data-empty=true]_*]:text-muted-foreground [&:not([data-empty=true])_*]:text-foreground"
                    data-disabled={loading}
                  >
                    <InputGroupAddon>
                      {loading ? <Spinner /> : <Tag className="size-4" />}
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder={loading ? "Loading..." : "e.g. 7187"}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      disabled={loading}
                    />
                  </InputGroup>
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Value */}
          <div className="grid gap-3">
            <Controller
              name="value"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Reward</FieldLabel>
                  <InputGroup
                    data-empty={!field.value}
                    className="[&[data-empty=true]_*]:text-muted-foreground [&:not([data-empty=true])_*]:text-foreground"
                    data-disabled={loading}
                  >
                    <InputGroupAddon>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <InputGroupText>Rp</InputGroupText>
                      )}
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
                      <InputGroupText>IDR/PCS</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.error && (
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
