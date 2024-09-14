"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { type Country, useCountry } from "@/hooks/useCountry";
import { ChevronDown } from "lucide-react";

const countries = {
  mexico: "🇲🇽 Mexico",
  "new-zealand": "🇳🇿 New Zealand",
  sweden: "🇸🇪 Sweden",
  thailand: "🇹🇭 Thailand",
};

export default function Header() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const { country, handleCountry } = useCountry();

  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <header className="w-full flex flex-shrink-0 h-14 sticky bg-inherit max-w-5xl mx-auto z-10 items-center top-0">
      <div className="text-xl font-bold flex-1 truncate text-primary">
        <Link href="/">Trading Economics Task</Link>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-primary text-primary hover:text-primary hover:border-primary border gap-2"
            >
              {countries[country]}
              <ChevronDown className="w-4 h-4"></ChevronDown>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.entries(countries).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                onSelect={() => handleCountry(key as Country)}
              >
                {value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Switch id="toggleTheme" onClick={toggleTheme} />
          <Label htmlFor="toggleTheme" className="sr-only">
            Toggle Theme
          </Label>
        </div>
      </div>
    </header>
  );
}
