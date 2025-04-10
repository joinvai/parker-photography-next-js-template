"use client"; // Required for motion and potentially client-side hooks if added later

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils"; // Make sure this path is correct
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface ProjectImageProps {
  project: Project;
  showCaption?: boolean;
  priority?: boolean; // For optimizing LCP (Largest Contentful Paint)
  className?: string; // Allow passing additional Tailwind classes
  imageClassName?: string;
  aspectRatio?:
    | "aspect-[4/3]"
    | "aspect-video"
    | "aspect-square"
    | "aspect-[3/4]"
    | "aspect-[16/9]"
    | "aspect-[21/9]"; // Tailwid aspect ratio classes
  useHoverImage?: boolean;
  isHovered?: boolean;
  isAboveFold?: boolean; // Whether the image is likely to be above the fold
  "data-testid"?: string;
}

/**
 * A reusable component to display project images with a fade-in animation.
 * Uses Next.js Image for optimization and Framer Motion for animation.
 * Also provides project name, year, and navigation to project detail page.
 */
export function ProjectImage({
  project,
  showCaption = true,
  priority = false,
  className,
  imageClassName,
  aspectRatio = "aspect-[4/3]", // Default aspect ratio
  useHoverImage = false,
  isHovered = false,
  isAboveFold = false,
  "data-testid": testId,
}: ProjectImageProps) {
  const [localHoverState, setLocalHoverState] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Set up window width and touch detection on mount
  useEffect(() => {
    // Check if touch is supported
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
      );
      setWindowWidth(window.innerWidth);
    };

    checkTouch();

    // Handle resize for responsive adjustments
    const handleResize = () => {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          setWindowWidth(window.innerWidth);
          checkTouch(); // Re-check touch capability on resize
        });
      } else {
        setWindowWidth(window.innerWidth);
        checkTouch();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine if this image should be prioritized for loading
  const shouldPrioritize = priority || isAboveFold;

  // For touch devices, we'll use tap/click to toggle hover state instead of hover
  const toggleHoverForTouch = useCallback(() => {
    if (isTouchDevice && useHoverImage) {
      setLocalHoverState((prev) => !prev);
    }
  }, [isTouchDevice, useHoverImage]);

  // Allow both external control via isHovered prop and internal state management
  // If it's a touch device, only use local state (controlled by tap/click)
  // Also include isFocused state to trigger hover effect on keyboard focus
  const effectiveHoverState = useHoverImage
    ? isTouchDevice
      ? localHoverState
      : isHovered || localHoverState || isFocused
    : false;

  // Keyboard handlers for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Only trigger hover state for Enter/Space if not a touch device
    // On touch devices, the user would navigate directly
    if (!isTouchDevice && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault(); // Prevent scrolling for space key
      setLocalHoverState(true);
    }

    // For Enter on touch devices, let the link navigate naturally
    if (isTouchDevice && e.key === "Enter") {
      // Don't prevent default - let the link navigate
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (!isTouchDevice && (e.key === "Enter" || e.key === " ")) {
      // On key up, if it was Enter, navigate to the project detail
      if (e.key === "Enter") {
        linkRef.current?.click();
      }
      setLocalHoverState(false);
    }
  };

  // Calculate responsive sizing based on viewport
  const getResponsiveImageSizes = () => {
    if (windowWidth < 640) return "(max-width: 640px) 100vw, 640px"; // Mobile full width
    if (windowWidth < 768) return "(max-width: 768px) 85vw, 768px"; // Small tablets
    if (windowWidth < 1024) return "(max-width: 1024px) 45vw, 640px"; // Tablets
    if (windowWidth < 1280) return "(max-width: 1280px) 40vw, 640px"; // Small desktop
    return "33vw, 640px"; // Large desktop
  };

  // Default responsive sizing based on typical layout
  // These sizes help the browser preload the correct size image based on viewport
  const imageSizes = getResponsiveImageSizes();

  // Simple SVG placeholder for blur effect
  const placeholderSvg =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

  return (
    <Link
      ref={linkRef}
      href={`/projects/${project.id}`}
      className={cn(
        "block outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black",
        className,
      )}
      data-testid={testId}
      aria-label={`View ${project.name} project from ${project.year}`}
      onClick={
        isTouchDevice
          ? undefined
          : (e) => {
              // Only prevent default if not a touch device and not using keyboard
              if (!isFocused) {
                e.preventDefault();
              }
            }
      }
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div
        className={`group cursor-pointer ${isTouchDevice ? "touch-manipulation" : ""}`}
        onMouseEnter={
          isTouchDevice ? undefined : () => setLocalHoverState(true)
        }
        onMouseLeave={
          isTouchDevice ? undefined : () => setLocalHoverState(false)
        }
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onClick={isTouchDevice ? toggleHoverForTouch : undefined}
        role="presentation" // This indicates the div is presentational and doesn't add semantic meaning
      >
        <motion.div
          className={cn(
            "relative overflow-hidden h-full",
            aspectRatio,
            imageClassName,
            !imageLoaded && "bg-gray-200",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Main image */}
          <Image
            src={project.mainImage}
            alt={`${project.name} - ${project.year}`}
            fill
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              effectiveHoverState ? "opacity-0" : "opacity-100",
              !imageLoaded && "blur-sm",
            )}
            priority={shouldPrioritize}
            sizes={imageSizes}
            quality={shouldPrioritize ? 90 : 75}
            onLoad={() => setImageLoaded(true)}
            loading={shouldPrioritize ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={placeholderSvg}
          />

          {/* Hover image - only render if useHoverImage is true */}
          {useHoverImage && (
            <Image
              src={project.hoverImage}
              alt={`${project.name} - ${project.year} (alternate view)`}
              fill
              className={cn(
                "object-cover transition-all duration-500 group-hover:scale-105",
                effectiveHoverState ? "opacity-100" : "opacity-0",
                !imageLoaded && "blur-sm",
              )}
              sizes={imageSizes}
              quality={shouldPrioritize ? 85 : 70}
              loading="lazy"
              placeholder="blur"
              blurDataURL={placeholderSvg}
            />
          )}

          {/* Loading indicator - visually hidden but announced to screen readers */}
          {!imageLoaded && (
            <div className="sr-only" aria-live="polite">
              Loading image for {project.name}
            </div>
          )}
        </motion.div>

        {showCaption && (
          <div
            className="flex justify-between items-center mt-2 sm:mt-3 px-0 sm:px-1 transition-all duration-300"
            aria-hidden="true"
          >
            <h3 className="text-base sm:text-lg font-light uppercase transition-all duration-300">
              {project.name}
            </h3>
            <span className="text-xs sm:text-sm text-gray-600 transition-all duration-300">
              {project.year}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

// Default export might be preferred depending on project conventions
export default ProjectImage;
