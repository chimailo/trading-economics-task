"use client";

import { createContext, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Country = "mexico" | "new-zealand" | "sweden" | "thailand";
type CountryContextProps = {
  country: Country;
  handleCountry: (country: Country) => void;
};

const CountryContext = createContext<CountryContextProps>({
  country: "mexico",
  handleCountry: () => {},
});

export const useCountry = () => useContext(CountryContext);

export type CountryProviderProps = {
  children: React.ReactNode;
  value?: Country;
};

export default function CountryProvider({
  children,
  value,
}: CountryProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [country, setCountry] = useState<Country>(value || "mexico");

  const handleCountry = (country: Country) => {
    setCountry(country);
    router.push(`${pathname}?country=${country}`);
  };

  return (
    <CountryContext.Provider value={{ country, handleCountry }}>
      {children}
    </CountryContext.Provider>
  );
}
