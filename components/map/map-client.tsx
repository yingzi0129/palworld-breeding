"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import type { Pal } from "@/lib/types";
import { PalPicker } from "@/components/pal/pal-picker";
import { getPalImageUrl } from "@/lib/data-client";
import Image from "next/image";

interface Props {
  pals: Pal[];
}

const SPAWN_POINTS: Record<string, { x: number; y: number; region: string; note: string }[]> = {
  anubis: [
    { x: 132, y: 93, region: "Twilight Dunes", note: "Desert temple boss area" },
    { x: 134, y: 95, region: "Twilight Dunes", note: "Alpha spawn" },
  ],
  jetragon: [
    { x: 244, y: 122, region: "Mount Obsidian", note: "Flying around volcano" },
    { x: 246, y: 124, region: "Mount Obsidian", note: "Alpha spawn" },
  ],
  frostallion: [
    { x: 357, y: 117, region: "Astral Mountains", note: "Snowfield north-west" },
    { x: 355, y: 115, region: "Astral Mountains", note: "Alpha spawn" },
  ],
  shadowbeak: [
    { x: 372, y: 137, region: "Volcano Islands", note: "Nocturnus Mine area" },
    { x: 370, y: 135, region: "Volcano Islands", note: "Alpha spawn" },
  ],
  lamball: [
    { x: 175, y: 90, region: "Windswept Hills", note: "Starter area" },
    { x: 173, y: 88, region: "Windswept Hills", note: "Common spawn" },
  ],
  relaxaurus: [
    { x: 202, y: 96, region: "Ascetic Falls", note: "River area" },
    { x: 200, y: 94, region: "Ascetic Falls", note: "Common spawn" },
  ],
  mossanda: [
    { x: 188, y: 108, region: "Eastern Wild Island", note: "Forest area" },
    { x: 186, y: 106, region: "Eastern Wild Island", note: "Common spawn" },
  ],
  lyleen: [
    { x: 195, y: 105, region: "Verdant Brook", note: "Daytime only" },
    { x: 193, y: 103, region: "Verdant Brook", note: "Common spawn" },
  ],
  penking: [
    { x: 180, y: 100, region: "Ice Wind Island", note: "Cold shoreline" },
    { x: 178, y: 98, region: "Ice Wind Island", note: "Common spawn" },
  ],
  bushi: [
    { x: 210, y: 110, region: "Bamboo Grove", note: "Bamboo forest" },
    { x: 208, y: 108, region: "Bamboo Grove", note: "Common spawn" },
  ],
};

const FAST_TRAVEL = [
  { x: 175, y: 90, name: "Windswept Hills" },
  { x: 185, y: 105, name: "Eastern Wild Island" },
  { x: 240, y: 120, name: "Beach of Everlasting Summer" },
  { x: 350, y: 110, name: "Astral Mountains" },
];

function worldToPercent(x: number, y: number) {
  return {
    left: `${50 + (x / 500) * 50}%`,
    top: `${50 - (y / 500) * 50}%`,
  };
}

export function MapClient({ pals }: Props) {
  const [selectedPal, setSelectedPal] = useState<Pal | null>(null);
  const [showFastTravel, setShowFastTravel] = useState(true);
  const [hovered, setHovered] = useState<{ type: "pal" | "ft"; index: number } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const points = useMemo(() => {
    if (!selectedPal) return [];
    return selectedPal.spawnLocations || SPAWN_POINTS[selectedPal.slug] || [];
  }, [selectedPal]);

  const handleMarkerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative z-50">
        <div className="card flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <PalPicker pals={pals} selected={selectedPal} onSelect={setSelectedPal} label="Filter by Pal" />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={showFastTravel}
              onChange={(e) => setShowFastTravel(e.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-sky-600"
            />
            Show fast travel points
          </label>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="relative z-0 h-[70vh] w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900"
        onClick={() => setHovered(null)}
      >
        <img
          src="/map/palworld-map-bg.jpg"
          alt="Palworld map"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30" />
        </div>

        {showFastTravel &&
          FAST_TRAVEL.map((ft, i) => {
            const pos = worldToPercent(ft.x, ft.y);
            return (
              <button
                key={`ft-${i}`}
                className="absolute z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sky-500 ring-2 ring-sky-900/80 hover:bg-sky-400"
                style={{ left: pos.left, top: pos.top }}
                onClick={handleMarkerClick}
                onMouseEnter={() => setHovered({ type: "ft", index: i })}
                onMouseLeave={() => setHovered(null)}
                aria-label={`Fast travel ${ft.name}`}
              >
                <span className="sr-only">{ft.name}</span>
              </button>
            );
          })}

        {selectedPal &&
          points.map((p, i) => {
            const pos = worldToPercent(p.x, p.y);
            const active = hovered?.type === "pal" && hovered.index === i;
            return (
              <button
                key={`pal-${i}`}
                className={`absolute z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-slate-900 transition-transform hover:scale-110 ${
                  active ? "scale-125 bg-red-300" : "bg-red-500"
                }`}
                style={{ left: pos.left, top: pos.top }}
                onClick={handleMarkerClick}
                onMouseEnter={() => setHovered({ type: "pal", index: i })}
                onMouseLeave={() => setHovered(null)}
                aria-label={`${selectedPal.name} ${p.region}`}
              >
                <span className="sr-only">{selectedPal.name}</span>
              </button>
            );
          })}

        {hovered?.type === "ft" && (
          <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white shadow-lg"
          >
            Fast Travel: {FAST_TRAVEL[hovered.index].name}
          </div>
        )}

        {hovered?.type === "pal" && selectedPal && (
          <div className="absolute left-1/2 top-4 z-20 max-w-xs -translate-x-1/2 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white shadow-lg"
          >
            <div className="flex items-center gap-2 font-semibold">
              <Image src={getPalImageUrl(selectedPal)} alt={selectedPal.name} width={24} height={24} />
              {selectedPal.name}
            </div>
            <div className="text-slate-300">{points[hovered.index].region}</div>
            <div className="text-xs text-slate-400">{points[hovered.index].note}</div>
          </div>
        )}

        {!selectedPal && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            Select a Pal to see its spawn locations on the map.
          </div>
        )}
      </div>

      {selectedPal && points.length === 0 && (
        <p className="text-sm text-slate-400">
          No spawn points for {selectedPal.name} yet. Map coordinates are being added gradually.
        </p>
      )}

      <p className="text-xs text-slate-500">
        Spawn data is based on community research and may change with game updates.
      </p>
    </div>
  );
}

export function MapPopupCard({ pal }: { pal: Pal }) {
  return (
    <div className="flex items-center gap-2 font-semibold text-slate-900">
      <Image src={getPalImageUrl(pal)} alt={pal.name} width={24} height={24} />
      {pal.name}
    </div>
  );
}

export { SPAWN_POINTS };
