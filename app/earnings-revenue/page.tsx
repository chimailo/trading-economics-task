import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { fetchMarkets } from "@/lib/requests";
import CountryEarningsRevenues from "./earnings";

async function EarningsRevenues({
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CountryEarningsRevenues />
    </HydrationBoundary>
  );
}

export default EarningsRevenues;
