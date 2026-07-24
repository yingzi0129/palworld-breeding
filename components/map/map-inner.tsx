"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Pal } from "@/lib/types";

interface MapInnerProps {
  selectedPal: Pal | null;
  points: { x: number; y: number; region: string; note: string }[];
  showFastTravel: boolean;
}

const FAST_TRAVEL = [
  { x: -175, y: -90, name: "Windswept Hills" },
  { x: -185, y: -105, name: "Eastern Wild Island" },
  { x: -240, y: -120, name: "Beach of Everlasting Summer" },
  { x: -350, y: 110, name: "Astral Mountains" },
];

export function MapInner({ selectedPal, points, showFastTravel }: MapInnerProps) {
  return (
    <MapContainer
      center={[-180, -100]}
      zoom={5}
      scrollWheelZoom
      className="h-full w-full"
      maxBounds={[[-600, -600], [300, 300]]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {showFastTravel &&
        FAST_TRAVEL.map((ft, i) => (
          <CircleMarker
            key={`ft-${i}`}
            center={[ft.y, ft.x]}
            radius={6}
            pathOptions={{
              color: "#0ea5e9",
              fillColor: "#0284c7",
              fillOpacity: 0.8,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-slate-900">Fast Travel: {ft.name}</div>
            </Popup>
          </CircleMarker>
        ))}

      {selectedPal &&
        points.map((p, i) => (
          <CircleMarker
            key={`pal-${i}`}
            center={[p.y, p.x]}
            radius={8}
            pathOptions={{
              color: "#ef4444",
              fillColor: "#ef4444",
              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-[10rem] text-slate-900">
                <div className="font-semibold">{selectedPal.name}</div>
                <div className="text-sm text-slate-700">{p.region}</div>
                <div className="text-xs text-slate-600">{p.note}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
    </MapContainer>
  );
}
