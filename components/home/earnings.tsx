"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { RefreshCcw } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Country, useCountry } from "@/hooks/useCountry";
import { fetchEarningsRevenue } from "@/lib/requests";

const chartConfig = {
  previous: {
    label: "Previous",
    color: "hsl(var(--chart-1))",
  },
  actual: {
    label: "Actual",
    color: "hsl(var(--chart-2))",
  },
  forecast: {
    label: "Forecast",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

function Header({ country }: { country: Country }) {
  return (
    <CardHeader className="flex-row">
      <div className="flex-1">
        <CardTitle className="text-lg">Earnings Revenue</CardTitle>
        <CardDescription>Fiscal Year Q1 2024</CardDescription>
      </div>
      <Button asChild variant="outline" className="shadow-none">
        <Link href={`/earnings-revenue?country=${country}`}>View All</Link>
      </Button>
    </CardHeader>
  );
}

export default function SelectionEarningsRevenue() {
  const { country } = useCountry();
  const { data, error, status, refetch } = useQuery<Record<string, string>[]>({
    queryKey: [`/earnings-revenues/${country}`],
    queryFn: () => fetchEarningsRevenue(country),
  });

  if (status === "pending") {
    return (
      <Card className="shadow-none">
        <Header country={country} />
        <CardContent>
          <div className="w-full h-56 grid place-items-center sm:h-[23rem] md:h-[31rem]">
            <Spinner twSize="w-6 h-6" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card className="shadow-none">
        <Header country={country} />
        <CardContent>
          <div className="w-full h-56 grid place-items-center sm:h-[23rem] md:h-[31rem]">
            <div className="flex flex-col items-center justify-center max-w-[40rem]">
              <p className="text-center font-medium mb-3">
                {error.message || "Failed to fetch"}
              </p>
              <Button onClick={() => refetch()}>
                Retry
                <RefreshCcw width={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatChartData = () => {
    const currency = getCountryCurrency();
    const chartData = data
      .filter(
        (datum) =>
          datum["FiscalTag"] === "FY2024Q1" && datum["Currency"] === currency
      )
      .filter((datum) => !!datum["RevenuePreviousValue"])
      .filter((datum) => !!datum["RevenueForecastValue"])
      .filter((datum) => !!datum["RevenueValue"])
      .slice(0, 8)
      .map((datum) => ({
        company: datum["Name"],
        previous: datum["RevenuePreviousValue"],
        actual: datum["RevenueValue"],
        forecast: datum["RevenueForecastValue"],
      }));
    return chartData;
  };

  const getCountryCurrency = () => {
    switch (country) {
      case "mexico":
        return "MXN";
      case "sweden":
        return "SEK";
      case "thailand":
        return "THB";
      default:
        return "";
    }
  };

  return (
    <Card className="shadow-none">
      <Header country={country} />
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={formatChartData()}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="company"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 12)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="previous" fill="var(--color-previous)" radius={4} />
            <Bar dataKey="actual" fill="var(--color-actual)" radius={4} />
            <Bar dataKey="forecast" fill="var(--color-forecast)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
