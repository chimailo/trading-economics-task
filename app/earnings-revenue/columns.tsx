"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EarningsRevenue = {
  symbol: string;
  name: string;
  date: string;
  fiscalTag: string;
  currency: string;
  marketCap: string | null;
  revenue: string;
  forecastRevenue: string;
  previousRevenue: string;
  lastUpdate: string;
};

export const columns: ColumnDef<EarningsRevenue>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "symbol", header: "Symbol" },
  {
    accessorKey: "date",
    header: () => <div className="whitespace-nowrap">Date</div>,
  },
  {
    accessorKey: "fiscalTag",
    header: "Fiscal Tag",
  },
  {
    accessorKey: "marketCap",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-right whitespace-nowrap px-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Market Cap (USD)
        <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("marketCap") as string;
      return <div className="text-right">{amount || "N/A"}</div>;
    },
  },
  {
    accessorKey: "previousRevenue",
    header: () => (
      <div className="text-right whitespace-nowrap">Previous Revenue</div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("previousRevenue") as string;
      return <div className="text-right">{amount || "N/A"}</div>;
    },
  },
  {
    accessorKey: "revenue",
    header: () => <div className="text-right whitespace-nowrap">Revenue</div>,
    cell: ({ row }) => {
      const amount = row.getValue("revenue") as string;
      return <div className="text-right">{amount || "N/A"}</div>;
    },
  },
  {
    accessorKey: "forecastRevenue",
    header: () => (
      <div className="text-right whitespace-nowrap">Revenue Forecast</div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("forecastRevenue") as string;
      return <div className="text-right">{amount || "N/A"}</div>;
    },
  },
  {
    accessorKey: "lastUpdate",
    header: () => <div className="whitespace-nowrap">Last Update</div>,
  },
];
