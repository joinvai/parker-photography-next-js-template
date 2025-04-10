import { promises as fs } from "node:fs";
import path from "node:path";
import About from "@/components/about";
import { CustomCarousel } from "@/components/custom-carousel";
import FullPageCarousel from "@/components/full-page-carousel"; // Adjust path if needed
import { getAllProjects } from "@/lib/projects";

// Function to recursively get all image file paths from a directory
async function getImagePaths(dir: string): Promise<string[]> {
  let imagePaths: string[] = [];
  try {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        imagePaths = imagePaths.concat(await getImagePaths(res));
      } else {
        // Check if the file is an image (common extensions)
        if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(res)) {
          // Convert filesystem path to URL path relative to /public
          const relativePath = path.relative(
            path.join(process.cwd(), "public"),
            res,
          );
          // Ensure paths use forward slashes for URL compatibility
          imagePaths.push(`/${relativePath.replace(/\\/g, "/")}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    // Return empty array or handle error as needed
  }
  return imagePaths;
}

export default async function HomePage() {
  // Get image paths from the public/projects directory
  const projectsDir = path.join(process.cwd(), "public", "projects");
  const imagePaths = await getImagePaths(projectsDir);

  // Fetch project data for the new carousel
  const projects = getAllProjects();

  // Shuffle the image array for variety (optional)
  // function shuffleArray(array: any[]) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // }
  // shuffleArray(imagePaths);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      {/* Render the Full Page Carousel at the top */}
      <FullPageCarousel imagePaths={imagePaths} />

      {/* Container for About section (keeps it centered) */}
      <div className="z-10 relative p-8 w-full max-w-7xl mx-auto mt-16">
        <About />
      </div>

      {/* Section for the edge-to-edge CustomCarousel */}
      {/* Added vertical margin for spacing */}
      <section className="w-full mt-16 mb-16">
        <CustomCarousel projects={projects} />
      </section>
    </main>
  );
}
