import { type Project, getProjectBySlug, getAllProjects } from '@/lib/data'; // Import data functions and type (using type keyword for Project)
import { ProjectImage } from '@/components/project-image'; // Import the image component
import { notFound } from 'next/navigation';
import type { Metadata } from 'next'; // Use type keyword for Metadata
import React from 'react'; // Import React

// Define the props type for the page component
interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Function to generate metadata for the page (Server-side)
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project: Project | undefined = await getProjectBySlug(params.slug);

  if (!project) {
    // Return default metadata if project not found
    return {
      title: 'Project Not Found',
    };
  }

  // Return dynamic metadata based on project data
  return {
    title: `${project.name} (${project.year}) | Sire Design`, // Example title format
    // description: project.description || `Details about the project ${project.name}`, // Optional description
  };
}

// Function to generate static paths for dynamic routes at build time (Server-side)
export async function generateStaticParams() {
  const projects: Project[] = await getAllProjects(); // Fetch all projects

  // Map projects to the format required by generateStaticParams
  // Ensure project.id exists and is the correct field for slugs
  return projects.map((project) => ({
    slug: project.id,
  }));
}

// The main page component (Server Component)
export default async function ProjectPage({ params }: ProjectPageProps) {
  // Fetch the specific project data based on the slug
  const project: Project | undefined = await getProjectBySlug(params.slug);

  // Handle project not found case using Next.js's notFound helper
  // If the project is not found after build, this will trigger a 404
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-black pt-24 pb-16 px-4 md:px-8"> {/* Added padding-top for fixed header */}
      <div className="max-w-7xl mx-auto">
        {/* Project Title and Year */}
        <h1 className="text-3xl md:text-5xl font-semibold mb-8 md:mb-12 tracking-tight">
          {project.name} <span className="text-gray-500">({project.year})</span> {/* Adjusted year color */}
        </h1>

        {/* Project Photos Grid */}
        {/* Add conditional check for photos array */}
        {project.photos && project.photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            {/* Map through photos and render ProjectImage component */}
            {project.photos.map((photoSrc: string, index: number) => ( // Added explicit types
              <ProjectImage
                key={`${project.id}-photo-${index}`} // Unique key for each image
                src={photoSrc}
                alt={`Image ${index + 1} for ${project.name}`}
                priority={index < 2} // Prioritize loading for the first two images
                // Example of dynamic class assignment based on index
                className={index % 3 === 0 ? 'sm:col-span-2 aspect-video' : 'aspect-auto'} // Make every 3rd image span full width on sm+ screens
              />
            ))}
          </div>
        ) : (
          // Message if no photos are available
          <p className="text-neutral-600">No photos available for this project.</p>
        )}

        {/* Add more details like description, technologies etc. if available in Project interface */}
        {/* Example: Displaying description if it exists */}
        {project.description && (
          <div className="mt-12 prose lg:prose-lg max-w-none text-gray-700"> {/* Added text color */}
            <p>{project.description}</p>
          </div>
        )}
      </div>
    </main>
  );
}
