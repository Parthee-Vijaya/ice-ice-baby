import { Home, CalendarCheck } from "lucide-react";
import type { Accommodation } from "@/lib/types";
import { OpenInMapsButton } from "./OpenInMapsButton";

export function AccommodationCard({
  accommodation,
  compact = false,
}: {
  accommodation: Accommodation;
  compact?: boolean;
}) {
  const a = accommodation;
  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
          <Home size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wider text-muted">Jeres base</p>
          <p className="truncate text-sm font-semibold">{a.street}, {a.area}</p>
        </div>
        <OpenInMapsButton coord={a.coord} destinationName={a.name} label="Kort" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-foreground text-background">
          <Home size={22} />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted">Her bor I</p>
          <h3 className="font-display text-lg font-semibold leading-tight">
            {a.street}
          </h3>
          <p className="text-sm text-muted">{a.area}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted">
        <CalendarCheck size={14} className="text-topo" />
        {a.checkIn} → {a.checkOut}
      </div>
      {a.note && <p className="text-sm text-foreground/85">{a.note}</p>}
      <OpenInMapsButton coord={a.coord} destinationName={a.name} label="Vis boligen på kort" />
    </div>
  );
}
