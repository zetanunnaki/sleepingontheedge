"use client";

import {
  trackAffiliateClick,
  type AffiliateRetailer,
} from "@/lib/analytics";

interface TrackedAffiliateLinkProps {
  href: string;
  productId: string;
  productName: string;
  brand: string;
  price?: string;
  retailer: AffiliateRetailer;
  /** Where the click happened — used for GA4 funnel attribution */
  location: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

/**
 * Affiliate link wrapper that fires GA4 events on click.
 *
 * Always uses target="_blank" and rel="sponsored nofollow noopener" to
 * comply with Amazon Associates and Walmart Associates terms.
 *
 * The onClick fires GA4 events synchronously. The browser still navigates
 * normally — the new tab opens immediately. The event is sent in the
 * background and isn't blocked by the navigation.
 */
export function TrackedAffiliateLink({
  href,
  productId,
  productName,
  brand,
  price,
  retailer,
  location,
  className,
  ariaLabel,
  children,
}: TrackedAffiliateLinkProps) {
  function onClick() {
    trackAffiliateClick({
      productId,
      productName,
      brand,
      price,
      retailer,
      location,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
