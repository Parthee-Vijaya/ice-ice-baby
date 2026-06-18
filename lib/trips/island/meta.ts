import type { TripMeta } from "@/lib/trips/types";
import { img } from "./images";

export const meta: TripMeta = {
  slug: "island",
  name: "Island",
  flag: "🇮🇸",
  country: "Island",
  blurb:
    "9 dages camper-eventyr rundt om Island — vandfald, varme kilder, gletsjere, søpapegøjer og midnatssol. Hele rejseplanen i lommen.",
  startISO: "2026-06-19",
  endISO: "2026-06-27",
  baseName: "Reykjavík",
  baseCoord: [64.1466, -21.9426],
  timeZone: "Atlantic/Reykjavik",
  heroImage: img("kirkjufell"),
  accent: "#2a7da2",
  features: ["dage", "ruter", "kort", "mad", "info", "drone"],
};
