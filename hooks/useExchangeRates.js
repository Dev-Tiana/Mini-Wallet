import { useQuery } from "@tanstack/react-query";

const fetchRates = async () => {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("Failed to fetch exchange rates");
  return res.json();
};

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchRates,
    refetchInterval: 60000, // refresh every 60s
  });
};
