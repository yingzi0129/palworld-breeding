import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PalworldBreeding.cc",
  description: "Privacy Policy for PalworldBreeding.cc.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">Privacy Policy</h1>
        <p className="mb-8 text-sm text-slate-500">Last updated: July 23, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">1. Information We Collect</h2>
            <p className="mb-2">
              We do not require account registration. The only information you provide is stored locally in your browser via LocalStorage, such as:
            </p>
            <ul className="list-inside list-disc space-y-1 text-slate-400">
              <li>Your &quot;My Box&quot; list of Pals you own</li>
              <li>Your breeding route preferences</li>
              <li>Your map filter preferences</li>
            </ul>
            <p className="mt-2">This data never leaves your device unless you voluntarily share it.</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">2. Automatically Collected Information</h2>
            <p>
              When you visit the Site, we and our third-party service providers may collect IP address, browser type, pages visited, and
              device information for analytics, security, and performance. This data may be processed by Cloudflare (hosting) and Google
              Analytics 4 (if enabled).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">3. Cookies and LocalStorage</h2>
            <p>
              We use LocalStorage for functional preferences. We may use cookies for analytics. You can manage or delete cookies and
              LocalStorage through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">4. Children&apos;s Privacy</h2>
            <p>The Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">5. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:support@palworldbreeding.cc" className="text-sky-400 hover:text-sky-300">
                support@palworldbreeding.cc
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
