const fs = require('fs');
const path = require('path');

const dbRaw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'palcalc-db.json'), 'utf-8'));
const breedingRaw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'palcalc-breeding.json'), 'utf-8'));
const paldeckRaw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'paldeck-pals.json'), 'utf-8'));

const paldeckMap = new Map();
for (const p of paldeckRaw.pals || []) {
  paldeckMap.set(p.asset_name, p);
}
const paldeckBase = 'https://paldeck.cc';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const elementMap = {
  Normal: 'Neutral',
  Earth: 'Ground',
  Fire: 'Fire',
  Water: 'Water',
  Grass: 'Grass',
  Electric: 'Electric',
  Ice: 'Ice',
  Dark: 'Dark',
  Dragon: 'Dragon',
};

const workMap = {
  EmitFlame: 'Kindling',
  Watering: 'Watering',
  Seeding: 'Planting',
  GenerateElectricity: 'Generating Electricity',
  Handcraft: 'Handiwork',
  Collection: 'Gathering',
  Deforest: 'Lumbering',
  Mining: 'Mining',
  Cool: 'Cooling',
  Transport: 'Transporting',
  MonsterFarm: 'Farming',
  MedicineProduction: 'Medicine Production',
};

const pals = (dbRaw.Pals).map((p) => {
  const slug = slugify(p.InternalName);
  const pd = paldeckMap.get(p.InternalName);
  const work = Object.entries(p.WorkSuitability || {})
    .filter(([, lvl]) => lvl > 0)
    .map(([type, lvl]) => ({ type: workMap[type.replace(/^EPalWorkSuitability::/, '')] || type.replace(/^EPalWorkSuitability::/, ''), level: lvl }));
  const elements = pd && pd.elements
    ? Object.keys(pd.elements).map((k) => elementMap[k] || k)
    : [];
  const palDexNo = pd ? parseInt(pd.dexkey, 10) : (p.Id && typeof p.Id === 'object' ? p.Id.PalDexNo : p.InternalIndex);
  const description = pd ? pd.description : '';
  const drops = pd && pd.drops ? pd.drops.map((d) => d.name || d) : (p.Drops || []);
  const iconUrl = pd && pd.icon ? `${paldeckBase}${pd.icon}` : null;
  return {
    id: typeof p.Id === 'object' ? `${p.Id.PalDexNo}-${p.Id.IsVariant ? 'v' : 'n'}` : p.InternalName,
    name: p.Name,
    internalName: p.InternalName,
    slug,
    number: palDexNo || p.InternalIndex,
    isVariant: p.Id && p.Id.IsVariant,
    breedingPower: p.BreedingPower,
    breedingPowerPriority: p.BreedingPowerPriority,
    rarity: p.Rarity,
    nocturnal: p.Nocturnal,
    stats: { hp: p.Hp, attack: p.Attack, defense: p.Defense },
    partnerSkill: p.PartnerSkill || null,
    workSuitability: work,
    drops,
    elements,
    description,
    imageUrl: iconUrl,
    imageKey: `pals/${slug}.webp`,
  };
});

fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'data/pals.json'), JSON.stringify(pals, null, 2));

const passiveSkills = (dbRaw.PassiveSkills || [])
  .filter((s) => s.IsStandardPassiveSkill)
  .map((s) => ({
    id: s.InternalName,
    name: s.Name,
    internalName: s.InternalName,
    rank: s.Rank,
    description: s.Description || '',
  }));
fs.writeFileSync(path.join(process.cwd(), 'data/passive-skills.json'), JSON.stringify(passiveSkills, null, 2));

const elements = (dbRaw.Elements || []).map((e) => ({
  id: e.InternalName,
  name: e.Name,
  internalName: e.InternalName,
}));
fs.writeFileSync(path.join(process.cwd(), 'data/elements.json'), JSON.stringify(elements, null, 2));

const combos = (breedingRaw.Breeding || []).map((c) => ({
  parentA: c.Parent1InternalName,
  parentB: c.Parent2InternalName,
  child: c.ChildInternalName,
  genderRequired: c.Parent1Gender !== 'WILDCARD' ? c.Parent1Gender : null,
  special: false,
}));

const childToParents = new Map();
for (const c of combos) {
  if (!childToParents.has(c.child)) childToParents.set(c.child, []);
  childToParents.get(c.child).push({ a: c.parentA, b: c.parentB, special: c.special });
}

fs.writeFileSync(path.join(process.cwd(), 'data/combos.json'), JSON.stringify(combos, null, 2));
fs.writeFileSync(path.join(process.cwd(), 'data/combos-by-child.json'), JSON.stringify(Object.fromEntries(childToParents), null, 2));

const adj = new Map();
for (const c of combos) {
  if (!adj.has(c.parentA)) adj.set(c.parentA, new Set());
  if (!adj.has(c.parentB)) adj.set(c.parentB, new Set());
  adj.get(c.parentA).add(c.child);
  adj.get(c.parentB).add(c.child);
}

const graphNodes = {};
for (const p of pals) {
  graphNodes[p.internalName] = { name: p.name, slug: p.slug, breedingPower: p.breedingPower, rarity: p.rarity };
}

const graphAdj = {};
for (const [parent, children] of adj) {
  graphAdj[parent] = Array.from(children).sort();
}

const childPairs = {};
for (const [child, pairs] of childToParents) {
  childPairs[child] = pairs.map((p) => [p.a, p.b]);
}

fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
fs.writeFileSync(
  path.join(process.cwd(), 'public/breeding-graph.json'),
  JSON.stringify({ nodes: graphNodes, adj: graphAdj, childPairs }, null, 2)
);

console.log(`Generated ${pals.length} pals, ${passiveSkills.length} passives, ${combos.length} combos, graph with ${Object.keys(graphNodes).length} nodes`);
