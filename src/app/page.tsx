import { promises as fs } from "node:fs";
import path from "node:path";
import About from "@/components/about";
import { CustomCarousel } from "@/components/custom-carousel";
import FullPageCarousel from "@/components/full-page-carousel";
import { knownLandscapeImages } from "@/lib/landscape-images";
import { getAllProjects } from "@/lib/projects";

// Force dynamic rendering to ensure shuffling happens on each request
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  // Clean up image paths to ensure they all start with a forward slash
  const cleanImagePaths = knownLandscapeImages.map((imagePath) =>
    imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath.replace(/^public\//, "")}`,
  );

  // Shuffle the landscape images
  const shuffledImages = shuffleArray(cleanImagePaths);

  // Generate a timestamp to force a new random order on each request
  const timestamp = Date.now();
  console.log(`Rendering HomePage with timestamp: ${timestamp}`);

  // Fetch project data for the new carousel
  const projects = getAllProjects();

  // Pick a random index for the initial image
  const initialIndex = Math.floor(Math.random() * shuffledImages.length);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      {/* Render the Full Page Carousel with shuffled images */}
      <FullPageCarousel
        imagePaths={shuffledImages}
        key={timestamp}
        initialIndex={initialIndex}
      />

      {/* Container for About section */}
      <div className="z-10 relative p-8 w-full max-w-7xl mx-auto mt-16">
        <About />
      </div>

      {/* Section for the CustomCarousel */}
      <section className="w-full mt-16 mb-16">
        <CustomCarousel projects={projects} />
      </section>
    </main>
  );
}
