import type {
  Accommodation,
  DayPlan,
  Ferry,
  ImageCredit,
  LatLon,
  Poi,
  Practical,
  Restaurant,
  Route,
  Toll,
} from "@/lib/types";

// Hvilke sektioner en rejse har. Styrer rejse-nav + bucket-list og lader
// sparsomme rejser (Faaborg/Hamborg) udelade tomme faner indtil data findes.
export type TripFeature = "dage" | "ruter" | "kort" | "mad" | "info" | "drone";

export type TripStatus = "kommende" | "aktiv" | "afsluttet";

export type TripMeta = {
  slug: string;
  name: string;
  flag: string;
  country: string;
  blurb: string;
  startISO: string;
  endISO: string;
  datesTentative?: boolean;
  baseName?: string;
  baseCoord: LatLon;
  timeZone?: string;
  heroImage?: string;
  accent?: string;
  features: TripFeature[];
};

export type Trip = {
  meta: TripMeta;
  routes: Route[];
  restaurants: Restaurant[];
  pois: Poi[];
  days: DayPlan[];
  accommodation?: Accommodation;
  ferries: Ferry[];
  tolls: Toll[];
  images: ImageCredit[];
  photoUrls: string[];
  practical?: Practical;
};

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

// Status udledes af datoer. På statisk pre-renderede sider er "i dag"
// build-tidspunktet — godt nok her (redeploy opdaterer), og nedtællingen er
// uanset live (klient-komponent).
export function tripStatus(meta: TripMeta, today: string = todayISO()): TripStatus {
  if (meta.endISO < today) return "afsluttet";
  if (meta.startISO > today) return "kommende";
  return "aktiv";
}

export function hasFeature(trip: Trip, feature: TripFeature): boolean {
  return trip.meta.features.includes(feature);
}

// Type-sikker filtrering af id-opslag (erstatter `…find(…)!.filter(Boolean)`).
export function isDefined<T>(x: T | undefined | null): x is T {
  return x != null;
}
