'use client';

import { useState, useEffect } from 'react';
import { ProjectImage } from './project-image';
import { getAllProjects } from '@/lib/projects';
import type { Project } from '@/lib/projects';

export function ProjectsGallery() {
  const projects: Project[] = getAllProjects();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Handle window resize and viewport changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Update on resize with debounce
    const handleResize = () => {
      requestAnimationFrame(() => {
        setWindowWidth(window.innerWidth);
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set loading to false after component mounts
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);
  
  // Update gap size based on viewport width
  const getGapClass = () => {
    if (windowWidth < 640) return 'gap-y-8'; // Mobile
    if (windowWidth < 768) return 'gap-x-5 gap-y-10'; // Small tablets
    if (windowWidth < 1024) return 'gap-x-5 gap-y-10'; // Tablets
    return 'gap-x-6 gap-y-12'; // Larger gaps on desktop
  };
  
  if (!projects || projects.length === 0) {
    return (
      <div 
        className="min-h-[300px] flex items-center justify-center"
        aria-live="polite"
      >
        <p className="text-lg text-gray-600">No projects available at this time.</p>
      </div>
    );
  }

  return (
    <div 
      className={`grid grid-cols-1 sm:grid-cols-2 ${getGapClass()} transition-all duration-300`}
      aria-live={loading ? "polite" : "off"}
      aria-busy={loading}
    >
      {/* Hidden heading for screen readers */}
      <h2 className="sr-only">Our Interior Design Projects</h2>
      
      {/* Loading announcement for screen readers */}
      {loading && (
        <div className="sr-only">Loading projects gallery, please wait</div>
      )}

      {/* Projects Grid */}
      {projects.map((project, index) => (
        <div 
          key={project.id}
          className={`transition-all duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <ProjectImage 
            project={project}
            isHovered={hoveredProject === project.id}
            priority={index < 2} // Priority loading for first two projects (above the fold)
            isAboveFold={index < 4} // Consider first 4 projects as above the fold
          />
        </div>
      ))}
      
      {/* Loaded announcement for screen readers */}
      {!loading && (
        <div className="sr-only" aria-live="polite">
          All {projects.length} projects have loaded
        </div>
      )}
    </div>
  );
}

export default ProjectsGallery; 