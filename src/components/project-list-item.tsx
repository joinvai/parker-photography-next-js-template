"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
// Import useState
import { useState } from "react";

import type { Project } from "@/lib/projects"; // Assuming Project type is here
import { cn } from "@/lib/utils";
// Import IndividualProjectImage
import IndividualProjectImage from "./individual-project/individual-project-image";

interface ProjectListItemProps {
  project: Project;
  className?: string;
  showDescription?: boolean;
  // Add index for potential animation delay if needed later
  index?: number;
}

export function ProjectListItem({
  project,
  className,
  showDescription = true, // Default remains true
  index = 0, // Default index
}: ProjectListItemProps) {
  // Add hover state
  const [isHovered, setIsHovered] = useState(false);

  return (
    // Add hover handlers to the root div
    <div
      className={cn("flex flex-col group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Replace Image with IndividualProjectImage */}
      <IndividualProjectImage
        src={project.mainImage}
        alt={`${project.name} - Main Image`}
        projectName={project.name}
        projectYear={project.year || "N/A"}
        projectId={project.id}
        allImages={project.photos || []}
        imageIndex={index} // Use index
        hoverImage={project.hoverImage}
        // Pass down hover state
        isHovered={isHovered}
        priority={index < 2} // Example priority logic
        aspectRatio="aspect-[3/4]" // Match gallery style
        behavior="navigate" // Link to project page
        // imageClassName and className can be passed if needed
      />

      {/* Text Container - Render based on showDescription */}
      {/* This logic is now slightly different as name/year are part of the link *within* IndividualProjectImage if behavior='navigate' */}
      {/* We can add it below the image component directly here */}
      <div className="flex flex-col py-5 pr-0">
        <Link
          href={`/projects/${project.id}`}
          className="font-header text-black text-2xl uppercase leading-[30px] tracking-[-1.5px] hover:italic transition-all duration-200 group-hover:italic"
        >
          {project.name}
        </Link>
        <p className="font-sans text-sm leading-6 font-normal text-black group-hover:italic transition-all duration-200">
          {project.year || "N/A"}
        </p>
      </div>
    </div>
  );
}
