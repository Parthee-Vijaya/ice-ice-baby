import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrip } from "@/lib/trips";
import { Map } from "@/components/Map";
import { SunInfo } from "@/components/SunInfo";
import { WeatherSnapshot } from "@/components/WeatherSnapshot";
import { DroneZonesButton } from "@/components/DroneZonesButton";
import { AccommodationCard } from "@/components/AccommodationCard";
import { Countdown } from "@/components/Countdown";
import { CalendarButton } from "@/components/CalendarButton";
import { DayList } from "@/components/DayList";
import { TripSearch, type SearchItem } from "@/components/TripSearch";
import { todayISO } from "@/lib/trips/types";
import { Sparkles } from "lucide-react";

export default async function TripHome({
  params,
}: {
  params: Promise<{ trip: string }>;
}) {
  const { trip: slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const m = trip.meta;
  const base = `/rejse/${m.slug}`;
  const today = todayISO();
  const hasDays = trip.days.length > 0;
  const hasRoutes = m.features.includes("ruter") && trip.routes.length > 0;
  const hasMap = m.features.includes("kort");

  const markers = [
    ...trip.routes.map((r) => ({
      id: `route-${r.id}`,
      coord: r.startCoord,
      emoji: r.emoji,
      title: r.name,
      subtitle: `${r.distanceKm} km · ${r.area}`,
      href: `${base}/ruter/${r.slug}`,
      color: "#3a7d44",
    })),
    ...trip.pois
      .filter((p) => p.category === "udsigt" || p.category === "bygd" || p.category === "kultur")
      .slice(0, 8)
      .map((p) => ({
        id: `poi-${p.id}`,
        coord: p.coord,
        emoji: p.emoji,
        title: p.name,
        subtitle: p.area,
        color: "#e07856",
      })),
    ...(trip.accommodation
      ? [
          {
            id: "home",
            coord: trip.accommodation.coord,
            emoji: "🏠",
            title: "Jeres bolig",
            subtitle: trip.accommodation.street,
            color: "#1c1f1d",
          },
        ]
      : []),
  ];
  const polylines = trip.routes
    .filter((r) => r.waypoints && r.waypoints.length > 1)
    .map((r) => ({ id: r.id, positions: r.waypoints!, color: "#e07856" }));

  // Søgeindeks bygget server-side (serialiserbart) — ruter, spisesteder, steder
  // og dage. Steder linker til kortet når rejsen har et.
  const searchIndex: SearchItem[] = [
    ...trip.routes.map((r) => ({
      id: r.id,
      kind: "rute" as const,
      title: r.name,
      subtitle: `${r.area} · ${r.distanceKm} km`,
      emoji: r.emoji,
      href: `${base}/ruter/${r.slug}`,
      keywords: `${r.area} ${r.description}`,
    })),
    ...trip.restaurants.map((r) => ({
      id: r.id,
      kind: "spisested" as const,
      title: r.name,
      subtitle: `${r.kitchen} · ${r.area}`,
      emoji: r.emoji,
      href: `${base}/spisesteder`,
      keywords: `${r.kitchen} ${r.area} ${r.tags.join(" ")} ${r.description}`,
    })),
    ...trip.pois.map((p) => ({
      id: p.id,
      kind: "sted" as const,
      title: p.name,
      subtitle: p.area,
      emoji: p.emoji,
      href: hasMap ? `${base}/kort` : base,
      keywords: `${p.area} ${p.description}`,
    })),
    ...trip.days.map((d) => ({
      id: String(d.n),
      kind: "dag" as const,
      title: `Dag ${d.n}: ${d.titel}`,
      subtitle: `${d.ugedag} · ${d.tema}`,
      emoji: d.emoji,
      href: `${base}/dag/${d.n}`,
      keywords: `${d.tema} ${d.beskrivelse}`,
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <section className="grid gap-4 sm:grid-cols-[1.4fr_minmax(0,1fr)]">
        <div className="relative flex min-h-[280px] min-w-0 flex-col justify-end overflow-hidden rounded-3xl border border-border p-6 text-white shadow-md">
          {m.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={m.heroImage}
              alt={m.name}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width={1280}
              height={853}
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-[8rem]"
              style={{
                background: `radial-gradient(120% 120% at 30% 10%, ${m.accent ?? "#3a7d44"}, color-mix(in oklab, ${m.accent ?? "#3a7d44"} 55%, black))`,
              }}
              aria-hidden
            >
              <span className="opacity-90">{m.flag}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-90">
              {m.flag} {m.country}
              {m.baseName ? ` · ${m.baseName}` : ""}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight drop-shadow sm:text-5xl">
              {m.name}
            </h1>
            <p className="mt-2 max-w-md text-sm opacity-95">{m.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {hasDays && (
                <Link
                  href={`${base}/dag/1`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-topo-dark outline-none hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white"
                >
                  Start dag 1
                </Link>
              )}
              {hasRoutes && (
                <Link
                  href={`${base}/ruter`}
                  className="rounded-full border border-white/50 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  Alle ruter
                </Link>
              )}
              {m.features.includes("drone") && <DroneZonesButton />}
              <CalendarButton meta={m} days={trip.days} />
            </div>
            {m.datesTentative && (
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                ≈ Datoer er ikke endeligt fastlagt endnu
              </p>
            )}
            <div className="mt-5">
              <Countdown
                targetISO={`${m.startISO}T09:00:00`}
                arrivedLabel={`${m.flag} I er i ${m.name} — god tur!`}
              />
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <SunInfo dateISO={m.startISO} coord={m.baseCoord} timeZone={m.timeZone} />
          <WeatherSnapshot
            coord={m.baseCoord}
            startISO={m.startISO}
            endISO={m.endISO}
            initialToday={today}
          />
          {trip.accommodation && (
            <AccommodationCard accommodation={trip.accommodation} compact />
          )}
        </div>
      </section>

      {searchIndex.length > 0 && (
        <div className="mt-6">
          <TripSearch items={searchIndex} />
        </div>
      )}

      {hasDays && (
        <DayList
          days={trip.days}
          routes={trip.routes}
          base={base}
          startISO={m.startISO}
          endISO={m.endISO}
          hasRoutes={hasRoutes}
          initialToday={today}
        />
      )}

      {hasMap && markers.length > 0 && (
        <section className="mt-8">
          <header className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold">Kortet</h2>
            <span className="text-xs text-muted">Klik på en pin for detaljer</span>
          </header>
          <Map markers={markers} polylines={polylines} height="65vh" />
        </section>
      )}

      {m.features.length === 0 && (
        <section className="mt-8 rounded-3xl border border-dashed border-border bg-surface p-8 text-center">
          <Sparkles className="mx-auto text-topo" size={28} />
          <h2 className="mt-3 font-display text-xl font-semibold">
            Indhold er på vej
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Vi tilføjer ruter, spisesteder, kort og en dag-for-dag-plan til dette
            eventyr løbende. Kig forbi igen — nedtællingen kører allerede.
          </p>
        </section>
      )}
    </div>
  );
}
