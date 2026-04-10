import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllContentAcrossTypes, getAllTags } from "@/lib/content";
import { getAllAuthors } from "@/lib/authors";
import { getAllBrands } from "@/lib/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/best", priority: 0.9 },
    { path: "/reviews", priority: 0.9 },
    { path: "/guides", priority: 0.9 },
    { path: "/tools", priority: 0.8 },
    { path: "/tools/sleep-cycle-calculator", priority: 0.8 },
    { path: "/tools/caffeine-cutoff-calculator", priority: 0.8 },
    { path: "/resources", priority: 0.8 },
    { path: "/compare", priority: 0.7 },
    { path: "/tags", priority: 0.6 },
    { path: "/brands", priority: 0.6 },
    { path: "/search", priority: 0.4 },
    { path: "/glossary", priority: 0.7 },
    { path: "/methodology", priority: 0.7 },
    { path: "/about", priority: 0.5 },
    { path: "/sitemap", priority: 0.3 },
    { path: "/disclaimer", priority: 0.3 },
    { path: "/privacy-policy", priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllContentAcrossTypes().map(
    (item) => ({
      url: `${siteConfig.url}${item.url}`,
      lastModified: new Date(item.frontmatter.date),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${siteConfig.url}/tags/${tag.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const authorRoutes: MetadataRoute.Sitemap = getAllAuthors().map((author) => ({
    url: `${siteConfig.url}/authors/${author.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const brandRoutes: MetadataRoute.Sitemap = getAllBrands().map((brand) => ({
    url: `${siteConfig.url}/brands/${brand.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...tagRoutes,
    ...authorRoutes,
    ...brandRoutes,
  ];
}
