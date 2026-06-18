"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { Difficulty, Route } from "@/lib/types";
import { useFavorites } from "@/lib/useFavorites";
import { RouteCard } from "./RouteCard";

type Filter = "alle" | Difficulty;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "let", label: "Let" },
  { key: "middel", label: "Middel" },
  { key: "svaer", label: "Svær" },
];

// Statiske klasser pr. sværhedsgrad (Tailwind kan ikke samle dynamiske navne).
const DOT: Record<Difficulty, string> = {
  let: "bg-let",
  middel: "bg-middel",
  svaer: "bg-svaer",
};

export function RoutesBrowser({
  routes,
  tripSlug,
}: {
  routes: Route[];
  tripSlug: string;
}) {
  const { favorites, ready } = useFavorites(tripSlug);
  const [filter, setFilter] = useState<Filter>("alle");

  const counts: Record<Filter, number> = {
    alle: routes.length,
    let: routes.filter((r) => r.difficulty === "let").length,
    middel: routes.filter((r) => r.difficulty === "middel").length,
    svaer: routes.filter((r) => r.difficulty === "svaer").length,
  };

  const matches = (r: Route) => filter === "alle" || r.difficulty === filter;
  const visible = routes.filter(matches);

  // Bevar favorit-rækkefølgen, drop ukendte id'er, og respektér sværhedsfilteret.
  const favoriteRoutes = ready
    ? favorites
        .map((id) => routes.find((r) => r.id === id))
        .filter((r): r is Route => Boolean(r) && matches(r as Route))
    : [];

  // Aflæs områder fra rejsens egne ruter (i kureret rækkefølge) — trip-agnostisk.
  const areaOrder: string[] = [];
  for (const r of routes) if (!areaOrder.includes(r.area)) areaOrder.push(r.area);
  const groups = areaOrder
    .map((area) => ({ area, items: visible.filter((r) => r.area === area) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? "bg-topo text-white shadow-sm"
                  : "border border-border bg-surface text-foreground hover:bg-surface-2"
              }`}
            >
              {f.key !== "alle" && (
                <span
                  className={`size-1.5 rounded-full ${isActive ? "bg-white" : DOT[f.key]}`}
                  aria-hidden
                />
              )}
              {f.label}
              <span className={isActive ? "text-white/70" : "text-muted"}>
                {counts[f.key]}
              </span>
            </button>
          );
        })}
      </div>

      {favoriteRoutes.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 font-display text-2xl font-semibold">
            <Heart size={20} className="fill-accent text-accent" aria-hidden />
            Jeres favoritter
            <span className="text-sm font-normal text-muted">
              ({favoriteRoutes.length})
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteRoutes.map((r) => (
              <RouteCard key={`fav-${r.id}`} route={r} tripSlug={tripSlug} />
            ))}
          </div>
        </section>
      )}

      {groups.map((group) => (
        <section key={group.area} className="mb-8">
          <h2 className="mb-3 font-display text-2xl font-semibold">
            {group.area}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((r) => (
              <RouteCard key={r.id} route={r} tripSlug={tripSlug} />
            ))}
          </div>
        </section>
      ))}

      {visible.length === 0 && (
        <p className="rounded-2xl border border-border bg-surface p-6 text-center text-sm text-muted">
          Ingen ruter med denne sværhedsgrad.
        </p>
      )}
    </>
  );
}
