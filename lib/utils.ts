import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatValue(
  value: number,
  currency?: string,
  type?: string,
  compact?: boolean
) {
  let options: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
  };

  if ((type === "currency" || type === "stocks") && currency) {
    options = {
      style: "currency",
      currency,
      notation: compact ? "compact" : "standard",
    };
  }
  return Intl.NumberFormat("en-US", options).format(value);
}
