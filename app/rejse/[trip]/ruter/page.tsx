import { notFound } from "next/navigation";
import { getTrip } from "@/lib/trips";
import { RoutesBrowser } from "@/components/RoutesBrowser";

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ trip: string }>;
}) {
  const { trip: slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {trip.routes.length} ruter
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold">Ruter</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Vandringer og oplevelser. Tryk på hjertet for at gemme en favorit — tryk
          på en rute for kort, tid, sværhedsgrad og navigation til startstedet.
        </p>
      </header>

      <RoutesBrowser routes={trip.routes} tripSlug={trip.meta.slug} />
    </div>
  );
}
