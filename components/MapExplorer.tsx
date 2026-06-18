"use client";

import { useState } from "react";
import { Map, type MapProps } from "./Map";
import type { MapMarker, MapPolyline } from "./MapView";

type Group = {
  key: string;
  label: string;
  color: string;
  markers: MapMarker[];
};

export function MapExplorer({
  groups,
  polylines,
}: {
  groups: Group[];
  polylines: MapPolyline[];
}) {
  const [active, setActive] = useState<Record<string, boolean>>(
    Object.fromEntries(groups.map((g) => [g.key, true]))
  );

  const visibleMarkers = groups
    .filter((g) => active[g.key])
    .flatMap((g) => g.markers);
  const showPolylines = active["ruter"];

  const mapProps: MapProps = {
    markers: visibleMarkers,
    polylines: showPolylines ? polylines : [],
    height: "100%",
    fitBounds: true,
  };

  return (
    <div className="flex h-[calc(100dvh-7.5rem)] flex-col gap-2 md:h-[calc(100dvh-6rem)]">
      <div className="flex flex-wrap gap-1.5">
        {groups.map((g) => {
          const on = active[g.key];
          return (
            <button
              key={g.key}
              type="button"
              aria-pressed={on}
              aria-label={`${g.label} — ${on ? "vist, tryk for at skjule" : "skjult, tryk for at vise"}`}
              onClick={() => setActive((s) => ({ ...s, [g.key]: !s[g.key] }))}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-accent ${
                on
                  ? "border-transparent text-white"
                  : "border-border bg-surface text-muted"
              }`}
              style={on ? { backgroundColor: g.color } : undefined}
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: on ? "#fff" : g.color }}
              />
              {g.label} ({g.markers.length})
            </button>
          );
        })}
      </div>
      <div className="min-h-0 flex-1">
        <Map {...mapProps} />
      </div>
    </div>
  );
}
