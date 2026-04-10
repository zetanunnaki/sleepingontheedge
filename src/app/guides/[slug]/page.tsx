import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getContentItem } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { mdxComponents } from "@/components/mdx/mdx-components";
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
        <MDXRemote source={item.body} components={mdxComponents} />
        <RelatedArticles current={item} />
      </ArticleLayout>
    </>
  );
}
