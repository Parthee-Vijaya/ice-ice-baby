"use client";

import { useCallback, useEffect, useState } from "react";

// Hvad man kan gemme som favorit. Hver slags har sin egen localStorage-nøgle, så
// en favorit-rute ikke kolliderer med en favorit-restaurant på samme rejse.
// "routes" beholder sin gamle nøgle (`fav-routes`) → tidligere gemte favoritter
// overlever opdateringen.
export type FavoriteKind = "routes" | "restaurants" | "pois";

// Favoritter gemmes lokalt pr. rejse (ingen konto/DB). Nøglen er rejse-præfiks +
// slags, så Færøernes favoritter ikke blander sig med en anden rejses.
function storageKeyFor(tripSlug: string, kind: FavoriteKind): string {
  return `eventyr-${tripSlug}-fav-${kind}`;
}
function eventNameFor(tripSlug: string, kind: FavoriteKind): string {
  return `eventyr-${tripSlug}-fav-${kind}-changed`;
}

function readFavorites(storageKey: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function persistFavorites(
  storageKey: string,
  eventName: string,
  ids: string[],
): void {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(ids));
  } catch {
    /* private mode / quota — favoritter er ikke-kritiske */
  }
  // Hold alle hook-instanser på samme side i sync (kort + favorit-sektion).
  window.dispatchEvent(new Event(eventName));
}

export type UseFavorites = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
  ready: boolean;
  count: number;
};

export function useFavorites(
  tripSlug: string,
  kind: FavoriteKind = "routes",
): UseFavorites {
  const storageKey = storageKeyFor(tripSlug, kind);
  const eventName = eventNameFor(tripSlug, kind);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites(storageKey));
    setReady(true);

    const sync = () => setFavorites(readFavorites(storageKey));
    const onStorage = (e: StorageEvent) => {
      if (e.key === storageKey) sync();
    };
    window.addEventListener(eventName, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(eventName, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, [storageKey, eventName]);

  const toggle = useCallback(
    (id: string) => {
      const current = readFavorites(storageKey);
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      persistFavorites(storageKey, eventName, next);
      setFavorites(next);
    },
    [storageKey, eventName],
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  return { favorites, isFavorite, toggle, ready, count: favorites.length };
}
