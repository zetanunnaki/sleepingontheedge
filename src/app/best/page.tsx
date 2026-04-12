import type { Metadata } from "next";
import { ListingPage } from "@/components/article/ListingPage";
import { getAllContent } from "@/lib/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Edge",
  description:
    "Cutting-edge gear roundups for every side of sleep — supplements, hardware, bedding, and environment. The sharpest picks, based on aggregated buyer reviews.",
  alternates: { canonical: canonical("/best") },
};

export default function StacksIndexPage() {
  const items = getAllContent("roundups");
  return (
    <ListingPage
      eyebrow="The Vault"
      title={
        <>
          Get the <span className="italic text-indigo-300">edge.</span>
        </>
      }
      description="Cutting-edge gear roundups for every side of sleep — supplements, hardware, bedding, and environment."
      items={items}
      featuredEyebrow="Edge Pick"
    />
  );
}
