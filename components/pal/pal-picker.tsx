"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import type { Pal } from "@/lib/types";
import { getPalImageUrl } from "@/lib/data-client";

interface PalPickerProps {
  pals: Pal[];
  selected: Pal | null;
  onSelect: (pal: Pal | null) => void;
  label?: string;
}

export function PalPicker({ pals, selected, onSelect, label }: PalPickerProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pals.slice(0, 30);
    return pals
      .filter((p) => p.name.toLowerCase().includes(q) || p.internalName.toLowerCase().includes(q) || String(p.number).includes(q))
      .slice(0, 20);
  }, [pals, query]);

  return (
    <div className="space-y-2 text-left" ref={ref}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">{label}</label>
      )}

      <div className="relative">
        <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={selected ? selected.name : query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (selected) onSelect(null);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search for a Pal..."
          className="input pl-12"
        />
        {selected && (
          <button
            onClick={() => onSelect(null)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
          >
            Clear
          </button>
        )}

        {open && (
          <div className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-500">No Pals found.</div>
            ) : (
              filtered.map((p) => (
                <button
                  key={p.internalName}
                  onClick={() => {
                    onSelect(p);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-slate-800"
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                    <Image src={getPalImageUrl(p)} alt={p.name} fill className="object-contain p-1" sizes="36px" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">{p.name}</div>
                    <div className="text-xs text-slate-500">#{p.number}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
