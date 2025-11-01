import { TimeVisual } from "@/components/cosmetics/time-visual";
import { Greeting } from "@/components/cosmetics/greeting";
import { RevenueCard } from "@/components/cards/revenue-card";
import { TypeCard } from "@/components/cards/type-card";
import { RecapCard } from "@/components/cards/recap-card";
import { ExTable } from "@/components/ex-table";
import { Fab } from "@/components/fab";

export default function Page() {
  return (
    <section className="w-full flex flex-col gap-5 pt-[84px] pb-[120px] px-4">
      <TimeVisual />
      <Greeting />
      <RevenueCard />
      <TypeCard />
      <RecapCard />
      <ExTable />
      <Fab />
    </section>
  );
}
