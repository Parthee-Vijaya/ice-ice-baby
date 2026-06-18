import type { Trip } from "@/lib/trips/types";
import { meta } from "./meta";
import { routes } from "./routes";
import { restaurants } from "./restaurants";
import { pois } from "./pois";
import { days } from "./days";
import { ferries } from "./ferries";
import { tolls } from "./tolls";
import { imageCredits, allPhotoUrls } from "./images";
import {
  droneRegler,
  pakkeliste,
  nodnumre,
  reservationsTjekliste,
  offlineKort,
} from "./practical";

// Bemærk: ingen fast `accommodation` — det er en autocamper-tur, så I sover et
// nyt sted hver nat. Campingpladserne ligger som POIs (kategori "praktisk") og
// vises på den enkelte dag.
export const island: Trip = {
  meta,
  routes,
  restaurants,
  pois,
  days,
  ferries,
  tolls,
  images: imageCredits,
  photoUrls: allPhotoUrls,
  practical: {
    droneRegler,
    pakkeliste,
    nodnumre,
    reservationsTjekliste,
    offlineKort,
  },
};
