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
  featuredImage?: string;
  productIds?: string[];
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
  return {
    slug,
    type,
    url: `${URL_PREFIX[type]}/${slug}`,
    frontmatter: data as Frontmatter,
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
