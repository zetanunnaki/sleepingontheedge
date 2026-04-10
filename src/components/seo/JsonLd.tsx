import { siteConfig } from "@/lib/site";
import type { ContentItem } from "@/lib/content";
import { getProduct, getProducts } from "@/lib/products";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function articleSchema(item: ContentItem) {
  const url = `${siteConfig.url}${item.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.frontmatter.title,
    description: item.frontmatter.description,
    datePublished: item.frontmatter.date,
    dateModified: item.frontmatter.date,
    author: {
      "@type": "Organization",
      name: item.frontmatter.author ?? "SleepStackHQ Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: item.frontmatter.featuredImage
      ? `${siteConfig.url}${item.frontmatter.featuredImage}`
      : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

export function reviewSchema(item: ContentItem, productId: string) {
  const product = getProduct(productId);
  if (!product) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: product.name,
      brand: { "@type": "Brand", name: product.brand },
      image: `${siteConfig.url}${product.image}`,
    },
    author: {
      "@type": "Organization",
      name: item.frontmatter.author ?? "SleepStackHQ Editorial",
    },
    datePublished: item.frontmatter.date,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    name: item.frontmatter.title,
    description: item.frontmatter.description,
  };
}

export function itemListSchema(item: ContentItem) {
  const ids = item.frontmatter.productIds ?? [];
  const products = getProducts(ids);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: item.frontmatter.title,
    description: item.frontmatter.description,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: { "@type": "Brand", name: p.brand },
        image: `${siteConfig.url}${p.image}`,
      },
    })),
  };
}
