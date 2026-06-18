import { notFound } from "next/navigation";
import { getTrip } from "@/lib/trips";
import { RestaurantsBrowser } from "@/components/RestaurantsBrowser";

export default async function RestaurantsPage({
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
          {trip.restaurants.length} spisesteder · curated
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold">Spisesteder</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Curated spisesteder for turen. Tryk på hjertet for at gemme jeres
          favoritter — husk at de bedste ofte kræver reservation flere uger før.
        </p>
      </header>
      <RestaurantsBrowser restaurants={trip.restaurants} tripSlug={trip.meta.slug} />
    </div>
  );
}
