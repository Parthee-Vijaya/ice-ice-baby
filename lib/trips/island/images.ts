// Billeder til Island-rejsen.
// De fleste fotos kommer direkte fra Helle & Anitas samlede rejseplan (PDF) og
// ligger lokalt i /public/images. Et par stop i højlandet manglede et brugbart
// foto i PDF'en — der er udfyldt med frit-licenserede fotos fra Wikimedia Commons.

import type { ImageCredit } from "@/lib/types";

export type { ImageCredit };

const PDF = "Fra rejseplanen (Helle & Anita)";
const PRIV = "Privat brug";

export const images = {
  // ── Fotos fra rejseplanen (PDF) ────────────────────────────────────────────
  camper: { key: "camper", subject: "Autocamperen (Go Campers)", url: "/images/camper.jpg", credit: PDF, license: PRIV },
  cooler: { key: "cooler", subject: "Køletasken", url: "/images/cooler.jpg", credit: PDF, license: PRIV },
  skyLagoon: { key: "skyLagoon", subject: "Sky Lagoon", url: "/images/sky-lagoon.jpg", credit: PDF, license: PRIV },
  whaleRib: { key: "whaleRib", subject: "Hvalsafari med RIB-speedbåd", url: "/images/whale-rib.jpg", credit: PDF, license: PRIV },
  skyr: { key: "skyr", subject: "Ísey skyr", url: "/images/skyr.jpg", credit: PDF, license: PRIV },
  hotdog: { key: "hotdog", subject: "Islandsk pølse (pylsur)", url: "/images/hotdog.jpg", credit: PDF, license: PRIV },
  reykjadalur: { key: "reykjadalur", subject: "Reykjadalur varme flod", url: "/images/reykjadalur.jpg", credit: PDF, license: PRIV },
  reykjavik: { key: "reykjavik", subject: "Reykjavik", url: "/images/reykjavik.jpg", credit: PDF, license: PRIV },
  solfar: { key: "solfar", subject: "Sólfar (Sun Voyager)", url: "/images/solfar.jpg", credit: PDF, license: PRIV },
  landmannalaugar: { key: "landmannalaugar", subject: "Landmannalaugar", url: "/images/landmannalaugar.jpg", credit: PDF, license: PRIV },
  skogafoss: { key: "skogafoss", subject: "Skógafoss", url: "/images/skogafoss.jpg", credit: PDF, license: PRIV },
  dyrholaey: { key: "dyrholaey", subject: "Dyrhólaey", url: "/images/dyrholaey.jpg", credit: PDF, license: PRIV },
  puffins: { key: "puffins", subject: "Søpapegøjer (lunder)", url: "/images/puffins.jpg", credit: PDF, license: PRIV },
  blackBeach: { key: "blackBeach", subject: "Reynisfjara — den sorte strand", url: "/images/black-beach.jpg", credit: PDF, license: PRIV },
  raudarfoss: { key: "raudarfoss", subject: "Rauðárfoss", url: "/images/raudarfoss.jpg", credit: PDF, license: PRIV },
  stjornarfoss: { key: "stjornarfoss", subject: "Stjórnarfoss", url: "/images/stjornarfoss.jpg", credit: PDF, license: PRIV },
  skaftafell: { key: "skaftafell", subject: "Skaftafell", url: "/images/skaftafell.jpg", credit: PDF, license: PRIV },
  glacierLagoon: { key: "glacierLagoon", subject: "Gletsjerlagune", url: "/images/glacier-lagoon.jpg", credit: PDF, license: PRIV },
  diamondBeach: { key: "diamondBeach", subject: "Diamond Beach", url: "/images/diamond-beach.jpg", credit: PDF, license: PRIV },
  jokulsarlon: { key: "jokulsarlon", subject: "Jökulsárlón", url: "/images/jokulsarlon.jpg", credit: PDF, license: PRIV },
  hofskirkja: { key: "hofskirkja", subject: "Hofskirkja", url: "/images/hofskirkja.jpg", credit: PDF, license: PRIV },
  secretLagoon: { key: "secretLagoon", subject: "Secret Lagoon", url: "/images/secret-lagoon.jpg", credit: PDF, license: PRIV },
  fridheimar: { key: "fridheimar", subject: "Friðheimar tomatfarm", url: "/images/fridheimar.jpg", credit: PDF, license: PRIV },
  reykholt: { key: "reykholt", subject: "Reykholt", url: "/images/reykholt.jpg", credit: PDF, license: PRIV },
  laugarvatn: { key: "laugarvatn", subject: "Laugarvatn (rugbrød i jorden)", url: "/images/laugarvatn.jpg", credit: PDF, license: PRIV },
  silfra: { key: "silfra", subject: "Silfra — snorkling mellem kontinenter", url: "/images/silfra.jpg", credit: PDF, license: PRIV },
  hrunalaug: { key: "hrunalaug", subject: "Hrunalaug varm kilde", url: "/images/hrunalaug.jpg", credit: PDF, license: PRIV },
  hraunfossar: { key: "hraunfossar", subject: "Hraunfossar", url: "/images/hraunfossar.jpg", credit: PDF, license: PRIV },
  barnafoss: { key: "barnafoss", subject: "Barnafoss", url: "/images/barnafoss.jpg", credit: PDF, license: PRIV },
  glanni: { key: "glanni", subject: "Glanni", url: "/images/glanni.jpg", credit: PDF, license: PRIV },
  budakirkja: { key: "budakirkja", subject: "Búðakirkja (den sorte kirke)", url: "/images/budakirkja.jpg", credit: PDF, license: PRIV },
  kirkjufell: { key: "kirkjufell", subject: "Kirkjufell & Kirkjufellsfoss", url: "/images/kirkjufell.jpg", credit: PDF, license: PRIV },
  grundarfjordur: { key: "grundarfjordur", subject: "Grundarfjörður", url: "/images/grundarfjordur.jpg", credit: PDF, license: PRIV },
  kolgrafarfjordur: { key: "kolgrafarfjordur", subject: "Kolgrafarfjörður", url: "/images/kolgrafarfjordur.jpg", credit: PDF, license: PRIV },
  baldurFerry: { key: "baldurFerry", subject: "Færgen Baldur", url: "/images/baldur-ferry.jpg", credit: PDF, license: PRIV },
  flatey: { key: "flatey", subject: "Flatey", url: "/images/flatey.jpg", credit: PDF, license: PRIV },
  hellulaug: { key: "hellulaug", subject: "Hellulaug varm kilde", url: "/images/hellulaug.jpg", credit: PDF, license: PRIV },
  reykjafjardarlaug: { key: "reykjafjardarlaug", subject: "Reykjafjarðarlaug", url: "/images/reykjafjardarlaug.jpg", credit: PDF, license: PRIV },
  aHouse: { key: "aHouse", subject: "The A-house (forladt lade)", url: "/images/a-house.jpg", credit: PDF, license: PRIV },
  fossfjordur: { key: "fossfjordur", subject: "Fossfjörður vandfald", url: "/images/fossfjordur.jpg", credit: PDF, license: PRIV },
  dynjandi: { key: "dynjandi", subject: "Dynjandi", url: "/images/dynjandi.jpg", credit: PDF, license: PRIV },
  talknafjordur: { key: "talknafjordur", subject: "Tálknafjörður", url: "/images/talknafjordur.jpg", credit: PDF, license: PRIV },
  raudasandur: { key: "raudasandur", subject: "Rauðasandur (den gyldne strand)", url: "/images/raudasandur.jpg", credit: PDF, license: PRIV },
  hvammsvik: { key: "hvammsvik", subject: "Hvammsvík Hot Springs", url: "/images/hvammsvik.jpg", credit: PDF, license: PRIV },
  reynivallakirkja: { key: "reynivallakirkja", subject: "Reynivallakirkja", url: "/images/reynivallakirkja.jpg", credit: PDF, license: PRIV },
  helgufoss: { key: "helgufoss", subject: "Helgufoss", url: "/images/helgufoss.jpg", credit: PDF, license: PRIV },

  // ── Udfyldt fra Wikimedia Commons (frit licenseret) ─────────────────────────
  gullfoss: { key: "gullfoss", subject: "Gullfoss", url: "/images/gullfoss.jpg", credit: "Nickspix / Wikimedia Commons", license: "CC BY-SA 4.0" },
  geysir: { key: "geysir", subject: "Strokkur / Geysir", url: "/images/geysir.jpg", credit: "Christoph Strässler / Wikimedia Commons", license: "CC BY-SA 2.0" },
  kerlingarfjoll: { key: "kerlingarfjoll", subject: "Kerlingarfjöll", url: "/images/kerlingarfjoll.jpg", credit: "Krator / Wikimedia Commons", license: "CC BY-SA 3.0" },
  thingvellir: { key: "thingvellir", subject: "Þingvellir Nationalpark", url: "/images/thingvellir.jpg", credit: "Ivan Sabljak / Wikimedia Commons", license: "CC BY-SA 3.0" },
  fjallsarlon: { key: "fjallsarlon", subject: "Fjallsárlón", url: "/images/fjallsarlon.jpg", credit: "Unukorno / Wikimedia Commons", license: "CC BY 4.0" },
  hekla: { key: "hekla", subject: "Hekla-vulkanen", url: "/images/hekla.jpg", credit: "Hansueli Krapf / Wikimedia Commons", license: "CC BY-SA 3.0" },
  vik: { key: "vik", subject: "Vík í Mýrdal", url: "/images/vik.jpg", credit: "Andrea Schaffer / Wikimedia Commons", license: "CC BY 2.0" },
} as const;

export type ImageKey = keyof typeof images;

export const img = (key: ImageKey) => images[key].url;

export const imageCredits: ImageCredit[] = Object.values(images);

// Alle foto-URLs — bruges til offline pre-cache (OfflineDownloadButton).
export const allPhotoUrls: string[] = imageCredits.map((c) => c.url);
