import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getContentItem } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { AffiliateDisclaimer } from "@/components/mdx/AffiliateDisclaimer";
import { JsonLd, reviewSchema } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs("reviews").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentItem("reviews", slug);
  if (!item) return {};
  return {
    title: item.frontmatter.seoTitle ?? item.frontmatter.title,
    description: item.frontmatter.description,
  };
}

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getContentItem("reviews", slug);
  if (!item) notFound();

  const productId = item.frontmatter.productIds?.[0];
  const review = productId ? reviewSchema(item, productId) : null;

  return (
    <>
      {review && <JsonLd data={review} />}
      <ArticleLayout
        item={item}
        eyebrow="Lab Report"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Lab Reports", href: "/reviews" },
          { label: item.frontmatter.title, href: item.url },
        ]}
      >
        <AffiliateDisclaimer />
        <MDXRemote source={item.body} components={mdxComponents} />
        <RelatedArticles current={item} />
      </ArticleLayout>
    </>
  );
}
