"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import type { LatLon } from "@/lib/types";

const iconCache: Record<string, L.DivIcon> = {};

function divIcon(emoji: string, color = "#3a7d44") {
  const key = `${emoji}-${color}`;
  if (iconCache[key]) return iconCache[key];
  const html = `
    <div style="
      width:34px;height:34px;border-radius:50% 50% 50% 0;
      background:${color};transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 6px rgba(0,0,0,.25);border:2px solid white;">
      <span style="transform:rotate(45deg);font-size:18px;line-height:1;">${emoji}</span>
    </div>`;
  const icon = L.divIcon({
    html,
    className: "iceland-marker",
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });
  iconCache[key] = icon;
  return icon;
}

export type MapMarker = {
  id: string;
  coord: LatLon;
  emoji: string;
  title: string;
  subtitle?: string;
  color?: string;
  href?: string;
};

export type MapPolyline = {
  id: string;
  positions: LatLon[];
  color?: string;
};

type Props = {
  center?: LatLon;
  zoom?: number;
  markers?: MapMarker[];
  polylines?: MapPolyline[];
  fitBounds?: boolean;
  height?: string;
};

function FitBounds({ markers, polylines }: { markers: MapMarker[]; polylines: MapPolyline[] }) {
  const map = useMap();
  useEffect(() => {
    const allPts: LatLon[] = [
      ...markers.map((m) => m.coord),
      ...polylines.flatMap((p) => p.positions),
    ];
    if (allPts.length === 0) return;
    if (allPts.length === 1) {
      map.setView(allPts[0], 11);
      return;
    }
    const bounds = L.latLngBounds(allPts.map((p) => L.latLng(p[0], p[1])));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }, [map, markers, polylines]);
  return null;
}

export default function MapView({
  center = [62.1, -6.9],
  zoom = 9,
  markers = [],
  polylines = [],
  fitBounds = true,
  height = "60vh",
}: Props) {
  const polys = useMemo(() => polylines, [polylines]);
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border shadow-sm"
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        {polys.map((p) => (
          <Polyline
            key={p.id}
            positions={p.positions.map((c) => [c[0], c[1]])}
            pathOptions={{
              color: p.color || "#e07856",
              weight: 4,
              opacity: 0.85,
              dashArray: "6 6",
            }}
          />
        ))}
        {markers.map((m) => (
          <Marker key={m.id} position={m.coord} icon={divIcon(m.emoji, m.color || "#3a7d44")}>
            <Popup>
              <div className="flex flex-col gap-1">
                <strong className="text-sm">{m.title}</strong>
                {m.subtitle && <span className="text-xs text-muted">{m.subtitle}</span>}
                {m.href && (
                  <a
                    href={m.href}
                    className="mt-1 text-xs font-medium text-topo underline"
                  >
                    Vis detaljer →
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        {fitBounds && <FitBounds markers={markers} polylines={polys} />}
      </MapContainer>
    </div>
  );
}
