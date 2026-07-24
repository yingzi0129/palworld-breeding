import { MetadataRoute } from "next";
import { getPals } from "@/lib/data-server";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://palworldbreeding.cc";
  const pals = getPals();
  const seedSlugs = [
    "anubis",
    "jetragon",
    "frostallion",
    "shadowbeak",
    "lamball",
    "relaxaurus",
    "mossanda",
    "lyleen",
    "penking",
    "bushi",
    "suzaku",
    "blazamut",
    "niteowl",
    "lovander",
    "wumpo-botan",
  ];

  const staticRoutes = [
    "/",
    "/tools/shortest-path",
    "/tools/passive-skill",
    "/map",
    "/guide",
    "/privacy",
    "/terms",
    "/cookie-policy",
    "/data-sources",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.7,
  }));

  const palRoutes = seedSlugs
    .map((slug) => {
      const pal = pals.find((p) => p.slug === slug);
      if (!pal) return null;
      return {
        url: `${base}/pal/${pal.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  return [...staticRoutes, ...palRoutes];
}
