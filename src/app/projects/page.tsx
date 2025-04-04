import Link from 'next/link';
// Assuming data.ts exports the Project type correctly
import { getAllProjects } from '@/lib/data';
import type { Project } from '@/lib/data';
import { ProjectImage } from '@/components/project-image';
import React from 'react'; // Import React

// Make the component async to fetch data
export default async function ProjectsPage() {
  // Fetch project data on the server
  const projects: Project[] = await getAllProjects();

  // Basic loading/error state (could be more robust)
  if (!projects) { // Check if projects is undefined (in case of error during fetch)
    return (
      <main className="min-h-screen bg-black text-white p-4 md:p-8 flex justify-center items-center">
        <p>Error loading projects.</p>
      </main>
    );
  }

  if (projects.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white p-4 md:p-8 flex justify-center items-center">
        <p>No projects found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"> {/* Responsive grid columns */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-lg" // Added rounded-lg
          >
            <Link href={`/projects/${project.id}`} className="block w-full h-full">
              {/* Use ProjectImage for the thumbnail */}
              {project.photos && project.photos.length > 0 ? (
                <ProjectImage
                  src={project.photos[0]} // Use the first photo as thumbnail
                  alt={`Thumbnail for ${project.name}`}
                  priority={index < 3} // Prioritize loading for first few images for LCP
                  aspectRatio="aspect-[4/3]" // Enforce aspect ratio
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105" // Smooth scale effect on hover
                />
              ) : (
                // Placeholder if no photos
                <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                  <span className="text-neutral-500">No Image</span>
                </div>
              )}

              {/* Overlay for project title - appears on hover via group-hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                <h2 className="font-semibold text-lg md:text-xl tracking-tight text-white"> {/* Ensure text is white */}
                  {project.name} <span className="opacity-70">({project.year})</span>
                </h2>
              </div>
            </Link>
            {/* Correct closing tag for the project item div */}
          </div>
        ))}
        {/* Correct closing tag for the grid div */}
      </div>
    </main>
  );
}
