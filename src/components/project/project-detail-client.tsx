"use client";

import IndividualProjectImage from "@/components/individual-project/individual-project-image";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({
  project,
}: ProjectDetailClientProps) {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  return (
    <main
      className="min-h-screen bg-white text-black pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 transition-all duration-300"
      aria-labelledby="project-title"
    >
      {project.mainImage && (
        <section
          aria-label="Project hero image"
          className="relative h-screen overflow-hidden -mx-4 sm:-mx-6 md:-mx-8"
        >
          <motion.div
            className={cn(
              "relative w-full h-full",
              !heroImageLoaded && "bg-gray-200",
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: heroImageLoaded ? 1 : 0.8,
              y: heroImageLoaded ? 0 : 10,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={project.mainImage}
              alt={`${project.name} hero image`}
              fill={true}
              className={cn(
                "object-cover object-center transition-opacity duration-500 ease-in-out",
                !heroImageLoaded && "blur-sm",
              )}
              priority={true}
              quality={95}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
              onLoad={() => setHeroImageLoaded(true)} // Set state on load
              data-testid="hero-image-individual"
            />
          </motion.div>
        </section>
      )}

      <div className="pt-16 sm:pt-20 md:pt-24">
        <h1
          id="project-title"
          className="max-w-7xl mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-8 md:mb-12 tracking-tight transition-all duration-300"
        >
          {project.name} <span className="text-gray-500">({project.year})</span>
        </h1>

        {project.photos && project.photos.length > 1 ? (
          <section
            className="mt-8 sm:mt-12 md:mt-16 -mx-4 sm:-mx-6 md:-mx-8"
            aria-label="Project photo gallery"
          >
            <div className="px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.photos
                  .slice(1)
                  .map((photoSrc: string, index: number) => {
                    const actualImageIndex = index + 1;
                    const positionInPattern = index % 3; // 0, 1 are 2-col items, 2 is 1-col item

                    let colSpanClass = "";
                    let isFullWidth = false;
                    let aspectRatio: "aspect-[4/3]" | "aspect-[21/9]" =
                      "aspect-[4/3]";

                    if (positionInPattern === 0 || positionInPattern === 1) {
                      // First two images in the pattern are standard width on md+
                      // Always full width (col-span-1 in a 1-col grid) below md
                      colSpanClass = "col-span-1"; // Stays col-span-1 on all screens
                      isFullWidth = false; // Only not full-width on md+
                      aspectRatio = "aspect-[4/3]";
                    } else {
                      // Third image in the pattern is full width on md+
                      // Always full width (col-span-1 in a 1-col grid) below md
                      colSpanClass = "col-span-1 md:col-span-2"; // Becomes col-span-2 only on md+
                      isFullWidth = true; // Considered full-width for aspect ratio purposes
                      aspectRatio = "aspect-[21/9]";
                    }

                    return (
                      <div
                        key={`${project.id}-photo-${actualImageIndex}`}
                        className={colSpanClass} // Apply responsive col-span
                      >
                        <IndividualProjectImage
                          src={photoSrc}
                          alt={`${project.name} - Image ${actualImageIndex + 1}`}
                          projectName={project.name}
                          projectYear={project.year}
                          projectId={project.id}
                          allImages={project.photos}
                          imageIndex={actualImageIndex}
                          priority={index < 2} // Prioritize first few images after hero
                          aspectRatio={aspectRatio}
                          isAboveFold={index < 4} // Assume first few grid images might be above fold
                          isFullWidthGridItem={positionInPattern === 2}
                          data-testid={`project-photo-${actualImageIndex}`}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        ) : (
          <div
            className="max-w-7xl mx-auto text-center py-8 sm:py-12"
            aria-live="polite"
          >
            <p className="text-gray-600">
              This project does not have additional photos.
            </p>
          </div>
        )}

        {project.description && (
          <section
            className="max-w-7xl mx-auto mt-8 sm:mt-10 md:mt-12 prose sm:prose-lg md:prose-xl text-gray-700 px-0 sm:px-4 transition-all duration-300"
            aria-label="Project description"
          >
            <h2 className="text-xl sm:text-2xl font-medium mb-4">
              About This Project
            </h2>
            <p>{project.description}</p>
          </section>
        )}

        <div className="max-w-7xl mx-auto mt-12 sm:mt-16">
          <a
            href="/projects"
            className="inline-flex items-center text-black p-2 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200 underline underline-offset-2 rounded-md"
            aria-label="Back to all projects"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to all projects
          </a>
        </div>
      </div>
    </main>
  );
}
