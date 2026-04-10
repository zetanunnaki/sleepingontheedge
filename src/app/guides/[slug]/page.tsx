import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getContentItem } from "@/lib/content";
import { canonical } from "@/lib/site";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import { AffiliateDisclaimer } from "@/components/mdx/AffiliateDisclaimer";
import { JsonLd, articleSchema } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs("guides").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentItem("guides", slug);
  if (!item) return {};
  return {
    title: item.frontmatter.seoTitle ?? item.frontmatter.title,
    description: item.frontmatter.description,
    alternates: { canonical: canonical(item.url) },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getContentItem("guides", slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd data={articleSchema(item)} />
      <ArticleLayout
        item={item}
        eyebrow="Protocol"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Protocols", href: "/guides" },
          { label: item.frontmatter.title, href: item.url },
        ]}
      >
        <AffiliateDisclaimer />
        <MDXRenderer source={item.body} />
        <RelatedArticles current={item} />
      </ArticleLayout>
    </>
  );
}
