import { getAllContentAcrossTypes } from "@/lib/content";

export const dynamic = "force-static";

const TYPE_LABEL: Record<string, string> = {
  roundups: "Stack",
  reviews: "Lab Report",
  guides: "Protocol",
};

export function GET() {
  const items = getAllContentAcrossTypes();
  const index = items.map((item) => ({
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    url: item.url,
    type: item.type,
    typeLabel: TYPE_LABEL[item.type],
    tags: item.frontmatter.tags ?? [],
    date: item.frontmatter.date,
    readingTime: item.readingTime,
  }));

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
