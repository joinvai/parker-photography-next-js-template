"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { FC } from "react";

// Helper function to generate descriptive alt text from image path
const getAltTextFromPath = (imagePath: string): string => {
  if (!imagePath) return "Image";

  try {
    // Remove leading slash if present
    const cleanedPath = imagePath.startsWith("/")
      ? imagePath.substring(1)
      : imagePath;
    // Split the path
    const parts = cleanedPath.split("/");
    // Example: 'projects/No. 491-2023/bedroom.jpg'
    // We want "No. 491-2023 - bedroom"
    if (parts.length >= 3 && parts[0] === "projects") {
      const projectName = parts[1];
      const imageNameWithExt = parts[parts.length - 1];
      // Browser-compatible way to remove extension:
      const imageName =
        imageNameWithExt.substring(0, imageNameWithExt.lastIndexOf(".")) ||
        imageNameWithExt;
      // Replace hyphens/underscores in image name with spaces for better readability
      const formattedImageName = imageName.replace(/[-_]/g, " ");
      return `${projectName} - ${formattedImageName}`;
    }
    // Fallback if structure is different
    const fallbackFileName = parts[parts.length - 1];
    const fallbackName =
      fallbackFileName.substring(0, fallbackFileName.lastIndexOf(".")) ||
      fallbackFileName;
    const formattedFallbackName = fallbackName.replace(/[-_]/g, " ");
    return formattedFallbackName || "Project image";
  } catch (error) {
    console.error("Error parsing image path for alt text:", error);
    return "Project image";
  }
};

interface FullPageCarouselProps {
  imagePaths: string[];
  autoPlayInterval?: number | null;
  initialIndex?: number;
}

const FullPageCarousel: FC<FullPageCarouselProps> = ({
  imagePaths,
  autoPlayInterval = 5000,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (
      !autoPlayInterval ||
      autoPlayInterval <= 0 ||
      !imagePaths ||
      imagePaths.length <= 1
    ) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [imagePaths, autoPlayInterval]);

  // Important: Use a default image if imagePaths is empty
  // This prevents the loading state from showing
  const defaultImage = "/projects/No.4605-2021/main.jpg"; // Replace with a real image path

  // If no images are available, use the default image
  if (!imagePaths || imagePaths.length === 0) {
    return (
      <section
        className="relative w-screen h-screen overflow-hidden bg-black"
        aria-label="Project image"
      >
        <Image
          src={defaultImage || "/placeholder.svg"}
          alt="Project image"
          fill
          className="object-cover object-center"
          priority={true}
          quality={100}
          onLoad={() => setIsLoaded(true)}
        />
      </section>
    );
  }

  // Animation variants for the cross-fade effect
  const variants = {
    enter: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth motion
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  // Get the source URL for the current image
  const currentImage = imagePaths[currentIndex] || defaultImage;
  const altText = getAltTextFromPath(currentImage);

  return (
    <section
      className="relative w-screen h-screen overflow-hidden bg-black"
      aria-roledescription="carousel"
      aria-label="Project image slideshow"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.fieldset
          style={{ border: "none", margin: 0, padding: 0 }}
          key={currentIndex}
          className="absolute inset-0"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          aria-roledescription="slide"
          aria-label={`Slide ${currentIndex + 1} of ${imagePaths.length}: ${altText}`}
        >
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={altText}
            fill
            className="object-cover object-center"
            priority={currentIndex === 0}
            quality={100}
            onLoad={() => setIsLoaded(true)}
          />
        </motion.fieldset>
      </AnimatePresence>
    </section>
  );
};

export default FullPageCarousel;
