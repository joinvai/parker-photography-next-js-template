"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface CustomCarouselProps {
  projects: Project[];
  className?: string;
}

// TODO: Change Hover Fotn to Beaufort and make bigger

// Define slide animation variants
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000, // Start off-screen
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0, // Slide to center
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000, // Slide off-screen
    opacity: 0,
  }),
};

// Define transition properties for slide
const transitionProps = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

// Helper function to generate blur data URL
const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f6f7f8" offset="0%" />
        <stop stop-color="#edeef1" offset="20%" />
        <stop stop-color="#f6f7f8" offset="40%" />
        <stop stop-color="#f6f7f8" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f6f7f8" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function CustomCarousel({ projects, className }: CustomCarouselProps) {
  // Use a tuple [page, direction] for state
  const [[page, direction], setPage] = useState([0, 0]);
  const [itemsPerView, setItemsPerView] = useState(3);
  // State to track hovered item index for Prev/Next text
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Re-introduce mousePosition state
  const [mousePosition, setMousePosition] = useState<{
    [key: number]: { x: number; y: number };
  }>({});
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload images
  useEffect(() => {
    // Create an array of all image URLs we want to preload
    const imagesToPreload = projects.map((project) => project.mainImage);

    // Preload images using for...of
    for (const imageUrl of imagesToPreload) {
      const img = new window.Image();
      img.src = imageUrl;
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, imageUrl]));
      };
    }
  }, [projects]);

  // Wrap the index calculation
  const projectIndex = useMemo(() => {
    // Ensure index stays within bounds
    return ((page % projects.length) + projects.length) % projects.length;
  }, [page, projects.length]);

  // Update paginate function to set direction
  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  const goToPrevious = useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const goToNext = useCallback(() => {
    paginate(1);
  }, [paginate]);

  // Re-introduce handleMouseMove
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition((prev) => ({
        ...prev,
        [idx]: { x, y },
      }));
    },
    [],
  );

  if (!projects || projects.length === 0) {
    return null;
  }

  // Calculate visible projects based on page index and itemsPerView
  const visibleProjects = useMemo(() => {
    const itemsToShow = [];
    const numProjects = projects.length;
    const count = Math.min(itemsPerView, numProjects);
    for (let i = 0; i < count; i++) {
      const index = (projectIndex + i + numProjects) % numProjects;
      itemsToShow.push({ ...projects[index], originalIndex: i }); // Add originalIndex for hover logic
    }
    return itemsToShow;
  }, [projectIndex, projects, itemsPerView]);

  // Generate blur placeholder
  const blurDataURL = useMemo(() => {
    return `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;
  }, []);

  return (
    <motion.div
      className={cn(
        "relative w-full overflow-hidden",
        "h-[75vh]",
        // Add padding on small devices
        "px-4 sm:px-6 lg:px-0",
        className,
      )}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transitionProps}
          className={cn(
            "absolute inset-0 grid justify-center gap-4",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
          // Prevent dragging interfering with clicks
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000) {
              paginate(1);
            } else if (swipe > 10000) {
              paginate(-1);
            }
          }}
        >
          {visibleProjects.map((projectWithIndex) => {
            const { originalIndex, ...project } = projectWithIndex;
            const isLargeScreen = itemsPerView === 3;
            const isPrevTrigger = originalIndex === 0 && isLargeScreen;
            const isNextTrigger =
              originalIndex === itemsPerView - 1 && isLargeScreen;
            const isNavTrigger = isPrevTrigger || isNextTrigger;
            const isLoaded = loadedImages.has(project.mainImage);

            return (
              <div key={project.id} className="flex flex-col">
                <motion.div
                  className={cn(
                    "relative overflow-hidden h-[70vh]",
                    "rounded-none",
                    isNavTrigger && "lg:cursor-none",
                  )}
                  onMouseEnter={() =>
                    isNavTrigger && setHoveredIndex(originalIndex)
                  }
                  onMouseLeave={() => isNavTrigger && setHoveredIndex(null)}
                  onMouseMove={(e) =>
                    isNavTrigger && handleMouseMove(e, originalIndex)
                  }
                  onClick={
                    isNavTrigger
                      ? isPrevTrigger
                        ? goToPrevious
                        : goToNext
                      : undefined
                  }
                >
                  <Image
                    fill
                    sizes="(min-width: 1024px) 80vw, (min-width: 640px) 90vw, 100vw"
                    priority={true}
                    src={project.mainImage}
                    alt={project.name}
                    quality={100}
                    className={cn(
                      "object-cover w-full h-full transition-opacity duration-500",
                      !isLoaded && "opacity-0",
                      isLoaded && "opacity-100",
                    )}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    onLoad={() =>
                      setLoadedImages(
                        (prev) => new Set([...prev, project.mainImage]),
                      )
                    }
                  />
                  {isNavTrigger &&
                    hoveredIndex === originalIndex &&
                    mousePosition[originalIndex] && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.1 }}
                        className="absolute pointer-events-none z-20"
                        style={{
                          left: `${mousePosition[originalIndex].x}px`,
                          top: `${mousePosition[originalIndex].y}px`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <span className="text-black text-2xl font-medium select-none">
                          {isPrevTrigger ? "PREV" : "NEXT"}
                        </span>
                      </motion.div>
                    )}
                </motion.div>
                {/* Project Name Below Image - Now as a Link */}
                <div className="mt-3 text-left">
                  <Link
                    href={`/projects/${project.id}`}
                    className="font-header text-black text-base md:text-lg lg:text-xl block hover:italic"
                  >
                    {project.name}
                  </Link>
                  {/* Add year below name */}
                  <p className="text-sm text-neutral-700 mt-1">
                    {project.year}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Keep Mobile/Tablet navigation buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 lg:hidden z-10">
        <button
          type="button"
          onClick={goToPrevious}
          // Add font-heading, remove rounded-full
          className="px-4 py-2 bg-#FAF9F5/70 text-black font-heading shadow-md hover:bg-#FAF9F5 transition-colors"
          aria-label="Previous project"
        >
          PREV
        </button>
        <button
          type="button"
          onClick={goToNext}
          // Add font-heading, remove rounded-full
          className="px-4 py-2 bg-#FAF9F5/70 text-black font-heading shadow-md hover:bg-#FAF9F5 transition-colors"
          aria-label="Next project"
        >
          NEXT
        </button>
      </div>
    </motion.div>
  );
}
