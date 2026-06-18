import { NextResponse } from "next/server";

export const revalidate = 3600;

type MetEntry = {
  time: string;
  data: {
    instant: { details: { air_temperature?: number; wind_speed?: number } };
    next_6_hours?: { summary?: { symbol_code?: string } };
    next_12_hours?: { summary?: { symbol_code?: string } };
    next_1_hours?: { summary?: { symbol_code?: string } };
  };
};

// Reykjavik som fallback.
const DEFAULT_LAT = 64.1466;
const DEFAULT_LON = -21.9426;

function coord(value: string | null, fallback: number, max: number): number {
  const n = Number(value);
  // Validér til tal i gyldigt interval — værdien går ind i met.no-URL'en.
  if (!Number.isFinite(n) || Math.abs(n) > max) return fallback;
  return Math.round(n * 1e4) / 1e4;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = coord(searchParams.get("lat"), DEFAULT_LAT, 90);
  const lon = coord(searchParams.get("lon"), DEFAULT_LON, 180);
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "ice-ice-baby/1.0 parti.vijaya1@gmail.com",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `met.no returned ${res.status}` },
        { status: 502 }
      );
    }
    const json = (await res.json()) as {
      properties: { timeseries: MetEntry[] };
    };
    const ts = json.properties.timeseries;
    const byDay = new Map<string, MetEntry>();
    for (const entry of ts) {
      const date = entry.time.slice(0, 10);
      const hour = new Date(entry.time).getUTCHours();
      const existing = byDay.get(date);
      if (!existing || Math.abs(hour - 12) < Math.abs(new Date(existing.time).getUTCHours() - 12)) {
        byDay.set(date, entry);
      }
    }
    const forecast = Array.from(byDay.entries())
      .slice(0, 10)
      .map(([date, entry]) => ({
        date,
        temp: entry.data.instant.details.air_temperature ?? 0,
        wind: entry.data.instant.details.wind_speed ?? 0,
        symbol:
          entry.data.next_6_hours?.summary?.symbol_code ??
          entry.data.next_12_hours?.summary?.symbol_code ??
          entry.data.next_1_hours?.summary?.symbol_code ??
          "cloudy",
      }));
    return NextResponse.json({ forecast, source: "met.no" });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 502 }
    );
  }
}
