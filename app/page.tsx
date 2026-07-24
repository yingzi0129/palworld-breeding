import Link from "next/link";
import type { Metadata } from "next";
import { getPals } from "@/lib/data-server";
import { Tabs } from "@/components/ui/tabs";
import { ForwardCalculator } from "@/components/calculator/forward-calculator";
import { ReverseCalculator } from "@/components/calculator/reverse-calculator";

export const metadata: Metadata = {
  title: "Palworld Breeding Calculator & Interactive Map | PalworldBreeding.cc",
  description:
    "Plan your perfect Pal the easy way. Calculate combos, optimize passive skill inheritance, find the shortest breeding path, and track spawn locations — all in one friendly spot.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const pals = getPals();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617]">
      {/* Atmospheric gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 blur-3xl">
        <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-red-600/15" />
        <div className="absolute right-1/4 top-1/4 h-[32rem] w-[32rem] rounded-full bg-blue-600/10" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-purple-600/10" />
      </div>

      <main className="pt-10">
        {/* Hero */}
        <section className="mx-auto max-w-[1440px] px-6 py-16 text-center md:px-12 md:py-24">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Palworld Breeding Calculator
            <br className="hidden md:block" />{" "}
            <span className="text-red-500">&amp; Interactive Map</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Plan your perfect Pal the easy way. Calculate combos, optimize passive skill inheritance, find the shortest breeding path, and track spawn locations — all in one friendly spot.
          </p>

          {/* Main tool box */}
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/60 shadow-2xl backdrop-blur-xl">
            <Tabs labels={["Forward: Select parents → child", "Reverse: Target Pal → parents"]}>
              <ForwardCalculator pals={pals} />
              <ReverseCalculator pals={pals} />
            </Tabs>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-y border-slate-800 bg-slate-900/50 py-6">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-12 gap-y-3 px-6 text-sm font-medium text-slate-400 md:px-12 md:text-base">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-red-500">299</span>
              Pals
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-blue-400">44,851+</span>
              combos
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★</span>
              Passive skill probability
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Interactive map
            </div>
            <div className="text-slate-500">Fan-made, community-driven</div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
          <div className="mb-14 text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Everything You Need To Breed Legendaries
            </h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-red-500" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="↔"
              title="Shortest breeding path"
              description="Calculate the most efficient route from the Pals you already have to the legendary you want."
              href="/tools/shortest-path"
              accent="red"
            />
            <FeatureCard
              icon="%"
              title="Passive skill probability"
              description="Deep dive into inheritance odds to ensure your Pal gets 'Legend', 'Musclehead', and 'Ferocious'."
              href="/tools/passive-skill"
              accent="blue"
            />
            <FeatureCard
              icon="◎"
              title="Interactive spawn map"
              description="Find exactly where to catch the parents you need with precise coordinates and habitat data."
              href="/map"
              accent="emerald"
            />
            <FeatureCard
              icon="≡"
              title="Build-focused guides"
              description="Expertly curated breeding templates for combat, base automation, and lightning-fast mounts."
              href="/guide"
              accent="purple"
            />
          </div>
        </section>

        {/* How it works */}
        <section className="bg-slate-900/30 py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="mb-14 text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">How It Works</h2>
              <p className="mt-3 text-slate-400">Four simple steps to your dream Pal team.</p>
            </div>
            <div className="grid gap-12 md:grid-cols-4">
              <Step number={1} title="Search Parents" description="Enter the two Pals you currently have at your base." />
              <Step number={2} title="Check Result" description="See the egg type and the resulting Pal combination." />
              <Step number={3} title="Optimize Skills" description="Review the inheritance percentages for passive skills." />
              <Step number={4} title="Hatch &amp; Conquer" description="Take your newly bred power-house into battle!" />
            </div>
          </div>
        </section>

        {/* FAQ / SEO content */}
        <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
          <div className="space-y-16">
            <article>
              <h2 className="mb-6 border-l-4 border-red-500 pl-6 font-display text-2xl font-bold text-white md:text-3xl">
                What is Palworld breeding?
              </h2>
              <div className="space-y-4 leading-relaxed text-slate-400">
                <p>
                  Breeding in Palworld is a deep mechanics-driven system where you pair two different (or identical) Pals in a Breeding Farm to produce an egg. Every Pal has a hidden power level value. When two parents are bred, their values are averaged to determine the resulting offspring.
                </p>
                <p>
                  This system allows players to &quot;breed up&quot; from common Pals like Cattiva or Lamball into massive beasts like Anubis or Faleris. It&apos;s the primary way to optimize stat growth and ensure your Pals have the strongest combat or base-working passive skills.
                </p>
              </div>
            </article>

            <article>
              <h2 className="mb-6 border-l-4 border-red-500 pl-6 font-display text-2xl font-bold text-white md:text-3xl">
                How does this calculator differ from basic combo tools?
              </h2>
              <div className="space-y-4 leading-relaxed text-slate-400">
                <p>
                  Unlike standard list-based tools, PalworldBreeding.cc utilizes dynamic path-finding. If you want a specific Pal but don&apos;t have the parents, our reverse search will show you every possible combination, including secondary and tertiary breeding steps.
                </p>
                <p>
                  We also integrate spawn data, so if you&apos;re missing a parent we can point you to the exact map location where they roam in the wild, saving hours of exploration.
                </p>
              </div>
            </article>

            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur-sm">
              <h2 className="mb-4 font-display text-2xl font-bold text-white">Is this official?</h2>
              <p className="leading-relaxed text-slate-400">
                No. This is a fan-made project created by and for the Palworld community. We are players who wanted better tools for tracking complex breeding chains and skill inheritance odds. Our data is sourced from game files and community testing to ensure high accuracy.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
  accent,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
  accent: "red" | "blue" | "emerald" | "purple";
}) {
  const accentClasses = {
    red: "text-red-500 bg-red-500/10 hover:border-red-500/50",
    blue: "text-blue-500 bg-blue-500/10 hover:border-blue-500/50",
    emerald: "text-emerald-500 bg-emerald-500/10 hover:border-emerald-500/50",
    purple: "text-purple-500 bg-purple-500/10 hover:border-purple-500/50",
  };
  return (
    <Link
      href={href}
      className={`block rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all hover:-translate-y-0.5 ${accentClasses[accent]}`}
    >
      <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-bold ${accentClasses[accent].split(" ").slice(1, 3).join(" ")}`}>
        {icon}
      </div>
      <h3 className="mb-3 font-display text-xl font-bold text-white">{title}</h3>
      <p className="leading-relaxed text-slate-400">{description}</p>
    </Link>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-slate-800 font-display text-2xl font-bold text-white">
        {number}
      </div>
      <h4 className="mb-2 text-lg font-bold text-white">{title}</h4>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
