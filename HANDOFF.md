# Ice Ice Baby — Handoff

## Hvad er det

Rejse-app (PWA) til **Helle & Anita** for deres 9-dages autocamper-tur rundt om
Island (19.–27. juni 2026). Forsiden er en lille "bucket list" med rejsen; inde i
rejsen er der dag-for-dag plan, oplevelser/vandringer (ruter), interaktivt kort,
spisesteder, sol op/ned + vejr, drone-zoner, favoritter, afkrydselig pakkeliste og
offline foto-download. Favoritter/pakkeliste/offline gemmes lokalt pr. rejse.

Indholdet er bygget på den fælles rejseplan (PDF). De fleste fotos er hentet
direkte fra PDF'en og ligger lokalt i `public/images/`. Et par højlandsstop, hvor
PDF'en manglede et brugbart foto, er udfyldt med frit-licenserede Wikimedia-fotos
(krediteret i `lib/trips/island/images.ts` og vist på `/info`).

Strukturen er kopieret 1:1 fra søster-projektet `vores-eventyr` (samme komponenter
og sider), men med ét rigt rejse-datasæt: **Island**.

## Stack

| Lag | Valg |
|-----|------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind v4 (design-tokens i `app/globals.css`) |
| Kort | react-leaflet v5 + Leaflet + OpenStreetMap-tiles (ingen API-key) |
| Sol | suncalc (på rejsens `baseCoord` + tidszone) |
| Vejr | Proxy mod api.met.no i `app/api/weather/route.ts` |
| PWA | @ducanh2912/next-pwa (SW cacher OSM-tiles + lokale fotos) |
| Ikoner | lucide-react |

## Kør / byg

```bash
npm install
npm run dev      # dev-server (--webpack pga. next-pwa)
npm run build    # produktionsbuild (--webpack)
npm run start    # serve produktionsbuild (brug denne til browse-test)
npm run lint
```

## Hvor man redigerer indhold

Alt curated indhold ligger i `lib/trips/island/` (statisk TypeScript — ingen DB):

```
lib/trips/
  index.ts            register: trips[], getTrip(slug), sortedTrips(), tripStatus
  types.ts            TripMeta, TripFeature, TripStatus, Trip
  island/
    meta.ts           TripMeta (slug, datoer, baseCoord, heroImage, features…)
    index.ts          samler alt til ét Trip-objekt
    days.ts           9 × DayPlan (refererer route-/poi-/restaurant-/ferry-ids)
    routes.ts         oplevelser & vandringer (driver /ruter)
    pois.ts           severdigheder + campingpladser (kategori "praktisk")
    restaurants.ts    spisesteder
    ferries.ts        færgen Baldur
    tolls.ts          tom (ruten har ingen betalingsveje)
    practical.ts      drone, pakkeliste, nødnumre, reservationer, offline-kort
    images.ts         billed-register (lokale /images/*.jpg + credits)
```

`meta.features` (`dage|ruter|kort|mad|info|drone`) styrer hvilke faner rejsen viser.
Et nyt foto: læg filen i `public/images/`, tilføj en nøgle i `images.ts`, referér via
`img("key")`. Der er **ingen fast `accommodation`** — det er en camper-tur, så
campingpladserne ligger som POIs og vises pr. dag.

## Sider (App Router)

`/` bucket-list. Rejse-indhold under `/rejse/island/`: forside (hero + nedtælling +
sol/vejr + dag-grid + kort) · `dag/[n]` · `ruter` (+ `ruter/[slug]`) · `kort` ·
`spisesteder` · `info`. `/api/weather?lat=&lon=`.

## Noter / gotchas

- **Build bruger `--webpack`** (next-pwa er ikke kompatibel med Next 16 Turbopack) —
  fjern ikke flaget.
- **Leaflet** indlæses client-only via `components/Map.tsx` (dynamic import, ssr:false).
- **met.no** kræver `User-Agent`-header (sat i weather-route).
- **Billeder** vises med almindelig `<img>` — lokale `/images/*`-stier virker uden
  ekstra config og precaches af PWA'en.
- **Datoer:** PDF'ens dag 3 og 4 havde tastefejl (begge skrevet "20."/"21."); her
  bruges de korrekte sekventielle datoer 19.–27. juni.

## Mulige næste skridt

- Custom app-ikon (Island-tema) i `public/icon-192/512.png`
- Finjustér priser/koordinater når detaljer er endeligt bekræftet
- Tilføj evt. flere fotos fra turen efterhånden
