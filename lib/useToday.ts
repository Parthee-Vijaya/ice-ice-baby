"use client";

import { useEffect, useState } from "react";

function localISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Klientens lokale dato (YYYY-MM-DD). Init til en server-given dato (build-tid),
// så SSR og første klient-render matcher (ingen hydration-mismatch); opdaterer
// til den reelle dato efter mount, ved fane-fokus og ved midnat. Bruges til
// LIVE rejse-status og "i dag"-markering uden redeploy.
export function useToday(initial: string): string {
  const [today, setToday] = useState(initial);

  useEffect(() => {
    const compute = () => setToday(localISO(new Date()));
    compute();
    const onFocus = () => compute();
    window.addEventListener("focus", onFocus);

    const now = new Date();
    const msToMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();
    const timer = setTimeout(compute, msToMidnight + 1000);

    return () => {
      window.removeEventListener("focus", onFocus);
      clearTimeout(timer);
    };
  }, []);

  return today;
}
