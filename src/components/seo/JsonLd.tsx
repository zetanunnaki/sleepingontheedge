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

export function personSchema(input: {
  name: string;
  slug: string;
  role: string;
  bio: string;
  credentials: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.role,
    description: input.bio,
    url: `${siteConfig.url}/authors/${input.slug}`,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    knowsAbout: input.credentials,
  };
}

export function softwareAppSchema(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.name,
    description: input.description,
    url: `${siteConfig.url}${input.url}`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

function parsePriceNumeric(price: string): string {
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num.toFixed(2) : "0.00";
}

/**
 * Schema.org Product with Offer — enables Google rich snippets showing
 * price, brand, and (when ratings are added) star ratings in search results.
 */
export function productSchema(input: {
  id: string;
  name: string;
  brand: string;
  price: string;
  image?: string;
  url: string;
  description?: string;
}) {
  const imageUrl = input.image ? `${siteConfig.url}${input.image}` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}${input.url}#product-${input.id}`,
    name: input.name,
    brand: { "@type": "Brand", name: input.brand },
    description: input.description,
    image: imageUrl,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}${input.url}`,
      priceCurrency: "USD",
      price: parsePriceNumeric(input.price),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Amazon",
      },
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/icon.png`,
  };
}

export function articleSchema(item: ContentItem) {
  const url = `${siteConfig.url}${item.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.frontmatter.title,
    description: item.frontmatter.description,
    datePublished: item.frontmatter.date,
    dateModified: item.frontmatter.updated ?? item.frontmatter.date,
    author: {
      "@type": "Organization",
      name: item.frontmatter.author ?? "SleepingOnTheEdge Editorial",
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
      name: item.frontmatter.author ?? "SleepingOnTheEdge Editorial",
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
