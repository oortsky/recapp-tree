"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import {
  ColumnDef,
  VisibilityState,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  OnChangeFn
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { PeriodPicker } from "@/components/period-picker";
import { Combobox } from "@/components/ui/combobox";
import { ChevronDown, Columns3Cog, Download } from "lucide-react";
import html2canvas from "html2canvas";

import { getAllTypes } from "@/db/appwrite";
import { type Recap } from "./columns";

type TypeFromDB = {
  id?: string;
  $id?: string;
  label: string;
  value: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  datas: Record<string, Recap[]>;
  period: DateRange | undefined;
  setPeriod: (period: DateRange | undefined) => void;
}

export function DataTable<TData, TValue>({
  columns,
  datas,
  period,
  setPeriod
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [types, setTypes] = React.useState<TypeFromDB[]>([]);
  const [selectedTypeKey, setSelectedTypeKey] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const [downloading, setDownloading] = React.useState(false);

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

  const filteredDatas = React.useMemo(() => {
    if (!selectedTypeKey) return datas;

    const filtered = Object.entries(datas).reduce(
      (acc, [key, recaps]) => {
        if (key === selectedTypeKey) {
          acc[key] = recaps;
        }
        return acc;
      },
      {} as Record<string, Recap[]>
    );
    return filtered;
  }, [datas, selectedTypeKey]);

  const typeOptions = React.useMemo(() => {
    const options = [{ id: "", label: "All Types", value: 0 }];

    const datasKeys = Object.keys(datas);

    datasKeys.forEach(key => {
      const typeInfo = types.find(t => {
        const tId = t.$id || t.id || "";
        return t.label === key || tId === key;
      });

      if (typeInfo) {
        options.push({
          id: key,
          label: typeInfo.label,
          value: typeInfo.value
        });
      } else {
        options.push({
          id: key,
          label: key,
          value: 0
        });
      }
    });
    return options;
  }, [types, datas]);

  const totalRevenue = React.useMemo(() => {
    return Object.values(filteredDatas).reduce((total, recaps) => {
      return total + recaps.reduce((sum, recap) => sum + recap.revenue, 0);
    }, 0);
  }, [filteredDatas]);

  const handleTypeChange = (id: string | null) => {
    setSelectedTypeKey(id || "");
  };

  const captureAllTables = async () => {
    setDownloading(true);

    try {
      const container = document.querySelector(".tables-container");

      if (!container) {
        console.warn("Container not found");
        return;
      }

      const canvas = await html2canvas(container as HTMLElement, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true
      });

      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      const date = new Date();
      const dateStr = date.toISOString().split("T")[0];
      const periodStr = period?.from
        ? `${period.from.toLocaleDateString("id-ID")}-${
            period.to?.toLocaleDateString("id-ID") || "sekarang"
          }`
        : dateStr;

      link.download = `rekapan-${periodStr.replace(/\//g, "-")}.png`;
      link.href = imgData;
      link.click();
    } catch (error) {
      console.error("Error capturing tables:", error);
    } finally {
      setDownloading(false);
    }
  };

  const sampleData = Object.values(filteredDatas)[0] || [];
  const sampleTable = useReactTable({
    data: sampleData as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Period Control */}
        <PeriodPicker period={period} onPeriodChange={setPeriod} />

        {/* Type Control */}
        <Combobox
          placeholder="Filter type..."
          options={typeOptions}
          value={selectedTypeKey}
          onChange={handleTypeChange}
          className="w-full max-w-sm rounded-full"
        />

        {/* View Control - Berlaku untuk semua tabel */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full max-w-sm justify-between font-normal dark:bg-input/30 px-3 rounded-full"
            >
              <div className="flex items-center justify-start text-left gap-3">
                <Columns3Cog className="size-4" />
                Columns
              </div>
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sampleTable
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value =>
                      setColumnVisibility(prev => ({
                        ...prev,
                        [column.id]: !!value
                      }))
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Download Button */}
        <Button
          className="w-full max-w-sm rounded-full"
          variant="outline"
          onClick={captureAllTables}
          disabled={downloading}
        >
          {downloading ? (
            <Spinner className="size-4" />
          ) : (
            <Download className="size-4" />
          )}
          Download
        </Button>
      </div>

      <div className="tables-container">
        {/* Total Revenue Card */}
        <div className="overflow-hidden rounded-md border w-full h-fit mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center font-bold">
                  Total Pendapatan
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0
                  }).format(totalRevenue)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Tables grouped by type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(filteredDatas).length > 0 ? (
            Object.entries(filteredDatas).map(([key, recaps]) => {
              const typeInfo = types.find(t => {
                const tId = t.$id || t.id || "";
                return t.label === key || tId === key;
              });

              const firstRecapType = recaps[0]?.type;
              const finalLabel =
                typeInfo?.label || firstRecapType?.label || key;
              const finalValue = typeInfo?.value || firstRecapType?.value || 0;

              return (
                <TableRecap
                  key={key}
                  columns={columns}
                  data={recaps}
                  typeLabel={finalLabel}
                  typeValue={finalValue}
                  columnVisibility={columnVisibility}
                  columnFilters={columnFilters}
                  setColumnFilters={setColumnFilters}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No recaps found for the selected period and type.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TableRecapProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Recap[];
  typeLabel: string;
  typeValue: number;
  columnVisibility: VisibilityState;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}

function TableRecap<TData, TValue>({
  columns,
  data,
  typeLabel,
  typeValue,
  columnVisibility,
  columnFilters,
  setColumnFilters
}: TableRecapProps<TData, TValue>) {
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }, [data]);

  const table = useReactTable({
    data: sortedData as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters as OnChangeFn<ColumnFiltersState>,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      columnFilters
    }
  });

  const filteredRows = table.getFilteredRowModel().rows;
  const subtotalAmount = filteredRows.reduce(
    (sum, row) => sum + (row.original as any).amount,
    0
  );
  const subtotalRevenue = filteredRows.reduce(
    (sum, row) => sum + (row.original as any).revenue,
    0
  );

  return (
    <div className="overflow-hidden rounded-md border w-full h-fit">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold" colSpan={4}>
              {typeLabel}
            </TableHead>
          </TableRow>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {filteredRows?.length ? (
            filteredRows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-left">Subtotal</TableCell>
            <TableCell className="text-center">
              {subtotalAmount} pcs ×{" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0
              }).format(typeValue)}
            </TableCell>
            <TableCell className="text-right">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0
              }).format(subtotalRevenue)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
