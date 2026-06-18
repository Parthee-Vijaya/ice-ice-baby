import type { Restaurant } from "@/lib/types";

export const restaurants: Restaurant[] = [
  {
    id: "vikinga-pylsur",
    name: "Víkinga Pylsur",
    area: "Reykjavík",
    kitchen: "Islandsk pølse · ved Hallgrímskirkja",
    priceLevel: 1,
    coord: [64.1452, -21.9247],
    description:
      "Pølsevogn nær Hallgrímskirkja (Frakkastígur 25) — et nyere take på den islandske 'pylsur' med saftigt, langtidstilberedt kød i bollen (prøv pulled lam!). Åbent 11–21. Perfekt til aftensmad efter dagens oplevelser; bestil 'eina með öllu' (med det hele).",
    bookingRequired: false,
    emoji: "🌭",
    tags: ["streetfood", "billigt", "pølser"],
  },
  {
    id: "highland-base",
    name: "Highland Base Restaurant",
    area: "Kerlingarfjöll",
    kitchen: "Islandsk · frokost i højlandet",
    priceLevel: 3,
    coord: [64.6333, -19.3167],
    description:
      "Frokoststop midt i højlandet på Kerlingarfjöll-turen. En lækker, varm frokost i et af Islands mest dramatiske bjerglandskaber.",
    bookingRequired: false,
    website: "https://www.kerlingarfjoll.is",
    emoji: "🍽️",
    tags: ["højlandet", "frokost", "varmt"],
  },
  {
    id: "skyrland",
    name: "Skyrland",
    area: "Suðurland",
    kitchen: "Skyr-oplevelse · dessert",
    priceLevel: 2,
    coord: [63.9333, -20.9971],
    description:
      "Interaktiv oplevelse i Selfoss om Islands berømte skyr — med smagsprøver. Et hyggeligt og lærerigt stop på byvandringen.",
    bookingRequired: false,
    website: "https://skyrland.is",
    emoji: "🥛",
    tags: ["skyr", "oplevelse", "selfoss"],
  },
  {
    id: "fridheimar",
    name: "Friðheimar",
    area: "Suðurland",
    kitchen: "Tomat-bistro · i drivhuset",
    priceLevel: 3,
    coord: [64.149, -20.2386],
    description:
      "Spis aftensmad midt i et opvarmet tomatdrivhus. Berømt for sin tomatsuppe med friskbagt brød og bloody mary. Åbent 12.00-22.00 — book bord.",
    bookingRequired: true,
    bookingUrl: "https://fridheimar.is",
    website: "https://fridheimar.is",
    emoji: "🍅",
    tags: ["drivhus", "tomatsuppe", "unik"],
  },
  {
    id: "farmers-bistro",
    name: "Flúðasveppir Farmers Bistro",
    area: "Suðurland",
    kitchen: "Champignon-bistro · gårdmad",
    priceLevel: 2,
    coord: [64.1356, -20.3186],
    description:
      "Nammenam! Alt handler om champignon — dyrket på selve gården i Flúðir. Bord booket til kl. 16.00. Bemærk: bistroen lukker kl. 17, køkkenet kl. 16.40.",
    bookingRequired: true,
    bookingUrl: "https://fludasveppir.is",
    emoji: "🍄",
    tags: ["gårdmad", "champignon", "frokost"],
  },
  {
    id: "fiskabudin-flatey",
    name: "Fiskabúðin (Flatey)",
    area: "Breiðafjörður",
    kitchen: "Fisk · lille butik",
    priceLevel: 1,
    coord: [65.3761, -22.9261],
    description:
      "Lille butik på øen Flatey, der sælger fisk, brød og små nips. Perfekt hvis sulten melder sig på færgeturen gennem Breiðafjörður.",
    bookingRequired: false,
    emoji: "🐟",
    tags: ["fisk", "flatey", "snack"],
  },
  {
    id: "lindin-laugarvatn",
    name: "Lindin (Laugarvatn)",
    area: "Suðurland",
    kitchen: "Islandsk · sø-til-bord",
    priceLevel: 3,
    coord: [64.2167, -20.7333],
    description:
      "Hyggelig restaurant ved søen i Laugarvatn — lokale råvarer og vildt. Et godt valg efter rugbrøds-oplevelsen ved Fontana.",
    bookingRequired: true,
    website: "https://laugarvatn.is",
    emoji: "🍲",
    tags: ["lokalt", "sø", "hyggeligt"],
  },
];

export const restaurantById = (id: string) =>
  restaurants.find((r) => r.id === id);
