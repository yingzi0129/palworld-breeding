import { getPals } from "./data-client";
import type { Pal } from "./types";

function normalizeSlug(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function buildAliasMap(pals: Pal[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const pal of pals) {
    const nameSlug = normalizeSlug(pal.name);
    if (nameSlug && nameSlug !== pal.slug && !map[nameSlug]) {
      map[nameSlug] = pal.slug;
    }
    const internalSlug = normalizeSlug(pal.internalName);
    if (internalSlug && internalSlug !== pal.slug && internalSlug !== nameSlug && !map[internalSlug]) {
      map[internalSlug] = pal.slug;
    }
  }
  return map;
}

let aliasMap: Record<string, string> | null = null;

export function getAliasMap(): Record<string, string> {
  if (!aliasMap) {
    aliasMap = buildAliasMap(getPals());
  }
  return aliasMap;
}

export function resolveSlug(slug: string): string {
  const map = getAliasMap();
  return map[slug] || slug;
}
