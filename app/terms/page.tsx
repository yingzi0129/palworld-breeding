import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PalworldBreeding.cc",
  description: "Terms of Service for PalworldBreeding.cc.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">Terms of Service</h1>
        <p className="mb-8 text-sm text-slate-500">Last updated: July 23, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using PalworldBreeding.cc, you agree to be bound by these Terms. If you do not agree, please do not use the
              Site.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">2. Description of Service</h2>
            <p>
              PalworldBreeding.cc is a fan-made, unofficial website that provides breeding calculators, interactive maps, and game
              information for Palworld. We are not affiliated with, endorsed by, or sponsored by Pocketpair, Inc. or the creators of
              Palworld. All game-related data, names, images, and marks are the property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">3. Disclaimer of Warranties</h2>
            <p>
              The Site is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the data is always accurate,
              complete, or up-to-date. Game updates may change breeding mechanics, locations, and stats.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">4. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, or consequential damages
              arising from your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">5. Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at{" "}
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
