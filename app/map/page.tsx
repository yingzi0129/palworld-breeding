import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getPals, getSpawnMap } from "@/lib/data-server";

export const metadata: Metadata = {
  title: "Interactive Palworld Map | PalworldBreeding.cc",
  description:
    "Interactive Palworld map with Pal spawn locations, fast travel points, bosses, and dungeons. Filter by Pal and region.",
  alternates: { canonical: "/map" },
};

const MapClient = dynamic(() => import("@/components/map/map-client").then((m) => m.MapClient), {
  ssr: false,
  loading: () => (
    <div className="flex h-[70vh] items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-400">
      Loading map...
    </div>
  ),
});

export default function MapPage() {
  const pals = getPals();
  const spawnMap = getSpawnMap();
  return (
    <div className="min-h-screen bg-slate-950 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white md:text-3xl">Interactive Palworld Map</h1>
          <p className="mt-1 text-slate-400">
            Filter spawn points by Pal. Fast travel, bosses, and resource nodes are shown for reference.
          </p>
        </div>
        <MapClient pals={pals} spawnMap={spawnMap} />
        <p className="mt-2 text-xs text-slate-600">
          Map image by{" "}
          <a href="https://github.com/Kregap/palworld-map" className="underline hover:text-slate-400">
            Kregap/palworld-map
          </a>{" "}
          (CC-BY / MIT). Spawn data based on community research and may change with game updates.
        </p>
      </div>
    </div>
  );
}
