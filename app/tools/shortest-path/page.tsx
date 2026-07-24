import type { Metadata } from "next";
import { getPals } from "@/lib/data-server";
import { ShortestPathClient } from "@/components/calculator/shortest-path-client";

export const metadata: Metadata = {
  title: "Shortest Breeding Path Calculator | PalworldBreeding.cc",
  description:
    "Find the shortest Palworld breeding route from a Pal you already own to any target Pal. Minimize generations and optimize your breeding plan.",
  alternates: { canonical: "/tools/shortest-path" },
};

export default function ShortestPathPage() {
  const pals = getPals();
  return (
    <div className="min-h-screen bg-[#020617] py-10">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Shortest Breeding Path</h1>
          <p className="mt-2 text-slate-400">
            Pick a Pal you own and a target Pal. We will find the fastest route using game breeding rules.
          </p>
        </div>
        <div className="glass-card">
          <ShortestPathClient pals={pals} />
        </div>
      </div>
    </div>
  );
}
