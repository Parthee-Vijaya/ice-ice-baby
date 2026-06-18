"use client";

import { Heart } from "lucide-react";
import type { Restaurant } from "@/lib/types";
import { useFavorites } from "@/lib/useFavorites";
import { RestaurantCard } from "./RestaurantCard";

// Spisesteder grupperet pr. område med en favorit-sektion øverst. Favoritterne
// læses klient-side (localStorage), så grupperingen og favorit-listen lever i
// samme komponent — på linje med RoutesBrowser.
export function RestaurantsBrowser({
  restaurants,
  tripSlug,
}: {
  restaurants: Restaurant[];
  tripSlug: string;
}) {
  const { favorites, ready } = useFavorites(tripSlug, "restaurants");

  // Bevar favorit-rækkefølgen, drop ukendte id'er.
  const favoriteRestaurants = ready
    ? favorites
        .map((id) => restaurants.find((r) => r.id === id))
        .filter((r): r is Restaurant => Boolean(r))
    : [];

  // Aflæs områder fra rejsens egne spisesteder (kureret rækkefølge).
  const areaOrder: string[] = [];
  for (const r of restaurants) {
    if (!areaOrder.includes(r.area)) areaOrder.push(r.area);
  }

  return (
    <>
      {favoriteRestaurants.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 font-display text-2xl font-semibold">
            <Heart size={20} className="fill-accent text-accent" aria-hidden />
            Jeres favoritter
            <span className="text-sm font-normal text-muted">
              ({favoriteRestaurants.length})
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteRestaurants.map((r) => (
              <RestaurantCard key={`fav-${r.id}`} restaurant={r} tripSlug={tripSlug} />
            ))}
          </div>
        </section>
      )}

      {areaOrder.map((area) => {
        const items = restaurants.filter((r) => r.area === area);
        if (items.length === 0) return null;
        return (
          <section key={area} className="mb-8">
            <h2 className="mb-3 font-display text-2xl font-semibold">{area}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} tripSlug={tripSlug} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
