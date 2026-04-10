import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ListingPage } from "@/components/article/ListingPage";
import { getAllTags, getContentByTag, getTagBySlug } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) return {};
  return {
    title: `#${tag.name}`,
    description: `All SleepStackHQ articles tagged ${tag.name}.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) notFound();
  const items = getContentByTag(slug);

  return (
    <ListingPage
      eyebrow={`Tag · ${tag.count} ${tag.count === 1 ? "article" : "articles"}`}
      title={
        <>
          Tagged{" "}
          <span className="italic text-indigo-300">#{tag.name.toLowerCase()}</span>
        </>
      }
      description={`Every SleepStackHQ stack, lab report, and protocol filed under ${tag.name}.`}
      items={items}
    />
  );
}
