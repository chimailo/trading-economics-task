"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/hooks/useCountry";

export default function SectionTitle() {
  const { country } = useCountry();

  return (
    <div className="flex items-center gap-4 mb-2">
      <h1 className="text-lg font-medium flex-1">
        Markets in{" "}
        <span className="text-primary capitalize">
          {country.replace("-", " ")}
        </span>
      </h1>
      <Button asChild variant="outline" className="">
        <Link href={`/`}>View All</Link>
      </Button>
    </div>
  );
}
