import WatchPageClient from "@/components/watch/watch-page-client"; // Import the new client component
import type { Metadata } from "next";
import { showData } from "./data"; // Keep static data import

// Metadata remains the same
export const metadata: Metadata = {
  title: "Watch Our Shows | Sire Design",
  description:
    "See Sire Design clients featured on hit shows like HGTV's Divided by Design and Netflix's Designing Miami.",
  openGraph: {
    title: "Watch Our Shows | Sire Design",
    description:
      "See Sire Design clients featured on hit shows like HGTV's Divided by Design and Netflix's Designing Miami.",
    type: "website",
    url: "/watch",
  },
  keywords:
    "Sire Design, TV appearances, HGTV, Netflix, Divided by Design, Designing Miami, interior design shows",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "/watch",
  },
};

// Server component - simpler structure
export default function WatchPage() {
  return (
    <main className="min-h-screen bg-eggshell text-black pt-24">
      <div
        className="relative mb-12 sm:mb-16 md:mb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto"
        aria-labelledby="page-introduction"
      >
        <h1 id="page-introduction" className="sr-only">
          Sire Design TV Appearances
        </h1>
        <blockquote className="overflow-visible p-0 not-italic whitespace-normal break-normal font-header text-[18px] leading-[24px] text-center tracking-[-0.25px] min-[1920px]:text-[24px] min-[1920px]:leading-[36px] max-[479px]:text-[16px] max-[479px]:leading-[24px] max-w-4xl mx-auto text-black">
          <p>
            Sire Design shines on TV, captivating audiences with Eilyn and Ray
            Jimenez's transformative creativity,{" "}
            <br className="hidden sm:block" /> showcased on HGTV's "Divided by
            Design" and Netflix's "Designing Miami".
          </p>
        </blockquote>
      </div>
      <WatchPageClient showData={showData} />
    </main>
  );
}
