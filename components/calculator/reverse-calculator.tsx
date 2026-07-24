"use client";

import { useState } from "react";
import { PalPicker } from "@/components/pal/pal-picker";
import { PalCard } from "@/components/pal/pal-card";
import { findReverseCombos } from "@/lib/breeding";
import type { Pal } from "@/lib/types";

interface ReverseCalculatorProps {
  pals: Pal[];
}

export function ReverseCalculator({ pals }: ReverseCalculatorProps) {
  const [target, setTarget] = useState<Pal | null>(null);
  const [results, setResults] = useState<ReturnType<typeof findReverseCombos>>([]);

  function handleCalculate() {
    if (!target) return;
    setResults(findReverseCombos(target));
  }

  return (
    <div className="space-y-6">
      <PalPicker pals={pals} selected={target} onSelect={setTarget} label="Target Pal" />
      <button onClick={handleCalculate} disabled={!target} className="btn-primary w-full md:w-auto">
        Find Parent Combinations
      </button>

      {results.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm text-slate-400">{results.length} possible parent combinations</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {results.slice(0, 20).map((r, i) => (
              <div key={i} className="card p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Pair {i + 1}</span>
                  {r.special && (
                    <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-300">
                      Special
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <PalCard pal={r.parentA} compact />
                  <div className="pl-6 text-slate-500">+</div>
                  <PalCard pal={r.parentB} compact />
                </div>
              </div>
            ))}
          </div>
          {results.length > 20 && (
            <div className="text-center text-sm text-slate-500">+ {results.length - 20} more combinations</div>
          )}
        </div>
      )}

      {target && results.length === 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-400">
          No parent combinations found for {target.name}.
        </div>
      )}
    </div>
  );
}
