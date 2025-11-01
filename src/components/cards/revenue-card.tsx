"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import { useAuth } from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PeriodPicker } from "@/components/period-picker";
import { getTotalRevenueByUserByPeriod } from "@/db/appwrite";

export function RevenueCard() {
  const { user } = useAuth();
  const [totalRevenue, setTotalRevenue] = React.useState(0);
  const [period, setPeriod] = React.useState<DateRange | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const saved = localStorage.getItem("recapp:period");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPeriod({
        from: parsed.from ? new Date(parsed.from) : undefined,
        to: parsed.to ? new Date(parsed.to) : undefined
      });
    } else {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);

      setPeriod({
        from: thirtyDaysAgo,
        to: today
      });
    }
  }, []);

  React.useEffect(() => {
    if (!user?.$id || !period?.from || !period?.to) return;

    const { from, to } = period;

    (async () => {
      setLoading(true);
      try {
        const data = await getTotalRevenueByUserByPeriod(
          user.$id,
          from.toISOString(),
          to.toISOString()
        );
        setTotalRevenue(data);
      } catch (error) {
        console.error("Failed to fetch revenue:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.$id, period?.from, period?.to]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>
          Select a period to view your total income.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PeriodPicker period={period} onPeriodChange={setPeriod} />
        {loading ? (
          <Skeleton className="h-[40px] w-full" />
        ) : (
          <p className="text-4xl font-bold">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
          }).format(totalRevenue)}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          Adjust the period to see different results.
        </span>
      </CardFooter>
    </Card>
  );
}
