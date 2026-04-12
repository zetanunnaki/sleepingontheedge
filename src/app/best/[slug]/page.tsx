import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getContentItem } from "@/lib/content";
import { canonical } from "@/lib/site";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import { JsonLd, articleSchema, itemListSchema } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs("roundups").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentItem("roundups", slug);
  if (!item) return {};
  return {
    title: item.frontmatter.seoTitle ?? item.frontmatter.title,
    description: item.frontmatter.description,
    alternates: { canonical: canonical(item.url) },
    openGraph: {
      type: "article",
      title: item.frontmatter.seoTitle ?? item.frontmatter.title,
      description: item.frontmatter.description,
      url: canonical(item.url),
      publishedTime: item.frontmatter.date,
      modifiedTime: item.frontmatter.updated ?? item.frontmatter.date,
      authors: item.frontmatter.author ? [item.frontmatter.author] : undefined,
      tags: item.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: item.frontmatter.seoTitle ?? item.frontmatter.title,
      description: item.frontmatter.description,
    },
  };
}

export default async function RoundupPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getContentItem("roundups", slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd data={articleSchema(item)} />
      <JsonLd data={itemListSchema(item)} />
      <ArticleLayout
        item={item}
        eyebrow="Edge Pick"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "The Edge", href: "/best" },
          { label: item.frontmatter.title, href: item.url },
        ]}
      >
        <MDXRenderer source={item.body} />
        <RelatedArticles current={item} />
      </ArticleLayout>
    </>
  );
}
