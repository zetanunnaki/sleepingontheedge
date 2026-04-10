import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllContentAcrossTypes } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/privacy-policy",
  ].map((p) => ({
    url: `${siteConfig.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.5,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllContentAcrossTypes().map(
    (item) => ({
      url: `${siteConfig.url}${item.url}`,
      lastModified: new Date(item.frontmatter.date),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [...staticRoutes, ...articleRoutes];
}
