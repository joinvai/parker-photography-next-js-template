import { promises as fs } from "node:fs";
import path from "node:path";
import About from "@/components/about";
import { CustomCarousel } from "@/components/custom-carousel";
import FullPageCarousel from "@/components/full-page-carousel"; // Adjust path if needed
import { getAllProjects } from "@/lib/projects";
import sharpLib from "sharp"; // Corrected import
// Force dynamic rendering to ensure shuffling happens on each request
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Define the structure for image data
interface ImageData {
  path: string;
  width?: number;
  height?: number;
}

// Function to recursively get all image file paths and dimensions from a directory
async function getImagePaths(dir: string): Promise<ImageData[]> {
  let imageData: ImageData[] = [];
  try {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        imageData = imageData.concat(await getImagePaths(res));
      } else {
        // Check if the file is an image (common extensions)
        if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(res)) {
          try {
            // Get image metadata using sharp
            const metadata = await sharpLib(res).metadata(); // Use renamed import
            const relativePath = path.relative(
              path.join(process.cwd(), "public"),
              res,
            );
            // Ensure paths use forward slashes for URL compatibility
            const urlPath = `/${relativePath.replace(/\\/g, "/")}`;
            imageData.push({
              path: urlPath,
              width: metadata.width,
              height: metadata.height,
            });
          } catch (sharpError) {
            console.error(
              `Error processing image ${res} with sharp:`,
              sharpError,
            );
            // Optionally add path even if metadata fails
            // const relativePath = path.relative(path.join(process.cwd(), "public"), res);
            // const urlPath = `/${relativePath.replace(/\\/g, "/")}`;
            // imageData.push({ path: urlPath }); // Add with undefined dimensions
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
  return imageData;
}

// Shuffle function (can shuffle any array type)
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a copy to avoid mutating original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default async function HomePage() {
  // Get image data (paths + dimensions) from the public/projects directory
  const projectsDir = path.join(process.cwd(), "public", "projects");
  const allImageData = await getImagePaths(projectsDir);

  // Separate landscape images from others
  const landscapeImages: ImageData[] = [];
  const otherImages: ImageData[] = []; // Portrait or square

  // Use for...of loop instead of forEach
  for (const img of allImageData) {
    if (img.width && img.height && img.width > img.height) {
      landscapeImages.push(img);
    } else {
      // Includes images with missing dimensions or portrait/square
      otherImages.push(img);
    }
  }

  // Shuffle only the landscape images
  const shuffledLandscapeImages = shuffleArray(landscapeImages);

  // Generate a timestamp to force a new random order on each request
  const timestamp = Date.now();
  console.log(`Rendering HomePage with timestamp: ${timestamp}`);

  // Combine the lists (non-landscape first, then shuffled landscape)
  // Extract only the paths for the carousel component
  const imagePaths = [
    ...otherImages.map((img) => img.path),
    ...shuffledLandscapeImages.map((img) => img.path),
  ];

  // Fetch project data for the new carousel
  const projects = getAllProjects();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      {/* Render the Full Page Carousel at the top with the reordered paths */}
      <FullPageCarousel
        imagePaths={imagePaths}
        key={timestamp}
        initialIndex={Math.floor(
          Math.random() * shuffledLandscapeImages.length,
        )}
      />

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
