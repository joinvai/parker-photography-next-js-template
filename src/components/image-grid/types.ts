import type { Project } from '@/lib/data';

export interface ImageGridProps {
  projects: Project[];
}

export interface ImageGridItemProps {
  project: Project;
  index: number; // For layout calculation
  priority?: boolean; // For image loading optimization
}

export interface LayoutConfig {
  isFullWidth: boolean;
  gridColumn: string;
  gridRow?: string;
}

// Utility type for grid layout patterns
export type GridPattern = {
  [key: number]: LayoutConfig;
};

// Animation timing constants
export const transitions = {
  hover: "transition-all duration-300 ease-in-out",
  loading: "transition-opacity duration-200",
} as const;

// Grid layout classes
export const gridClasses = {
  container: "grid grid-cols-2 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[400px] w-full",
  fullWidth: "col-span-2 row-span-2", // Take up 2 rows and full width
  halfWidth: "col-span-1", // Take up 1 column
} as const; 