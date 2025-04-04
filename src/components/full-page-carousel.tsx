'use client'; // Mark this as a Client Component due to useState, useEffect, Framer Motion

import { useState, useEffect } from 'react'; // Keep runtime imports here
import type { FC } from 'react'; // Import FC type separately
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
            {/* AnimatePresence handles the animation of components when they mount and unmount */}
            {/* 'mode="wait"' ensures the exiting slide finishes animating out before the new one animates in */}
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={currentIndex} // IMPORTANT: Key change triggers the enter/exit animation
                    className="absolute inset-0" // Position the div to fill its parent
                    variants={variants}
                    initial="enter" // Initial state before animating in
                    animate="center" // State when the component is visible
                    exit="exit" // State when the component is animating out
                >
                    {/* Next.js Image component for optimized image loading */}
                    <Image
                        src={currentImage}
                        alt={`Slide ${currentIndex + 1}`} // Descriptive alt text for accessibility
                        layout="fill" // Fill the parent container
                        objectFit="cover" // Cover the area, potentially cropping the image
                        objectPosition="center" // Center the image within the container
                        priority={currentIndex === 0} // Prioritize loading the first image for LCP
                        quality={85} // Image quality (0-100), adjust as needed for performance vs quality
                        // Consider adding 'sizes' attribute for responsive image loading optimization
                        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Optional: Add UI elements like navigation arrows, indicators, or text overlays here */}
        </div>
    );
};

export default FullPageCarousel;
