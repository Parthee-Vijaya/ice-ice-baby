"use client";

import { MapPin } from "lucide-react";
import type { LatLon } from "@/lib/types";

type Props = {
  coord: LatLon;
  label?: string;
  destinationName?: string;
};

export function OpenInMapsButton({
  coord,
  label = "Åbn i Maps",
  destinationName,
}: Props) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isMac = /Macintosh/i.test(ua);
    const [lat, lon] = coord;
    const name = destinationName ? encodeURIComponent(destinationName) : "";
    if (isIOS || isMac) {
      e.preventDefault();
      const url = `maps://?daddr=${lat},${lon}${name ? `&q=${name}` : ""}&dirflg=d`;
      window.location.href = url;
    }
  }
  const [lat, lon] = coord;
  const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}${destinationName ? `&destination_place_id=&query=${encodeURIComponent(destinationName)}` : ""}`;
  return (
    <a
      href={googleUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
    >
      <MapPin size={16} />
      {label}
    </a>
  );
}
