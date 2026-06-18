"use client";

import { useState } from "react";
import { CalendarPlus, Check } from "lucide-react";
import type { TripMeta } from "@/lib/trips/types";
import type { DayPlan } from "@/lib/types";
import { buildTripICS } from "@/lib/ics";

// Henter rejsen ned som en .ics-fil, så den kan lægges i Kalender/Google Calendar
// med ét tryk. Genereres helt lokalt — ingen netværkskald.
export function CalendarButton({
  meta,
  days,
}: {
  meta: TripMeta;
  days: DayPlan[];
}) {
  const [done, setDone] = useState(false);

  function download() {
    try {
      const ics = buildTripICS(meta, days);
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${meta.slug}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDone(true);
      setTimeout(() => setDone(false), 2500);
    } catch {
      /* download ikke understøttet — ikke-kritisk */
    }
  }

  return (
    <button
      type="button"
      onClick={download}
      aria-label="Tilføj rejsen til kalender"
      className="inline-flex items-center gap-2 rounded-full border border-white/50 px-4 py-2 text-sm font-medium text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
    >
      {done ? <Check size={16} /> : <CalendarPlus size={16} />}
      {done ? "Tilføjet" : "Kalender"}
    </button>
  );
}
