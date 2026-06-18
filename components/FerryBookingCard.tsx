import type { Ferry } from "@/lib/types";
import { Ship, Clock, AlertTriangle } from "lucide-react";

const riskColor: Record<Ferry["cancellationRisk"], string> = {
  lav: "text-topo",
  middel: "text-warn",
  hoej: "text-danger",
};

const riskLabel: Record<Ferry["cancellationRisk"], string> = {
  lav: "Lav aflysningsrisiko",
  middel: "Middel — tjek vejret",
  hoej: "HØJ — aflyses ofte ved vind",
};

export function FerryBookingCard({ ferry }: { ferry: Ferry }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-topo-tint text-topo-dark">
          <Ship size={22} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight">
            {ferry.name}
          </h3>
          <p className="text-xs text-muted">
            {ferry.from} → {ferry.to}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 text-muted">
          <Clock size={14} /> {ferry.durationMin} min
        </div>
        <div className="text-muted">{ferry.costDKK} kr</div>
      </div>
      {ferry.costNote && <p className="text-xs text-muted">{ferry.costNote}</p>}
      <p className="text-sm">{ferry.schedule}</p>
      {ferry.bookingNote && (
        <div className="rounded-xl bg-warn/10 px-3 py-2 text-xs font-medium text-warn">
          <AlertTriangle size={12} className="mr-1 inline" />
          {ferry.bookingNote}
        </div>
      )}
      <div className={`text-[11px] font-semibold ${riskColor[ferry.cancellationRisk]}`}>
        {riskLabel[ferry.cancellationRisk]}
      </div>
      <a
        href={ferry.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
      >
        Book på ssl.fo →
      </a>
    </div>
  );
}
