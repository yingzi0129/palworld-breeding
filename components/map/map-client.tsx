"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import type { Pal } from "@/lib/types";
import { PalPicker } from "@/components/pal/pal-picker";
import { getPalImageUrl } from "@/lib/data-client";
import Image from "next/image";

interface Props {
  pals: Pal[];
  spawnMap: Record<string, { x: number; y: number; region: string; note: string }[]>;
  fastTravel?: { x: number; y: number; name: string }[];
}

const FAST_TRAVEL: { x: number; y: number; name: string }[] = [
  { x: 22.46, y: 68.38, name: "Windswept Hills" },
  { x: 61.98, y: 57.58, name: "Eastern Wild Island" },
  { x: 74.00, y: 62.00, name: "Beach of Everlasting Summer" },
  { x: 35.00, y: 61.00, name: "Astral Mountains" },
  { x: 19.00, y: 51.00, name: "Twilight Dunes" },
  { x: 67.00, y: 46.00, name: "Bamboo Grove" },
  { x: 54.00, y: 46.00, name: "Ascetic Falls" },
  { x: 58.00, y: 53.00, name: "Ice Wind Island" },
];

function worldToPercent(x: number, y: number) {
  return {
    left: `${x}%`,
    top: `${y}%`,
  };
}

export function MapClient({ pals, spawnMap, fastTravel }: Props) {
  const [selectedPal, setSelectedPal] = useState<Pal | null>(null);
  const [showFastTravel, setShowFastTravel] = useState(true);
  const [hovered, setHovered] = useState<{ type: "pal" | "ft"; index: number } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const ftPoints = useMemo(() => fastTravel || FAST_TRAVEL, [fastTravel]);

  const points = useMemo(() => {
    if (!selectedPal) return [];
    return spawnMap[selectedPal.slug] || [];
  }, [selectedPal, spawnMap]);

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
          ftPoints.map((ft, i) => {
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
            Fast Travel: {ftPoints[hovered.index].name}
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
