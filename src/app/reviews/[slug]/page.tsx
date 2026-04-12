import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getContentItem } from "@/lib/content";
import { canonical } from "@/lib/site";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { MDXRenderer } from "@/components/mdx/MDXRenderer";
import { JsonLd, reviewSchema, productSchema } from "@/components/seo/JsonLd";
import { getProduct } from "@/lib/products";

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

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getContentItem("reviews", slug);
  if (!item) notFound();

  const productId = item.frontmatter.productIds?.[0];
  const review = productId ? reviewSchema(item, productId) : null;
  const product = productId ? getProduct(productId) : null;
  const productLd =
    productId && product
      ? productSchema({
          id: productId,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          url: item.url,
          description: item.frontmatter.description,
        })
      : null;

  return (
    <>
      {review && <JsonLd data={review} />}
      {productLd && <JsonLd data={productLd} />}
      <ArticleLayout
        item={item}
        eyebrow="Lab Report"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Lab Reports", href: "/reviews" },
          { label: item.frontmatter.title, href: item.url },
        ]}
      >
        <MDXRenderer source={item.body} />
        <RelatedArticles current={item} />
      </ArticleLayout>
    </>
  );
}
