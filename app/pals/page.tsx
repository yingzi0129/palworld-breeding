"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { getPals, getPalImageUrl, getElementClass, rarityColor, rarityLabel } from "@/lib/data-client";
import type { Pal } from "@/lib/types";

export default function PalsPage() {
  const pals = getPals();
  const elements = Array.from(new Set(pals.flatMap((p) => p.elements))).filter(Boolean).sort();
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return pals.filter((pal) => {
      const matchesSearch = pal.name.toLowerCase().includes(search.toLowerCase());
      const matchesElement =
        selectedElements.length === 0 || pal.elements.some((e) => selectedElements.includes(e));
      return matchesSearch && matchesElement;
    });
  }, [pals, selectedElements, search]);

  function toggleElement(element: string) {
    setSelectedElements((prev) =>
      prev.includes(element) ? prev.filter((e) => e !== element) : [...prev, element]
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-12">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl">Pal List</h1>
          <p className="mt-2 text-slate-400">
            Browse all {pals.length} Pals. Click any card to see breeding combos, stats, and locations.
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Pal by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {elements.map((e) => {
            const active = selectedElements.includes(e);
            return (
              <button
                key={e}
                onClick={() => toggleElement(e)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? `border-red-500 bg-red-500/20 ${getElementClass(e)}`
                    : `border-slate-700 bg-slate-900/70 ${getElementClass(e)} hover:border-slate-600`
                }`}
              >
                {e}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((pal) => (
            <PalListCard key={pal.internalName} pal={pal} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500">No Pals match your filters.</p>
        )}
      </div>
    </div>
  );
}

function PalListCard({ pal }: { pal: Pal }) {
  return (
    <Link
      href={`/pal/${pal.slug}`}
      className="group glass-card block rounded-2xl p-4 no-underline transition hover:-translate-y-0.5 hover:border-slate-600"
    >
      <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-800/60">
        <div className="relative h-32 w-32 transition group-hover:scale-110">
          <Image src={getPalImageUrl(pal)} alt={pal.name} fill className="object-contain" sizes="128px" />
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500">#{pal.number}</p>
          <h3 className="font-display text-lg font-bold text-white">{pal.name}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {pal.elements.slice(0, 2).map((e) => (
              <span key={e} className={`text-xs font-medium ${getElementClass(e)}`}>
                {e}
              </span>
            ))}
          </div>
        </div>
        <span className={`text-xs font-medium ${rarityColor(pal.rarity)}`}>{rarityLabel(pal.rarity)}</span>
      </div>
    </Link>
  );
}
