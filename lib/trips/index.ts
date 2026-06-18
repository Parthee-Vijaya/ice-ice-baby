import type { Trip, TripStatus } from "./types";
import { tripStatus } from "./types";
import { island } from "./island";

// Rejse-registeret. Tilføj en ny rejse = tilføj en mappe under lib/trips/ med
// meta.ts + index.ts og importér den her.
export const trips: Trip[] = [island];

export function getTrip(slug: string): Trip | undefined {
  return trips.find((t) => t.meta.slug === slug);
}

export function getAllTripSlugs(): string[] {
  return trips.map((t) => t.meta.slug);
}

const STATUS_ORDER: Record<TripStatus, number> = {
  aktiv: 0,
  kommende: 1,
  afsluttet: 2,
};

// Sortér til bucket-listen: aktiv → kommende (snarest først) → afsluttede
// (senest først).
export function sortedTrips(today?: string): Trip[] {
  return [...trips].sort((a, b) => {
    const sa = tripStatus(a.meta, today);
    const sb = tripStatus(b.meta, today);
    if (sa !== sb) return STATUS_ORDER[sa] - STATUS_ORDER[sb];
    if (sa === "afsluttet") return b.meta.startISO.localeCompare(a.meta.startISO);
    return a.meta.startISO.localeCompare(b.meta.startISO);
  });
}

export { tripStatus };
export type { Trip, TripMeta, TripStatus, TripFeature } from "./types";
