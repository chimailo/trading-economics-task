"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { useCountry } from "@/hooks/useCountry";

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

const apiBaseUrl = process.env.baseUrl;
const apiKey = process.env.apiKey;

const query = { c: apiKey as string, d1: "2024-01-04", d2: "2024-31-06" };
const queryString = new URLSearchParams(query).toString();

async function fetchEarningsRevenue(country: string) {
  const earnings = await fetch(
    `${apiBaseUrl}/earnings-revenues/country/${country}?${queryString}`
  );
  return earnings.json();
}

export default function EarningsRevenue() {
  const { country } = useCountry();
  const { data, error, status } = useQuery<Record<string, string>[]>({
    queryKey: [`/earnings-revenues/${country}`],
    queryFn: () => fetchEarningsRevenue(country),
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
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
    console.log(chartData);
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
    <Card>
      <CardHeader className="flex-row">
        <div className="flex-1">
          <CardTitle className="text-lg">Earnings Revenue</CardTitle>
          <CardDescription>Fiscal Year Q1 2024</CardDescription>
        </div>
        <Button asChild variant="outline" className="shadow-none">
          <Link href={`/`}>View All</Link>
        </Button>
      </CardHeader>
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
