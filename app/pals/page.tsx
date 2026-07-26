import type { Metadata } from "next";
import { getPals } from "@/lib/data-server";
import { PalsListClient } from "@/components/pals/pals-list-client";

export const metadata: Metadata = {
  title: "Complete Pal List | PalworldBreeding.cc",
  description:
    "Browse all 299 Pals in Palworld. Filter by element, search by name, and click any Pal to see breeding combos, stats, passive skills, and spawn locations.",
  alternates: {
    canonical: "/pals",
  },
  openGraph: {
    title: "Complete Pal List | PalworldBreeding.cc",
    description: "Browse all 299 Pals in Palworld with breeding combos, stats, and locations.",
    url: "https://palworldbreeding.cc/pals",
  },
};

export default function PalsPage() {
  const pals = getPals();
  return <PalsListClient pals={pals} />;
}
