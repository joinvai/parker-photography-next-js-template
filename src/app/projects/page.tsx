import FounderQuote from "@/components/founder-quote";
import { ProjectsGallery } from "@/components/projects-gallery";
import { getAllProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import type { Metadata } from "next";
import Script from "next/script";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Our Projects | Sire Design",
  description:
    "Explore Sire Design's portfolio of luxury interior design projects showcasing our premium aesthetic and attention to detail.",
  openGraph: {
    title: "Our Projects | Sire Design",
    description:
      "Explore Sire Design's portfolio of luxury interior design projects showcasing our premium aesthetic and attention to detail.",
    type: "website",
    url: "/projects",
  },
  // Add additional meta tags for better SEO
  keywords:
    "interior design, luxury, projects, portfolio, Sire Design, high-end interiors",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  // Add canonical URL to prevent duplicate content issues
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  // Fetch project data on the server - this allows for static generation at build time
  const projects: Project[] = getAllProjects();

  // Basic loading/error state with proper accessibility
  if (!projects || projects.length === 0) {
    return (
      <main
        className="min-h-screen flex items-center justify-center bg-eggshell text-black p-4 sm:p-6"
        id="main-content"
        aria-labelledby="error-heading"
      >
        <div className="text-center" role="alert">
          <h1
            id="error-heading"
            className="text-xl sm:text-2xl font-header mb-2"
          >
            No Projects Available
          </h1>
          <p>Please check back later for our project showcase.</p>
        </div>
      </main>
    );
  }

  // Create the structured data for Schema.org
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Interior Design Projects | Sire Design",
    description:
      "Explore Sire Design's portfolio of luxury interior design projects showcasing our premium aesthetic and attention to detail.",
    url: "https://siredesign.com/projects",
    numberOfItems: projects.length,
  };

  return (
    <main
      className="min-h-screen bg-eggshell text-black pt-24"
      id="main-content"
    >
      {/* Schema.org structured data for better SEO - using next/script to avoid dangerouslySetInnerHTML */}
      <Script id="schema-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      {/* Founder Quote Section */}
      <FounderQuote />

      {/* Projects Gallery - Apply wider container style */}
      <section
        className="pb-12 sm:pb-16 md:pb-20 transition-all duration-300"
        aria-labelledby="projects-section-heading"
      >
        <h1 id="projects-section-heading" className="sr-only">
          Our Interior Design Projects
        </h1>
        {/* Add inner div with padding */}
        <div className="px-2 md:px-12">
          <ProjectsGallery />
        </div>
      </section>
    </main>
  );
}
