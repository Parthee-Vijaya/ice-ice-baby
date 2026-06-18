"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Clock, Route as RouteIcon, TrendingUp, Star } from "lucide-react";
import type { Difficulty } from "@/lib/types";
import { DifficultyBadge } from "./DifficultyBadge";

export type PickOption = {
  id: string;
  kind: "route" | "poi";
  name: string;
  area: string;
  image?: string;
  emoji: string;
  slug?: string;
  distanceKm?: number;
  durationMin?: number;
  difficulty?: Difficulty;
  costDKK?: number;
  description: string;
  isPrimary: boolean;
};

function fmtDur(min?: number) {
  if (!min) return null;
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} t`;
  return `${h}t ${m}m`;
}

export function DayActivityPicker({
  tripSlug,
  dayN,
  options,
}: {
  tripSlug: string;
  dayN: number;
  options: PickOption[];
}) {
  const storageKey = `eventyr-${tripSlug}-day-${dayN}`;
  const defaultId = options.find((o) => o.isPrimary)?.id ?? options[0]?.id;
  const [chosen, setChosen] = useState<string | null>(null);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    if (stored && options.some((o) => o.id === stored)) setChosen(stored);
    else setChosen(defaultId);
  }, [storageKey, defaultId, options]);

  function pick(id: string) {
    setChosen(id);
    try {
      localStorage.setItem(storageKey, id);
    } catch {
      /* private mode */
    }
  }

  if (options.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((o) => {
        const selected = chosen === o.id;
        const dur = fmtDur(o.durationMin);
        return (
          <div
            key={o.id}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-surface shadow-sm transition ${
              selected
                ? "border-topo ring-2 ring-topo"
                : "border-border hover:-translate-y-0.5 hover:shadow-md"
            }`}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-topo-tint via-surface-2 to-accent/20">
              {o.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={o.image}
                  alt={o.name}
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={800}
                  className="size-full object-cover"
                />
              ) : (
                <span className="flex size-full items-center justify-center text-6xl" aria-hidden>
                  {o.emoji}
                </span>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-surface/85 px-2 py-0.5 text-[11px] font-medium backdrop-blur">
                {o.isPrimary ? "★ Anbefalet" : "Alternativ"}
              </span>
              {selected && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-topo px-2 py-0.5 text-[11px] font-semibold text-white">
                  <Check size={11} /> Valgt
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div>
                <h3 className="font-display text-lg font-semibold leading-tight">
                  {o.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {o.description}
                </p>
              </div>
              {(o.distanceKm || dur || o.difficulty) && (
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                  {o.distanceKm ? (
                    <span className="inline-flex items-center gap-1">
                      <RouteIcon size={13} />
                      {o.distanceKm} km
                    </span>
                  ) : null}
                  {dur ? (
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} />
                      {dur}
                    </span>
                  ) : null}
                  {o.costDKK ? (
                    <span className="inline-flex items-center gap-1">
                      {o.costDKK} kr
                    </span>
                  ) : null}
                  {o.difficulty && <DifficultyBadge value={o.difficulty} />}
                </div>
              )}
              <div className="mt-auto flex items-center gap-2 pt-1">
                <button
                  onClick={() => pick(o.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    selected
                      ? "bg-topo text-white"
                      : "border border-border bg-surface hover:bg-surface-2"
                  }`}
                >
                  {selected ? (
                    <>
                      <Check size={14} /> Jeres plan
                    </>
                  ) : (
                    <>
                      <Star size={14} /> Vælg denne
                    </>
                  )}
                </button>
                {o.kind === "route" && o.slug && (
                  <Link
                    href={`/rejse/${tripSlug}/ruter/${o.slug}`}
                    className="ml-auto text-sm font-medium text-topo"
                  >
                    Detaljer →
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
