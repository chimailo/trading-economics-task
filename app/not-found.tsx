import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-card h-[calc(100lvh_-_8rem)] rounded-lg grid place-items-center">
      <div className="flex flex-col items-center">
        <h2 className="mb-2 font-semibold text-xl text-center">Not Found</h2>
        <p className="text-center">Could not find requested resource</p>
        <Button asChild className="my-6">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
