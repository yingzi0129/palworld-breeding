import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPals, getPalBySlug, getElementClass, getElementBgClass, rarityColor, rarityLabel, getPalImageUrl } from "@/lib/data-client";
import { resolveSlug, getAliasMap } from "@/lib/slug-aliases";
import { findReverseCombos } from "@/lib/breeding";
import { PalCard } from "@/components/pal/pal-card";
import { ComboCard } from "@/components/pal/combo-card";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const pals = getPals();
  const aliasMap = getAliasMap();
  const slugs = new Set<string>();
  for (const pal of pals) {
    slugs.add(pal.slug);
  }
  for (const alias of Object.keys(aliasMap)) {
    slugs.add(alias);
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const realSlug = resolveSlug(params.slug);
  const pal = getPalBySlug(realSlug);
  if (!pal) return { title: "Pal Not Found" };
  return {
    title: `${pal.name} — Breeding, Location & Stats | PalworldBreeding.cc`,
    description: `How to breed ${pal.name} in Palworld, spawn locations, stats, work suitability, drops, and related Pals. Fan-made guide using community data.`,
    alternates: { canonical: `/pal/${pal.slug}` },
    openGraph: {
      title: `${pal.name} — Palworld Breeding & Location`,
      description: `How to breed ${pal.name}, where to find it, stats, and more.`,
      url: `https://palworldbreeding.cc/pal/${pal.slug}`,
    },
  };
}

export default function PalPage({ params }: Props) {
  const realSlug = resolveSlug(params.slug);
  const pal = getPalBySlug(realSlug);
  if (!pal) notFound();

  const combos = findReverseCombos(pal).slice(0, 10);
  const related = getPals()
    .filter((p) => p.internalName !== pal.internalName && p.elements.some((e) => pal.elements.includes(e)))
    .slice(0, 3);

  const primaryElement = pal.elements[0] || "Neutral";

  return (
    <div className="min-h-screen bg-[#020617] py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-12">
        {/* Hero Title */}
        <div className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className={`rounded-full border border-current/30 px-3 py-1 text-xs font-bold uppercase tracking-wider ${getElementClass(primaryElement)} bg-slate-900/50`}>
              {primaryElement} Element
            </span>
            <span className="font-mono text-sm text-slate-500">No. {pal.number}</span>
            <span className={`text-xs font-medium ${rarityColor(pal.rarity)}`}>{rarityLabel(pal.rarity)}</span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
            {pal.name} — <span className="text-slate-400">Breeding, Location &amp; Stats</span>
          </h1>
          {pal.description && (
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">{pal.description}</p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-7">
            {/* Pal Image Card */}
            <div className="glass-card relative overflow-hidden p-8">
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-8 flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40">
                  <Image
                    src={getPalImageUrl(pal)}
                    alt={pal.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />
                  <div className={`absolute right-4 top-4 rounded-xl p-3 shadow-lg ${getElementBgClass(primaryElement)}`}>
                    <span className={`text-2xl font-bold ${getElementClass(primaryElement)}`}>
                      {primaryElement[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Breeding Combinations */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white">
                  <span className="text-red-500">♥</span> How to breed {pal.name}
                </h2>
              </div>

              {combos.length === 0 ? (
                <p className="text-sm text-slate-500">No standard parent combinations found. This Pal may be a wild boss or special spawn.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {combos.slice(0, 6).map((combo, i) => (
                    <ComboCard key={i} parentA={combo.parentA} parentB={combo.parentB} child={pal} />
                  ))}
                </div>
              )}
              <Link href="/" className="inline-flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-400 no-underline">
                See all combos in the breeding calculator →
              </Link>
            </section>

            {/* Shortest Path */}
            <div className="glass-card rounded-xl border-l-4 border-l-red-500 p-6">
              <h3 className="mb-2 font-display text-xl font-bold text-white">Shortest path</h3>
              <p className="mb-5 text-sm leading-relaxed text-slate-400">
                Find the most efficient breeding route to {pal.name} from Pals you already own.
              </p>
              <Link href="/tools/shortest-path" className="btn-secondary inline-flex items-center gap-2 text-xs no-underline">
                <span>⌖</span> Find Shortest Path to {pal.name}
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:col-span-5">
            {/* Stats */}
            <div className="glass-card space-y-5 rounded-xl p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <span className="text-red-500">📊</span> Base Stats
              </h3>
              <div className="space-y-4">
                <StatBar label="HP" value={pal.stats.hp} max={200} color="bg-green-500" />
                <StatBar label="Attack" value={pal.stats.attack} max={200} color="bg-red-500" />
                <StatBar label="Defense" value={pal.stats.defense} max={200} color="bg-blue-500" />
              </div>
              <div className="pt-2 text-sm text-slate-400">
                Breeding Power: <span className="font-mono text-white">{pal.breedingPower}</span>
              </div>
            </div>

            {/* Work Suitability */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
                <span className="text-red-500">🔧</span> Work Suitability
              </h3>
              {pal.workSuitability.length === 0 ? (
                <p className="text-sm text-slate-500">No work suitability data.</p>
              ) : (
                <div className="space-y-3">
                  {pal.workSuitability.map((w) => (
                    <div key={w.type} className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/40 p-3">
                      <span className="text-sm font-medium text-slate-200">{w.type}</span>
                      <span className="font-mono text-lg font-bold text-red-500">{w.level}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Partner Skill & Drops */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <div className="glass-card rounded-xl p-6">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Partner Skill</h4>
                <h5 className="mb-2 font-bold text-white">{pal.partnerSkill || "—"}</h5>
                <p className="text-sm leading-relaxed text-slate-400">
                  {pal.partnerSkillDescription || "No partner skill description available."}
                </p>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Possible Drops</h4>
                {pal.drops && pal.drops.length > 0 ? (
                  <ul className="space-y-2">
                    {pal.drops.map((drop, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                        {drop.item_name}
                        {drop.drop_rate < 100 && <span className="text-xs text-slate-500">({drop.drop_rate}%)</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">No drop data available.</p>
                )}
              </div>
            </div>

            {/* Spawn Locations */}
            <div className="glass-card relative overflow-hidden rounded-xl p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-900/40" />
              <div className="relative z-10">
                <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
                  <span className="text-red-500">◎</span> Spawn locations
                </h3>
                {pal.spawnLocations && pal.spawnLocations.length > 0 ? (
                  <>
                    <ul className="mb-5 space-y-2">
                      {pal.spawnLocations.map((loc, i) => (
                        <li key={i} className="flex items-start justify-between gap-3 text-sm">
                          <div className="text-slate-300">{loc.region}</div>
                          <div className="font-mono text-xs text-slate-500">
                            {loc.x}, {loc.y}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-5 text-xs leading-relaxed text-slate-500">
                      {pal.spawnLocations[0]?.note}
                    </p>
                  </>
                ) : (
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">
                    Spawn location data is currently sourced from community maps. Use the interactive map to explore regions and coordinates for {pal.name}.
                  </p>
                )}
                <Link href="/map" className="btn-secondary inline-flex w-full items-center justify-center gap-2 text-xs no-underline">
                  View {pal.name} on the Map
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Pals */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 flex items-center gap-2 font-display text-2xl font-bold text-white">
              <span className="text-slate-400">◈</span> Related {pal.elements[0] || ""} Pals
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {related.map((p) => (
                <PalCard key={p.internalName} pal={p} href={`/pal/${p.slug}`} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1.5 flex justify-between font-mono text-xs text-slate-400">
        <span>{label}</span>
        <span className="text-slate-200">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
