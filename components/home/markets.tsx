"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/hooks/useCountry";
import { cn, formatValue } from "@/lib/utils";
import { fetchMarkets } from "@/lib/requests";

export default function FeaturedMarkets() {
  const { country } = useCountry();

  const { data, error, status, refetch } = useQuery<Record<string, string>[]>({
    queryKey: [`/search/${country}`],
    queryFn: () => fetchMarkets(country),
  });

  if (status === "pending") {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-5">
        {Array.from({ length: 3 }, (_, k) => (
          <Card key={k} className="p-4 w-full space-y-4">
            <div className="flex iitems-center justify-between">
              <Skeleton className="h-4 rounded-full w-1/3" />
              <Skeleton className="h-4 rounded-full w-1/2" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 rounded-full w-2/3" />
              <Skeleton className="h-8 rounded-full w-3/4" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 rounded-full w-12" />
              <Skeleton className="h-4 rounded-full w-12" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <Card className="shadow-none">
        <CardContent className="w-full grid place-items-center sm:h-[23rem] md:h-[11rem]">
          <div className="flex flex-col items-center justify-center max-w-[40rem]">
            <p className="text-center font-medium mb-3">
              {error.message || "Failed to fetch"}
            </p>
            <Button onClick={() => refetch()}>
              Retry
              <RefreshCcw width={16} className="ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-5">
      {data
        .filter((market) => !!market["Ticker"])
        .slice(0, 3)
        .map((market, i) => (
          <Card key={market["Ticker"]} className="shadow-none p-4 space-y-4">
            <CardHeader className="p-0 gap-2 flex-row justify-between space-y-0 items-center">
              <p title={market["state"]} className="text-sm shrink-0">
                <span
                  className={cn(
                    "rounded-full w-2 h-2 inline-block mr-1",
                    market["state"] === "OPEN"
                      ? "bg-green-600"
                      : market["state"] === "CLOSED"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  )}
                ></span>
                <small>{market["Symbol"]}</small>
              </p>
              <p className="text-xs">
                Market Cap:{" "}
                {market["MarketCap"]
                  ? formatValue(
                      Number(market["MarketCap"]),
                      market["unit"],
                      market["Type"],
                      true
                    )
                  : "Not available"}
              </p>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <h1 className="font-bold text-card-foreground-100">
                {market["Name"]}
                <small className="ml-1">({market["Ticker"]})</small>
              </h1>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">
                  {formatValue(
                    Number(market["Close"]),
                    market["unit"],
                    market["Type"]
                  )}
                </h2>
                <PercentChange diff={market["DailyPercentualChange"]} />
              </div>
              <div className="space-x-2">
                <MarketType type={market["Type"] as MarketTypes} />
                <MarketState state={market["state"] as MarketState} />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

function PercentChange({ diff }: { diff: string }) {
  const percentChange = Number(diff);

  return (
    <p className="font-medium text-sm px-1 py-px rounded-full bg-gray-100 dark:bg-gray-800">
      {Number(diff) > 0 ? (
        <span className="text-green-600 mr-0.5">&uarr;</span>
      ) : (
        <span className="text-red-600 mr-0.5">&darr;</span>
      )}
      {formatValue(percentChange)}
    </p>
  );
}

type MarketTypes = "bonds" | "currency" | "index" | "stocks";
type MarketState = "OPEN" | "CLOSED";

function MarketType({ type }: { type: MarketTypes }) {
  return (
    <span
      className={cn(
        "px-1 py-px rounded-full border text-xs lowercase",
        type === "bonds"
          ? "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-100 dark:bg-fuchsia-900 dark:text-fuchsia-400 dark:border-fuchsia-950"
          : type === "currency"
          ? "bg-violet-100 text-violet-600 border dark:bg-violet-900 dark:text-violet-400 dark:border-violet-950"
          : type === "index"
          ? "bg-blue-100 text-blue-600 border dark:bg-blue-900 dark:text-blue-400 dark:border-blue-950"
          : "bg-cyan-100 text-cyan-600 border dark:bg-cyan-900 dark:text-cyan-400 dark:border-cyan-950"
      )}
    >
      {type}
    </span>
  );
}

function MarketState({ state }: { state: MarketState }) {
  return (
    <span
      className={cn(
        "px-1 py-px rounded-full border text-xs lowercase",
        state === "OPEN"
          ? "bg-green-100 text-green-600 border-green-100 dark:bg-green-900 dark:text-green-400 dark:border-green-950"
          : state === "CLOSED"
          ? "bg-red-100 text-red-600 border dark:bg-red-900 dark:text-red-400 dark:border-red-950"
          : "bg-yellow-100 text-yellow-600 border dark:bg-yellow-900 dark:text-yellow-400 dark:border-yellow-950"
      )}
    >
      {state}
    </span>
  );
}
