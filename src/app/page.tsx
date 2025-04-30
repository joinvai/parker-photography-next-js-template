import ScrollIndicator from "@/components/ScrollIndicator";
import About from "@/components/about";
import { CustomCarousel } from "@/components/custom-carousel";
import FullPageCarousel from "@/components/full-page-carousel";
import { ProjectListItem } from "@/components/project-list-item";
import { knownLandscapeImages } from "@/lib/landscape-images";
import { getAllProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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

  // Split projects
  const firstTwoProjects = projects.slice(0, 2);
  const remainingProjects = projects.slice(2);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      {/* Wrap Carousel and Indicator in a relative container */}
      <div className="relative w-full">
        {/* Render the Full Page Carousel with shuffled images */}
        <FullPageCarousel
          imagePaths={shuffledImages}
          key={timestamp}
          initialIndex={initialIndex}
        />
        {/* Add the Scroll Indicator */}
        <ScrollIndicator />
      </div>

      {/* Container for About section */}
      <div className="z-10 relative p-8 w-full max-w-7xl mx-auto mt-16">
        <About />
      </div>

      {/* Unified Project Grid Section - Modified for mixed layout */}
      <section
        className={cn(
          "w-full",
          "p-[43px] 2xl:py-[45px] 2xl:px-[52px]",
          // Grid setup remains responsive
          "grid grid-cols-1 gap-y-[43px]",
          "lg:grid-cols-2 lg:gap-x-[43px]",
          "2xl:gap-y-[45px] 2xl:gap-x-[52px]",
        )}
      >
        {/* Render first two projects (will be side-by-side on lg+) */}
        {firstTwoProjects.map((project) => (
          <ProjectListItem
            key={project.id}
            project={project}
            showDescription={false}
          />
        ))}

        {/* Render remaining projects, spanning full width on lg+ */}
        {remainingProjects.map((project) => (
          // Add lg:col-span-2 to force single column on large screens
          <ProjectListItem
            key={project.id}
            project={project}
            className="lg:col-span-2"
          />
        ))}
      </section>
      <section className="w-full mt-16 mb-16">
        <CustomCarousel projects={projects} />
      </section>
    </main>
  );
}
