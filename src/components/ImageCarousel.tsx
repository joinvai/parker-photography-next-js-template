'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { editorialNew } from '@/app/fonts'; // Assuming this path is correct
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react'; // Hook import
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'; // Type imports from base package
import { cn } from '@/lib/utils'; // Ensure cn utility is imported

const originalImages = [
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-1.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-2.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-3.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-4.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-5.jpg',
    // Add more images if needed...
];

// Assuming loop: true handles looping behavior in embla-carousel-react
const images = originalImages;

const OPTIONS: EmblaOptionsType = { // Explicitly defining the type for OPTIONS
    align: 'start',
    loop: true, // Enable looping
    slidesToScroll: 1,
    containScroll: 'trimSnaps', // Adjust based on loop behavior and desired snapping
    dragFree: false, // Allow free scrolling or snap to slides
};

export default function ImageCarousel() {
    // useEmblaCarousel hook initialization with options. Let TS infer the types.
    // Removed explicit type annotation for emblaRef and emblaApi
    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS); 
    const [visibleSlideIndexes, setVisibleSlideIndexes] = useState<number[]>([]);
    const [hoveredArea, setHoveredArea] = useState<'prev' | 'next' | null>(null);
    const [isDragging, setIsDragging] = useState(false); // Track dragging state
    const [selectedIndex, setSelectedIndex] = useState(0); // State for active dot

    const updateVisibleSlidesAndIndex = useCallback(() => {
        const api = emblaApi; // Explicitly reference emblaApi
        if (!api) return;
        // slidesInView() doesn't take arguments; it handles loop calculation automatically.
        setVisibleSlideIndexes(api.slidesInView());
        setSelectedIndex(api.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        const api = emblaApi; // Explicitly reference emblaApi
        if (!api) return;

        const onSelect = () => {
            updateVisibleSlidesAndIndex();
            // Reset dragging state on slide change completion
            setIsDragging(false);
        };

        const onPointerDown = () => {
            setIsDragging(true);
            setHoveredArea(null); // Hide hover text immediately on drag start
        };

        const onPointerUp = () => {
            // Set dragging false immediately for responsiveness
            setIsDragging(false);
            // Re-evaluate hover state after drag ends if needed (might require mousemove checks)
            // For simplicity, rely on mouseEnter/Leave of the triggers after pointerUp.
        };

        // Update visible slides and index on relevant events
        api.on('select', onSelect);
        api.on('reInit', updateVisibleSlidesAndIndex); // Also update on re-init
        api.on('scroll', updateVisibleSlidesAndIndex); // Update during scroll for accuracy
        api.on('pointerDown', onPointerDown);
        api.on('pointerUp', onPointerUp);

        // Initial setup
        updateVisibleSlidesAndIndex();

        return () => {
            // Clean up listeners
            if (api) {
                api.off('select', onSelect);
                api.off('reInit', updateVisibleSlidesAndIndex);
                api.off('scroll', updateVisibleSlidesAndIndex);
                api.off('pointerDown', onPointerDown);
                api.off('pointerUp', onPointerUp);
            }
        };
    }, [emblaApi, updateVisibleSlidesAndIndex]); // Add updateVisibleSlidesAndIndex dependency


    // --- Navigation Button Logic ---
    const scrollPrev = useCallback(() => { const api = emblaApi; api?.scrollPrev(); }, [emblaApi]);
    const scrollNext = useCallback(() => { const api = emblaApi; api?.scrollNext(); }, [emblaApi]);
    const scrollTo = useCallback((index: number) => { const api = emblaApi; api?.scrollTo(index); }, [
		emblaApi,
	]);

    // Determine if Prev/Next navigation is possible (for conditional rendering/disabling)
    const canScrollPrev = emblaApi?.canScrollPrev() ?? false;
    const canScrollNext = emblaApi?.canScrollNext() ?? false;
    const scrollSnaps = emblaApi?.scrollSnapList() ?? [];


    // --- Cursor Style Logic ---
    const getCursorClass = () => {
        if (isDragging) return 'cursor-grabbing'; // While dragging
        if (hoveredArea === 'prev' && canScrollPrev) return 'cursor-none'; // Hide default cursor over Prev trigger
        if (hoveredArea === 'next' && canScrollNext) return 'cursor-none'; // Hide default cursor over Next trigger
        return 'cursor-grab'; // Default grab cursor for the rest of the carousel area
    };

    return (
        // Apply dynamic cursor class to the main container
        <div className={cn("relative w-full group/carousel", getCursorClass())}>
            <div className="overflow-hidden" ref={emblaRef}>
                {/* The main draggable area implicitly uses the container's cursor */}
                <div className="flex -ml-4"> {/* Adjust margin based on slide padding */}
                    {images.map((src, index) => (
                        // Each slide container
                        <div
                            key={`${src}-${index}`} // Unique key for each slide
                            className="pl-4 min-w-0 flex-[0_0_100%] md:flex-[0_0_33.333%] relative" // Example: 3 slides on medium screens+
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                                <Image
                                    src={src}
                                    alt={`Carousel image ${index + 1}`} // Use index + 1 for alt text
                                    fill
                                    className="object-cover" // Cover container, maintain aspect ratio
                                    priority={index < 3} // Prioritize loading initial images
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Prev Button Overlay - Full height, left portion */}
            <button
                type="button"
                aria-label="Previous Slide"
                onClick={scrollPrev}
                disabled={!canScrollPrev} // Disable button visually and functionally if cannot scroll
                className={cn(
                    "absolute top-0 left-0 z-10 w-1/4 h-full flex items-center justify-start pl-4", // Position and size
                    "text-white transition-opacity duration-200",
                    // Show overlay container on carousel hover only if scroll is possible
                    canScrollPrev ? "opacity-0 group-hover/carousel:opacity-100" : "opacity-0",
                    // Set cursor based on scroll possibility
                    {"cursor-w-resize": canScrollPrev},
                    {"cursor-default": !canScrollPrev}
                )}
                onMouseEnter={() => canScrollPrev && setHoveredArea('prev')}
                onMouseLeave={() => setHoveredArea(null)}
            >
                 <span className={cn(
                    "text-2xl font-light tracking-widest",
                     editorialNew.className, // Apply font class if needed
                     // Show text only when this specific area is hovered and scroll is possible
                     (hoveredArea === 'prev' && canScrollPrev) ? 'opacity-100' : 'opacity-0',
                     "transition-opacity duration-200" // Add transition to text visibility
                     )}
                     aria-hidden="true" // Hide decorative text from screen readers
                 >
                     PREV
                 </span>
            </button>

            {/* Next Button Overlay - Full height, right portion */}
            <button
                 type="button"
                 aria-label="Next Slide"
                 onClick={scrollNext}
                 disabled={!canScrollNext} // Disable button visually and functionally if cannot scroll
                 className={cn(
                     "absolute top-0 right-0 z-10 w-1/4 h-full flex items-center justify-end pr-4", // Position and size
                     "text-white transition-opacity duration-200",
                     // Show overlay container on carousel hover only if scroll is possible
                     canScrollNext ? "opacity-0 group-hover/carousel:opacity-100" : "opacity-0",
                     // Set cursor based on scroll possibility
                     {"cursor-e-resize": canScrollNext},
                     {"cursor-default": !canScrollNext}
                 )}
                onMouseEnter={() => canScrollNext && setHoveredArea('next')}
                onMouseLeave={() => setHoveredArea(null)}
            >
                 <span className={cn(
                    "text-2xl font-light tracking-widest",
                    editorialNew.className, // Apply font class if needed
                    // Show text only when this specific area is hovered and scroll is possible
                    (hoveredArea === 'next' && canScrollNext) ? 'opacity-100' : 'opacity-0',
                    "transition-opacity duration-200" // Add transition to text visibility
                    )}
                    aria-hidden="true" // Hide decorative text from screen readers
                >
                     NEXT
                 </span>
            </button>

            {/* Dot Indicators (Optional) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex items-center justify-center space-x-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            aria-label={`Go to slide ${index + 1}`}
                            className={cn(
                                "h-3 w-3 rounded-full",
                                index === selectedIndex ? 'bg-white scale-110' : 'bg-gray-400', // Highlight active dot
                                'transition-all duration-200' // Use transition-all for smooth scale and color change
                            )}
                            onClick={() => scrollTo(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
