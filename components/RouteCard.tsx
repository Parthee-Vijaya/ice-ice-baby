import Link from "next/link";
import { Clock, TrendingUp, Route as RouteIcon, Tag } from "lucide-react";
import type { Route } from "@/lib/types";
import { DifficultyBadge } from "./DifficultyBadge";
import { FavoriteButton } from "./FavoriteButton";

function fmtDur(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} t`;
  return `${h}t ${m}m`;
}

export function RouteCard({ route, tripSlug }: { route: Route; tripSlug: string }) {
  return (
    <Link
      href={`/rejse/${tripSlug}/ruter/${route.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-topo-tint via-surface-2 to-accent/20">
        {route.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={route.image}
            alt={route.name}
            loading="lazy"
            decoding="async"
            width={1280}
            height={800}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-7xl" aria-hidden>
            {route.emoji}
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        {route.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-[11px] font-semibold text-background backdrop-blur">
            {route.badge}
          </span>
        )}
        <div className="absolute right-2.5 top-2.5 z-10">
          <FavoriteButton tripSlug={tripSlug} id={route.id} kind="routes" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            {route.emoji} {route.area}
          </p>
          <h3 className="mt-0.5 font-display text-lg font-semibold leading-tight">
            {route.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">
            {route.description}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <RouteIcon size={13} />
            {route.distanceKm} km
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={13} />
            {fmtDur(route.durationMin)}
          </span>
          <span className="inline-flex items-center gap-1">
            <TrendingUp size={13} />
            {route.elevationM} m
          </span>
          {route.costDKK > 0 && (
            <span className="inline-flex items-center gap-1">
              <Tag size={13} />
              {route.costDKK} kr
            </span>
          )}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-1">
          <DifficultyBadge value={route.difficulty} />
          <span className="ml-auto text-sm font-medium text-topo opacity-0 transition group-hover:opacity-100">
            Detaljer →
          </span>
        </div>
      </div>
    </Link>
  );
}
