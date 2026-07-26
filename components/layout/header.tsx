"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const nav = [
  { label: "Home", href: "/" },
  { label: "Map", href: "/map" },
  { label: "Guide", href: "/guide" },
  { label: "Pals", href: "/pals" },
  { label: "About", href: "/about" },
];

const tools = [
  { label: "Breeding Calculator", href: "/" },
  { label: "Shortest Path", href: "/tools/shortest-path" },
  { label: "Passive Skills", href: "/tools/passive-skill" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white no-underline">
          <span className="text-2xl">🥚</span>
          PalworldBreeding.cc
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-bold text-slate-400 transition hover:text-white no-underline"
            >
              {item.label}
            </Link>
          ))}

          <div className="relative" ref={toolsRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 font-display text-sm font-bold text-slate-400 transition hover:text-white"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              Tools
              <svg
                className={`h-4 w-4 transition ${toolsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 py-2 shadow-xl">
                {tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    onClick={() => setToolsOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white no-underline"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/pals"
            className="hidden rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800 no-underline md:inline-flex"
          >
            Search...
          </Link>
          <button
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 no-underline transition hover:bg-slate-800 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-slate-800 pt-2 text-xs font-bold uppercase tracking-wider text-slate-500">Tools</div>
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 no-underline transition hover:bg-slate-800 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
