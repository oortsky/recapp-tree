import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle
} from "@/components/ui/item";
import { ExternalLink } from "lucide-react";

export function ExTable() {
  return (
    <Item
      variant="outline"
      className="p-6 hover:bg-accent transition-colors"
      asChild
    >
      <a href="/dashboard/table" target="_blank" rel="noopener noreferrer">
        <ItemContent>
          <ItemTitle>Go to table.</ItemTitle>
          <ItemDescription>
            Opens the table in a new tab with desktop view.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <ExternalLink className="size-4" />
        </ItemActions>
      </a>
    </Item>
  );
}
