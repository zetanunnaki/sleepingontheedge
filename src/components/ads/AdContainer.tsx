import { AdSlot } from "./AdSlot";

/**
 * Top ad — sits between the header and main content.
 * Horizontal leaderboard format, blends into the dark design.
 */
export function TopAd() {
  return (
    <div className="relative z-10 border-b border-white/[0.04]">
      <AdSlot slot="YOUR_TOP_AD_SLOT_ID" format="horizontal" position="top" />
    </div>
  );
}

/**
 * Bottom ad — sits between the main content and the footer.
 * Responsive format, blends into the dark design.
 */
export function BottomAd() {
  return (
    <div className="relative z-10 border-t border-white/[0.04]">
      <AdSlot
        slot="YOUR_BOTTOM_AD_SLOT_ID"
        format="auto"
        position="bottom"
      />
    </div>
  );
}
