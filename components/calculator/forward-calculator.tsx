"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { PalPicker } from "@/components/pal/pal-picker";
import { getPalImageUrl, rarityColor, rarityLabel, getElementClass } from "@/lib/data-client";
import { calculateChild } from "@/lib/breeding";
import type { Pal } from "@/lib/types";

interface ForwardCalculatorProps {
  pals: Pal[];
}

export function ForwardCalculator({ pals }: ForwardCalculatorProps) {
  const [parentA, setParentA] = useState<Pal | null>(null);
  const [parentB, setParentB] = useState<Pal | null>(null);

  const child = useMemo(() => {
    if (!parentA || !parentB) return null;
    return calculateChild(parentA, parentB);
  }, [parentA, parentB]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <PalPicker pals={pals} selected={parentA} onSelect={setParentA} label="Parent Pal 1" />
        <PalPicker pals={pals} selected={parentB} onSelect={setParentB} label="Parent Pal 2" />
      </div>

      {child ? (
        <div className="rounded-2xl border border-red-500/20 bg-slate-900/50 p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-800 p-2">
              <Image
                src={getPalImageUrl(child.child)}
                alt={child.child.name}
                fill
                className="object-contain p-2"
                sizes="112px"
              />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-sm text-slate-500">#{child.child.number}</div>
              <h3 className="text-2xl font-bold text-white">{child.child.name}</h3>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {child.child.elements.map((e) => (
                  <span key={e} className={`rounded-full border border-slate-700 px-2.5 py-0.5 text-xs font-medium ${getElementClass(e)}`}>
                    {e}
                  </span>
                ))}
                <span className={`rounded-full border border-slate-700 px-2.5 py-0.5 text-xs font-medium ${rarityColor(child.child.rarity)}`}>
                  {rarityLabel(child.child.rarity)}
                </span>
              </div>
              <p className="mt-3 max-w-md text-sm text-slate-400">
                Breeding Power average: {Math.round(((parentA?.breedingPower || 0) + (parentB?.breedingPower || 0)) / 2)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-slate-700/50 bg-slate-900/30 p-10 text-center">
          <div className="mb-4 text-4xl">🥚</div>
          <p className="font-display font-medium text-slate-500">Choose two parents to see the result.</p>
        </div>
      )}
    </div>
  );
}
