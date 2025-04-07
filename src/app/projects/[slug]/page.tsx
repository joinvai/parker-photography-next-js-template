'use client'; // Make this a client component to use state hooks

import { useState } from 'react'; // Import useState
import { getProjectById, getAllProjects } from '@/lib/projects'; // Import data functions and type (using type keyword for Project)
import type { Project } from '@/lib/projects';
import { ProjectImage } from '@/components/project-image'; // Import the image component
import { notFound } from 'next/navigation';
import type { Metadata } from 'next'; // Use type keyword for Metadata
import React from 'react'; // Import React
import dynamic from 'next/dynamic'; // Import dynamic for lazy loading client components
import IndividualProjectImage from '@/components/individual-project/individual-project-image';

// Dynamically import the client component for lightbox functionality
const ProjectImageWithLightbox = dynamic(() => import('@/components/project/project-image-with-lightbox'), {
  ssr: false, // Disable SSR for lightbox component
  loading: () => (
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full" aria-hidden="true" />
  ),
});

// Define the params type for generateMetadata
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Function to generate metadata for the page (Server-side)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project: Project | undefined = getProjectById(params.slug);

  if (!project) {
    // Return default metadata if project not found
    return {
      title: 'Project Not Found',
    };
  }

  // Return dynamic metadata based on project data
  return {
    title: `${project.name} (${project.year}) | Sire Design`,
    description: project.description || `View details and photos of the ${project.name} interior design project by Sire Design, completed in ${project.year}.`,
    openGraph: {
      title: `${project.name} (${project.year}) | Sire Design`,
      description: project.description || `View details and photos of the ${project.name} interior design project by Sire Design, completed in ${project.year}.`,
      type: 'website',
      url: `/projects/${project.id}`,
    }
  };
}

// Function to generate static paths for dynamic routes at build time (Server-side)
export async function generateStaticParams() {
  const projects: Project[] = getAllProjects(); // Fetch all projects

  // Map projects to the format required by generateStaticParams
  // Ensure project.id exists and is the correct field for slugs
  return projects.map((project) => ({
    slug: project.id,
  }));
}

// The main page component (NOW A CLIENT COMPONENT)
export default function ProjectPage({ params }: { params: { slug: string } }) {
  // Fetch the specific project data based on the slug
  const project: Project | undefined = getProjectById(params.slug);
  
  // State for lightbox visibility and current image index
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

  // Handler function to open the lightbox
  const openLightbox = (index: number) => {
    setCurrentLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Handler function to close the lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  // Handle project not found case using Next.js's notFound helper
  // If the project is not found after build, this will trigger a 404
  if (!project) {
    notFound();
  }

  return (
    <main 
      className="min-h-screen bg-white text-black pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 transition-all duration-300"
      aria-labelledby="project-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Project Title and Year */}
        <h1 
          id="project-title" 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 md:mb-12 tracking-tight transition-all duration-300"
        >
          {project.name} <span className="text-gray-500">({project.year})</span>
        </h1>

        {/* Enhanced Hero Image Section */}
        {project.photos && project.photos.length > 0 && (
          <section 
            aria-label="Project hero image"
            className="mb-8 sm:mb-12 md:mb-16 -mx-4 sm:-mx-6 md:-mx-8"
          >
            <div className="w-screen max-w-[100vw] relative overflow-hidden">
              <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="aspect-[21/9] sm:aspect-[2/1] md:aspect-[21/9] w-full overflow-hidden rounded-lg shadow-lg">
                  <ProjectImageWithLightbox
                    project={project}
                    imageIndex={0}
                    priority={true}
                    aspectRatio="aspect-[21/9]"
                    isAboveFold={true}
                    className="w-full h-full transition-transform duration-700 hover:scale-105"
                    imageClassName="object-cover object-center"
                    data-testid="hero-image-lightbox"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Photo Grid Section */}
        {project.photos && project.photos.length > 1 ? (
          <section 
            className="mb-8 sm:mb-12 md:mb-16"
            aria-label="Project photo gallery"
          >
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
            >
              {/* Screen reader announcement for gallery */}
              <div className="sr-only" aria-live="polite">
                {project.photos.length - 1} additional photos available for this project.
              </div>
              
              {/* Map through photos (skipping the first one used in hero) and apply alternating layout */}
              {project.photos.slice(1).map((photoSrc: string, index: number) => {
                const gridIndex = index + 1; // 1-based index for grid layout logic
                const rowPosition = Math.floor(index / 3); // 0-based row index within the pattern
                const positionInRow = index % 3; // 0, 1, 2 position within the 3-photo pattern

                let className = "";
                let aspectRatio: 'aspect-[4/3]' | 'aspect-[3/4]' | 'aspect-[21/9]' = 'aspect-[4/3]'; // Default
                
                // Mobile: Single column
                // className remains empty for single column layout by default

                // Tablet & Desktop: Apply alternating pattern
                if (positionInRow === 0 || positionInRow === 1) {
                  // First two items in the 3-item pattern are side-by-side
                  className = "sm:col-span-1"; // Takes half width on sm+ screens
                  aspectRatio = 'aspect-[4/3]'; // Standard aspect ratio
                } else if (positionInRow === 2) {
                  // Third item is full-width
                  className = "sm:col-span-2"; // Takes full width on sm+ screens
                  aspectRatio = 'aspect-[21/9]'; // Wide aspect ratio
                }
                
                // Add vertical spacing for mobile, which becomes horizontal gap on larger screens
                className += " mb-4 sm:mb-0";

                return (
                  <div 
                    key={`${project.id}-photo-${gridIndex}`}
                    className={className}
                  >
                    <IndividualProjectImage
                      src={photoSrc}
                      alt={`${project.name} - Image ${gridIndex}`}
                      projectName={project.name}
                      projectYear={project.year}
                      projectId={project.id}
                      allImages={project.photos}
                      imageIndex={gridIndex} // Pass the correct index for lightbox
                      priority={index < 2} // Prioritize first two images in the grid
                      aspectRatio={aspectRatio}
                      isAboveFold={index < 4} // Consider first 4 grid images above fold
                      data-testid={`project-photo-${gridIndex}`}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          // Message if no additional photos are available
          <div 
            className="text-center py-8 sm:py-12"
            aria-live="polite"
          >
            <p className="text-neutral-600 text-lg">No additional photos available for this project.</p>
          </div>
        )}

        {/* Project description section */}
        {project.description && (
          <section 
            className="mt-8 sm:mt-10 md:mt-12 prose sm:prose-lg md:prose-xl max-w-none text-gray-700 px-0 sm:px-4 transition-all duration-300"
            aria-label="Project description"
          > 
            <h2 className="text-xl sm:text-2xl font-medium mb-4">About This Project</h2>
            <p>{project.description}</p>
          </section>
        )}
        
        {/* Back to projects link for better navigation */}
        <div className="mt-12 sm:mt-16">
          <a 
            href="/projects" 
            className="inline-flex items-center text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200 underline underline-offset-2"
            aria-label="Back to all projects"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all projects
          </a>
        </div>
      </div>
    </main>
  );
}
