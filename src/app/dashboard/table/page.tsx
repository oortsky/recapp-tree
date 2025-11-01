"use client";

import * as React from "react";
import { DataTable } from "./data-table";
import { columns, type Recap } from "./columns";
import { type DateRange } from "react-day-picker";
import { useAuth } from "@/hooks/use-auth";
import { getRecapsByUserPeriodGroupedByType } from "@/db/appwrite";
import Loading from "@/app/loading";

export default function Page() {
  const { user } = useAuth();
  const [groupedRecaps, setGroupedRecaps] = React.useState<
    Record<string, Recap[]>
  >({});
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
    if (!user?.$id || !period?.from || !period?.to) {
      setLoading(false);
      return;
    }

    const { from, to } = period;

    (async () => {
      setLoading(true);
      try {
        const data = await getRecapsByUserPeriodGroupedByType(
          user.$id,
          from.toISOString(),
          to.toISOString()
        );
        setGroupedRecaps(data as Record<string, Recap[]>);
      } catch (error) {
        console.error("Failed to fetch recaps:", error);
        setGroupedRecaps({});
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.$id, period?.from, period?.to]);

  const handlePeriodChange = (newPeriod: DateRange | undefined) => {
    setPeriod(newPeriod);
    if (newPeriod) {
      localStorage.setItem(
        "recapp:period",
        JSON.stringify({
          from: newPeriod.from?.toISOString(),
          to: newPeriod.to?.toISOString()
        })
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto pt-[84px] pb-4 px-4 space-y-6">
      <DataTable
        columns={columns}
        datas={groupedRecaps}
        period={period}
        setPeriod={handlePeriodChange}
      />
    </div>
  );
}
