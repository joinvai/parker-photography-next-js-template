'use client';

import { useState, useCallback, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';
import type { Project } from '@/lib/projects';

interface ProjectLightboxProps {
  project: Project;
  initialSlide?: number;
  open: boolean;
  onClose: () => void;
}

export default function ProjectLightbox({
  project,
  initialSlide = 0,
  open,
  onClose,
}: ProjectLightboxProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size to adjust lightbox UI based on viewport
  useEffect(() => {
    setIsMounted(true);
    
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Only render the lightbox component on the client side
  if (!isMounted) return null;

  // Transform the photo paths to slide objects for the lightbox
  const slides = project.photos.map((photoSrc, index) => ({
    src: photoSrc,
    alt: `${project.name} - Image ${index + 1}`,
    title: `${project.name} - Image ${index + 1}`,
    description: index === 0 
      ? `${project.description || 'Nature photography project by our photography studio'}` 
      : undefined,
  }));

  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={slides}
      index={initialSlide}
      plugins={[
        Thumbnails, 
        Zoom, 
        Captions, 
        Fullscreen,
        Counter
      ]}
      thumbnails={{
        position: isSmallScreen ? 'bottom' : 'end',
        width: isSmallScreen ? 60 : 120,
        height: isSmallScreen ? 40 : 80,
        gap: 12,
        padding: isSmallScreen ? 8 : 16,
      }}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2,
        doubleTapDelay: 300,
      }}
      counter={{
        container: { style: { top: '12px', left: '12px', paddingTop: '8px' } },
      }}
      captions={{
        showToggle: true,
        descriptionTextAlign: 'start',
        descriptionMaxLines: 3,
      }}
      carousel={{
        padding: isSmallScreen ? '16px' : '32px',
        spacing: isSmallScreen ? '12px' : '30px',
      }}
      render={{
        buttonPrev: isSmallScreen ? () => null : undefined,
        buttonNext: isSmallScreen ? () => null : undefined,
      }}
      styles={{
        root: { 
          '--yarl__color_backdrop': 'rgba(0, 0, 0, 0.9)',
          '--yarl__slide_captions_description_fontsize': '14px',
        }
      }}
      animation={{ fade: 300 }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
    />
  );
} 