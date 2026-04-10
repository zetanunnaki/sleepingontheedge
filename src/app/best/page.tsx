import type { Metadata } from "next";
import { ListingPage } from "@/components/article/ListingPage";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stacks",
  description:
    "Vetted gear roundups for every layer of your sleep optimization stack — supplements, hardware, and environment.",
};

export default function StacksIndexPage() {
  const items = getAllContent("roundups");
  return (
    <ListingPage
      eyebrow="The Vault"
      title={
        <>
          Sleep <span className="italic text-indigo-300">stacks.</span>
        </>
      }
      description="Vetted gear roundups for every layer of your sleep optimization stack — supplements, hardware, and environment."
      items={items}
      featuredEyebrow="Stack"
    />
  );
}
