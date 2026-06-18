import { notFound } from "next/navigation";
import { getTrip, getAllTripSlugs } from "@/lib/trips";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";

export function generateStaticParams() {
  return getAllTripSlugs().map((trip) => ({ trip }));
}

export default async function TripLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ trip: string }>;
}) {
  const { trip: slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  return (
    <div className="flex min-h-dvh flex-col">
      <TopNav trip={trip.meta} />
      <main className="flex-1 pt-2 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-12">
        {children}
      </main>
      <BottomNav trip={trip.meta} />
    </div>
  );
}
