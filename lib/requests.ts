const apiBaseUrl = process.env.baseUrl;
const apiKey = process.env.apiKey;

const marketsQuery = { c: apiKey as string, category: "markets" };
const mqs = new URLSearchParams(marketsQuery).toString();

export async function fetchMarkets(country: string) {
  const markets = await fetch(`${apiBaseUrl}/search/${country}?${mqs}`);
  const contentType = markets.headers.get("content-type");

  if (!markets.ok && contentType?.includes("text/plain")) {
    const message = await markets.text();
    throw new Error(message);
  }

  return markets.json();
}

const earnigsQuery = {
  c: apiKey as string,
  d1: "2024-01-04",
  d2: "2024-31-06",
};
const eqs = new URLSearchParams(earnigsQuery).toString();

export async function fetchEarningsRevenue(country: string) {
  const earnings = await fetch(
    `${apiBaseUrl}/earnings-revenues/country/${country}?${eqs}`
  );
  const contentType = earnings.headers.get("content-type");

  if (!earnings.ok && contentType?.includes("text/plain")) {
    const message = await earnings.text();
    throw new Error(message);
  }

  return earnings.json();
}
