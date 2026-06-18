import Link from "next/link";
import type { TripMeta, TripStatus } from "@/lib/trips/types";
import { TripCountdown } from "./TripCountdown";

const STATUS_STYLE: Record<TripStatus, { label: string; cls: string }> = {
  aktiv: { label: "I gang nu", cls: "bg-topo text-white" },
  kommende: { label: "Kommende", cls: "bg-accent text-white" },
  afsluttet: { label: "Afsluttet", cls: "bg-black/55 text-white/90" },
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function fmtDates(m: TripMeta): string {
  if (m.datesTentative) {
    return capitalize(
      new Date(`${m.startISO}T12:00:00`).toLocaleDateString("da-DK", {
        month: "long",
        year: "numeric",
      }),
    );
  }
  const s = new Date(`${m.startISO}T12:00:00`);
  const e = new Date(`${m.endISO}T12:00:00`);
  const year = e.getFullYear();
  const eMonth = e.toLocaleDateString("da-DK", { month: "long" });
  if (s.getMonth() === e.getMonth()) {
    return `${s.getDate()}.–${e.getDate()}. ${eMonth} ${year}`;
  }
  const sMonth = s.toLocaleDateString("da-DK", { month: "short" });
  return `${s.getDate()}. ${sMonth} – ${e.getDate()}. ${eMonth} ${year}`;
}

export function TripCard({
  meta: m,
  status,
  priority = false,
}: {
  meta: TripMeta;
  status: TripStatus;
  priority?: boolean;
}) {
  const st = STATUS_STYLE[status];
  const dimmed = status === "afsluttet";

  return (
    <Link
      href={`/rejse/${m.slug}`}
      className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl border border-border shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent"
    >
      {m.heroImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={m.heroImage}
          alt={m.name}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          width={1280}
          height={853}
          className={`absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105 ${
            dimmed ? "opacity-70 saturate-[0.85]" : ""
          }`}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center text-7xl"
          style={{
            background: `radial-gradient(120% 120% at 30% 10%, ${m.accent ?? "#3a7d44"}, color-mix(in oklab, ${m.accent ?? "#3a7d44"} 55%, black))`,
          }}
          aria-hidden
        >
          <span className="opacity-90 drop-shadow">{m.flag}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      <span
        className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${st.cls}`}
      >
        {st.label}
      </span>

      <div className="relative p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest opacity-90">
          {m.flag} {m.country}
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold leading-tight drop-shadow">
          {m.name}
        </h2>
        <p className="mt-1 flex items-center gap-1.5 text-sm opacity-90">
          {m.datesTentative && <span aria-hidden>≈</span>}
          {fmtDates(m)}
          {m.datesTentative && (
            <span className="rounded-full bg-white/20 px-1.5 py-px text-[10px] font-medium uppercase tracking-wide backdrop-blur">
              ca.
            </span>
          )}
        </p>
        {status !== "afsluttet" && (
          <div className="mt-2.5">
            <TripCountdown startISO={m.startISO} endISO={m.endISO} />
          </div>
        )}
      </div>
    </Link>
  );
}
