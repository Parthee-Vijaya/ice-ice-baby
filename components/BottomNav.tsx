"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Footprints, Map as MapIcon, UtensilsCrossed, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TripFeature, TripMeta } from "@/lib/trips/types";

const TABS: {
  feature?: TripFeature;
  label: string;
  icon: LucideIcon;
  path: string;
}[] = [
  { label: "Hjem", icon: Home, path: "" },
  { feature: "ruter", label: "Ruter", icon: Footprints, path: "ruter" },
  { feature: "kort", label: "Kort", icon: MapIcon, path: "kort" },
  { feature: "mad", label: "Mad", icon: UtensilsCrossed, path: "spisesteder" },
  { feature: "info", label: "Info", icon: Info, path: "info" },
];

export function BottomNav({ trip }: { trip: TripMeta }) {
  const pathname = usePathname();
  const base = `/rejse/${trip.slug}`;
  const tabs = TABS.filter((t) => !t.feature || trip.features.includes(t.feature));

  // Skjul bunden helt hvis rejsen kun har "Hjem" (sparsom rejse uden features).
  if (tabs.length <= 1) return null;

  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur-lg md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1">
        {tabs.map((t) => {
          const href = t.path ? `${base}/${t.path}` : base;
          const active = t.path
            ? pathname.startsWith(href)
            : pathname === base || pathname.startsWith(`${base}/dag`);
          const Icon = t.icon;
          return (
            <Link
              key={t.label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                active ? "text-topo" : "text-muted"
              }`}
            >
              <span
                className={`flex h-8 w-12 items-center justify-center rounded-full transition ${
                  active ? "bg-topo-tint" : ""
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 1.9} />
              </span>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
