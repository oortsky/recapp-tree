"use client";

import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { getRecentRecapsByUserId } from "@/db/appwrite";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RecapItem } from "@/components/items/recap-item";

export function RecapCard() {
  const { user } = useAuth();
  const [recaps, setRecaps] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user?.$id) return;

    (async () => {
      try {
        const data = await getRecentRecapsByUserId(user.$id);
        setRecaps(data);
      } catch (error) {
        console.error("Failed to fetch recaps:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.$id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recap List</CardTitle>
        <CardDescription>
          Shows a list of recaps from the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[300px] w-full overflow-auto">
          <div className="flex flex-col gap-4">
            {loading ? (
              <Skeleton className="h-[150px] w-full rounded-md" />
            ) : recaps.length > 0 ? (
              recaps.map(recap => (
                <RecapItem
                  key={recap?.id}
                  id={recap?.id}
                  amount={recap?.amount}
                  type_label={recap?.type?.label}
                  date={recap?.date}
                  revenue={recap?.revenue}
                />
              ))
            ) : (
              <EmptyRecap />
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <span className="text-sm text-muted-foreground">
          For more complete data, see the table.
        </span>
      </CardFooter>
    </Card>
  );
}

function EmptyRecap() {
  return (
    <div className="flex flex-col border p-4 rounded-md bg-muted/20 gap-2">
      <p className="text-sm text-muted-foreground text-center">
        No recap found.
      </p>
      <p className="text-sm text-center">Please add a new recap.</p>
    </div>
  );
}
