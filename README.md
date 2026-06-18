# Ice Ice Baby 🧊🇮🇸

En lille rejse-app (PWA) til **Helle & Anita**, bygget på deres samlede
rejseplan for et 9-dages autocamper-eventyr rundt om Island (19.–27. juni 2026).

Appen giver et struktureret overblik: dag-for-dag plan, oplevelser og vandringer
med kort/sværhedsgrad/tid/pris, interaktivt kort med alle stop, spisesteder,
sol op/ned + vejr på rejsens koordinater, drone-zoner, favoritter, afkrydselig
pakkeliste og offline foto-download. Billederne kommer fra rejseplanen (PDF),
suppleret med enkelte frit-licenserede fotos fra Wikimedia Commons.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design-tokens i `app/globals.css`)
- **react-leaflet** + OpenStreetMap-tiles (kort, ingen API-key)
- **suncalc** (sol op/ned) + proxy mod **api.met.no** (vejr)
- **@ducanh2912/next-pwa** (offline / service worker)
- **lucide-react** (ikoner)

## Kør lokalt

```bash
npm install
npm run dev      # udviklingsserver (--webpack pga. next-pwa)
npm run build    # produktionsbuild
npm run start    # server produktionsbuild (brug denne til mobil-test)
npm run lint
```

## Hvor ligger indholdet

Alt curated indhold ligger i `lib/trips/island/` som statisk TypeScript:
`meta.ts`, `days.ts`, `routes.ts`, `pois.ts`, `restaurants.ts`, `ferries.ts`,
`tolls.ts`, `practical.ts`, `images.ts` — samlet i `index.ts`. Rejse-registeret
er `lib/trips/index.ts`. Billeder ligger i `public/images/`.

Se [`HANDOFF.md`](./HANDOFF.md) for arkitektur og noter.
