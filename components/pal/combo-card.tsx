"use client";

import Link from "next/link";
import Image from "next/image";
import type { Pal } from "@/lib/types";
import { getPalImageUrl, rarityColor, rarityLabel } from "@/lib/data-client";

interface ComboCardProps {
  parentA: Pal;
  parentB: Pal;
  child?: Pal | null;
}

function ParentItem({ pal }: { pal: Pal }) {
  return (
    <Link
      href={`/pal/${pal.slug}`}
      className="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-700/60 bg-slate-800/60 p-2 transition hover:border-slate-500 hover:bg-slate-700/40 no-underline"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-900">
        <Image
          src={getPalImageUrl(pal)}
          alt={pal.name}
          fill
          className="object-contain p-1"
          sizes="40px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] leading-none text-slate-500">#{pal.number}</div>
        <div className="break-words font-display text-sm font-semibold leading-tight text-slate-100">
          {pal.name}
        </div>
        <div className={`text-[11px] leading-none ${rarityColor(pal.rarity)}`}>{rarityLabel(pal.rarity)}</div>
      </div>
    </Link>
  );
}

export function ComboCard({ parentA, parentB, child }: ComboCardProps) {
  return (
    <div className="glass-card flex flex-col gap-2.5 overflow-hidden rounded-2xl p-4">
      <div className="flex min-w-0 flex-col gap-2.5">
        <ParentItem pal={parentA} />
        <ParentItem pal={parentB} />
      </div>
      {child && (
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-red-500/20 bg-red-950/20 p-2">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-slate-900">
            <Image
              src={getPalImageUrl(child)}
              alt={child.name}
              fill
              className="object-contain p-1"
              sizes="36px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] leading-none text-slate-500">Result</div>
            <div className="break-words font-display text-sm font-semibold leading-tight text-slate-100">
              {child.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
