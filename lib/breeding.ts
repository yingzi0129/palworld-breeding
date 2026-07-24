import type { Pal } from './types';
import { getPals, getBreedingCombos, getPalByInternalName } from './data-client';

export interface ForwardResult {
  child: Pal;
  special: boolean;
  avgBreedingPower?: number;
}

export interface ReverseResult {
  parentA: Pal;
  parentB: Pal;
  special: boolean;
}

export interface PathStep {
  parents: [Pal, Pal];
  child: Pal;
  generation: number;
}

export interface ShortestPathResult {
  steps: PathStep[];
  generations: number;
}

export function calculateChild(parentA: Pal, parentB: Pal): ForwardResult | null {
  const combos = getBreedingCombos();
  const special = combos.find(
    (c) =>
      c.isSpecial &&
      ((c.parentAInternalName === parentA.internalName && c.parentBInternalName === parentB.internalName) ||
        (c.parentAInternalName === parentB.internalName && c.parentBInternalName === parentA.internalName))
  );
  if (special) {
    const child = getPalByInternalName(special.childInternalName);
    if (child) return { child, special: true };
  }

  const avg = Math.floor((parentA.breedingPower + parentB.breedingPower) / 2);
  const eligiblePals = getPals()
    .filter((p) => !p.isVariant && Math.abs(p.breedingPower - avg) <= 50)
    .sort((a, b) => {
      const diffA = Math.abs(a.breedingPower - avg);
      const diffB = Math.abs(b.breedingPower - avg);
      if (diffA !== diffB) return diffA - diffB;
      return b.breedingPowerPriority - a.breedingPowerPriority;
    });
  const child = eligiblePals[0];
  if (!child) return null;
  return { child, special: false, avgBreedingPower: avg };
}

export function findReverseCombos(child: Pal): ReverseResult[] {
  const combos = getBreedingCombos();
  const specialParents: ReverseResult[] = [];
  const normalParents: ReverseResult[] = [];

  for (const c of combos) {
    if (c.childInternalName !== child.internalName) continue;
    const a = getPalByInternalName(c.parentAInternalName);
    const b = getPalByInternalName(c.parentBInternalName);
    if (!a || !b) continue;
    if (c.isSpecial) {
      specialParents.push({ parentA: a, parentB: b, special: true });
    } else {
      normalParents.push({ parentA: a, parentB: b, special: false });
    }
  }

  return [...specialParents, ...normalParents];
}

export function findShortestPath(start: Pal, target: Pal): ShortestPathResult | null {
  if (start.internalName === target.internalName) return { steps: [], generations: 0 };

  const allPals = getPals();
  const queue: Array<{ pal: Pal; path: PathStep[] }> = [
    { pal: start, path: [] },
  ];

  while (queue.length > 0) {
    const { pal, path } = queue.shift()!;
    if (path.length >= 5) continue;

    for (const mate of allPals) {
      const result = calculateChild(pal, mate);
      if (!result) continue;
      const child = result.child;
      const nextPath: PathStep[] = [...path, { parents: [pal, mate], child, generation: path.length + 1 }];
      if (child.internalName === target.internalName) {
        return { steps: nextPath, generations: nextPath.length };
      }
      if (nextPath.length < 5) {
        queue.push({ pal: child, path: nextPath });
      }
    }
  }

  return null;
}

export function formatPercent(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}
