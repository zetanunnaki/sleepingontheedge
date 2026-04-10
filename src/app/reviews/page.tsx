import type { Metadata } from "next";
import { ListingPage } from "@/components/article/ListingPage";
import { getAllContent } from "@/lib/content";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lab Reports",
  description:
    "Aggregated product reviews based on thousands of verified buyer reports and published specs — no paid placement.",
  alternates: { canonical: canonical("/reviews") },
};

export default function LabReportsIndexPage() {
  const items = getAllContent("reviews");
  return (
    <ListingPage
      eyebrow="The Bench"
      title={
        <>
          Lab <span className="italic text-indigo-300">reports.</span>
        </>
      }
      description="Aggregated product reviews based on thousands of verified buyer reports and published specs — no paid placement."
      items={items}
      featuredEyebrow="Lab Report"
    />
  );
}
