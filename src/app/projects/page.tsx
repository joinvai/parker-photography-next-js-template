'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

// This will be replaced with actual project data
const tempProjects = [
  {
    id: 'project-1',
    title: 'Project One',
    imageUrl: '/placeholder-1.jpg'
  },
  {
    id: 'project-2', 
    title: 'Project Two',
    imageUrl: '/placeholder-2.jpg'
  },
  {
    id: 'project-3',
    title: 'Project Three', 
    imageUrl: '/placeholder-3.jpg'
  }
];

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
      >
        {tempProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={projectVariants}
            className="relative aspect-[4/3] overflow-hidden"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <Link href={`/projects/${project.id}`}>
              <div className="w-full h-full bg-neutral-900 relative">
                {/* Image will be added here */}
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="font-geist-mono text-xl tracking-tighter">
                    {project.title}
                  </h2>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
