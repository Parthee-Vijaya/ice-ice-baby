export type LatLon = [number, number];

export type Difficulty = "let" | "middel" | "svaer";

export type Area =
  | "Streymoy"
  | "Vágar"
  | "Mykines"
  | "Eysturoy"
  | "Kalsoy"
  | "Borðoy"
  | "Tórshavn";

export type Route = {
  id: string;
  slug: string;
  name: string;
  area: string;
  startCoord: LatLon;
  endCoord?: LatLon;
  waypoints?: LatLon[];
  distanceKm: number;
  durationMin: number;
  elevationM: number;
  difficulty: Difficulty;
  costDKK: number;
  costNote?: string;
  tollIds?: string[];
  ferryIds?: string[];
  description: string;
  tips: string[];
  warnings?: string[];
  bookingUrl?: string;
  droneWarning?: string;
  emoji: string;
  badge?: string;
  image?: string;
  images?: string[];
};

export type Restaurant = {
  id: string;
  name: string;
  area: string;
  kitchen: string;
  priceLevel: 1 | 2 | 3 | 4;
  coord: LatLon;
  description: string;
  bookingRequired: boolean;
  bookingUrl?: string;
  phone?: string;
  website?: string;
  emoji: string;
  tags: string[];
};

export type Toll = {
  id: string;
  name: string;
  shortName: string;
  costDKK: number;
  connects: string;
  payMethod: string;
  url?: string;
};

export type Ferry = {
  id: string;
  name: string;
  from: string;
  to: string;
  durationMin: number;
  costDKK: number;
  costNote?: string;
  schedule: string;
  bookingUrl: string;
  bookingNote?: string;
  cancellationRisk: "lav" | "middel" | "hoej";
};

export type Poi = {
  id: string;
  name: string;
  area: string;
  coord: LatLon;
  category:
    | "udsigt"
    | "bygd"
    | "kultur"
    | "cafe"
    | "praktisk"
    | "fotografi"
    | "shopping";
  description: string;
  freeAccess: boolean;
  costDKK?: number;
  emoji: string;
  image?: string;
};

export type Accommodation = {
  name: string;
  area: string;
  street: string;
  coord: LatLon;
  checkIn: string;
  checkOut: string;
  note?: string;
};

export type DayPlan = {
  n: number;
  dato: string;
  ugedag: string;
  titel: string;
  tema: string;
  beskrivelse: string;
  emoji: string;
  routeIds: string[];
  restaurantIds: string[];
  poiIds: string[];
  ferryIds?: string[];
  alternativeRouteIds?: string[];
  alternativePoiIds?: string[];
  tips: string[];
  weatherDependent?: boolean;
  planB?: string;
  arrival?: string;
  departure?: string;
};

export const TORSHAVN: LatLon = [62.0118, -6.7717];

export type ImageCredit = {
  key: string;
  subject: string;
  url: string;
  credit: string;
  license: string;
};

export type DroneRegler = {
  myndighed: string;
  url: string;
  regler: string[];
};

export type PakkeKategori = { kategori: string; items: string[] };
export type Nodnummer = { navn: string; nummer: string };
export type Reservation = { sted: string; deadline: string; url: string };
export type OfflineKort = { anbefaling: string; tipsy: string[] };

export type Practical = {
  droneRegler?: DroneRegler;
  pakkeliste?: PakkeKategori[];
  nodnumre?: Nodnummer[];
  reservationsTjekliste?: Reservation[];
  offlineKort?: OfflineKort;
};
