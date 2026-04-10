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
