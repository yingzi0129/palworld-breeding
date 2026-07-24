"use client";

import { useState } from "react";
import Image from "next/image";
import { PalPicker } from "@/components/pal/pal-picker";
import { findShortestPath } from "@/lib/breeding";
import type { Pal } from "@/lib/types";
import { getPalImageUrl } from "@/lib/data-client";

interface Props {
  pals: Pal[];
}

export function ShortestPathClient({ pals }: Props) {
  const [start, setStart] = useState<Pal | null>(null);
  const [target, setTarget] = useState<Pal | null>(null);
  const [result, setResult] = useState<ReturnType<typeof findShortestPath>>(null);
  const [loading, setLoading] = useState(false);

  function handleFind() {
    if (!start || !target) return;
    setLoading(true);
    setTimeout(() => {
      setResult(findShortestPath(start, target));
      setLoading(false);
    }, 50);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <PalPicker pals={pals} selected={start} onSelect={setStart} label="Pal you own" />
        <PalPicker pals={pals} selected={target} onSelect={setTarget} label="Target Pal" />
      </div>
      <button
        onClick={handleFind}
        disabled={!start || !target || loading}
        className="btn-primary w-full md:w-auto"
      >
        {loading ? "Searching..." : "Find Shortest Path"}
      </button>

      {result && (
        <div className="space-y-4">
          {result.generations === 0 ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-5 text-center text-slate-300">
              Start and target are the same Pal.
            </div>
          ) : (
            <>
              <div className="text-sm text-slate-400">
                Found a path in <span className="font-semibold text-white">{result.generations}</span> generation
                {result.generations > 1 ? "s" : ""}:
              </div>
              <div className="relative space-y-0">
                {result.steps.map((step, i) => (
                  <div key={i} className="relative flex items-stretch gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {i + 1}
                      </div>
                      {i < result.steps.length - 1 && (
                        <div className="my-1 h-full min-h-[2rem] w-px bg-slate-700" />
                      )}
                    </div>
                    <div className="card mb-4 flex-1 p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <Image
                          src={getPalImageUrl(step.parents[0])}
                          alt={step.parents[0].name}
                          width={40}
                          height={40}
                          className="rounded-lg bg-slate-800"
                        />
                        <span className="text-slate-500">+</span>
                        <Image
                          src={getPalImageUrl(step.parents[1])}
                          alt={step.parents[1].name}
                          width={40}
                          height={40}
                          className="rounded-lg bg-slate-800"
                        />
                        <span className="text-slate-500">→</span>
                        <Image
                          src={getPalImageUrl(step.child)}
                          alt={step.child.name}
                          width={44}
                          height={44}
                          className="rounded-lg bg-slate-800"
                        />
                        <div>
                          <div className="font-semibold text-white">{step.child.name}</div>
                          <div className="text-xs text-slate-400">
                            From {step.parents[0].name} + {step.parents[1].name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {result === null && start && target && !loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-400">
          No path found within 5 generations. Try a different starting Pal or target.
        </div>
      )}
    </div>
  );
}
