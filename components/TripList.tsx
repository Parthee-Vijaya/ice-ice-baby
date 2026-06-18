"use client";

import type { TripMeta, TripStatus } from "@/lib/trips/types";
import { tripStatus } from "@/lib/trips/types";
import { useToday } from "@/lib/useToday";
import { TripCard } from "./TripCard";

const ORDER: Record<TripStatus, number> = {
  aktiv: 0,
  kommende: 1,
  afsluttet: 2,
};

// Bucket-listen, sorteret + status-mærket LIVE på klientens dato (så en rejse
// skifter til "aktiv" uden redeploy). Server-render bruger build-tids-datoen
// (initialToday) for at undgå hydration-mismatch.
export function TripList({
  metas,
  initialToday,
}: {
  metas: TripMeta[];
  initialToday: string;
}) {
  const today = useToday(initialToday);

  const sorted = [...metas].sort((a, b) => {
    const sa = tripStatus(a, today);
    const sb = tripStatus(b, today);
    if (sa !== sb) return ORDER[sa] - ORDER[sb];
    if (sa === "afsluttet") return b.startISO.localeCompare(a.startISO);
    return a.startISO.localeCompare(b.startISO);
  });

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {sorted.map((m, i) => (
        <TripCard
          key={m.slug}
          meta={m}
          status={tripStatus(m, today)}
          priority={i < 2}
        />
      ))}
    </div>
  );
}
