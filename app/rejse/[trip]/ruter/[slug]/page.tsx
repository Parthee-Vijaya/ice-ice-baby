import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrip, trips } from "@/lib/trips";
import { isDefined } from "@/lib/trips/types";
import { Map } from "@/components/Map";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { OpenInMapsButton } from "@/components/OpenInMapsButton";
import { TollBadge } from "@/components/TollBadge";
import { DroneZonesButton } from "@/components/DroneZonesButton";
import { FerryBookingCard } from "@/components/FerryBookingCard";
import {
  ArrowLeft,
  Clock,
  TrendingUp,
  Route as RouteIcon,
  AlertTriangle,
  Tag,
} from "lucide-react";

export function generateStaticParams() {
  return trips.flatMap((t) =>
    t.routes.map((r) => ({ trip: t.meta.slug, slug: r.slug })),
  );
}

function fmtDur(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} timer`;
  return `${h}t ${m}m`;
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ trip: string; slug: string }>;
}) {
  const { trip: tripSlug, slug } = await params;
  const trip = getTrip(tripSlug);
  if (!trip) notFound();
  const route = trip.routes.find((r) => r.slug === slug);
  if (!route) notFound();

  const base = `/rejse/${trip.meta.slug}`;
  const tolls = (route.tollIds || [])
    .map((id) => trip.tolls.find((t) => t.id === id))
    .filter(isDefined);
  const ferriesForRoute = (route.ferryIds || [])
    .map((id) => trip.ferries.find((f) => f.id === id))
    .filter(isDefined);

  const markers = [
    {
      id: "start",
      coord: route.startCoord,
      emoji: route.emoji,
      title: route.name + " (start)",
      color: "#3a7d44",
    },
  ];
  if (route.endCoord) {
    markers.push({
      id: "end",
      coord: route.endCoord,
      emoji: "🏁",
      title: route.name + " (mål)",
      color: "#e07856",
    });
  }
  const polylines = route.waypoints
    ? [{ id: route.id, positions: route.waypoints, color: "#e07856" }]
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <nav className="mb-3 flex items-center justify-between text-sm">
        <Link
          href={`${base}/ruter`}
          className="inline-flex items-center gap-1 text-muted hover:text-foreground"
        >
          <ArrowLeft size={14} /> Alle ruter
        </Link>
      </nav>

      <header className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
        <div className="relative h-56 w-full overflow-hidden sm:h-80">
          {route.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={route.image}
              alt={route.name}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width={1280}
              height={853}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-topo-tint via-surface to-accent/20 text-8xl">
              {route.emoji}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-90">
              {route.emoji} {route.area} {route.badge ? `· ${route.badge}` : ""}
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold leading-tight drop-shadow sm:text-4xl">
              {route.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <DifficultyBadge value={route.difficulty} />
              {tolls.map((t) => (
                <TollBadge key={t.id} toll={t} />
              ))}
              {ferriesForRoute.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-topo-tint px-2 py-0.5 text-[11px] font-semibold text-topo-dark">
                  Færge påkrævet
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/85">
          {route.description}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon={<RouteIcon size={16} />} label="Distance" value={`${route.distanceKm} km`} />
          <Stat icon={<Clock size={16} />} label="Tid" value={fmtDur(route.durationMin)} />
          <Stat icon={<TrendingUp size={16} />} label="Stigning" value={`${route.elevationM} m`} />
          <Stat
            icon={<Tag size={16} />}
            label="Pris"
            value={route.costDKK > 0 ? `${route.costDKK} kr` : "Gratis"}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <OpenInMapsButton coord={route.startCoord} destinationName={route.name + " start"} />
          {route.bookingUrl && (
            <a
              href={route.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-2"
            >
              Book →
            </a>
          )}
          {trip.meta.features.includes("drone") && <DroneZonesButton />}
        </div>
        {route.costNote && (
          <p className="mt-3 text-xs text-muted">{route.costNote}</p>
        )}
        </div>
      </header>

      {route.images && route.images.length > 1 && (
        <section className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {route.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${route.name} foto ${i + 1}`}
              loading="lazy"
              decoding="async"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full rounded-2xl border border-border object-cover"
            />
          ))}
        </section>
      )}

      <section className="mt-6">
        <h2 className="mb-2 font-display text-xl font-semibold">Rute-kort</h2>
        <Map markers={markers} polylines={polylines} height="50vh" zoom={11} />
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {route.tips.length > 0 && (
          <section className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-3 font-display text-lg font-semibold">Tips</h2>
            <ul className="space-y-2 text-sm">
              {route.tips.map((tip, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 text-topo">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(route.warnings || route.droneWarning) && (
          <section className="rounded-2xl border border-warn/30 bg-warn/5 p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-warn">
              <AlertTriangle size={16} /> Vær opmærksom
            </h2>
            <ul className="space-y-2 text-sm">
              {route.warnings?.map((w, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5 text-warn">!</span>
                  <span>{w}</span>
                </li>
              ))}
              {route.droneWarning && (
                <li className="flex gap-2 pt-2">
                  <span className="mt-0.5">🛸</span>
                  <span>{route.droneWarning}</span>
                </li>
              )}
            </ul>
          </section>
        )}
      </div>

      {ferriesForRoute.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 font-display text-xl font-semibold">Færge</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {ferriesForRoute.map((f) => (
              <FerryBookingCard key={f.id} ferry={f} />
            ))}
          </div>
        </section>
      )}

      {tolls.length > 0 && (
        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="mb-3 font-display text-lg font-semibold">
            Tunnel-tolls undervejs
          </h2>
          <ul className="space-y-3 text-sm">
            {tolls.map((t) => (
              <li key={t.id} className="flex flex-col">
                <strong>{t.name} · {t.costDKK} kr</strong>
                <span className="text-xs text-muted">{t.connects}</span>
                <span className="text-xs text-muted">{t.payMethod}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-surface/80 p-3 backdrop-blur">
      <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-display text-lg font-semibold leading-tight">
        {value}
      </div>
    </div>
  );
}
