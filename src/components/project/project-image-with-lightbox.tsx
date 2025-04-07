'use client';

import { useState } from 'react';
import { ProjectImage } from '@/components/project-image';
import ProjectLightbox from './project-lightbox';
import type { Project } from '@/lib/projects';

interface ProjectImageWithLightboxProps {
  project: Project;
  imageIndex: number;
  showCaption?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  aspectRatio?: 'aspect-[4/3]' | 'aspect-video' | 'aspect-square' | 'aspect-[3/4]' | 'aspect-[16/9]' | 'aspect-[21/9]';
  useHoverImage?: boolean;
  isAboveFold?: boolean;
  'data-testid'?: string;
}

export default function ProjectImageWithLightbox({
  project,
  imageIndex,
  showCaption = false,
  priority = false,
  className,
  imageClassName,
  aspectRatio = 'aspect-[4/3]',
  useHoverImage = false,
  isAboveFold = false,
  'data-testid': testId,
}: ProjectImageWithLightboxProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Get the current image source
  const currentImageSrc = project.photos[imageIndex];

  // Create a modified project object with the current image
  const modifiedProject = {
    ...project,
    mainImage: currentImageSrc,
    hoverImage: currentImageSrc,
  };

  return (
    <>
      {/* Clickable project image */}
      <button 
        type="button"
        onClick={() => setIsLightboxOpen(true)}
        className="cursor-pointer transition-opacity hover:opacity-95 focus:opacity-95 w-full bg-transparent border-0 p-0 text-left"
        aria-label={`Open ${project.name} lightbox gallery`}
        data-testid={testId}
      >
        <ProjectImage
          project={modifiedProject}
          showCaption={showCaption}
          priority={priority}
          className={className}
          imageClassName={imageClassName}
          aspectRatio={aspectRatio}
          useHoverImage={useHoverImage}
          isAboveFold={isAboveFold}
        />
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