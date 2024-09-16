import Link from "next/link";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import SelectionEarningsRevenue from "@/components/home/earnings";
import FeaturedMarkets from "@/components/home/markets";
import { Button } from "@/components/ui/button";
import { fetchEarningsRevenue, fetchMarkets } from "@/lib/requests";

export default async function Home({
  searchParams,
}: {
  searchParams?: { country: string };
}) {
  const country = searchParams?.country || "mexico";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [`/search/${country}`],
    queryFn: () => fetchMarkets(country),
  });

  await queryClient.prefetchQuery({
    queryKey: [`/earnings-revenues/${country}`],
    queryFn: () => fetchEarningsRevenue(country),
  });

  return (
    <>
      <section className="space-y-2">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-lg font-medium flex-1">
            Featured Markets in{" "}
            <span className="text-primary capitalize">
              {country.replace("-", " ")}
            </span>
          </h1>
          <Button
            asChild
            variant="outline"
            className="border border-stone-400 dark:border-stone-700 shadow-none"
          >
            <Link href={`/markets?country=${country}`}>View All Markets</Link>
          </Button>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FeaturedMarkets />
        </HydrationBoundary>
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SelectionEarningsRevenue />
      </HydrationBoundary>
    </>
  );
}
