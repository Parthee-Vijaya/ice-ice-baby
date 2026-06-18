import type { TripMeta } from "@/lib/trips/types";
import type { DayPlan } from "@/lib/types";

// Minimal iCalendar-generator (RFC 5546). Bygger en .ics med ét helddags-event
// for hele rejsen + ét pr. dag, så turen kan lægges direkte i Kalender/Google.
// Ren funktion uden DOM-afhængigheder → let at teste.

function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// ISO (YYYY-MM-DD) → ICS DATE (YYYYMMDD).
function toIcsDate(iso: string): string {
  return iso.replace(/-/g, "");
}

// Helddags-DTEND er eksklusiv → læg én dag til slutdatoen.
function nextDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + 1));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}

// Fold lange linjer til ≤75 oktetter (RFC 5545 3.1) — fortsættelseslinjer
// starter med ét mellemrum.
function foldLine(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let rest = line;
  chunks.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length > 0) {
    chunks.push(" " + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  return chunks.join("\r\n");
}

function vevent(opts: {
  uid: string;
  stamp: string;
  startISO: string;
  endISO: string;
  summary: string;
  description?: string;
  location?: string;
}): string[] {
  const lines = [
    "BEGIN:VEVENT",
    `UID:${opts.uid}`,
    `DTSTAMP:${opts.stamp}`,
    `DTSTART;VALUE=DATE:${toIcsDate(opts.startISO)}`,
    `DTEND;VALUE=DATE:${toIcsDate(nextDay(opts.endISO))}`,
    `SUMMARY:${escapeText(opts.summary)}`,
  ];
  if (opts.description) lines.push(`DESCRIPTION:${escapeText(opts.description)}`);
  if (opts.location) lines.push(`LOCATION:${escapeText(opts.location)}`);
  lines.push("TRANSP:TRANSPARENT", "END:VEVENT");
  return lines;
}

export function buildTripICS(
  meta: TripMeta,
  days: DayPlan[] = [],
  stamp: string = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
): string {
  const location = [meta.baseName, meta.country].filter(Boolean).join(", ");

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ice Ice Baby//Rejseplan//DA",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...vevent({
      uid: `${meta.slug}-trip@ice-ice-baby`,
      stamp,
      startISO: meta.startISO,
      endISO: meta.endISO,
      summary: `${meta.flag} ${meta.name}`,
      description: meta.blurb,
      location,
    }),
  ];

  for (const d of days) {
    lines.push(
      ...vevent({
        uid: `${meta.slug}-day-${d.n}@ice-ice-baby`,
        stamp,
        startISO: d.dato,
        endISO: d.dato,
        summary: `${d.emoji} Dag ${d.n}: ${d.titel}`,
        description: d.beskrivelse,
        location,
      }),
    );
  }

  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
