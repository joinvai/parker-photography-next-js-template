import { getProjectById, getAllProjects } from '@/lib/projects'; // Import data functions and type (using type keyword for Project)
import type { Project } from '@/lib/projects';
import { ProjectImage } from '@/components/project-image'; // Import the image component
import { notFound } from 'next/navigation';
import type { Metadata } from 'next'; // Use type keyword for Metadata
import React from 'react'; // Import React
import dynamic from 'next/dynamic'; // Import dynamic for lazy loading client components

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

// The main page component (Server Component)
export default function ProjectPage({ params }: { params: { slug: string } }) {
  // Fetch the specific project data based on the slug
  const project: Project | undefined = getProjectById(params.slug);

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
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 transition-all duration-300"
            >
              {/* Screen reader announcement for gallery */}
              <div className="sr-only" aria-live="polite">
                {project.photos.length - 1} additional photos available for this project.
              </div>
              
              {/* Map through photos (skipping the first one used in hero) and render ProjectImageWithLightbox component */}
              {project.photos.slice(1).map((photoSrc: string, index: number) => (
                <div 
                  key={`${project.id}-photo-${index + 1}`}
                  className={`${(index + 1) % 3 === 0 ? 'sm:col-span-2' : ''} mb-3 sm:mb-0 transition-all duration-300`}
                >
                  <ProjectImageWithLightbox
                    project={project}
                    imageIndex={index + 1} // +1 because we skipped the first image
                    priority={index < 1} // Prioritize loading for the first additional image
                    aspectRatio={
                      (index + 1) % 3 === 0 
                        ? 'aspect-[21/9]' // Wide aspect for full-width images on larger screens
                        : (index + 1) % 4 === 1 
                          ? 'aspect-[3/4]' // Taller images occasionally 
                          : 'aspect-[4/3]' // Standard aspect
                    }
                    isAboveFold={index < 3} // First 3 additional images considered above the fold
                    data-testid={`project-photo-lightbox-${index + 1}`}
                  />
                </div>
              ))}
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
