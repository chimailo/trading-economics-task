import SelectionEarningsRevenue from "@/components/home/earnings";
import FeaturedMarkets from "@/components/home/markets";
import SectionTitle from "@/components/home/section-title";

export default async function Home() {
  return (
    <>
      <section className="space-y-2">
        <SectionTitle />
        <FeaturedMarkets />
      </section>
      <SelectionEarningsRevenue />
    </>
  );
}
