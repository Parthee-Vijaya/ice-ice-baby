import type { Difficulty } from "@/lib/types";

const labels: Record<Difficulty, string> = {
  let: "Let",
  middel: "Middel",
  svaer: "Svær",
};

const styles: Record<Difficulty, string> = {
  let: "bg-[var(--difficulty-let)]/15 text-[var(--difficulty-let)] ring-[var(--difficulty-let)]/40",
  middel:
    "bg-[var(--difficulty-middel)]/15 text-[var(--difficulty-middel)] ring-[var(--difficulty-middel)]/40",
  svaer:
    "bg-[var(--difficulty-svaer)]/15 text-[var(--difficulty-svaer)] ring-[var(--difficulty-svaer)]/40",
};

export function DifficultyBadge({ value }: { value: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ${styles[value]}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {labels[value]}
    </span>
  );
}
