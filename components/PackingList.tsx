"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";

type PackCategory = { kategori: string; items: string[] };

// Stabil nøgle pr. ting (kategori + tekst), så afkrydsninger overlever selv hvis
// rækkefølgen i pakkelisten ændres.
function itemKey(kategori: string, item: string): string {
  return `${kategori}::${item}`;
}

export function PackingList({
  list,
  storageKey,
}: {
  list: PackCategory[];
  storageKey: string;
}) {
  const allKeys = list.flatMap((c) => c.items.map((i) => itemKey(c.kategori, i)));
  const total = allKeys.length;

  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* korrupt/utilgængelig storage — start tomt */
    }
  }, []);

  function persist(next: Record<string, boolean>) {
    setChecked(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* private mode / quota */
    }
  }

  const done = allKeys.filter((k) => checked[k]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-topo transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="shrink-0 text-sm font-medium tabular-nums text-muted">
          {done}/{total} pakket
        </span>
        {done > 0 && (
          <button
            type="button"
            onClick={() => persist({})}
            className="inline-flex shrink-0 items-center gap-1 text-xs text-muted transition hover:text-foreground"
          >
            <RotateCcw size={12} /> Nulstil
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((kat) => (
          <div
            key={kat.kategori}
            className="rounded-2xl border border-border bg-surface p-4"
          >
            <h3 className="mb-2 font-display text-lg font-semibold">
              {kat.kategori}
            </h3>
            <ul className="space-y-0.5 text-sm">
              {kat.items.map((item) => {
                const key = itemKey(kat.kategori, item);
                const isChecked = Boolean(checked[key]);
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => persist({ ...checked, [key]: !isChecked })}
                      aria-pressed={isChecked}
                      className="flex w-full items-center gap-2.5 rounded-lg px-1 py-1 text-left transition hover:bg-surface-2"
                    >
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition ${
                          isChecked
                            ? "border-topo bg-topo text-white"
                            : "border-border bg-surface"
                        }`}
                        aria-hidden
                      >
                        {isChecked && <Check size={13} />}
                      </span>
                      <span className={isChecked ? "text-muted line-through" : ""}>
                        {item}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
