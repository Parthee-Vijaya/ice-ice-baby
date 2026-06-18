import { Car, Clock, Ticket } from "lucide-react";
import type { ItineraryStop } from "@/lib/types";

// Dagens program, trofast efter rejseplanen: klokkeslæt, transporttid mellem
// stop, varighed og beskrivelse for hvert stop.
export function DayItinerary({ stops }: { stops: ItineraryStop[] }) {
  return (
    <ol className="relative">
      {stops.map((s, i) => (
        <li key={i} className="relative pl-9 pb-5 last:pb-0">
          {i < stops.length - 1 && (
            <span
              className="absolute left-[11px] top-7 bottom-0 w-px bg-border"
              aria-hidden
            />
          )}
          <span
            className="absolute left-0 top-1 flex size-[23px] items-center justify-center rounded-full bg-topo text-[11px] font-bold text-white"
            aria-hidden
          >
            {i + 1}
          </span>

          {s.transport && (
            <p className="mb-1 inline-flex items-center gap-1 text-[11px] font-medium text-muted">
              <Car size={12} /> {s.transport}
            </p>
          )}

          <div className="rounded-xl border border-border bg-surface p-3">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {s.tid && (
                <span className="rounded-md bg-topo px-1.5 py-0.5 text-[11px] font-semibold text-white">
                  {s.tid}
                </span>
              )}
              <h3 className="font-display text-sm font-semibold leading-snug">
                {s.sted}
              </h3>
            </div>

            {(s.varighed || s.booket || s.pris) && (
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                {s.varighed && (
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {s.varighed}
                  </span>
                )}
                {s.booket && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-topo/10 px-2 py-0.5 font-medium text-topo">
                    <Ticket size={11} /> Booket
                  </span>
                )}
                {s.pris && <span className="font-medium text-accent">{s.pris}</span>}
              </div>
            )}

            {s.beskrivelse && (
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/85">
                {s.beskrivelse}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
