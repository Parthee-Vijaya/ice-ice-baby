"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

export type SearchItem = {
  id: string;
  kind: "rute" | "spisested" | "sted" | "dag";
  title: string;
  subtitle: string;
  emoji: string;
  href: string;
  keywords: string;
};

const KIND_LABEL: Record<SearchItem["kind"], string> = {
  rute: "Rute",
  spisested: "Spisested",
  sted: "Sted",
  dag: "Dag",
};

const MAX_RESULTS = 8;
const MIN_QUERY = 2;

// Fjern diakritiske tegn så "mulafossur" matcher "Múlafossur".
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Hurtig fritekst-søgning på tværs af rejsens ruter, spisesteder, steder og dage.
// Indekset bygges server-side og sendes ind som serialiserbare items.
export function TripSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < MIN_QUERY) return [];
    const terms = q.split(/\s+/);
    return items
      .filter((item) => {
        const hay = normalize(`${item.title} ${item.subtitle} ${item.keywords}`);
        return terms.every((t) => hay.includes(t));
      })
      .slice(0, MAX_RESULTS);
  }, [query, items]);

  const showResults = normalize(query.trim()).length >= MIN_QUERY;

  return (
    <div role="search" className="relative">
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-accent">
        <Search size={18} className="shrink-0 text-muted" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søg i ruter, spisesteder, steder og dage…"
          aria-label="Søg i rejsen"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Ryd søgning"
            className="shrink-0 rounded-full p-1 text-muted outline-none hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X size={16} aria-hidden />
          </button>
        )}
      </div>

      {showResults && (
        <div
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
          role="listbox"
          aria-label="Søgeresultater"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">
              Ingen resultater for “{query.trim()}”.
            </p>
          ) : (
            <ul className="max-h-[60vh] divide-y divide-border overflow-y-auto">
              {results.map((item) => (
                <li key={`${item.kind}-${item.id}`}>
                  <Link
                    href={item.href}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-3 px-4 py-2.5 outline-none transition hover:bg-surface-2 focus-visible:bg-surface-2"
                  >
                    <span className="text-xl" aria-hidden>
                      {item.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {item.title}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {item.subtitle}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-muted">
                      {KIND_LABEL[item.kind]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
