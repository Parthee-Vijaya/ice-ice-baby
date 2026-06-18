import { notFound } from "next/navigation";
import { getTrip } from "@/lib/trips";
import { MapExplorer } from "@/components/MapExplorer";
import type { MapMarker, MapPolyline } from "@/components/MapView";

export default async function KortPage({
  params,
}: {
  params: Promise<{ trip: string }>;
}) {
  const { trip: slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();
  const base = `/rejse/${trip.meta.slug}`;

  const routeMarkers: MapMarker[] = trip.routes.map((r) => ({
    id: `route-${r.id}`,
    coord: r.startCoord,
    emoji: r.emoji,
    title: r.name,
    subtitle: `${r.distanceKm} km · ${r.area}`,
    href: `${base}/ruter/${r.slug}`,
    color: "#3a7d44",
  }));

  const poiMarkers: MapMarker[] = trip.pois.map((p) => ({
    id: `poi-${p.id}`,
    coord: p.coord,
    emoji: p.emoji,
    title: p.name,
    subtitle: p.area,
    color: "#e07856",
  }));

  const restaurantMarkers: MapMarker[] = trip.restaurants.map((r) => ({
    id: `rest-${r.id}`,
    coord: r.coord,
    emoji: r.emoji,
    title: r.name,
    subtitle: r.kitchen,
    color: "#d4a017",
  }));

  const homeMarkers: MapMarker[] = trip.accommodation
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
    : [];

  const polylines: MapPolyline[] = trip.routes
    .filter((r) => r.waypoints && r.waypoints.length > 1)
    .map((r) => ({ id: r.id, positions: r.waypoints!, color: "#e07856" }));

  const groups = [
    { key: "ruter", label: "Ruter", color: "#3a7d44", markers: routeMarkers },
    { key: "sevaerdigheder", label: "Severdigheder", color: "#e07856", markers: poiMarkers },
    { key: "mad", label: "Spisesteder", color: "#d4a017", markers: restaurantMarkers },
    { key: "bolig", label: "Bolig", color: "#1c1f1d", markers: homeMarkers },
  ].filter((g) => g.markers.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6">
      <header className="mb-2">
        <h1 className="font-display text-2xl font-semibold">Kort</h1>
        <p className="text-sm text-muted">
          Alt på ét kort. Tryk på en kategori for at vise/skjule, og på en pin for
          detaljer.
        </p>
      </header>
      <MapExplorer groups={groups} polylines={polylines} />
    </div>
  );
}
