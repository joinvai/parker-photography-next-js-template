import { getAllProjects } from '@/lib/data';
import type { Project } from '@/lib/data';
import { ImageGrid } from '@/components/image-grid/ImageGrid';

export default async function ProjectsPage() {
  // Fetch project data on the server
  const projects: Project[] = await getAllProjects();

  // Basic loading/error state
  if (!projects) {
    return (
      <main className="min-h-screen bg-black text-white">
        <p>Error loading projects.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <ImageGrid projects={projects} />
    </main>
  );
}
