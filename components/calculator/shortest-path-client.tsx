"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PalPicker } from "@/components/pal/pal-picker";
import type { Pal } from "@/lib/types";
import { getPalImageUrl } from "@/lib/data-client";

interface CompactGraph {
  n: [string, string, string, number, number][]; // [name, slug, internalName, bp, rarity]
  a: number[][];                                  // adjacency list
  p: number[][][];                                // child -> parent index pairs
}

interface PathStep {
  parentA: Pal;
  parentB: Pal;
  child: Pal;
  generation: number;
}

interface SearchResult {
  steps: PathStep[];
  generations: number;
}

function graphNodeToPal(graph: CompactGraph, idx: number): Pal {
  const [name, slug, palInternalName, bp, r] = graph.n[idx];
  return {
    id: palInternalName,
    name,
    internalName: palInternalName,
    slug,
    number: 0,
    isVariant: false,
    breedingPower: bp,
    breedingPowerPriority: 0,
    rarity: r,
    nocturnal: false,
    stats: { hp: 0, attack: 0, defense: 0 },
    partnerSkill: null,
    partnerSkillDescription: null,
    workSuitability: [],
    drops: [],
    elements: [],
    description: "",
    imageUrl: null,
    imageKey: `pals/${slug}.webp`,
  };
}

function findShortestPath(graph: CompactGraph, startIdx: number, targetIdx: number): SearchResult | null {
  if (startIdx === targetIdx) return { steps: [], generations: 0 };

  const queue: number[] = [startIdx];
  const prev: (number | null)[] = new Array(graph.n.length).fill(null);
  prev[startIdx] = -1;

  while (queue.length > 0) {
    const u = queue.shift()!;
    for (const v of graph.a[u] || []) {
      if (prev[v] === null) {
        prev[v] = u;
        if (v === targetIdx) {
          queue.length = 0;
          break;
        }
        queue.push(v);
      }
    }
  }

  if (prev[targetIdx] === null) return null;

  const path: number[] = [];
  let cur: number = targetIdx;
  while (cur !== -1) {
    path.unshift(cur);
    cur = prev[cur] as number;
  }

  const steps: PathStep[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const parentIdx = path[i];
    const childIdx = path[i + 1];
    const pairs = graph.p[childIdx] || [];
    const pair = pairs.find((p) => p[0] === parentIdx || p[1] === parentIdx);
    const mateIdx = pair ? (pair[0] === parentIdx ? pair[1] : pair[0]) : null;
    if (mateIdx === null) return null;

    const parentA = graphNodeToPal(graph, parentIdx);
    const parentB = graphNodeToPal(graph, mateIdx);
    const child = graphNodeToPal(graph, childIdx);
    steps.push({ parentA, parentB, child, generation: i + 1 });
  }

  return { steps, generations: steps.length };
}

function findIndexByInternalName(graph: CompactGraph, internalName: string): number {
  return graph.n.findIndex((n) => n[2] === internalName);
}

interface Props {
  pals: Pal[];
}

export function ShortestPathClient({ pals }: Props) {
  const [graph, setGraph] = useState<CompactGraph | null>(null);
  const [graphError, setGraphError] = useState(false);
  const [start, setStart] = useState<Pal | null>(null);
  const [target, setTarget] = useState<Pal | null>(null);
  const [result, setResult] = useState<SearchResult | null | undefined>(undefined);
  const [elapsed, setElapsed] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/breeding-graph.json")
      .then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json();
      })
      .then((data: CompactGraph) => setGraph(data))
      .catch(() => setGraphError(true));
  }, []);

  const isLegendary = useMemo(() => {
    if (!target) return false;
    return target.rarity >= 8;
  }, [target]);

  function handleFind() {
    if (!graph || !start || !target) return;
    const startIdx = findIndexByInternalName(graph, start.internalName);
    const targetIdx = findIndexByInternalName(graph, target.internalName);
    if (startIdx === -1 || targetIdx === -1) return;

    setLoading(true);
    setResult(undefined);

    const t0 = performance.now();
    const res = findShortestPath(graph, startIdx, targetIdx);
    const t1 = performance.now();

    setResult(res);
    setElapsed(t1 - t0);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <PalPicker pals={pals} selected={start} onSelect={setStart} label="Pal you own" />
        <PalPicker pals={pals} selected={target} onSelect={setTarget} label="Target Pal" />
      </div>

      {isLegendary && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-sm text-amber-200">
          <strong>Legendary Pals cannot be bred from normal Pals.</strong>
          <br />
          In the current game data, Legendary targets such as {target?.name} can only be obtained by breeding two of the same Legendary together. You must already own one to breed more.
        </div>
      )}

      <button
        onClick={handleFind}
        disabled={!graph || !start || !target || loading}
        className="btn-primary w-full md:w-auto"
      >
        {loading ? "Searching..." : graph ? "Find Shortest Path" : "Loading graph..."}
      </button>

      {graphError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-5 text-center text-slate-300">
          Failed to load breeding graph. Please refresh the page.
        </div>
      )}

      {result !== undefined && (
        <div className="space-y-4">
          {result && result.generations === 0 ? (
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-5 text-center text-slate-300">
              Start and target are the same Pal.
            </div>
          ) : result ? (
            <>
              <div className="text-sm text-slate-400">
                Found a path in <span className="font-semibold text-white">{result.generations}</span> generation
                {result.generations > 1 ? "s" : ""} <span className="text-slate-500">({elapsed.toFixed(2)} ms)</span>:
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
                          src={getPalImageUrl(step.parentA)}
                          alt={step.parentA.name}
                          width={40}
                          height={40}
                          className="rounded-lg bg-slate-800"
                        />
                        <span className="text-slate-500">+</span>
                        <Image
                          src={getPalImageUrl(step.parentB)}
                          alt={step.parentB.name}
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
                            From {step.parentA.name} + {step.parentB.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-400">
              No path found within the breeding graph. {isLegendary
                ? "Legendary Pals cannot be bred from normal Pals in the current game data."
                : "Try a different starting Pal or target."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
