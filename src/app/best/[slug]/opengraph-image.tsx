import { getAllSlugs, getContentItem } from "@/lib/content";
import { articleOgImage, ogSize } from "@/components/seo/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "SleepingOnTheEdge stack roundup";

export function generateStaticParams() {
  return getAllSlugs("roundups").map((slug) => ({ slug }));
}

interface OgProps {
  params: { slug: string };
}

export default function Image({ params }: OgProps) {
  const item = getContentItem("roundups", params.slug);
  return articleOgImage({
    type: "Edge Pick",
    title: item?.frontmatter.title ?? "SleepingOnTheEdge",
  });
}
