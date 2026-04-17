import { articleOgImage, ogSize } from "@/components/seo/og-template";
import { getAllComparisonSlugs, getComparisonBySlug } from "@/lib/comparisons";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "SleepingOnTheEdge product comparison";

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}

interface OgProps {
  params: { slug: string };
}

export default function Image({ params }: OgProps) {
  const comp = getComparisonBySlug(params.slug);
  return articleOgImage({
    type: "Head to Head",
    title: comp?.question ?? "Product Comparison",
  });
}
