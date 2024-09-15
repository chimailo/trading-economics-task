"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { columns, Market } from "./columns";
import { fetchMarkets } from "@/lib/requests";
import { formatDateTime, formatValue } from "@/lib/utils";
import DataTable from "./data-table";
import { Country, useCountry } from "@/hooks/useCountry";

function Layout({ children }: { children: React.ReactNode }) {
  const { country } = useCountry();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl capitalize">
          Markets in {country}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function CountryMarkets() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") as Country | null;

  const { data, error, status, refetch } = useQuery<Record<string, string>[]>({
    queryKey: [`/search/${country}`],
    queryFn: () => fetchMarkets(country as string),
  });

  if (status === "pending") {
    return (
      <Layout>
        {Array.from({ length: 10 }, (_, k) => (
          <div
            key={k}
            className="flex items-center justify-around h-12 overflow-auto shrink-0"
          >
            <Skeleton className="w-6 h-4 rounded"></Skeleton>
            <Skeleton className="w-48 h-4 rounded-full"></Skeleton>
            <Skeleton className="w-32 h-4 rounded-full"></Skeleton>
            <Skeleton className="w-36 h-4 rounded-full"></Skeleton>
            <Skeleton className="w-32 h-4 rounded-full"></Skeleton>
            <Skeleton className="w-24 h-4 rounded-full"></Skeleton>
          </div>
        ))}
        <div className="flex justify-end px-5">
          <Skeleton className="h-9 w-20" />
        </div>
      </Layout>
    );
  }

  if (status === "error") {
    return (
      <Layout>
        <div className="grid place-items-center min-h-[calc(100lvh_-_18rem)]">
          <div className="flex flex-col w-full items-center justify-center max-w-[40rem]">
            <p className="text-center font-medium mb-3">
              {error.message || "Failed to fetch"}
            </p>
            <Button onClick={() => refetch()}>
              Retry
              <RefreshCcw width={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const markets: Market[] = data.slice(0, data.length - 1).map((market) => {
    return {
      symbol: market["Symbol"],
      ticker: market["Ticker"],
      name: market["Name"],
      type: market["Type"],
      state: market["state"],
      last: formatValue(Number(market["Last"])),
      close: formatValue(Number(market["Close"])),
      closeDate: formatDateTime(market["CloseDate"]),
      marketCap: formatValue(
        Number(market["MarketCap"]),
        market["unit"],
        market["Type"],
        true
      ),
      url: market["URL"],
      dailyChange: formatValue(Number(market["DailyPercentualChange"])),
      yesterday: formatValue(Number(market["yesterday"])),
      lastUpdate: formatDateTime(market["LastUpdate"]),
    };
  });

  return (
    <Layout>
      <DataTable columns={columns} data={markets} />
    </Layout>
  );
}
