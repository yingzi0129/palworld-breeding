import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ORG_NAME, SITE_NAME, SITE_URL } from "@/lib/site-config";

const GUIDE_UPDATED = "2026-07-26";

export const metadata: Metadata = {
  title: "Palworld Breeding Guide | PalworldBreeding.cc",
  description:
    "A complete Palworld breeding guide: breeding power, special combos, passive skill inheritance, IVs, mutations, cakes, and legendary farming strategies.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "Palworld Breeding Guide | PalworldBreeding.cc",
    description: "Master Palworld breeding mechanics: power values, combos, passive skills, IVs, and legendary strategies.",
    url: "https://palworldbreeding.cc/guide",
  },
};

export default function GuidePage() {
  const guideUrl = `${SITE_URL}/guide`;
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="mx-auto max-w-4xl px-4">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Palworld Breeding Guide",
            description:
              "A complete Palworld breeding guide: breeding power, special combos, passive skill inheritance, IVs, mutations, cakes, and legendary farming strategies.",
            url: guideUrl,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": guideUrl,
            },
            image: {
              "@type": "ImageObject",
              url: "https://palworldbreeding.cc/favicon.png",
              width: "512",
              height: "512",
            },
            author: {
              "@type": "Organization",
              name: ORG_NAME,
              url: SITE_URL,
            },
            publisher: {
              "@type": "Organization",
              name: ORG_NAME,
              url: SITE_URL,
              logo: {
                "@type": "ImageObject",
                url: "https://palworldbreeding.cc/favicon.png",
                width: "512",
                height: "512",
              },
            },
            datePublished: "2026-07-01",
            dateModified: GUIDE_UPDATED,
          }}
        />
        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">Palworld Breeding Guide</h1>
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
          <span>By {SITE_NAME}</span>
          <span>•</span>
          <time dateTime={GUIDE_UPDATED}>Updated {GUIDE_UPDATED}</time>
        </div>
        <p className="mb-8 text-slate-400">
          A practical, in-depth guide to breeding in Palworld, based on community research and game formulas. Last updated July 2026.
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
            <h2 className="mb-3 text-xl font-semibold text-white">Breeding Power Explained</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              Every Pal has a hidden <strong>Breeding Power</strong> value. The average of the two parents’ Breeding Power determines the child. The game then finds the Pal whose Breeding Power is closest to that average. This is why two weak Pals can produce a much stronger Pal, and why two strong Pals may produce a weaker one.
            </p>
            <div className="rounded-lg bg-slate-900/50 p-4 text-sm text-slate-300">
              <p className="mb-2 font-mono text-red-400">Child Power ≈ (Parent A Power + Parent B Power) / 2</p>
              <p>The game picks the Pal with the closest available Breeding Power to this result.</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Because Breeding Power is hidden, most players use a calculator or lookup table. Our forward and reverse calculators let you find the outcome of any pair, or the parents needed for a specific target.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Special Combinations</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              Some Pals can only be bred from specific parent pairs regardless of Breeding Power. Examples include legendary Pals and
              certain boss-only combinations. Use the reverse calculator on the homepage to find valid pairs for any target.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Legendary Pals usually require two of the same species to breed. For example, two Frostallions can produce another Frostallion egg, but you cannot breed them from common Pals. Boss variants and special evolutions often follow unique rules too.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Passive Skills</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              A child inherits up to 4 passive skills from its parents. The game rolls each slot independently from the combined pool of
              parent passive skills. Higher-ranked passive skills do not stack more often; each unique skill is equally likely per slot.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              To maximize the chance of passing a specific skill, both parents should have it. Some skills are exclusive to certain Pals or habitats, so you may need to catch wild parents with the exact passives you want.
            </p>
            <Link href="/tools/passive-skill" className="btn-secondary inline-flex text-xs no-underline">
              Try the Passive Skill Calculator
            </Link>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">IVs and Mutations</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              Individual Values affect a Pal’s HP, Attack, and Defense beyond base stats. IVs are inherited from parents with some random
              variation, and a small mutation chance can push stats higher or lower. Breeding two high-IV parents is the most reliable way to
              raise IVs. Cake quality can influence mutation odds in some mechanics.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Competitive players often chain-breed dozens of generations to push attack IVs to the maximum. Track parent IVs carefully, and keep the best offspring as the next generation’s parent.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Cakes and Farm Setup</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              Cakes are required for every breeding attempt. The standard Cake is crafted at a Cooking Pot or similar station. Keep a steady
              supply of eggs, milk, flour, and berries if you plan to breed extensively.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Make sure your Breeding Farm has enough space, the Pals are not hungry or injured, and the cake chest is stocked. A broken farm will stop all breeding progress.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">How to Breed Any Target Pal</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              If you want a specific Pal but do not own the parents, use a reverse calculator to find the shortest chain. The general strategy is:
            </p>
            <ol className="list-inside list-decimal space-y-1 text-sm text-slate-400">
              <li>Find the target Pal’s Breeding Power.</li>
              <li>Look for two Pals whose average power is close to the target.</li>
              <li>If you do not own those parents, repeat the process for each missing parent.</li>
              <li>Build the chain from Pals you already have toward the target.</li>
            </ol>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Some targets are only 1-2 generations away from common Pals. Others, like Legendaries, require you to already own the species.
            </p>
            <Link href="/tools/shortest-path" className="btn-secondary inline-flex text-xs no-underline">
              Find the Shortest Path
            </Link>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Legendary Pal Breeding Strategy</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              Legendary Pals cannot be bred from normal Pals. They are typically boss spawns found in the wild. Once you catch one, you can breed two of the same legendary species together to produce additional copies.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              This is important for players who want multiple mounts or combat Pals with the best IVs. Catch the legendary first, then farm it through breeding.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 font-semibold text-white">Can I breed any two Pals together?</h3>
                <p className="text-sm text-slate-400">Yes, almost any male and female Pal can be bred together, regardless of species or element. The child is determined by Breeding Power.</p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">Why is my child a different Pal than expected?</h3>
                <p className="text-sm text-slate-400">The game rounds the averaged Breeding Power to the nearest available Pal. Small differences in parent power can shift the result to a neighboring Pal.</p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">Do parent levels matter?</h3>
                <p className="text-sm text-slate-400">No, parent levels do not affect the child’s species or base stats. Only Breeding Power, passive skills, and IVs matter.</p>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">How do I get the best passive skills?</h3>
                <p className="text-sm text-slate-400">Catch wild parents that already have the passives you want, then breed them together. Both parents should carry the target skill for the best odds.</p>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Recommended First Targets</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/pal/anubis" className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 no-underline transition hover:border-sky-500/40">
                <div className="font-semibold text-white">Anubis</div>
                <div className="text-sm text-slate-400">Strong Ground type with excellent Handiwork and Mining.</div>
              </Link>
              <Link href="/pal/jetdragon" className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 no-underline transition hover:border-sky-500/40">
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
