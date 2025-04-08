"use client";

import IndividualProjectImage from "@/components/individual-project/individual-project-image";
import { getAllProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { useEffect, useState } from "react";

export function ProjectsGallery() {
  const projects: Project[] = getAllProjects();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(true);

  // Handle window resize and viewport changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set initial width
    setWindowWidth(window.innerWidth);

    // Update on resize with debounce
    const handleResize = () => {
      requestAnimationFrame(() => {
        setWindowWidth(window.innerWidth);
      });
    };

    window.addEventListener("resize", handleResize);

    // Set loading to false after component mounts
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <div
        className="min-h-[300px] flex items-center justify-center"
        aria-live="polite"
      >
        <p className="text-lg text-gray-600">
          No projects available at this time.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12 md:gap-y-12 transition-all duration-300"
      aria-live={loading ? "polite" : "off"}
      aria-busy={loading}
    >
      {/* Hidden heading for screen readers */}
      <h2 className="sr-only">Our Interior Design Projects</h2>

      {/* Loading announcement for screen readers */}
      {loading && (
        <div className="sr-only">Loading projects gallery, please wait</div>
      )}

      {/* Projects Grid */}
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`transition-all duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <IndividualProjectImage
            src={project.mainImage}
            alt={`${project.name} - Main Image`}
            projectName={project.name}
            projectYear={project.year || "N/A"}
            projectId={project.id}
            allImages={project.photos || []}
            imageIndex={index}
            hoverImage={project.hoverImage}
            isHovered={hoveredProject === project.id}
            priority={index < 2}
            isAboveFold={index < 4}
            behavior="navigate"
            aspectRatio="aspect-[4/3]"
          />
          <p className="mt-4 text-center font-heading text-2xl text-black">
            {project.name}
          </p>
        </div>
      ))}

      {/* Loaded announcement for screen readers */}
      {!loading && (
        <div className="sr-only" aria-live="polite">
          All {projects.length} projects have loaded
        </div>
      )}
    </div>
  );
}

export default ProjectsGallery;
