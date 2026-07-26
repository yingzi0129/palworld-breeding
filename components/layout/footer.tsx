import Link from "next/link";

const footerLinks = {
  site: [
    { label: "Breeding Calc", href: "/" },
    { label: "Pal List", href: "/pals" },
    { label: "Map", href: "/map" },
    { label: "Guide", href: "/guide" },
    { label: "About", href: "/about" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Data Sources", href: "/data-sources" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-900 text-sm">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-14 md:grid-cols-3 md:px-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
            <span className="text-2xl">🥚</span>
            PalworldBreeding.cc
          </div>
          <p className="max-w-xs leading-relaxed text-slate-400">
            The ultimate companion for Palworld trainers. Master the breeding farm and conquer the archipelago with data-driven insights.
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PalworldBreeding.cc. Fan-made tool. Not affiliated with Pocketpair.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="mb-4 text-sm font-semibold text-white">Site</h5>
            <ul className="space-y-2">
              {footerLinks.site.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-500 transition hover:text-slate-200 no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-sm font-semibold text-white">Legal</h5>
            <ul className="space-y-2">
              {footerLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-500 transition hover:text-slate-200 no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="text-sm font-semibold text-white">Connect</h5>
          <p className="text-sm text-slate-400">
            Questions or feedback? Reach out or find us on GitHub.
          </p>
          <a
            href="mailto:support@palworldbreeding.cc"
            className="inline-flex items-center gap-2 text-sm font-mono text-red-500 transition hover:text-red-400 no-underline"
          >
            ✉ support@palworldbreeding.cc
          </a>
        </div>
      </div>

      <div className="border-t border-slate-800/50 px-6 py-6 text-center md:px-12">
        <p className="text-xs text-slate-500">
          Fan-made tool. Not affiliated with Pocketpair, Inc. Palworld and related marks belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
