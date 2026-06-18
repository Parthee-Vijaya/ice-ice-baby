import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrip, trips } from "@/lib/trips";
import { todayISO, isDefined } from "@/lib/trips/types";
import { Map } from "@/components/Map";
import { SunInfo } from "@/components/SunInfo";
import { WeatherSnapshot } from "@/components/WeatherSnapshot";
import { RestaurantCard } from "@/components/RestaurantCard";
import { FerryBookingCard } from "@/components/FerryBookingCard";
import { AccommodationCard } from "@/components/AccommodationCard";
import { DayActivityPicker, type PickOption } from "@/components/DayActivityPicker";
import { DayItinerary } from "@/components/DayItinerary";
import { ArrowLeft, ArrowRight, Info, Plane } from "lucide-react";

export function generateStaticParams() {
  return trips.flatMap((t) =>
    t.days.map((d) => ({ trip: t.meta.slug, n: String(d.n) })),
  );
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ trip: string; n: string }>;
}) {
  const { trip: tripSlug, n } = await params;
  const trip = getTrip(tripSlug);
  if (!trip) notFound();
  const day = trip.days.find((d) => d.n === Number(n));
  if (!day) notFound();

  const m = trip.meta;
  const base = `/rejse/${m.slug}`;
  const today = todayISO();
  const dayRoutes = day.routeIds
    .map((id) => trip.routes.find((r) => r.id === id))
    .filter(isDefined);
  const dayRestaurants = day.restaurantIds
    .map((id) => trip.restaurants.find((r) => r.id === id))
    .filter(isDefined);
  const dayPois = day.poiIds
    .map((id) => trip.pois.find((p) => p.id === id))
    .filter(isDefined);
  const dayFerries = (day.ferryIds || [])
    .map((id) => trip.ferries.find((f) => f.id === id))
    .filter(isDefined);
  const altRoutes = (day.alternativeRouteIds || [])
    .map((id) => trip.routes.find((r) => r.id === id))
    .filter(isDefined);
  const altPois = (day.alternativePoiIds || [])
    .map((id) => trip.pois.find((p) => p.id === id))
    .filter(isDefined);

  const pickOptions: PickOption[] = [
    ...dayRoutes.map((r) => ({
      id: r.id,
      kind: "route" as const,
      name: r.name,
      area: r.area,
      image: r.image,
      emoji: r.emoji,
      slug: r.slug,
      distanceKm: r.distanceKm,
      durationMin: r.durationMin,
      difficulty: r.difficulty,
      costDKK: r.costDKK,
      description: r.description,
      isPrimary: true,
    })),
    ...altRoutes.map((r) => ({
      id: r.id,
      kind: "route" as const,
      name: r.name,
      area: r.area,
      image: r.image,
      emoji: r.emoji,
      slug: r.slug,
      distanceKm: r.distanceKm,
      durationMin: r.durationMin,
      difficulty: r.difficulty,
      costDKK: r.costDKK,
      description: r.description,
      isPrimary: false,
    })),
    ...altPois.map((p) => ({
      id: p.id,
      kind: "poi" as const,
      name: p.name,
      area: p.area,
      image: p.image,
      emoji: p.emoji,
      description: p.description,
      isPrimary: false,
    })),
  ];

  const markers = [
    ...dayRoutes.map((r) => ({
      id: `route-${r.id}`,
      coord: r.startCoord,
      emoji: r.emoji,
      title: r.name,
      subtitle: `${r.distanceKm} km · ${r.area}`,
      href: `${base}/ruter/${r.slug}`,
    })),
    ...dayPois.map((p) => ({
      id: `poi-${p.id}`,
      coord: p.coord,
      emoji: p.emoji,
      title: p.name,
      subtitle: p.area,
      color: "#e07856",
    })),
    ...dayRestaurants.map((r) => ({
      id: `rest-${r.id}`,
      coord: r.coord,
      emoji: r.emoji,
      title: r.name,
      subtitle: r.kitchen,
      color: "#d4a017",
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
  const polylines = dayRoutes
    .filter((r) => r.waypoints && r.waypoints.length > 1)
    .map((r) => ({ id: r.id, positions: r.waypoints!, color: "#e07856" }));

  const prev = day.n > 1 ? trip.days.find((d) => d.n === day.n - 1) : null;
  const next =
    day.n < trip.days.length ? trip.days.find((d) => d.n === day.n + 1) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <nav className="mb-4 flex items-center justify-between text-sm">
        <Link
          href={base}
          className="inline-flex items-center gap-1 text-muted hover:text-foreground"
        >
          <ArrowLeft size={14} /> {m.name}
        </Link>
        <div className="flex items-center gap-2">
          {prev && (
            <Link
              href={`${base}/dag/${prev.n}`}
              className="rounded-full bg-surface-2 px-3 py-1 text-xs hover:bg-border"
            >
              ← Dag {prev.n}
            </Link>
          )}
          {next && (
            <Link
              href={`${base}/dag/${next.n}`}
              className="rounded-full bg-surface-2 px-3 py-1 text-xs hover:bg-border"
            >
              Dag {next.n} →
            </Link>
          )}
        </div>
      </nav>

      <section className="grid gap-4 sm:grid-cols-[1.4fr_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-3 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-2 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-topo text-3xl">
              {day.emoji}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Dag {day.n} · {day.ugedag}{" "}
                {new Date(day.dato).toLocaleDateString("da-DK", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <h1 className="font-display text-3xl font-semibold leading-tight">
                {day.titel}
              </h1>
            </div>
            {day.arrival && (
              <span className="ml-auto inline-flex items-center gap-1.5 self-start rounded-full bg-topo px-3 py-1 text-xs font-semibold text-white">
                <Plane size={13} /> Lander {day.arrival}
              </span>
            )}
            {day.departure && (
              <span className="ml-auto inline-flex items-center gap-1.5 self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                <Plane size={13} className="rotate-45" /> Afrejse
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-foreground/85">
            {day.beskrivelse}
          </p>
          {day.weatherDependent && day.planB && (
            <div className="rounded-xl bg-warn/10 p-3 text-sm">
              <p className="flex items-center gap-1 font-semibold text-warn">
                <Info size={14} /> Vejr-afhængig
              </p>
              <p className="mt-1 text-xs text-foreground/85">{day.planB}</p>
            </div>
          )}
          {trip.accommodation && (
            <div className="mt-auto">
              <AccommodationCard accommodation={trip.accommodation} compact />
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <SunInfo dateISO={day.dato} coord={m.baseCoord} timeZone={m.timeZone} />
          <WeatherSnapshot
            coord={m.baseCoord}
            targetDate={day.dato}
            startISO={m.startISO}
            endISO={m.endISO}
            initialToday={today}
          />
        </div>
      </section>

      {day.itinerary && day.itinerary.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-3 font-display text-xl font-semibold">Dagens program</h2>
          <p className="mb-3 text-sm text-muted">
            Stop for stop fra rejseplanen — med transporttid og varighed.
          </p>
          <DayItinerary stops={day.itinerary} />
        </section>
      )}

      {markers.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-2 font-display text-xl font-semibold">Dagens kort</h2>
          <Map markers={markers} polylines={polylines} height="55vh" />
        </section>
      )}

      {pickOptions.length > 0 && (
        <section className="mt-8">
          <div className="mb-3">
            <h2 className="font-display text-xl font-semibold">
              Dagens oplevelser
            </h2>
            <p className="text-sm text-muted">
              Aktiviteter og oplevelser fra rejseplanen.
            </p>
          </div>
          <DayActivityPicker tripSlug={m.slug} dayN={day.n} options={pickOptions} />
        </section>
      )}

      {dayFerries.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl font-semibold">Færger</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {dayFerries.map((f) => (
              <FerryBookingCard key={f.id} ferry={f} />
            ))}
          </div>
        </section>
      )}

      {day.tips.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl font-semibold">Tips til dagen</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {day.tips.map((tip, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-xl border border-border bg-surface p-3 text-sm"
              >
                <span className="text-topo">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {dayRestaurants.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl font-semibold">Spisesteder</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {dayRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      )}

      {dayPois.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl font-semibold">Stop undervejs</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dayPois.map((p) => (
              <div
                key={p.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
              >
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={720}
                    className="aspect-[16/9] w-full object-cover"
                  />
                )}
                <div className="flex gap-3 p-4">
                  {!p.image && <span className="text-2xl">{p.emoji}</span>}
                  <div className="flex-1">
                    <h3 className="font-display text-base font-semibold leading-tight">
                      {p.emoji} {p.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-muted">
                      {p.area} · {p.category}
                    </p>
                    <p className="mt-1 text-sm text-foreground/85">{p.description}</p>
                    {!p.freeAccess && p.costDKK && (
                      <p className="mt-1 text-xs font-medium text-accent">
                        {p.costDKK} kr
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <nav className="mt-10 flex items-center justify-between pt-4">
        {prev ? (
          <Link
            href={`${base}/dag/${prev.n}`}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm hover:bg-surface-2"
          >
            <ArrowLeft size={14} /> Dag {prev.n}: {prev.titel}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`${base}/dag/${next.n}`}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm hover:bg-surface-2"
          >
            Dag {next.n}: {next.titel} <ArrowRight size={14} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
