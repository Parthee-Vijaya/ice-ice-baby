import SunCalc from "suncalc";
import { Sunrise, Sunset, Sun } from "lucide-react";
import type { LatLon } from "@/lib/types";

function fmt(d: Date, timeZone: string) {
  return d.toLocaleTimeString("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
}

function fmtSpan(startMs: number, endMs: number) {
  let ms = endMs - startMs;
  if (ms < 0) ms += 24 * 60 * 60 * 1000;
  const h = Math.floor(ms / (1000 * 60 * 60));
  const m = Math.floor((ms / (1000 * 60)) % 60);
  return `${h}t ${m}m`;
}

export function SunInfo({
  dateISO,
  coord,
  timeZone = "Europe/Copenhagen",
}: {
  dateISO: string;
  coord: LatLon;
  timeZone?: string;
}) {
  const date = new Date(dateISO + "T12:00:00Z");
  const t = SunCalc.getTimes(date, coord[0], coord[1]);
  const daylight = fmtSpan(t.sunrise.getTime(), t.sunset.getTime());
  const goldenStart = fmt(t.goldenHour, timeZone);
  const goldenEnd = fmt(t.sunsetStart, timeZone);
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-3">
      <div className="flex items-center gap-3">
        <Sunrise className="text-warn" size={28} />
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted">
            Solopgang
          </div>
          <div className="font-display text-xl font-semibold">{fmt(t.sunrise, timeZone)}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Sun className="text-topo" size={28} />
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted">
            Dagslys
          </div>
          <div className="font-display text-xl font-semibold">{daylight}</div>
          <div className="text-[11px] text-muted">
            Golden hour {goldenStart}–{goldenEnd}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Sunset className="text-accent" size={28} />
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted">
            Solnedgang
          </div>
          <div className="font-display text-xl font-semibold">{fmt(t.sunset, timeZone)}</div>
        </div>
      </div>
    </div>
  );
}
