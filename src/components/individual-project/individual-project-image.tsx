'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

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
  isHovered?: boolean;
  hoverImage?: string;
  isFullWidthGridItem?: boolean;
  behavior?: 'navigate' | 'lightbox';
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
  isHovered = false,
  hoverImage,
  'data-testid': testId,
  isFullWidthGridItem = false,
  behavior = 'lightbox',
}: IndividualProjectImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
      setWindowWidth(window.innerWidth);
    };
    
    checkTouch();
    
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
  
  useEffect(() => {
    if (isHovered && hoverImage && typeof Image !== 'undefined') {
      const img = new window.Image();
      img.src = hoverImage;
      img.onload = () => setHoverImageLoaded(true);
    }
  }, [isHovered, hoverImage]);
  
  const shouldPrioritize = priority || isAboveFold;
  
  const getResponsiveImageSizes = () => {
    if (windowWidth < 640) return "100vw";
    if (windowWidth < 1024) {
      return isFullWidthGridItem ? "100vw" : "50vw";
    }
    return isFullWidthGridItem ? "100vw" : "33vw";
  };
  
  const imageSizes = getResponsiveImageSizes();
  
  const animationDelay = shouldPrioritize ? 0 : (imageIndex * 0.05);

  const placeholderSvg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';

  const project = {
    id: projectId,
    name: projectName,
    year: projectYear,
    mainImage: src,
    hoverImage: src,
    photos: allImages,
  };

  const imageContent = (
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
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          delay: animationDelay
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-cover transition-opacity duration-500 ease-in-out",
            !imageLoaded && "blur-sm",
            isHovered && hoverImage && hoverImageLoaded ? 'opacity-0' : 'opacity-100'
          )}
          priority={shouldPrioritize}
          sizes={imageSizes}
          quality={shouldPrioritize ? 95 : 85}
          onLoad={() => setImageLoaded(true)}
          loading={shouldPrioritize ? 'eager' : 'lazy'}
          placeholder="blur"
          blurDataURL={placeholderSvg}
        />

        {hoverImage && (
          <Image
            src={hoverImage}
            alt=""
            fill
            className={cn(
              "absolute inset-0 object-cover transition-opacity duration-500 ease-in-out",
              isHovered && hoverImage && hoverImageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            sizes={imageSizes}
            quality={75}
            loading="lazy"
            aria-hidden="true"
            onLoad={() => setHoverImageLoaded(true)}
            placeholder="blur"
            blurDataURL={placeholderSvg}
          />
        )}

        {!imageLoaded && (
          <div className="sr-only" aria-live="polite">
            Loading image {imageIndex + 1} for {projectName}
          </div>
        )}
      </motion.div>
      
      {showCaption && (
        <div 
          className="flex justify-between items-center mt-2 sm:mt-3 px-0 sm:px-1 transition-all duration-300"
          aria-hidden="true"
        >
          <span className="text-sm text-gray-700">Image {imageIndex + 1}</span>
          <span className="text-xs text-gray-500">{projectName}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {behavior === 'navigate' ? (
        <Link
          href={`/projects/${projectId}`}
          className={cn(
            "cursor-pointer w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black rounded-lg block",
            className
          )}
          aria-label={`View details for project ${projectName}`}
          data-testid={testId}
        >
          {imageContent}
        </Link>
      ) : (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className={cn(
            "cursor-pointer w-full bg-transparent border-0 p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black rounded-lg",
            className
          )}
          aria-label={alt ? `View ${alt} in lightbox` : `View image ${imageIndex + 1} for ${projectName} in lightbox`}
          data-testid={testId}
        >
          {imageContent}
        </button>
      )}
      
      {behavior === 'lightbox' && (
        <ProjectLightbox
          project={project}
          initialSlide={imageIndex}
          open={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
} 