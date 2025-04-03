'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { editorialNew } from '@/app/fonts';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

const images = [
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-1.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-2.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-3.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-4.jpg',
    '/projects/A0 - No. 808 - 2025/240413 _ sire _ 1500 ocean-5.jpg',
];

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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredImage, setHoveredImage] = useState<'prev' | 'next' | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const getHoverType = (index: number) => {
        // Skip even indices (middle images)
        if (index % 2 === 0) return null;
        
        // For odd indices, alternate between next and prev
        // First odd (1) shows next, second odd (3) shows prev, etc.
        return ((index - 1) / 2) % 2 === 0 ? 'next' : 'prev';
    };

    return (
        <div className="relative w-full">
            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {images.map((src, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-4 md:basis-1/3"
                            onMouseEnter={() => setHoveredImage(getHoverType(index))}
                            onMouseLeave={() => setHoveredImage(null)}
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                                <Image
                                    src={src}
                                    alt={`Carousel image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index < 3}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <CursorText
                text="P R E V"
                mousePosition={mousePosition}
                visible={hoveredImage === 'prev'}
            />
            <CursorText
                text="N E X T"
                mousePosition={mousePosition}
                visible={hoveredImage === 'next'}
            />
        </div>
    );
} 