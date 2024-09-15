"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SelectCountry from "@/components/select-country";

export default function Header() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const pathname = usePathname();

  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <header className="w-full flex flex-shrink-0 h-14 sticky bg-inherit max-w-5xl mx-auto z-10 items-center top-0">
      <div className="text-xl font-bold flex-1 truncate text-primary">
        <Link href="/">Trading Economics Task</Link>
      </div>
      <div className="flex items-center gap-4">
        <SelectCountry />

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
