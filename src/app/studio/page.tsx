import AboutSection from "@/components/studio/about-section";
import StudioQuote from "@/components/studio/studio-quote";
import TeamPageClient from "@/components/team/team-page-client";
import type { Metadata } from "next";
import { teamData } from "./team";

export const metadata: Metadata = {
  title: "Our Team | Sire Design",
  description:
    "Meet the talented team behind Sire Design's award-winning interior design services.",
  openGraph: {
    title: "Our Team | Sire Design",
    description:
      "Meet the talented team behind Sire Design's award-winning interior design services.",
    type: "website",
    url: "/studio",
  },
  keywords:
    "Sire Design, design team, interior designers, Miami designers, design studio",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "/studio",
  },
};

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-eggshell text-black pt-24">
      <StudioQuote />
      <AboutSection />
      <div className="p-8 md:p-16">
        <h1 className="text-4xl md:text-6xl font-header tracking-tighter mb-12 text-center">
          Our Team
        </h1>
        <TeamPageClient teamData={teamData} />
      </div>
    </main>
  );
}
