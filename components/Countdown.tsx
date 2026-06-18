"use client";

import { useEffect, useState } from "react";

function diffParts(ms: number) {
  const total = Math.max(0, ms);
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const mins = Math.floor((total % 3_600_000) / 60_000);
  const secs = Math.floor((total % 60_000) / 1000);
  return { days, hours, mins, secs };
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center rounded-xl bg-white/15 px-1 py-2 backdrop-blur">
      <span className="font-display text-2xl font-semibold tabular-nums leading-none sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-wider opacity-80">
        {label}
      </span>
    </div>
  );
}

export function Countdown({
  targetISO,
  arrivedLabel,
}: {
  targetISO: string;
  arrivedLabel: string;
}) {
  const target = Date.parse(targetISO);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return <div className="h-[72px] rounded-2xl bg-white/10" aria-hidden />;
  }

  const remaining = target - now;
  if (remaining <= 0) {
    return (
      <div className="rounded-2xl bg-white/15 px-4 py-3 text-center text-sm font-semibold backdrop-blur">
        {arrivedLabel}
      </div>
    );
  }

  const { days, hours, mins, secs } = diffParts(remaining);
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest opacity-80">
        Nedtælling til afgang
      </p>
      <div className="flex gap-1.5">
        <Cell value={days} label="dage" />
        <Cell value={hours} label="timer" />
        <Cell value={mins} label="min" />
        <Cell value={secs} label="sek" />
      </div>
    </div>
  );
}
