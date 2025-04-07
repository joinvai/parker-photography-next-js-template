'use client';

import { ImageGridItem } from './ImageGridItem';
import type { ImageGridProps } from './types';
import { gridClasses } from './types';
import { cn } from '@/lib/utils';

export function ImageGrid({ projects }: ImageGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500">No projects found</p>
      </div>
    );
  }

  return (
    <div data-testid="grid-container" className="w-full px-4 md:px-8">
      <div 
        data-testid="image-grid" 
        className={cn(
          gridClasses.container,
          'max-w-[2000px] mx-auto'
        )}
      >
        {projects.map((project, index) => (
          <ImageGridItem
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
} 