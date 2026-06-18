import { notFound } from "next/navigation";
import { getTrip } from "@/lib/trips";
import { DroneZonesButton } from "@/components/DroneZonesButton";
import { FerryBookingCard } from "@/components/FerryBookingCard";
import { AccommodationCard } from "@/components/AccommodationCard";
import { PackingList } from "@/components/PackingList";
import { OfflineDownloadButton } from "@/components/OfflineDownloadButton";
import { Phone, Map as MapIcon, ExternalLink, Sparkles } from "lucide-react";
import { APP_VERSION } from "@/lib/version";

export default async function InfoPage({
  params,
}: {
  params: Promise<{ trip: string }>;
}) {
  const { trip: slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const m = trip.meta;
  const p = trip.practical;
  const drone = m.features.includes("drone") ? p?.droneRegler : undefined;
  const pakkeliste = p?.pakkeliste ?? [];
  const nodnumre = p?.nodnumre ?? [];
  const reservationer = p?.reservationsTjekliste ?? [];
  const offlineKort = p?.offlineKort;

  const hasAny =
    !!trip.accommodation ||
    trip.tolls.length > 0 ||
    trip.ferries.length > 0 ||
    !!drone ||
    reservationer.length > 0 ||
    pakkeliste.length > 0 ||
    trip.photoUrls.length > 0 ||
    !!offlineKort ||
    nodnumre.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 sm:px-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Praktisk
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold">Info</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Alt det grise for {m.name}: bookings, pakkeliste, offline-brug og
          nødnumre.
        </p>
      </header>

      {!hasAny && (
        <div className="rounded-3xl border border-dashed border-border bg-surface p-8 text-center">
          <Sparkles className="mx-auto text-topo" size={28} />
          <h2 className="mt-3 font-display text-xl font-semibold">
            Praktisk info er på vej
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Vi tilføjer bookings, pakkeliste og praktiske detaljer til dette
            eventyr løbende.
          </p>
        </div>
      )}

      {trip.accommodation && (
        <Section title="🏠 Jeres base">
          <AccommodationCard accommodation={trip.accommodation} />
        </Section>
      )}

      {trip.tolls.length > 0 && (
        <Section
          title="🛣️ Tunnel-tolls (subsea)"
          intro="Tolls aflæses automatisk via nummerplade — du betaler på tunnil.fo inden for 3 dage efter passage. Bøde ved manglende betaling."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {trip.tolls.map((t) => (
              <div key={t.id} className="rounded-2xl border border-border bg-surface p-4">
                <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                <p className="mt-1 text-2xl font-display font-semibold text-accent">
                  {t.costDKK} kr
                </p>
                <p className="text-[11px] uppercase tracking-wider text-muted">Pr. enkeltretning</p>
                <p className="mt-2 text-sm">{t.connects}</p>
              </div>
            ))}
          </div>
          <a
            href="https://www.tunnil.fo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-topo"
          >
            tunnil.fo — betal tolls <ExternalLink size={12} />
          </a>
        </Section>
      )}

      {trip.ferries.length > 0 && (
        <Section
          title="⛴️ Færger"
          intro="Book i god tid — populære afgange sælger ud, og nogle aflyses ved hård vind."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {trip.ferries.map((f) => (
              <FerryBookingCard key={f.id} ferry={f} />
            ))}
          </div>
        </Section>
      )}

      {drone && (
        <Section title="🛸 Drone-regler & zoner">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm text-foreground/85">
              Island følger EU drone-regler (A1/A3). Samgöngustofa (ICETRA) er
              myndighed. Tjek island.is/drone-map før hver flight for at se
              restriktioner.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {drone.regler.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-topo">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <DroneZonesButton label="island.is/drone-map" />
              <a
                href={drone.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs"
              >
                Samgöngustofa-regler <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </Section>
      )}

      {reservationer.length > 0 && (
        <Section
          title="📋 Reservations-tjekliste"
          intro="Disse SKAL bookes inden afgang."
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            {reservationer.map((r) => (
              <a
                key={r.sted}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b border-border p-3 last:border-0 hover:bg-surface-2"
              >
                <div>
                  <div className="font-medium">{r.sted}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted">
                    {r.deadline}
                  </div>
                </div>
                <ExternalLink size={14} className="text-muted" />
              </a>
            ))}
          </div>
        </Section>
      )}

      {pakkeliste.length > 0 && (
        <Section
          title="🧳 Pakkeliste"
          intro="Tryk for at krydse af — afkrydsninger gemmes på din telefon."
        >
          <PackingList list={pakkeliste} storageKey={`eventyr-${m.slug}-packing`} />
        </Section>
      )}

      {trip.photoUrls.length > 0 && (
        <Section
          title="📲 Hent til offline"
          intro="Dårligt signal undervejs? Hent guidens fotos på forhånd mens du har wifi."
        >
          <OfflineDownloadButton
            photos={trip.photoUrls}
            storageKey={`eventyr-${m.slug}-offline-photos`}
          />
        </Section>
      )}

      {offlineKort && (
        <Section title="📵 Offline-kort">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm">{offlineKort.anbefaling}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {offlineKort.tipsy.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <MapIcon size={14} className="mt-0.5 text-topo" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {nodnumre.length > 0 && (
        <Section title="🚨 Nødnumre">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            {nodnumre.map((n) => (
              <a
                key={n.navn}
                href={`tel:${n.nummer.replace(/\s/g, "")}`}
                className="flex items-center justify-between border-b border-border p-3 last:border-0 hover:bg-surface-2"
              >
                <div>{n.navn}</div>
                <div className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-topo">
                  <Phone size={12} /> {n.nummer}
                </div>
              </a>
            ))}
          </div>
        </Section>
      )}

      {trip.images.length > 0 && (
        <Section
          title="📷 Fotokreditering"
          intro="Billederne er frit-licenserede fotos fra Wikimedia Commons."
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-surface text-sm">
            {trip.images.map((c) => (
              <a
                key={c.key}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 border-b border-border p-3 last:border-0 hover:bg-surface-2"
              >
                <span className="font-medium">{c.subject}</span>
                <span className="shrink-0 text-right text-[11px] text-muted">
                  {c.credit} · {c.license}
                </span>
              </a>
            ))}
          </div>
        </Section>
      )}
      <p className="mt-10 text-center text-xs text-muted">
        Ice Ice Baby · v{APP_VERSION}
      </p>
    </div>
  );
}

function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-2 font-display text-2xl font-semibold">{title}</h2>
      {intro && <p className="mb-3 text-sm text-muted">{intro}</p>}
      {children}
    </section>
  );
}
