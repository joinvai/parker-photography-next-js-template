import Image from "next/image";
import Link from "next/link";
import type React from "react";

import type { Project } from "@/lib/projects"; // Assuming Project type is here
import { cn } from "@/lib/utils";

interface ProjectListItemProps {
  project: Project;
  className?: string;
  showDescription?: boolean;
}

export function ProjectListItem({
  project,
  className,
  showDescription = true,
}: ProjectListItemProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {/* Image Container - Use aspect ratio */}
      <div className={cn("relative overflow-hidden aspect-[3/4] rounded-none")}>
        <Image
          fill
          sizes="(min-width: 1024px) 45vw, (min-width: 640px) 85vw, 90vw" // Adjusted sizes based on potential 2-col layout
          priority={false} // Lower priority as many images might be rendered
          src={project.mainImage}
          alt={project.name}
          quality={85} // Slightly lower quality for potentially many images
          className={cn(
            "object-cover w-full h-full transition-opacity duration-500",
            // Add placeholder logic if needed later
          )}
          // Add placeholder/blurDataURL if needed later
        />
      </div>
      {/* Conditionally render Text Container */}
      {showDescription && (
        <div className="mt-11 flex justify-between items-start">
          <Link
            href={`/projects/${project.id}`}
            className="font-header text-black text-base md:text-lg lg:text-xl hover:italic"
          >
            {project.name}
          </Link>
          <p className="text-sm text-neutral-700">{project.year}</p>
        </div>
      )}
    </div>
  );
}
