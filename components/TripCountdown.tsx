"use client";

import { useEffect, useState } from "react";

// Lille, live nedtælling til bucket-list-kortene. Opdaterer hvert minut.
export function TripCountdown({
  startISO,
  endISO,
}: {
  startISO: string;
  endISO: string;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;

  const start = Date.parse(`${startISO}T00:00:00`);
  const end = Date.parse(`${endISO}T23:59:59`);
  if (now > end) return null;

  const pill =
    "inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur";

  if (now >= start) return <span className={pill}>🎉 I gang nu</span>;

  const days = Math.ceil((start - now) / 86_400_000);
  return (
    <span className={pill}>⏳ Om {days} {days === 1 ? "dag" : "dage"}</span>
  );
}
