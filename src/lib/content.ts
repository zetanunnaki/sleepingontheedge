import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentType = "roundups" | "reviews" | "guides";

export interface Frontmatter {
  title: string;
  seoTitle?: string;
  description: string;
  author?: string;
  date: string;
  updated?: string;
  featuredImage?: string;
  productIds?: string[];
  tags?: string[];
}

export interface TocHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}

export interface ContentItem {
  slug: string;
  type: ContentType;
  url: string;
  frontmatter: Frontmatter;
  body: string;
  readingTime: number;
  toc: TocHeading[];
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractToc(body: string): TocHeading[] {
  const lines = body.split(/\r?\n/);
  const headings: TocHeading[] = [];
  let inFence = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (match) {
      const depth = match[1].length === 2 ? 2 : 3;
      const text = match[2].replace(/[*_`]/g, "").trim();
      headings.push({ depth: depth as 2 | 3, text, id: slugify(text) });
    }
  }
  return headings;
}

function computeReadingTime(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>~\-]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");
const PUBLIC_ROOT = path.join(process.cwd(), "public");

function publicAssetExists(relPath: string | undefined): boolean {
  if (!relPath) return false;
  const normalized = relPath.startsWith("/") ? relPath.slice(1) : relPath;
  return fs.existsSync(path.join(PUBLIC_ROOT, normalized));
}

const URL_PREFIX: Record<ContentType, string> = {
  roundups: "/best",
  reviews: "/reviews",
  guides: "/guides",
};

function readDirSafe(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllSlugs(type: ContentType): string[] {
  const dir = path.join(CONTENT_ROOT, type);
  return readDirSafe(dir).map((f) => f.replace(/\.mdx?$/, ""));
}

export function getContentItem(
  type: ContentType,
  slug: string,
): ContentItem | null {
  const dir = path.join(CONTENT_ROOT, type);
  const candidates = [
    path.join(dir, `${slug}.mdx`),
    path.join(dir, `${slug}.md`),
  ];
  const filePath = candidates.find((p) => fs.existsSync(p));
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;
  // Drop image references for files that don't actually exist on disk
  // so the UI can fall back to a branded placeholder.
  if (!publicAssetExists(frontmatter.featuredImage)) {
    frontmatter.featuredImage = undefined;
  }
  return {
    slug,
    type,
    url: `${URL_PREFIX[type]}/${slug}`,
    frontmatter,
    body: content,
    readingTime: computeReadingTime(content),
    toc: extractToc(content),
  };
}

export function getAllContent(type: ContentType): ContentItem[] {
  return getAllSlugs(type)
    .map((slug) => getContentItem(type, slug))
    .filter((x): x is ContentItem => x !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getAllContentAcrossTypes(): ContentItem[] {
  const types: ContentType[] = ["roundups", "reviews", "guides"];
  return types
    .flatMap((t) => getAllContent(t))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function tagSlug(tag: string): string {
  return slugify(tag);
}

export interface TagSummary {
  slug: string;
  name: string;
  count: number;
}

export function getAllTags(): TagSummary[] {
  const counts = new Map<string, { name: string; count: number }>();
  for (const item of getAllContentAcrossTypes()) {
    for (const tag of item.frontmatter.tags ?? []) {
      const slug = tagSlug(tag);
      const entry = counts.get(slug);
      if (entry) {
        entry.count += 1;
      } else {
        counts.set(slug, { name: tag, count: 1 });
      }
    }
  }
  return Array.from(counts.entries())
    .map(([slug, { name, count }]) => ({ slug, name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getContentByTag(slug: string): ContentItem[] {
  return getAllContentAcrossTypes().filter((item) =>
    (item.frontmatter.tags ?? []).some((t) => tagSlug(t) === slug),
  );
}

export function getTagBySlug(slug: string): TagSummary | null {
  return getAllTags().find((t) => t.slug === slug) ?? null;
}

export function getReviewByProductId(productId: string): ContentItem | null {
  return (
    getAllContent("reviews").find((r) =>
      r.frontmatter.productIds?.includes(productId),
    ) ?? null
  );
}
