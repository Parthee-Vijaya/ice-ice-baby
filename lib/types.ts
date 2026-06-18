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
  cancelled?: boolean;
  cancelledNote?: string;
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

// Ét stop i dagens program — direkte fra rejseplanen (PDF).
export type ItineraryStop = {
  tid?: string; // Afgang / klokkeslæt, fx "Kl. 11.30"
  transport?: string; // km + transporttid hertil, fx "6,8 km · 11 min"
  sted: string; // Begivenhed/lokation
  varighed?: string; // fx "2,5 timer"
  beskrivelse?: string; // Bemærkning/beskrivelse fra PDF
  booket?: boolean; // Booket? = JA
  pris?: string; // fx "30.582 ISK + gebyr"
};

export type DayPlan = {
  n: number;
  dato: string;
  ugedag: string;
  titel: string;
  tema: string;
  beskrivelse: string;
  emoji: string;
  itinerary?: ItineraryStop[];
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
