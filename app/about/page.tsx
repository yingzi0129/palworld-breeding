import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ORG_NAME, SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About ${SITE_NAME}`,
  description: `Learn about ${SITE_NAME}: a fan-made Palworld companion for breeding calculations, shortest paths, passive skills, and spawn locations.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const aboutUrl = `${SITE_URL}/about`;
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: `About ${SITE_NAME}`,
            url: aboutUrl,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": aboutUrl,
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
            },
          }}
        />
        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">About {SITE_NAME}</h1>
        <p className="mb-8 text-slate-400">
          A fan-made companion built for Palworld players who want to breed smarter, not harder.
        </p>

        <div className="space-y-6">
          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">What we do</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              {SITE_NAME} is an unofficial tool that helps players plan breeding chains, calculate passive skill inheritance odds, find the shortest path to any target Pal, and locate wild Pal spawn points on an interactive map.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Our goal is to turn raw game data into actionable, beginner-friendly insights. Whether you are chasing your first Anubis or optimizing a legendary roster, the tools here are designed to save time and remove guesswork.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Data sources</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              Game data is sourced from community datamining and publicly available Palworld resources. Spawn locations are based on community-generated maps and in-game observations.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              See the <Link href="/data-sources" className="text-red-500 hover:text-red-400">Data Sources</Link> page for a full list of attributions and third-party credits.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Update frequency</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              We update the database after major Palworld patches to reflect new Pals, balance changes, and newly discovered breeding rules. Minor fixes and spawn coordinate improvements are rolled out continuously.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Disclaimer</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {SITE_NAME} is a fan-made project and is not affiliated with Pocketpair, Inc. Palworld and all related marks, characters, and assets belong to their respective owners. All information is provided as-is for educational and entertainment purposes.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-xl font-semibold text-white">Contact</h2>
            <p className="mb-3 text-sm leading-relaxed text-slate-300">
              Questions, bug reports, or feature requests? Reach out via email or open an issue on GitHub.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:support@palworldbreeding.cc"
                className="btn-secondary inline-flex text-sm no-underline"
              >
                Email us
              </a>
              <a
                href="https://github.com/yingzi0129/palworld-breeding"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex text-sm no-underline"
              >
                GitHub
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
