"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import type { LatLon } from "@/lib/types";
import { useToday } from "@/lib/useToday";

type Forecast = {
  date: string;
  temp: number;
  wind: number;
  symbol: string;
};

function symbolIcon(symbol: string) {
  if (symbol.includes("rain") || symbol.includes("sleet"))
    return <CloudRain size={18} className="text-accent" />;
  if (symbol.includes("clear") || symbol.includes("fair"))
    return <Sun size={18} className="text-warn" />;
  return <Cloud size={18} className="text-muted" />;
}

function daysUntil(fromISO: string, toISO: string): number {
  return Math.round((Date.parse(toISO) - Date.parse(fromISO)) / 86_400_000);
}

const notice =
  "rounded-xl border border-border bg-surface p-3 text-xs text-muted";

export function WeatherSnapshot({
  coord,
  targetDate,
  startISO,
  endISO,
  initialToday,
}: {
  coord: LatLon;
  targetDate?: string;
  startISO?: string;
  endISO?: string;
  initialToday: string;
}) {
  const today = useToday(initialToday);
  // met.no's prognose rækker ~10 dage. Vis kun når i dag er inden for 10 dage før
  // afrejse t.o.m. hjemkomst — ellers er vejret ikke retvisende (fx Hamborg i
  // december set i juni). Uden start/end vises altid (bagudkompatibelt).
  const inWindow =
    !startISO || !endISO
      ? true
      : today <= endISO && daysUntil(today, startISO) <= 10;

  const [data, setData] = useState<Forecast[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!inWindow) return;
    let cancelled = false;
    fetch(`/api/weather?lat=${coord[0]}&lon=${coord[1]}`)
      .then((r) => {
        if (!r.ok) throw new Error("Vejret kunne ikke hentes");
        return r.json();
      })
      .then((j) => {
        if (!cancelled) setData(j.forecast);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [coord, inWindow]);

  if (!inWindow) {
    return <div className={notice}>🌤️ Vejret vises tættere på afrejse.</div>;
  }
  if (error) {
    return (
      <div className={notice}>
        Vejret er ikke tilgængeligt lige nu — tjek yr.no
      </div>
    );
  }
  if (!data) {
    return <div className={notice}>Henter vejr…</div>;
  }
  if (targetDate) {
    const d = data.find((f) => f.date === targetDate);
    if (!d) {
      return <div className={notice}>Ingen prognose for {targetDate} endnu</div>;
    }
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
        {symbolIcon(d.symbol)}
        <div>
          <div className="text-sm font-semibold">{Math.round(d.temp)}°C</div>
          <div className="flex items-center gap-1 text-[11px] text-muted">
            <Wind size={11} /> {Math.round(d.wind)} m/s
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
      {data.slice(0, 7).map((d) => (
        <div
          key={d.date}
          className="flex shrink-0 flex-col items-center gap-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs"
        >
          <span className="text-[10px] uppercase text-muted">
            {new Date(d.date).toLocaleDateString("da-DK", { weekday: "short" })}
          </span>
          {symbolIcon(d.symbol)}
          <span className="font-semibold">{Math.round(d.temp)}°</span>
          <span className="text-[10px] text-muted">{Math.round(d.wind)} m/s</span>
        </div>
      ))}
    </div>
  );
}
