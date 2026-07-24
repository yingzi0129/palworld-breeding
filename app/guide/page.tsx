import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Palworld Breeding Guide | PalworldBreeding.cc",
  description:
    "A beginner-friendly guide to Palworld breeding mechanics: passive skills, IVs, mutations, cakes, and how to build the perfect Pal.",
  alternates: { canonical: "/guide" },
};

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">Palworld Breeding Guide</h1>
        <p className="mb-8 text-slate-400">
          A practical guide to breeding in Palworld, based on community research and game formulas. Last updated July 2026.
        </p>

        <div className="space-y-6">
          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">How Breeding Works</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              When you place two compatible Pals in a Breeding Farm with a cake, they produce an Egg. The child is determined by the
              parents’ Breeding Power. In most cases, the child is the Pal whose Breeding Power is closest to the average of the two parents.
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-400">
              <li>Find a Breeding Farm in the Technology tree and build it.</li>
              <li>Assign one male and one female Pal.</li>
              <li>Place a cake in the farm chest.</li>
              <li>Wait for the breeding progress to finish and collect the egg.</li>
            </ul>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Special Combinations</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Some Pals can only be bred from specific parent pairs regardless of Breeding Power. Examples include legendary Pals and
              certain boss-only combinations. Use the reverse calculator on the homepage to find valid pairs for any target.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Passive Skills</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              A child inherits up to 4 passive skills from its parents. The game rolls each slot independently from the combined pool of
              parent passive skills. Higher-ranked passive skills do not stack more often; each unique skill is equally likely per slot.
            </p>
            <Link href="/tools/passive-skill" className="btn-secondary inline-flex text-xs no-underline">
              Try the Passive Skill Calculator
            </Link>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">IVs and Mutations</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Individual Values affect a Pal’s HP, Attack, and Defense beyond base stats. IVs are inherited from parents with some random
              variation, and a small mutation chance can push stats higher or lower. Breeding two high-IV parents is the most reliable way to
              raise IVs. Cake quality can influence mutation odds in some mechanics.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Cakes</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Cakes are required for every breeding attempt. The standard Cake is crafted at a Cooking Pot or similar station. Keep a steady
              supply of eggs, milk, flour, and berries if you plan to breed extensively.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Recommended First Targets</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/pal/anubis" className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 no-underline transition hover:border-sky-500/40">
                <div className="font-semibold text-white">Anubis</div>
                <div className="text-sm text-slate-400">Strong Ground type with excellent Handiwork and Mining.</div>
              </Link>
              <Link href="/pal/jetragon" className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 no-underline transition hover:border-sky-500/40">
                <div className="font-semibold text-white">Jetragon</div>
                <div className="text-sm text-slate-400">Fast Dragon mount and powerful combat Pal.</div>
              </Link>
              <Link href="/pal/icehorse" className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 no-underline transition hover:border-red-500/40">
                <div className="font-semibold text-white">Frostallion</div>
                <div className="text-sm text-slate-400">Legendary Ice mount with high combat stats.</div>
              </Link>
              <Link href="/pal/blackgriffon" className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 no-underline transition hover:border-red-500/40">
                <div className="font-semibold text-white">Shadowbeak</div>
                <div className="text-sm text-slate-400">Dark type with strong aerial combat.</div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
