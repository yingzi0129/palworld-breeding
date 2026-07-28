import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getPals, getPalBySlug } from "@/lib/data-server";
import { getPalImageUrl, rarityColor, rarityLabel } from "@/lib/data-client";
import type { Pal } from "@/lib/types";
import { Tabs } from "@/components/ui/tabs";
import { ForwardCalculator } from "@/components/calculator/forward-calculator";
import { ReverseCalculator } from "@/components/calculator/reverse-calculator";

export const metadata: Metadata = {
  title: "Palworld Breeding Calculator & Map | PalworldBreeding",
  description:
    "Plan your perfect Pal with PalworldBreeding. Calculate combos, optimize passive skills, find the shortest breeding path, and track spawn locations.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const pals = getPals();

  const popularPals = [
    "anubis",
    "jetdragon",
    "icehorse",
    "blackgriffon",
    "darkscorpion",
    "suzaku",
  ]
    .map((slug) => getPalBySlug(slug))
    .filter((pal): pal is Pal => Boolean(pal));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617]">
      <main className="pt-10">
        {/* Hero */}
        <section className="relative overflow-hidden text-center">
          {/* Map background — pre-cropped hero image with strong land/sea contrast */}
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/map/palworld-map-hero-bg.jpg')",
              filter: "brightness(1.1) contrast(1.05)",
            }}
          />

          {/* Dark gradient overlay — keeps map visible but readable */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020617]/45 via-[#020617]/35 to-[#020617]/80" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020617]/40 via-transparent to-[#020617]/40" />

          {/* Floating light orbs — game world fast-travel beacons */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_35px_10px_rgba(34,211,238,0.45)] animate-pulse" />
            <div className="absolute right-[18%] top-[16%] h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_40px_12px_rgba(251,191,36,0.4)] animate-pulse" style={{ animationDelay: "1.2s" }} />
            <div className="absolute bottom-[38%] left-[8%] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_30px_9px_rgba(52,211,153,0.42)] animate-pulse" style={{ animationDelay: "0.6s" }} />
            <div className="absolute right-[10%] top-[42%] h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_30px_9px_rgba(192,132,252,0.38)] animate-pulse" style={{ animationDelay: "2s" }} />
            <div className="absolute bottom-[28%] right-[22%] h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_25px_8px_rgba(248,113,113,0.35)] animate-pulse" style={{ animationDelay: "0.3s" }} />
          </div>

          {/* Real Pal artwork — left Frostallion, right Jetragon */}
          <div className="pointer-events-none absolute -left-12 bottom-0 hidden opacity-[0.18] mix-blend-screen blur-[2px] brightness-110 lg:block xl:-left-6">
            <Image
              src="/images/hero/frostallion.webp"
              alt="Frostallion legendary Pal"
              width={420}
              height={420}
              className="h-auto w-[18rem] xl:w-[22rem]"
              priority
            />
          </div>
          <div className="pointer-events-none absolute -right-10 bottom-0 hidden opacity-[0.20] mix-blend-screen blur-[1px] brightness-110 lg:block xl:-right-4">
            <Image
              src="/images/hero/jetragon.webp"
              alt="Jetragon legendary Pal"
              width={460}
              height={460}
              className="h-auto w-[20rem] xl:w-[24rem]"
              priority
            />
          </div>

          {/* Atmospheric glow */}
          <div className="pointer-events-none absolute inset-0 blur-3xl">
            <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-red-600/16" />
            <div className="absolute right-1/4 top-1/4 h-[36rem] w-[36rem] rounded-full bg-blue-600/12" />
            <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-purple-600/12" />
          </div>

          <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
            {/* Fan-made badge */}
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
              Fan-made Palworld companion
            </div>

            {/* Glowing egg badge */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-orange-500 to-red-600 p-[2px] shadow-[0_0_45px_14px_rgba(249,115,22,0.32)] animate-float">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0f24]">
                <EggIcon className="h-8 w-8 text-orange-400" />
              </div>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white drop-shadow-2xl md:text-6xl">
              Palworld Breeding Calculator
              <br className="hidden md:block" />{" "}
              <span className="bg-gradient-to-r from-red-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                &amp; Interactive Map
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-300 drop-shadow md:text-xl">
              Plan your perfect Pal the easy way. Calculate combos, optimize passive skill inheritance, find the shortest breeding path, and track spawn locations — all in one friendly spot.
            </p>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-400 drop-shadow">
              PalworldBreeding is a fan-made companion for trainers who want to master Palworld breeding. Whether you are chasing a legendary Pal or optimizing passive skill inheritance, our free breeding calculator, combo database, and interactive spawn map give you the data you need without the guesswork.
            </p>

            {/* Game-style stat capsules with SVG icons */}
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
              <StatCapsule icon={<PawIcon className="h-4 w-4" />} label="299 Pals" />
              <StatCapsule icon={<LinkIcon className="h-4 w-4" />} label="44,851+ Combos" />
              <StatCapsule icon={<MapPinIcon className="h-4 w-4" />} label="Spawn Map" />
              <StatCapsule icon={<SparkleIcon className="h-4 w-4" />} label="Passive Skills" />
            </div>

            {/* Main tool box — in-game terminal feel */}
            <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0B1120]/85 shadow-[0_0_60px_-12px_rgba(249,115,22,0.18)] backdrop-blur-xl">
              {/* Terminal header accent */}
              <div className="relative h-1.5 w-full overflow-hidden bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-500 via-emerald-400 to-blue-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              {/* Corner screws + panel frame */}
              <div className="border-x border-b border-slate-700/40 p-1.5">
                <div className="relative rounded-xl border border-slate-700/40 bg-slate-900/55 px-3 pb-3 pt-2">
                  <div className="pointer-events-none absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-slate-600" />
                  <div className="pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-slate-600" />
                  <div className="pointer-events-none absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-slate-600" />
                  <div className="pointer-events-none absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-slate-600" />
                  <Tabs labels={["Forward: Select parents → child", "Reverse: Target Pal → parents"]}>
                    <ForwardCalculator pals={pals} />
                    <ReverseCalculator pals={pals} />
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Pals */}
        <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                Popular Pals
              </h2>
              <p className="mt-2 text-slate-400">
                Jump straight to high-value Pals players are breeding most often.
              </p>
            </div>
            <Link
              href="/pals"
              className="hidden text-sm font-semibold text-red-500 hover:text-red-400 sm:inline-block"
            >
              View all Pals →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularPals.map((pal) => (
              <PopularPalCard key={pal.internalName} pal={pal} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/pals"
              className="inline-block text-sm font-semibold text-red-500 hover:text-red-400"
            >
              View all Pals →
            </Link>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-y border-slate-800/60 bg-[#020617]/80 py-6 backdrop-blur-sm">
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
                <p>
                  The core math behind every Palworld breeding combo is straightforward once you understand the breeding power formula, but with hundreds of Pals and thousands of possible pairings, manual planning becomes exhausting fast. PalworldBreeding handles the calculation for you, showing exactly which parents produce your target Pal and whether a shorter path exists through intermediate Pals.
                </p>
                <p>
                  Passive skills add another layer of strategy. Traits like Legend, Musclehead, Ferocious, and Artisan can dramatically change how a Pal performs in combat or at your base. By choosing parents with the right skills and checking inheritance odds before you commit resources, you can hatch offspring that fit your build instead of relying on luck.
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
                <p>
                  PalworldBreeding is designed around speed and clarity. The forward breeding calculator instantly tells you the result of pairing any two Pals, while the reverse breeding calculator works backwards from your target and finds the shortest possible route. Combined with the interactive Palworld spawn map, you can move from planning to capture to breeding without switching between tabs or spreadsheets.
                </p>
                <p>
                  Every calculation is powered by up-to-date game data and community-verified breeding formulas, so you can trust the results whether you are breeding for PvP, base automation, or simply collecting your favorite Pals.
                </p>
              </div>
            </article>

            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur-sm">
              <h2 className="mb-4 font-display text-2xl font-bold text-white">Is this official?</h2>
              <p className="leading-relaxed text-slate-400">
                No. This is a fan-made project created by and for the Palworld community. We are players who wanted better tools for tracking complex breeding chains and skill inheritance odds. Our data is sourced from game files and community testing to ensure high accuracy.
              </p>
            </div>

            <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-slate-900/50 p-8 text-center backdrop-blur-sm">
              <h2 className="mb-3 font-display text-2xl font-bold text-white">Start Planning Your Perfect Pal Team</h2>
              <p className="mx-auto max-w-2xl leading-relaxed text-slate-400">
                PalworldBreeding is updated regularly with new Pals, combos, and map data as the game evolves. Bookmark the site, share it with your friends, and keep using the Palworld breeding calculator to build stronger, faster, and more efficient Pals.
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

function PopularPalCard({ pal }: { pal: Pal }) {
  return (
    <Link
      href={`/pal/${pal.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition-all hover:-translate-y-0.5 hover:border-slate-600"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-800/60">
        <Image
          src={getPalImageUrl(pal)}
          alt={pal.name}
          fill
          className="object-contain p-2 transition group-hover:scale-110"
          sizes="64px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">#{pal.number}</p>
        <h3 className="font-display text-lg font-bold text-white truncate">{pal.name}</h3>
        <p className={`text-xs font-medium ${rarityColor(pal.rarity)}`}>{rarityLabel(pal.rarity)}</p>
      </div>
      <span className="text-sm text-slate-500 group-hover:text-red-400">→</span>
    </Link>
  );
}

function StatCapsule({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-1.5 text-sm font-semibold text-slate-200 shadow-sm backdrop-blur-sm">
      <span className="text-slate-400">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function EggIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C7.5 2 4 7.5 4 13c0 3.5 2.5 7 8 7s8-3.5 8-7C20 7.5 16.5 2 12 2zm0 2c2.5 0 5 3.5 5.5 7.5-1-.5-2.5-1-5.5-1s-4.5.5-5.5 1C7 7.5 9.5 4 12 4z" />
    </svg>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5 2c-1.5 0-2.5-1.2-2.5-2.5S6 7 7.5 7 10 8.2 10 9.5 9 12 7.5 12zm9 0c-1.5 0-2.5-1.2-2.5-2.5S15 7 16.5 7 19 8.2 19 9.5 17.8 12 16.5 12zM6 15c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm12 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm-6 3c-2.2 0-4 1.8-4 4h8c0-2.2-1.8-4-4-4z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zM6 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  );
}
