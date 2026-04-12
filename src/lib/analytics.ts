/**
 * GA4 affiliate click tracking — safe gtag wrapper.
 *
 * All functions here no-op silently if gtag isn't loaded yet (e.g., during
 * SSR, before the GA script loads, or when no measurement ID is set).
 *
 * Replace GA_MEASUREMENT_ID in src/components/analytics/GoogleAnalytics.tsx
 * with your real GA4 ID once you have one. Until then, these calls do nothing
 * but the call sites are wired correctly — flip the script on and you have
 * tracking from day one.
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

export type AffiliateRetailer = "amazon" | "walmart";

export interface AffiliateClickParams {
  productId: string;
  productName: string;
  brand: string;
  /** Display price as shown to the user, e.g. "$199.99" */
  price?: string;
  retailer: AffiliateRetailer;
  /**
   * Where the click happened — useful for funnel analysis.
   * Examples: "homepage_featured", "product_card", "comparison_table",
   * "inline_mention", "review_page", "roundup_dual_button"
   */
  location: string;
}

function parsePrice(price?: string): number | undefined {
  if (!price) return undefined;
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : undefined;
}

/**
 * Fire GA4 events for an affiliate link click.
 *
 * Sends two events:
 * 1. `select_item` — GA4's standard ecommerce event, populates the
 *    Monetization → Ecommerce purchases reports automatically.
 * 2. `affiliate_click` — custom event with extra fields for custom reports
 *    and BigQuery exports.
 */
export function trackAffiliateClick(params: AffiliateClickParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const numericPrice = parsePrice(params.price);

  // GA4 standard ecommerce event
  window.gtag("event", "select_item", {
    item_list_id: params.location,
    item_list_name: params.location.replace(/_/g, " "),
    items: [
      {
        item_id: params.productId,
        item_name: params.productName,
        item_brand: params.brand,
        item_category: "sleep_product",
        affiliation: params.retailer,
        price: numericPrice,
        currency: "USD",
        quantity: 1,
      },
    ],
  });

  // Custom event for richer custom reports
  window.gtag("event", "affiliate_click", {
    product_id: params.productId,
    product_name: params.productName,
    brand: params.brand,
    retailer: params.retailer,
    price: numericPrice,
    currency: "USD",
    location: params.location,
  });
}
