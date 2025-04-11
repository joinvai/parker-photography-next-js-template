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
      className="relative bg-#FAF9F5 min-h-screen text-black"
      aria-labelledby="project-title"
    >
      {project.mainImage && (
        <section
          aria-label="Project hero image"
          className="relative w-screen h-screen overflow-hidden"
        >
          <motion.div
            className={cn(
              "relative w-full h-full",
              !heroImageLoaded && "bg-gray-200",
            )}
            initial={{ opacity: 0 }}
            animate={{
              opacity: heroImageLoaded ? 1 : 0.8,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
              onLoad={() => setHeroImageLoaded(true)}
              data-testid="hero-image-individual"
            />
          </motion.div>
        </section>
      )}

      <div className="relative z-10 bg-#FAF9F5 px-4 sm:px-6 md:px-8 pt-16 md:pt-24 pb-12 sm:pb-16">
        <h1
          id="project-title"
          className="max-w-7xl text-center mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin mb-6 sm:mb-8 md:mb-12 tracking-tight transition-all duration-300"
        >
          {project.name}
        </h1>

        {project.photos && project.photos.length > 1 ? (
          <section
            className="mt-8 sm:mt-12 md:mt-16 -mx-4 sm:-mx-6 md:-mx-8"
            aria-label="Project photo gallery"
          >
            <div className="px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.photos
                  .slice(1)
                  .map((photoSrc: string, index: number) => {
                    const actualImageIndex = index + 1;
                    const positionInPattern = index % 3;

                    let colSpanClass = "";
                    let aspectRatio: "aspect-[4/3]" | "aspect-[21/9]" =
                      "aspect-[4/3]";

                    if (positionInPattern === 0 || positionInPattern === 1) {
                      colSpanClass = "col-span-1";
                      aspectRatio = "aspect-[4/3]";
                    } else {
                      colSpanClass = "col-span-1 md:col-span-2";
                      aspectRatio = "aspect-[21/9]";
                    }

                    return (
                      <div
                        key={`${project.id}-photo-${actualImageIndex}`}
                        className={colSpanClass}
                      >
                        <IndividualProjectImage
                          src={photoSrc}
                          alt={`${project.name} - Image ${actualImageIndex + 1}`}
                          projectName={project.name}
                          projectYear={project.year}
                          projectId={project.id}
                          allImages={project.photos}
                          imageIndex={actualImageIndex}
                          priority={index < 2}
                          aspectRatio={aspectRatio}
                          isAboveFold={index < 4}
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
            className="max-w-7xl mx-auto mt-8 sm:mt-10 md:mt-12 prose sm:prose-lg md:prose-xl text-gray-700 transition-all duration-300"
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
