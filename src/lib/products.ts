import productsData from "@/data/products.json";

export interface Product {
  name: string;
  brand: string;
  price: string;
  image: string;
  amazonLink: string;
  walmartLink: string;
  pros: string[];
  cons: string[];
}

const products = productsData as Record<string, Product>;

export function getProduct(id: string): Product | null {
  return products[id] ?? null;
}

export function getProducts(ids: string[]): Array<Product & { id: string }> {
  return ids
    .map((id) => {
      const p = products[id];
      return p ? { id, ...p } : null;
    })
    .filter((x): x is Product & { id: string } => x !== null);
}

export function getAllProductIds(): string[] {
  return Object.keys(products);
}

export function getAllProducts(): Array<Product & { id: string }> {
  return Object.entries(products).map(([id, p]) => ({ id, ...p }));
}

export function brandSlug(brand: string): string {
  return brand
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export interface BrandSummary {
  slug: string;
  name: string;
  productCount: number;
  products: Array<Product & { id: string }>;
}

export function getAllBrands(): BrandSummary[] {
  const map = new Map<string, BrandSummary>();
  for (const [id, p] of Object.entries(products)) {
    const slug = brandSlug(p.brand);
    const existing = map.get(slug);
    if (existing) {
      existing.productCount += 1;
      existing.products.push({ id, ...p });
    } else {
      map.set(slug, {
        slug,
        name: p.brand,
        productCount: 1,
        products: [{ id, ...p }],
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getBrandBySlug(slug: string): BrandSummary | null {
  return getAllBrands().find((b) => b.slug === slug) ?? null;
}
