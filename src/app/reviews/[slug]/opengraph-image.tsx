import { getAllSlugs, getContentItem } from "@/lib/content";
import { articleOgImage, ogSize } from "@/components/seo/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "SleepingOnTheEdge lab report";

export function generateStaticParams() {
  return getAllSlugs("reviews").map((slug) => ({ slug }));
}

interface OgProps {
  params: { slug: string };
}

export default function Image({ params }: OgProps) {
  const item = getContentItem("reviews", params.slug);
  return articleOgImage({
    type: "Lab Report",
    title: item?.frontmatter.title ?? "SleepingOnTheEdge",
  });
}
