import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Sources & Attribution | PalworldBreeding.cc",
  description: "Data sources, attribution, and disclaimer for PalworldBreeding.cc.",
  alternates: { canonical: "/data-sources" },
};

export default function DataSourcesPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">Data Sources & Attribution</h1>

        <div className="space-y-6 text-sm leading-relaxed text-slate-300">
          <p>
            PalworldBreeding.cc is a fan-made, unofficial tool. It is not affiliated with or endorsed by{" "}
            <strong>Pocketpair, Inc.</strong>, the developer of Palworld. Palworld and all related marks, characters, images, and data
            belong to their respective owners.
          </p>

          <section className="card">
            <h2 className="mb-3 text-lg font-semibold text-white">Data Sources</h2>
            <ul className="list-inside list-disc space-y-2 text-slate-400">
              <li>
                <strong>Breeding combinations and formulas:</strong>{" "}
                <a href="https://github.com/tylercamp/palcalc" target="_blank" rel="noopener noreferrer">
                  tylercamp/palcalc
                </a>{" "}
                (MIT License)
              </li>
              <li>
                <strong>Pal base stats, passive skills, and spawn data:</strong> community datamining and palcalc
              </li>
              <li>
                <strong>Map tiles:</strong> OpenStreetMap / CARTO (CC BY-SA)
              </li>
              <li>
                <strong>Images/icons:</strong> official game assets / community extracts, used for informational purposes only
              </li>
            </ul>
          </section>

          <section className="card">
            <h2 className="mb-3 text-lg font-semibold text-white">Disclaimer</h2>
            <p>
              All calculations are estimates based on community data and game formulas as of the last update date. Game updates may change
              mechanics. We do not guarantee accuracy. Please verify in-game before making breeding decisions.
            </p>
          </section>

          <section className="card">
            <h2 className="mb-3 text-lg font-semibold text-white">DMCA / Takedown Requests</h2>
            <p>
              If you believe any content on this site infringes your rights, please contact us at{" "}
              <a href="mailto:legal@palworldbreeding.cc" className="text-sky-400 hover:text-sky-300">
                legal@palworldbreeding.cc
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
