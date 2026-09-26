export const WORLD_DATA_URL = "https://danieltremer.com/alpaca-autotrader/";
export const PUBLIC_DASHBOARD_URLS = {
  us: `${WORLD_DATA_URL}market.html`,
  usHistory: `${WORLD_DATA_URL}market.html#history`,
  world: `${WORLD_DATA_URL}world.html`,
  maritime: `${WORLD_DATA_URL}maritime.html`,
} as const;

export const PUBLIC_DASHBOARDS = [
  { label: "US", sub: "Indicators & history", href: PUBLIC_DASHBOARD_URLS.us },
  { label: "World", sub: "Global patterns", href: PUBLIC_DASHBOARD_URLS.world },
  { label: "Maritime", sub: "Ports & passages", href: PUBLIC_DASHBOARD_URLS.maritime },
];
export const PRIVATE_DASHBOARDS_URL = `${WORLD_DATA_URL}private.html`;
