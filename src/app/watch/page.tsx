import WatchPageClient from "@/components/watch/watch-page-client"; // Import the new client component
import type { Metadata } from "next";
import { showData } from "./data"; // Keep static data import

// Metadata remains the same
export const metadata: Metadata = {
  title: "Watch Our Shows | Photography Studio",
  description:
    "See our nature photography work featured on documentary series and photography showcases.",
  openGraph: {
    title: "Watch Our Shows | Photography Studio",
    description:
      "See our nature photography work featured on documentary series and photography showcases.",
    type: "website",
    url: "/watch",
  },
  keywords:
    "photography studio, TV appearances, nature documentaries, photography showcases, nature photography shows",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "/watch",
  },
};

// Server component - simpler structure
export default function WatchPage() {
  return (
    <section className="min-h-screen bg-white text-black pt-24">
      <div
        className="relative mb-12 sm:mb-16 md:mb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto"
        aria-labelledby="page-introduction"
      >
        <h1 id="page-introduction" className="sr-only">
          Parker Photography TV Appearances
        </h1>
        <blockquote className="overflow-visible pt-24 not-italic whitespace-normal break-normal font-header text-[18px] leading-[24px] text-center tracking-[-0.25px] min-[1920px]:text-[24px] min-[1920px]:leading-[36px] max-[479px]:text-[16px] max-[479px]:leading-[24px] max-w-4xl mx-auto text-black">
          <p>
            Parker Photography shines on TV, captivating audiences with Parker's
            transformative creativity,{" "}
            <br className="hidden sm:block" /> showcased on various nature documentary series and photography showcases.
          </p>
        </blockquote>
      </div>
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
        <WatchPageClient showData={showData} />
      </div>
    </section>
  );
}
