'use client';

import { motion } from 'framer-motion';

interface ProjectImage {
  src: string;
  alt: string;
  isLandscape?: boolean;
}

export default function ProjectPage() {
  // Example images array - replace with actual project images
  const images: ProjectImage[] = [
    { src: '/projects/project1.webp', alt: 'Project image 1' },
    { src: '/projects/project2.webp', alt: 'Project image 2' },
    { src: '/projects/project3.webp', alt: 'Project image 3', isLandscape: true },
    { src: '/projects/project4.webp', alt: 'Project image 4' },
    { src: '/projects/project5.webp', alt: 'Project image 5' },
    { src: '/projects/project6.webp', alt: 'Project image 6', isLandscape: true },
    // Add more images following the same pattern
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <main className="min-h-screen p-8 md:p-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          variants={itemVariants}
          className="font-geist-mono text-4xl md:text-6xl mb-12 tracking-tighter"
        >
          Project Title
        </motion.h1>

        <motion.div 
          variants={itemVariants}
          className="grid gap-8"
        >
          {images.map((image, index) => {
            const isGroupStart = index % 6 === 0;
            const isLandscape = image.isLandscape;

            return (
              <div 
                key={index}
                className={`
                  ${isGroupStart ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-8' : ''}
                  ${isLandscape ? 'md:col-span-2' : ''}
                `}
              >
                <motion.div
                  variants={itemVariants}
                  className={`
                    relative aspect-[4/3] overflow-hidden
                    ${isLandscape ? 'aspect-[16/9]' : ''}
                  `}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
                {isGroupStart && index + 1 < images.length && (
                  <motion.div
                    variants={itemVariants}
                    className="relative aspect-[4/3] overflow-hidden mt-8 md:mt-0"
                  >
                    <img
                      src={images[index + 1].src}
                      alt={images[index + 1].alt}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </main>
  );
}
