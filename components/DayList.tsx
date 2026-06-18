"use client";

import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import type { DayPlan, Route } from "@/lib/types";
import { useToday } from "@/lib/useToday";

const dayColors = ["#3a7d44", "#e07856", "#d4a017", "#5fa56a", "#b85a3c", "#6b6f6a"];

// Dag-for-dag-grid'et. Når rejsen er i gang (i dag inden for vinduet), markeres
// dagens kort + en genvej øverst — så man under rejsen straks ser "hvor er vi".
export function DayList({
  days,
  routes,
  base,
  startISO,
  endISO,
  hasRoutes,
  initialToday,
}: {
  days: DayPlan[];
  routes: Route[];
  base: string;
  startISO: string;
  endISO: string;
  hasRoutes: boolean;
  initialToday: string;
}) {
  const today = useToday(initialToday);
  const isActive = today >= startISO && today <= endISO;
  const todayDay = isActive ? days.find((d) => d.dato === today) : undefined;

  return (
    <section className="mt-8">
      <header className="mb-3 flex items-end justify-between">
        <h2 className="font-display text-2xl font-semibold">Dag for dag</h2>
        {hasRoutes && (
          <Link
            href={`${base}/ruter`}
            className="inline-flex items-center gap-1 rounded text-sm text-topo outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Alle ruter <ChevronRight size={14} />
          </Link>
        )}
      </header>

      {todayDay && (
        <Link
          href={`${base}/dag/${todayDay.n}`}
          className="mb-3 flex items-center gap-2 rounded-2xl border border-topo bg-topo-tint px-4 py-2.5 text-sm font-semibold text-topo-dark outline-none transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-topo"
        >
          <MapPin size={15} /> I dag: Dag {todayDay.n} · {todayDay.titel}
          <ChevronRight size={15} className="ml-auto" />
        </Link>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {days.map((d, i) => {
          const isToday = isActive && d.dato === today;
          return (
            <Link
              key={d.n}
              href={`${base}/dag/${d.n}`}
              className={`group relative flex flex-col gap-2 overflow-hidden rounded-2xl border bg-surface p-4 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent ${
                isToday ? "border-topo ring-2 ring-topo" : "border-border"
              }`}
            >
              <div
                className="absolute right-0 top-0 size-24 -translate-y-8 translate-x-6 rounded-full opacity-25 blur-2xl"
                style={{ background: dayColors[i % dayColors.length] }}
                aria-hidden
              />
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-xl">
                  {d.emoji}
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Dag {d.n} · {d.ugedag}
                  </p>
                  <h3 className="font-display text-lg font-semibold leading-tight">
                    {d.titel}
                  </h3>
                </div>
                {isToday && (
                  <span className="ml-auto shrink-0 rounded-full bg-topo px-2 py-0.5 text-[10px] font-semibold text-white">
                    I dag
                  </span>
                )}
              </div>
              <p className="line-clamp-2 text-sm text-muted">{d.tema}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {d.routeIds.slice(0, 3).map((id) => {
                  const r = routes.find((rt) => rt.id === id);
                  if (!r) return null;
                  return (
                    <span
                      key={id}
                      className="rounded-full bg-topo-tint px-2 py-0.5 text-[11px] text-topo-dark"
                    >
                      {r.emoji} {r.name.split(" ")[0]}
                    </span>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
