export function DroneZonesButton({ label = "Drone-zoner" }: { label?: string }) {
  return (
    <a
      href="https://island.is/en/drone-map"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-topo px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-topo-dark"
    >
      <span aria-hidden>🛸</span>
      <span>{label}</span>
    </a>
  );
}
