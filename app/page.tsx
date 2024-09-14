import EarningsRevenue from "@/components/earnings";
import Markets from "@/components/markets";
import SectionTitle from "@/components/section-title";

export default async function Home() {
  return (
    <>
      <section className="space-y-2">
        <SectionTitle />
        <Markets />
      </section>
      <section className="">
        <EarningsRevenue />
      </section>
    </>
  );
}
