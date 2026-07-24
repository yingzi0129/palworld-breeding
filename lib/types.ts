export interface Pal {
  id: string;
  name: string;
  internalName: string;
  slug: string;
  number: number;
  isVariant: boolean;
  breedingPower: number;
  breedingPowerPriority: number;
  rarity: number;
  nocturnal: boolean;
  stats: { hp: number; attack: number; defense: number };
  partnerSkill: string | null;
  partnerSkillDescription: string | null;
  workSuitability: { type: string; level: number }[];
  drops: Array<{ item_name: string; item_dev_name: string; drop_rate: number; min: number; max: number }>;
  elements: string[];
  description: string;
  imageUrl: string | null;
  imageKey: string;
  spawnLocations?: Array<{ x: number; y: number; region: string; note: string }>;
}

export interface PassiveSkill {
  id: string;
  internalName: string;
  name: string;
  rank: number;
  effect?: string;
  description?: string;
}

export interface BreedingCombo {
  parentAInternalName: string;
  parentBInternalName: string;
  childInternalName: string;
  isSpecial: boolean;
}

export interface BreedingResult {
  pal: Pal;
  probability: number;
  parentA?: Pal;
  parentB?: Pal;
}
