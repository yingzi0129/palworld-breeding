import type { Pal, PassiveSkill, BreedingCombo } from './types';

import PALS_JSON from '../data/pals.json';
import PASSIVES_JSON from '../data/passive-skills.json';
import COMBOS_JSON from '../data/combos.json';

export const CDN_BASE = process.env.NEXT_PUBLIC_R2_CDN_URL || 'https://pub-5b9233a0e3bf4dbdaad8e560edfdc66c.r2.dev';

export const pals: Pal[] = PALS_JSON as Pal[];
export const passiveSkills: PassiveSkill[] = PASSIVES_JSON as PassiveSkill[];
const rawCombos: Array<{ parentA: string; parentB: string; child: string; genderRequired?: string | null; special?: boolean }> = COMBOS_JSON as Array<{
  parentA: string;
  parentB: string;
  child: string;
  genderRequired?: string | null;
  special?: boolean;
}>;

export const combos: BreedingCombo[] = rawCombos.map((c) => ({
  parentAInternalName: c.parentA,
  parentBInternalName: c.parentB,
  childInternalName: c.child,
  isSpecial: !!c.special,
}));

export function getPals(): Pal[] {
  return pals;
}

export function getPassiveSkills(): PassiveSkill[] {
  return passiveSkills;
}

export function getBreedingCombos(): BreedingCombo[] {
  return combos;
}

export function getPalBySlug(slug: string): Pal | undefined {
  return pals.find((p) => p.slug === slug);
}

export function getPalByInternalName(name: string): Pal | undefined {
  return pals.find((p) => p.internalName === name);
}

export function getPalImageUrl(pal: Pal): string {
  return `${CDN_BASE}/pals/${pal.slug}.webp?v=1`;
}

export function getElementClass(element: string): string {
  const map: Record<string, string> = {
    Fire: 'element-fire',
    Water: 'element-water',
    Grass: 'element-grass',
    Leaf: 'element-grass',
    Electric: 'element-electric',
    Electricity: 'element-electric',
    Ice: 'element-ice',
    Ground: 'element-ground',
    Dark: 'element-dark',
    Dragon: 'element-dragon',
    Neutral: 'element-neutral',
  };
  return map[element] || 'element-neutral';
}

export function getElementBgClass(element: string): string {
  const map: Record<string, string> = {
    Fire: 'bg-element-fire',
    Water: 'bg-element-water',
    Grass: 'bg-element-grass',
    Leaf: 'bg-element-grass',
    Electric: 'bg-element-electric',
    Electricity: 'bg-element-electric',
    Ice: 'bg-element-ice',
    Ground: 'bg-element-ground',
    Dark: 'bg-element-dark',
    Dragon: 'bg-element-dragon',
    Neutral: 'bg-element-neutral',
  };
  return map[element] || 'bg-element-neutral';
}

export function rarityColor(rarity: number): string {
  if (rarity >= 8) return 'text-yellow-400';
  if (rarity >= 5) return 'text-purple-400';
  return 'text-slate-400';
}

export function rarityLabel(rarity: number): string {
  if (rarity >= 8) return 'Legendary';
  if (rarity >= 5) return 'Rare';
  return 'Common';
}
