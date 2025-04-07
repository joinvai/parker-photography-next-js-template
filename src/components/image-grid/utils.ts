import type { LayoutConfig } from './types';

/**
 * Calculate the layout configuration for a grid item based on its position
 * Pattern: 2-1-2-1 (two half-width, one full-width, two half-width, one full-width)
 */
export const calculateLayout = (index: number): LayoutConfig => {
  const position = index % 6; // Complete pattern is 6 images (2-1-2-1)
  
  // Full-width positions are at index 2 and 5 in each pattern cycle
  const isFullWidth = position === 2 || position === 5;
  
  // Calculate grid column and row span based on position
  const gridColumn = isFullWidth ? 'col-span-2' : 'col-span-1';
  const gridRow = isFullWidth ? 'row-span-2' : undefined;

  return {
    isFullWidth,
    gridColumn,
    gridRow,
  };
};

/**
 * Determine if an image should be loaded with priority based on its position
 * First 4 images are loaded with priority for better LCP
 */
export const shouldLoadWithPriority = (index: number): boolean => {
  return index < 4;
};

/**
 * Get the appropriate aspect ratio class based on image position and width
 */
export const getAspectRatio = (isFullWidth: boolean): 'aspect-[16/9]' | 'aspect-[3/4]' => {
  return isFullWidth ? 'aspect-[16/9]' : 'aspect-[3/4]';
}; 