'use client'; // Mark this as a Client Component due to useState, useEffect, Framer Motion

import { useState, useEffect } from 'react'; // Keep runtime imports here
import type { FC } from 'react'; // Import FC type separately
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import path from 'node:path'; // Import path for parsing

// Helper function to generate descriptive alt text from image path
const getAltTextFromPath = (imagePath: string): string => {
    if (!imagePath) return 'Image'; // Default text if path is empty

    try {
        // Remove leading slash if present
        const cleanedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
        // Split the path
        const parts = cleanedPath.split('/');
        // Example: 'projects/No. 491-2023/bedroom.jpg'
        // We want "No. 491-2023 - bedroom"
        if (parts.length >= 3 && parts[0] === 'projects') {
            const projectName = parts[1];
            const imageNameWithExt = parts[parts.length - 1];
            const imageName = path.parse(imageNameWithExt).name; // Remove file extension
            // Replace hyphens/underscores in image name with spaces for better readability
            const formattedImageName = imageName.replace(/[-_]/g, ' ');
            return `${projectName} - ${formattedImageName}`;
        }
        // Fallback if structure is different
        const fallbackName = path.parse(parts[parts.length - 1]).name.replace(/[-_]/g, ' ');
        return fallbackName || 'Project image';
    } catch (error) {
        console.error('Error parsing image path for alt text:', error);
        return 'Project image'; // Fallback on error
    }
};

interface FullPageCarouselProps {
    /**
     * Array of image paths relative to the 'public' directory.
     * Example: ['/projects/No. 491-2023/bedroom.jpg', '/projects/No. 217-2023/image-15.jpg']
     */
    imagePaths: string[];

    /**
     * Time in milliseconds between automatic slide transitions.
     * Set to 0 or a negative number to disable auto-advance.
     * Defaults to 5000 (5 seconds).
     */
    autoPlayInterval?: number | null;
}

// Use the imported FC type
const FullPageCarousel: FC<FullPageCarouselProps> = ({
    imagePaths,
    autoPlayInterval = 5000, // Default to 5 seconds
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance logic using setInterval
    useEffect(() => {
        // Only run the interval if autoPlayInterval is a positive number
        // and there are multiple images
        if (!autoPlayInterval || autoPlayInterval <= 0 || !imagePaths || imagePaths.length <= 1) {
            return; // No slideshow needed for 0 or 1 image or if interval is disabled
        }

        // Set up the interval to advance the slide
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                // Calculate the next index, looping back to 0 if at the end
                (prevIndex + 1) % imagePaths.length
            );
        }, autoPlayInterval);

        // Cleanup function: Clear the interval when the component unmounts
        // or when the dependencies (imagePaths, autoPlayInterval) change.
        return () => clearInterval(timer);
    }, [imagePaths, autoPlayInterval]); // Use imagePaths directly as dependency

    // Handle cases where images are not yet loaded or the array is empty
    if (!imagePaths || imagePaths.length === 0) {
        return (
            <div className="w-screen h-screen bg-gray-100 flex items-center justify-center text-gray-500">
                {/* Placeholder indicating loading or no images */}
                <p>Loading Carousel...</p>
            </div>
        );
    }

    // Animation variants for the cross-fade effect using Framer Motion
    const variants = {
        enter: { // State for the incoming slide
            opacity: 0,
            // Optionally add a slight scale or slide effect
            // scale: 1.05,
            // x: 20,
        },
        center: { // State for the slide when it's visible
            opacity: 1,
            // scale: 1,
            // x: 0,
            transition: {
                duration: 0.8, // Duration of the fade-in animation
                ease: 'easeInOut', // Type of easing function
            },
        },
        exit: { // State for the outgoing slide
            opacity: 0,
            // scale: 0.95,
            // x: -20,
            transition: {
                duration: 0.5, // Duration of the fade-out animation
                ease: 'easeOut',
            },
        },
    };

    // Get the source URL for the current image
    const currentImage = imagePaths[currentIndex];
    const altText = getAltTextFromPath(currentImage); // Generate alt text

    return (
        <section
            className="relative w-screen h-screen overflow-hidden bg-black"
            aria-roledescription="carousel"
            aria-label="Project image slideshow"
        >
            {/* AnimatePresence handles the animation of components when they mount and unmount */}
            {/* 'mode="wait"' ensures the exiting slide finishes animating out before the new one animates in */}
            <AnimatePresence initial={false} mode="wait">
                <motion.fieldset
                    style={{ border: 'none', margin: 0, padding: 0 }}
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
                        src={currentImage}
                        alt={altText}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority={currentIndex === 0}
                        quality={85}
                    />
                </motion.fieldset>
            </AnimatePresence>
        </section>
    );
};

export default FullPageCarousel;
