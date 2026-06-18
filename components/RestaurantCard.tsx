import type { Restaurant } from "@/lib/types";
import { OpenInMapsButton } from "./OpenInMapsButton";
import { FavoriteButton } from "./FavoriteButton";

function priceLabel(level: 1 | 2 | 3 | 4) {
  return "kr".repeat(level);
}

export function RestaurantCard({
  restaurant,
  tripSlug,
}: {
  restaurant: Restaurant;
  tripSlug?: string;
}) {
  return (
    <div className="relative flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
      {tripSlug && (
        <div className="absolute right-3 top-3">
          <FavoriteButton
            tripSlug={tripSlug}
            id={restaurant.id}
            kind="restaurants"
            variant="inline"
          />
        </div>
      )}
      <div className="flex items-start gap-3 pr-11">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-2xl">
          {restaurant.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-semibold leading-tight">
              {restaurant.name}
            </h3>
            <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted">
              {priceLabel(restaurant.priceLevel)}
            </span>
          </div>
          <p className="text-xs text-muted">{restaurant.kitchen}</p>
        </div>
      </div>
      <p className="text-sm text-foreground/85">{restaurant.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {restaurant.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-topo-tint px-2 py-0.5 text-[11px] text-topo-dark"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <OpenInMapsButton
          coord={restaurant.coord}
          destinationName={restaurant.name}
          label="På kort"
        />
        {restaurant.bookingUrl && (
          <a
            href={restaurant.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-2"
          >
            Reservér
          </a>
        )}
        {restaurant.phone && (
          <a
            href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-2"
          >
            Ring
          </a>
        )}
        {restaurant.bookingRequired && (
          <span className="ml-auto text-[11px] font-medium uppercase text-accent">
            Reservation
          </span>
        )}
      </div>
    </div>
  );
}
