import type { Ferry } from "@/lib/types";

export const ferries: Ferry[] = [
  {
    id: "baldur",
    name: "Baldur (Breiðafjörður)",
    from: "Stykkishólmur (Snæfellsnes)",
    to: "Brjánslækur (Vestfjordene)",
    durationMin: 150,
    costDKK: 1100,
    costNote: "Bil + 2 voksne, ca. Pris afhænger af bilstørrelse.",
    schedule:
      "Afgang kl. 11.00 — vær fremme 10.45. Pit-stop på øen Flatey undervejs.",
    bookingUrl: "https://www.seatours.is",
    bookingNote:
      "Book i god tid i højsæsonen — bilpladser sælger ud. På turen kan I spotte søpapegøjer (særligt ved Flatey) og hvaler.",
    cancellationRisk: "middel",
    cancelled: true,
    cancelledNote:
      "AFLYST for denne dag — vi udforsker Snæfellsnes i stedet. Se dagens program for alternativet.",
  },
];

export const ferryById = (id: string) => ferries.find((f) => f.id === id);
