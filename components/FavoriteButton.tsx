"use client";

import { Heart } from "lucide-react";
import { useFavorites, type FavoriteKind } from "@/lib/useFavorites";

const NOUN: Record<FavoriteKind, string> = {
  routes: "rute",
  restaurants: "spisested",
  pois: "sted",
};

// Toggle til at gemme et element (rute/spisested/sted) som favorit. Designet til
// at ligge oven på et kort der selv kan være et <Link> — derfor preventDefault/
// stopPropagation så et tryk på hjertet ikke også navigerer ind på siden.
export function FavoriteButton({
  tripSlug,
  id,
  kind = "routes",
  variant = "overlay",
}: {
  tripSlug: string;
  id: string;
  kind?: FavoriteKind;
  variant?: "overlay" | "inline";
}) {
  const { isFavorite, toggle, ready } = useFavorites(tripSlug, kind);
  const active = ready && isFavorite(id);
  const noun = NOUN[kind];

  const look =
    variant === "overlay"
      ? "size-9 bg-surface/85 shadow-sm backdrop-blur hover:bg-surface"
      : "size-9 border border-border bg-surface hover:bg-surface-2";

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Fjern ${noun} fra favoritter` : `Gem ${noun} som favorit`}
      title={active ? "Fjern fra favoritter" : "Gem som favorit"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={`inline-flex items-center justify-center rounded-full transition active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${look}`}
    >
      <Heart
        size={18}
        className={active ? "fill-accent text-accent" : "text-foreground/55"}
        aria-hidden
      />
    </button>
  );
}
