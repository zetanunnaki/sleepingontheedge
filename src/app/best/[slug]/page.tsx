import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getContentItem } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { AffiliateDisclaimer } from "@/components/mdx/AffiliateDisclaimer";
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
      <ArticleLayout item={item} backHref="/" backLabel="All roundups">
        <AffiliateDisclaimer />
        <MDXRemote source={item.body} components={mdxComponents} />
      </ArticleLayout>
    </>
  );
}
