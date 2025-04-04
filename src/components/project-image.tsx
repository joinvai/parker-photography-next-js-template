'use client'; // Required for motion and potentially client-side hooks if added later

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Make sure this path is correct

interface ProjectImageProps {
  src: string;
  alt: string;
  priority?: boolean; // For optimizing LCP (Largest Contentful Paint)
  className?: string; // Allow passing additional Tailwind classes
  aspectRatio?: 'aspect-[4/3]' | 'aspect-video' | 'aspect-square' | 'aspect-[3/4]'; // Tailwid aspect ratio classes
}

/**
 * A reusable component to display project images with a fade-in animation.
 * Uses Next.js Image for optimization and Framer Motion for animation.
 */
export function ProjectImage({
  src,
  alt,
  priority = false,
  className,
  aspectRatio = 'aspect-[4/3]', // Default aspect ratio
}: ProjectImageProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded', // Added subtle rounding
        aspectRatio, // Apply aspect ratio class
        className, // Apply any custom classes passed in
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }} // Slightly longer fade-in
    >
      <Image
        src={src}
        alt={alt}
        fill // Makes the image fill the container div
        className="object-cover" // Ensures the image covers the container without distortion
        priority={priority} // Pass priority prop for LCP optimization
        // It's good practice to provide sizes for responsiveness, adjust based on actual layout needs
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={80} // Adjust quality vs file size
      />
    </motion.div>
  );
}

// Default export might be preferred depending on project conventions
// export default ProjectImage;
