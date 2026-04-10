import type { Metadata } from "next";
import { ListingPage } from "@/components/article/ListingPage";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Protocols",
  description:
    "Science-backed, step-by-step protocols for fixing your sleep — from circadian resets to wind-down routines.",
};

export default function ProtocolsIndexPage() {
  const items = getAllContent("guides");
  return (
    <ListingPage
      eyebrow="The Library"
      title={
        <>
          Sleep <span className="italic text-indigo-300">protocols.</span>
        </>
      }
      description="Science-backed, step-by-step protocols for fixing your sleep — from circadian resets to wind-down routines."
      items={items}
    />
  );
}
