'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamically import the lightbox component
const ProjectLightbox = dynamic(() => import('@/components/project/project-lightbox'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full" aria-hidden="true" />
  ),
});

interface IndividualProjectImageProps {
  src: string;
  alt: string;
  projectName: string;
  projectYear: string;
  projectId: string;
  allImages: string[];
  imageIndex: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  aspectRatio?: 'aspect-[4/3]' | 'aspect-video' | 'aspect-square' | 'aspect-[3/4]' | 'aspect-[16/9]' | 'aspect-[21/9]';
  isAboveFold?: boolean;
  showCaption?: boolean;
  'data-testid'?: string;
}

export default function IndividualProjectImage({
  src,
  alt,
  projectName,
  projectYear,
  projectId,
  allImages,
  imageIndex,
  priority = false,
  className,
  imageClassName,
  aspectRatio = 'aspect-[4/3]',
  isAboveFold = false,
  showCaption = false,
  'data-testid': testId,
}: IndividualProjectImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Set up window width and touch detection on mount
  useEffect(() => {
    // Check if touch is supported
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
      setWindowWidth(window.innerWidth);
    };
    
    checkTouch();
    
    // Handle resize for responsive adjustments
    const handleResize = () => {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          setWindowWidth(window.innerWidth);
          checkTouch();
        });
      } else {
        setWindowWidth(window.innerWidth);
        checkTouch();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine if this image should be prioritized for loading
  const shouldPrioritize = priority || isAboveFold;
  
  // Calculate responsive sizing based on viewport
  const getResponsiveImageSizes = () => {
    if (windowWidth < 640) return "(max-width: 640px) 100vw, 640px"; // Mobile full width
    if (windowWidth < 768) return "(max-width: 768px) 85vw, 768px";  // Small tablets
    if (windowWidth < 1024) return "(max-width: 1024px) 45vw, 640px"; // Tablets
    if (windowWidth < 1280) return "(max-width: 1280px) 40vw, 640px"; // Small desktop
    return "33vw, 640px"; // Large desktop
  };
  
  // Default responsive sizing based on typical layout
  const imageSizes = getResponsiveImageSizes();
  
  // Simple SVG placeholder for blur effect
  const placeholderSvg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';

  // Create a project object for the lightbox component
  const project = {
    id: projectId,
    name: projectName,
    year: projectYear,
    mainImage: src,
    hoverImage: src,
    photos: allImages,
  };

  return (
    <>
      <button 
        ref={buttonRef}
        type="button"
        onClick={() => setIsLightboxOpen(true)}
        className={cn(
          "cursor-pointer w-full bg-transparent border-0 p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black rounded-lg",
          className
        )}
        aria-label={`View ${projectName} (${projectYear}) image ${imageIndex + 1} in lightbox`}
        data-testid={testId}
      >
        <div className="group overflow-hidden transition-all duration-300">
          <motion.div
            className={cn(
              'relative overflow-hidden rounded-lg h-full',
              aspectRatio,
              imageClassName,
              !imageLoaded && 'bg-gray-200'
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0.8,
              y: imageLoaded ? 0 : 10
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className={cn(
                "object-cover transition-opacity duration-500",
                !imageLoaded && "blur-sm"
              )}
              priority={shouldPrioritize}
              sizes={imageSizes}
              quality={shouldPrioritize ? 85 : 80} // Quality as specified in task (80-85%)
              onLoad={() => setImageLoaded(true)}
              loading={shouldPrioritize ? 'eager' : 'lazy'} // Lazy load images below the fold
              placeholder="blur"
              blurDataURL={placeholderSvg}
            />
            
            {/* Loading indicator - visually hidden but announced to screen readers */}
            {!imageLoaded && (
              <div className="sr-only" aria-live="polite">
                Loading image {imageIndex + 1} for {projectName}
              </div>
            )}
          </motion.div>
          
          {showCaption && (
            <div 
              className="flex justify-between items-center mt-2 sm:mt-3 px-0 sm:px-1 transition-all duration-300"
              aria-hidden="true" // Hidden from screen readers since it's in the aria-label
            >
              <span className="text-sm text-gray-700">Image {imageIndex + 1}</span>
              <span className="text-xs text-gray-500">{projectName}</span>
            </div>
          )}
        </div>
      </button>
      
      {/* Lightbox component */}
      <ProjectLightbox
        project={project}
        initialSlide={imageIndex}
        open={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
} 