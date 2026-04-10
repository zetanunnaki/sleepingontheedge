import type { Metadata } from "next";
import { ListingPage } from "@/components/article/ListingPage";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lab Reports",
  description:
    "In-depth, hands-on product reviews. Every report is based on at least 30 nights of real testing.",
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
      description="In-depth, hands-on product reviews. Every report is based on at least 30 nights of real testing — no PR loans, no paid placement."
      items={items}
    />
  );
}
