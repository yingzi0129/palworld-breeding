import fs from 'fs';
import path from 'path';
import type { Pal, PassiveSkill, BreedingCombo } from './types';

let palsCache: Pal[] | null = null;
let passivesCache: PassiveSkill[] | null = null;
let combosCache: BreedingCombo[] | null = null;

export function getPals(): Pal[] {
  if (palsCache) return palsCache;
  const raw = fs.readFileSync(path.join(process.cwd(), 'data/pals.json'), 'utf-8');
  palsCache = JSON.parse(raw) as Pal[];
  return palsCache;
}

export function getPassiveSkills(): PassiveSkill[] {
  if (passivesCache) return passivesCache;
  const raw = fs.readFileSync(path.join(process.cwd(), 'data/passive-skills.json'), 'utf-8');
  passivesCache = JSON.parse(raw) as PassiveSkill[];
  return passivesCache;
}

export function getBreedingCombos(): BreedingCombo[] {
  if (combosCache) return combosCache;
  const raw = fs.readFileSync(path.join(process.cwd(), 'data/combos.json'), 'utf-8');
  const parsed = JSON.parse(raw) as Array<{
    parentA: string;
    parentB: string;
    child: string;
    genderRequired?: string | null;
    special?: boolean;
  }>;
  combosCache = parsed.map((c) => ({
    parentAInternalName: c.parentA,
    parentBInternalName: c.parentB,
    childInternalName: c.child,
    isSpecial: !!c.special,
  }));
  return combosCache;
}

export function getPalBySlug(slug: string): Pal | undefined {
  return getPals().find((p) => p.slug === slug);
}

export function getPalByInternalName(name: string): Pal | undefined {
  return getPals().find((p) => p.internalName === name);
}
