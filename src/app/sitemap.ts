import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllContentAcrossTypes } from "@/lib/content";
import { getAllComparisonSlugs } from "@/lib/comparisons";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/best",
    "/reviews",
    "/guides",
    "/tools",
    "/tools/sleep-cycle-calculator",
    "/tools/caffeine-cutoff-calculator",
    "/resources",
    "/compare",
    "/terms",
    "/tools/sleep-edge-quiz",
    "/tags",
    "/brands",
    // /search excluded — blocked in robots.txt
    "/glossary",
    "/methodology",
    "/about",
    "/sitemap",
    "/disclaimer",
    "/privacy-policy",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllContentAcrossTypes().map(
    (item) => ({
      url: `${siteConfig.url}${item.url}`,
      lastModified: new Date(item.frontmatter.updated ?? item.frontmatter.date),
    }),
  );

  const latestArticleDate =
    articleRoutes.length > 0
      ? articleRoutes.reduce((latest, r) => {
          const d = r.lastModified as Date;
          return d > latest ? d : latest;
        }, new Date(0))
      : now;

  const compareRoutes: MetadataRoute.Sitemap = getAllComparisonSlugs().map(
    (slug) => ({
      url: `${siteConfig.url}/compare/${slug}`,
      lastModified: latestArticleDate,
    }),
  );

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...compareRoutes,
  ];
}
