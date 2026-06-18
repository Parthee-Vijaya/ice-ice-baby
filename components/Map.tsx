"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type MapView from "./MapView";

const MapViewDynamic = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] items-center justify-center rounded-2xl border border-border bg-surface-2 text-sm text-muted">
      Indlæser kort…
    </div>
  ),
});

export type MapProps = ComponentProps<typeof MapView>;

export function Map(props: MapProps) {
  return <MapViewDynamic {...props} />;
}
