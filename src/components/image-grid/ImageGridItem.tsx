'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectImage } from '@/components/project-image';
import { cn } from '@/lib/utils';
import type { ImageGridItemProps } from './types';
import { calculateLayout, getAspectRatio, shouldLoadWithPriority } from './utils';
import { transitions } from './types';

export function ImageGridItem({ project, index }: ImageGridItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFullWidth, gridColumn, gridRow } = calculateLayout(index);
  const aspectRatio = getAspectRatio(isFullWidth);
  const priority = shouldLoadWithPriority(index);

  // Ensure we have at least one photo
  if (!project.photos || project.photos.length === 0) {
    return null;
  }

  // Use first photo as primary, second as secondary (if available)
  const primaryImage = project.photos[0];
  const secondaryImage = project.photos[1] || project.photos[0];

  return (
    <motion.div
      data-testid="grid-item"
      className={cn(
        'group relative overflow-hidden rounded-lg h-full',
        gridColumn,
        gridRow,
        isFullWidth ? 'row-span-2' : '',
        transitions.hover
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Link href={`/projects/${project.id}`} className="block w-full h-full">
        <div className="relative h-full">
          {/* Primary Image */}
          <ProjectImage
            data-testid="primary-image"
            src={primaryImage}
            alt={`Primary view of ${project.name}`}
            priority={priority}
            aspectRatio={aspectRatio}
            className={cn(
              'transition-opacity duration-300',
              isHovered ? 'opacity-0' : 'opacity-100'
            )}
          />

          {/* Secondary Image (Absolute positioned over primary) */}
          <div className="absolute inset-0">
            <ProjectImage
              data-testid="secondary-image"
              src={secondaryImage}
              alt={`Secondary view of ${project.name}`}
              priority={false}
              aspectRatio={aspectRatio}
              className={cn(
                'transition-opacity duration-300',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>

          {/* Overlay with project info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
            <h2 className="font-semibold text-lg md:text-xl tracking-tight text-white">
              {project.name}{' '}
              <span className="opacity-70">({project.year})</span>
            </h2>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 