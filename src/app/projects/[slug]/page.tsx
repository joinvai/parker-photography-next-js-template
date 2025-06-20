import ProjectDetailClient from "@/components/project/project-detail-client";
import { getAllProjects, getProjectById } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Define the props type for the page component
type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Function to generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await params before accessing its properties
  const { slug } = await params;
  const project: Project | undefined = getProjectById(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} (${project.year}) | Photography Studio`,
    description:
      project.description ||
      `View details and photos of the ${project.name} nature photography project by our photography studio, captured in ${project.year}.`,
    openGraph: {
      title: `${project.name} (${project.year}) | Photography Studio`,
      description:
        project.description ||
        `View details and photos of the ${project.name} nature photography project by our photography studio, captured in ${project.year}.`,
      type: "website",
      url: `/projects/${project.id}`,
    },
  };
}

// Function to generate static paths for dynamic routes at build time
export async function generateStaticParams() {
  const projects: Project[] = getAllProjects();

  return projects.map((project) => ({
    slug: project.id,
  }));
}

// The main page component
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project: Project | undefined = getProjectById(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
