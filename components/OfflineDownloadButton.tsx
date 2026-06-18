"use client";

import { useEffect, useState } from "react";
import { Download, Check, Loader2, RefreshCw, TriangleAlert } from "lucide-react";

// Pre-cacher alle guidens fotos så de virker offline. Vi fetcher hver URL med
// mode:"no-cors" → opaque svar (status 0), som service-workerens CacheFirst-rute
// for upload.wikimedia.org cacher (workboxOptions: statuses [0,200]).

type Status = "idle" | "downloading" | "done" | "error";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("da-DK", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return "";
  }
}

export function OfflineDownloadButton({
  photos,
  storageKey,
}: {
  photos: string[];
  storageKey: string;
}) {
  const TOTAL = photos.length;
  const [status, setStatus] = useState<Status>("idle");
  const [done, setDone] = useState(0);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [swSupported, setSwSupported] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { at?: string };
        if (parsed?.at) {
          setSavedAt(parsed.at);
          setStatus("done");
        }
      }
    } catch {
      /* ingen tidligere download */
    }
    setSwSupported(
      typeof navigator !== "undefined" && "serviceWorker" in navigator,
    );
  }, []);

  async function download() {
    setStatus("downloading");
    setDone(0);
    let ok = 0;
    for (const url of photos) {
      try {
        await fetch(url, { mode: "no-cors", cache: "no-cache" });
        ok++;
      } catch {
        /* ét fejlet foto må ikke stoppe resten */
      }
      setDone((d) => d + 1);
    }
    if (ok === 0) {
      setStatus("error");
      return;
    }
    const at = new Date().toISOString();
    setSavedAt(at);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ at, count: ok }));
    } catch {
      /* private mode / quota */
    }
    setStatus("done");
  }

  const pct = TOTAL > 0 ? Math.round((done / TOTAL) * 100) : 0;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-sm text-foreground/85">
        Hent alle guidens {TOTAL} fotos til telefonen nu, så ruter og
        severdigheder vises selv hvor der ikke er signal. Kortfliser caches
        automatisk efterhånden som I åbner kortet.
      </p>

      {status === "downloading" && (
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-topo transition-[width] duration-200"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="shrink-0 text-sm font-medium tabular-nums text-muted">
            {done}/{TOTAL}
          </span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {status === "done" ? (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-topo/12 px-3 py-1.5 text-sm font-semibold text-topo">
              <Check size={16} /> Fotos hentet
            </span>
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-foreground"
            >
              <RefreshCw size={13} /> Hent igen
            </button>
            {savedAt && (
              <span className="text-xs text-muted">
                Senest: {formatDate(savedAt)}
              </span>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={download}
            disabled={status === "downloading"}
            className="inline-flex items-center gap-2 rounded-full bg-topo px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-topo-dark disabled:opacity-60"
          >
            {status === "downloading" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Henter…
              </>
            ) : (
              <>
                <Download size={16} /> Hent {TOTAL} fotos
              </>
            )}
          </button>
        )}
      </div>

      {status === "error" && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-danger">
          <TriangleAlert size={14} /> Kunne ikke hente fotos — tjek forbindelsen
          og prøv igen.
        </p>
      )}

      {!swSupported && (
        <p className="mt-3 text-xs text-muted">
          Tip: Tilføj appen til hjemskærmen for at gemme fotos permanent offline.
        </p>
      )}
    </div>
  );
}
