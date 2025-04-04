'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { editorialNew } from '@/app/fonts';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';

const originalImages = [
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-1.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-2.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-3.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-4.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-5.jpg',
];

// Duplicate images for smooth looping
const images = [...originalImages, ...originalImages];

interface CursorTextProps {
    text: string;
    mousePosition: { x: number; y: number };
    visible: boolean;
}

const CursorText = ({ text, mousePosition, visible }: CursorTextProps) => {
    if (!visible) return null;

    return (
        <motion.div
            className={`pointer-events-none fixed z-50 ${editorialNew.className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transform: 'translate(-50%, -50%)',
            }}
        >
            <span className="text-2xl font-light tracking-widest text-white mix-blend-difference">
                {text}
            </span>
        </motion.div>
    );
};

export default function ImageCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        align: 'start',
        loop: true,
        slidesToScroll: 1,
        containScroll: 'keepSnaps',
        dragFree: false,
    });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredImage, setHoveredImage] = useState<'prev' | 'next' | null>(null);
    const [visibleSlides, setVisibleSlides] = useState<number[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setVisibleSlides(emblaApi.slidesInView());
        };

        const onPointerDown = () => {
            setIsDragging(true);
            setHoveredImage(null);
        };

        const onPointerUp = () => {
            setIsDragging(false);
        };

        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('pointerDown', onPointerDown);
        emblaApi.on('pointerUp', onPointerUp);
        onSelect();

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
            emblaApi.off('pointerDown', onPointerDown);
            emblaApi.off('pointerUp', onPointerUp);
        };
    }, [emblaApi]);

    const getHoverType = useCallback((index: number) => {
        if (!emblaApi || !visibleSlides.includes(index) || isDragging) return null;

        const firstVisible = visibleSlides[0];
        const lastVisible = visibleSlides[visibleSlides.length - 1];

        // If it's the first visible slide and we can scroll prev
        if (index === firstVisible && emblaApi.canScrollPrev()) {
            return 'prev';
        }
        // If it's the last visible slide and we can scroll next
        if (index === lastVisible && emblaApi.canScrollNext()) {
            return 'next';
        }

        return null;
    }, [emblaApi, visibleSlides, isDragging]);

    return (
        <div className="relative w-full">
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex -ml-4">
                    {images.map((src, index) => (
                        <div
                            key={`${src}-${index}`}
                            className="pl-4 min-w-0 flex-[0_0_100%] md:flex-[0_0_33.333%]"
                            onMouseEnter={() => !isDragging && setHoveredImage(getHoverType(index))}
                            onMouseLeave={() => setHoveredImage(null)}
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                                <Image
                                    src={src}
                                    alt={`Carousel image ${(index % originalImages.length) + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index < 3}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <CursorText
                text="P R E V"
                mousePosition={mousePosition}
                visible={hoveredImage === 'prev' && !isDragging}
            />
            <CursorText
                text="N E X T"
                mousePosition={mousePosition}
                visible={hoveredImage === 'next' && !isDragging}
            />
        </div>
    );
} 