"use client";

import Image from "next/image";
import Link from "next/link";
import type { Pal } from "@/lib/types";
import { getPalImageUrl, getElementClass, rarityColor, rarityLabel } from "@/lib/data-client";

interface PalCardProps {
  pal: Pal;
  href?: string;
  compact?: boolean;
}

export function PalCard({ pal, href, compact }: PalCardProps) {
  const content = (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-800">
        <Image
          src={getPalImageUrl(pal)}
          alt={pal.name}
          fill
          className="object-contain p-1"
          sizes="48px"
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">#{pal.number}</span>
          <span className={`text-xs font-medium ${rarityColor(pal.rarity)}`}>{rarityLabel(pal.rarity)}</span>
        </div>
        <div className="truncate font-display font-semibold text-slate-100">{pal.name}</div>
        {!compact && (
          <div className="flex gap-2 text-xs">
            {pal.elements.map((e) => (
              <span key={e} className={getElementClass(e)}>
                {e}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const className =
    "card block transition hover:border-slate-600 hover:bg-slate-800/50 no-underline";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return <div className={className}>{content}</div>;
}
