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
    <main className="min-h-screen text-black p-8 md:p-16">
      {/* Title can remain here or be moved to client component if it needs animation */}
      <h1 className="text-4xl md:text-6xl font-geist-mono tracking-tighter mb-12 text-center">
        Watch Our Shows
      </h1>
      {/* Render the client component, passing the data */}
      <WatchPageClient showData={showData} />
    </main>
  );
}
