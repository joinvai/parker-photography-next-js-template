import ProjectDetailClient from "@/components/project/project-detail-client"; // Import the new client component
// Import React removed, no longer needed directly in server component
import { getAllProjects, getProjectById } from "@/lib/projects"; // Keep data functions
import type { Project } from "@/lib/projects";
import type { Metadata } from "next";
// Image import removed, now handled in client component
import { notFound } from "next/navigation";
// motion and cn imports removed

// Define the params type for generateMetadata
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Function to generate metadata for the page (Server-side)
export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const project: Project | undefined = getProjectById(params.slug);

  if (!project) {
    // Return default metadata if project not found
    return {
      title: "Project Not Found",
    };
  }

  // Return dynamic metadata based on project data
  return {
    title: `${project.name} (${project.year}) | Sire Design`,
    description:
      project.description ||
      `View details and photos of the ${project.name} interior design project by Sire Design, completed in ${project.year}.`,
    openGraph: {
      title: `${project.name} (${project.year}) | Sire Design`,
      description:
        project.description ||
        `View details and photos of the ${project.name} interior design project by Sire Design, completed in ${project.year}.`,
      type: "website",
      url: `/projects/${project.id}`,
    },
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

// The main page component (BACK TO SERVER COMPONENT)
export default async function ProjectPage({
  params,
}: { params: { slug: string } }) {
  // Fetch data on the server side
  const project: Project | undefined = getProjectById(params.slug);

  if (!project) {
    notFound();
  }

  // Render the client component, passing the project data
  return <ProjectDetailClient project={project} />;
}
