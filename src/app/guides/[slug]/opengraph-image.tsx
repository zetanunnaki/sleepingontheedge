import { getAllSlugs, getContentItem } from "@/lib/content";
import { articleOgImage, ogSize } from "@/components/seo/og-template";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "SleepingOnTheEdge protocol";

export function generateStaticParams() {
  return getAllSlugs("guides").map((slug) => ({ slug }));
}

interface OgProps {
  params: { slug: string };
}

export default function Image({ params }: OgProps) {
  const item = getContentItem("guides", params.slug);
  return articleOgImage({
    type: "Protocol",
    title: item?.frontmatter.title ?? "SleepingOnTheEdge",
  });
}
