import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { TripFeature, TripMeta } from "@/lib/trips/types";
import { DroneZonesButton } from "./DroneZonesButton";

const TABS: { feature: TripFeature; label: string; path: string }[] = [
  { feature: "ruter", label: "Ruter", path: "ruter" },
  { feature: "kort", label: "Kort", path: "kort" },
  { feature: "mad", label: "Spisesteder", path: "spisesteder" },
  { feature: "info", label: "Info", path: "info" },
];

export function TopNav({ trip }: { trip: TripMeta }) {
  const base = `/rejse/${trip.slug}`;
  const tabs = TABS.filter((t) => trip.features.includes(t.feature));
  return (
    <header className="pt-safe sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
          title="Alle eventyr"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Eventyr</span>
        </Link>
        <Link href={base} className="flex items-center gap-2">
          <span className="text-xl">{trip.flag}</span>
          <span className="font-display text-lg font-semibold tracking-tight">
            {trip.name}
          </span>
        </Link>
        <nav className="ml-4 hidden gap-1 md:flex">
          {tabs.map((t) => (
            <Link
              key={t.path}
              href={`${base}/${t.path}`}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-surface-2 hover:text-foreground"
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {trip.features.includes("drone") && <DroneZonesButton />}
        </div>
      </div>
    </header>
  );
}
