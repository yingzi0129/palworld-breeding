import { MetadataRoute } from "next";
import { getPals } from "@/lib/data-server";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://palworldbreeding.cc";
  const pals = getPals();

  const staticRoutes = [
    { route: "/", priority: 1.0 },
    { route: "/tools/shortest-path", priority: 0.8 },
    { route: "/tools/passive-skill", priority: 0.8 },
    { route: "/map", priority: 0.8 },
    { route: "/guide", priority: 0.8 },
    { route: "/pals", priority: 0.8 },
    { route: "/privacy", priority: 0.3 },
    { route: "/terms", priority: 0.3 },
    { route: "/cookie-policy", priority: 0.3 },
    { route: "/data-sources", priority: 0.3 },
  ].map(({ route, priority }) => ({
    url: `${base}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority,
  }));

  const palRoutes = pals.map((pal) => ({
    url: `${base}/pal/${pal.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...palRoutes];
}
