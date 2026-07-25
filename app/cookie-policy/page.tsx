import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | PalworldBreeding.cc",
  description: "Cookie Policy for PalworldBreeding.cc.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">Cookie Policy</h1>
        <p className="mb-8 text-sm text-slate-500">Last updated: July 23, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-300">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">1. What Are Cookies?</h2>
            <p>
              Cookies are small files stored on your device to help websites function and improve user experience.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">2. How We Use Cookies and LocalStorage</h2>
            <ul className="list-inside list-disc space-y-1 text-slate-400">
              <li><strong>Essential LocalStorage:</strong> functional preferences such as dark mode, saved Pal box, and map filters.</li>
              <li><strong>Analytics cookies:</strong> if enabled, such as Google Analytics 4, to understand usage.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">3. Managing Cookies</h2>
            <p>
              You can manage, block, or delete cookies through your browser settings. You can also clear LocalStorage for
              palworldbreeding.cc from your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-white">4. Contact Us</h2>
            <p>
              Questions? Email{" "}
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
