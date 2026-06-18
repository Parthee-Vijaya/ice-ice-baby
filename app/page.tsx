import { trips } from "@/lib/trips";
import { tripStatus, todayISO } from "@/lib/trips/types";
import { TripList } from "@/components/TripList";
import { NextAdventure } from "@/components/NextAdventure";
import { APP_VERSION } from "@/lib/version";

export default function Home() {
  const today = todayISO();
  const metas = trips.map((t) => t.meta);
  const kommende = metas.filter((m) => tripStatus(m, today) !== "afsluttet").length;

  return (
    <div className="pt-safe mx-auto max-w-5xl px-4 pb-12 sm:px-6">
      <header className="py-8 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Bucket list
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
          Ice Ice Baby 🧊
        </h1>
        <p className="mt-3 font-display text-lg font-medium text-foreground/80 sm:text-xl">
          Helle &amp; Anitas Islands-eventyr
        </p>
        <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
          {kommende > 0 ? `${kommende} eventyr på vej` : "Flere eventyr på vej"} —
          tryk på et for ruter, kort, sol op/ned, spisesteder og nedtælling.
        </p>
      </header>

      <NextAdventure metas={metas} initialToday={today} />

      <TripList metas={metas} initialToday={today} />

      <footer className="mt-12 text-center text-xs text-muted">
        Ice Ice Baby · v{APP_VERSION}
      </footer>
    </div>
  );
}
