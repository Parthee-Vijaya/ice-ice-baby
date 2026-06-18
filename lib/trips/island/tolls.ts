import type { Toll } from "@/lib/types";

// Rejseplanens rute bruger ingen betalingsveje — Hvalfjarðargöng-tunnelen er
// gratis i dag, og ruten rammer ikke Vaðlaheiðargöng i nord. Tom liste.
export const tolls: Toll[] = [];

export const tollById = (id: string) => tolls.find((t) => t.id === id);
