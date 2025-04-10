"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface CustomCarouselProps {
  projects: Project[];
  className?: string;
}

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

  return (
    <motion.div
      // Add explicit height and relative positioning to the main container
      className={cn(
        "relative w-full overflow-hidden",
        // Make carousel much taller
        "h-[75vh]", // Adjust as needed
        className,
      )}
    >
      {/* AnimatePresence now wraps the sliding container */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        {/* This inner div handles the sliding animation */}
        <motion.div
          key={page} // Animate when page changes
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transitionProps}
          className={cn(
            "absolute inset-0 grid justify-center gap-4", // Use absolute positioning for sliding
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
            // Use originalIndex from the mapped array
            const isPrevTrigger = originalIndex === 0 && isLargeScreen;
            const isNextTrigger =
              originalIndex === itemsPerView - 1 && isLargeScreen;
            const isNavTrigger = isPrevTrigger || isNextTrigger;

            return (
              <motion.div
                key={project.id} // Use project ID as key within the page
                className={cn(
                  // Use the new larger height
                  "relative overflow-hidden h-[75vh]",
                  "rounded-none",
                  // Apply cursor-none only when the text should appear
                  isNavTrigger && "lg:cursor-none",
                )}
                // Use state for hover effects
                onMouseEnter={() =>
                  isNavTrigger && setHoveredIndex(originalIndex)
                }
                onMouseLeave={() => isNavTrigger && setHoveredIndex(null)}
                // Add mouse move handler
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
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={originalIndex < itemsPerView}
                  src={project.mainImage}
                  alt={project.name}
                  quality={100}
                  className="object-cover w-full h-full"
                />
                {/* Show text overlay based on hoveredIndex state and position based on mouse */}
                {isNavTrigger &&
                  hoveredIndex === originalIndex &&
                  mousePosition[originalIndex] && (
                    <motion.div
                      // Animate presence of text slightly
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.1 }}
                      className="absolute pointer-events-none z-20"
                      style={{
                        // Position based on mouse coordinates
                        left: `${mousePosition[originalIndex].x}px`,
                        top: `${mousePosition[originalIndex].y}px`,
                        transform: "translate(-50%, -50%)", // Center on cursor
                      }}
                    >
                      {/* Change text color, add heading font, remove drop shadow */}
                      <span className="text-black font-heading text-2xl font-medium select-none">
                        {isPrevTrigger ? "Prev" : "Next"}
                      </span>
                    </motion.div>
                  )}
              </motion.div>
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
          className="px-4 py-2 bg-white/70 text-black font-heading shadow-md hover:bg-white transition-colors"
          aria-label="Previous project"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={goToNext}
          // Add font-heading, remove rounded-full
          className="px-4 py-2 bg-white/70 text-black font-heading shadow-md hover:bg-white transition-colors"
          aria-label="Next project"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
