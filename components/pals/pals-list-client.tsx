"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { getPalImageUrl, getElementClass, rarityColor, rarityLabel } from "@/lib/data-client";
import type { Pal } from "@/lib/types";

interface PalsListClientProps {
  pals: Pal[];
}

export function PalsListClient({ pals }: PalsListClientProps) {
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
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl">Complete Pal List</h1>
          <p className="mt-2 text-slate-400">
            Browse all {pals.length} Pals in Palworld. Filter by element, search by name, and click any card to see breeding combos, stats, and locations.
          </p>
        </div>

        {/* Tool shortcuts */}
        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          <ToolShortcut
            href="/tools/shortest-path"
            title="Shortest Path"
            description="Find the fastest breeding route to any Pal."
            accent="red"
          />
          <ToolShortcut
            href="/tools/passive-skill"
            title="Passive Skill Odds"
            description="Calculate inheritance probability for skills."
            accent="blue"
          />
          <ToolShortcut
            href="/map"
            title="Spawn Map"
            description="Find where every Pal spawns in the wild."
            accent="emerald"
          />
        </div>

        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search Pal by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full pl-12 pr-10"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-xs text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
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

function ToolShortcut({
  href,
  title,
  description,
  accent,
}: {
  href: string;
  title: string;
  description: string;
  accent: "red" | "blue" | "emerald" | "purple";
}) {
  const accentClasses = {
    red: "border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-500/60",
    blue: "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:border-blue-500/60",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/60",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:border-purple-500/60",
  };
  return (
    <Link
      href={href}
      className={`block rounded-xl border p-4 transition-all hover:-translate-y-0.5 ${accentClasses[accent]}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-bold text-white">{title}</h3>
        <span className="text-sm">→</span>
      </div>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </Link>
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
