"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { TypeItem } from "@/components/items/type-item";
import { DrawerDialog } from "@/components/drawer-dialog";
import { TypeForm } from "@/components/forms/type-form";
import { Plus, Search } from "lucide-react";
import { getAllTypes } from "@/db/appwrite";

export function TypeCard() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [types, setTypes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getAllTypes();
        setTypes(data);
      } catch (err) {
        console.error("Failed to fetch types:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleClick = () => setOpen(true);

  const filteredTypes = types.filter(type =>
    type.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Type List</CardTitle>
          <CardDescription>Shows a list of types.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between gap-2 mb-4">
            <InputGroup
              data-empty={!query}
              className="flex-1 rounded-full [&[data-empty=true]_*]:text-muted-foreground [&:not([data-empty=true])_*]:text-foreground"
            >
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search type..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </InputGroup>
            <Button
              onClick={handleClick}
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Add Type"
            >
              <Plus className="size-4" />
              <span className="sr-only">Add Type</span>
            </Button>
          </div>

          <ScrollArea className="max-h-[200px] w-full overflow-auto">
            <div className="flex flex-col gap-4">
              {loading ? (
                <Skeleton className="h-[100px] w-full" />
              ) : filteredTypes.length > 0 ? (
                filteredTypes.map(type => (
                  <TypeItem
                    key={type?.id}
                    id={type?.id}
                    label={type?.label}
                    value={type?.value}
                  />
                ))
              ) : (
                <EmptyType />
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <span className="text-sm text-muted-foreground">
            To find faster, use the search input.
          </span>
        </CardFooter>
      </Card>

      <DrawerDialog
        open={open}
        setOpen={setOpen}
        title="Add new type"
        description="Make a new type here. Click submit when you're done."
      >
        <TypeForm setOpen={setOpen} />
      </DrawerDialog>
    </>
  );
}

function EmptyType() {
  return (
    <div className="flex flex-col border p-4 rounded-md bg-muted/20 gap-2">
      <p className="text-sm text-muted-foreground text-center">
        No type found.
      </p>
      <p className="text-sm text-center">Please add a new type.</p>
    </div>
  );
}
