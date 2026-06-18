import type { Toll } from "@/lib/types";

export function TollBadge({ toll }: { toll: Toll }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-warn/15 px-2 py-0.5 text-[11px] font-semibold text-warn ring-1 ring-warn/30">
      <span aria-hidden>🛣️</span>
      {toll.shortName} · {toll.costDKK} kr
    </span>
  );
}
