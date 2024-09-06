"use client";

import { Moon, Sun } from "lucide-react";
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

export default function Header() {
  const { resolvedTheme: theme, setTheme } = useTheme();

  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <header className="w-full flex flex-shrink-0 h-14 sticky items-center px-2 sm:px-5 top-0">
      <h1 className="text-xl font-bold flex-1 truncate">
        Trading Economics Task
      </h1>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Select a country</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>🇲🇽 Mexico</DropdownMenuItem>
            <DropdownMenuItem>🇳🇿 New Zealand</DropdownMenuItem>
            <DropdownMenuItem>🇸🇪 Sweden</DropdownMenuItem>
            <DropdownMenuItem>🇹🇭 Thailand</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 flex-shrink-0">
            <Label htmlFor="toggleTheme" className="dark:scale-0 scale-100 transition-transform">
              <Moon className="w-4 h-4"></Moon>
            </Label>
          <Switch id="toggleTheme" onClick={toggleTheme} />
            <Label htmlFor="toggleTheme" className="dark:scale-100 scale-0 transition-transform">
              <Sun className="w-4 h-4"></Sun>
            </Label>
        </div>
      </div>
    </header>
  );
}
