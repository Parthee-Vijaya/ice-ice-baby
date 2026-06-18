"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import type { TripMeta } from "@/lib/trips/types";
import { tripStatus } from "@/lib/trips/types";
import { useToday } from "@/lib/useToday";

// Hele dage fra i dag til en ISO-dato (begge ved lokal middag, så sommertid ikke
// skubber tællingen).
function daysUntil(today: string, target: string): number {
  const a = new Date(`${today}T12:00:00`).getTime();
  const b = new Date(`${target}T12:00:00`).getTime();
  return Math.round((b - a) / 86_400_000);
}

// Forsidens "næste eventyr"-banner. Viser den aktive rejse hvis en kører, ellers
// nedtælling til den førstkommende. Beregnes LIVE på klientens dato (useToday).
export function NextAdventure({
  metas,
  initialToday,
}: {
  metas: TripMeta[];
  initialToday: string;
}) {
  const today = useToday(initialToday);

  const active = metas.find((m) => tripStatus(m, today) === "aktiv");
  const next = metas
    .filter((m) => tripStatus(m, today) === "kommende")
    .sort((a, b) => a.startISO.localeCompare(b.startISO))[0];

  const target = active ?? next;
  if (!target) return null;

  const isActive = Boolean(active);
  const days = isActive ? 0 : daysUntil(today, target.startISO);
  const countLabel = days === 0 ? "I dag" : days === 1 ? "I morgen" : `Om ${days} dage`;

  return (
    <Link
      href={`/rejse/${target.slug}`}
      className="group mb-6 flex items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-topo-tint text-topo-dark"
        aria-hidden
      >
        <CalendarClock size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
          {isActive ? "I gang nu" : "Næste eventyr"}
        </span>
        <span className="block truncate font-display text-lg font-semibold leading-tight">
          {isActive ? (
            <>
              {target.flag} {target.name} — god tur!
            </>
          ) : (
            <>
              {countLabel} til {target.flag} {target.name}
            </>
          )}
        </span>
      </span>
      <ArrowRight
        size={20}
        className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-topo"
        aria-hidden
      />
    </Link>
  );
}
